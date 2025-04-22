"use client"

import type React from "react"
import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { DoctorProps } from "@/components/doctors/doctor-card"
import { getFilteredDoctors } from "@/APIServices/Doctors/doctorAPI"

interface FilterProps {
  doctors: DoctorProps[]
  onFilterChange: (filtered: DoctorProps[]) => void
}

export function DoctorFilter({ doctors, onFilterChange }: FilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    maxFee: 5000,
    specialization: [] as string[],
    hospital: [] as string[],
    city: [] as string[], // Add city as filter if required
  })

  const specializationOptions = Array.from(new Set(doctors.map((d) => d.specialization.value)))
  const hospitalOptions = Array.from(
    new Set(doctors.flatMap((d) => d.doctorHospitals.map((h) => h.hospital.name))),
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  const applyFilters = () => {
    const filterParams = {
      specialization: filters.specialization.join(","),
      city: filters.city.join(","),
      maxFee: filters.maxFee,
      hospital: filters.hospital,
    }

    getFilteredDoctors(filterParams)
      .then((filteredDoctors: DoctorProps[]) => {
      onFilterChange(filteredDoctors)
      })
      .catch((err: unknown) => {
      console.error("Error filtering doctors:", err)
      })
  }

  const resetFilters = () => {
    setSearchTerm("")
    setFilters({
      maxFee: 5000,
      specialization: [],
      hospital: [],
      city: [],
    })
    onFilterChange(doctors)
  }

  const toggleFilter = (key: "specialization" | "hospital" | "city", value: string) => {
    setFilters((prev) => {
      const current = [...prev[key]]
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((v) => v !== value) }
      } else {
        return { ...prev, [key]: [...current, value] }
      }
    })
  }

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search doctors by name, specialization, or hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </form>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button type="button" onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700">
            Apply
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="mt-4 p-4 border rounded-lg bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg text-gray-800">Filter Options</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-500 hover:text-gray-800">
              Reset All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Fee Filter */}
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Maximum Fee (Rs.)</h4>
              <Slider
                defaultValue={[filters.maxFee]}
                max={10000}
                step={500}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, maxFee: value[0] })) }
              />
              <div className="mt-2 text-sm text-gray-500">Up to Rs. {filters.maxFee}</div>
            </div>

            {/* Specialization Filter */}
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Specialization</h4>
              <div className="space-y-2">
                {specializationOptions.map((spec) => (
                  <label key={spec} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.specialization.includes(spec)}
                      onChange={() => toggleFilter("specialization", spec)}
                    />
                    <span className="text-sm">{spec}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hospital Filter */}
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Hospital</h4>
              <div className="space-y-2">
                {hospitalOptions.map((hosp) => (
                  <label key={hosp} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.hospital.includes(hosp)}
                      onChange={() => toggleFilter("hospital", hosp)}
                    />
                    <span className="text-sm">{hosp}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
