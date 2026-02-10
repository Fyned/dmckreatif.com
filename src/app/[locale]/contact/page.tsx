"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-section-sm lg:py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
            {t("sectionSubtitle")}
          </span>
          <h1 className="font-space font-bold text-h1 text-neo-black">
            {t("sectionTitle")}
          </h1>
          <div className="w-16 h-1 bg-neo-black mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            {submitted ? (
              <motion.div
                variants={fadeInUp}
                className="border-2 border-neo-black bg-neo-green p-12 shadow-hard-lg text-center"
              >
                <CheckCircle size={48} className="mx-auto mb-4 text-neo-black" />
                <h2 className="font-space font-bold text-h3 mb-2">
                  {t("success")}
                </h2>
                <p className="font-mono text-sm text-neo-black/80">
                  {t("successDetail")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                      {t("nameLabel")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("namePlaceholder")}
                      className="w-full px-4 py-3 border-2 border-neo-black bg-neo-white font-mono text-sm focus:outline-none focus:shadow-hard-sm focus:bg-neo-yellow/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                      {t("emailLabel")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t("emailPlaceholder")}
                      className="w-full px-4 py-3 border-2 border-neo-black bg-neo-white font-mono text-sm focus:outline-none focus:shadow-hard-sm focus:bg-neo-yellow/20 transition-all"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                      {t("companyLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("companyPlaceholder")}
                      className="w-full px-4 py-3 border-2 border-neo-black bg-neo-white font-mono text-sm focus:outline-none focus:shadow-hard-sm focus:bg-neo-yellow/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                      {t("serviceLabel")}
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-neo-black bg-neo-white font-mono text-sm focus:outline-none focus:shadow-hard-sm focus:bg-neo-yellow/20 transition-all appearance-none">
                      <option value="">{t("servicePlaceholder")}</option>
                      <option value="web">{t("serviceWeb")}</option>
                      <option value="ecommerce">{t("serviceEcommerce")}</option>
                      <option value="seo">{t("serviceSeo")}</option>
                      <option value="marketing">{t("serviceMarketing")}</option>
                      <option value="other">{t("serviceOther")}</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                    {t("budgetLabel")}
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-neo-black bg-neo-white font-mono text-sm focus:outline-none focus:shadow-hard-sm focus:bg-neo-yellow/20 transition-all appearance-none">
                    <option value="">{t("budgetPlaceholder")}</option>
                    <option value="1">{t("budget1")}</option>
                    <option value="2">{t("budget2")}</option>
                    <option value="3">{t("budget3")}</option>
                    <option value="4">{t("budget4")}</option>
                  </select>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder={t("messagePlaceholder")}
                    className="w-full px-4 py-3 border-2 border-neo-black bg-neo-white font-mono text-sm resize-none focus:outline-none focus:shadow-hard-sm focus:bg-neo-yellow/20 transition-all"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <NeoButton type="submit" size="lg" color="neo-lime">
                    {t("submit")} <Send size={16} />
                  </NeoButton>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="border-2 border-neo-black bg-neo-white p-6 shadow-hard">
              <h3 className="font-space font-bold text-sm mb-4">
                {t("directContact")}
              </h3>
              <a
                href="mailto:hello@dmckreatif.com"
                className="flex items-center gap-2 font-mono text-sm text-neo-black/80 hover:text-neo-black transition-colors"
              >
                <Mail size={14} /> hello@dmckreatif.com
              </a>
            </div>

            <div className="border-2 border-neo-black bg-neo-lime p-6 shadow-hard">
              <p className="font-mono text-sm text-neo-black/80">
                {t("responseTime")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
