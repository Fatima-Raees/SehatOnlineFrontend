"use client";

import React, { useEffect, useState } from "react";
import DoctorNavbar from "@/components/Navbars/doctorNavbar";
import PatientNavbar from "@/components/Navbars/patientNavbar";
import Navbar from "@/components/Navbars/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import Footer from "./pages/Footer";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1, // Retry failed requests once
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {role === "doctor" ? (
            <DoctorNavbar />
          ) : role === "patient" ? (
            <PatientNavbar />
          ) : (
            <Navbar />
          )}
          {children}
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}