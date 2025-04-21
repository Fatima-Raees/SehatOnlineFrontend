"use client"

import { JSX, useState } from "react"
import { Calendar, Clock, CheckCircle, AlertCircle, Clock3 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import type { BadgeProps } from "@/components/ui/badge"

import { Appointment, appointments } from "@/app/mockData"

type BadgeVariant = NonNullable<BadgeProps["variant"]>

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "all") return true
    return appointment.status === activeTab
  })

  return (
    <div className="container py-10 max-w-[1520px] mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage and track all patient appointments</p>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="confirmed">Today</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
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
  const getBadgeDetails = (status: string): { variant: BadgeVariant; icon: JSX.Element } => {
    switch (status) {
      case "completed":
        return { variant: "success", icon: <CheckCircle className="h-3.5 w-3.5 mr-1" /> }
      case "confirmed":
        return { variant: "default", icon: <Clock3 className="h-3.5 w-3.5 mr-1" /> }
      case "pending":
      default:
        return { variant: "outline", icon: <Clock className="h-3.5 w-3.5 mr-1" /> }
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
                {appointment.patientName.split(" ").map((n) => n[0]).join("")}
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
            <span className="text-sm">{appointment.date}</span>
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

      {appointment.status !== "completed" && (
        <CardFooter className="border-t pt-4 flex justify-between">
          {appointment.status === "pending" && (
            <>
              <Button variant="destructive" size="sm">Cancel</Button>
              <Button variant="default" size="sm">Confirm</Button>
            </>
          )}
          {appointment.status === "confirmed" && (
            <Link href={`/Doctor/appointments/${appointment.id}`}>
              <Button variant="default" size="sm">Detail</Button>
            </Link>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
