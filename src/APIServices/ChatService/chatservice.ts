// chat.service.ts
import * as signalR from "@microsoft/signalr";
import { EncryptionService } from "./encryptionservice";
import Cookies from "js-cookie";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_Base_URL_FOR_SERVICE;
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
  private connectionPromise: Promise<void> | null = null;
  private connectionState: 'disconnected' | 'connecting' | 'connected' = 'disconnected';
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

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
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionState = 'connecting';
    
    this.connectionPromise = this._start();
    return this.connectionPromise;
  }

  private async _start(): Promise<void> {
    try {
      // Initialize the encryption service first
      await this.encryptionService.initialize(this.userId, this.isDoctor, this.otherUserId);

      // Create the SignalR connection
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${API_BASE_URL}/chathub`, {
          // accessTokenFactory: () => Cookies.get("token") || ""
          withCredentials: true
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 15000]) // Better reconnection strategy
        .configureLogging(signalR.LogLevel.Information) // Helpful for debugging
        .build();

      // Register event handlers
      this.setupSignalRHandlers();

      // Start the connection
      await this.hubConnection.start();
      console.log("SignalR connection established");

      // Join the chat
      await this.hubConnection.invoke("JoinChat", this.userId, this.isDoctor, this.otherUserId);

      // Share our public key
      const publicKey = await this.encryptionService.exportPublicKey();
      console.log(publicKey);
      await this.hubConnection.invoke("SharePublicKey", this.userId, this.isDoctor, this.otherUserId, publicKey);

      // Reset reconnect attempts on successful connection
      this.reconnectAttempts = 0;

      // Get message history
      await this.hubConnection.invoke("GetMessageHistory", this.userId, this.isDoctor, this.otherUserId);
      
      // Start a timeout to check if key exchange completes
      this.startKeyExchangeTimeout();
      
      return;
    } catch (error) {
      console.error("Failed to establish connection:", error);
      this.connectionState = 'disconnected';
      this.connectionPromise = null;
      
      // Implement reconnection logic
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        console.log(`Reconnect attempt ${this.reconnectAttempts}...`);
        
        // Wait before retry with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return this.start();
      }
      
      throw error;
    }
  }

  private startKeyExchangeTimeout() {
    // If key exchange doesn't complete in 20 seconds, try to force it
    setTimeout(async () => {
      if (!this.isKeyExchangeComplete && this.hubConnection?.state === signalR.HubConnectionState.Connected) {
        console.log("Key exchange timeout - retrying public key share");
        try {
          const publicKey = await this.encryptionService.exportPublicKey();
          await this.hubConnection.invoke("SharePublicKey", this.userId, this.isDoctor, this.otherUserId, publicKey);
        } catch (error) {
          console.error("Error during public key reshare:", error);
        }
      }
    }, 20000); // Increased timeout
  }

  private setupSignalRHandlers(): void {
    if (!this.hubConnection) return;

    this.hubConnection.onclose((error) => {
      console.log("SignalR connection closed:", error);
      this.connectionState = 'disconnected';
    });

    this.hubConnection.onreconnected(() => {
      console.log("SignalR connection reestablished.");
      this.connectionState = 'connected';
      
      // Re-share our public key after reconnection
      this.resendPublicKey();
      
      this.onConnectionEstablished();
    });

    this.hubConnection.onreconnecting((error) => {
      console.log("SignalR reconnecting:", error);
      this.connectionState = 'connecting';
    });

    // Handle joining the chat
    this.hubConnection.on("JoinedChat", (userId, isDoctor, otherUserId) => {
      console.log(`Joined chat: ${userId} (${isDoctor ? 'Doctor' : 'Patient'}) with ${otherUserId}`);
      
      // Ensure we share our public key
      this.resendPublicKey();
    });

    // Handle receiving public keys
    this.hubConnection.on("ReceivePublicKey", async (userId, isDoctor, publicKey) => {
      console.log(`Received public key from: ${userId} (${isDoctor ? 'Doctor' : 'Patient'})`);
      
      if ((isDoctor !== this.isDoctor) && (userId === this.otherUserId)) {
        try {
          await this.encryptionService.importPublicKey(publicKey);
          this.isKeyExchangeComplete = true;
          this.connectionState = 'connected';
          console.log("Key exchange completed.");
          this.onConnectionEstablished();

          // Process any queued messages
          this.processMessageQueue();
        } catch (error) {
          console.error("Error importing public key:", error);
        }
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
          isOwnMessage,
          timestamp: new Date()
        };

        this.onMessageReceived(message);
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });
  }

  private async resendPublicKey(): Promise<void> {
    if (!this.hubConnection || this.hubConnection.state !== signalR.HubConnectionState.Connected) return;
    
    try {
      const publicKey = await this.encryptionService.exportPublicKey();
      console.log(publicKey);
      await this.hubConnection.invoke("SharePublicKey", this.userId, this.isDoctor, this.otherUserId, publicKey);
      console.log("Public key shared successfully");
    } catch (error) {
      console.error("Error sharing public key:", error);
    }
  }

  async sendMessage(content: string): Promise<boolean> {
    console.log("ChatService: Attempting to send message:", content);

    if (!content.trim()) {
      console.error("ChatService: Cannot send empty message.");
      return false;
    }

    if (this.connectionState === "connecting") {
      console.log("ChatService: Connection is still being established. Queuing message.");
      return new Promise<boolean>((resolve) => {
        this.messageQueue.push({ message: content, callback: resolve });
      });
    }

    if (this.connectionState === "disconnected") {
      console.log("ChatService: Connection is disconnected. Attempting to reconnect.");
      try {
        await this.start();
      } catch (error) {
        console.error("ChatService: Failed to reconnect:", error);
        return false;
      }
    }

    if (!this.hubConnection || !this.isKeyExchangeComplete) {
      console.error(
        "ChatService: Cannot send message. Connection is not established or key exchange is incomplete."
      );
      return false;
    }

    console.log("ChatService: Encrypting and sending message.");
    return new Promise<boolean>((resolve) => {
      if (!this.isKeyExchangeComplete) {
        console.log("ChatService: Key exchange not complete. Queuing message.");
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

      // Notify the callback of success
      callback(true);
    } catch (error) {
      console.error("Failed to send message:", error);
      callback(false);
    }
  }

  private async processMessageQueue(): Promise<void> {
    if (this.messageQueue.length > 0) {
      console.log(`Processing ${this.messageQueue.length} queued messages`);
    }
    
    while (this.messageQueue.length > 0) {
      const { message, callback } = this.messageQueue.shift()!;
      await this.encryptMessageAndSend(message, callback);
    }
  }

  async stop(): Promise<void> {
    if (this.hubConnection) {
      this.connectionState = 'disconnected';
      this.connectionPromise = null;
      await this.hubConnection.stop();
      this.hubConnection = null;
    }
  }
  
  // Getter for connection state
  getConnectionState(): 'disconnected' | 'connecting' | 'connected' {
    return this.connectionState;
  }
  
  // Getter for key exchange status
  isKeyExchangeCompleted(): boolean {
    return this.isKeyExchangeComplete;
  }
}