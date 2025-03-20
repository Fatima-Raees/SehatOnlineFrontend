"use client";
import React from "react";
import Link from "next/link";
const services = [
  { name: "Eye Care", icon: "/icons/eye-exam.svg" },
  { name: "Cardiology", icon: "/icons/cardiology.svg" },
  { name: "Dental", icon: "/icons/dental.svg" },
  { name: "Neurology", icon: "/icons/neurology.svg" },
  { name: "Orthopedics", icon: "/icons/orthopedic.svg" },
  { name: "Thyroid", icon: "/icons/thyroid-gland.svg" },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#F5F7FA] py-16">
      <div className="max-w-5xl mx-auto text-center px-6">
        {/* Small Title */}
        <span className="text-sm uppercase text-[#0077B6] font-semibold bg-[#E0F2FE] px-4 py-1 rounded-full">
          Our Services
        </span>

        {/* Main Title */}
        <h2 className="text-4xl font-bold text-gray-900 mt-3">
          Best Medical Service <br /> By Medicare
        </h2>

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img src={service.icon} alt={service.name} className="h-16 w-16 mb-4" />
              <p className="text-lg font-semibold text-gray-800">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <Link href="/services">
  <button className="mt-8 px-6 py-3 bg-[#0077B6] text-white font-medium rounded-lg shadow-md hover:bg-[#005f8d] transition">
    View All Services
  </button>
</Link>
      </div>
    </section>
  );
}
