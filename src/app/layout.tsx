"use client";

import React, { useEffect, useState } from "react";
import DoctorNavbar from "@/components/Navbars/doctorNavbar";
import PatientNavbar from "@/components/Navbars/patientNavbar";
import Navbar from "@/components/Navbars/Navbar";
import "./globals.css";
import Footer from "./pages/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);



  return (
    <html lang="en">
      <body>
        {role === "doctor" ? (
          <DoctorNavbar />
        ) : role === "patient" ? (
          <PatientNavbar />
        ) : (
          <Navbar />
        )}
        {children}
        <Footer />
      </body>
    </html>
  );
}