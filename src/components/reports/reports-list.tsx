"use client"

import { useState } from "react"
import { FileText, Download, Trash2, Search, Calendar, FileType2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Report } from "../../lib/types";
import { useToast } from "@/hooks/use-toast"

interface ReportsListProps {
  reports: Report[]
  isLoading?: boolean
  onDelete: (reportId: string) => Promise<void>
}

export function ReportsList({ reports, isLoading = false, onDelete }: ReportsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (reportId: string) => {
    try {
      setIsDeleting(reportId)
      await onDelete(reportId)
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.reportName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType && filterType !== "all" ? report.reportType === filterType : true
    return matchesSearch && matchesType
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="h-8 w-8 mx-auto mb-4 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <p className="text-gray-500">Loading your reports...</p>
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">No reports yet</h3>
        <p className="text-gray-500">Upload your first medical report to keep track of your health records.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="lab">Laboratory Test</SelectItem>
            <SelectItem value="imaging">Imaging</SelectItem>
            <SelectItem value="prescription">Prescription</SelectItem>
            <SelectItem value="discharge">Discharge Summary</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="divide-y border rounded-lg overflow-hidden">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div key={report.id} className="p-4 bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.reportName}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(report.reportDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileType2 className="h-3.5 w-3.5" />
                        <span>
                          {report.reportType === "lab"
                            ? "Laboratory Test"
                            : report.reportType === "imaging"
                              ? "Imaging"
                              : report.reportType === "prescription"
                                ? "Prescription"
                                : report.reportType === "discharge"
                                  ? "Discharge Summary"
                                  : "Other"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-blue-600"
                    onClick={() => window.open(report.fileUrl, "_blank")}
                    title="View or download this report"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">View</span>
                  </Button>

                  {/* Add a sharing indicator */}
                  {report.isPublic && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                      Shared with doctors
                    </span>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-600"
                    onClick={() => handleDelete(report.id)}
                    disabled={isDeleting === report.id}
                  >
                    {isDeleting === report.id ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No reports match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
