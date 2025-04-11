"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import type { DoctorProps } from "@/components/doctors/doctor-card"

interface FilterProps {
  doctors: DoctorProps[]
  onFilterChange: (filtered: DoctorProps[]) => void
}

export function DoctorFilter({ doctors, onFilterChange }: FilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    minExperience: 0,
    maxFee: 5000,
    availability: [] as string[],
    gender: [] as string[],
  })

  // Get unique availability options
  const availabilityOptions = Array.from(new Set(doctors.map((d) => d.availability)))

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    let filtered = [...doctors]

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(term) ||
          doctor.specialty.toLowerCase().includes(term) ||
          (doctor.subSpecialty && doctor.subSpecialty.toLowerCase().includes(term)),
      )
    }

    // Apply experience filter
    if (filters.minExperience > 0) {
      filtered = filtered.filter((doctor) => doctor.experience >= filters.minExperience)
    }

    // Apply fee filter
    filtered = filtered.filter((doctor) => doctor.fee <= filters.maxFee)

    // Apply availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter((doctor) => filters.availability.includes(doctor.availability))
    }

    // Apply gender filter
    if (filters.gender.length > 0) {
      // This would require gender to be added to the doctor model
      // For now, we'll skip this filter
    }

    onFilterChange(filtered)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setFilters({
      minExperience: 0,
      maxFee: 5000,
      availability: [],
      gender: [],
    })
    onFilterChange(doctors)
  }

  const toggleAvailability = (value: string) => {
    setFilters((prev) => {
      const current = [...prev.availability]
      if (current.includes(value)) {
        return { ...prev, availability: current.filter((v) => v !== value) }
      } else {
        return { ...prev, availability: [...current, value] }
      }
    })
  }

  const toggleGender = (value: string) => {
    setFilters((prev) => {
      const current = [...prev.gender]
      if (current.includes(value)) {
        return { ...prev, gender: current.filter((v) => v !== value) }
      } else {
        return { ...prev, gender: [...current, value] }
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
            placeholder="Search doctors by name or specialty..."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Experience Filter */}
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Experience (Years)</h4>
              <div className="pl-2 pr-4">
                <Slider
                  defaultValue={[filters.minExperience]}
                  max={20}
                  step={1}
                  onValueChange={(value: number[]) => handleFilterChange("minExperience", value[0])}
                />
                <div className="mt-2 text-sm text-gray-500">{filters.minExperience}+ years</div>
              </div>
            </div>

            {/* Fee Filter */}
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Maximum Fee (Rs.)</h4>
              <div className="pl-2 pr-4">
                <Slider
                  defaultValue={[filters.maxFee]}
                  max={10000}
                  step={500}
                  onValueChange={(value: number[]) => handleFilterChange("maxFee", value[0])}
                />
                <div className="mt-2 text-sm text-gray-500">Up to Rs. {filters.maxFee}</div>
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Availability</h4>
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`availability-${option}`}
                      checked={filters.availability.includes(option)}
                      onCheckedChange={() => toggleAvailability(option)}
                    />
                    <label htmlFor={`availability-${option}`} className="text-sm cursor-pointer">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            {/* <div>
              <h4 className="font-medium mb-2 text-gray-800">Gender</h4>
              <div className="space-y-2">
                {["Male", "Female"].map((gender) => (
                  <div key={gender} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gender-${gender}`}
                      checked={filters.gender.includes(gender)}
                      onCheckedChange={() => toggleGender(gender)}
                    />
                    <label htmlFor={`gender-${gender}`} className="text-sm cursor-pointer">
                      {gender}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  )
}
