# DMC Kreatif — Full SEO Audit Report
**Date:** 2026-03-19 | **Site:** dmckreatif.com | **Tech:** React + Vite SPA + Hostinger
**Audited by:** 4 parallel specialist agents (Technical, Content/E-E-A-T, Schema, Sitemap) + visual + GEO

---

## SEO Health Score: 70 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 71/100 | 17.75 |
| Content Quality (E-E-A-T) | 25% | 74/100 | 18.50 |
| On-Page SEO | 20% | 65/100 | 13.00 |
| Schema / Structured Data | 10% | 74/100 | 7.40 |
| Performance (CWV) | 10% | 62/100 | 6.20 |
| Images | 5% | 60/100 | 3.00 |
| AI Search Readiness (GEO) | 5% | 85/100 | 4.25 |
| **TOTAL** | 100% | | **70.1 / 100** |

---

## Business Type
**Digital Agency** — B2B services, 4-language (EN/FR/NL/DE), European market (FR, BE, UK, NL, DE).

---

## Top 5 Critical Issues

1. **SPA prerendering unreliable** — Puppeteer dependency fails on Windows/CI → Googlebot sees empty `<div id="root">` on many pages
2. **Duplicate BreadcrumbList schema** — `Breadcrumbs.tsx` auto-injects AND pages inject explicitly → Google receives conflicting signals on every inner page
3. **"28-strong team" vs "solo agency" contradiction** — `about.description` says "28-strong core team, 150+ specialist network" while timeline describes solo launch — quality rater trust failure
4. **136 thin city-service pages** — 34 cities × 4 services, each ~130-200 words (minimum 500 needed) — doorway page risk
5. **Static canonical in `index.html:24` points to `/en`** — when prerender fails, ALL pages share the homepage canonical

---

## Top 5 Quick Wins (< 30 min each)

1. `index.html:24` — Delete static canonical tag (1 line)
2. `index.html:2` — Change `lang="en"` to `lang="x-default"` (1 char)
3. `index.html:47-52` — Change static hreflang to x-default only (5 lines)
4. `seo-schemas.ts:284` — Wrap `image` string in `ImageObject` (unblocks Article rich results on 42+ blog posts)
5. `seo-schemas.ts:34` + `index.html:71` + `seo-schemas.ts:330` — Wrap `logo` in `ImageObject` (3 locations)

---

## Technical SEO: 71/100

### Security & Headers: 88/100 ✓
- HTTPS + HSTS (max-age=31536000; includeSubDomains; preload) ✓
- X-Frame-Options SAMEORIGIN ✓, X-Content-Type-Options nosniff ✓
- Referrer-Policy strict-origin-when-cross-origin ✓, Permissions-Policy ✓
- ⚠️ CSP: `unsafe-inline` for both `script-src` AND `style-src` — negates XSS protection (Lighthouse Best Practices penalty)
- ⚠️ Geo coordinates: `index.html` (London center 51.5074) vs `seo-schemas.ts` (SE9 5EA 51.4513) — conflicting entity signal

### Crawlability: 90/100 ✓
- robots.txt: all AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) ✓
- www → non-www 301 ✓, root → /en ✓, Turkish locale → /en ✓
- Auth/admin paths blocked in robots.txt ✓
- Gzip compression ✓, hashed assets immutable cache ✓
- ⚠️ `Cache-Control: no-cache, no-store, must-revalidate` on HTML — prevents any caching

### JavaScript Rendering: 50/100 ⚠️
- **CRITICAL:** `vite.config.ts` prerenderPlugin skips if Puppeteer not installed — fails on Windows locally, unreliable in CI
- Pure SPA shell serves empty `<div id="root">` when prerender skips → indexability failure for 490+ URLs
- `noscript` fallback in `index.html` exists (EN-only) ✓ — partial mitigation

### Indexability / Canonicals: 55/100 ⚠️
- **CRITICAL:** `index.html:24` — `<link rel="canonical" href="https://dmckreatif.com/en" />` — static fallback makes ALL pages appear as canonical duplicate of homepage when prerender fails
- Helmet per-page canonical works when JS renders ✓
- noindex on auth/dashboard/admin pages ✓

### Hreflang / i18n: 75/100
- `SeoHead.tsx` correctly generates per-page 4-language hreflang ✓
- ⚠️ `index.html:47-52`: static hreflang only points to homepage — bad fallback for all inner pages
- ⚠️ `index.html:2`: `html lang="en"` hardcoded — /fr, /nl, /de pages briefly show wrong lang attribute
- ⚠️ UK-only cities (Edinburgh, Glasgow, Bristol) have NL/DE/FR hreflang — illogical targeting
- ⚠️ FR case studies lack `hreflang="fr"` (cakir-facades, altinbas are French projects)

### URL Structure: 72/100
- `/:locale/path` consistent ✓
- ⚠️ Trailing slash inconsistency in `SeoHead.tsx` — path prop normalisation missing
- ⚠️ Blog pagination: "Load More" button (state-based) — no crawlable `/blog/page/2` URLs

### Core Web Vitals (Code): 62/100
- **HIGH:** H1 inside Framer Motion `staggerContainer initial="hidden"` — LCP delay (confirmed P0 in CLAUDE.md)
- No `fetchpriority="high"` anywhere in codebase
- Supabase promo query failing (406) — JS error on every load
- Fonts self-hosted ✓, 2 of 6 preloaded (remaining 4 not preloaded)
- Code splitting via lazy imports ✓

### Image Optimization: 60/100
- WebP format for portfolio ✓, lazy loading on case study images ✓
- ⚠️ `BeforeAfterSlider.tsx:78,93` — missing `loading="lazy"` and descriptive `alt`
- ⚠️ No `fetchpriority="high"` on LCP images (case study detail pages)

### Blog Pagination: 40/100
- "Load More" state → no crawlable page 2+ → ~40 articles have no index crawl path
- All slugs are in sitemap (partial fix) ✓

---

## Content Quality (E-E-A-T): 74/100

### Experience: 58/100
**Strengths:** Real named client projects with verifiable URLs, specific case study metrics (40% leads ↑, 55% inquiries ↑, 60% quote requests ↑), specific founder timeline with named first client.

**CRITICAL:** "28-strong core team, 150+ specialist network across 12+ European countries" (`about.description` + `seo.about.description`) contradicts "solo boutique agency" timeline. This is a trust-destroying inconsistency visible in the same website.

**CRITICAL:** Founder photo is `Code2` Lucide icon placeholder — most impactful single trust gap for a services business.

### Expertise: 78/100
**Strengths:** Technical blog posts demonstrate genuine depth — INP correctly updated from FID, UK post-Brexit GDPR/IR35 knowledge, EU VAT reverse charge, specific market data.

**Gap:** Zero author bylines on 51 blog posts — Sept 2025 QRG requires identifying who has the experience.

**Gap:** Digital Marketing service description: 12 words (stub) — `en.json:61`.

### Authoritativeness: 60/100
**Strengths:** 6 named testimonials with full names + roles (Pierre Cakir/CEO, James Adams/Partner, etc.), verifiable portfolio URLs.

**CRITICAL GAP:** No third-party review platforms — Clutch.co, Google Reviews, DesignRush all missing. MEMORY.md confirms these are unfinished. This is the #1 external authority signal absent.

**Gap:** About page links to `/about/team`, `/about/partners`, `/about/careers` — confirm routes exist in App.tsx.

### Trustworthiness: 72/100
**Strengths:** 5 legal pages (Privacy, Terms, Legal Notice, Cookie Policy, Refund Policy) ✓, 14-Day Revision Guarantee, transparent pricing.

**Issue:** Primary contact is +90 Turkish mobile — inconsistent for UK-registered agency.

**Issue:** UK Companies House registration number not displayed (UK legal requirement for registered companies).

**Issue:** Testimonial headshots missing.

### Thin Content

| Risk | Pages | Current Words | Min Needed |
|------|-------|--------------|------------|
| 🔴 CRITICAL | 136 city-service pages | ~130-200 | 500 |
| 🟡 MED | `agency-vs-freelancer.ts` | ~900-1100 | 1500 |
| 🟡 MED | `core-web-vitals-explained.ts` | ~1100-1300 | 1500 |
| 🟡 MED | `web-agency-london.ts` | ~1400 | 1500 |
| 🟡 MED | Digital Marketing service desc | 12 | 200 |

---

## Schema / Structured Data: 74/100

### Inventory: 22 schema types implemented ✓
ProfessionalService, WebSite, Person, Service, BreadcrumbList, BlogPosting, OfferCatalog, SoftwareApplication, WebPage, AboutPage, ContactPage, CollectionPage, ItemList, CreativeWork, ProfilePage — comprehensive.

FAQPage correctly removed ✓ (deprecated for SERP accordion Aug 2023)
No deprecated types (HowTo, SpecialAnnouncement) ✓

### Critical Errors

| # | Error | Location | Impact |
|---|-------|----------|--------|
| 1 | Duplicate BreadcrumbList | `Breadcrumbs.tsx` + per-page | Google sees 2 conflicting breadcrumbs |
| 2 | BreadcrumbList null path | `seo-schemas.ts:136-161` | Warning in Rich Results Test |
| 3 | `logo` bare string (not ImageObject) | `index.html:71`, `seo-schemas.ts:34,330` | Fails Organization rich result |
| 4 | `image` bare string in BlogPosting | `seo-schemas.ts:284` | Blocks Article rich results (42+ posts) |
| 5 | Geo coordinates inconsistency | `index.html:86` vs `seo-schemas.ts:61` | Conflicting entity signal |
| 6 | **WebSite SearchAction MISSING** | `index.html` WebSite block | Ineligible for Sitelinks Searchbox |

### Medium Errors
- `sameAs` only has LinkedIn — add more when Clutch/DesignRush profiles created
- `contactPoint` missing from Organization schema
- `serviceType` missing from Service schema
- `wordCount` missing from BlogPosting
- `alumniOf: []` empty array on Person — remove it
- `ListItem` has invalid `description` property (`seo-schemas.ts:531`)

---

## Sitemap: 661 URLs

### URL Distribution
| Category | URLs |
|----------|------|
| Core pages (4 locale) | 36 |
| Service category + detail | 60+ |
| About sub-pages | 24 |
| Blog posts (EN 30, FR 9, NL 6, DE 6) | 51 |
| City + city-service pages | ~400 |
| Template detail (EN only) | 20 |
| Case studies (EN only) | 6 |
| Legal pages | 20 |
| **MISSING: Technologies** | 0 |
| **MISSING: Industries** | 0 |

### Sitemap Issues
- EN blog `lastmod` all set to `2026-02-28` — should use `articles.ts` per-article `date`
- Legal pages should be removed from sitemap (noindex pages) — saves 20 URLs
- Technologies and Industries routes exist in App.tsx → not in sitemap (HIGH priority add)
- FR project case studies lack `hreflang="fr"` in sitemap entries
- UK-only city hreflang includes NL/DE/FR — illogical

### On-Page Titles (10/15 exceed 60 chars)

| Page | Current | Fix |
|------|---------|-----|
| pricing | 75 chars | "Website Pricing — From €497 \| DMC Kreatif" |
| homepage | 74 chars | "DMC Kreatif — Premium Web Agency for Europe" |
| services | 72 chars | "Web Development Services — Europe \| DMC Kreatif" |
| caseStudies | 72 chars | "Case Studies — European Business Results \| DMC Kreatif" |
| portfolio | 69 chars | "Portfolio — 33+ European Projects \| DMC Kreatif" |
| blog | 65 chars | "Web Development Blog — Europe \| DMC Kreatif" |

**Also:** `seo.team.description` has duplicate phrase ("Frontend engineers, UX designers, SEO specialists" repeated).

---

## AI Search Readiness (GEO): 85/100

| Signal | Status |
|--------|--------|
| `llms.txt` | ✓ EXISTS — comprehensive (facts, pricing, portfolio, FAQ, founder) |
| AI crawlers in robots.txt | ✓ All major crawlers allowed |
| Content citability | ✓ Technical posts have specific, structured, factual claims |
| Entity clarity | ✓ "DMC Kreatif = boutique web agency, 2023, European focus" |
| Brand mention signals | ⚠️ Only LinkedIn, no Clutch/DesignRush |
| `dateModified` on blog posts | ❌ Missing — freshness signal absent |
| FAQ structured data | ❌ Missing on service pages (AI Overview signal) |

---

## Visual Assessment

### Desktop (1440px)
- Design: Cream background + lime accent + Syne font — on-brand ✓
- Navigation: Full menu with language switcher visible ✓
- ⚠️ Two-brand logo ("DMC KREATIF / GMG DESIGN") — confusing brand signal, GMG Design separate brand
- ⚠️ CTA buttons below fold at 1440px (user must scroll to see primary actions)
- ⚠️ White box artifact visible right side of screen (possible CLS)

### Mobile (390px)
- Responsive, text readable ✓
- H1 visible above fold ✓
- CTA buttons visible (stacked) ✓
- WhatsApp button accessible ✓

### HTTP Layer
| Check | Status |
|-------|--------|
| HTTPS | ✓ |
| HSTS preload | ✓ |
| HTML caching | ❌ no-cache, no-store |
| Serving CDN | ✓ Hostinger hcdn |

---

## Confirmed Strengths
- HTTPS + full security headers suite ✓
- Self-hosted fonts (no Google Fonts) ✓
- noscript fallback with rich content ✓
- 5 legal pages (GDPR compliance visible) ✓
- llms.txt comprehensive ✓
- robots.txt AI-crawler-friendly ✓
- Code splitting via lazy imports ✓
- WebP images + lazy loading on key pages ✓
- 22 schema types — most comprehensive in class ✓
- 4-language site with hreflang ✓
- RSS feed ✓
- 51 blog posts across 4 languages ✓
