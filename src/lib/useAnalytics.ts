import { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { trackPageView, initScrollDepthTracking } from "@/lib/analytics";

/**
 * Tracks page view + scroll depth on every route change.
 * Call once per page component — no arguments needed.
 */
export function useAnalytics(pageTitle: string): void {
  const { pathname } = useLocation();
  const { locale } = useParams();
  const tracked = useRef("");

  useEffect(() => {
    // Prevent duplicate tracking on same path
    if (tracked.current === pathname) return;
    tracked.current = pathname;

    trackPageView(pathname, pageTitle, locale ?? "en");
    initScrollDepthTracking();
  }, [pathname, pageTitle, locale]);
}
