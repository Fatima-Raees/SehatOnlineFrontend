"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAppointmentInformationById, updateAppointmentDetails } from "@/APIServices/Appointments/appointmentService";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, User, Calendar, Clock } from "lucide-react";

// Reusable Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
  </div>
);

// Reusable Error Message Component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
    <p>{message}</p>
  </div>
);

// Appointment Information Component
const AppointmentInfo = ({ patientName, date, time }: { patientName?: string; date?: string; time?: string }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h2>
    <div className="space-y-3">
      <p className="flex items-center text-gray-600">
        <User className="w-5 h-5 mr-2 text-blue-500" />
        <span><strong>Patient:</strong> {patientName || "N/A"}</span>
      </p>
      <p className="flex items-center text-gray-600">
        <Calendar className="w-5 h-5 mr-2 text-blue-500" />
        <span><strong>Date:</strong> {date || "N/A"}</span>
      </p>
      <p className="flex items-center text-gray-600">
        <Clock className="w-5 h-5 mr-2 text-blue-500" />
        <span><strong>Time:</strong> {time || "N/A"}</span>
      </p>
    </div>
  </div>
);

// Form Section Component
const FormSection = ({
  diagnosis,
  suggestedTests,
  setDiagnosis,
  setSuggestedTests,
  onSave,
}: {
  diagnosis: string;
  suggestedTests: string;
  setDiagnosis: (value: string) => void;
  setSuggestedTests: (value: string) => void;
  onSave: () => void;
}) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Prescription</label>
      <Textarea
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        placeholder="Enter prescription or diagnosis..."
        className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
        rows={5}
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Suggested Tests</label>
      <Textarea
        value={suggestedTests}
        onChange={(e) => setSuggestedTests(e.target.value)}
        placeholder="Enter suggested tests (optional)..."
        className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
        rows={5}
      />
    </div>
    <Button
      onClick={onSave}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center"
    >
      <Save className="w-5 h-5 mr-2" />
      Save Details
    </Button>
  </div>
);

// Main Details Page Component
export default function DetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState("");
  const [suggestedTests, setSuggestedTests] = useState("");

  // Safely parse the ID
  const appointmentId = params?.id ? parseInt(params.id as string) : NaN;

  // Redirect if ID is invalid
  useEffect(() => {
    if (isNaN(appointmentId)) {
      router.push("/appointments");
    }
  }, [appointmentId, router]);

  // Fetch appointment data
  const {
    data: appointment,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appointmentInformation", appointmentId],
    queryFn: () => getAppointmentInformationById(appointmentId),
    enabled: !isNaN(appointmentId),
  });

  // Set form values when data is loaded
  useEffect(() => {
    if (appointment) {
      setDiagnosis(appointment.prescription || "");
      setSuggestedTests(appointment.testSuggestion || "");
    }
  }, [appointment]);

  // Handle form submission
  const mutation = useMutation({
    mutationFn: updateAppointmentDetails,
    onSuccess: () => {
      alert("Details saved successfully");
      router.push("/appointments");
    },
    onError: () => {
      alert("Failed to save details. Please try again.");
    },
  });

  // Handle loading and error states
  if (isNaN(appointmentId)) return null;
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Error loading appointment." />;
  if (!appointment) return <ErrorMessage message="Appointment not found." />;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-3xl">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Appointment Details</h1>
          <Button
            onClick={() => router.push("/appointments")}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-all flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>

        <div className="space-y-8">
          <AppointmentInfo
            patientName={appointment.patientName}
            date={appointment.date}
            time={appointment.time}
          />
          <FormSection
            diagnosis={diagnosis}
            suggestedTests={suggestedTests}
            setDiagnosis={setDiagnosis}
            setSuggestedTests={setSuggestedTests}
            onSave={() => mutation.mutate({ id: appointmentId, diagnosis, suggestedTests })}
          />
        </div>
      </div>
    </div>
  );
}