import { useEffect, useState } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isSupportedLocale, loadLocale } from "@/i18n";
import type { SupportedLocale } from "@/i18n";

export default function LocaleRouter() {
  const { locale } = useParams<{ locale: string }>();
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(locale === "en" || !locale);

  useEffect(() => {
    if (!locale || !isSupportedLocale(locale)) return;

    let cancelled = false;

    async function activate() {
      await loadLocale(locale as SupportedLocale);
      if (cancelled) return;
      if (i18n.language !== locale) {
        await i18n.changeLanguage(locale);
      }
      setReady(true);
    }

    if (i18n.hasResourceBundle(locale, "translation")) {
      if (i18n.language !== locale) i18n.changeLanguage(locale);
      setReady(true);
    } else {
      setReady(false);
      activate();
    }

    return () => { cancelled = true; };
  }, [locale, i18n]);

  if (!locale || !isSupportedLocale(locale)) {
    return <Navigate to="/en" replace />;
  }

  if (!ready) return null;

  return <Outlet />;
}
