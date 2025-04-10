
interface DoctorDTO {
    doctorID: number;
    degree?: string; // Max length 100
    doctorRegistrationNumber: string; // Format: Number-Alphabet
    verificationStatusID: number;
    verification: any;
    rating: number;
    profileImage?: string;
    person?: any;
    specializationID: number;
    specialization: any;
    doctorHospitals?: any[];
    appointments?: any[];
    medicalReports?: any[];
    chats?: any[];
}
