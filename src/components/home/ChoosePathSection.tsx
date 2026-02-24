import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Code2,
  Clock,
  Palette,
  Shield,
  Rocket,
  ArrowRight,
  Users,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoBadge from "@/components/ui/NeoBadge";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";

export default function ChoosePathSection() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";

  return (
    <section className="py-20 lg:py-28 section-alt">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <SectionHeader
          title={t("choosePath.sectionTitle", "CHOOSE YOUR PATH")}
          subtitle={t("choosePath.sectionSubtitle", "SYS.OPTIONS")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {/* LEFT — Ready-Made Templates */}
          <motion.div variants={fadeInUp}>
            <Link
              to={`/${currentLocale}/templates`}
              className="block group h-full"
            >
              <div className="bg-neo-white border-2 border-neo-black shadow-hard h-full transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
                {/* Accent bar */}
                <div className="h-2 bg-neo-lime" />

                <div className="p-6 lg:p-8">
                  {/* Icon + Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-neo-lime border-2 border-neo-black shadow-hard-sm flex items-center justify-center">
                      <Rocket size={26} strokeWidth={2.5} />
                    </div>
                    <div className="text-right">
                      <span className="block font-space font-bold text-2xl lg:text-3xl tracking-tight">
                        {t("choosePath.templatePrice", "FROM \u20ac39")}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-space font-bold text-xl lg:text-2xl tracking-tight mb-2">
                    {t("choosePath.templateTitle", "READY-MADE TEMPLATES")}
                  </h3>

                  {/* Delivery badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <Clock size={14} className="text-neo-black/60" />
                    <span className="font-mono text-sm text-neo-black/70">
                      {t("choosePath.templateDelivery", "Site in 24 hours")}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {[
                      {
                        icon: Palette,
                        text: t(
                          "choosePath.templateFeature1",
                          "Pre-built professional designs"
                        ),
                      },
                      {
                        icon: Zap,
                        text: t(
                          "choosePath.templateFeature2",
                          "Your brand colors & logo"
                        ),
                      },
                      {
                        icon: Shield,
                        text: t(
                          "choosePath.templateFeature3",
                          "Mobile responsive & SEO ready"
                        ),
                      },
                    ].map((item) => (
                      <li
                        key={item.text}
                        className="flex items-center gap-3 font-mono text-sm text-neo-black/80"
                      >
                        <span className="w-6 h-6 bg-neo-lime border border-neo-black flex items-center justify-center flex-shrink-0">
                          <item.icon size={13} strokeWidth={2.5} />
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 font-space font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                    {t("choosePath.templateCta", "BROWSE TEMPLATES")}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* RIGHT — Custom Development (Primary) */}
          <motion.div variants={fadeInUp}>
            <Link
              to={`/${currentLocale}/pricing`}
              className="block group h-full"
            >
              <div className="bg-neo-white border-2 border-neo-black shadow-hard h-full transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm relative">
                {/* Accent bar */}
                <div className="h-2 bg-neo-blue" />

                {/* Professional badge */}
                <div className="absolute -top-3 right-4">
                  <NeoBadge color="neo-blue">
                    {t(
                      "choosePath.customBadge",
                      "PROFESSIONAL DEVELOPER TEAM"
                    )}
                  </NeoBadge>
                </div>

                <div className="p-6 lg:p-8">
                  {/* Icon + Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-neo-blue border-2 border-neo-black shadow-hard-sm flex items-center justify-center">
                      <Code2 size={26} strokeWidth={2.5} />
                    </div>
                    <div className="text-right">
                      <span className="block font-space font-bold text-2xl lg:text-3xl tracking-tight">
                        {t("choosePath.customPrice", "FROM \u20ac349")}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-space font-bold text-xl lg:text-2xl tracking-tight mb-2">
                    {t("choosePath.customTitle", "CUSTOM DEVELOPMENT")}
                  </h3>

                  {/* Description */}
                  <div className="flex items-center gap-2 mb-6">
                    <Users size={14} className="text-neo-black/60" />
                    <span className="font-mono text-sm text-neo-black/70">
                      {t(
                        "choosePath.customDelivery",
                        "Built from scratch by our team"
                      )}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {[
                      {
                        icon: Code2,
                        text: t(
                          "choosePath.customFeature1",
                          "100% unique custom design"
                        ),
                      },
                      {
                        icon: Zap,
                        text: t(
                          "choosePath.customFeature2",
                          "Unlimited revisions included"
                        ),
                      },
                      {
                        icon: Shield,
                        text: t(
                          "choosePath.customFeature3",
                          "Dedicated developer & support"
                        ),
                      },
                    ].map((item) => (
                      <li
                        key={item.text}
                        className="flex items-center gap-3 font-mono text-sm text-neo-black/80"
                      >
                        <span className="w-6 h-6 bg-neo-blue border border-neo-black flex items-center justify-center flex-shrink-0">
                          <item.icon size={13} strokeWidth={2.5} />
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 font-space font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                    {t("choosePath.customCta", "VIEW PACKAGES")}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
