"use client";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ahmed Khan, Pvt Ltd",
    location: "LAHORE, PAKISTAN",
    image: "/Profiles/landing-page/p1.webp",
    text: "Sehat Online has completely transformed the way I manage my health. The convenience of online consultations and expert medical advice has been invaluable in managing my well-being from home."
  },
  {
    name: "Sara Ali",
    location: "ISLAMABAD, PAKISTAN",
    image: "/Profiles/landing-page/p3.webp",
    text: "I was initially hesitant about online healthcare, but Sehat Online changed my perception. The doctors are professional, and the platform is incredibly user-friendly."
  },
  {
    name: "Omar Zaid",
    location: "KARACHI, PAKISTAN",
    image: "/Profiles/p3.jpg",
    text: "Sehat Online has made healthcare so easy for me. Booking appointments, receiving prescriptions, and getting follow-ups have never been this smooth!"
  },
  {
    name: "Fatima Noor",
    location: "PESHAWAR, PAKISTAN",
    image: "/profiles/landing-page/p4.webp",
    text: "Thanks to Sehat Online, I can consult with top specialists without leaving my home. The support team is also fantastic and very responsive."
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + 2 < testimonials.length ? prevIndex + 2 : 0
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex - 2 >= 0 ? prevIndex - 2 : testimonials.length - 2
    );
  };

  return (
    <div className="flex flex-col items-center text-center py-12 px-6 bg-white">
      <span className="text-sm uppercase text-[#0077B6] font-semibold bg-[#F0F5FA] px-4 py-1 rounded-full">
        Thoughts of Patients
      </span>
      <h2 className="text-4xl font-semibold mt-3 text-gray-900">
        Here's What Our Customers Have Said
      </h2>

      {/* Testimonials Container */}
      <div className="mt-10 flex gap-8 overflow-hidden">
        {testimonials.slice(activeIndex, activeIndex + 2).map((item, index) => (
          <div
            key={index}
            className="bg-[#F0F5FA] p-6 rounded-lg shadow-lg max-w-md text-left transition-transform duration-500 min-h-[275px] flex flex-col justify-between"
          >
            <div>
              <FaQuoteLeft className="text-[#0077B6] text-4xl mb-3" />
              <p className="text-gray-700">{item.text}</p>
            </div>
            <div className="flex items-center mt-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-[#0077B6] text-sm">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="mt-6 flex gap-2">
        {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
          (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                activeIndex === index * 2 ? "bg-gray-900" : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index * 2)}
            />
          )
        )}
      </div>

      {/* Prev & Next Buttons */}
      {/* <div className="flex gap-4 mt-4">
        <button
          onClick={prevSlide}
          className="px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#005f8d] transition"
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#005f8d] transition"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
