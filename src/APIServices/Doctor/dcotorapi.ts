import axios from 'axios';
const api_base_url = process.env.NEXT_PUBLIC_API_Base_URL
export const fetchDashboardData = async (personId: number, date: string) => {
  try {
    console.log('Fetching dashboard data for personId:', personId, 'on date:', date); 
    const response = await axios.post(
      `${api_base_url}/Notifications/dashboard`,
      { personId, date }, // fixed typo and added comma
      {
        withCredentials: true,
      }
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
