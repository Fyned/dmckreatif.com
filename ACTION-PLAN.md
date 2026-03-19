# SEO Action Plan — dmckreatif.com
**Audit Date:** 2026-03-19 | **Current Score:** 70/100 | **Target (4 weeks):** 83/100

---

## CRITICAL — Fix Immediately (indexability at risk)

### C1. Remove static canonical from index.html
**File:** `index.html:24`
**Fix:** Delete this line entirely:
```html
<!-- DELETE THIS LINE -->
<link rel="canonical" href="https://dmckreatif.com/en" />
```
**Why:** When prerendering fails, ALL pages share this canonical → Google treats entire site as duplicate of homepage.

---

### C2. Fix static hreflang fallback
**File:** `index.html:47-52`
**Fix:** Replace the 4 locale links with x-default only:
```html
<!-- REPLACE WITH: -->
<link rel="alternate" hreflang="x-default" href="https://dmckreatif.com/en" />
```
**Why:** Current static hreflang tells Google every inner page's alternate is the homepage.

---

### C3. Fix html lang attribute
**File:** `index.html:2`
**Fix:**
```html
<!-- FROM: -->
<html lang="en" prefix="og: https://ogp.me/ns#">
<!-- TO: -->
<html lang="x-default" prefix="og: https://ogp.me/ns#">
```
**Why:** /fr, /nl, /de pages briefly show `lang="en"` before Helmet fires.

---

### C4. Fix HTML Cache-Control
**File:** `public/.htaccess:53-55`
**Fix:**
```apache
<!-- FROM: -->
<FilesMatch "\.(html)$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
<!-- TO: -->
<FilesMatch "\.(html)$">
  Header set Cache-Control "no-cache, must-revalidate"
</FilesMatch>
```
**Why:** `no-store` blocks all caching layers. `no-cache` with `must-revalidate` allows 304 conditional GETs.

---

### C5. Fix duplicate BreadcrumbList schema
**File:** `src/components/ui/Breadcrumbs.tsx` + all page files that call `buildBreadcrumbSchema()` directly
**Fix Option A (Recommended):** Remove the `JsonLd` output from `Breadcrumbs.tsx` and keep only per-page explicit calls with proper `currentPageName`.
**Fix Option B:** Remove all explicit `buildBreadcrumbSchema()` calls from page files, rely only on `Breadcrumbs.tsx` component.
**Why:** Google receives 2 conflicting BreadcrumbList blocks on every inner page.

---

## HIGH — Fix This Week

### H1. Fix BlogPosting image → ImageObject
**File:** `src/lib/seo-schemas.ts:284`
```typescript
// FROM:
image: params.image ?? `${BASE_URL}/og-image.png`,
// TO:
image: {
  "@type": "ImageObject",
  url: params.image ?? `${BASE_URL}/og-image.png`,
  width: 1200,
  height: 630,
},
```
**Impact:** Unblocks Article rich results on ALL 42+ blog posts.

---

### H2. Fix logo → ImageObject (3 locations)
**Files:** `index.html:71`, `src/lib/seo-schemas.ts:34`, `src/lib/seo-schemas.ts:330`
```typescript
// FROM:
logo: `${BASE_URL}/logo.svg`,
// TO:
logo: {
  "@type": "ImageObject",
  url: `${BASE_URL}/logo.svg`,
  width: 200,
  height: 60,
},
```
And in `index.html`:
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://dmckreatif.com/logo.svg",
  "width": 200,
  "height": 60
}
```

---

### H3. Add WebSite SearchAction (Sitelinks Searchbox)
**File:** `index.html` — WebSite block (lines 153-160)
```json
{
  "@type": "WebSite",
  "@id": "https://dmckreatif.com/#website",
  "name": "DMC Kreatif",
  "url": "https://dmckreatif.com",
  "inLanguage": ["en", "fr", "nl", "de"],
  "publisher": { "@id": "https://dmckreatif.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://dmckreatif.com/en/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```
**Note:** Only add if blog supports `?q=` search filtering.

---

### H4. Fix BreadcrumbList null path guard
**File:** `src/lib/seo-schemas.ts:136-161`
Add guard for empty items array:
```typescript
// At start of buildBreadcrumbSchema function:
const baseItems = items.length === 0 && currentPageName
  ? [{ name: "Home", path: "" }]
  : items;
// Then use baseItems instead of items
```

---

### H5. Remove H1 from Framer Motion hidden container (LCP fix)
**File:** `src/components/home/HeroSection.tsx`
Remove `initial="hidden"` from the outer `motion.div` wrapping the H1, or render H1 outside any Framer Motion container entirely.
**Why:** H1 text is likely LCP element. `opacity:0` at start delays LCP measurement.

---

### H6. Fix title lengths (10 pages over 60 chars)
**File:** `src/i18n/locales/en.json`
```json
"seo": {
  "home": { "title": "DMC Kreatif — Premium Web Agency for Europe" },
  "services": { "title": "Web Development Services — Europe | DMC Kreatif" },
  "portfolio": { "title": "Portfolio — 33+ European Projects | DMC Kreatif" },
  "pricing": { "title": "Website Pricing — From €497 | DMC Kreatif" },
  "blog": { "title": "Web Development Blog — Europe | DMC Kreatif" },
  "caseStudies": { "title": "Case Studies — European Business Results | DMC Kreatif" },
  "technologies": { "title": "Technologies — React, Next.js, TypeScript | DMC Kreatif" },
  "whyUs": { "title": "Why Choose DMC Kreatif — 8 Key Reasons | Europe" }
}
```

---

### H7. Add Technologies and Industries to sitemap
**File:** `public/sitemap.xml`
Add all `/:locale/technologies`, `/:locale/technologies/:slug`, `/:locale/industries`, `/:locale/industries/:slug` URLs for all 4 locales.

---

### H8. Fix EN blog lastmod dates
**File:** `public/sitemap.xml`
Each EN blog post's `<lastmod>` should match its `date` field in `src/data/blog/articles.ts`. Currently all set to `2026-02-28`.

---

### H9. Fix geo coordinates in index.html
**File:** `index.html:84-88`
```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 51.4513,
  "longitude": 0.0515
},
"address": {
  "@type": "PostalAddress",
  "streetAddress": "Unit 6 Hill View Studios, 160 Eltham Hill",
  "addressLocality": "London",
  "postalCode": "SE9 5EA",
  "addressRegion": "England",
  "addressCountry": "GB"
}
```

---

### H10. Fix path normalisation in SeoHead
**File:** `src/components/seo/SeoHead.tsx` (near line 55-67)
```typescript
// Add before building hreflang URLs:
const normPath = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
// Use normPath instead of path in URL construction
```

---

## MEDIUM — Fix This Month

### M1. Resolve "28-strong team" contradiction
**File:** `src/i18n/locales/en.json` — `about.description`, `seo.about.description`
Change to accurately describe as "boutique agency with vetted specialist network" — not "28-strong core team." This is a trust-destroying inconsistency.

### M2. Add author bylines to all blog posts
**File:** `src/data/blog/articles.ts`
Add `author: "Musa Kerem Demirci"` field to every article. Render in `BlogPostPage.tsx` with link to `/en/about/musa-kerem-demirci`.
**Why:** Sept 2025 QRG requires identifying who has the experience.

### M3. Add contactPoint to Organization schema
**File:** `index.html` + `src/lib/seo-schemas.ts`
```json
"contactPoint": {
  "@type": "ContactPoint",
  "email": "hello@dmckreatif.com",
  "contactType": "customer service",
  "availableLanguage": ["English", "French", "Dutch", "German"],
  "areaServed": ["FR", "BE", "GB", "NL", "DE"]
}
```

### M4. Fix team page description duplicate
**File:** `src/i18n/locales/en.json` — `seo.team.description`
Remove repeated "Frontend engineers, UX designers, SEO specialists" phrase.

### M5. Remove legal pages from sitemap
**File:** `public/sitemap.xml`
Remove: privacy, terms, legal, cookie-policy, refund-policy URLs (all 4 locales = 20 URLs). These pages shouldn't be indexed.

### M6. Fix UK-city hreflang targeting
**File:** `public/sitemap.xml`
UK-only cities (Edinburgh, Glasgow, Bristol, Birmingham, Leeds, Manchester) — remove NL/DE hreflang entries. Only EN + x-default makes sense for these.

### M7. Add FR project hreflang to case studies
**File:** `public/sitemap.xml`
Add `hreflang="fr"` to: cakir-facades, altinbas-moustiquaire, consulting-energy, iso-home-energy, archi-construction case study pages.

### M8. Fix Supabase promo banner 406 error
**File:** Supabase — campaigns table RLS or query
The promo campaign query fails with 406 on every page load. Add proper error handling or fix the Supabase query. Current state: console error on every visit.

### M9. Add fetchpriority="high" on LCP images
**File:** `src/pages/CaseStudyDetailPage.tsx:224`
```tsx
<img fetchpriority="high" loading="eager" ... />
// Remove loading="lazy" from the first/hero image
```

### M10. Add serviceType to Service schema
**File:** `src/lib/seo-schemas.ts` — `buildServiceSchema()` return
```typescript
serviceType: params.name,
```

### M11. Expand Digital Marketing service description
**File:** `src/i18n/locales/en.json:61`
Expand from 12 words to 200+ words with methodology, tools, and specific outcomes (matches depth of Web Development and SEO descriptions).

### M12. Preload remaining font files
**File:** `index.html:18-19`
Add preload for all 6 self-hosted font files. Also reduce from 9 weights to 3-4 max (per CLAUDE.md P1 action).

### M13. Remove invalid ListItem description
**File:** `src/lib/seo-schemas.ts:531`
```typescript
// Remove this line:
description: project.description,
// `description` is not valid on ListItem
```

### M14. Remove empty alumniOf
**File:** `src/lib/seo-schemas.ts:762`
```typescript
// Remove this line:
alumniOf: [],
```

### M15. Add dateModified to blog articles
**File:** `src/data/blog/articles.ts`
Add `lastModified` field to articles reviewed/updated after initial publication. Use in `buildBlogPostingSchema()`.

---

## LOW — Backlog

### L1. Implement URL-based blog pagination
**File:** `src/pages/BlogPage.tsx`
Replace "Load More" state with numbered pagination and distinct URLs (`/blog/page/2`). Minimum: confirm all article slugs remain in sitemap.

### L2. Improve prerendering reliability
**File:** `vite.config.ts`
Replace Puppeteer-dependent prerender with `vite-plugin-prerender` (static, no browser dependency, works on Windows). Or migrate to Next.js App Router (SSG).

### L3. Auto-generate sitemap from data layer
**File:** New `scripts/generate-sitemap.ts`
Read from `allArticles`, `allServices`, `allCities`, `allIndustries`, `allTechnologies` and output `dist/sitemap.xml` at build time. Similar pattern to existing `scripts/generate-rss.ts`.

### L4. Add blog search with ?q= parameter
**File:** `src/pages/BlogPage.tsx`
Enable SearchAction Sitelinks Searchbox (H3 above) by making blog filterable via URL parameter.

### L5. Expand city pages from 130-200 → 500+ words
**File:** `src/i18n/locales/en-cities.json` (all 34 cities)
Priority cities first: Paris, London, Berlin, Amsterdam, Brussels.
Each city needs: local business landscape (100-150 words), specific market approach (100 words), local statistics or market data (50-100 words), expanded benefits with full sentences.

### L6. Consider reducing city count to 8-10 core cities
If L5 content expansion is too slow, reducing from 34 cities to 8-10 primary markets (Paris, Lyon, London, Brussels, Amsterdam, Berlin, Hamburg, Zurich) eliminates 136 thin pages risk while preserving SEO value for top markets.

### L7. Add sameAs URLs when available
**File:** `src/lib/seo-schemas.ts:88-90` + `index.html:99`
When Clutch, DesignRush, or Sortlist profiles are created, add to `sameAs` array.

---

## External Actions (Not Code — High Impact)

| Action | Impact | Effort |
|--------|--------|--------|
| Add founder real photo | E-E-A-T: +8 pts | Low (upload photo) |
| Register on Clutch.co | Authority: +10 pts | Medium (profile setup) |
| Register on Google Business Profile (UK) | Trust/GEO: +5 pts | Low |
| Register on DesignRush/Sortlist | Authority: +5 pts | Low |
| Add UK Companies House number to footer/legal page | Trust: +4 pts | Low |
| Replace Turkish +90 phone with UK/EU number | Trust: +3 pts | Medium |
| Add testimonial headshot photos | Trust: +3 pts | Medium (get from clients) |
| Expand LinkedIn to 500+ followers | Authority: +3 pts | Ongoing |

---

## Score Projections

| Phase | Actions | Expected Score |
|-------|---------|----------------|
| Current | — | 70/100 |
| After Critical (C1-C5) | ~1 day | 73/100 |
| After High (H1-H10) | ~1 week | 78/100 |
| After Medium (M1-M15) | ~3 weeks | 81/100 |
| After Low + External | ~6 weeks | 86/100 |

---

## Files Changed Summary

| File | Actions | Priority |
|------|---------|----------|
| `index.html` | C1, C2, C3, H2, H3, H9 | Critical |
| `public/.htaccess` | C4 | Critical |
| `src/components/ui/Breadcrumbs.tsx` | C5 | Critical |
| `src/lib/seo-schemas.ts` | H1, H2, H4, M3, M10, M13, M14 | Critical-High |
| `src/components/home/HeroSection.tsx` | H5 | High |
| `src/i18n/locales/en.json` | H6, M1, M4, M11 | High-Medium |
| `public/sitemap.xml` | H7, H8, M5, M6, M7 | High-Medium |
| `src/components/seo/SeoHead.tsx` | H10 | High |
| `src/pages/CaseStudyDetailPage.tsx` | M9 | Medium |
| `src/data/blog/articles.ts` | M2, M15 | Medium |
| `src/pages/BlogPostPage.tsx` | M2 (render author) | Medium |
