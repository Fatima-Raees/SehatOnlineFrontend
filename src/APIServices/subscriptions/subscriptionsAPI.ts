import axios from 'axios';
const api_base_url = process.env.NEXT_PUBLIC_API_Base_URL 
// 'https://localhost:7259/api'; // Fallback to localhost
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
//write an API to get all the plans
export const getAllPlans = async () => {
  try {
    const response = await axios.get(`${api_base_url}/Plans/getallplans`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.data;
    const formattedSubscriptions = data.map((item: any) => ({
      id: `SUB-${item.planID.toString().padStart(3, "0")}`,
      name: item.planName,
      plan: item.planType,
      startDate: new Date(item.createdAt).toLocaleDateString(),
      endDate: new Date(item.updatedAt).toLocaleDateString(),
    }));
    return formattedSubscriptions; // Returns the formatted list of plans
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw new Error('Failed to fetch plans');
  }
};
