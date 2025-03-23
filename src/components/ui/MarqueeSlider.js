import React from "react";

const MarqueeSlider = () => {
  return (
    <div className="w-full bg-blue-500 py-2 overflow-hidden whitespace-nowrap relative">
      <div className="flex space-x-8 text-white font-semibold text-lg animate-marquee">
        {/* Duplicated text for continuous effect */}
        <span>● EYE CARE SERVICES</span>
        <span>● HEART SPECIALISTS</span>
        <span>● 35+ EXPERT DOCTORS</span>
        <span>● 20+ SPECIALIST</span>
        <span>● CARDIOLOGY SERVICES</span>
        <span>● HEART SPECIALISTS</span>
        <span>● HAPPY PATIENTS</span>

        {/* Repeat the same text for smooth loop */}
        <span>● EYE CARE SERVICES</span>
        <span>● HEART SPECIALISTS</span>
        <span>● 35+ EXPERT DOCTORS</span>
        <span>● 20+ SPECIALIST</span>
        <span>● CARDIOLOGY SERVICES</span>
        <span>● HEART SPECIALISTS</span>
        <span>● HAPPY PATIENTS</span>
      </div>
    </div>
  );
};

export default MarqueeSlider;
