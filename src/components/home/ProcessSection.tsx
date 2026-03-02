import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { PhoneCall, PenSquare, Code2, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { BOOKING_URL } from "@/lib/constants";

interface StepProps {
  number: string;
  title: string;
  description: string;
  color: string;
  Icon: LucideIcon;
}

function ProcessStep({ number, title, description, color, Icon }: StepProps) {
  const colorMap: Record<string, string> = {
    lime: "bg-neo-lime",
    blue: "bg-neo-blue text-neo-white",
    pink: "bg-neo-pink",
    yellow: "bg-neo-yellow",
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="relative"
    >
      <div className="bg-neo-white border-2 border-neo-black shadow-hard p-6 h-full">
        <div className={`inline-flex items-center justify-center w-10 h-10 border-2 border-neo-black ${colorMap[color] ?? colorMap.lime} font-space font-bold text-sm mb-4`}>
          {number}
        </div>

        <div className="mb-3">
          <Icon size={24} className="text-neo-black/70" strokeWidth={1.5} />
        </div>

        <h3 className="font-space font-bold text-base uppercase tracking-tight text-neo-black mb-2">
          {title}
        </h3>
        <p className="font-mono text-xs leading-relaxed text-neo-black/60">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const { t } = useTranslation();

  const steps: StepProps[] = [
    {
      number: "01",
      title: t("process.step1Title", "Discovery Call"),
      description: t("process.step1Desc", "Free 30-minute consultation. We discuss your goals, target audience, competitors, and technical requirements."),
      color: "lime",
      Icon: PhoneCall,
    },
    {
      number: "02",
      title: t("process.step2Title", "Proposal & Design"),
      description: t("process.step2Desc", "We deliver a tailored proposal with wireframes, design mockups, and a clear timeline. You approve before we start."),
      color: "blue",
      Icon: PenSquare,
    },
    {
      number: "03",
      title: t("process.step3Title", "Development"),
      description: t("process.step3Desc", "We build your site with modern tech (React, Vite, Tailwind). You get weekly updates and a staging preview."),
      color: "pink",
      Icon: Code2,
    },
    {
      number: "04",
      title: t("process.step4Title", "Launch & Support"),
      description: t("process.step4Desc", "After your approval, we deploy the site live. Ongoing support available through our Care Plan (€97/mo)."),
      color: "yellow",
      Icon: Rocket,
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          subtitle={t("process.badge", "HOW WE WORK")}
          title={t("process.title", "From Idea to Launch in 4 Steps")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, i) => (
            <ProcessStep key={i} {...step} />
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-10 bg-neo-black border-2 border-neo-black p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-mono text-xs text-neo-bg/70 uppercase tracking-wider text-center sm:text-left">
            {t("process.ctaText", "Ready to start your project? Let's talk.")}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neo-lime border-2 border-neo-lime px-6 py-2.5 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:bg-neo-lime/80 transition-colors whitespace-nowrap"
          >
            {t("process.ctaButton", "Book Free Call")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
