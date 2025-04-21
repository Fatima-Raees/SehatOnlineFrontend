"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Award, BookOpen, Stethoscope } from "lucide-react"
import { getDoctorById } from "@/APIServices/Doctors/doctorAPI"
import { bookAppointment } from "@/APIServices/AppointmentsAPI/appointmentAPI"
import { use } from "react"  // Import `use` for unwrapping params
import Cookies from "js-cookie"

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [doctor, setDoctor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [error, setError] = useState<string>("")

  // Use `React.use()` to unwrap the params
  const { id } = use(params)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await getDoctorById(id)  // Use `id` directly here
        if (response) setDoctor(response)
        else router.push("/doctors")
      } catch (err) {
        console.error("Error fetching doctor:", err)
        router.push("/doctors")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchDoctor()  // Only fetch if id is available
  }, [id, router])

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form fields
    if (!selectedHospital || !selectedDate || !selectedTime) {
      setError("Please fill in all fields.")
      return
    }

    try {
      const personID = Cookies.get("PersonID")  // Get personID from cookies
      if (!personID) {
        setError("You must be logged in to book an appointment.")
        return
      }

      // Create appointment object
      const appointmentData = {
        PatientId: personID,
        HospitalId: selectedHospital,
        DoctorId: id,
        SelectedTimeSlot: `${selectedDate}T${selectedTime}`, // Ensure proper ISO 8601 format
      }

      // Call API to book appointment
      const response = await bookAppointment(appointmentData)
      if (response.success) {
        router.push("/appointments")  // Redirect to appointments page on success
      } else {
        setError("Failed to book the appointment. Please try again.")
      }
    } catch (err) {
      console.error("Error booking appointment:", err)
      setError("Error occurred while booking the appointment.")
    }
  }

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Loading doctor profile...</p>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-heading text-deep-blue mb-4">Doctor Not Found</h1>
        <p className="text-muted-foreground mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/doctors")}>View All Doctors</Button>
      </div>
    )
  }

  return (
    <main className="container py-8">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-deep-blue text-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-white">
              <Image src={doctor.person.profileImage} alt={doctor.person.name} fill className="object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-heading mb-2">{doctor.person.name}</h1>
              <p className="text-white/80 font-subheading text-lg">{doctor.specialization.value}</p>
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  <Award className="h-5 w-5" />
                  <span>Specialty: {doctor.specialization.value}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-5 w-5" />
                  <span>Email: {doctor.person.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Info */}
        <section className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Hospital Schedule</h2>
            {doctor.doctorHospitals?.map((dh: any) => (
              <div key={dh.doctorHospitalID} className="border p-4 rounded-lg mb-4 shadow-sm">
                <h3 className="text-lg font-bold">{dh.hospital.name}</h3>
                <p className="text-muted-foreground">{dh.hospital.address}, {dh.hospital.city}</p>
                <div className="mt-2">
                  <p><Clock className="inline h-4 w-4 mr-1" /> {dh.timeStart} - {dh.timeEnd}</p>
                  <p><Calendar className="inline h-4 w-4 mr-1" /> Days: {dh.weekDays}</p>
                  <p><Stethoscope className="inline h-4 w-4 mr-1" /> Fee: Rs. {dh.fee}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Book Appointment */}
        <section className="p-6 mt-10 border-t">
          <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleAppointmentSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Select Hospital</label>
              <select 
                className="w-full border rounded px-3 py-2" 
                value={selectedHospital || ""}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                <option value="">Select Hospital</option>
                {doctor.doctorHospitals.map((dh: any) => (
                  <option key={dh.doctorHospitalID} value={dh.doctorHospitalID}>
                    {dh.hospital.name} - {dh.hospital.city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Date</label>
              <input 
                type="date" 
                className="w-full border rounded px-3 py-2" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Time</label>
              <input 
                type="time" 
                className="w-full border rounded px-3 py-2" 
                value={selectedTime} 
                onChange={(e) => setSelectedTime(e.target.value)} 
              />
            </div>
            <Button type="submit" className="mt-2">Book Now</Button>
          </form>
        </section>
      </div>
    </main>
  )
}
