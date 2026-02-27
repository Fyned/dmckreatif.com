import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { setConsentDefaults, initGTM, initClarity } from "@/lib/analytics";
import "@/i18n";
import "@/index.css";
import App from "@/App";
import ErrorBoundary from "@/components/ErrorBoundary";

/* Consent Mode v2: set defaults BEFORE any tracking scripts */
setConsentDefaults();

/* Initialize GTM/gtag + Clarity — only fires if user previously granted consent */
initGTM();
initClarity();

/* Register service worker for PWA offline support */
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* SW registration failed — graceful degradation */
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CookieConsentProvider>
            <App />
          </CookieConsentProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </ErrorBoundary>,
);
