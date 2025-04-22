import axios from "axios"
import { DoctorProps } from "@/components/doctors/doctor-card"

const API_BASE = process.env.API_Base_URL  || "https://sehatonline20250411121316.azurewebsites.net/api"

export const getDoctorById = async (id: string) => {
  try {
    const res = await axios.get(`${API_BASE}/Doctor/getsingledoctorbasedonId?id=${id}`)
    console.log("Doctor data:", res.data);
    return res.data
  } catch (error) {
    console.error("Failed to fetch doctor:", error)
    return null
  }
}
// export const getAllDoctors = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/Doctor/getalldoctors`)
//       return res.data
//     } catch (err) {
//       console.error("Error fetching doctors:", err)
//       return []
//     }
//   }



export async function getAllDoctors(): Promise<DoctorProps[]> {
  const res = await axios.get(`${API_BASE}/Doctor/getalldoctors`)
  console.log(res)
  return res.data
}

export async function getFilteredDoctors(filters: { specialization?: string; city?: string }): Promise<DoctorProps[]> {
  const params = new URLSearchParams()
  if (filters.specialization) params.append("specialization", filters.specialization)
  if (filters.city) params.append("city", filters.city)

  const res = await axios.get(`${API_BASE}/Doctor/getfiltereddoctors?${params.toString()}`)
  return res.data
}

