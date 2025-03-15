import React from 'react'
import { Beiruti } from "next/font/google";
import { Poltawski_Nowy } from "next/font/google";

const beir = Beiruti({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });
const plot = Poltawski_Nowy({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });



export default function Header() {
    return (
        <div>
            <div id="top-line" className={`${beir.className} text-black text-xl pb-[0.3rem] border-b-[2px] border-[#023E8A] w-fit font-thin `}>
                <p>Why Choose Us</p>
            </div>
            <div id="content" className='flex w-[100vw] justify-center mt-[3rem]'>
                <div id="header" className={`${plot.className} text-black text-6xl w-[50%]`}>
                    <p>Live Your Best Life with <br /> Our Chiropractic & <br /> Physiotherapy Practices</p>
                </div>
                <div id="body" className='w-[40%] pr-[3rem] text-[#535353] antialiased text-xl leading-[2rem] font-light'>
                    <p>Realign your body and restore balance. Our chiropractic treatments focus on relieving pain, improving posture, and optimizing nervous system function. Rebuild strength, mobility, and confidence. Our tailored physiotherapy programs include hands-on techniques, guided exercises, and advanced therapies.</p>
                </div>
            </div>
        </div>
    )
}
