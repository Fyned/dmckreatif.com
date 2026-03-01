import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Users, GitBranch, Award, Handshake, Briefcase } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const aboutPages = [
  { path: "about/team", labelKey: "about.team.navTitle", fallback: "Our Team", icon: Users },
  { path: "about/process", labelKey: "about.process.navTitle", fallback: "Our Process", icon: GitBranch },
  { path: "about/why-us", labelKey: "about.whyUs.navTitle", fallback: "Why Choose Us", icon: Award },
  { path: "about/partners", labelKey: "about.partners.navTitle", fallback: "Partners", icon: Handshake },
  { path: "about/careers", labelKey: "about.careers.navTitle", fallback: "Careers", icon: Briefcase },
];

export default function AboutCrossLinks({ currentPath }: { currentPath: string }) {
  const { locale } = useParams();
  const { t } = useTranslation();
  const currentLocale = locale ?? "en";

  const links = aboutPages.filter((p) => !currentPath.endsWith(p.path.split("/")[1]));

  return (
    <section className="py-12">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap gap-3 justify-center"
        >
          {links.map((page) => {
            const Icon = page.icon;
            return (
              <motion.div key={page.path} variants={fadeInUp}>
                <Link
                  to={`/${currentLocale}/${page.path}`}
                  className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard-sm px-4 py-2.5 font-space font-bold text-xs uppercase tracking-wider hover:bg-neo-lime transition-colors"
                >
                  <Icon size={14} />
                  {t(page.labelKey, page.fallback)}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
