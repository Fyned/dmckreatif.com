import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqSchema } from "@/lib/seo-schemas";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FaqItem({ question, answer, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="border-2 border-neo-black bg-neo-white"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left group hover:bg-neo-lime/10 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-space font-bold text-sm md:text-base uppercase tracking-tight text-neo-black pr-4">
          {question}
        </span>
        <span
          className={`
            flex-shrink-0 w-8 h-8 border-2 border-neo-black flex items-center justify-center
            font-space font-bold text-lg transition-all duration-200
            ${isOpen ? "bg-neo-lime rotate-45" : "bg-neo-white rotate-0"}
          `}
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t-2 border-neo-black pt-4">
              <p className="font-mono text-xs md:text-sm leading-relaxed text-neo-black/70 whitespace-pre-line">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t("faq.q1", "How long does it take to build a website?"),
      answer: t("faq.a1", "Our Launch package (single page) takes 3-5 business days. Growth package (5-7 pages) takes 7-10 days. Scale and Commerce packages take 14-28 days depending on complexity. We always deliver on time or your money back."),
    },
    {
      question: t("faq.q2", "What technologies do you use?"),
      answer: t("faq.a2", "We use modern, fast technologies: React 18, Next.js 14, Vite, TypeScript, and Tailwind CSS. For e-commerce, we integrate Stripe, LemonSqueezy, or Shopify. Every site scores 95+ on Google Lighthouse performance tests."),
    },
    {
      question: t("faq.q3", "Do you support multilingual websites?"),
      answer: t("faq.a3", "Yes! We build multilingual websites as standard. We support English, French, Dutch, German, and any other European language. Each language gets proper SEO with hreflang tags, localized URLs, and native-quality translations."),
    },
    {
      question: t("faq.q4", "What is included in the Care Plan?"),
      answer: t("faq.a4", "The Care Plan (€97/month) includes: premium hosting, SSL certificate, monthly security updates, performance monitoring, 2 hours of content changes, monthly analytics report, priority email support, and 99.9% uptime guarantee."),
    },
    {
      question: t("faq.q5", "Which countries do you serve?"),
      answer: t("faq.a5", "We serve businesses across Europe: France, Belgium, United Kingdom, Netherlands, Germany, Switzerland, and Scandinavian countries. We communicate in English, French, Dutch, and German."),
    },
    {
      question: t("faq.q6", "Do you offer SEO services?"),
      answer: t("faq.a6", "Every website we build includes SEO basics: proper meta tags, structured data (Schema.org), fast loading times, mobile optimization, and XML sitemap. For advanced SEO, we offer monthly SEO management starting at €247/month."),
    },
    {
      question: t("faq.q7", "What happens after the website is delivered?"),
      answer: t("faq.a7", "After delivery, you own the website 100%. You can manage it yourself or subscribe to our Care Plan for ongoing maintenance, hosting, and support. We also offer training sessions to help you update content independently."),
    },
    {
      question: t("faq.q8", "Can I see examples of your work?"),
      answer: t("faq.a8", "Absolutely! Visit our Portfolio page to see live projects across France, Belgium, and the UK. We've built websites for construction companies, energy consultants, accountants, and e-commerce stores."),
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-neo-bg-alt">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          subtitle={t("faq.badge", "FAQ")}
          title={t("faq.title", "Frequently Asked Questions")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </motion.div>

        {/* FAQ Schema.org JSON-LD */}
        <JsonLd data={buildFaqSchema(faqs)} />
      </div>
    </section>
  );
}
