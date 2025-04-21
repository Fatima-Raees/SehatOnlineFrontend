"use client"

import { useEffect, useState } from "react"
import { DoctorProps } from "@/components/doctors/doctor-card"
import { getAllDoctors, getFilteredDoctors } from "@/APIServices/Doctors/doctorAPI"
import { DoctorFilter } from "@/components/doctors/doctor-filter"
import { DoctorCard } from "@/components/doctors/doctor-card"

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<DoctorProps[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all doctors when the component is mounted
    getAllDoctors()
      .then((data) => {
        setDoctors(data)
        setFilteredDoctors(data) // Initially, show all doctors
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err)
        setLoading(false)
      })
  }, [])

  const handleFilterChange = (filtered: DoctorProps[]) => {
    setFilteredDoctors(filtered)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Doctors</h1>
      <DoctorFilter doctors={doctors} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          filteredDoctors.map((doctor) => <DoctorCard key={doctor.person.personId} doctor={doctor} />)
        )}
      </div>
    </div>
  )
}
