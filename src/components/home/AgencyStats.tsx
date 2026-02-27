import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const stats = [
  { key: "projects", value: 33, suffix: "+", prefix: "", color: "bg-neo-lime" },
  { key: "countries", value: 4, suffix: "", prefix: "", color: "bg-neo-yellow" },
  { key: "lighthouse", value: 98, suffix: "+", prefix: "", color: "bg-neo-blue" },
  { key: "satisfaction", value: 100, suffix: "%", prefix: "", color: "bg-neo-pink" },
  { key: "loadTime", value: 1.2, suffix: "s", prefix: "<", color: "bg-neo-green" },
  { key: "uptime", value: 99.9, suffix: "%", prefix: "", color: "bg-neo-purple" },
] as const;

export default function AgencyStats() {
  const { t } = useTranslation();

  return (
    <section className="py-section-sm lg:py-section bg-neo-black text-neo-bg relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#FFFDF5 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-container mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-16"
        >
          <span className="inline-block font-mono text-xs tracking-[0.2em] text-neo-lime mb-3 border-2 border-neo-lime/30 px-3 py-1">
            {t("stats.sectionSubtitle")}
          </span>
          <h2 className="font-space font-bold text-h2 text-neo-bg">
            {t("stats.sectionTitle")}
          </h2>
          <div className="w-16 h-1 bg-neo-lime mt-4" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6"
        >
          {stats.map(({ key, value, suffix, prefix, color }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="border-2 border-neo-bg/40 p-8 text-center group hover:border-neo-lime transition-colors"
            >
              <div className={`inline-block ${color} text-neo-black px-3 py-1 border-2 border-neo-black mb-4`}>
                <span className="font-space font-bold text-3xl lg:text-4xl">
                  <AnimatedCounter target={value} suffix={suffix} prefix={prefix} />
                </span>
              </div>
              <p className="font-mono text-xs font-bold text-neo-bg/80 uppercase tracking-[0.15em]">
                {t(`stats.${key}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
