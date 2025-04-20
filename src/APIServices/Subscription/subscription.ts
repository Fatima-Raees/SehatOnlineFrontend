import axios from 'axios';

const api_base_url = 'https://localhost:7259/api'; // Adjust based on your backend URL

export const fetchAllSubscriptions = async () => {
  try {
    console.log('Fetching all subscriptions');
    const response = await axios.get(
      `${api_base_url}/Subscription/getallsubscriptions`,
    //   {
    //     withCredentials: true,
    //   }
    );

    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return {
      success: false,
      message: 'Failed to fetch subscriptions',
      data: null,
    };
  }
};