"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Calendar, ChevronLeft, ChevronRight, MoreVertical, TrendingUp, X } from "lucide-react"
import { DashboardDonut } from "./dashboard-donut"
import { AppointmentsPieChart } from "./appointments-pie-chart"
import { AppointmentsBarChart } from "./appointments-bar-chart"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Johnson</h1>
          <p className="text-gray-500"></p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {/* Today's Appointments - First priority */}
          <Card className="md:col-span-3 lg:col-span-6 overflow-hidden border-none rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Today's Appointments</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-medium"
                >
                  All patients <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer">
                  <div className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md">10:30am</div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-indigo-100 text-indigo-800">SH</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">Sarah Hostemn</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-yellow-400"></span>
                        Diagnosis: Bronchitis
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-100">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer">
                  <div className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md">11:00am</div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-red-100 text-red-800">DS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">Dakota Smith</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                        Diagnosis: Stroke
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-100">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer">
                  <div className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md">11:30am</div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-blue-100 text-blue-800">JL</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">John Lane</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                        Diagnosis: Liver
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-100">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Queries - Second priority */}
          <Card className="md:col-span-3 lg:col-span-6 overflow-hidden border-none rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Queries</h2>
              <div className="flex gap-2 mb-6">
                <Button variant="outline" size="sm" className="rounded-full shadow-sm">
                  All
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 border-none shadow-md"
                >
                  Unread
                </Button>
                <Button variant="outline" size="sm" className="rounded-full shadow-sm">
                  New
                </Button>
              </div>
              <div className="space-y-4">
                <div className="border-t pt-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    14 Jun 2021 / 01:05PM
                  </div>
                  <h3 className="font-medium mb-3 text-gray-800">
                    Addiction blood bank bone marrow contagious disinfectants?
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs shadow-sm bg-white hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Read more
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs shadow-sm bg-white hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
                <div className="border-t pt-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    12 Jun 2021 / 03:22PM
                  </div>
                  <h3 className="font-medium mb-3 text-gray-800">
                    Medication dosage for pediatric patients with asthma?
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs shadow-sm bg-white hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Read more
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs shadow-sm bg-white hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments - Third priority */}
          <Card className="md:col-span-8 lg:col-span-12 overflow-hidden border-none rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-indigo-50 text-indigo-600 border-indigo-200"
                  >
                    Week
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Month
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5 bg-gray-50 p-3 rounded-lg">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-100">
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                </Button>
                <div className="grid grid-cols-7 gap-1 text-center">
                  <div className="text-xs">
                    <div className="text-gray-500">Sat</div>
                    <div className="font-medium">22nd</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-500">Sun</div>
                    <div className="font-medium">23rd</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-500">Mon</div>
                    <div className="font-medium">24th</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-500">Tue</div>
                    <div className="font-medium">25th</div>
                  </div>
                  <div className="text-xs bg-indigo-600 text-white rounded-md p-1">
                    <div>Wed</div>
                    <div>26th</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-500">Thu</div>
                    <div className="font-medium">27th</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-500">Fri</div>
                    <div className="font-medium">28th</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-100">
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <div className="flex flex-col p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-indigo-100 text-indigo-800">SH</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">Shawn Hampton</div>
                      <div className="text-sm font-medium text-indigo-600 truncate">Emergency appointment</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
                        10:00 AM
                      </div>
                      <div className="text-sm font-bold text-green-600">$30</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Urgent</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>Patient complains of severe chest pain and difficulty breathing.</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full ml-auto text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                    >
                      Details
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-blue-100 text-blue-800">PP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">Polly Paul</div>
                      <div className="text-sm font-medium text-blue-600 truncate">USG + Consultation</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">10:30 AM</div>
                      <div className="text-sm font-bold text-green-600">$50</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Regular</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>Follow-up appointment for pregnancy ultrasound and checkup.</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full ml-auto text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      Details
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col p-4 rounded-xl bg-gradient-to-r from-purple-50 to-white border border-purple-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-purple-100 text-purple-800">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">John Doe</div>
                      <div className="text-sm font-medium text-purple-600 truncate">Laboratory screening</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                        11:00 AM
                      </div>
                      <div className="text-sm font-bold text-green-600">$70</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Screening</Badge>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>Annual blood work and comprehensive health screening.</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full ml-auto text-purple-600 border-purple-200 hover:bg-purple-50"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Stats - Now fourth priority */}
          <Card className="md:col-span-3 lg:col-span-4 overflow-hidden border-none rounded-xl bg-gradient-to-br from-white to-indigo-50/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-500">Total</div>
                        <div className="text-2xl font-bold text-indigo-600">990</div>
                      </div>
                    </div>
                    <DashboardDonut />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                      <span className="text-sm font-medium">Women 44%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-indigo-200 mr-2"></span>
                      <span className="text-sm font-medium">Men 56%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 space-y-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700">New Patients</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-4xl font-bold text-indigo-600">67</span>
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100 font-medium">
                        <span className="text-xs">+39%</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700">Old Patients</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-4xl font-bold text-indigo-600">27</span>
                      <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100 font-medium">
                        <span className="text-xs">-4%</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Appointment - Fifth priority */}
          <Card className="md:col-span-3 lg:col-span-4 overflow-hidden border-none rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Overall Appointments</h2>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </Badge>
              </div>
              <div className="h-48 bg-gray-50 p-4 rounded-xl">
                <AppointmentsBarChart />
              </div>
            </CardContent>
          </Card>

          {/* Appointments Overview - Sixth priority */}
          <Card className="md:col-span-3 lg:col-span-4 overflow-hidden border-none rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Appointments Overview</h2>
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                  This Month
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="w-40 h-40 bg-gray-50 rounded-full p-2 shadow-inner">
                  <AppointmentsPieChart />
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6 bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <span className="text-sm font-medium">Male</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-300 mr-2"></span>
                  <span className="text-sm font-medium">Female</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm font-medium">Child</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  <span className="text-sm font-medium">Senior</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
