// chat.service.ts
import * as signalR from "@microsoft/signalr";
import { EncryptionService } from "./encryptionservice";
import Cookies from "js-cookie";

export interface Message {
  senderId: number;
  isSenderDoctor: boolean;
  content: string;
  messageId: number;
  isOwnMessage: boolean;
  timestamp?: Date;
}

export class ChatService {
  private hubConnection: signalR.HubConnection | null = null;
  private encryptionService: EncryptionService;
  private userId: number;
  private isDoctor: boolean;
  private otherUserId: number;
  private onMessageReceived: (message: Message) => void;
  private onConnectionEstablished: () => void;
  private messageQueue: { message: string, callback: (success: boolean) => void }[] = [];
  private isKeyExchangeComplete = false;

  constructor(
    encryptionService: EncryptionService,
    userId: number,
    isDoctor: boolean,
    otherUserId: number,
    onMessageReceived: (message: Message) => void,
    onConnectionEstablished: () => void
  ) {
    this.encryptionService = encryptionService;
    this.userId = userId;
    this.isDoctor = isDoctor;
    this.otherUserId = otherUserId;
    this.onMessageReceived = onMessageReceived;
    this.onConnectionEstablished = onConnectionEstablished;
  }

  async start(): Promise<void> {
    // Initialize the encryption service first
    await this.encryptionService.initialize(this.userId, this.isDoctor, this.otherUserId);

    // Create the SignalR connection
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub", {
      accessTokenFactory: () => Cookies.get("token") || "" // Ensure a string is always returned
    }) // Update this to your actual hub URL
      .withAutomaticReconnect()
      .build();

    // Register event handlers
    this.setupSignalRHandlers();

    try {
      // Start the connection
      await this.hubConnection.start();
      console.log("SignalR connection established");
    } catch (error) {
      console.error("Failed to establish SignalR connection:", error);
      throw error; // Re-throw the error to handle it in the calling code if needed
    }

    // Join the chat
    await this.hubConnection.invoke("JoinChat", this.userId, this.isDoctor, this.otherUserId);

    // Share our public key
    const publicKey = await this.encryptionService.exportPublicKey();
    await this.hubConnection.invoke("SharePublicKey", this.userId, this.isDoctor, this.otherUserId, publicKey);

    // Get message history
    await this.hubConnection.invoke("GetMessageHistory", this.userId, this.isDoctor, this.otherUserId);
  }

  private setupSignalRHandlers(): void {
    if (!this.hubConnection) return;

    // Handle joining the chat
    this.hubConnection.on("JoinedChat", (userId, isDoctor, otherUserId) => {
      console.log(`Joined chat: ${userId} (${isDoctor ? 'Doctor' : 'Patient'}) with ${otherUserId}`);
    });

    // Handle receiving public keys
    this.hubConnection.on("ReceivePublicKey", async (userId, isDoctor, publicKey) => {
      console.log(`Received public key from: ${userId} (${isDoctor ? 'Doctor' : 'Patient'})`);
      
      // If this is the other user's public key, import it
      if ((isDoctor !== this.isDoctor) && (userId === this.otherUserId)) {
        await this.encryptionService.importPublicKey(publicKey);
        this.isKeyExchangeComplete = true;
        this.onConnectionEstablished();
        
        // Process any queued messages
        this.processMessageQueue();
      }
    });

    // Handle receiving messages
    this.hubConnection.on("ReceiveMessage", async (senderId, isSenderDoctor, encryptedContent, messageId) => {
      try {
        // Determine if this is our own message
        const isOwnMessage = (senderId === this.userId && isSenderDoctor === this.isDoctor);
        
        let decryptedContent = "";
        
        // Only attempt to decrypt if it's not our own message (our own messages are already decrypted)
        if (!isOwnMessage) {
          try {
            // Check if it's a hybrid encrypted message (JSON format)
            if (encryptedContent.startsWith('{') && encryptedContent.includes('encryptedKey')) {
              decryptedContent = await this.encryptionService.hybridDecrypt(encryptedContent);
            } else {
              // Regular RSA decryption
              decryptedContent = await this.encryptionService.decryptMessage(encryptedContent);
            }
          } catch (error) {
            console.error("Failed to decrypt message:", error);
            decryptedContent = "** Unable to decrypt message **";
          }
        } else {
          // For own messages, we already have the plain text in the UI
          // This is just for completeness in case we need to rebuild the chat history
          try {
            if (encryptedContent.startsWith('{') && encryptedContent.includes('encryptedKey')) {
              decryptedContent = await this.encryptionService.hybridDecrypt(encryptedContent);
            } else {
              decryptedContent = await this.encryptionService.decryptMessage(encryptedContent);
            }
          } catch (error) {
            console.error("Failed to decrypt own message:", error);
            decryptedContent = "** Your message (unable to decrypt) **";
          }
        }

        const message: Message = {
          senderId,
          isSenderDoctor,
          content: decryptedContent,
          messageId,
          isOwnMessage
        };

        this.onMessageReceived(message);
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });
  }

  async sendMessage(content: string): Promise<boolean> {
    if (!this.hubConnection) {
      console.error("Connection not established");
      return false;
    }

    return new Promise<boolean>((resolve) => {
      if (!this.isKeyExchangeComplete) {
        // Queue the message to be sent after key exchange
        this.messageQueue.push({ message: content, callback: resolve });
        return;
      }

      this.encryptMessageAndSend(content, resolve);
    });
  }

  private async encryptMessageAndSend(content: string, callback: (success: boolean) => void): Promise<void> {
    try {
      // Use hybrid encryption for messages longer than a certain threshold
      // RSA has limitations on message size
      let encryptedContent: string;
      if (content.length > 100) {
        encryptedContent = await this.encryptionService.hybridEncrypt(content);
      } else {
        encryptedContent = await this.encryptionService.encryptMessage(content);
      }

      // Send the encrypted message through SignalR
      await this.hubConnection!.invoke(
        "SendMessage",
        this.userId,
        this.isDoctor,
        this.otherUserId,
        encryptedContent
      );

      // Immediately notify UI about the message (no need to wait for it to come back)
      this.onMessageReceived({
        senderId: this.userId,
        isSenderDoctor: this.isDoctor,
        content: content, // Use unencrypted content for our own messages
        messageId: 0, // This will be updated when the server confirms
        isOwnMessage: true
      });

      callback(true);
    } catch (error) {
      console.error("Failed to send message:", error);
      callback(false);
    }
  }

  private async processMessageQueue(): Promise<void> {
    while (this.messageQueue.length > 0) {
      const { message, callback } = this.messageQueue.shift()!;
      await this.encryptMessageAndSend(message, callback);
    }
  }

  async stop(): Promise<void> {
    if (this.hubConnection) {
      await this.hubConnection.stop();
      this.hubConnection = null;
    }
  }
  
}