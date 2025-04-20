"use client"

import type React from "react"

// Extend the Window interface to include the cloudinary property
declare global {
  interface Window {
    cloudinary?: any;
  }
}

import { useState, useEffect, useRef } from "react"
import { FileUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Script from "next/script"

interface ReportUploaderProps {
  onUploadSuccess: (result: any, reportName: string, reportType: string) => Promise<void>
  isUploading: boolean
  cloudName: string
  uploadPreset: string
}

export function ReportUploader({ onUploadSuccess, isUploading, cloudName, uploadPreset }: ReportUploaderProps) {
  const [reportName, setReportName] = useState("")
  const [reportType, setReportType] = useState("")
  const [isCloudinaryReady, setIsCloudinaryReady] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const cloudinaryWidgetRef = useRef<any>(null)

  // Initialize Cloudinary widget when the script is loaded
  useEffect(() => {
    if (isScriptLoaded && window.cloudinary) {
      // Set isCloudinaryReady to true as soon as window.cloudinary is available
      setIsCloudinaryReady(true)

      if (!cloudinaryWidgetRef.current) {
        cloudinaryWidgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            sources: ["local"],
            multiple: false,
            maxFiles: 1,
            resourceType: "auto",
            clientAllowedFormats: ["pdf"],
            maxFileSize: 10000000, // 10MB
            folder: "medical_reports",
            // Add these options:
            publicId: `${Date.now()}`, // Ensure unique IDs
            tags: ["medical", "report"], // Add tags for organization
            context: { alt: "Medical Report" }, // Add context metadata
            transformation: { flags: "attachment" }, // Ensures proper PDF handling
          },
          (error: any, result: any) => {
            if (!error && result && result.event === "success") {
              // Handle successful upload
              onUploadSuccess(result, reportName, reportType)
            }
            if (error) {
              console.error("Cloudinary upload error:", error)
            }
          },
        )
      }
    }
  }, [isScriptLoaded, cloudName, uploadPreset, reportName, reportType, onUploadSuccess])

  const openWidget = () => {
    if (cloudinaryWidgetRef.current) {
      cloudinaryWidgetRef.current.open()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (reportName && reportType) {
      openWidget()
    }
  }

  return (
    <>
      {/* Load Cloudinary Upload Widget Script */}
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        onLoad={() => setIsScriptLoaded(true)}
        strategy="lazyOnload"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="reportName">Report Name</Label>
          <Input
            id="reportName"
            placeholder="e.g., Blood Test Results"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reportType">Report Type</Label>
          <Select value={reportType} onValueChange={setReportType} required>
            <SelectTrigger id="reportType">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lab">Laboratory Test</SelectItem>
              <SelectItem value="imaging">Imaging (X-ray, MRI, CT Scan)</SelectItem>
              <SelectItem value="prescription">Prescription</SelectItem>
              <SelectItem value="discharge">Discharge Summary</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Upload PDF File</Label>
          <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-gray-300 hover:border-gray-400">
            <div className="flex flex-col items-center justify-center gap-2">
              <FileUp className="h-10 w-10 text-gray-400" />
              <p className="text-gray-600">First fill in the details above, then click the upload button below</p>
              <p className="text-xs text-gray-500">PDF files only (max 10MB)</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!reportName || !reportType || isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? (
              <>
                <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Uploading...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Upload Report
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
