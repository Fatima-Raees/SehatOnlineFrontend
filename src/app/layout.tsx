"use client";

import React from "react";
import DoctorNavbar from "@/components/Navbars/doctorNavbar";
import PatientNavbar from "@/components/Navbars/patientNavbar";
import Navbar from "@/components/Navbars/Navbar";
import AdminLayout from "@/components/Navbars/adminNavbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import Footer from "./pages/Footer";
import Cookies from "js-cookie";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const role = Cookies.get("role");
  const isAdmin = role === "Admin";

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {isAdmin ? (
            // Only AdminLayout (no navbar/footer)
            <AdminLayout title={"Dashboard"}>{children}</AdminLayout>
          ) : (
            // All other users get navbar + footer
            <>
              {role === "Doctor" ? (
                <DoctorNavbar />
              ) : role === "Patient" ? (
                <PatientNavbar />
              ) : (
                <Navbar />
              )}

              <main>{children}</main>

              <Footer />
            </>
          )}

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
