"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { logoutUser } from "../../APIServices/users/usersAPI";
const DoctorNavbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / Site Name */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image src="/logo/Asset 8.jpg" alt="logo" width={70} height={70} />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/Doctor/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>

          {/* View Doctors Button (replacing dropdown) */}
          <Link href="/Doctor/appointments" className="text-gray-700 hover:text-blue-600">
            View Patients
          </Link>

          <Link href="/chat" className="text-gray-700 hover:text-blue-600">
            Chat
          </Link>
          <Link href="/notification" className="text-gray-700 hover:text-blue-600">
                          Notification
                        </Link>
         
        </div>

        {/* Login / Signup Combined */}
        <div className="space-x-4 flex items-center">
            <Button variant="outline" onClick={() => logoutUser()}>
            <Link href="/">LogOut</Link>
            {/* / <Link href="/signup">Sign Up</Link> */}
            </Button>
        </div>
      </div>
    </nav>
  )
}

export default DoctorNavbar;
