"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import type { Project } from "@/lib/portfolio-data";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectFilters from "@/components/portfolio/ProjectFilters";
import CaseStudyModal from "@/components/portfolio/CaseStudyModal";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import { fadeInUp } from "@/lib/animations";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCountry, setActiveCountry] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = activeCategory === "all" || p.category === activeCategory;
      const matchCountry = activeCountry === "all" || p.country === activeCountry;
      return matchCategory && matchCountry;
    });
  }, [activeCategory, activeCountry]);

  const selectedIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  return (
    <div className="py-section-sm lg:py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        {/* Hero */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
              {t("sectionSubtitle")}
            </span>
            <NeoBadge color="neo-lime">
              {projects.length} {t("projectCount")}
            </NeoBadge>
          </div>
          <h1 className="font-space font-bold text-h1 text-neo-black">
            {t("sectionTitle")}
          </h1>
          <p className="font-mono text-sm text-neo-black/80 mt-3 max-w-xl leading-relaxed">
            {t("heroDescription")}
          </p>
          <div className="w-16 h-1 bg-neo-black mt-4" />
        </motion.div>

        {/* Filters */}
        <ProjectFilters
          activeCategory={activeCategory}
          activeCountry={activeCountry}
          onCategoryChange={setActiveCategory}
          onCountryChange={setActiveCountry}
        />

        {/* Project Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 border-2 border-dashed border-neo-black/30"
            >
              <span className="font-mono text-sm text-neo-black/60">
                {t("noResults")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 border-2 border-neo-black p-8 lg:p-12 bg-neo-bg text-center"
        >
          <h2 className="font-space font-bold text-2xl lg:text-3xl text-neo-black mb-3">
            {t("ctaTitle")}
          </h2>
          <p className="font-mono text-sm text-neo-black/80 mb-6 max-w-lg mx-auto">
            {t("ctaDescription")}
          </p>
          <NeoButton href="/contact" size="lg" color="neo-lime">
            {t("ctaButton")} <ArrowRight size={16} />
          </NeoButton>
        </motion.div>
      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => {
          if (selectedIndex > 0)
            setSelectedProject(filteredProjects[selectedIndex - 1]);
        }}
        onNext={() => {
          if (selectedIndex < filteredProjects.length - 1)
            setSelectedProject(filteredProjects[selectedIndex + 1]);
        }}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex < filteredProjects.length - 1}
      />
    </div>
  );
}
