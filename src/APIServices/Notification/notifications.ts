import axios from "axios";

const api_base_url = "https://localhost:7259/api";

export const fetchNotifications = async (personId: number) => {
  try {
    const response = await axios.get(`${api_base_url}/Notifications`, {
      params: { personId },
      withCredentials: true,
    });

    return {
      success: true,
      message: "Notifications fetched successfully",
      data: response.data
    };
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch notifications.",
      data: null
    };
  }
};
export const sendNotification = async (
    receiverId: number,
    message: string,
    timeSent: Date
  ) => {
    try {
      const response = await axios.post(
        `${api_base_url}/notifications/send`,
        {
          receiverId,
          message,
          timeSent,
        },
        { withCredentials: true }
      );
  
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error: any) {
      console.error("Error sending notification:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to send notification.",
      };
    }
  };
  export const fetchDashboardData = async (
    personId: number
  ) => {
    try {
      console.log("Fetching dashboard data for personId:", personId); // Debugging line
      const response = await axios.post(
        `${api_base_url}/notifications/dashboard`,
        {
          personId
          
        },
        { withCredentials: true }
      );
  
      return {
        success: true,
        message: 'Dashboard data fetched successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
        success: false,
        message: 'Failed to fetch dashboard data',
        data: null,
      };
    }
  };
