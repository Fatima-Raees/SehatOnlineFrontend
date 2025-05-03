
// APIServices/Appointment/appointmentAPI.ts
import axios from 'axios';
const API_BASE = process.env.NEXT_PUBLIC_API_Base_URL
//  || "https://localhost:7259/api"
interface AppointmentData {
    PatientId: string;
    HospitalId: string;
    DoctorId: string
    SelectedTimeSlot: string;
}
// Book an appointment
export const bookAppointment = async (appointmentData: AppointmentData) => {
  try {
    console.log(appointmentData);
    const response = await axios.post(`${API_BASE}/Appointment/ScheduleAppointment`, appointmentData);
    return response.data;  // The response should contain a success message or status
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw new Error('Could not book the appointment. Please try again later.');
  }
};
