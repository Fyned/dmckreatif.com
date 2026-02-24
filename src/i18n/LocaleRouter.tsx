import { useEffect } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isSupportedLocale } from "@/i18n";

export default function LocaleRouter() {
  const { locale } = useParams<{ locale: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (locale && isSupportedLocale(locale) && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  if (!locale || !isSupportedLocale(locale)) {
    return <Navigate to="/en" replace />;
  }

  return <Outlet />;
}
