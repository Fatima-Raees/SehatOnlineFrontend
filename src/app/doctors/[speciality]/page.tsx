"use client"

import { useState } from "react"
import { DoctorCard, type DoctorProps } from "@/components/doctors/doctor-card"
import { DoctorFilter } from "@/components/doctors/doctor-filter"
import { getDoctorsBySpecialty } from "@/lib/data/doctors"

export default function SpecialtyDoctorsPage({ params }: { params: { specialty: string } }) {
  const specialty = params.specialty
  const specialtyDoctors = getDoctorsBySpecialty(specialty)
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorProps[]>(specialtyDoctors)

  // Format specialty name for display
  const formatSpecialtyName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <>
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-deep-blue mb-2">{formatSpecialtyName(specialty)} Specialists</h1>
          <p className="text-muted-foreground font-body max-w-3xl">
            Find and book appointments with the best {specialty} specialists in Pakistan. Our doctors are experienced
            professionals who provide high-quality healthcare services.
          </p>
        </div>

        <DoctorFilter doctors={specialtyDoctors} onFilterChange={setFilteredDoctors} />

        <div className="space-y-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-subheading text-deep-blue mb-2">No doctors found</h3>
              <p className="text-muted-foreground font-body">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
