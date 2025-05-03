import axios from "axios"
import { DoctorProps } from "@/components/doctors/doctor-card"
import Cookies from "js-cookie"

const API_BASE = process.env.NEXT_PUBLIC_API_Base_URL;
if (!process.env.NEXT_PUBLIC_API_Base_URL) {
  console.warn("API_Base_URL is not set in the .env file. Using default API URL:", API_BASE);
} else {
  console.log("API_BASE loaded successfully:", API_BASE);
}
// || "https://localhost:7259/api"
const token= Cookies.get("token")
  if (!token) {
    console.error("Token not found")
  }
export const getDoctorById = async (id: string) => {
  try {
    console.log("Hello",API_BASE);
    const res = await axios.get(`${API_BASE}/Doctor/getsingledoctorbasedonId?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Doctor data:", res.data);
    return res.data
  } catch (error) {
    console.error("Failed to fetch doctor:", error)
    return null
  }
}



export async function getAllDoctors(): Promise<DoctorProps[]> {
  
  console.log("Hello",API_BASE);
  const res = await axios.get(`${API_BASE}/Doctor/getalldoctors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res)
  return res.data
  
}

export async function getFilteredDoctors(filters: { specialization?: string; city?: string }): Promise<DoctorProps[]> {
  const params = new URLSearchParams()
  if (filters.specialization) params.append("specialization", filters.specialization)
  if (filters.city) params.append("city", filters.city)

  const res = await axios.get(`${API_BASE}/Doctor/getfiltereddoctors?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data
}

