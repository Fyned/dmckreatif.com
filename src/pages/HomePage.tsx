import { useTranslation } from "react-i18next";
import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ClientLogoBar from "@/components/home/ClientLogoBar";
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
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildFAQPageSchema,
  buildHowToSchema,
} from "@/lib/seo-schemas";
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

  const processSteps = [
    { name: t("process.step1Title", "Discovery Call"), text: t("process.step1Desc", "Free 30-minute consultation. We discuss your goals, target audience, competitors, and technical requirements.") },
    { name: t("process.step2Title", "Proposal & Design"), text: t("process.step2Desc", "We deliver a tailored proposal with wireframes, design mockups, and a clear timeline. You approve before we start.") },
    { name: t("process.step3Title", "Development"), text: t("process.step3Desc", "We build your site with modern tech (React, Vite, Tailwind). You get weekly updates and a staging preview.") },
    { name: t("process.step4Title", "Launch & Support"), text: t("process.step4Desc", "After your approval, we deploy the site live. Ongoing support available through our Care Plan (€97/mo).") },
  ];

  return (
    <>
      <SeoHead
        title={t("seo.home.title", "DMC Kreatif — Premium Web Development Agency")}
        description={t("seo.home.description", "Premium web development for European businesses. React, Next.js, Vite. France, Belgium, UK, Netherlands, Germany.")}
      />
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildWebSiteSchema()} />
      <JsonLd data={buildFAQPageSchema(homeFaqs)} />
      <JsonLd
        data={buildHowToSchema({
          name: "How to Get a Website Built by DMC Kreatif",
          description: "Our 4-step process from initial consultation to website launch and ongoing support.",
          totalTime: "P14D",
          steps: processSteps,
        })}
      />
      <HeroSection />
      <MarqueeStrip />
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
    </>
  );
}
