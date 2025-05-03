import axios from "axios";
const api_base_url = "https://localhost:7259/api";

export type AppointmentStatus = "Completed" | "Pending" | "Confirmed" | "Cancelled";

export interface AppointmentDTO {
  id: number;
  patientName ?: string;
  date: string;
  time: string;
  status: string;
  notes: string;
  doctorName ?: string;
}


export interface AppointmentInformationDTO {
  patientName: string;
  date: string;
  time: string;
  prescription: string;
  testSuggestion: string;
}

export interface MedicalReportDto {
  medicalReportUrl: string;
  ReportDescription: string;
}

export interface AppointmentDetailsDTO {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  notes: string;
  prescription: string;
  testSuggestion: string;
  medicalReports: MedicalReportDto[];
}

export interface AppointmentResponse {
  PersonId: number;
  status?: string;
  SortBy?: string;
  Order?: string;
}

export interface ReportUploadDTO {
  reportDescription: string;
  doctorId: number;
  file: File;
}

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

export const getAppointmentsByStatusAndPatient = async (
  request: AppointmentResponse
): Promise<AppointmentDTO[]> => {
  try {
    const response = await api.post("/Appointment/patient/status/", request);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${request.status} appointments:`, error);
    throw new Error(`Could not fetch ${request.status} appointments`);
  }
};

export const getAppointmentById = async (id: number): Promise<AppointmentDetailsDTO> => {
  try {
    const response = await api.get(`/Appointment/${id}`);
    console.log("Appointment Information:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch appointment:", error);
    throw new Error("Could not fetch appointment");
  }
};

export const getAppointmentsByPatient= async (
  request: AppointmentResponse
): Promise<AppointmentDTO[]> => {
  try {
    const response = await api.post("/Appointment/patient", request);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    throw new Error("Could not fetch appointments");
  }
};

export const getAppointmentInformationById = async (id: number): Promise<AppointmentInformationDTO> => {
  try {
    const response = await api.get(`/Appointment/${id}/info`);
    
    return response.data;
  } catch (error) {
    console.error("Failed to fetch appointment information:", error);
    throw new Error("Could not fetch appointment information");
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

export async function updateAppointmentDetails(data: {
  id: number;
  diagnosis: string;
  suggestedTests: string;
}) {
  console.log("Updating appointment details:", data);
  const res = await fetch(`${api_base_url}/Appointment/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      diagnosis: data.diagnosis,
      suggestedTests: data.suggestedTests,
    }),
  });

  if (!res.ok) throw new Error("Failed to update appointment details");
}
export interface UploadResponse {
  viewUrl: string;
}

export async function uploadFileToServer(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${api_base_url}/Appointment/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();

  if (!data.viewUrl) {
    throw new Error("Server did not return view URL.");
  }

  return data;
}

export async function uploadMedicalReport(appointmentId: number, reportData: ReportUploadDTO): Promise<void> {
  const formData = new FormData();
  formData.append("file", reportData.file);
  formData.append("reportDescription", reportData.reportDescription);
  formData.append("doctorId", reportData.doctorId.toString());

  const res = await fetch(`${api_base_url}/Appointment/add-report-Data/${appointmentId}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to upload medical report");
  }
}