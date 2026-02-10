"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DualLogo from "./DualLogo";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neo-black text-neo-bg border-t-6 border-neo-lime">
      <div className="max-w-container mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <DualLogo size="md" />
            <p className="font-mono text-sm text-neo-bg/70 mt-4 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-space font-bold text-sm text-neo-lime mb-4 tracking-wider">
              {t("services")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/services"
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {tNav("services")}
              </Link>
              <Link
                href="/portfolio"
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {tNav("portfolio")}
              </Link>
              <Link
                href="/pricing"
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {tNav("pricing")}
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-space font-bold text-sm text-neo-lime mb-4 tracking-wider">
              {t("company")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/about"
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {tNav("about")}
              </Link>
              <Link
                href="/blog"
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {tNav("blog")}
              </Link>
              <Link
                href="/contact"
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {tNav("contact")}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-space font-bold text-sm text-neo-lime mb-4 tracking-wider">
              {tNav("contact")}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:hello@dmckreatif.com"
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                hello@dmckreatif.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t-2 border-neo-bg/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-neo-bg/60 tracking-wider">
            &copy; {currentYear} DMC KREATIF &times; GMG DESIGN. {t("copyright")}.
          </p>
          <p className="font-mono text-xs text-neo-bg/60 tracking-wider">
            {t("builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
