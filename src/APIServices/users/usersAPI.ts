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

export const signupUser = async (userData: any) => {
  console.log(userData);
  try {
    // Transform the input data to match the expected API format
    const registerData: RegisterDto = {
      name: userData.name,
      email: userData.email,
      CNIC: userData.CNIC,
      password: userData.password,
      phoneNumber: userData.phone, // Map 'phone' to 'phoneNumber'
      role: userData.role,
      authMethodType: userData.AuthMethod || 'local',
    };
    
    // Add optional doctor fields if applicable
    if (userData.role === 'Doctor') {
      registerData.specialty = userData.specialization ? Number(userData.specialization) : undefined;
      registerData.doctorRegistrationNumber = userData.registrationNumber || undefined;
    }
    
    const response = await axios.post(`${api_base_url}/Person/register`, registerData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error; // Re-throw error to be handled in the component
  }
};
