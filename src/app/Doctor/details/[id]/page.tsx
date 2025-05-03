"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getAppointmentInformationById, updateAppointmentDetails } from "@/APIServices/Appointments/appointmentService"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, User, Calendar, Clock, FileText, Microscope } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

// Types for appointment data
interface Appointment {
  id: number
  patientName: string
  date: string
  time: string
  prescription?: string
  testSuggestion?: string
}

// Reusable Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
  </div>
)

// Reusable Error Message Component
const ErrorMessage = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-md"
  >
    <p className="text-destructive">{message}</p>
  </motion.div>
)

// Appointment Information Component
const AppointmentInfo = ({ patientName, date, time }: { patientName?: string; date?: string; time?: string }) => (
  <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-slate-50 to-white">
    <CardHeader className="pb-2 border-b bg-slate-50/50">
      <CardTitle className="text-lg font-medium text-slate-800">Patient Information</CardTitle>
    </CardHeader>
    <CardContent className="pt-6">
      <div className="space-y-4">
        <div className="flex items-center text-slate-700">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Patient Name</p>
            <p className="font-medium">{patientName || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center text-slate-700">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Appointment Date</p>
            <p className="font-medium">{date || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center text-slate-700">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Appointment Time</p>
            <p className="font-medium">{time || "N/A"}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Loading Skeleton for Appointment Info
const AppointmentInfoSkeleton = () => (
  <Card className="overflow-hidden border-none shadow-md">
    <CardHeader className="pb-2 border-b">
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent className="pt-6">
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="w-9 h-9 rounded-full mr-3" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Form Section Component
const FormSection = ({
  diagnosis,
  suggestedTests,
  setDiagnosis,
  setSuggestedTests,
  onSave,
  isSubmitting,
}: {
  diagnosis: string
  suggestedTests: string
  setDiagnosis: (value: string) => void
  setSuggestedTests: (value: string) => void
  onSave: () => void
  isSubmitting: boolean
}) => (
  <Card className="border-none shadow-md">
    <CardContent className="pt-6">
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-3">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            <label htmlFor="prescription" className="text-sm font-medium text-slate-800">
              Prescription & Diagnosis
            </label>
          </div>
          <Textarea
            id="prescription"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter detailed prescription or diagnosis notes..."
            className="w-full resize-none border-slate-200 focus:border-primary focus:ring-primary/20"
            rows={5}
          />
        </div>
        <div>
          <div className="flex items-center mb-3">
            <Microscope className="w-5 h-5 mr-2 text-primary" />
            <label htmlFor="tests" className="text-sm font-medium text-slate-800">
              Suggested Tests
            </label>
          </div>
          <Textarea
            id="tests"
            value={suggestedTests}
            onChange={(e) => setSuggestedTests(e.target.value)}
            placeholder="Enter recommended laboratory tests or examinations..."
            className="w-full resize-none border-slate-200 focus:border-primary focus:ring-primary/20"
            rows={5}
          />
        </div>
        <div className="pt-2">
          <Button
            onClick={onSave}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Medical Record
              </>
            )}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Main Details Page Component
export default function DetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [diagnosis, setDiagnosis] = useState("")
  const [suggestedTests, setSuggestedTests] = useState("")

  // Safely parse the ID
  const appointmentId = params?.id ? Number.parseInt(params.id as string) : Number.NaN

  // Fetch appointment data
  const {
    data: appointment,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointmentInformation", appointmentId],
    queryFn: () => getAppointmentInformationById(appointmentId),
    enabled: !isNaN(appointmentId),
  })

  // Set form values when data is loaded
  useEffect(() => {
    if (appointment) {
      setDiagnosis(appointment.prescription || "")
      setSuggestedTests(appointment.testSuggestion || "")
    }
  }, [appointment])

  // Handle form submission
  const mutation = useMutation({
    mutationFn: updateAppointmentDetails,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Medical record has been updated successfully",
        variant: "default",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save medical record. Please try again.",
        variant: "destructive",
      })
      console.error("Update error:", error)
    },
  })

  // Handle loading and error states
  if (isNaN(appointmentId)) return null

  return (
    <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 sm:p-8 rounded-xl shadow-sm"
      >
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Medical Record</h1>
          <p className="text-slate-500">Review and update patient's medical information</p>
          <div className="h-1 w-20 bg-primary/80 rounded-full mt-4"></div>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <AppointmentInfoSkeleton />
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                  <Skeleton className="h-10 w-40" />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : isError ? (
          <ErrorMessage
            message={`Error loading medical record: ${error instanceof Error ? error.message : "Unknown error"}`}
          />
        ) : !appointment ? (
          <ErrorMessage message="Medical record not found." />
        ) : (
          <div className="space-y-8">
            <AppointmentInfo patientName={appointment.patientName} date={appointment.date} time={appointment.time} />
            <FormSection
              diagnosis={diagnosis}
              suggestedTests={suggestedTests}
              setDiagnosis={setDiagnosis}
              setSuggestedTests={setSuggestedTests}
              onSave={() =>
                mutation.mutate({
                  id: appointmentId,
                  diagnosis,
                  suggestedTests,
                })
              }
              isSubmitting={mutation.isPending}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}
