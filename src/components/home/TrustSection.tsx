import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface BadgeProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

function TrustBadge({ icon, label, value, color }: BadgeProps) {
  const colorMap: Record<string, string> = {
    lime: "bg-neo-lime text-neo-black",
    blue: "bg-neo-blue text-neo-white",
    pink: "bg-neo-pink text-neo-black",
    yellow: "bg-neo-yellow text-neo-black",
    white: "bg-neo-white text-neo-black",
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-neo-white border-2 border-neo-black shadow-hard p-4 flex items-center gap-3"
    >
      <div
        className={`flex-shrink-0 w-10 h-10 border-2 border-neo-black flex items-center justify-center font-mono text-lg ${colorMap[color] ?? colorMap.lime}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-space font-bold text-sm uppercase tracking-tight text-neo-black leading-tight">
          {value}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-neo-black/50 leading-tight">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

const FLAG_MAP: Record<string, string> = {
  FR: "\u{1F1EB}\u{1F1F7}",
  BE: "\u{1F1E7}\u{1F1EA}",
  UK: "\u{1F1EC}\u{1F1E7}",
  NL: "\u{1F1F3}\u{1F1F1}",
  DE: "\u{1F1E9}\u{1F1EA}",
  CH: "\u{1F1E8}\u{1F1ED}",
};

const TECH_STACK = [
  "React",
  "Vite",
  "TypeScript",
  "Tailwind CSS",
  "Next.js",
  "Framer Motion",
  "Supabase",
  "Vercel",
];

export default function TrustSection() {
  const { t } = useTranslation();

  const badges: BadgeProps[] = [
    {
      icon: "\u{26A1}",
      label: t("trust.lighthouseLabel", "Lighthouse Score"),
      value: t("trust.lighthouseValue", "95+"),
      color: "lime",
    },
    {
      icon: "\u{1F512}",
      label: t("trust.gdprLabel", "Data Protection"),
      value: t("trust.gdprValue", "GDPR Compliant"),
      color: "blue",
    },
    {
      icon: "\u{23F1}",
      label: t("trust.responseLabel", "Response Time"),
      value: t("trust.responseValue", "< 24 Hours"),
      color: "pink",
    },
    {
      icon: "\u{2705}",
      label: t("trust.deliveryLabel", "Delivery Guarantee"),
      value: t("trust.deliveryValue", "On-Time or Free"),
      color: "yellow",
    },
    {
      icon: "\u{1F310}",
      label: t("trust.languagesLabel", "Languages"),
      value: t("trust.languagesValue", "4 Languages"),
      color: "white",
    },
    {
      icon: "\u{1F4B3}",
      label: t("trust.paymentLabel", "Payment"),
      value: t("trust.paymentValue", "Secure Payment"),
      color: "lime",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-neo-bg-alt">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          subtitle={t("trust.badge", "WHY CHOOSE US")}
          title={t("trust.title", "Trusted by Businesses Across Europe")}
        />

        {/* Trust Badges Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10"
        >
          {badges.map((badge, i) => (
            <TrustBadge key={i} {...badge} />
          ))}
        </motion.div>

        {/* Country Flags Strip */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="bg-neo-white border-2 border-neo-black shadow-hard p-5 mb-6"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-neo-black/50 mb-3 text-center">
            {t("trust.countriesServed", "Serving businesses in 6+ European countries")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(FLAG_MAP).map(([code, flag]) => (
              <div key={code} className="flex items-center gap-1.5">
                <span className="text-2xl" role="img" aria-label={code}>
                  {flag}
                </span>
                <span className="font-space font-bold text-xs uppercase tracking-wider text-neo-black">
                  {code}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Strip */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="bg-neo-black border-2 border-neo-black p-5"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-neo-bg/50 mb-3 text-center">
            {t("trust.builtWith", "Built with modern technology")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="border border-neo-bg/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neo-lime/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
