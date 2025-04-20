
"use client"

import { JSX, useState } from "react"
import { Calendar, Clock, CheckCircle, AlertCircle, Clock3 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BadgeProps } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type AppointmentStatus = "completed" | "pending" | "confirmed" | "cancelled"
type BadgeVariant = NonNullable<BadgeProps["variant"]>
type Appointment = {
  id: number
  patientName: string
  patientImage: string
  date: string
  time: string
  doctor: string
  department: string
  status: AppointmentStatus
  notes: string
}

// Updated mock appointment data with confirmed status
const appointments: Appointment[] = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    patientImage: "/placeholder.svg?height=40&width=40",
    date: "2025-04-18",
    time: "09:30 AM",
    doctor: "Dr. Michael Chen",
    department: "Cardiology",
    status: "completed",
    notes: "Follow-up appointment after surgery",
  },
  {
    id: 2,
    patientName: "Robert Williams",
    patientImage: "/placeholder.svg?height=40&width=40",
    date: "2025-04-18",
    time: "11:00 AM",
    doctor: "Dr. Emily Rodriguez",
    department: "Neurology",
    status: "pending",
    notes: "Initial consultation for recurring headaches",
  },
  {
    id: 3,
    patientName: "James Thompson",
    patientImage: "/placeholder.svg?height=40&width=40",
    date: "2025-04-19",
    time: "02:15 PM",
    doctor: "Dr. Sarah Wilson",
    department: "Orthopedics",
    status: "confirmed",
    notes: "X-ray review for fractured wrist",
  },
  {
    id: 4,
    patientName: "Maria Garcia",
    patientImage: "/placeholder.svg?height=40&width=40",
    date: "2025-04-20",
    time: "10:45 AM",
    doctor: "Dr. David Kim",
    department: "Dermatology",
    status: "completed",
    notes: "Skin condition follow-up",
  },
  {
    id: 5,
    patientName: "Thomas Brown",
    patientImage: "/placeholder.svg?height=40&width=40",
    date: "2025-04-20",
    time: "03:30 PM",
    doctor: "Dr. Lisa Johnson",
    department: "Pediatrics",
    status: "pending",
    notes: "Annual checkup",
  },
  {
    id: 6,
    patientName: "Jennifer Lee",
    patientImage: "/placeholder.svg?height=40&width=40",
    date: "2025-04-21",
    time: "01:00 PM",
    doctor: "Dr. Robert Smith",
    department: "Ophthalmology",
    status: "confirmed",
    notes: "Vision test and prescription update",
  },
  {
    id: 7,
    patientName: "Daniel Martinez",
    patientImage: "/placeholder.svg?height=40&width=40",
    date: "2025-04-22",
    time: "11:30 AM",
    doctor: "Dr. Jessica Taylor",
    department: "Dentistry",
    status: "confirmed",
    notes: "Routine dental checkup",
  },
]

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "all") return true
    return appointment.status === activeTab
  })

  return (
    <div className="container py-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage and track all patient appointments</p>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}

              {filteredAppointments.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No appointments found</h3>
                  <p className="text-muted-foreground mt-1">
                    There are no {activeTab !== "all" ? activeTab : ""} appointments to display.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {

  const getBadgeDetails = (
    status: string
  ): { variant: BadgeVariant; icon: JSX.Element } => {
    switch (status) {
      case "completed":
        return {
          variant: "success",
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
        }
      case "confirmed":
        return {
          variant: "default",
          icon: <Clock3 className="h-3.5 w-3.5 mr-1" />,
        }
      case "pending":
      default:
        return {
          variant: "outline",
          icon: <Clock className="h-3.5 w-3.5 mr-1" />,
        }
    }
  }
  

  const badgeDetails = getBadgeDetails(appointment.status)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={appointment.patientImage || "/placeholder.svg"} alt={appointment.patientName} />
              <AvatarFallback>
                {appointment.patientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
              <CardDescription>{appointment.department}</CardDescription>
            </div>
          </div>
          <Badge variant={badgeDetails.variant}>
            {badgeDetails.icon}
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {new Date(appointment.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{appointment.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Doctor:</span>
            <span className="text-sm">{appointment.doctor}</span>
          </div>
          {appointment.notes && (
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium">Notes:</span> {appointment.notes}
            </div>
          )}
        </div>
      </CardContent>

      {/* Conditionally render buttons based on appointment status */}
      {appointment.status !== "completed" && (
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="destructive" size="sm">
            Cancel
          </Button>
          {appointment.status === "pending" && (
            <Button variant="default" size="sm">
              Confirm
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
