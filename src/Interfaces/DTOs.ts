interface DoctorHospitalDTO {
    doctorHospitalID: number;
    doctorID: number;
    doctor: any;
    hospitalID: number;
    hospital: any;
    timeStart: Date;
    timeEnd: Date;
    breakStart?: Date;
    breakEnd?: Date;
    weekDays: string;
    capacity: number;
    fee: number;
    appointments?: any[];
}
interface HospitalDTO {
    hospitalID: number; // Primary key
    name: string; // Required, max length 50
    address: string; // Required, max length 100
    city: string; // Required, max length 50
    doctorHospitals?: any[]; // Collection of DoctorHospital
}
interface LookupDTO {
    lookupID: number; // Primary key
    category: string; // Required, max length 100
    value: string; // Required, max length 100
}
interface MedicalReportDTO {
    reportID: number;
    reportDescription: string;
    reportDocument: string;
    appointmentID: number;
    appointment?: any;
}
interface NotificationDTO {
    notificationID: number;
    receiverID: number;
    receiver?: any; // Person reference
    message: string;
    timeSent: Date;
}

interface PatientDTO {
    patientID: number;
    address?: string;
    person?: any; // Person reference
    appointments?: any[]; // Collection of Appointment
    chats?: any[]; // Collection of Chat
}

interface PlansDTO {
    planID: number;
    planName: string;
    price: number; // decimal in TypeScript is number
    features: string;
    planType: string;
    createdAt: Date;
    updatedAt: Date;
    users?: any[]; // Collection of Person
}
interface PlanTransactionDTO extends TransactionBaseDTO {
    transactionPlanID: number;
    plan?: PlansDTO;
}
interface AppointmentTransactionDTO extends TransactionBaseDTO {
    transactionAppointmentID: number;
    appointment?: AppointmentDTO;
}
interface TransactionBaseDTO {
    transactionID: number;
    senderTransactionPersonID: number;
    senderPerson?: any; // Person reference
    receiverTransactionPersonID: number;
    receiverPerson?: any; // Person reference
    amount: number;
    paymentStatus: number;
    payment?: LookupDTO;
    paymentDate: Date;
}