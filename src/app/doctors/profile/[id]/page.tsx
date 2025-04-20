"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Star, Award, BookOpen, Stethoscope, Users } from "lucide-react"
import { getDoctorById, type DoctorProps } from "@/lib/data/doctors"

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [doctor, setDoctor] = useState<DoctorProps | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const doctorData = getDoctorById(params.id)
    if (doctorData) {
      setDoctor(doctorData)
    } else {
      // Redirect to doctors page if doctor not found
      router.push("/doctors")
    }
    setLoading(false)
  }, [params.id, router])

  if (loading) {
    return (
      <>

        <div className="container py-12 text-center">
          <p className="text-muted-foreground">Loading doctor profile...</p>
        </div>
      </>
    )
  }

  if (!doctor) {
    return (
      <>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-heading text-deep-blue mb-4">Doctor Not Found</h1>
          <p className="text-muted-foreground mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/doctors")}>View All Doctors</Button>
        </div>
      </>
    )
  }

  return (
    <>

      <main className="container py-8">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          {/* Doctor Header */}
          <div className="bg-deep-blue text-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-white">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-heading mb-2">{doctor.name}</h1>
                <p className="text-white/80 font-subheading text-lg">{doctor.specialty}</p>
                {doctor.subSpecialty && <p className="text-white/70 font-body">{doctor.subSpecialty}</p>}

                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
                    <span className="font-subheading">{doctor.rating}</span>
                    <span className="text-white/70">({doctor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-5 w-5" />
                    <span>{doctor.experience} years exp.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-5 w-5" />
                    <span>{doctor.education}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-auto">
                <Button className="bg-bright-blue hover:bg-bright-blue/90 font-subheading text-lg px-8 py-6">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="p-6">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="about" className="font-subheading">
                  About
                </TabsTrigger>
                <TabsTrigger value="services" className="font-subheading">
                  Services
                </TabsTrigger>
                <TabsTrigger value="reviews" className="font-subheading">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <div>
                  <h2 className="text-xl font-heading text-deep-blue mb-3">About Doctor</h2>
                  <p className="text-muted-foreground font-body">
                    {doctor.name} is a highly qualified {doctor.specialty} specialist with {doctor.experience} years of
                    experience.
                    {doctor.subSpecialty && ` They specialize in ${doctor.subSpecialty}.`} They have helped numerous
                    patients and are committed to providing the highest quality of care.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-subheading text-deep-blue mb-3">Education & Training</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-bright-blue mt-0.5" />
                        <div>
                          <p className="font-subheading text-dark-blue">{doctor.education}</p>
                          <p className="text-sm text-muted-foreground">University of Health Sciences</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-bright-blue mt-0.5" />
                        <div>
                          <p className="font-subheading text-dark-blue">Residency</p>
                          <p className="text-sm text-muted-foreground">Jinnah Hospital</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-subheading text-deep-blue mb-3">Availability</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-bright-blue mt-0.5" />
                        <div>
                          <p className="font-subheading text-dark-blue">Working Days</p>
                          <p className="text-sm text-muted-foreground">{doctor.availability}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-bright-blue mt-0.5" />
                        <div>
                          <p className="font-subheading text-dark-blue">Consultation Time</p>
                          <p className="text-sm text-muted-foreground">10:00 AM - 4:00 PM</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-bright-blue mt-0.5" />
                        <div>
                          <p className="font-subheading text-dark-blue">Location</p>
                          <p className="text-sm text-muted-foreground">Sehat Online Medical Center, Lahore</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="space-y-6">
                <h2 className="text-xl font-heading text-deep-blue mb-3">Services Offered</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                      <Stethoscope className="h-5 w-5 text-bright-blue mt-1" />
                      <div>
                        <p className="font-subheading text-dark-blue">Service {i}</p>
                        <p className="text-sm text-muted-foreground">
                          Description of the service provided by the doctor.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading text-deep-blue">Patient Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${star <= Math.floor(doctor.rating) ? "fill-yellow-400 stroke-yellow-400" : "fill-muted stroke-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="font-subheading">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.reviews})</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-soft-blue flex items-center justify-center">
                          <Users className="h-5 w-5 text-bright-blue" />
                        </div>
                        <div>
                          <p className="font-subheading text-dark-blue">Patient {i}</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= 5 - (i % 2) ? "fill-yellow-400 stroke-yellow-400" : "fill-muted stroke-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground ml-auto">
                          {i} month{i !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                      <p className="text-muted-foreground font-body">
                        Great experience with {doctor.name}. Very professional and knowledgeable. The treatment was
                        effective and I felt much better after the consultation.
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  )
}
