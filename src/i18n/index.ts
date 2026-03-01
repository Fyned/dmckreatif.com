import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCore from "@/i18n/locales/en.json";

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

export type EnNamespace = "services" | "tech" | "industries" | "cities" | "seo";

const nsImporters: Record<EnNamespace, () => Promise<{ default: Record<string, unknown> }>> = {
  services: () => import("@/i18n/locales/en-services.json"),
  tech: () => import("@/i18n/locales/en-tech.json"),
  industries: () => import("@/i18n/locales/en-industries.json"),
  cities: () => import("@/i18n/locales/en-cities.json"),
  seo: () => import("@/i18n/locales/en-seo.json"),
};

const loadedNs = new Set<EnNamespace>();

export async function loadEnNamespace(...namespaces: EnNamespace[]): Promise<void> {
  const pending = namespaces.filter((ns) => !loadedNs.has(ns));
  if (pending.length === 0) return;
  const mods = await Promise.all(pending.map((ns) => nsImporters[ns]()));
  pending.forEach((ns, idx) => {
    i18n.addResourceBundle("en", "translation", mods[idx].default, true, true);
    loadedNs.add(ns);
  });
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enCore },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  partialBundledLanguages: true,
});

export default i18n;
