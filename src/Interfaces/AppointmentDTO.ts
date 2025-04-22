
interface AppointmentDTO {
	appointmentID: number;
	bookingPatientID: number;
	patient: any;
	assignedDoctorID: number;
	doctor: any;
	selectedDoctorHospitalID: number;
	doctorHospital: any;
	statusID: number;
	status: any;
	timeCreated: Date;
	timeSlot: Date;
	prescriptions?: string;
	testSuggested?: string;
	medicalReports?: any[];
	appointmentTransactions: any[];
}
