"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, CheckCircle, AlertCircle, Clock3, ArrowRight, CalendarDays } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppointmentDetails from "./appointmentDetails";
import { Skeleton } from "@/components/ui/skeleton";

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
  const personId = "13"; 
  const parsedPersonId = Number(personId);

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
        status: activeTab,
      });
    },
    staleTime: 0,
  });

  const confirmMutation = useMutation({
    mutationFn: confirmAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const cancelMutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  // Count appointments by status for the summary
  const appointmentCounts = {
    all: appointments.length,
    confirmed: appointments.filter((a: AppointmentDTO) => a.status?.toLowerCase() === "confirmed").length,
    pending: appointments.filter((a: AppointmentDTO) => a.status?.toLowerCase() === "pending").length,
    completed: appointments.filter((a: AppointmentDTO) => a.status?.toLowerCase() === "completed").length,
  };

  return (
    <div className="container py-10 mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="mt-1 text-muted-foreground">Manage your scheduled appointments</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="All Appointments"
          count={appointmentCounts.all}
          icon={<CalendarDays className="h-5 w-5 text-blue-500" />}
          isActive={activeTab === "all"}
          onClick={() => setActiveTab("all")}
        />
        <SummaryCard
          title="Confirmed"
          count={appointmentCounts.confirmed}
          icon={<Clock3 className="h-5 w-5 text-green-500" />}
          isActive={activeTab === "confirmed"}
          onClick={() => setActiveTab("confirmed")}
        />
        <SummaryCard
          title="Pending"
          count={appointmentCounts.pending}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          isActive={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        />
        <SummaryCard
          title="Completed"
          count={appointmentCounts.completed}
          icon={<CheckCircle className="h-5 w-5 text-indigo-500" />}
          isActive={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {isLoading || isFetching ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {[1, 2, 3].map((i) => (
                <AppointmentCardSkeleton key={i} />
              ))}
            </div>
          ) : appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onConfirm={() => confirmMutation.mutate(appointment.id)}
                  onCancel={() => cancelMutation.mutate(appointment.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
              <div className="rounded-full bg-muted p-3">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">
                No {activeTab !== "all" ? activeTab : ""} appointments found
              </h3>
              <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
                {activeTab === "pending" || activeTab === "confirmed"
                  ? "You don't have any upcoming appointments."
                  : activeTab === "completed"
                    ? "You don't have any past appointments. Your completed appointments will appear here."
                    : "You don't have any appointments."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function SummaryCard({ title, count, icon, isActive, onClick }: SummaryCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
        isActive ? "border-primary bg-primary/5" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-background p-2 shadow-sm">{icon}</div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{count}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface AppointmentCardProps {
  appointment: AppointmentDTO;
  onConfirm: () => void;
  onCancel: () => void;
}

function AppointmentCard({ appointment, onConfirm, onCancel }: AppointmentCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  const getBadgeDetails = (status: string) => {
    const statusMappings: Record<
      string,
      { variant: NonNullable<BadgeProps["variant"]>; icon: React.ReactNode }
    > = {
      completed: { variant: "success", icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      confirmed: { variant: "default", icon: <Clock3 className="h-3 w-3 mr-1" /> },
      pending: { variant: "outline", icon: <Clock className="h-3 w-3 mr-1" /> },
      cancelled: { variant: "destructive", icon: <AlertCircle className="h-3 w-3 mr-1" /> },
    };
    const normalizedStatus = status?.toLowerCase() || "unknown";
    return statusMappings[normalizedStatus] || {
      variant: "outline",
      icon: <Clock className="h-3 w-3 mr-1" />,
    };
  };

  const badgeDetails = getBadgeDetails(appointment.status);
  const parsedDate = new Date(appointment.date);
  const formattedDate = !isNaN(parsedDate.getTime())
    ? parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Invalid Date";
  const formattedTime = appointment.time || "Unknown";

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-lg">{appointment.patientName || "Unknown"}</CardTitle>
            <Badge variant={badgeDetails.variant}>
              {badgeDetails.icon}
              {appointment.status
                ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1).toLowerCase()
                : "Unknown"}
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
            {appointment.notes && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Notes:</span> {appointment.notes}
              </p>
            )}
          </div>
          <div className="mt-4 border-t border-muted-200 bg-muted/30 pt-2"></div>
        </CardContent>

        {appointment.status && !["cancelled"].includes(appointment.status.toLowerCase()) && (
          <CardFooter className="border-t pt-4">
            {appointment.status.toLowerCase() === "pending" ? (
              <div className="flex gap-2 w-full">
                <Button variant="destructive" size="sm" onClick={onCancel} className="flex-1">
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={onConfirm} className="flex-1">
                  Confirm
                </Button>
              </div>
            ) : appointment.status.toLowerCase() === "confirmed" ? (
              <Button
                variant="default"
                size="sm"
                className="w-full justify-between"
                onClick={() => router.push(`/Doctor/details/${appointment.id}`)}
              >
                Enter Details <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : appointment.status.toLowerCase() === "completed" ? (
              <Button
                variant="default"
                size="sm"
                className="w-full justify-between"
                onClick={() => setShowDetails(true)}
              >
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : null}
          </CardFooter>
        )}
      </Card>

      {/* Details Dialog for completed appointments */}
      <AppointmentDetails
        appointmentId={appointment.id}
        open={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}

function AppointmentCardSkeleton() {
  return (
    <Card>
      <div className="h-2 w-full bg-muted" />
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="mt-2 rounded-lg bg-muted/50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="mt-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-3/4" />
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/30 pt-4">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  )
}
