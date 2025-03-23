import React from 'react'
import { Poltawski_Nowy } from "next/font/google";
import { Beiruti } from "next/font/google";

const beir = Beiruti({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });
const plot = Poltawski_Nowy({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });


export default function FooterHeader() {
    return (
        <div className='border-b-[1px] border-[#FFFFFF40]'>
            <div className={`${plot.className} relative text-[#FFFFFF10] text-[200px] font-bold flex justify-center mr-[1rem]`}>
                <h1 className='absolute'>Sehat Online</h1>
            </div>
            <div className='flex justify-between p-[4rem]'>
                <h1 className={`${plot.className} text-white text-6xl font-bold`}>Start your journey <br /> to a healthier, <br /> more active life.</h1>
                <div>
                    <p className={`${beir.className} text-white text-xl tracking-wide`}>Whether you're recovering from an injury, managing <br /> chronic pain, or seeking to enhance your mobility, our <br /> team is here to guide you every step of the way.</p>
                    <button className={`${beir.className} text-[#F0F5FA] text-lg mt-[3rem] tracking-wider bg-[#023E8A] p-[0.7rem] cursor-pointer rounded-full hover:bg-[#F0F5FA] hover:text-[#023E8A] duration-1000`}>Get Started</button>
                </div>
            </div>
        </div>
    )
}
