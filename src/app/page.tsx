import Testimonials from "@/components/ui/landing-page/thoughts-of-patience";
import HomePage from "./pages/HomePage";
import Choose from "./pages/choose";
import ServicesSection from "@/components/ui/landing-page/medical-services";
import MedicalServices from "@/components/ui/landing-page/three-step-service";
import HeroDoctor from "@/components/ui/landing-page/hero-doctor";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HomePage />
      <MedicalServices/>
      <HeroDoctor/>   
      {/* <Choose /> */}
      <ServicesSection />
      <Testimonials />
    </div>
  );
}