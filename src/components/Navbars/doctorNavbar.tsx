"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const DoctorNavbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / Site Name */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
        <Image src="/logo/Asset 8.jpg" alt="logo" width={70} height={70} />   
        </Link>

        {/* Navigation Links (Commented for Later Use) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
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
         
        </div>

        {/* Login / Signup Combined */}
        <div className="space-x-4 flex items-center">
          <Button variant="outline">
            <Link href="/login">Login</Link> / <Link href="/signup">Sign Up</Link>
          </Button>
          {/* <Button variant="default">
            <Link href="/doctor/signup">Join as Doctor</Link>
          </Button> */}
        </div>
      </div>



    </nav>
  );
};

export default DoctorNavbar;
