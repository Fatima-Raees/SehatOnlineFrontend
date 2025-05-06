// frontend/APIServices/admin/adminAPI.ts

import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_Base_URL;
const token= Cookies.get("token")
  if (!token) {
    console.error("Token not found")
  }
export const getDashboardSummary = async () => {
  const response = await axios.get(`${BASE_URL}/Admin/dashboard-summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSubscriptionChart = async () => {
  const response = await axios.get(`${BASE_URL}/Admin/subscription-chart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getRecentSubscribers = async () => {
  const response = await axios.get(`${BASE_URL}/Admin/recent-subscribers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
