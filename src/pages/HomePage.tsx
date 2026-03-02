import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import SeoHead from "@/components/seo/SeoHead";

const ClientLogoBar = lazy(() => import("@/components/home/ClientLogoBar"));
const ServicesGrid = lazy(() => import("@/components/home/ServicesGrid"));
const PortfolioShowcase = lazy(() => import("@/components/home/PortfolioShowcase"));
const AgencyStats = lazy(() => import("@/components/home/AgencyStats"));
const CampaignSection = lazy(() => import("@/components/home/CampaignSection"));
const ChoosePathSection = lazy(() => import("@/components/home/ChoosePathSection"));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection"));
const PricingPreview = lazy(() => import("@/components/home/PricingPreview"));
const TestimonialsMarquee = lazy(() => import("@/components/home/TestimonialsMarquee"));
const TrustSection = lazy(() => import("@/components/home/TrustSection"));
const FaqSection = lazy(() => import("@/components/home/FaqSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));
import { useAnalytics } from "@/lib/useAnalytics";

export default function HomePage() {
  const { t } = useTranslation();
  useAnalytics("Home");

  return (
    <>
      <SeoHead
        title={t("seo.home.title", "DMC Kreatif — Premium Web Development Agency")}
        description={t("seo.home.description", "Premium web development for European businesses. React, Next.js, Vite. France, Belgium, UK, Netherlands, Germany.")}
      />
      <HeroSection />
      <MarqueeStrip />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ClientLogoBar />
        <ServicesGrid />
        <PricingPreview />
        <PortfolioShowcase />
        <AgencyStats />
        <CampaignSection />
        <ChoosePathSection />
        <ProcessSection />
        <TestimonialsMarquee />
        <TrustSection />
        <FaqSection />
        <CTASection />
      </Suspense>
    </>
  );
}
