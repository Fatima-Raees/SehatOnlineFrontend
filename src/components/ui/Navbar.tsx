"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// List of specialties can be kept for reference but won't be used in the navbar
const specialties = [
  { name: "Gynecology", slug: "gynecology" },
  { name: "Pediatrics", slug: "pediatrics" },
  { name: "Dermatology", slug: "dermatology" },
  { name: "Cardiology", slug: "cardiology" },
  { name: "Orthopedics", slug: "orthopedics" },
  { name: "Neurology", slug: "neurology" },
]

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / Site Name */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image src="/logo/Asset 8.jpg" alt="logo" width={70} height={70} />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          {/* View Doctors Button (replacing dropdown) */}
          <Link href="/doctors" className="text-gray-700 hover:text-blue-600">
            View Doctors
          </Link>

          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Blog
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-blue-600">
            About Us
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Health Blog
          </Link>
        </div>

        {/* Login / Signup Combined */}
        <div className="space-x-4 flex items-center">
          <Button variant="outline">
            <Link href="/login">Login</Link> / <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
