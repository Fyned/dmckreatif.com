# SEO Action Plan — dmckreatif.com
**Audit Date:** 2026-04-06 | **Current Score:** 68/100 | **Target (4 weeks):** 82/100

---

## CRITICAL — Fix Immediately

### C1. SPA Content JS-Dependent (Indexability Blocker)
**Issue:** `<div id="root">` is empty except cookie banner — all body content requires JS execution
**Fix:** Install `vite-plugin-prerender` or switch to SSR/SSG framework
**Files:** `vite.config.ts`, `package.json`
**Impact:** Googlebot second-wave rendering delays indexing by days; some pages may never be indexed

---

### C2. 3-Hop Redirect Chain from Root
**Issue:** `dmckreatif.com` → 301 → `/en` → 301 → `/en/` → 200
**Fix:** Configure `.htaccess` to serve root directly to `/en/` in one hop
**File:** `public/.htaccess`
**Impact:** PageRank dilution, crawl budget waste on every visit

---

### C3. All 661 Sitemap URLs Return 301
**Issue:** Server trailing-slash mismatch — every `<loc>` in sitemap triggers redirect
**Fix:** Align sitemap URLs with server canonical (add or remove trailing slashes consistently)
**Files:** `public/sitemap.xml`, `public/.htaccess`
**Impact:** Googlebot wastes crawl budget following 661 redirects per sitemap crawl

---

### C4. 4 Pages Missing H1
**Issue:** PortfolioPage, PricingPage, ContactPage, BlogPage have no H1 element
**Fix:** Change `SectionHeader` to accept `headingLevel` prop or add explicit `<h1>` to each page
**Files:**
- `src/pages/PortfolioPage.tsx` — SectionHeader defaults to H2
- `src/pages/PricingPage.tsx` — first heading is `<motion.h2>`
- `src/pages/ContactPage.tsx` — SectionHeader defaults to H2
- `src/pages/BlogPage.tsx` — SectionHeader defaults to H2
**Impact:** Missing H1 = no primary heading signal for Google on 4 major pages

---

### C5. Duplicate ProfessionalService Schema
**Issue:** Two JSON-LD blocks with same `@id: #organization` (index.html + TestimonialsMarquee)
**Fix:** Remove duplicate from TestimonialsMarquee, keep only index.html `@graph` version
**Files:** `index.html`, `src/components/home/TestimonialsMarquee.tsx`
**Impact:** Entity conflict confuses Knowledge Graph

---

### C6. AggregateRating Mismatch
**Issue:** Schema says `ratingValue: 5.0` but UI shows `4.9`
**Fix:** Align schema to match visible UI value (4.9)
**Files:** `index.html` or `src/lib/seo-schemas.ts`
**Impact:** Schema/UI mismatch = manual action risk

---

### C7. Title Lengths Critical (<25 chars)
**Issue:** Blog (18), Contact (21), WhyUs (22) — far too short for SERP
**Fix:** Expand to 50-60 character range
**File:** `src/i18n/locales/en.json`
```
Blog: "Web Development Blog — Tips & Insights | DMC Kreatif" (54)
Contact: "Contact DMC Kreatif — Get a Free Quote | Europe" (49)
WhyUs: "Why Choose DMC Kreatif — 8 Reasons for European Businesses" (59)
```

---

## HIGH — Fix This Week

### H1. Blog Hreflang Orphans
**Issue:** Blog posts only self-reference, no cross-locale alternates
**Fix:** Add `hreflang="x-default"` pointing to EN version for all blog posts
**File:** `src/components/seo/SeoHead.tsx` or `src/pages/BlogPostPage.tsx`

### H2. CSP vs X-Frame-Options Contradiction
**Issue:** `frame-ancestors 'none'` contradicts `X-Frame-Options: SAMEORIGIN`
**Fix:** Align both — use `frame-ancestors 'self'` or remove X-Frame-Options
**File:** `public/.htaccess`

### H3. HTML Cache-Control no-cache on Every Visit
**Issue:** `no-cache, must-revalidate` prevents any caching layer
**Fix:** Add `s-maxage=3600` for CDN or adjust to `no-cache` only (allow 304s)
**File:** `public/.htaccess`

### H4. Title Lengths High (<40 chars)
**Issue:** Services (39), Pricing (38), Team (37) — below optimal
**Fix:** Expand to 50-60 character range
**File:** `src/i18n/locales/en.json`

### H5. Description Lengths Critical (<80 chars)
**Issue:** WhyUs (63), Contact (79) — too short for rich snippets
**Fix:** Expand to 150-160 character range
**File:** `src/i18n/locales/en.json`

### H6. Description Lengths High (<100 chars)
**Issue:** Portfolio (92), Blog (92), Pricing (95)
**Fix:** Expand to 150-160 character range
**File:** `src/i18n/locales/en.json`

### H7. Person Entity Missing Image
**Issue:** Founder Person schema has no `image` property
**Fix:** Add founder photo URL to Person schema
**File:** `src/lib/seo-schemas.ts`

### H8. WebSite Missing SearchAction
**Issue:** No `potentialAction` on WebSite schema
**Fix:** Add SearchAction if blog supports `?q=` search
**File:** `index.html`

### H9. ServiceDetailPage Missing BreadcrumbList
**Fix:** Add `buildBreadcrumbSchema()` call to ServiceDetailPage
**File:** `src/pages/ServiceDetailPage.tsx`

### H10. offers.price is String Not Number
**Fix:** Convert price values to numbers in schema output
**File:** `src/lib/seo-schemas.ts`

### H11. ProfessionalService Missing telephone
**Fix:** Add telephone to index.html Organization schema
**File:** `index.html`

### H12. 239 Location Pages Exceed Quality Gate
**Issue:** HARD STOP threshold (50+) breached; content uniqueness unverified
**Fix:** Either reduce to 8-10 core cities OR ensure 60%+ unique content per page
**Files:** `src/data/cities/`, `public/sitemap.xml`

---

## MEDIUM — Fix This Month

### M1. FR/NL/DE Pages Render EN Content Body
**Issue:** Only meta differs — body content is English everywhere → duplicate content risk
**Fix:** Add translated body content or noindex non-EN pages until translated
**Files:** `src/i18n/locales/{fr,nl,de}.json`

### M2. Content Depth Failures (4 Pages)
**Issue:** Services (~450w), Portfolio (~250w), Contact (~200w), Blog Index (~200w) below minimums
**Fix:** Add meaningful content to reach minimums (800, 500, 300, 300)
**Files:** Respective page components + `en.json`

### M3. E-E-A-T Gaps
**Issue:** Founder bio 2 sentences, no photo; only 1 sameAs (LinkedIn); no visible address
**Fix:** Expand bio, add photo, add Clutch/Trustpilot/DesignRush links
**Files:** `src/lib/seo-schemas.ts`, `index.html`, about page

### M4. H2 Skipped on 3 Pages
**Issue:** ServicesPage, WhyUsPage, CareersPage skip H2 level
**Fix:** Ensure heading hierarchy H1 → H2 → H3 (no skips)

### M5. BlogPostPage Has 2 H1 Elements
**Issue:** Error state + article both have H1
**Fix:** Change error state heading to H2 or `<p>`

### M6. PricingPage Only 1 Internal Link
**Issue:** Needs 3+ internal links for proper crawl distribution
**Fix:** Add links to Services, Portfolio, Contact

### M7. CareersPage Zero Internal Links
**Issue:** Dead-end page — no outgoing links
**Fix:** Add cross-links to About, Team, Contact

### M8. ~24 Hardcoded English Strings in ServicesPage
**Fix:** Move to i18n keys
**File:** `src/pages/ServicesPage.tsx`

### M9. Missing Schema on 4 Pages
| Page | Needed Schema |
|------|--------------|
| IndustriesPage | CollectionPage + BreadcrumbList |
| TechnologiesPage | CollectionPage + BreadcrumbList |
| CareersPage | WebPage + JobPosting |
| PartnersPage | WebPage + BreadcrumbList |

### M10. Sitemap Lastmod Bulk-Stamped
**Issue:** 97% of URLs share two dates
**Fix:** Auto-generate sitemap at build time from data layer
**File:** New `scripts/generate-sitemap.ts`

### M11. CDN BYPASS on All Responses
**Issue:** Hostinger hcdn not caching any responses
**Fix:** Configure proper cache headers for static assets

### M12. www Subdomain 2-Hop Redirect
**Fix:** Configure single-hop www → non-www redirect
**File:** `public/.htaccess`

### M13. Oversized Portfolio Images (>200KB)
**Issue:** mkn-desktop.webp (288KB), cakir-desktop.webp (284KB), altinbas-desktop.webp (272KB)
**Fix:** Re-compress to <200KB target; mobile variants to <100KB
**Files:** `public/portfolio/` images

### M14. Missing Image Dimensions (CLS Risk)
**Issue:** TemplateCard.tsx, CaseStudiesPage.tsx, ClientLogoBar.tsx missing width/height
**Fix:** Add explicit width/height attributes

### M15. Add fetchpriority="high" on Hero Font
**File:** `index.html` font preload tags

---

## LOW — Backlog

### L1. Implement Prerendering
**File:** `vite.config.ts`
Install `vite-plugin-prerender` with static routes for all major pages. This is the long-term fix for C1.

### L2. Auto-Generate Sitemap from Data Layer
**File:** New `scripts/generate-sitemap.ts`
Read from all data modules, output `dist/sitemap.xml` at build time. Fixes M10 permanently.

### L3. Add Blog Search with ?q= Parameter
**File:** `src/pages/BlogPage.tsx`
Enables SearchAction Sitelinks Searchbox (H8).

### L4. Expand City Pages to 500+ Words
**Files:** `src/data/cities/`, `en.json`
Priority: Paris, London, Berlin, Amsterdam, Brussels.

### L5. Add sameAs URLs When Available
When Clutch, DesignRush, Sortlist profiles are created, add to sameAs array.

### L6. Author Bylines on Blog Posts
Add `author` field to articles.ts, render in BlogPostPage with link to founder page.

---

## External Actions (Not Code — High Impact)

| Action | Impact | Effort |
|--------|--------|--------|
| Add founder real photo | E-E-A-T: +8 pts | Low |
| Register on Clutch.co | Authority: +10 pts | Medium |
| Register on Google Business Profile (UK) | Trust/GEO: +5 pts | Low |
| Register on DesignRush/Sortlist | Authority: +5 pts | Low |
| Add UK company details to footer | Trust: +4 pts | Low |
| Get client testimonial photos | Trust: +3 pts | Medium |
| Expand LinkedIn to 500+ followers | Authority: +3 pts | Ongoing |

---

## Score Projections

| Phase | Actions | Expected Score |
|-------|---------|----------------|
| Current | — | 68/100 |
| After Critical (C1-C7) | ~2 days | 74/100 |
| After High (H1-H12) | ~1 week | 79/100 |
| After Medium (M1-M15) | ~3 weeks | 82/100 |
| After Low + External | ~6 weeks | 88/100 |

---

## Comparison with Previous Plan (2026-03-19)

| Completed Since Last | New Items |
|---------------------|-----------|
| ProcessPage schema (was missing) | 4 pages missing H1 (C4) |
| H1 LCP delay fixed (H5 done) | 239 location pages quality gate (H12) |
| Blog lastmod dates updated (H8 done) | Duplicate schema conflict (C5) |
| Scroll lock bug fixed | Title/description length failures (C7, H4-H6) |
| Supabase 406 error handled | E-E-A-T depth gaps (M3) |
| Emoji flags replaced | AggregateRating mismatch (C6) |

---

## Files Changed Summary

| File | Actions | Priority |
|------|---------|----------|
| `vite.config.ts` | C1 (prerender) | Critical |
| `public/.htaccess` | C2, C3, H2, H3, M12 | Critical |
| `public/sitemap.xml` | C3, H12, M10 | Critical |
| `src/pages/PortfolioPage.tsx` | C4 | Critical |
| `src/pages/PricingPage.tsx` | C4, M6 | Critical |
| `src/pages/ContactPage.tsx` | C4 | Critical |
| `src/pages/BlogPage.tsx` | C4 | Critical |
| `index.html` | C5, C6, H8, H11 | Critical |
| `src/components/home/TestimonialsMarquee.tsx` | C5 | Critical |
| `src/i18n/locales/en.json` | C7, H4, H5, H6, M2 | Critical-High |
| `src/lib/seo-schemas.ts` | H7, H10, M9 | High |
| `src/pages/ServiceDetailPage.tsx` | H9 | High |
| `src/components/seo/SeoHead.tsx` | H1 | High |
| `src/pages/ServicesPage.tsx` | M8 | Medium |
| `public/portfolio/` | M13 | Medium |
