import { useTranslation } from "react-i18next";
import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import AgencyStats from "@/components/home/AgencyStats";
import ProcessSection from "@/components/home/ProcessSection";
import CampaignSection from "@/components/home/CampaignSection";
import ChoosePathSection from "@/components/home/ChoosePathSection";
import PricingPreview from "@/components/home/PricingPreview";
import TestimonialsMarquee from "@/components/home/TestimonialsMarquee";
import CTASection from "@/components/home/CTASection";
import FaqSection from "@/components/home/FaqSection";
import TrustSection from "@/components/home/TrustSection";
import SeoHead from "@/components/seo/SeoHead";
import JsonLd from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo-schemas";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <SeoHead
        title={t("seo.home.title", "DMC Kreatif — Premium Web Development Agency")}
        description={t("seo.home.description", "Premium web development for European businesses. React, Next.js, Vite. France, Belgium, UK, Netherlands, Germany.")}
      />
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildWebSiteSchema()} />
      <HeroSection />
      <MarqueeStrip />
      <ServicesGrid />
      <PortfolioShowcase />
      <AgencyStats />
      <CampaignSection />
      <ChoosePathSection />
      <ProcessSection />
      <PricingPreview />
      <TestimonialsMarquee />
      <TrustSection />
      <FaqSection />
      <CTASection />
    </>
  );
}
