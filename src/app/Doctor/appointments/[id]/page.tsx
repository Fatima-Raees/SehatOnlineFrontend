// "use client"

// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Appointment, appointments } from "@/app/mockData"

// export default function AppointmentDetailPage() {
//   const { id } = useParams()
//   const [appointment, setAppointment] = useState<Appointment | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (id) {
//       const selected = appointments.find((a) => a.id === Number(id))
//       setAppointment(selected || null)
//       setLoading(false)
//     }
//   }, [id])

//   if (loading) return <p className="p-6">Loading appointment...</p>
//   if (!appointment) return <p className="p-6">Appointment not found.</p>

//   return (
//     <div className="container max-w-xl py-10">
//       <Card>
//         <CardHeader className="items-center text-center">
//           <Avatar className="w-20 h-20 mx-auto mb-4">
//             <AvatarImage src={appointment.patientImage} alt={appointment.patientName} />
//             <AvatarFallback>
//               {appointment.patientName.split(" ").map((n) => n[0]).join("")}
//             </AvatarFallback>
//           </Avatar>
//           <CardTitle>{appointment.patientName}</CardTitle>
//           <CardDescription>{appointment.department}</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <p><strong>Date:</strong> {appointment.date}</p>
//           <p><strong>Time:</strong> {appointment.time}</p>
//           <p><strong>Doctor:</strong> {appointment.doctor}</p>
//           <p><strong>Status:</strong> {appointment.status}</p>
//           <p><strong>Notes:</strong> {appointment.notes}</p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Appointment, appointments } from "@/app/mockData"

export default function AppointmentDetailPage() {
  console.log("✅ Loaded AppointmentDetailPage component")

  const { id } = useParams()
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("📦 Route param id:", id)
    if (id) {
      const selected = appointments.find((a) => a.id === Number(id))
      console.log("📋 Found appointment:", selected)
      setAppointment(selected || null)
      setLoading(false)
    }
  }, [id])

  if (loading) return <p className="p-6">Loading appointment...</p>
  if (!appointment) return <p className="p-6">Appointment not found.</p>

  return (
    <div className="container max-w-xl py-10">
      <Card>
        <CardHeader className="items-center text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={appointment.patientImage} alt={appointment.patientName} />
            <AvatarFallback>
              {appointment.patientName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{appointment.patientName}</CardTitle>
          <CardDescription>{appointment.department}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Doctor:</strong> {appointment.doctor}</p>
          <p><strong>Status:</strong> {appointment.status}</p>
          <p><strong>Notes:</strong> {appointment.notes}</p>
        </CardContent>
      </Card>
    </div>
  )
}
