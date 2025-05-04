// encryption.service.ts
export class EncryptionService {
    private keyPair: CryptoKeyPair | null = null;
    private otherUserPublicKey: CryptoKey | null = null;
    private userId: number | null = null;
    private isDoctor: boolean = false;
    private otherUserId: number | null = null;
  // 
    /**
     * Initialize the encryption service and generate keys
     */
    async initialize(userId: number, isDoctor: boolean, otherUserId: number): Promise<void> {
      this.userId = userId;
      this.isDoctor = isDoctor;
      this.otherUserId = otherUserId;
      
      // Generate new RSA key pair for asymmetric encryption
      this.keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true, // extractable
        ["encrypt", "decrypt"] // key usages
      );
  
      // Export the public key in a format that can be sent over the network
      await this.exportPublicKey();
    }
  
    /**
     * Export the public key as a base64 string
     */
    async exportPublicKey(): Promise<string> {
      if (!this.keyPair || !this.keyPair.publicKey) {
        throw new Error("Key pair not initialized");
      }
      
      const exported = await window.crypto.subtle.exportKey(
        "spki",
        this.keyPair.publicKey
      );
      
      // Convert the ArrayBuffer to base64
      return this.arrayBufferToBase64(exported);
    }
  
    /**
     * Import another user's public key
     */
    async importPublicKey(publicKeyBase64: string): Promise<void> {
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
    }
  
    /**
     * Encrypt a message using the other user's public key
     */
    async encryptMessage(message: string): Promise<string> {
      if (!this.otherUserPublicKey) {
        throw new Error("Other user's public key not set");
      }
      
      // Convert the message to an ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      
      // Encrypt the data with the other user's public key
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        this.otherUserPublicKey,
        data
      );
      
      // Convert the encrypted data to a base64 string
      return this.arrayBufferToBase64(encryptedData);
    }
  
    /**
     * Decrypt a message using our private key
     */
    async decryptMessage(encryptedMessage: string): Promise<string> {
      if (!this.keyPair || !this.keyPair.privateKey) {
        throw new Error("Key pair not initialized");
      }
      
      // Convert the base64 string to an ArrayBuffer
      const encryptedData = this.base64ToArrayBuffer(encryptedMessage);
      
      // Decrypt the data with our private key
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP"
        },
        this.keyPair.privateKey,
        encryptedData
      );
      
      // Convert the decrypted data to a string
      const decoder = new TextDecoder();
      return decoder.decode(decryptedData);
    }
  
    /**
     * Helper method to convert an ArrayBuffer to a base64 string
     */
    private arrayBufferToBase64(buffer: ArrayBuffer): string {
      const binary = String.fromCharCode.apply(null, 
        new Uint8Array(buffer) as unknown as number[]);
      return window.btoa(binary);
    }
  
    /**
     * Helper method to convert a base64 string to an ArrayBuffer
     */
    private base64ToArrayBuffer(base64: string): ArrayBuffer {
      const binaryString = window.atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }
  
    // For hybrid encryption (more secure for larger messages)
    async hybridEncrypt(message: string): Promise<string> {
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
        this.otherUserPublicKey!,
        exportedAesKey
      );
      
      // Combine the encrypted AES key, IV, and encrypted message
      const result = {
        encryptedKey: this.arrayBufferToBase64(encryptedAesKey),
        iv: this.arrayBufferToBase64(iv.buffer),
        encryptedMessage: this.arrayBufferToBase64(encryptedMessage) // Added this line
      };
      
      // Convert to JSON string
      return JSON.stringify(result);
    }
    
    async hybridDecrypt(encryptedPackage: string): Promise<string> {
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
        this.keyPair!.privateKey!,
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
    }
  }