"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle, AlertCircle, Clock3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAppointmentsByDoctor,
  getAppointmentsByStatusAndDoctor,
  confirmAppointment,
  cancelAppointment,
  AppointmentDTO,
} from "@/APIServices/Appointments/appointmentService";
import type { BadgeProps } from "@/components/ui/badge";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const queryClient = useQueryClient();
  const personId = "5"; // Replace with auth context in production
  const parsedPersonId = parseInt(personId, 10);

  // Basic validation for personId
  if (isNaN(parsedPersonId)) {
    return (
      <div className="container py-10 mx-auto">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <p className="text-red-500 mt-4">Please log in to view appointments.</p>
      </div>
    );
  }

  const {
    data: appointments = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["appointments", parsedPersonId, activeTab],
    queryFn: async () => {
      if (activeTab === "all") {
       
        return await getAppointmentsByDoctor({ PersonId: parsedPersonId });
      }
      
      return await getAppointmentsByStatusAndDoctor({
        PersonId: parsedPersonId,
        Status: activeTab,
      });
    },
    staleTime: 0, // 💡 this ensures the data is cleared on tab switch
  });
  
  // Mutations for confirm/cancel
  const confirmMutation = useMutation({
    mutationFn: confirmAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const cancelMutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  return (
    <div className="container py-10 mx-auto">
      <h1 className="text-3xl font-bold">Appointments</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {isLoading ? (
            <p className="text-center py-4">Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              
              {appointments.map((appointment) => {
  console.log("Appointment:", appointment.id); // Logs each ID
  return (
    <AppointmentCard
      key={appointment.id}
      appointment={appointment}
      onConfirm={() => confirmMutation.mutate(appointment.id)}
      onCancel={() => cancelMutation.mutate(appointment.id)}
    />
  );
})}

            </div>
          ) : (
            <p className="text-center py-4">
              No {activeTab !== "all" ? activeTab : ""} appointments found.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AppointmentCardProps {
  appointment: AppointmentDTO;
  onConfirm: () => void;
  onCancel: () => void;
}

function AppointmentCard({ appointment, onConfirm, onCancel }: AppointmentCardProps) {
  const getBadgeDetails = (status: string) => {
    const statusMappings: Record<string, { variant: NonNullable<BadgeProps["variant"]>; icon: React.ReactNode }> = {
      completed: { variant: "success", icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      confirmed: { variant: "default", icon: <Clock3 className="h-3 w-3 mr-1" /> },
      pending: { variant: "outline", icon: <Clock className="h-3 w-3 mr-1" /> },
      cancelled: { variant: "destructive", icon: <AlertCircle className="h-3 w-3 mr-1" /> },
    };
    const normalizedStatus = status?.toLowerCase() || "unknown";
    return statusMappings[normalizedStatus] || { variant: "outline", icon: <Clock className="h-3 w-3 mr-1" /> };
  };

  const badgeDetails = getBadgeDetails(appointment.Status);
  const parsedDate = new Date(appointment.Date);
  const formattedDate = !isNaN(parsedDate.getTime())
    ? parsedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Invalid Date";
  const formattedTime = appointment.Time || "Unknown";

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-lg">{appointment.PatientName || "Unknown"}</CardTitle>
          <Badge variant={badgeDetails.variant}>
            {badgeDetails.icon}
            {appointment.Status ? appointment.Status.charAt(0).toUpperCase() + appointment.Status.slice(1).toLowerCase() : "Unknown"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{formattedTime}</span>
          </div>
          {appointment.Notes && (
            <p className="text-sm text-gray-500">
              <span className="font-medium">Notes:</span> {appointment.Notes}
            </p>
          )}
        </div>
      </CardContent>
      {appointment.Status && !["completed", "cancelled"].includes(appointment.Status.toLowerCase()) && (
        <CardFooter className="border-t pt-4">
          {appointment.Status.toLowerCase() === "pending" ? (
            <div className="flex gap-2 w-full">
              <Button variant="destructive" size="sm" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={onConfirm} className="flex-1">
                Confirm
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" className="w-full">
              View Details
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}