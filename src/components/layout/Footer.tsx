import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import DualLogo from "./DualLogo";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function Footer() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const { openManager } = useCookieConsent();
  const currentLocale = locale ?? "en";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neo-black text-neo-bg border-t-[6px] border-neo-lime" role="contentinfo">
      <div className="max-w-container mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <DualLogo size="md" />
            <p className="font-mono text-sm text-neo-bg/70 mt-4 leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-space font-bold text-sm text-neo-lime mb-4 tracking-wider">
              {t("footer.services")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to={`/${currentLocale}/services`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("nav.services")}
              </Link>
              <Link
                to={`/${currentLocale}/portfolio`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("nav.portfolio")}
              </Link>
              <Link
                to={`/${currentLocale}/pricing`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("nav.pricing")}
              </Link>
              <Link
                to={`/${currentLocale}/templates`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("nav.templates")}
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-space font-bold text-sm text-neo-lime mb-4 tracking-wider">
              {t("footer.company")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to={`/${currentLocale}/about`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("nav.about")}
              </Link>
              <Link
                to={`/${currentLocale}/about/team`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.team", "Our Team")}
              </Link>
              <Link
                to={`/${currentLocale}/about/process`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.process", "Our Process")}
              </Link>
              <Link
                to={`/${currentLocale}/about/why-us`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.whyUs", "Why DMC Kreatif")}
              </Link>
              <Link
                to={`/${currentLocale}/about/partners`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.partners", "Partners")}
              </Link>
              <Link
                to={`/${currentLocale}/about/careers`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.careers", "Careers")}
              </Link>
              <Link
                to={`/${currentLocale}/blog`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("nav.blog")}
              </Link>
              <Link
                to={`/${currentLocale}/contact`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("nav.contact")}
              </Link>
              <Link
                to={`/${currentLocale}/privacy`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.privacy", "Privacy Policy")}
              </Link>
              <Link
                to={`/${currentLocale}/terms`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.terms", "Terms of Service")}
              </Link>
              <Link
                to={`/${currentLocale}/legal`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.legal", "Legal Notice")}
              </Link>
              <Link
                to={`/${currentLocale}/cookie-policy`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.cookiePolicy", "Cookie Policy")}
              </Link>
              <Link
                to={`/${currentLocale}/refund-policy`}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors"
              >
                {t("footer.refundPolicy", "Refund Policy")}
              </Link>
              <button
                onClick={openManager}
                className="font-mono text-xs text-neo-bg hover:text-neo-lime transition-colors text-left"
              >
                {t("footer.manageCookies", "Manage Cookies")}
              </button>
            </div>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <NewsletterSignup />
            <a
              href="mailto:hello@dmckreatif.com"
              className="inline-block font-mono text-xs text-neo-bg/60 hover:text-neo-lime transition-colors mt-4"
            >
              hello@dmckreatif.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t-2 border-neo-bg/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-neo-bg/60 tracking-wider">
            &copy; {currentYear} DMC KREATIF &times; GMG DESIGN. {t("footer.copyright")}.
          </p>
          <p className="font-mono text-xs text-neo-bg/60 tracking-wider">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
