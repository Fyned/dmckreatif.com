"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import DualLogo from "@/components/layout/DualLogo";
import NeoBadge from "@/components/ui/NeoBadge";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const countries = [
  { flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
  { flag: "\u{1F1E7}\u{1F1EA}", name: "Belgium" },
  { flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
  { flag: "\u{1F1F3}\u{1F1F1}", name: "Netherlands" },
  { flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { flag: "\u{1F1E8}\u{1F1ED}", name: "Switzerland" },
];

const values = [
  { key: "value1", color: "neo-lime" },
  { key: "value2", color: "neo-yellow" },
  { key: "value3", color: "neo-blue" },
] as const;

const valueBgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
};

export default function AboutPage() {
  const t = useTranslations("about");

  const techList = t("techList").split(" // ");

  return (
    <div className="py-section-sm lg:py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
            {t("sectionSubtitle")}
          </span>
          <h1 className="font-space font-bold text-h1 text-neo-black">
            {t("sectionTitle")}
          </h1>
          <div className="w-16 h-1 bg-neo-black mt-4" />
        </motion.div>

        {/* About Hero */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          <motion.div variants={fadeInUp}>
            <DualLogo size="lg" />
            <h2 className="font-space font-bold text-h2 mt-8 mb-4">
              {t("headline")}
            </h2>
            <p className="font-mono text-sm text-neo-black/80 leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="border-2 border-neo-black bg-neo-white p-8 shadow-hard-lg"
          >
            <div className="w-20 h-20 bg-neo-lime border-2 border-neo-black shadow-hard mb-6 flex items-center justify-center">
              <span className="font-space font-bold text-2xl">MKD</span>
            </div>
            <h3 className="font-space font-bold text-lg mb-1">
              {t("founderName")}
            </h3>
            <p className="font-mono text-xs text-neo-black/80 uppercase tracking-wider mb-4">
              {t("founderRole")}
            </p>
            <p className="font-mono text-sm text-neo-black/80 leading-relaxed">
              {t("founderBio")}
            </p>
          </motion.div>
        </motion.div>

        {/* Mission */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="border-2 border-neo-black bg-neo-lime p-8 lg:p-12 shadow-hard-lg mb-20"
        >
          <h3 className="font-space font-bold text-h3 mb-4">
            {t("mission")}
          </h3>
          <p className="font-mono text-sm text-neo-black/80 leading-relaxed max-w-2xl">
            {t("missionText")}
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {values.map(({ key, color }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="border-2 border-neo-black bg-neo-white p-6 shadow-hard"
            >
              <div className={`w-8 h-2 ${valueBgMap[color] ?? "bg-neo-lime"} mb-4`} />
              <h4 className="font-space font-bold text-base mb-2">
                {t(`${key}Title`)}
              </h4>
              <p className="font-mono text-sm text-neo-black/80 leading-relaxed">
                {t(`${key}Description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Countries */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-20"
        >
          <h3 className="font-space font-bold text-h3 mb-6">
            {t("countries")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {countries.map(({ flag, name }) => (
              <NeoBadge key={name} color="neo-lime">
                {flag} {name}
              </NeoBadge>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h3 className="font-space font-bold text-h3 mb-6">
            {t("techTitle")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {techList.map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm px-4 py-2 border-2 border-neo-black bg-neo-white shadow-hard-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
