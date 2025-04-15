"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Retrieve role from sessionStorage
    const storedRole = sessionStorage.getItem("role");
    setRole(storedRole);

    // Special handling for About Us page
    if (pathname === "/about-us") {
      
      
      sessionStorage.setItem("role", "patient");
    window.dispatchEvent(new Event("storage"));
    }

    // Listen for storage changes across tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "role") {
        setRole(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [pathname]);

  
  

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <button  className="text-2xl font-bold text-blue-600">
          <Image src="/logo/Asset 8.jpg" alt="logo" width={70} height={70} />
        </button>

        <div className="hidden md:flex space-x-6">
          {/* Home - Clicking resets role only on home page */}
          <button className="text-gray-700 hover:text-blue-600">
            Home
          </button>

          

          <Link href="#" className="text-gray-700 hover:text-blue-600">Services</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-600">Blog</Link>

          <Link href="/about-us" className="text-gray-700 hover:text-blue-600">
            About Us
          </Link>
        </div>

        {/* Show login/signup if no role */}
        {!role && (
          <div className="space-x-4 flex items-center">
            <Button variant="outline">
              <Link href="/login">Login</Link> / <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;