import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/i18n/locales/en.json";

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

/* Lazy-load non-EN locale JSONs via Vite dynamic import.
   Each locale becomes its own chunk (~100-130KB → ~30KB gzipped)
   instead of bundling all 4 locales (~496KB raw) into the index chunk.
   EN stays statically bundled since it's the fallback/default language. */
const localeImporters: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  fr: () => import("@/i18n/locales/fr.json"),
  nl: () => import("@/i18n/locales/nl.json"),
  de: () => import("@/i18n/locales/de.json"),
};

export async function loadLocale(lng: SupportedLocale): Promise<void> {
  if (lng === "en") return;
  if (i18n.hasResourceBundle(lng, "translation")) return;
  const importer = localeImporters[lng];
  if (!importer) return;
  const mod = await importer();
  i18n.addResourceBundle(lng, "translation", mod.default, true, true);
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  partialBundledLanguages: true,
});

export default i18n;
