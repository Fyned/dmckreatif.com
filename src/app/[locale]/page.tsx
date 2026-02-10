import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import AgencyStats from "@/components/home/AgencyStats";
import PricingPreview from "@/components/home/PricingPreview";
import TestimonialsMarquee from "@/components/home/TestimonialsMarquee";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ServicesGrid />
      <PortfolioShowcase />
      <AgencyStats />
      <PricingPreview />
      <TestimonialsMarquee />
      <CTASection />
    </>
  );
}
