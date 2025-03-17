import React from 'react'
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Poltawski_Nowy } from "next/font/google";
import { Beiruti } from "next/font/google";

const beir = Beiruti({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });
const plot = Poltawski_Nowy({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });

export default function FooterBody() {
  return (
    <div className='flex items-center justify-center mt-[3rem] px-[5rem]'>
                <div id="section_1" className='flex-col w-[40vw] items-start'>
                    <h1 className={`${plot.className} text-5xl text-[#F0F5FA] my-[2rem] `}>Sehat Online</h1>
                    <p className={`${beir.className} text-xl tracking-wider text-[#F0F5FA] mb-[2rem]`}>Live Your Best Life with Chiropractic and <br /> Physiotherapy Care Tailored to Your Needs</p>
                    <div className='flex text-[#F0F5FA] text-4xl'>
                        <FaInstagram className='p-[0.5rem] bg-[#FFFFFF10] rounded-full cursor-pointer hover:text-[#023E8A] duration-1000 mr-[0.5rem]' />
                        <FaFacebook className='p-[0.5rem] bg-[#FFFFFF10] rounded-full cursor-pointer hover:text-[#023E8A] duration-1000 mr-[0.5rem]' />
                        <FaXTwitter className='p-[0.5rem] bg-[#FFFFFF10] rounded-full cursor-pointer hover:text-[#023E8A] duration-1000 mr-[0.5rem]' />
                        <FaYoutube className='p-[0.5rem] bg-[#FFFFFF10] rounded-full cursor-pointer hover:text-[#023E8A] duration-1000 mr-[0.5rem]' />
                    </div>
                </div>
                <div id="section_2" className='flex-col w-[20vw] items-start' >
                    <h1 className={`${plot.className} text-2xl text-[#F0F5FA]`}>Quick Links</h1>
                    <div className={`${beir.className} text-lg text-[#FFFFFF50] list-none mt-[2rem] `}>
                        <li className='hover:text-[#F0F5FA] duration-700'><a href="">Testimonials</a></li>
                        <li className='hover:text-[#F0F5FA] duration-700 my-[0.8rem]'><a href="">Pricing</a></li>
                        <li className='hover:text-[#F0F5FA] duration-700'><a href="">Our Team</a></li>
                    </div>
                </div>
                <div id="section_3" className='flex-col w-[20vw] items-start' >
                    <h1 className={`${plot.className} text-2xl text-[#F0F5FA]`}>Company</h1>
                    <div className={`${beir.className} text-lg text-[#FFFFFF50] list-none mt-[2rem] `}>
                        <li className='hover:text-[#F0F5FA] duration-700'><a href="">About Us</a></li>
                        <li className='hover:text-[#F0F5FA] duration-700 my-[0.8rem]'><a href="">Our Services</a></li>
                        <li className='hover:text-[#F0F5FA] duration-700'><a href="">Contact Us</a></li>
                    </div>
                </div>
                <div id="section_4"></div>
    </div>
  )
}
