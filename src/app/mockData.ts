// app/mockData.ts

export type AppointmentStatus = "completed" | "pending" | "confirmed" | "cancelled"

export type Appointment = {
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

export const appointments: Appointment[] = [
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
