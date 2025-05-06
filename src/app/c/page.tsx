"use client";

import { useState, useCallback, useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Import handlers directly to avoid API route issues
import { handler as intentHandler } from "@/APIServices/chatbot/intent";
import { handler as searchDoctorsHandler } from "@/APIServices/chatbot/searchDoctors";
import { fetchChatResponse } from "@/APIServices/chatbot/apiService";

interface ChatMessage {
  role: "user" | "system";
  content: string;
  showSearchForm?: boolean;
  searchResults?: DoctorResult[];
}

interface DoctorResult {
  doctor_id: number;
  name: string;
  specialty: string;
  available_slots?: Array<{
    date: string;
    time: string;
  }>;
}

interface SearchData {
  specialty: string;
  date: string;
  time: string;
}

interface IntentResponse {
  intent: string;
  appointmentScore: number;
  symptomScore: number;
}

interface DiagnosisResponse {
  diagnosis: string;
}

interface SearchDoctorsResponse {
  data: DoctorResult[];
}

interface ErrorResponse {
  message: string;
  error?: any;
}

interface ConversationContext {
  currentIntent: string;
  lastSymptoms?: string;
  lastResponse?: string;
  followUpCount: number;
}

interface ResponseObject {
  statusCode: number;
  responseBody: {
    message?: string;
    intent?: string;
    appointmentScore?: number;
    symptomScore?: number;
    diagnosis?: string;
    data?: DoctorResult[];
  };
  status: (code: number) => ResponseObject;
  json: (data: any) => ResponseObject;
}

// Type guards to check if response is an error or not
function isErrorResponse(response: any): response is ErrorResponse {
  return 'message' in response && !('intent' in response) && !('diagnosis' in response) && !('data' in response);
}

function isIntentResponse(response: IntentResponse | ErrorResponse): response is IntentResponse {
  return 'intent' in response;
}

function isDiagnosisResponse(response: DiagnosisResponse | ErrorResponse): response is DiagnosisResponse {
  return 'diagnosis' in response;
}

function isSearchDoctorsResponse(response: SearchDoctorsResponse | ErrorResponse): response is SearchDoctorsResponse {
  return 'data' in response;
}

function createResObject(): ResponseObject {
  const resObj: ResponseObject = {
    statusCode: 200,
    responseBody: {},
    status: function (code: number) {
      this.statusCode = code;
      return this;
    },
    json: function (data: any) {
      this.responseBody = data;
      return this;
    },
  };
  return resObj;
}

const FOLLOW_UP_KEYWORDS = ['explain', 'more', 'detail', 'further', 'elaborate', 'tell me more'];

export default function MedicalAssistantDemo() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "Hello! I can help with medical symptoms or scheduling an appointment. How can I assist you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchData>({ specialty: "", date: "", time: "" });
  const { toast } = useToast();
  
  // Maintain conversation context
  const contextRef = useRef<ConversationContext>({
    currentIntent: "unknown",
    lastResponse: undefined,
    followUpCount: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSearchDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const isFollowUpQuestion = (text: string): boolean => {
    const lowercaseInput = text.toLowerCase();
    return FOLLOW_UP_KEYWORDS.some(keyword => lowercaseInput.includes(keyword));
  };

  const processIntent = async (userInput: string): Promise<IntentResponse | ErrorResponse> => {
    const reqObj = { method: "POST", body: { userInput } };
    const resObj = createResObject();

    await intentHandler(reqObj, resObj);

    if (resObj.statusCode !== 200) {
      throw new Error(resObj.responseBody.message || "Failed to process intent");
    }

    return resObj.responseBody as IntentResponse;
  };

  const processSymptoms = async (userMessage: string): Promise<string> => {
    try {
      const context = contextRef.current;
      
      // For symptom queries, we need to track if it's a follow-up
      const isFollowUp = isFollowUpQuestion(userMessage);
      if (isFollowUp) {
        context.followUpCount++;
      } else {
        context.followUpCount = 0;
        context.lastSymptoms = userMessage;
      }

      // Prepare request data with lastResponse if available
      const requestData = {
        lastSystemResponse: context.lastResponse || "",
        lastSymptoms: context.lastSymptoms || "",

        userMessage,
        // Will be undefined for first query
      };

      // Make a single call to the API
      const response = await fetchChatResponse(requestData);
      
      if (isDiagnosisResponse(response)) {
        // Store this response for future follow-ups
        context.lastResponse = response.diagnosis;
        return response.diagnosis;
      } else if (isErrorResponse(response)) {
        throw new Error(response);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Symptom processing error:", error);
      return "I'm having trouble analyzing your symptoms right now. Could you please provide more details or try again later?";
    }
  };

  const searchDoctors = async (searchParams: SearchData): Promise<SearchDoctorsResponse | ErrorResponse> => {
    const reqObj = { method: "POST", body: searchParams };
    const resObj = createResObject();

    await searchDoctorsHandler(reqObj, resObj);

    if (resObj.statusCode !== 200) {
      throw new Error(resObj.responseBody.message || "Failed to search doctors");
    }

    return resObj.responseBody as SearchDoctorsResponse;
  };

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim()) return;

    const message = userInput.trim();
    setUserInput("");
    setChatHistory((prev) => [
      ...prev, 
      { role: "user", content: message }
    ]);
    setLoading(true);

    try {
      // First determine if this is a symptom follow-up
      const context = contextRef.current;
      const isSymptomFollowUp = isFollowUpQuestion(message) && context.currentIntent === "symptom";
      
      // If it's a symptom follow-up, skip intent processing
      if (isSymptomFollowUp) {
        const response = await processSymptoms(message);
        
        // Check if we've reached the maximum follow-up count
        const responseContent = context.followUpCount > 3 
          ? response + "\n\nI've provided several details about your symptoms. For a more accurate diagnosis, I recommend consulting a healthcare professional."
          : response;
          
        setChatHistory((prev) => [
          ...prev,
          { role: "system", content: responseContent }
        ]);
      } else {
        // Process intent for new queries
        const intentResult = await processIntent(message);
        
        if (isErrorResponse(intentResult)) {
          throw new Error(intentResult.message);
        }
        
        context.currentIntent = intentResult.intent;
        
        if (intentResult.intent === "appointment") {
          setChatHistory((prev) => [
            ...prev,
            {
              role: "system",
              content: "I'd be happy to help you find a doctor. Please provide the following details:",
              showSearchForm: true,
            },
          ]);
        } else if (intentResult.intent === "symptom") {
          const diagnosisResponse = await processSymptoms(message);
          
          setChatHistory((prev) => [
            ...prev,
            { role: "system", content: diagnosisResponse },
          ]);
        } else {
          setChatHistory((prev) => [
            ...prev,
            {
              role: "system",
              content:
                "I can help with medical symptoms or scheduling an appointment. Could you please clarify what you need help with?",
            },
          ]);
        }
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "system",
          content: "I'm experiencing technical difficulties. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [userInput, chatHistory]);

  const handleSearch = useCallback(async () => {
    if (!searchData.date) {
      toast({
        title: "Missing Information",
        description: "Please select a date for your appointment",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const searchResult = await searchDoctors(searchData);
      
      if (isSearchDoctorsResponse(searchResult)) {
        const doctors = searchResult.data;

        if (doctors && doctors.length > 0) {
          setChatHistory((prev) => [
            ...prev,
            {
              role: "system",
              content: `I found ${doctors.length} doctor${doctors.length > 1 ? "s" : ""} matching your criteria:`,
              searchResults: doctors,
            },
          ]);
        } else {
          setChatHistory((prev) => [
            ...prev,
            {
              role: "system",
              content: "I couldn't find any doctors matching your criteria. Please try different search parameters.",
            },
          ]);
        }
      } else {
        throw new Error(searchResult.message);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Failed to search for doctors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [searchData, toast]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold">Medical Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {chatHistory.map((message, index) => (
          <div key={index} className={`mb-3 ${message.role === "user" ? "text-right" : ""}`}>
            <div
              className={`inline-block p-2 rounded-lg ${message.role === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
            >
              {message.content}
            </div>

            {message.showSearchForm && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <Input
                    type="text"
                    name="specialty"
                    placeholder="Specialty (e.g., Cardiologist)"
                    value={searchData.specialty}
                    onChange={handleSearchDataChange}
                    className="w-full sm:w-1/3"
                  />
                  <Input
                    type="date"
                    name="date"
                    value={searchData.date}
                    onChange={handleSearchDataChange}
                    className="w-full sm:w-1/3"
                  />
                  <Input
                    type="time"
                    name="time"
                    value={searchData.time}
                    onChange={handleSearchDataChange}
                    className="w-full sm:w-1/3"
                  />
                </div>
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? "Searching..." : "Search Doctors"}
                </Button>
              </div>
            )}

            {message.searchResults && (
              <div className="mt-2 grid grid-cols-1 gap-2">
                {message.searchResults.map((doctor) => (
                  <Card key={doctor.doctor_id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Dr. {doctor.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </CardHeader>
                    <CardContent>
                      {doctor.available_slots && doctor.available_slots.length > 0 ? (
                        <div>
                          <p className="text-sm font-medium mb-1">Available slots:</p>
                          <div className="flex flex-wrap gap-1">
                            {doctor.available_slots.slice(0, 3).map((slot, idx) => (
                              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {slot.date} at {slot.time}
                              </span>
                            ))}
                          </div>
                          <Button className="mt-2 w-full">Book Appointment</Button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No available slots</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex space-x-1 mt-2">
            <div className="bg-gray-300 rounded-full h-2 w-2 animate-bounce"></div>
            <div
              className="bg-gray-300 rounded-full h-2 w-2 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="bg-gray-300 rounded-full h-2 w-2 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        )}
      </div>

      <div className="border-t p-4 flex space-x-2">
        <Input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask about symptoms or appointments..."
          className="flex-1 p-2 border rounded"
          disabled={loading}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading || !userInput.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          Send
        </Button>
      </div>
    </div>
  );
}