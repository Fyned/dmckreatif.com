"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import NeoBadge from "@/components/ui/NeoBadge";
import ProjectModal from "@/components/portfolio/ProjectModal";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const accentBarMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-pink": "bg-neo-pink",
  "neo-blue": "bg-neo-blue",
  "neo-green": "bg-neo-green",
  "neo-purple": "bg-neo-purple",
  "neo-orange": "bg-neo-orange",
};

type FilterKey = "ALL" | "FR" | "BE" | "UK" | "INT";

const filters: { key: FilterKey; labelKey: string }[] = [
  { key: "ALL", labelKey: "filterAll" },
  { key: "FR", labelKey: "filterFR" },
  { key: "BE", labelKey: "filterBE" },
  { key: "UK", labelKey: "filterUK" },
  { key: "INT", labelKey: "filterINT" },
];

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<FilterKey>("ALL");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered =
    filter === "ALL"
      ? projects
      : projects.filter((p) => p.country === filter);

  return (
    <div className="py-section-sm lg:py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
            {t("sectionSubtitle")}
          </span>
          <h1 className="font-space font-bold text-h1 text-neo-black">
            {t("sectionTitle")}
          </h1>
          <div className="w-16 h-1 bg-neo-black mt-4" />
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 mb-12"
        >
          {filters.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border-2 border-neo-black transition-all duration-150 ${
                filter === key
                  ? "bg-neo-lime shadow-hard-sm"
                  : "bg-neo-white hover:bg-neo-yellow"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              onClick={() => setSelected(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer border-2 border-neo-black bg-neo-white shadow-hard-lg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard transition-all duration-200"
            >
              <div className={`h-2 ${accentBarMap[project.accentColor] ?? "bg-neo-lime"}`} />
              <div className="relative aspect-[4/3] bg-neo-bg overflow-hidden border-b-2 border-neo-black">
                {project.url && hoveredId === project.id ? (
                  <iframe
                    src={project.url}
                    title={project.name}
                    className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl mb-3 block">{project.flag}</span>
                      <span className="font-space font-bold text-lg text-neo-black">
                        {project.name}
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-neo-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <Eye size={32} className="text-neo-lime mx-auto mb-2" />
                    <span className="font-mono text-xs text-neo-lime uppercase tracking-wider">
                      {t("viewProject")}
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <NeoBadge color={project.accentColor}>
                    {project.flag} {project.countryName}
                  </NeoBadge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-space font-bold text-base mb-1">
                  {project.name}
                </h3>
                <p className="font-mono text-xs font-bold text-neo-black/80 uppercase tracking-wider mb-3">
                  {project.sector}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-0.5 border border-neo-black text-neo-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
