import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials-data";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import JsonLd from "@/components/seo/JsonLd";
import { buildProfessionalServiceSchema } from "@/lib/seo-schemas";

const borderColorMap: Record<string, string> = {
  "neo-lime": "border-neo-lime",
  "neo-yellow": "border-neo-yellow",
  "neo-pink": "border-neo-pink",
  "neo-blue": "border-neo-blue",
  "neo-orange": "border-neo-orange",
  "neo-purple": "border-neo-purple",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-neo-yellow text-neo-yellow"
              : "fill-none text-neo-black/20"
          }
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

export default function TestimonialsMarquee() {
  const { t } = useTranslation();

  const reviewDates = [
    "2023-09-20",
    "2024-01-15",
    "2024-04-08",
    "2024-06-22",
    "2024-10-05",
    "2025-02-12",
  ];

  const reviewSchemaData = testimonials.map((item, i) => ({
    author: t(`testimonials.${item.nameKey}`),
    rating: item.rating,
    body: t(`testimonials.${item.quoteKey}`),
    company: item.company,
    datePublished: reviewDates[i] ?? "2024-01-15",
  }));

  return (
    <section className="py-section-sm lg:py-section section-alt">
      {/* ProfessionalService with embedded AggregateRating + Reviews */}
      <JsonLd data={buildProfessionalServiceSchema(reviewSchemaData)} />

      <div className="max-w-container mx-auto px-6 lg:px-10">
        <SectionHeader
          title={t("testimonials.sectionTitle")}
          subtitle={t("testimonials.sectionSubtitle")}
        />

        {/* Aggregate rating summary */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-neo-yellow text-neo-yellow"
                strokeWidth={2}
              />
            ))}
          </div>
          <span className="font-space font-bold text-neo-black text-sm">
            4.9/5
          </span>
          <span className="font-mono text-xs text-neo-black/60 uppercase">
            ({testimonials.length} {t("testimonials.reviewsLabel")})
          </span>
        </div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="overflow-hidden pause-on-hover"
      >
        <div className="marquee-track flex animate-marquee gap-6 px-6">
          {[...testimonials, ...testimonials].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className={`flex-shrink-0 w-[400px] border-2 border-neo-black bg-neo-white p-6 shadow-hard ${
                borderColorMap[item.accentColor] ?? "border-neo-black"
              } border-l-[6px]`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 bg-neo-red border border-neo-black" />
                  <span className="w-2.5 h-2.5 bg-neo-yellow border border-neo-black" />
                  <span className="w-2.5 h-2.5 bg-neo-green border border-neo-black" />
                </div>
                <span className="font-mono text-xs text-neo-black/70 uppercase tracking-wider">
                  {item.id.toUpperCase()}.LOG
                </span>
              </div>

              <StarRating rating={item.rating} />

              <p className="font-mono text-sm text-neo-black leading-relaxed mb-4">
                &ldquo;{t(`testimonials.${item.quoteKey}`)}&rdquo;
              </p>

              <div className="border-t-2 border-neo-black/30 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-space font-bold text-sm">
                    {t(`testimonials.${item.nameKey}`)}
                  </p>
                  <p className="font-mono text-xs text-neo-black/70 uppercase">
                    {t(`testimonials.${item.roleKey}`)} @ {item.company}
                  </p>
                </div>
                <span className="text-lg">{item.flag}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
