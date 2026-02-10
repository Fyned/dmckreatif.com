"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { featuredProjects, type Project } from "@/lib/portfolio-data";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectModal from "@/components/portfolio/ProjectModal";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const accentBarMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-pink": "bg-neo-pink",
  "neo-blue": "bg-neo-blue",
  "neo-green": "bg-neo-green",
  "neo-purple": "bg-neo-purple",
  "neo-orange": "bg-neo-orange",
};

export default function PortfolioShowcase() {
  const t = useTranslations("portfolio");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-section-sm lg:py-section section-alt">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <SectionHeader
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer border-2 border-neo-black bg-neo-white shadow-hard-lg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard transition-all duration-200"
            >
              {/* Accent bar */}
              <div
                className={`h-2 ${accentBarMap[project.accentColor] ?? "bg-neo-lime"}`}
              />

              {/* Preview area */}
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

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-neo-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <Eye size={32} className="text-neo-lime mx-auto mb-2" />
                    <span className="font-mono text-xs text-neo-lime uppercase tracking-wider">
                      {t("viewProject")}
                    </span>
                  </div>
                </div>

                {/* Country badge */}
                <div className="absolute top-3 left-3">
                  <NeoBadge color={project.accentColor}>
                    {project.flag} {project.countryName}
                  </NeoBadge>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-space font-bold text-base mb-1">
                  {project.name}
                </h3>
                <p className="font-mono text-xs font-bold text-neo-black/80 uppercase tracking-wider mb-3">
                  {project.sector}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2 py-0.5 border border-neo-black text-neo-black"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12"
        >
          <NeoButton href="/portfolio" variant="outline" size="md">
            {t("viewAll")} <ArrowRight size={14} />
          </NeoButton>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
