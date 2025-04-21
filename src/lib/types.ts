export interface Report {
    id: string
    userId: string
    reportName: string
    reportType: string
    reportDate: string
    fileUrl: string
    publicId: string
    createdAt: string
    isPublic?: boolean
    fileType?: string
    thumbnailUrl?: string
    sharedWithDoctors?: string[] // Optional: Array of doctor IDs who can access this report
  }
  
  export interface ReportMetadata {
    userId: string
    reportName: string
    reportType: string
    reportDate: string
  }
  