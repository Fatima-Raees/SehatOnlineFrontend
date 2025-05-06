"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutUser } from "../../APIServices/users/usersAPI";


const PatientNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    
    // const role = sessionStorage.getItem("role");
    // setIsLoggedIn(role === "Patient");
  }, []);

  const handleHomeClick = () => {
    
    sessionStorage.removeItem("role");
    window.dispatchEvent(new Event("storage"));
    
  };



  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / Site Name */}
        <button onClick={handleHomeClick} className="text-2xl font-bold text-blue-600">
          <Image src="/logo/Asset 8.jpg" alt="logo" width={70} height={70} />
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <button onClick={handleHomeClick} className="text-gray-700 hover:text-blue-600">
            Home
          </button>

          {/* Conditionally render links based on login status */}
          {!isLoggedIn ? (
            <>
              <Link href="/patient-dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/doctors" className="text-gray-700 hover:text-blue-600">
                View Doctors
              </Link>
              <Link href="/chat" className="text-gray-700 hover:text-blue-600">
                Chat
              </Link>
              <Link href="/c" className="text-gray-700 hover:text-blue-600">
               ChatBot
              </Link>
              <Link href="/notification" className="text-gray-700 hover:text-blue-600">
                Notification
              </Link>

             
            </>
          ) : (
            <>
              <Link href="/about-us" className="text-gray-700 hover:text-blue-600">
                About Us
              </Link>
            </>
          )}
        </div>

        {/* Login / Signup or User Info */}
        <div className="space-x-4 flex items-center">
          {!isLoggedIn ? (
            <Button variant="outline" onClick={() => logoutUser()}>
              <Link href="/login">LogOut</Link>
               {/* / <Link href="/signup">Sign Up</Link> */}
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, Patient</span>
              
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PatientNavbar;