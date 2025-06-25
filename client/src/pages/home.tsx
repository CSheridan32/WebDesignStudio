import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import IndustriesSection from "@/components/industries-section";
import ValuesSection from "@/components/values-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-sans text-warm-600 bg-warm-50">
      <Navigation />
      <HeroSection />
      <IndustriesSection />
      <ValuesSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
