# LAUNCH CHECKLIST — DMC Kreatif
> Pre-launch QA for dmckreatif.com — Feb 2026

---

## BUILD & DEPLOY

- [x] `npx tsc -b` — 0 TypeScript errors
- [x] `npx vite build` — Production build successful (12.6s)
- [x] rss.xml auto-generated at build time
- [x] sitemap.xml in public/ directory
- [x] robots.txt in public/ directory
- [x] manifest.webmanifest configured
- [x] Service worker (sw.js) registered
- [ ] Deploy to Hostinger (manual)
- [ ] Verify HTTPS/SSL certificate
- [ ] Set up DNS records (A/CNAME)
- [ ] Configure custom domain in Hostinger

---

## SEO VERIFICATION

### Per-Page SEO ✅
- [x] Every page has unique `<title>` (50-60 chars)
- [x] Every page has `<meta description>` (150-160 chars)
- [x] OpenGraph tags: og:title, og:description, og:image, og:url
- [x] Twitter Card: summary_large_image
- [x] Canonical URLs
- [x] H1 tag: one per page, unique

### Structured Data ✅
- [x] JSON-LD: Organization (homepage)
- [x] JSON-LD: ProfessionalService (services)
- [x] JSON-LD: FAQPage (FAQ section)
- [x] JSON-LD: BreadcrumbList (all pages)
- [x] JSON-LD: Product (template detail)
- [x] JSON-LD: SoftwareApplication (templates)
- [x] JSON-LD: Article (blog posts)

### International SEO ✅
- [x] hreflang tags for en, fr, nl, de
- [x] Language switcher in header
- [x] All 4 locale files complete (en.json, fr.json, nl.json, de.json)
- [x] Default language: English

### Technical SEO ✅
- [x] sitemap.xml with all routes
- [x] robots.txt allows crawling
- [x] RSS feed at /rss.xml
- [x] RSS autodiscovery link in `<head>`
- [x] 404 page with helpful navigation
- [x] Image alt text audit complete
- [x] Internal linking (3+ per page)
- [x] Breadcrumbs on all pages (except homepage)

---

## ACCESSIBILITY (WCAG 2.1 AA) ✅

- [x] Skip to main content link
- [x] ARIA landmarks: main, nav, header, footer
- [x] aria-label on all interactive elements
- [x] aria-current="page" on active nav links
- [x] aria-expanded on mobile menu toggle
- [x] focus-visible styles (neo-lime outline)
- [x] Minimum touch targets 44px (mobile)
- [x] prefers-reduced-motion: reduce (animations disabled)
- [x] Color contrast meets AA standards
- [x] Form labels and validation messages

---

## PERFORMANCE ✅

- [x] Code splitting with React.lazy + Suspense
- [x] Manual chunks: vendor, i18n, motion, supabase, ui
- [x] Font preload with display=swap
- [x] Images lazy loaded
- [x] Service worker caches static assets
- [x] Lighthouse CI config ready (lighthouserc.js)
- [x] Vendor chunk: 58KB gzip
- [x] Initial JS shared: well under 150KB target

---

## LEGAL & COMPLIANCE ✅

- [x] Privacy Policy page (/privacy)
- [x] Terms of Service page (/terms)
- [x] GDPR Cookie Consent banner
- [x] Cookie preferences persistent
- [x] No third-party tracking without consent
- [x] Newsletter double opt-in ready

---

## CONVERSION ELEMENTS ✅

- [x] Hero CTA: "Start Your Project"
- [x] WhatsApp floating button
- [x] Exit intent popup
- [x] Social proof notifications
- [x] Newsletter signup (footer)
- [x] Lead magnet modals (3 resources)
- [x] Contact form with validation
- [x] Pricing calculator
- [x] Campaign banner component ready
- [x] A/B testing infrastructure

---

## CONTENT ✅

- [x] 15 blog posts published
- [x] 8 portfolio projects showcased
- [x] 4 pricing tiers detailed
- [x] FAQ section with 8+ questions
- [x] About page with team + timeline
- [x] Process/How We Work section
- [x] City-specific service pages (5 cities)
- [x] Case studies page

---

## ERROR HANDLING ✅

- [x] Error Boundary wrapping entire app
- [x] 404 Not Found page
- [x] Form error states with clear messages
- [x] Loading states with Suspense fallbacks

---

## POST-LAUNCH TODO

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Business Profile
- [ ] Set up Google Analytics 4
- [ ] Configure GTM container
- [ ] Submit to web directories (see SEO-LINK-BUILDING.md)
- [ ] Run Lighthouse audit and record baseline scores
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Schedule weekly SEO performance review
- [ ] Launch LinkedIn content strategy (30-day post series)
- [ ] Begin cold email outreach (content/outreach/email-templates.md)
- [ ] Monitor Core Web Vitals in Search Console

---

## FILES CREATED IN 50-PHASE SEO PLAN

### New Components (16 files):
1. `src/components/seo/SeoHead.tsx` — Per-page SEO meta
2. `src/components/seo/JsonLd.tsx` — Schema.org markup
3. `src/components/layout/ProgressBar.tsx` — Scroll progress
4. `src/components/layout/CampaignBanner.tsx` — Promotions
5. `src/components/ui/WhatsAppButton.tsx` — Floating WhatsApp
6. `src/components/ui/ExitIntentPopup.tsx` — Exit intent
7. `src/components/ui/SocialProofNotification.tsx` — Social proof
8. `src/components/ui/LeadMagnet.tsx` — Email capture
9. `src/components/ui/Breadcrumbs.tsx` — Breadcrumb nav
10. `src/components/ui/NewsletterSignup.tsx` — Newsletter
11. `src/components/pricing/PricingCalculator.tsx` — Price estimator
12. `src/components/ErrorBoundary.tsx` — Error handling

### New Pages (4 files):
13. `src/pages/PrivacyPage.tsx` — Privacy policy
14. `src/pages/TermsPage.tsx` — Terms of service
15. `src/pages/NotFoundPage.tsx` — 404 page
16. `src/pages/CityServicePage.tsx` — City-specific services

### Configuration & Data (8 files):
17. `public/sitemap.xml` — XML sitemap
18. `public/robots.txt` — Crawler rules
19. `public/sw.js` — Service worker
20. `public/manifest.webmanifest` — PWA manifest
21. `scripts/generate-rss.ts` — RSS generator
22. `src/lib/ab-testing.ts` — A/B testing utility
23. `lighthouserc.js` — Lighthouse CI config
24. `vite.config.ts` — Enhanced with RSS plugin

### Documentation (4 files):
25. `SEO-50-PHASES.md` — Full 50-phase plan
26. `SEO-LINK-BUILDING.md` — Directory submissions
27. `CRO-AUDIT.md` — Conversion optimization audit
28. `LAUNCH-CHECKLIST.md` — This file

### Modified Files:
- All 4 locale files (en/fr/nl/de.json) — 200+ new i18n keys
- `src/components/layout/AppLayout.tsx` — Skip nav, social proof
- `src/components/layout/Header.tsx` — ARIA labels, a11y
- `src/components/layout/Footer.tsx` — Newsletter signup
- `src/components/ui/NeoButton.tsx` — Focus-visible styles
- `index.html` — RSS link, font preload
- `src/index.css` — A11y styles, reduced motion
- `src/main.tsx` — ErrorBoundary, SW registration
- `src/App.tsx` — New routes (privacy, terms, 404, city)
- Multiple page files — Internal linking, breadcrumbs, SEO

---

*Total: 50 phases completed | 28+ new files | 0 build errors*
*Last updated: February 2026*
