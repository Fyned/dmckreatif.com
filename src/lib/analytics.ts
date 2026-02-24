/* ── Google Tag Manager + gtag Helpers ── */
/* Analytics only fires AFTER user grants cookie consent (GDPR) */

declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "set" | "js" | "consent",
      targetOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const GOOGLE_ADS_CONVERSION_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID as string | undefined;

let gtmInitialized = false;

/* ── Initialize GTM / gtag at runtime ── */
/* Called ONLY when analytics consent is granted */
export function initGTM(): void {
  if (typeof window === "undefined") return;
  if (gtmInitialized) return;

  const measurementId = GA_MEASUREMENT_ID || GTM_ID;
  if (!measurementId) return;

  // Check cookie consent before initializing
  const consentAllowed = checkAnalyticsConsent();
  if (!consentAllowed) return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  } as Window["gtag"];

  // Set default consent state
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: checkMarketingConsent() ? "granted" : "denied",
  });

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  // Also configure Google Ads if present and marketing consent given
  if (GOOGLE_ADS_CONVERSION_ID && checkMarketingConsent()) {
    window.gtag("config", GOOGLE_ADS_CONVERSION_ID);
  }

  // Dynamically load the gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // GTM noscript fallback (no-JS environments)
  if (document.body) {
    const noscript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${measurementId}`;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.cssText = "display:none;visibility:hidden";
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  gtmInitialized = true;
}

/* ── Consent Helpers ── */
function checkAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem("dmc_cookie_consent");
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { preferences: { analytics: boolean } };
    return parsed.preferences?.analytics === true;
  } catch {
    return false;
  }
}

function checkMarketingConsent(): boolean {
  try {
    const raw = localStorage.getItem("dmc_cookie_consent");
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { preferences: { marketing: boolean } };
    return parsed.preferences?.marketing === true;
  } catch {
    return false;
  }
}

/* ── Re-initialize after consent change ── */
export function reinitAnalyticsOnConsent(): void {
  if (gtmInitialized) {
    // Update consent state if already initialized
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: checkAnalyticsConsent() ? "granted" : "denied",
        ad_storage: checkMarketingConsent() ? "granted" : "denied",
      });
    }
    return;
  }

  // First-time init after consent
  initGTM();
}

function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(data);
}

/* ── Generic event tracker ── */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (!isGtagAvailable()) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });

  pushToDataLayer({
    event: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
  });
}

/* ── Conversion tracker ── */
export function trackConversion(
  value?: number,
  currency: string = "EUR"
): void {
  if (!isGtagAvailable()) return;
  if (!GOOGLE_ADS_CONVERSION_ID) return;

  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_CONVERSION_ID,
    value,
    currency,
  });
}

/* ── Template-specific events ── */
export function trackTemplateView(
  templateSlug: string,
  templateName: string,
  categorySlug: string
): void {
  trackEvent("view_item", "templates", templateSlug);

  pushToDataLayer({
    event: "template_view",
    template_slug: templateSlug,
    template_name: templateName,
    template_category: categorySlug,
  });
}

export function trackAddToCart(
  templateSlug: string,
  templateName: string,
  tier: string,
  price: number,
  currency: string = "EUR"
): void {
  if (!isGtagAvailable()) return;

  window.gtag("event", "add_to_cart", {
    items: [
      {
        item_id: templateSlug,
        item_name: templateName,
        item_variant: tier,
        price,
        currency,
        quantity: 1,
      },
    ],
    value: price,
    currency,
  });

  pushToDataLayer({
    event: "add_to_cart",
    template_slug: templateSlug,
    template_name: templateName,
    tier,
    price,
    currency,
  });
}

export function trackBeginCheckout(
  templateSlug: string,
  templateName: string,
  tier: string,
  price: number,
  currency: string = "EUR"
): void {
  if (!isGtagAvailable()) return;

  window.gtag("event", "begin_checkout", {
    items: [
      {
        item_id: templateSlug,
        item_name: templateName,
        item_variant: tier,
        price,
        currency,
        quantity: 1,
      },
    ],
    value: price,
    currency,
  });

  pushToDataLayer({
    event: "begin_checkout",
    template_slug: templateSlug,
    template_name: templateName,
    tier,
    price,
    currency,
  });
}

/* ── Form Submission Tracking ── */
export function trackFormSubmission(
  formName: string,
  formLocation: string
): void {
  trackEvent("form_submission", "forms", `${formName}_${formLocation}`);
  pushToDataLayer({
    event: "form_submission",
    form_name: formName,
    form_location: formLocation,
  });
}

/* ── CTA Button Click Tracking ── */
export function trackCtaClick(
  ctaText: string,
  ctaLocation: string,
  destination?: string
): void {
  trackEvent("cta_click", "engagement", `${ctaText}_${ctaLocation}`);
  pushToDataLayer({
    event: "cta_click",
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_destination: destination,
  });
}

/* ── Pricing Plan View Tracking ── */
export function trackPricingView(
  planName: string,
  planPrice: number
): void {
  trackEvent("view_pricing", "pricing", planName, planPrice);
  pushToDataLayer({
    event: "view_pricing",
    plan_name: planName,
    plan_price: planPrice,
  });
}

/* ── Language Switch Tracking ── */
export function trackLanguageSwitch(
  fromLang: string,
  toLang: string
): void {
  trackEvent("language_switch", "i18n", `${fromLang}_to_${toLang}`);
  pushToDataLayer({
    event: "language_switch",
    from_language: fromLang,
    to_language: toLang,
  });
}

/* ── Newsletter Signup Tracking ── */
export function trackNewsletterSignup(location: string): void {
  trackEvent("newsletter_signup", "lead_generation", location);
  pushToDataLayer({
    event: "newsletter_signup",
    signup_location: location,
  });
}

/* ── Scroll Depth Tracking ── */
let scrollTracked = new Set<number>();

export function initScrollDepthTracking(): void {
  if (typeof window === "undefined") return;

  scrollTracked = new Set<number>();
  const thresholds = [25, 50, 75, 90];

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    for (const threshold of thresholds) {
      if (scrollPercent >= threshold && !scrollTracked.has(threshold)) {
        scrollTracked.add(threshold);
        trackEvent("scroll_depth", "engagement", `${threshold}%`, threshold);
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
}

/* ── Page View Tracking ── */
export function trackPageView(
  pagePath: string,
  pageTitle: string,
  locale: string
): void {
  if (!isGtagAvailable()) return;

  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_title: pageTitle,
    page_language: locale,
  });

  pushToDataLayer({
    event: "page_view",
    page_path: pagePath,
    page_title: pageTitle,
    page_language: locale,
  });
}
