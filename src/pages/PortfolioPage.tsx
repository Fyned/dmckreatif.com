import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectFilters from "@/components/portfolio/ProjectFilters";
import CaseStudyModal from "@/components/portfolio/CaseStudyModal";
import { projects, type Project } from "@/lib/portfolio-data";
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations";

export default function PortfolioPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCountry, setActiveCountry] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === "all" || p.category === activeCategory;
    const countryMatch = activeCountry === "all" || p.country === activeCountry;
    return catMatch && countryMatch;
  });

  const selectedIndex = selectedProject
    ? filtered.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedProject(filtered[selectedIndex - 1]);
    }
  }, [selectedIndex, filtered]);

  const handleNext = useCallback(() => {
    if (selectedIndex < filtered.length - 1) {
      setSelectedProject(filtered[selectedIndex + 1]);
    }
  }, [selectedIndex, filtered]);

  return (
    <>
      <SeoHead
        title={t("seo.portfolio.title", "Our Work — Web Development Portfolio | DMC Kreatif")}
        description={t("seo.portfolio.description", "Explore our portfolio of 10+ websites built for businesses across France, Belgium and the UK.")}
        path="/portfolio"
      />

      <Breadcrumbs items={[{ label: t("nav.portfolio", "PORTFOLIO") }]} />

      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("portfolio.title", "Our Work")}
            subtitle={t("portfolio.tag", "PORTFOLIO")}
          />

          <ProjectFilters
            activeCategory={activeCategory}
            activeCountry={activeCountry}
            onCategoryChange={setActiveCategory}
            onCountryChange={setActiveCountry}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 border-2 border-neo-black bg-neo-white shadow-hard">
              <p className="font-mono text-neo-black/60">
                {t("portfolio.noResults", "No projects match your filters.")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <motion.div variants={fadeInUp} className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
              <h3 className="font-space font-bold text-sm uppercase mb-2">{t("portfolio.linkServices", "Our Services")}</h3>
              <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-4">{t("portfolio.linkServicesDesc", "Explore the full range of services we offer, from web development to SEO.")}</p>
              <Link to={`/${currentLocale}/services`} className="inline-flex items-center gap-2 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:text-neo-lime transition-colors">
                {t("nav.services", "SERVICES")} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
              <h3 className="font-space font-bold text-sm uppercase mb-2">{t("portfolio.linkPricing", "View Pricing")}</h3>
              <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-4">{t("portfolio.linkPricingDesc", "Transparent pricing packages starting from €497. Find the right plan for your business.")}</p>
              <Link to={`/${currentLocale}/pricing`} className="inline-flex items-center gap-2 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:text-neo-lime transition-colors">
                {t("nav.pricing", "PRICING")} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
              <h3 className="font-space font-bold text-sm uppercase mb-2">{t("portfolio.linkBlog", "Read Our Blog")}</h3>
              <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-4">{t("portfolio.linkBlogDesc", "Web development tips, SEO strategies, and industry insights for European businesses.")}</p>
              <Link to={`/${currentLocale}/blog`} className="inline-flex items-center gap-2 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:text-neo-lime transition-colors">
                {t("nav.blog", "BLOG")} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-center"
          >
            <h2 className="font-space font-bold text-h2 mb-4">{t("cta.title", "READY TO BUILD SOMETHING?")}</h2>
            <p className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto">{t("cta.subtitle", "Let's create a website that works as hard as you do.")}</p>
            <NeoButton href="/contact" size="lg" color="neo-lime">
              {t("cta.button", "START YOUR PROJECT")} <ArrowRight size={18} />
            </NeoButton>
          </motion.div>
        </div>
      </section>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex < filtered.length - 1}
      />
    </>
  );
}
