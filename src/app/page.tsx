import Testimonials from "@/components/ui/landing-page/thoughts-of-patience";
import HomePage from "./pages/HomePage";
import Choose from "./pages/choose";
import ServicesSection from "@/components/ui/landing-page/medical-services";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HomePage />
      <Choose />
      <ServicesSection />
      <Testimonials />
    </div>
  );
}