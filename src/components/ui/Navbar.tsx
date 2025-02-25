"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / Site Name */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          SehatOnline
        </Link>

        {/* Navigation Links (Commented for Later Use) */}
        {/* <div className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Doctors
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Hospitals
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Labs & Diagnostics
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Surgeries
          </Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">
            Health Blog
          </Link>
        </div> */}

        {/* Login / Signup Combined */}
        <div className="space-x-4 flex items-center">
          <Button variant="outline">
            <Link href="/patient/login">Login</Link> / <Link href="/patient/signup">Sign Up</Link>
          </Button>
          <Button variant="default">
            <Link href="/doctor/signup">Join as Doctor</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
