import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { reinitAnalyticsOnConsent } from "@/lib/analytics";

export interface CookiePreferences {
  necessary: true; // always on
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentState {
  consentGiven: boolean;
  preferences: CookiePreferences;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openManager: () => void;
}

const STORAGE_KEY = "dmc_cookie_consent";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentState | null>(null);

export function useCookieConsent(): CookieConsentState {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}

function loadConsent(): { consentGiven: boolean; preferences: CookiePreferences } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { consentGiven: false, preferences: defaultPreferences };
    const parsed = JSON.parse(raw) as { preferences: CookiePreferences };
    return { consentGiven: true, preferences: { ...parsed.preferences, necessary: true } };
  } catch {
    return { consentGiven: false, preferences: defaultPreferences };
  }
}

function persistConsent(prefs: CookiePreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ preferences: prefs, timestamp: Date.now() }));
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentGiven, setConsentGiven] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const saved = loadConsent();
    setConsentGiven(saved.consentGiven);
    setPreferences(saved.preferences);
    if (!saved.consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const prefs: CookiePreferences = { necessary: true, analytics: true, marketing: true };
    setPreferences(prefs);
    setConsentGiven(true);
    setShowBanner(false);
    persistConsent(prefs);
  }, []);

  const rejectAll = useCallback(() => {
    const prefs: CookiePreferences = { necessary: true, analytics: false, marketing: false };
    setPreferences(prefs);
    setConsentGiven(true);
    setShowBanner(false);
    persistConsent(prefs);
  }, []);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    const safe = { ...prefs, necessary: true as const };
    setPreferences(safe);
    setConsentGiven(true);
    setShowBanner(false);
    persistConsent(safe);
  }, []);

  const openManager = useCallback(() => {
    setShowBanner(true);
  }, []);

  // Re-initialize analytics when consent changes
  const initialLoad = useRef(true);
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    if (consentGiven) {
      reinitAnalyticsOnConsent();
    }
  }, [consentGiven, preferences.analytics, preferences.marketing]);

  return (
    <CookieConsentContext.Provider
      value={{ consentGiven, preferences, showBanner, acceptAll, rejectAll, savePreferences, openManager }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
