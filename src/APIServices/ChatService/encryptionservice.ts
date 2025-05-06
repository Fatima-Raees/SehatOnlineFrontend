// encryption.service.ts
export class EncryptionService {
  private keyPair: CryptoKeyPair | null = null;
  private otherUserPublicKey: CryptoKey | null = null;
  private userId: number | null = null;
  private isDoctor: boolean = false;
  private otherUserId: number | null = null;
  private initializationPromise: Promise<void> | null = null;

  /**
   * Initialize the encryption service and generate keys
   */
  async initialize(userId: number, isDoctor: boolean, otherUserId: number): Promise<void> {
    if (this.initializationPromise) {
      console.log("Encryption service is already initializing...");
      return this.initializationPromise;
    }

    console.log(`Initializing encryption service for userId=${userId}, isDoctor=${isDoctor}, otherUserId=${otherUserId}`);
    this.userId = userId;
    this.isDoctor = isDoctor;
    this.otherUserId = otherUserId;

    this.initializationPromise = this._initialize();
    return this.initializationPromise;
  }

  private async _initialize(): Promise<void> {
    try {
      console.log("Generating RSA key pair...");
      this.keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );
      console.log("RSA key pair generated successfully.");
    } catch (error) {
      console.error("Error initializing encryption service:", error);
      this.initializationPromise = null;
      throw error;
    }
  }

  /**
   * Export the public key as a base64 string
   */
  async exportPublicKey(): Promise<string> {
    if (this.initializationPromise) {
      console.log("Waiting for encryption service initialization to complete...");
      await this.initializationPromise;
    }

    if (!this.keyPair || !this.keyPair.publicKey) {
      throw new Error("Key pair not initialized");
    }

    try {
      console.log("Exporting public key...");
      const exported = await window.crypto.subtle.exportKey("spki", this.keyPair.publicKey);
      const publicKeyBase64 = this.arrayBufferToBase64(exported);
      console.log("Public key exported successfully:", publicKeyBase64);
      return publicKeyBase64;
    } catch (error) {
      console.error("Error exporting public key:", error);
      throw error;
    }
  }

  /**
   * Import another user's public key
   */
  async importPublicKey(publicKeyBase64: string): Promise<void> {
    console.log("Importing public key:", publicKeyBase64);

    if (!publicKeyBase64 || publicKeyBase64.trim().length === 0) {
      throw new Error("Invalid public key provided");
    }

    try {
      const binaryString = window.atob(publicKeyBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      this.otherUserPublicKey = await window.crypto.subtle.importKey(
        "spki",
        bytes,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        ["encrypt"]
      );
      console.log("Public key imported successfully.");
    } catch (error) {
      console.error("Error importing public key:", error);
      throw error;
    }
  }

  /**
   * Encrypt a message using the other user's public key
   */
  async encryptMessage(message: string): Promise<string> {
    console.log("Encrypting message:", message);

    if (!this.otherUserPublicKey) {
      throw new Error("Other user's public key not set");
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);

      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        this.otherUserPublicKey,
        data
      );

      const encryptedMessageBase64 = this.arrayBufferToBase64(encryptedData);
      console.log("Message encrypted successfully:", encryptedMessageBase64);
      return encryptedMessageBase64;
    } catch (error) {
      console.error("Error encrypting message:", error);
      throw error;
    }
  }

  /**
   * Decrypt a message using our private key
   */
  async decryptMessage(encryptedMessage: string): Promise<string> {
    console.log("Decrypting message:", encryptedMessage);

    if (!this.keyPair || !this.keyPair.privateKey) {
      throw new Error("Key pair not initialized");
    }

    try {
      const encryptedData = this.base64ToArrayBuffer(encryptedMessage);
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP",
        },
        this.keyPair.privateKey,
        encryptedData
      );

      const decoder = new TextDecoder();
      const decryptedMessage = decoder.decode(decryptedData);
      console.log("Message decrypted successfully:", decryptedMessage);
      return decryptedMessage;
    } catch (error) {
      console.error("Decryption failed:", error);
      throw error;
    }
  }

  /**
   * Helper method to convert an ArrayBuffer to a base64 string
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    try {
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    } catch (error) {
      console.error("Error converting ArrayBuffer to base64:", error);
      throw error;
    }
  }

  /**
   * Helper method to convert a base64 string to an ArrayBuffer
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    try {
      const binaryString = window.atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    } catch (error) {
      console.error("Error converting base64 to array buffer:", error);
      throw error;
    }
  }

  // For hybrid encryption (more secure for larger messages)
  async hybridEncrypt(message: string): Promise<string> {
    if (!this.otherUserPublicKey) {
      throw new Error("Other user's public key not set");
    }
    
    try {
      // Generate a random AES key
      const aesKey = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
      
      // Generate a random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      // Encrypt the message with AES
      const encoder = new TextEncoder();
      const encodedMessage = encoder.encode(message);
      const encryptedMessage = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        aesKey,
        encodedMessage
      );
      
      // Export the AES key
      const exportedAesKey = await window.crypto.subtle.exportKey("raw", aesKey);
      
      // Encrypt the AES key with the recipient's public key
      const encryptedAesKey = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        this.otherUserPublicKey,
        exportedAesKey
      );
      
      // Combine the encrypted AES key, IV, and encrypted message
      const result = {
        encryptedKey: this.arrayBufferToBase64(encryptedAesKey),
        iv: this.arrayBufferToBase64(iv.buffer),
        encryptedMessage: this.arrayBufferToBase64(encryptedMessage)
      };
      
      // Convert to JSON string
      return JSON.stringify(result);
    } catch (error) {
      console.error("Error in hybrid encryption:", error);
      throw error;
    }
  }
  
  async hybridDecrypt(encryptedPackage: string): Promise<string> {
    if (!this.keyPair || !this.keyPair.privateKey) {
      throw new Error("Key pair not initialized");
    }
    
    try {
      // Parse the JSON string
      const parsedPackage = JSON.parse(encryptedPackage);
      
      // Extract the components
      const encryptedAesKey = this.base64ToArrayBuffer(parsedPackage.encryptedKey);
      const iv = this.base64ToArrayBuffer(parsedPackage.iv);
      const encryptedMessage = this.base64ToArrayBuffer(parsedPackage.encryptedMessage);
      
      // Decrypt the AES key with our private key
      const aesKeyBuffer = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP"
        },
        this.keyPair.privateKey,
        encryptedAesKey
      );
      
      // Import the AES key
      const aesKey = await window.crypto.subtle.importKey(
        "raw",
        aesKeyBuffer,
        {
          name: "AES-GCM",
          length: 256
        },
        false,
        ["decrypt"]
      );
      
      // Decrypt the message with the AES key
      const decryptedMessage = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: new Uint8Array(iv)
        },
        aesKey,
        encryptedMessage
      );
      
      // Convert the decrypted data to a string
      const decoder = new TextDecoder();
      return decoder.decode(decryptedMessage);
    } catch (error) {
      console.error("Error in hybrid decryption:", error);
      throw error;
    }
  }

  // Check if encryption is ready (keys are generated and exchanged)
  isReady(): boolean {
    const ready = !!this.keyPair && !!this.otherUserPublicKey;
    console.log("Encryption ready status:", ready);
    return ready;
  }
}