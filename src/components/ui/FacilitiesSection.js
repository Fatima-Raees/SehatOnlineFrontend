import React from "react";

const facilities = [
  {
    title: "Eyecare Services",
    description:
      "Medical professionals use various methods, including physical examination, medical history, laboratory tests, imaging studies.....",
    icon: "👁️",
  },
  {
    title: "Pain & Palliative care",
    description:
      "Once a diagnosis is made, treatment options are recommended based on evidence-based guidelines and individual patient factors....",
    icon: "🧠",
  },
  {
    title: "Psychiatry & Psychology",
    description:
      "Preventive medicine focuses on promoting health and preventing diseases. This includes measures such as vaccinations, health screenings....",
    icon: "🦷",
  },
  {
    title: "Surgical Center",
    description:
      "Clinical trials and studies are conducted to explore new treatments, understand diseases better, and develop innovative medical technologies....",
    icon: "🫁",
  },
];

const FacilitiesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-sm uppercase text-blue-600 font-semibold">
          Facilities We Have
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          Exactly What Facilities We Provided
        </h2>
      </div>

      {/* Facilities Grid */}
      <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex items-center"
          >
            <div className="bg-gray-100 p-4 rounded-xl text-blue-600 text-4xl">
              {facility.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {facility.title}
              </h3>
              <p className="text-gray-700 mt-2 text-sm">{facility.description}</p>
              <a href="#" className="text-blue-600 font-semibold mt-3 block">
                READ MORE
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FacilitiesSection;
