import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface DoctorProps {
  person: {
    personId: number
    name: string
    email: string
    profileImage?: string
  }
  specialization: {
    lookupID: number
    category: string
    value: string
  }
  doctorHospitals: {
    doctorHospitalID: number
    hospitalID: number
    timeStart: string
    timeEnd: string
    breakStart: string
    breakEnd: string
    weekDays: string
    capacity: number
    fee: number
    hospital: {
      hospitalID: number
      name: string
      address: string
      city: string
    }
  }[]
}

export function DoctorCard({ doctor }: { doctor: DoctorProps }) {
  const { person, specialization, doctorHospitals } = doctor

  const hospitalInfo = doctorHospitals[0] // just use the first hospital for display purposes
  const fee = hospitalInfo?.fee ?? 0
  const availability = hospitalInfo?.weekDays ?? "N/A"
  const image = person.profileImage || "/placeholder.svg?height=300&width=300"

  return (
    <div className="rounded-lg border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full md:h-auto md:w-1/3">
          <Image
            src={image}
            alt={person.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-4 md:p-6 md:w-2/3">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">{person.name}</h3>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                <span className="text-sm font-medium">4.5</span>
                <span className="text-xs text-gray-500">(120)</span>
              </div>
            </div>

            <p className="text-blue-600 font-medium mt-1">{specialization?.value}</p>
            {specialization?.category && (
              <p className="text-sm text-gray-500">{specialization.category}</p>
            )}

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-medium text-gray-800">5 years</p>
              </div>
              <div>
                <p className="text-gray-500">Fee</p>
                <p className="font-medium text-gray-800">Rs. {fee}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{person.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Availability</p>
                <p className="font-medium text-gray-800">{availability}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Book Appointment</Button>
            <Link href={`/doctors/profile/${person.personId}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
