import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Package, CheckCircle2 } from "lucide-react";
import { bundles } from "@/lib/pricing-data";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";

const bgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-purple": "bg-neo-purple",
};

const typeColors: Record<string, string> = {
  website: "bg-neo-lime",
  seo: "bg-neo-blue",
  care: "bg-neo-yellow",
  branding: "bg-neo-pink",
  marketing: "bg-neo-purple",
};

export default function PricingPreview() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";

  return (
    <section className="py-section-sm lg:py-section bg-neo-black text-neo-bg relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neo-lime/5 rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#FFFDF5 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-container mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-neo-lime mb-3 border-2 border-neo-lime/30 px-3 py-1">
              <Package size={12} />
              {t("pricing.bundlesSubtitle", "SYS.PACKAGES")}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-space font-extrabold text-h2 lg:text-[3.5rem] text-neo-bg tracking-tight"
          >
            {t("pricing.bundlesTitle", "COMPLETE PACKAGES")}
          </motion.h2>
          <div className="w-16 h-1 bg-neo-lime mt-4 mx-auto" />
          <motion.p
            variants={fadeInUp}
            className="font-mono text-sm text-neo-bg/60 max-w-2xl mx-auto mt-5"
          >
            {t("pricing.bundlesDesc", "Everything your business needs — website, branding, SEO, advertising, and ongoing care. One package, one price.")}
          </motion.p>
        </motion.div>

        {/* Package Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {bundles.map((bundle) => {
            const featuresString = t(`pricing.${bundle.featuresKey}`, "");
            const features = featuresString.split("//").map((f: string) => f.trim()).filter(Boolean);
            const bg = bgMap[bundle.color] ?? "bg-neo-lime";

            return (
              <motion.div
                key={bundle.id}
                variants={scaleIn}
                className={`relative bg-neo-bg/5 border-2 ${
                  bundle.popular ? "border-neo-lime shadow-[0_0_30px_rgba(205,255,80,0.15)]" : "border-neo-bg/20"
                } flex flex-col transition-all duration-300 hover:border-neo-lime/50`}
              >
                {bundle.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className={`${bg} border-2 border-neo-black px-4 py-1 shadow-hard-sm`}>
                      <span className="font-space font-bold text-xs text-neo-black uppercase tracking-wider">
                        {t(`pricing.${bundle.tagKey}`, "MOST POPULAR")}
                      </span>
                    </div>
                  </div>
                )}

                <div className={`h-1.5 ${bg}`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Name */}
                  <h3 className="font-space font-bold text-sm text-neo-bg tracking-wider mb-3">
                    {t(`pricing.${bundle.nameKey}`, bundle.id)}
                  </h3>

                  {/* Included services breakdown */}
                  <div className="space-y-1.5 mb-4">
                    {bundle.includes.map((item) => (
                      <div key={item.label} className="flex items-center gap-2 font-mono text-[11px]">
                        <span className={`w-2 h-2 flex-shrink-0 ${typeColors[item.type] ?? "bg-neo-lime"} border border-neo-bg/20`} />
                        <span className="text-neo-bg/60 flex-1">{item.label}</span>
                        <span className="text-neo-bg/30 text-[10px]">€{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="border-t border-neo-bg/10 pt-3 mb-4">
                    <div className="flex justify-between font-mono text-[10px] text-neo-bg/30 mb-1">
                      <span>Regular</span>
                      <span className="line-through">€{bundle.regularPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-space font-extrabold text-2xl text-neo-lime">
                        €{bundle.bundlePrice.toLocaleString()}
                      </span>
                      <span className={`${bg} border border-neo-black font-space font-bold text-[10px] text-neo-black px-2 py-1`}>
                        SAVE {bundle.savingsPercent}%
                      </span>
                    </div>
                    {bundle.monthlyEquiv && (
                      <p className="font-mono text-[10px] text-neo-bg/40 mt-1">
                        ≈ €{bundle.monthlyEquiv}/mo over {bundle.seoMonths} months
                      </p>
                    )}
                  </div>

                  {/* Top features */}
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {features.slice(0, 4).map((f: string) => (
                      <li key={f} className="flex items-start gap-2 font-mono text-[11px] text-neo-bg/60">
                        <CheckCircle2 size={12} className="text-neo-lime flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                    {features.length > 4 && (
                      <li className="font-mono text-[10px] text-neo-bg/30">+{features.length - 4} more included</li>
                    )}
                  </ul>

                  <NeoButton
                    href={`/${currentLocale}/contact`}
                    size="sm"
                    color={bundle.color}
                    className="w-full mt-auto"
                  >
                    {t("pricing.getBundle", "GET THIS PACKAGE")} <ArrowRight size={13} />
                  </NeoButton>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer note + CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-mono text-xs text-neo-bg/30">
            {t("pricing.bundlePaymentNote", "50% upfront, 50% on delivery. Installment plans available.")}
            {" · "}
            <span className="text-neo-bg/50">
              {t("pricing.freeConsultNote", "Need help choosing? Book a free call.")}
            </span>
          </p>
          <NeoButton href={`/${currentLocale}/pricing`} variant="outline" size="sm">
            See all options <ArrowRight size={14} />
          </NeoButton>
        </motion.div>
      </div>
    </section>
  );
}
