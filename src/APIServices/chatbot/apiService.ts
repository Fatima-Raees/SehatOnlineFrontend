// apiService.ts
import axios from "axios";

const api_base_url = "https://localhost:7259/api";

interface ChatRequest {
  lastSystemResponse: string;
  lastSymptoms: string;
  userMessage: string;
}

interface ApiResponse {
  diagnosis: string;
}

export async function fetchChatResponse(requestData: ChatRequest, headers: Record<string, string> = {}): Promise<ApiResponse> {
  try {
    const response = await axios.post(
      `${api_base_url}/ChatBot/bot`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );

    return { diagnosis: response.data.response };
  } catch (error) {
    console.error("API call error:", error);
    throw new Error("Failed to fetch chat response from the server");
  }
}