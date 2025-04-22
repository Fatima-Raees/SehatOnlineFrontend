interface RegisterDto {
    name: string; // Required, max length 50
    email: string; // Required, valid email format, max length 100
    CNIC: string; // Required, must be 13 digits
    password: string; // Required, max length 100
    phoneNumber: string; // Required, must be 11 digits
    role: string; // Required, lookup reference
    specialty?: number; // Optional, only required for doctors
    doctorRegistrationNumber?: string; // Optional, must match format "Number-Alphabet"
    authMethodType: string; // Required, FK to AuthMethod Lookup
  }