import axios from "axios";

interface SearchDoctorsRequest {
  specialty: string;
  date: string;
  time: string;
}

interface DoctorResult {
  doctor_id: number;
  name: string;
  specialty: string;
  available_slots?: Array<{
    date: string;
    time: string;
  }>;
}

interface SearchDoctorsResponse {
  data: DoctorResult[];
}

const api_base_url = "https://localhost:7259/api";

export async function handler(
  req: { method: string; body: SearchDoctorsRequest },
  res: { status: (code: number) => { json: (data: any) => void } }
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { specialty, date, time } = req.body;

    if (!specialty || !date) {
      return res.status(400).json({ message: "Specialty and date are required" });
    }

    console.log("Searching doctors with params:", { specialty, date, time });

    const response = await axios.post(
      `${api_base_url}/doctors/search`,
      { specialty, date, time },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ data: response.data } as SearchDoctorsResponse);
  } catch (error: any) {
    console.error("Error searching doctors:", error);
    return res.status(500).json({
      message: "Error searching doctors",
      error: error.response?.data || error.message,
    });
  }
}

export default handler;