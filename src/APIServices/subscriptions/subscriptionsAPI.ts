import axios from 'axios';
const api_base_url = process.env.API_Base_URL || 'https://localhost:7259/api'; // Fallback to localhost
export const addPlan = async (planData: {
  PlanName: string;
  Price: number;
  Features: string;
  PlanType: string;
}) => {
  try {
    console.log(api_base_url);
    const response = await axios.post(`${api_base_url}/Plans/addplan`, planData, {
      method: "POST",  
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    return response.data; // Returns the created plan object
  } catch (error) {
    console.error('Error adding plan:', error);
    throw new Error('Failed to add plan');
  }
};
