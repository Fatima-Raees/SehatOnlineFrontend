import React from "react";
import Image from "next/image";
import MarqueeSlider from "@/components/ui/MarqueeSlider";
import FacilitiesSection from "@/components/ui/FacilitiesSection";


const AboutUs: React.FC = () => {
  return (
    <>
    <section className="relative bg-blue-600 text-white py-20 flex flex-col items-center text-center">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-[url('/path-to-your-background-image.png')] bg-cover bg-center opacity-20"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold">About Us</h2>
        <p className="mt-4 text-lg max-w-2xl">
          It is a broad discipline that includes various branches and specialties aimed at promoting health and well-being.
        </p>
      </div>
    </section>
    <section className="flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-8 md:px-16">
      <div className="w-full md:w-1/2 flex justify-end">
        <Image
          src="/about-us/about-us.Webp"
          alt="Doctors"
          width={550}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0 flex justify-start">
  <div className="max-w-xl"> {/* Increased max width */}
    <span className="text-sm uppercase text-blue-600 font-semibold">About Us</span>
    <h2 className="text-4xl font-bold text-gray-900 mt-2">
      We Provide the Best Health Service
    </h2>
    <p className="text-gray-700 mt-4 leading-relaxed">
      Medical, or medicine, refers to the field of healthcare that encompasses
      the diagnosis, treatment, and prevention of diseases and injuries in
      humans. It is a broad discipline that includes various branches.
    </p>
    <ul className="mt-4 space-y-2 text-gray-700">
      <li className="flex items-center"><span className="text-blue-600 text-lg mr-2">•</span> <strong>Treatment specific to your needs</strong></li>
      <li className="flex items-center"><span className="text-blue-600 text-lg mr-2">•</span> Multi-Specialty Hospital</li>
      <li className="flex items-center"><span className="text-blue-600 text-lg mr-2">•</span> Customized exercise programs</li>
      <li className="flex items-center"><span className="text-blue-600 text-lg mr-2">•</span> Health for 50+</li>
    </ul>
  </div>
</div>

    </section>

<div>
      <MarqueeSlider />
    </div>
    <div>
      <FacilitiesSection />
    </div>
    </>
  );
};

export default AboutUs;