"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ReportUploader } from "@/components/reports/report-uploader"
import { ReportsList } from "@/components/reports/reports-list"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { saveReportMetadata, getUserReports, deleteReport } from "@/lib/actions/report-actions"
import type { Report } from "../../lib/types";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const { toast } = useToast()
  const router = useRouter()

  // This would typically come from your auth system
  const userId = "user123" // Replace with actual user ID from your auth system

  // Fetch user reports
  const fetchReports = async () => {
    try {
      setIsLoading(true)
      
      const response = await getUserReports(userId)

      if (response.success && response.reports) {
        setReports(response.reports)
      } else {
        toast({
          title: "Failed to load reports",
          description: response.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching reports:", error)
      toast({
        title: "Error",
        description: "Failed to load your reports. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load reports when the component mounts or when switching to the view tab
  useEffect(() => {
    if (activeTab === "view") {
      fetchReports()
    }
  }, [activeTab])

  // Handle successful upload from the Cloudinary widget
  const handleUploadSuccess = async (result: any, reportName: string, reportType: string) => {
    
    try {
      setIsUploading(true)
      const url_print = result.info.secure_url
      console.log("Uploaded file URL:", url_print)
      // Save metadata to your backend
      const response = await saveReportMetadata({
        userId,
        reportName,
        reportType,
        reportDate: new Date().toISOString(),
        fileUrl: result.info.secure_url,
        publicId: result.info.public_id,
      })

      if (response.success) {
        // Add the new report to the state
        
        if (response.report) {
          setReports((prev) => [response.report!, ...prev])
        }

        toast({
            
          title: "Report uploaded successfully",
          description: "Your medical report has been saved to your profile.",
        })

        // Switch to the view tab to show the newly uploaded report
        setActiveTab("view")
      } else {
        throw new Error(response.error || "Failed to save report metadata")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Handle report deletion
  const handleDeleteReport = async (reportId: string) => {
    try {
      const response = await deleteReport(reportId, userId)

      if (response.success) {
        // Remove the deleted report from the state
        setReports((prev) => prev.filter((report) => report.id !== reportId))

        toast({
          title: "Report deleted",
          description: "The report has been successfully deleted.",
        })
      } else {
        throw new Error(response.error || "Failed to delete report")
      }
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Medical Reports</h1>
          <p className="text-gray-600 max-w-3xl">
            Upload and manage your medical reports securely. You can access these reports during consultations with
            doctors or for your personal health records.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Upload New Report</TabsTrigger>
            <TabsTrigger value="view">View Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Medical Report</h2>
              <ReportUploader
                onUploadSuccess={handleUploadSuccess}
                isUploading={isUploading}
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dt5bzzsiy"}
                uploadPreset="medical_reports"
              />
            </div>
          </TabsContent>

          <TabsContent value="view">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Your Medical Reports</h2>
                <Button
                  variant="outline"
                  onClick={fetchReports}
                  disabled={isLoading}
                  className="text-blue-600 border-blue-600"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Loading...
                    </>
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>
              <ReportsList reports={reports} isLoading={isLoading} onDelete={handleDeleteReport} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
