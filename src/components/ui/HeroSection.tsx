import React from 'react'
import { ArrowRight } from "lucide-react";
import { Poltawski_Nowy } from "next/font/google";
import { Beiruti } from "next/font/google";


const plot = Poltawski_Nowy({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });
const beir = Beiruti({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });


export default function HeroSection() {
  return (
    <div>
      <div id="Appointment" className='flex items-center judtify-center cursor-pointer w-fit px-[1rem] py-[1rem] realtive backdrop-blur-xs rounded-full'>
        <div id="images" className='flex items-start relative px-[0.5rem]'>
            <img src="/Profiles/p1.jpg" alt="" className='w-[35px] h-[35px] rounded-full' />
            <img src="/Profiles/p2.jpg" alt="" className='w-[35px] h-[35px] rounded-full absolute left-[25px]' />
            <img src="/Profiles/p3.jpg" alt="" className='w-[35px] h-[35px] rounded-full absolute left-[50px]' />
            <img src="/Profiles/p4.jpg" alt="" className='w-[35px] h-[35px] rounded-full absolute left-[75px]' />
        </div>
        <div id="text" className='pl-[5rem] text-white text-xl font-semibold'>
            <p>Book Appointment</p>
        </div>
        <div id="icon" className='pl-[1rem] font-semibold text-white'>
            <ArrowRight size={24} />
        </div>
      </div>
      <div id="Content" className='w-[100vw] '>
        <div id='Heading' className={`${plot.className} text-white text-7xl py-[2rem]`}>
            <h1>Pain-Free Living <br /> Starts Here</h1>
        </div>
        <div id="body" className={`${beir.className} text-white text-xl py-[1rem]`}>
            <p className='w-[50]'>Whether youér recovering from an injury, managing chronic pain, or seeking to <br /> enhance your overalll mobility, our team is here to guide you every step of the way</p>
        </div>
      </div>
      {/* <div id="Buttons" className={`${beir.className} text-white mt-[1rem] text-xl`}>
        <button className='cursor-pointer px-[1rem] py-[0.5rem] text-[#023E8A] bg-[#F0F5FA] rounded-full text-3xl font-bold hover:bg-[#023E8A] hover:text-[#F0F5FA] duration-1000'>Login</button>
        <button className='cursor-pointer ml-[1rem] px-[1rem] py-[0.5rem] text-[#F0F5FA] bg-[#023E8A] rounded-full text-3xl font-bold hover:text-[#023E8A] hover:bg-[#F0F5FA] duration-1000'>Sign Up</button>
      </div> */}
    </div>
  )
}
