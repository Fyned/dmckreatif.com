import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import NeoBadge from "@/components/ui/NeoBadge";
import TechStackIcons from "@/components/portfolio/TechStackIcons";

const accentBorderMap: Record<string, string> = {
  "neo-lime": "hover:border-neo-lime",
  "neo-yellow": "hover:border-neo-yellow",
  "neo-blue": "hover:border-neo-blue",
  "neo-pink": "hover:border-neo-pink",
  "neo-purple": "hover:border-neo-purple",
  "neo-green": "hover:border-neo-green",
  "neo-orange": "hover:border-neo-orange",
};

const accentBarMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-pink": "bg-neo-pink",
  "neo-purple": "bg-neo-purple",
  "neo-green": "bg-neo-green",
  "neo-orange": "bg-neo-orange",
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      className={`group cursor-pointer border-2 border-neo-black bg-neo-white shadow-hard-lg transition-all duration-300 ${accentBorderMap[project.accentColor] ?? ""} hover:-translate-y-2 hover:shadow-hard-xl`}
    >
      {/* Accent color bar */}
      <div className={`h-1.5 ${accentBarMap[project.accentColor] ?? "bg-neo-lime"}`} />

      {/* Screenshot preview */}
      {project.imageDesktop && (
        <div className="relative overflow-hidden border-b-2 border-neo-black">
          <img
            src={project.imageDesktop}
            alt={project.name}
            loading="lazy"
            width={1200}
            height={675}
            decoding="async"
            className="w-full h-auto aspect-[16/9] object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6 lg:p-8">
        <span className="font-mono text-xs font-bold text-neo-black/60 tracking-wider block mb-4">
          {`>_ PROJECT_${project.num}`}
        </span>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{project.flag}</span>
          <span className="font-mono text-xs font-bold text-neo-black/80 uppercase tracking-wider">
            {t(project.countryNameKey)}
          </span>
        </div>

        <h3 className="font-space font-bold text-xl lg:text-2xl text-neo-black mb-3">
          {project.name}
        </h3>

        <div className="mb-4">
          <NeoBadge color={project.accentColor}>{t(project.sectorKey)}</NeoBadge>
        </div>

        <p className="font-mono text-sm text-neo-black leading-relaxed mb-5 line-clamp-2">
          {t(project.descriptionKey)}
        </p>

        <div className="mb-5">
          <TechStackIcons technologies={project.tech} variant="compact" />
        </div>

        <div className="border-t-2 border-neo-black pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-neo-black">{project.year}</span>
            <span className="font-mono text-xs text-neo-black/60">•</span>
            <span className="font-mono text-xs font-bold text-neo-black">
              {project.metrics.lighthouse}+ LH
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-neo-black flex items-center gap-1">
            {t("portfolio.viewCaseStudy")} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
