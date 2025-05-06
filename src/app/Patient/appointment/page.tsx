"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, CheckCircle, AlertCircle, Clock3, ArrowRight, CalendarDays } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import {
  getAppointmentsByPatient,
  getAppointmentsByStatusAndPatient,
} from "@/APIServices/Appointments/appointmentService"
import type { BadgeProps } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface AppointmentDTO {
  id: number
  doctorName?: string
  status?: string
  date: string
  time?: string
  notes?: string
  specialty?: string
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const personId = "14" // TODO: Replace with dynamic value (e.g., from auth context or user session)
  const parsedPersonId = Number(personId)

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointments", parsedPersonId, activeTab],
    queryFn: async () => {
      if (activeTab === "all") {
        return await getAppointmentsByPatient({ PersonId: parsedPersonId })
      }
      return await getAppointmentsByStatusAndPatient({
        PersonId: parsedPersonId,
        status: activeTab,
      })
    },
    staleTime: 0,
  })

  // Count appointments by status for the summary
  const appointmentCounts = {
    all: appointments.length,
    confirmed: appointments.filter((a: AppointmentDTO) => a.status?.toLowerCase() === "confirmed").length,
    pending: appointments.filter((a: AppointmentDTO) => a.status?.toLowerCase() === "pending").length,
    completed: appointments.filter((a: AppointmentDTO) => a.status?.toLowerCase() === "completed").length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
          <p className="mt-1 text-muted-foreground">View and manage your upcoming and past appointments</p>
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
        <div className="mb-6 border-b">
          <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="confirmed"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Confirmed
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <AppointmentCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState message={error?.message || "Unknown error"} />
          ) : appointments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {appointments.map((appointment: AppointmentDTO) => (
                <AppointmentCard key={String(appointment.id)} appointment={appointment} />
              ))}
            </div>
          ) : (
            <EmptyState status={activeTab} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface SummaryCardProps {
  title: string
  count: number
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
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
  )
}

interface AppointmentCardProps {
  appointment: AppointmentDTO
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const router = useRouter()

  const getBadgeDetails = (status?: string) => {
    const statusMappings: Record<
      string,
      { variant: NonNullable<BadgeProps["variant"]>; icon: React.ReactNode; color: string }
    > = {
      completed: {
        variant: "outline",
        icon: <CheckCircle className="mr-1 h-3 w-3" />,
        color: "text-green-600 bg-green-50 border-green-200",
      },
      confirmed: {
        variant: "outline",
        icon: <Clock3 className="mr-1 h-3 w-3" />,
        color: "text-blue-600 bg-blue-50 border-blue-200",
      },
      pending: {
        variant: "outline",
        icon: <Clock className="mr-1 h-3 w-3" />,
        color: "text-amber-600 bg-amber-50 border-amber-200",
      },
      cancelled: {
        variant: "outline",
        icon: <AlertCircle className="mr-1 h-3 w-3" />,
        color: "text-red-600 bg-red-50 border-red-200",
      },
    }
    const normalizedStatus = status?.toLowerCase() || "unknown"
    return (
      statusMappings[normalizedStatus] || {
        variant: "outline",
        icon: <Clock className="mr-1 h-3 w-3" />,
        color: "text-gray-600 bg-gray-50 border-gray-200",
      }
    )
  }

  const badgeDetails = getBadgeDetails(appointment.status)
  const parsedDate = new Date(appointment.date)
  const formattedDate = !isNaN(parsedDate.getTime())
    ? parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Invalid Date"
  const formattedTime = appointment.time || "Unknown"
  const dayOfWeek = !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString("en-US", { weekday: "long" }) : ""

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="h-2 w-full bg-primary/80" />
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg font-bold">{appointment.doctorName || "Unknown Doctor"}</CardTitle>
            <CardDescription>{appointment.specialty || "General Practitioner"}</CardDescription>
          </div>
          <Badge variant="outline" className={`${badgeDetails.color} flex items-center px-2 py-1`}>
            {badgeDetails.icon}
            {appointment.status
              ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1).toLowerCase()
              : "Unknown"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="mt-2 rounded-lg bg-muted/50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">{dayOfWeek}</span>
            <span className="text-sm text-muted-foreground">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">{formattedTime}</span>
          </div>
        </div>

        {appointment.notes && (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Notes:</span> {appointment.notes}
            </p>
          </div>
        )}
      </CardContent>

      {appointment.status && (
        <CardFooter className="border-t bg-muted/30 pt-4">
          <Link
            href={`/Patient/appointment/${appointment.id}`}
            passHref
            className="w-full"
            aria-label="View appointment details"
          >
            <Button
              variant={appointment.status.toLowerCase() === "completed" ? "default" : "secondary"}
              size="sm"
              className="w-full justify-between"
            >
              {appointment.status.toLowerCase() === "completed" ? "View Details" : "Manage Appointment"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
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

function EmptyState({ status }: { status: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
      <div className="rounded-full bg-muted p-3">
        <Calendar className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-medium">No {status !== "all" ? status : ""} appointments found</h3>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        {status === "pending" || status === "confirmed"
          ? "You don't have any upcoming appointments."
          : status === "completed"
            ? "You don't have any past appointments. Your completed appointments will appear here."
            : "You don't have any appointments."}
      </p>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 py-12">
      <div className="rounded-full bg-red-100 p-3">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-red-700">Error loading appointments</h3>
      <p className="mt-2 max-w-sm text-center text-sm text-red-600">{message}</p>
      <Button variant="outline" className="mt-4 border-red-200 text-red-700 hover:bg-red-100" size="sm">
        Try Again
      </Button>
    </div>
  )
}