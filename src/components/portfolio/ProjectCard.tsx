"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import NeoBadge from "@/components/ui/NeoBadge";

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
  const t = useTranslations();

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

      <div className="p-6 lg:p-8">
        {/* Project number */}
        <span className="font-mono text-xs font-bold text-neo-black/60 tracking-wider block mb-4">
          {`>_ PROJECT_${project.num}`}
        </span>

        {/* Flag + Country */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{project.flag}</span>
          <span className="font-mono text-xs font-bold text-neo-black/80 uppercase tracking-wider">
            {t(project.countryNameKey)}
          </span>
        </div>

        {/* Project Name */}
        <h3 className="font-space font-bold text-xl lg:text-2xl text-neo-black mb-3 group-hover:text-neo-black transition-colors">
          {project.name}
        </h3>

        {/* Sector Badge */}
        <div className="mb-4">
          <NeoBadge color={project.accentColor}>{t(project.sectorKey)}</NeoBadge>
        </div>

        {/* Description */}
        <p className="font-mono text-sm text-neo-black leading-relaxed mb-5 line-clamp-2">
          {t(project.descriptionKey)}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2 py-0.5 border border-neo-black text-neo-black"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-neo-black pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-neo-black">{project.year}</span>
            <span className="font-mono text-xs text-neo-black/60">•</span>
            <span className="font-mono text-xs font-bold text-neo-black">
              {project.metrics.lighthouse}+ LH
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-neo-black flex items-center gap-1 group-hover:text-neo-black transition-colors">
            {t("portfolio.viewCaseStudy")} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
