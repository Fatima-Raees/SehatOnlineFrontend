import React from "react";
import { Beiruti, Poltawski_Nowy } from "next/font/google";

const beir = Beiruti({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });
const plot = Poltawski_Nowy({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });

export default function Header() {
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
    </div>
  );
}
