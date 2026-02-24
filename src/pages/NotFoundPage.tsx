import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SeoHead from "@/components/seo/SeoHead";
import { fadeInUp } from "@/lib/animations";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const lang = locale ?? "en";

  return (
    <>
      <SeoHead
        title={t("notFound.seoTitle", "Page Not Found — DMC Kreatif")}
        description={t("notFound.seoDescription", "The page you are looking for does not exist or has been moved.")}
        noIndex
      />

      <section className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-xl mx-auto text-center">
          {/* Giant 404 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0, 1] }}
            className="mb-8"
          >
            <span className="inline-block font-space font-extrabold text-[8rem] md:text-[12rem] leading-none text-neo-black select-none">
              4
              <span className="inline-block bg-neo-lime border-4 border-neo-black shadow-hard px-4 py-2 mx-1 -rotate-6">
                0
              </span>
              4
            </span>
          </motion.div>

          {/* Message */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-space font-bold text-2xl md:text-3xl uppercase tracking-tight text-neo-black mb-4">
              {t("notFound.title", "Page Not Found")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mb-10 max-w-md mx-auto">
              {t("notFound.subtitle", "The page you are looking for does not exist or has been moved.")}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to={`/${lang}`}
              className="bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
            >
              {t("notFound.backHome", "Back to Home")}
            </Link>
            <Link
              to={`/${lang}/services`}
              className="bg-neo-white border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
            >
              {t("notFound.viewServices", "View Services")}
            </Link>
            <Link
              to={`/${lang}/portfolio`}
              className="bg-neo-blue border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider text-neo-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
            >
              {t("notFound.viewPortfolio", "View Portfolio")}
            </Link>
          </motion.div>

          {/* Decorative dotted line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 border-t-2 border-dashed border-neo-black/20 max-w-xs mx-auto"
          />
        </div>
      </section>
    </>
  );
}
