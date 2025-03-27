import axios from "axios";
const api_base_url = "https://localhost:7259/api";
export const loginUser = async (email: string, password: string) => {
  try {
    // if (!process.env.API_Base_URL) {
    //   throw new Error("Base API URL is not defined in environment variables.");
    // }
    const response = await axios.post(`${api_base_url}/Person/login`, { email, password });
    //console.log(response.data.success);
    return response.data; // This will contain success, message, and data
    //return response.Success ? response : null;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


export const getAllDoctorSpecializations = async () => {
    try {
        const response = await axios.get(`${api_base_url}/Person/getalldoctorsspecializationcategories`);
        console.log(response.data);
        return response.data; // This will contain success, message, and data
    } catch (error) {
        console.error("Error fetching doctor specializations:", error);
        return {
            success: false,
            message: "Failed to fetch doctor specializations",
            data: null
        };
    }
};
interface RegisterDto {
  name: string; // Required, max length 50
  email: string; // Required, valid email format, max length 100
  cnic: string; // Required, must be 13 digits
  password: string; // Required, max length 100
  phoneNumber: string; // Required, must be 11 digits
  roleId: number; // Required, lookup reference
  specialty?: number; // Optional, only required for doctors
  doctorRegistrationNumber?: string; // Optional, must match format "Number-Alphabet"
  authMethodType: string; // Required, FK to AuthMethod Lookup
}

export const signupUser = async (userData: RegisterDto) => {
  console.log(userData);
  try {
    const response = await fetch(`${api_base_url}/Person/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData; // Throw validation errors if API returns 400 Bad Request
    }

    return responseData; // Return success response
  } catch (error) {
    console.error("Signup error:", error);
    throw error; // Re-throw error to be handled in the component
  }
};
