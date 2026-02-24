import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/i18n/locales/en.json";
import fr from "@/i18n/locales/fr.json";
import nl from "@/i18n/locales/nl.json";
import de from "@/i18n/locales/de.json";

export const supportedLocales = ["en", "fr", "nl", "de"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const localeNames: Record<SupportedLocale, string> = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
  de: "Deutsch",
};

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    nl: { translation: nl },
    de: { translation: de },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
