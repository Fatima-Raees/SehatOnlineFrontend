"use client"

import { useState } from "react"
import { DoctorCard, type DoctorProps } from "@/components/doctors/doctor-card"
import { DoctorFilter } from "@/components/doctors/doctor-filter"
import { doctors } from "@/lib/data/doctors"

export default function DoctorsPage() {
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorProps[]>(doctors)

  return (
    <>
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-deep-blue mb-2">Our Doctors</h1>
          <p className="text-muted-foreground font-body max-w-3xl">
            Find and book appointments with the best doctors in Pakistan. Our doctors are experienced specialists who
            provide high-quality healthcare services.
          </p>
        </div>

        <DoctorFilter doctors={doctors} onFilterChange={setFilteredDoctors} />

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
