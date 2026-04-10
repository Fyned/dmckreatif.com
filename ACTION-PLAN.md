# SEO Action Plan — dmckreatif.com
**Audit Date:** 2026-04-10 | **Current Score:** 54/100 | **Target (4 weeks):** 75/100

---

## CRITICAL — Fix Immediately (Score Impact: +15-20 pts)

### C1. Fix Fabricated Numbers Across All Locales
**Issue:** EN says 33 projects/4 countries/28 team. FR/NL/DE say 200+ projects/12+ countries/100-150+ team. This is the #1 trust destroyer — Google QRG classifies this as "deceptive practices."
**Fix:** Align ALL locales to real figures: ~8 projects, 1 founder + freelance network, 3-4 countries
**Files:**
- `src/i18n/locales/en.json` — hero stats, about section
- `src/i18n/locales/fr.json` — hero, services, milestone timeline
- `src/i18n/locales/nl.json` — hero stats
- `src/i18n/locales/de.json` — hero stats
- `src/pages/TeamPage.tsx` — "28-strong core team" claim
- `src/pages/WhyUsPage.tsx` — "200+ projects, 6 countries"
**Impact:** E-E-A-T trust score 20 → 60 (+40 pts in category, +10 overall)

---

### C2. Slash Location Pages (Quality Gate HARD STOP)
**Issue:** 241 location pages (171 city slugs) = 4.8x the 50-page threshold. Doorway page pattern.
**Fix Option A (Recommended):** Reduce to 10-15 top cities with 60%+ unique content per page
**Fix Option B:** Remove all location pages until unique content exists, redirect to services page
**Files:** `src/data/cities/`, `public/sitemap.xml`, `src/App.tsx` routes
**Impact:** Removes doorway page penalty risk, improves crawl budget

---

### C3. Fix 3-Hop Redirect Chain from Root
**Issue:** `dmckreatif.com` → `/en` → `/en/` = 3 hops. www is now 3 hops too (worsened).
**Fix:** Single redirect: root → `/en/` directly. www → `/en/` directly.
**File:** `public/.htaccess`
```apache
RewriteRule ^$ /en/ [R=301,L]
```
**Impact:** Crawl budget, PageRank preservation

---

### C4. Fix Trailing Slash Mismatch (641 URLs → 301)
**Issue:** All sitemap `<loc>` URLs lack trailing slash but server adds it → every URL 301s
**Fix:** Add trailing slash to ALL `<loc>` values in sitemap.xml, AND update canonical/hreflang URLs
**Files:** `public/sitemap.xml`, `src/components/seo/SeoHead.tsx`
**Impact:** Eliminates 641 unnecessary redirects per crawl cycle

---

### C5. Add H1 to 4 Major Pages
**Issue:** PortfolioPage, PricingPage, ContactPage, BlogPage all missing H1
**Fix:** Add `<h1>` or pass `headingLevel="h1"` to SectionHeader on each page
**Files:**
- `src/pages/PortfolioPage.tsx` — SectionHeader defaults to H2
- `src/pages/PricingPage.tsx` — jumps straight to H3
- `src/pages/ContactPage.tsx` — SectionHeader defaults to H2
- `src/pages/BlogPage.tsx` — SectionHeader defaults to H2
**Impact:** Primary heading signal restored on 4 key pages

---

### C6. Fix BlogPostPage Duplicate H1
**Issue:** Loading state H1 (line 213) AND content H1 (line 364) both render
**Fix:** Change loading state heading to `<h2>` or `<p>`
**File:** `src/pages/BlogPostPage.tsx`

---

### C7. Fix Price Contradictions
**Issue:** EN: "from EUR 497" vs FR: "à partir de 349 EUR". Multiple price conflicts.
**Fix:** Align all locale pricing to the same EUR values
**Files:** `src/i18n/locales/en.json`, `src/i18n/locales/fr.json`

---

## HIGH — Fix This Week (Score Impact: +8-12 pts)

### H1. Remove Duplicate ProfessionalService Schema
**Issue:** index.html @graph AND TestimonialsMarquee.tsx both emit ProfessionalService with same `@id`
**Fix:** Remove ProfessionalService from index.html @graph, keep only TS builder version (which has telephone)
**Files:** `index.html` (remove lines 61-130), `src/components/home/TestimonialsMarquee.tsx` (keep)

### H2. Add Internal Links to 6 Dead-End Pages
**Issue:** PricingPage, ContactPage, BlogPage, CareersPage, ServicesPage, WhyUsPage — all 0 internal links
**Fix:** Add minimum 3 relevant cross-links to each page
**Files:** 6 page components

### H3. Fix Cache-Control Headers
**Issue:** `no-cache, must-revalidate` on HTML prevents any caching. CDN always BYPASS.
**Fix:** Use `public, max-age=300, s-maxage=3600` for CDN caching
**File:** `public/.htaccess`

### H4. Remove X-Frame-Options Header
**Issue:** Contradicts CSP `frame-ancestors 'none'`
**Fix:** Remove X-Frame-Options, CSP is sufficient
**File:** `public/.htaccess`

### H5. Remove Retry-After Header on 200 Responses
**Issue:** `Retry-After: 60` on 200 status is wrong signal, may throttle crawlers
**Fix:** Remove from .htaccess
**File:** `public/.htaccess`

### H6. Fix Person @id Inconsistency
**Issue:** index.html uses `/#founder`, buildPersonProfileSchema uses `#founder` (no slash)
**Fix:** Standardize to `${BASE_URL}/#founder` everywhere
**Files:** `index.html`, `src/lib/seo-schemas.ts`

### H7. Add Person Image to Schema
**Issue:** Founder Person entity has no `image` property
**Fix:** Add founder photo URL (requires actual photo upload first)
**File:** `index.html` Person entity, `src/lib/seo-schemas.ts`

### H8. Fix AggregateRating Mismatch
**Issue:** Schema says 5.0, UI shows 4.9
**Fix:** Align schema ratingValue to 4.9
**Files:** `index.html`, `src/lib/seo-schemas.ts`

### H9. Move GrapesJS to devDependencies
**Issue:** 1.1MB chunk in production bundle, only used in EditorPage
**Fix:** Move to devDependencies or lazy-load only on EditorPage route
**File:** `package.json`

### H10. Optimize Oversized SVG Logos
**Issue:** ata.svg (308KB), mkn.svg (117KB) — unoptimized embedded bitmaps
**Fix:** Run SVGO or convert to WebP
**Files:** `public/portfolio/` SVG files

### H11. Optimize Portfolio Images
**Issue:** mkn-desktop.webp (286KB), cakir-desktop.webp (283KB), altinbas-desktop.webp (271KB)
**Fix:** Re-compress to quality 75-80, max-width 800px, target <120KB each
**Files:** `public/portfolio/` WebP files

### H12. Add BreadcrumbList to ServiceDetailPage
**Fix:** Add `buildBreadcrumbSchema()` call
**File:** `src/pages/ServiceDetailPage.tsx`

---

## MEDIUM — Fix This Month (Score Impact: +5-8 pts)

### M1. Translate FR/NL/DE Content Bodies
**Issue:** 60-70% of non-EN page content is English fallback → duplicate content risk
**Fix:** Add translated body content or noindex non-EN pages until translated
**Files:** `src/i18n/locales/{fr,nl,de}.json`

### M2. Expand Thin Content Pages
| Page | Current | Target |
|------|---------|--------|
| About | ~350w | 500w |
| Portfolio | ~200w | 300w |
| Blog Index | ~100w | 200w |
| Contact | ~250w | 300w |
| AuthorPage | ~450w | 500w |

### M3. Fix Lastmod Dates in Sitemap
**Issue:** 97% of URLs share 2 bulk-stamped dates
**Fix:** Auto-generate sitemap at build time from data layer with real dates
**File:** New `scripts/generate-sitemap.ts`

### M4. Fix Blog Hreflang Cross-Linking
**Issue:** Each locale's blog posts only self-reference, no cross-locale alternates
**Fix:** Link EN↔FR↔NL↔DE equivalents bidirectionally
**Files:** `public/sitemap.xml`, `src/components/seo/SeoHead.tsx`

### M5. Wrap Hardcoded Strings in ServicesPage
**Issue:** ~40 hardcoded English strings not using `t()` i18n calls
**Fix:** Move to `en.json` keys, wrap with `t()`
**File:** `src/pages/ServicesPage.tsx`

### M6. Add FAQ Schema to FaqAccordion Sections
**Fix:** Add FAQPage JSON-LD when FAQ content is present
**File:** `src/lib/seo-schemas.ts`

### M7. Fix offers.price Type
**Issue:** String instead of number in `buildServiceSchema`
**Fix:** Convert price params to number type
**File:** `src/lib/seo-schemas.ts`

### M8. Add `@id` to City/Country Schemas
**Issue:** ProfessionalService entities without @id cause disambiguation issues
**Fix:** Add unique `@id` per city/country schema
**File:** `src/lib/seo-schemas.ts`

### M9. Add fetchPriority="high" on Homepage Hero
**Fix:** Add `fetchPriority="high"` and `<link rel="preload">` for LCP image
**File:** `src/components/home/HeroSection.tsx`, `index.html`

### M10. Trim Long Meta Descriptions
**Issue:** about (163ch), team (164ch), author (170ch) exceed 160ch
**Fix:** Trim by 5-10 characters each
**File:** `src/i18n/locales/en.json`

### M11. Trim Partners Title Tag
**Issue:** 68 characters, may truncate in SERPs
**Fix:** Reduce to under 60ch
**File:** `src/i18n/locales/en.json`

### M12. Remove Skill Percentage Bars
**Issue:** React 98%, TypeScript 95% vanity metrics signal junior portfolio, undermines premium positioning
**Fix:** Replace with project-based expertise demonstration
**File:** `src/pages/AuthorPage.tsx`

### M13. Fix og:locale from en_US to en_GB
**Fix:** Site targets UK market, should use `en_GB`
**File:** `src/components/seo/SeoHead.tsx`

### M14. Add Missing Pages to Sitemap
- 12 technology detail pages
- 8 industry detail pages
- Template detail pages
**File:** `public/sitemap.xml`

### M15. Oversized Locale Chunks
**Issue:** fr.js 157KB, de.js 133KB, nl.js 127KB — if only SEO meta, these are too large
**Fix:** Audit locale file contents, remove unnecessary translations
**Files:** `src/i18n/locales/{fr,nl,de}.json`

---

## LOW — Backlog

### L1. Implement Prerendering (vite-plugin-prerender)
Long-term fix for SPA JS-dependency. Static HTML for all major routes.

### L2. Add Cloudflare CDN (Free Tier)
Fixes Hostinger hcdn BYPASS issue. TTFB improvement ~200ms.

### L3. Auto-Generate Sitemap from Data Layer
`scripts/generate-sitemap.ts` — reads all data modules, outputs sitemap at build time.

### L4. Add Blog Search with ?q= Parameter
Enables SearchAction Sitelinks Searchbox.

### L5. Add Author Schema Per Blog Post
dateModified signals, author attribution for AI citation readiness.

### L6. Add twitter:site Handle
Missing from SeoHead component.

---

## External Actions (Not Code — High Impact)

| Action | Impact | Effort |
|--------|--------|--------|
| **Upload founder real photo** | E-E-A-T: +10 pts | Low |
| Register on Clutch.co | Authority: +10 pts | Medium |
| Register on Google Business Profile (UK) | Trust/GEO: +5 pts | Low |
| Add UK Companies House number | Trust: +5 pts | Low |
| Register on DesignRush/Sortlist | Authority: +5 pts | Low |
| Get client testimonial photos | Trust: +3 pts | Medium |
| Add GitHub profile to sameAs | Authority: +2 pts | Low |

---

## Score Projections

| Phase | Actions | Expected Score |
|-------|---------|----------------|
| Current | — | 54/100 |
| After Critical (C1-C7) | ~2-3 days | 69/100 |
| After High (H1-H12) | ~1 week | 75/100 |
| After Medium (M1-M15) | ~3 weeks | 80/100 |
| After Low + External | ~6 weeks | 87/100 |

---

## Comparison with Previous Audit (2026-04-06)

### Fixed Since Last Audit
- Title lengths: Blog (18→43ch), Contact (21→60ch), WhyUs (22→47ch)
- Description lengths: WhyUs (63→155ch), Contact (79→145ch)
- H2 skips: ServicesPage, WhyUsPage, CareersPage — resolved
- ProcessPage schema: BreadcrumbList + WebPage added
- Empty alumniOf array: removed

### Worsened
- www redirect chain: 2 hops → 3 hops
- Overall score: 68 → 54 (expanded scope revealed deeper issues)

### Unchanged (Still Broken)
- 4 pages missing H1
- All sitemap URLs → 301
- 3-hop root redirect chain
- Duplicate ProfessionalService schema
- 6 pages with zero internal links
- CDN BYPASS on all responses
- Portfolio images oversized

### NEW Issues Found
- Fabricated numbers across locales (C1) — most critical finding
- 241 location pages quality gate breach (C2)
- Price contradictions EN vs FR (C7)
- GrapesJS 1.1MB in production (H9)
- SVG logos 308KB+ unoptimized (H10)
- Skill percentage vanity metrics (M12)
- AI Search Readiness score: 25/100 (new category)
