import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { Poltawski_Nowy, Beiruti } from "next/font/google";

// Import fonts
const beir = Beiruti({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });
const plot = Poltawski_Nowy({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-charm" });

export default function Footer() {
    return (
        <footer className="bg-[#0A0A0A] w-full text-white relative">
            <div className="border-b-[1px] border-[#FFFFFF40] p-6 md:p-10">
                {/* Footer Header and Body */}
                <div className={`${plot.className} absolute inset-0 flex justify-center items-center text-[#FFFFFF10] text-[130px] font-bold`}>
                    <h1>Sehat Online</h1>
                </div>
                <div className="flex flex-wrap justify-between items-center relative z-10">
                    <h1 className={`${plot.className} text-3xl md:text-4xl font-bold`}>
                        Start your journey <br /> to a healthier, <br /> more active life.
                    </h1>
                    <div>
                        <p className={`${beir.className} text-base md:text-lg tracking-wide`}>
                            Whether you're recovering from an injury, managing <br /> chronic pain, or seeking to enhance your mobility, our <br /> team is here to guide you every step of the way.
                        </p>
                        <button className={`${beir.className} text-sm md:text-base mt-6 tracking-wider bg-[#023E8A] p-2 rounded-full hover:bg-[#F0F5FA] hover:text-[#023E8A] duration-700`}>
                            Get Started
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-between items-start mt-10 relative z-10">
                    {/* Section 1: Brand Info */}
                    <div className="flex flex-col w-full md:w-2/5 items-center md:items-start">
                        <h1 className={`${plot.className} text-2xl md:text-3xl my-4 text-center md:text-left`}>Sehat Online</h1>
                        <p className={`${beir.className} text-sm md:text-base tracking-wide mb-4 text-center md:text-left`}>
                            Live Your Best Life with Chiropractic and <br /> Physiotherapy Care Tailored to Your Needs
                        </p>
                        <div className="flex text-2xl gap-3 justify-center md:justify-start">
                            {[FaInstagram, FaFacebook, FaXTwitter, FaYoutube].map((Icon, idx) => (
                                <Icon key={idx} className="p-1 bg-[#FFFFFF10] rounded-full cursor-pointer hover:text-[#023E8A] duration-700" />
                            ))}
                        </div>
                    </div>

                    {/* Quick Links & Company Sections */}
                    <FooterSection title="Quick Links" links={["Testimonials", "Pricing", "Our Team"]} />
                    <FooterSection title="Company" links={["About Us", "Our Services", "Contact Us"]} />
                </div>
            </div>
        </footer>
    );
}

// Reusable Footer Section Component
interface FooterSectionProps {
    title: string;
    links: string[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => (
    <div className="flex flex-col min-w-[10rem] w-auto md:w-1/5 items-start mt-4 md:mt-0">
        <h1 className={`${plot.className} text-lg md:text-xl`}>{title}</h1>
        <ul className={`${beir.className} text-sm text-[#FFFFFF50] list-none mt-2`}>
            {links.map((link: string, index: number) => (
                <li key={index} className="hover:text-[#F0F5FA] duration-700 my-1">
                    <a href="#">{link}</a>
                </li>
            ))}
        </ul>
    </div>
);
