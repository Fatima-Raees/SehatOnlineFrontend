import axios from "axios";
const api_base_url = "https://localhost:7259/api";

export type AppointmentStatus = "Completed" | "Pending" | "Confirmed" | "Cancelled";

export interface AppointmentDTO {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: string;
  notes: string;
}

export interface AppointmentResponse {
  PersonId: number;
  status?: string;
  SortBy?: string;
  Order?: string;
}

// Create an axios instance for consistency and easier updates
const api = axios.create({
  baseURL: api_base_url,
});

export const getAppointmentsByDoctor = async (
  request: AppointmentResponse
): Promise<AppointmentDTO[]> => {
  try {
    
    const response = await api.post("/Appointment/person", request);
    
   
    return response.data;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    throw new Error("Could not fetch appointments");
  }
};

export const getAppointmentsByStatusAndDoctor = async (
  request: AppointmentResponse
): Promise<AppointmentDTO[]> => {
  try {

    const response = await api.post("/Appointment/person/status/", request);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${request.status} appointments:`, error);
    throw new Error(`Could not fetch ${request.status} appointments`);
  }
};

export const getAppointmentById = async (id: number): Promise<AppointmentDTO> => {
  try {
    const response = await api.get(`/Appointment/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch appointment:", error);
    throw new Error("Could not fetch appointment");
  }
};

export const confirmAppointment = async (id: number): Promise<void> => {
  try {
    await api.put(`/Appointment/${id}/confirm`);
  } catch (error) {
    console.error("Failed to confirm appointment:", error);
    throw new Error("Could not confirm appointment");
  }
};

export const cancelAppointment = async (id: number): Promise<void> => {
  try {
    await api.put(`/Appointment/${id}/cancel`);
  } catch (error) {
    console.error("Failed to cancel appointment:", error);
    throw new Error("Could not cancel appointment");
  }
};
