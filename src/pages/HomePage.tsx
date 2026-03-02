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
import JsonLd from "@/components/seo/JsonLd";
import { buildFAQPageSchema } from "@/lib/seo-schemas";
import { useAnalytics } from "@/lib/useAnalytics";

export default function HomePage() {
  const { t } = useTranslation();
  useAnalytics("Home");

  const homeFaqs = [
    { question: t("faq.q1", "How long does it take to build a website?"), answer: t("faq.a1", "Our Launch package (single page) takes 3-5 business days. Growth package (5-7 pages) takes 7-10 days. Scale and Commerce packages take 14-28 days depending on complexity. We always deliver on time or your money back.") },
    { question: t("faq.q2", "What technologies do you use?"), answer: t("faq.a2", "We use modern, fast technologies: React 18, Next.js 14, Vite, TypeScript, and Tailwind CSS. For e-commerce, we integrate Stripe, LemonSqueezy, or Shopify. Every site scores 95+ on Google Lighthouse performance tests.") },
    { question: t("faq.q3", "Do you support multilingual websites?"), answer: t("faq.a3", "Yes! We build multilingual websites as standard. We support English, French, Dutch, German, and any other European language. Each language gets proper SEO with hreflang tags, localized URLs, and native-quality translations.") },
    { question: t("faq.q4", "What is included in the Care Plan?"), answer: t("faq.a4", "The Care Plan (€97/month) includes: premium hosting, SSL certificate, monthly security updates, performance monitoring, 2 hours of content changes, monthly analytics report, priority email support, and 99.9% uptime guarantee.") },
    { question: t("faq.q5", "Which countries do you serve?"), answer: t("faq.a5", "We serve businesses across Europe: France, Belgium, United Kingdom, Netherlands, Germany, Switzerland, and Scandinavian countries. We communicate in English, French, Dutch, and German.") },
    { question: t("faq.q6", "Do you offer SEO services?"), answer: t("faq.a6", "Every website we build includes SEO basics: proper meta tags, structured data (Schema.org), fast loading times, mobile optimization, and XML sitemap. For advanced SEO, we offer monthly SEO management starting at €247/month.") },
    { question: t("faq.q7", "What happens after the website is delivered?"), answer: t("faq.a7", "After delivery, you own the website 100%. You can manage it yourself or subscribe to our Care Plan for ongoing maintenance, hosting, and support. We also offer training sessions to help you update content independently.") },
    { question: t("faq.q8", "Can I see examples of your work?"), answer: t("faq.a8", "Absolutely! Visit our Portfolio page to see live projects across France, Belgium, and the UK. We've built websites for construction companies, energy consultants, accountants, and e-commerce stores.") },
  ];

  return (
    <>
      <SeoHead
        title={t("seo.home.title", "DMC Kreatif — Premium Web Development Agency")}
        description={t("seo.home.description", "Premium web development for European businesses. React, Next.js, Vite. France, Belgium, UK, Netherlands, Germany.")}
      />
      <JsonLd data={buildFAQPageSchema(homeFaqs)} />
      <HeroSection />
      <MarqueeStrip />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ClientLogoBar />
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
      </Suspense>
    </>
  );
}
