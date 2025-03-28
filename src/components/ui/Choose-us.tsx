import React from "react";
import Image from "next/image";
import { Beiruti, Poltawski_Nowy } from "next/font/google";

const beir = Beiruti({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });
const plot = Poltawski_Nowy({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });

const imagesTop = [
  "/Choose/p1.jpg",
  "/Choose/p2.jpg",
  "/Choose/p3.jpg",
];

const imagesBottom = [
  { src: "/Choose/p4.jpg", size: "w-[500px] h-[280px]" },
  { src: "/Choose/p5.jpg", size: "w-[1015px] h-[280px]" },
];

export default function Choose() {
  return (
    <div className="text-center lg:text-left">
      {/* Section Title */}
      <div className={`${beir.className} text-black text-xl pb-2 border-b-2 border-[#023E8A] w-fit mx-auto lg:mx-0`}>
        <p>Why Choose Us</p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row justify-center items-center mt-10 gap-10">
        {/* Left Text Content */}
        <div className={`${plot.className} text-black text-4xl lg:text-6xl leading-tight w-full lg:w-1/2 text-center lg:text-left`}>
          <p>
            Live Your Best Life with <br />
            Our Chiropractic & <br />
            Physiotherapy Practices
          </p>
        </div>

        {/* Right Description */}
        <div className="w-full lg:w-1/2 px-4 text-[#535353] text-lg leading-relaxed font-light text-center lg:text-left">
          <p>
            Realign your body and restore balance. Our chiropractic treatments focus on relieving pain, improving posture,
            and optimizing nervous system function. Rebuild strength, mobility, and confidence with our tailored
            physiotherapy programs.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-10">
        {/* Top Row of Images */}
        <div className="flex flex-wrap justify-center gap-6">
          {imagesTop.map((src, index) => (
            <div key={index} className="w-[320px] lg:w-[400px] overflow-hidden rounded-lg shadow-md">
              <Image
                src={src}
                alt={`Choose us image ${index + 1}`}
                width={400}
                height={300}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Bottom Row of Images */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {imagesBottom.map(({ src, size }, index) => (
            <div key={index} className={`${size} overflow-hidden rounded-lg shadow-md`}>
              <Image
                src={src}
                alt={`Choose us image ${index + 4}`}
                width={800}
                height={400}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
