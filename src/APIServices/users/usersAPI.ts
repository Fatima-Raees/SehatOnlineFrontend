import axios from "axios";
import Cookies from "js-cookie";
const api_base_url = process.env.NEXT_PUBLIC_API_Base_URL

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

export const sendOTP = async (email: string) => {
  try {
    const response = await axios.post(`${api_base_url}/Person/send-otp`, {
      email,
    },{withCredentials: true});
    console.log(response.data);
    return {
      success: true,
      message: "OTP sent successfully",
      data: response.data
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message: "Failed to send OTP",
      data: null
    };
  }
};

export const validateRegistration = async (registrationNumber: string, fullName: string) => {
  try {
    const response = await axios.post(`${api_base_url}/Person/validate-registration`, {
      registrationNumber,
      fullName,
    }, { withCredentials: true });

    console.log(response.data);

    // Check if the response indicates success
    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message || "Registration number is invalid or doesn't match your name",
        data: null
      };
    }

    return {
      success: true,
      message: "Registration validated successfully",
      data: { isValid: response.data.isValid }
    };
  } catch (error: any) {
    console.error("Error validating registration:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to validate registration. Please try again.",
      data: null
    };
  }
};
export const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${api_base_url}/Person/verify-otp`, {
      email,
      otp,
    },{withCredentials: true});

    return {
      success: true,
      message: response.data, 
    };
  } catch (error: any) {
    const errorMsg =
      error?.response?.data || "Failed to verify OTP. Please try again.";
    return {
      success: false,
      message: errorMsg,
    };
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
export const checkDuplicate = async (email: string, cnic: string) => {
  try {
      const response = await axios.post(`${api_base_url}/Person/checkduplicate`, {
          email,
          cnic
      });
      console.log(response.data);
      return response.data; // { success: true, message: "Email and CNIC are unique." }
  } catch (error: any) {
      console.log("Error checking duplicates:",error.response?.data?.errors );
      return {
        
          success: false,
          message: error.response?.data?.errors || "Email or CNIC already exists.",
          errors: error.response?.data?.errors || null
      };
  }
};
interface RegisterDto {
  name: string; // Required, max length 50
  email: string; // Required, valid email format, max length 100
  CNIC: string; // Required, must be 13 digits
  password: string; // Required, max length 100
  phoneNumber: string; // Required, must be 11 digits
  role: string; // Required, lookup reference
  specialty?: number; // Optional, only required for doctors
  doctorRegistrationNumber?: string; // Optional, must match format "Number-Alphabet"
  authMethodType: string; // Required, FK to AuthMethod Lookup
}

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
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${api_base_url}/Person/logout`, {}, { withCredentials: true });
    // Clear cookies or local storage if needed
    Cookies.remove("role");
    Cookies.remove("PersonID");
    Cookies.remove("loggedIn");
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};