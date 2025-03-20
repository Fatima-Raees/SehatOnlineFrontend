// import React from 'react'

// export default function Body() {
//     return (
//         <div className='mr-[4rem] mt-[4rem]'>
//             <div className='flex justify-start'>
//                 <div className='w-[500px] overflow-hidden'>
//                     <img src="/Choose/p1.jpg" alt="IMAGE" className='object-cover transition-transform duration-900 hover:scale-110'/>
//                 </div>
//                 <div className='w-[500px] mx-[1rem] overflow-hidden'>
//                     <img src="/Choose/p2.jpg" alt="IMAGE" className='object-cover transition-transform duration-900 hover:scale-110'/>
//                 </div>
//                 <div className='w-[500px] overflow-hidden'>
//                     <img src="/Choose/p3.jpg" alt="IMAGE" className='object-cover transition-transform duration-900 hover:scale-110'/>
//                 </div>
//             </div>
//             <div className='flex justify-start h-[280px] mt-[1rem]'>
//                 <div className='w-[500px] h-[100%] mr-[1rem] overflow-hidden'>
//                     <img src="/Choose/p4.jpg" alt="IMAGE" className='object-fill transition-transform duration-900 hover:scale-110'/>
//                 </div>
//                 <div className='w-[1015px] h-[100%] overflow-hidden'>
//                     <img src="/Choose/p5.jpg" alt="IMAGE" className='object-cover transition-transform duration-900 hover:scale-105'/>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React from "react";
import Image from "next/image";

const imagesTop = [
  "/Choose/p1.jpg",
  "/Choose/p2.jpg",
  "/Choose/p3.jpg",
];

const imagesBottom = [
  { src: "/Choose/p4.jpg", size: "w-[500px] h-[280px]" },
  { src: "/Choose/p5.jpg", size: "w-[1015px] h-[280px]" },
];

export default function Body() {
  return (
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
  );
}
