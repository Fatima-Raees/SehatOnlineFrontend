"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Clock,
  User,
  FileText,
  BarChart,
  Pill,
  ArrowLeft,
  Upload,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  CalendarClock,
  FileUp,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import {
  getAppointmentById,
  type AppointmentStatus,
  uploadMedicalReport,
} from "@/APIServices/Appointments/appointmentService"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const appointmentId = Number.parseInt(params.id)
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showDescriptionError, setShowDescriptionError] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const { toast } = useToast()

  const {
    data: appointment,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointmentById(appointmentId),
    enabled: !!appointmentId,
  })

  const getStatusDetails = (
    status: AppointmentStatus | undefined,
  ): { color: string; icon: React.ReactNode; label: string } => {
    if (!status) return { color: "bg-gray-100 text-gray-700", icon: <Clock className="h-4 w-4" />, label: "Unknown" }

    const statusMap: Record<AppointmentStatus, { color: string; icon: React.ReactNode; label: string }> = {
      Completed: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: <CheckCircle className="h-4 w-4" />,
        label: "Completed",
      },
      Confirmed: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: <CalendarClock className="h-4 w-4" />,
        label: "Confirmed",
      },
      Pending: {
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: <Clock className="h-4 w-4" />,
        label: "Pending",
      },
      Cancelled: {
        color: "bg-red-100 text-red-700 border-red-200",
        icon: <X className="h-4 w-4" />,
        label: "Cancelled",
      },
    }

    return statusMap[status]
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    if (!description.trim()) {
      setShowDescriptionError(true)
      toast({
        title: "Description required",
        description: "Please provide a description for the report.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)
      setShowDescriptionError(false)
      setUploadProgress(0)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 20
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 500)

      // Prepare the report data
      const reportData = {
        reportDescription: description,
        doctorId: appointment?.doctorName ? 1 : 0, // Replace with actual doctor ID logic
        file: file,
      }

      // Call the uploadMedicalReport function
      await uploadMedicalReport(appointmentId, reportData)

      // Clear the interval
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Refetch appointment data to update the medical reports
      await refetch()

      toast({
        title: "Report uploaded",
        description: "Medical report uploaded successfully.",
      })

      // Clear form
      setTimeout(() => {
        setFile(null)
        setDescription("")
        setUploadProgress(0)
        setActiveTab("details")
      }, 1000)
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleViewReport = async (url: string) => {
    try {
      // Test if the URL is still valid
      await fetch(url, { method: "HEAD" });
      window.open(url, "_blank");
    } catch (err) {
      toast({
        title: "Link expired",
        description: "Fetching a new link...",
      });
      await refetch(); // Refetch to get new SAS URLs
      const newUrl = appointment?.medicalReports?.find((report) => report.medicalReportUrl === url)?.medicalReportUrl;
      if (newUrl) {
        window.open(newUrl, "_blank");
      } else {
        toast({
          title: "Error",
          description: "Could not retrieve the report. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const statusDetails = getStatusDetails(appointment?.status as AppointmentStatus | undefined)

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="h-9 w-9 rounded-full">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to appointments</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointment Details</h1>
            <p className="text-muted-foreground">View and manage your appointment information</p>
          </div>
        </div>
        {appointment?.status && (
          <Badge variant="outline" className={`px-3 py-1.5 ${statusDetails.color}`}>
            <span className="flex items-center gap-1.5">
              {statusDetails.icon}
              {statusDetails.label}
            </span>
          </Badge>
        )}
      </div>

      {isLoading ? (
        <AppointmentDetailsSkeleton />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md grid grid-cols-2">
              <TabsTrigger value="details">
                <FileText className="mr-2 h-4 w-4" />
                Appointment Details
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Report
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6 space-y-6">
              {/* Summary Card */}
              <Card className="overflow-hidden">
                <div className="h-2 bg-primary" />
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{formatDate(appointment?.date)}</p>
                        <p className="text-sm text-muted-foreground">{appointment?.time || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Doctor</h3>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Stethoscope className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment?.doctorName || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Patient</h3>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment?.patientName || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Medical Information</CardTitle>
                  <CardDescription>Prescription, test suggestions, and notes from your doctor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {appointment?.prescription && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Prescription</h3>
                      </div>
                      <div className="rounded-lg border bg-muted/40 p-4">
                        <p className="text-sm whitespace-pre-line">{appointment.prescription}</p>
                      </div>
                    </div>
                  )}

                  {appointment?.testSuggestion && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Test Suggestions</h3>
                      </div>
                      <div className="rounded-lg border bg-muted/40 p-4">
                        <p className="text-sm whitespace-pre-line">{appointment.testSuggestion}</p>
                      </div>
                    </div>
                  )}

                  {appointment?.notes && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Notes</h3>
                      </div>
                      <div className="rounded-lg border bg-muted/40 p-4">
                        <p className="text-sm whitespace-pre-line">{appointment.notes}</p>
                      </div>
                    </div>
                  )}

                  {!appointment?.prescription && !appointment?.testSuggestion && !appointment?.notes && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No medical information available</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-md">
                        Your doctor hasn't added any prescriptions, test suggestions, or notes for this appointment yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Medical Reports */}
              {(appointment?.medicalReports?.length ?? 0) > 0 ? (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Medical Reports</CardTitle>
                    <CardDescription>View your uploaded medical reports</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {appointment?.medicalReports?.map((report, index) => (
                      <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                        {report.ReportDescription && (
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Description</h3>
                            <div className="rounded-lg border bg-muted/40 p-4">
                              <p className="text-sm">{report.ReportDescription}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <FileUp className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Medical Report #{index + 1}</p>
                              <p className="text-xs text-muted-foreground">
                                Uploaded on{" "}
                                {new Date().toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleViewReport(report.medicalReportUrl)}
                            className="inline-flex items-center"
                          >
                            <Button size="sm">View Report</Button>
                          </button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Medical Reports</CardTitle>
                    <CardDescription>View your uploaded medical reports</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="rounded-full bg-muted p-3 mb-3">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No medical reports available</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      No medical reports have been uploaded for this appointment yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Medical Report
                  </CardTitle>
                  <CardDescription>
                    Upload your medical reports, test results, or any other relevant documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-6">
                    {/* Fix for the file upload section */}
                    <div className="space-y-2">
                      <Label htmlFor="report-file" className="text-sm font-medium">
                        Report File
                      </Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center ${file ? "border-primary/50 bg-primary/5" : "border-muted"
                          }`}
                      >
                        {file ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center">
                              <div className="rounded-full bg-primary/10 p-2">
                                <FileText className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFile(null)}
                              className="mt-2"
                            >
                              Remove File
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center">
                              <div className="rounded-full bg-muted p-3">
                                <Upload className="h-6 w-6 text-muted-foreground" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                              <p className="text-xs text-muted-foreground">
                                Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                              </p>
                            </div>
                            <Input
                              id="report-file"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => document.getElementById('report-file')?.click()}
                            >
                              Browse Files
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-description" className="text-sm font-medium">
                        Report Description
                      </Label>
                      <Textarea
                        id="report-description"
                        placeholder="Enter a description for this report..."
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value)
                          if (e.target.value.trim()) setShowDescriptionError(false)
                        }}
                        rows={4}
                        className={showDescriptionError ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {showDescriptionError && (
                        <p className="text-xs text-red-500">Please provide a description for the report</p>
                      )}
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/30 px-6 py-4">
                  <Button variant="outline" onClick={() => setActiveTab("details")} disabled={isUploading}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading || !description.trim()}
                    className="min-w-[120px]"
                  >
                    {isUploading ? "Uploading..." : "Upload Report"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

function AppointmentDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-2 bg-muted" />
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex items-start gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-full max-w-[180px]" />
                  <Skeleton className="h-4 w-full max-w-[120px]" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-red-100 p-3 mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-red-700">Failed to load appointment details</h3>
        <p className="text-sm text-red-600 mt-1 max-w-md mb-4">
          There was an error loading the appointment details. Please try again.
        </p>
        <Button variant="outline" onClick={onRetry} className="border-red-200 text-red-700 hover:bg-red-100">
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}