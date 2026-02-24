import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/portfolio-data";
import type { Project } from "@/lib/portfolio-data";
import ProjectCard from "@/components/portfolio/ProjectCard";
import CaseStudyModal from "@/components/portfolio/CaseStudyModal";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, viewportConfig } from "@/lib/animations";

export default function PortfolioShowcase() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectedIndex = selectedProject
    ? featuredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  return (
    <section className="py-section-sm lg:py-section section-alt">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <SectionHeader
          title={t("portfolio.sectionTitle")}
          subtitle={t("portfolio.sectionSubtitle")}
        />

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </AnimatePresence>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12"
        >
          <NeoButton href="/portfolio" variant="outline" size="md">
            {t("portfolio.viewAll")} <ArrowRight size={14} />
          </NeoButton>
        </motion.div>
      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => {
          if (selectedIndex > 0) setSelectedProject(featuredProjects[selectedIndex - 1]);
        }}
        onNext={() => {
          if (selectedIndex < featuredProjects.length - 1)
            setSelectedProject(featuredProjects[selectedIndex + 1]);
        }}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex < featuredProjects.length - 1}
      />
    </section>
  );
}
