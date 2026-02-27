import { useEffect, useState, useRef } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isSupportedLocale, loadLocale } from "@/i18n";
import type { SupportedLocale } from "@/i18n";
import { trackLanguageSwitch } from "@/lib/analytics";

export default function LocaleRouter() {
  const { locale } = useParams<{ locale: string }>();
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(locale === "en" || !locale);
  const prevLocale = useRef(i18n.language);

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

    // Track language switch
    if (prevLocale.current && prevLocale.current !== locale) {
      trackLanguageSwitch(prevLocale.current, locale);
    }
    prevLocale.current = locale;

    return () => { cancelled = true; };
  }, [locale, i18n]);

  if (!locale || !isSupportedLocale(locale)) {
    return <Navigate to="/en" replace />;
  }

  if (!ready) return null;

  return <Outlet />;
}
