// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import "@/styles/HomePage.css"; // Ensure this path is correct
// // import NavBar from "../Components/NavBar";
// import HeroSection from "@/components/ui/HeroSection";

// const images: string[] = [
//   "/BG Images/bg1.jpg",
//   "/BG Images/bg2.jpg",
//   "/BG Images/bg3.jpg",
//   "/BG Images/bg4.jpg",
//   "/BG Images/bg5.jpg",
// ];

// export default function HomePage() {
//   const [currentImage, setCurrentImage] = useState<number>(0);
//   const [nextImage, setNextImage] = useState<number>(1);
//   const [isSliding, setIsSliding] = useState<boolean>(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsSliding(true); // Start slide-in effect
//       setTimeout(() => {
//         setCurrentImage(nextImage); // Update current image after slide finishes
//         setNextImage((prev) => (prev + 1) % images.length); // Set next image
//         setIsSliding(false); // Reset slide effect
//       }, 3000); // Slide duration should be smooth
//     }, 7000); // 3 seconds display + 1 second transition

//     return () => clearInterval(interval);
//   }, [nextImage]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background Image Slider */}
//       <div className="absolute inset-0 w-full h-full">
//         {/* Current image (fades out) */}
//         <Image
//           key={currentImage}
//           src={images[currentImage]}
//           alt={`Slide ${currentImage + 1}`}
//           fill
//           priority
//           className={`absolute inset-0 object-cover transition-opacity duration-3000 ease-in-out ${
//             isSliding ? "opacity-50" : "opacity-100"
//           }`}
//         />

//         {/* Next image (slides in from right) */}
//         <Image
//           key={nextImage}
//           src={images[nextImage]}
//           alt={`Slide ${nextImage + 1}`}
//           fill
//           priority
//           className={`absolute inset-0 object-cover transition-all duration-3000 ease-in-out transform ${
//             isSliding ? "translate-x-0" : "translate-x-full"
//           }`}
//         />
//       </div>

//       {/* Content */}
//       {/* <div className="absolute inset-0 z-10 flex flex-col items-center w-full h-[3rem] px-4">
//         <NavBar />
//       </div> */}
//       <div className="absolute inset-0 z-10 flex flex-col items-start w-full mt-[10rem] px-4">
//         <HeroSection />
//       </div>

//       <div className="absolute inset-0 bg-[#023E8A] opacity-25" />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "@/styles/HomePage.css"; // Ensure the correct path
import HeroSection from "@/components/ui/HeroSection";

const images = [
  "/BG Images/bg1.jpg",
  "/BG Images/bg2.jpg",
  "/BG Images/bg3.jpg",
  "/BG Images/bg4.jpg",
  "/BG Images/bg5.jpg",
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // 7 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images Container */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0} // Load first image eagerly
            className={`absolute inset-0 object-cover transition-opacity duration-2000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Content Section */}
      <div className="absolute inset-0 z-10 flex flex-col items-start w-full mt-[10rem] px-4">
        <HeroSection />
      </div>

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-[#023E8A] opacity-25" />
    </div>
  );
}
