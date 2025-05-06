"use client";

import {
  Calendar,
  Clock,
  User,
  FileText,
  BarChart,
  Pill
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  getAppointmentById,
  AppointmentDetailsDTO,
  AppointmentStatus
} from "@/APIServices/Appointments/appointmentService";

interface AppointmentDetailsProps {
  appointmentId: number;
  open: boolean;
  onClose: () => void;
}

export default function AppointmentDetails({
  appointmentId,
  open,
  onClose
}: AppointmentDetailsProps) {
  const {
    data: appointment,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointmentById(appointmentId),
    enabled: open && !!appointmentId
  });

  if (!open) return null;

  const getBadgeVariant = (status: AppointmentStatus | undefined): string => {
    const variants: Record<AppointmentStatus, string> = {
      Completed: "success",
      Confirmed: "default",
      Pending: "outline",
      Cancelled: "destructive"
    };
    return status ? variants[status] || "outline" : "outline";
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
  };

  return (
    <Dialog isOpen={open} onClose={onClose}>
      <DialogContent className="sm:max-w-lg h-[90vh] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Appointment Details</span>
            
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Loading appointment details...
          </div>
        ) : isError ? (
          <div className="py-10 text-center text-sm text-red-500">
            Failed to load appointment details
          </div>
        ) : (
          <div className="space-y-6 py-4 flex-grow overflow-y-auto">
            {/* Patient & Doctor Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[["Patient", appointment?.patientName], ["Doctor", appointment?.doctorName]].map(
                ([label, value], idx) => (
                  <Card key={idx} className="rounded-2xl shadow-sm border border-gray-200">
                    <CardContent className="pt-6">
                      <h3 className="font-medium text-sm flex items-center mb-2 text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {label}
                      </h3>
                      <p className="text-sm text-gray-800">{value || "N/A"}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>

            {/* Date & Time */}
            <Card className="rounded-2xl shadow-sm border border-gray-200">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-medium text-sm text-gray-600 mb-1">Appointment Schedule</h3>
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  {formatDate(appointment?.date)}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  {appointment?.time || "N/A"}
                </div>
              </CardContent>
            </Card>

            {/* Medical Info */}
            <Card className="rounded-2xl shadow-sm border border-gray-200">
              <CardContent className="pt-6">
                <h3 className="font-medium text-sm text-gray-600 mb-3">Medical Information</h3>

                {appointment?.prescription && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium flex items-center mb-1 text-gray-700">
                      <Pill className="h-4 w-4 mr-1" /> Prescription
                    </h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-md border">{appointment.prescription}</p>
                  </div>
                )}

                {appointment?.testSuggestion && (
                  console.log("mb-4"),
                  <div className="mb-4">
                    <h4 className="text-sm font-medium flex items-center mb-1 text-gray-700">
                      <BarChart className="h-4 w-4 mr-1" /> Test Suggestion
                    </h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-md border">{appointment.testSuggestion}</p>
                  </div>
                )}

                {appointment?.notes && (
                  <div className="mb-2">
                    <h4 className="text-sm font-medium flex items-center mb-1 text-gray-700">
                      <FileText className="h-4 w-4 mr-1" /> Notes
                    </h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-md border">{appointment.notes}</p>
                  </div>
                )}

                {!appointment?.prescription &&
                  !appointment?.testSuggestion &&
                  !appointment?.notes && (
                    <p className="text-sm text-gray-500 italic">
                      No medical information available.
                    </p>
                  )}
              </CardContent>
            </Card>

            {/* Medical Reports */}
            {(appointment?.medicalReports?.length ?? 0) > 0 ? (
              <Card className="rounded-2xl shadow-sm border border-gray-200">
                <CardContent className="pt-6">
                  <h3 className="font-medium text-sm text-gray-600 mb-3">
                    Medical Reports
                  </h3>
                  {appointment?.medicalReports?.map((report, index) => (
                    <div
                      key={index}
                      className="mb-4 last:mb-0 border-b pb-4 last:border-b-0"
                    >
                      {report.ReportDescription && (
                        <div className="mb-2">
                          <h4 className="text-sm font-medium flex items-center mb-1 text-gray-700">
                            <FileText className="h-4 w-4 mr-1" /> Description
                          </h4>
                          <p className="text-sm bg-gray-50 p-3 rounded-md border">
                            {report.ReportDescription}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium flex items-center text-gray-700">
                          <FileText className="h-4 w-4 wyk-1" /> Report #{index + 1}
                        </h4>
                        <a
                          href={report.medicalReportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View Report
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-2xl shadow-sm border border-gray-200">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-medium text-sm text-gray-600 mb-3">
                    Medical Reports
                  </h3>
                  <p className="text-sm text-gray-500 italic">
                    No medical reports available.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <DialogFooter className="mt-auto pb-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}