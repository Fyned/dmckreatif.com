# SEO Report — dmckreatif.com
## Date: 2026-04-27
## Overall Score: 81/100 (→ same as 2026-04-20)

---

### Executive Summary

- **1 new P0 resolved:** H1 now rendered outside Framer Motion tree — LCP paint unblocked (was pending 3+ weeks)
- **1 regression:** Sitemap `<lastmod>` dates stale at 2026-03-02 for all non-blog URLs (56 days) — may reduce crawl priority
- **2 carry-over criticals:** Legal pages still crawlable without `noindex`; IndustriesPage & TechnologiesPage still missing JSON-LD (now Week 4–5 unresolved)
- **Content gap alert:** No new blog articles published since 2026-03-15 (43 days); consistency risk for freshness signals
- **4 image issues open:** BeforeAfterSlider missing `loading="lazy"`, FileUpload.tsx empty `alt`, HeroSection no `fetchpriority="high"`, Supabase initialized globally on all routes

---

### 🔴 Critical Issues (fix immediately)

#### 1. Legal Pages Missing `noindex` — **Week 5 unresolved**
5 publicly-crawlable pages with no SEO value are indexed, wasting crawl budget and risking thin-content penalties.

| File | Route |
|------|-------|
| `src/pages/PrivacyPage.tsx` | `/:locale/privacy` |
| `src/pages/TermsPage.tsx` | `/:locale/terms` |
| `src/pages/LegalNoticePage.tsx` | `/:locale/legal` |
| `src/pages/CookiePolicyPage.tsx` | `/:locale/cookie-policy` |
| `src/pages/RefundPolicyPage.tsx` | `/:locale/refund-policy` |

**Fix:** Add `<SeoHead noIndex={true} ... />` to each of the 5 page components.

---

#### 2. Sitemap `<lastmod>` Stale for All Non-Blog URLs — **New**
Every non-blog URL in `public/sitemap.xml` shows `<lastmod>2026-03-02</lastmod>` — 56 days old. Google deprioritizes crawls when lastmod is consistently stale and does not match actual content changes.

**Fix:** Update sitemap lastmod to `2026-04-27` for all homepage, services, industries, technologies, portfolio, and city page entries. Automate lastmod update on each build.

---

#### 3. No Pre-rendering (SPA Indexability) — **P0 from CLAUDE.md, ongoing**
The site is a client-side SPA with no SSR or pre-rendering. Googlebot must execute JavaScript to index content. This is the largest indexability risk for organic visibility.

**Fix:** Add `vite-plugin-prerender` (documented in CLAUDE.md P0). Priority routes: homepage, services index, 44 service detail pages, industries, technologies, blog index, contact, pricing.

---

### 🟡 Warnings (fix this week)

#### 4. IndustriesPage & TechnologiesPage Missing JSON-LD — **Week 4 unresolved**
Both listing pages lack structured data. PortfolioPage (`PortfolioPage.tsx:58`) and BlogPage (`BlogPage.tsx:57`) have `JsonLd` correctly.

| Page | File | Missing Schema |
|------|------|----------------|
| `/:locale/industries` | `src/pages/IndustriesPage.tsx` | `CollectionPage` + `ItemList` |
| `/:locale/technologies` | `src/pages/TechnologiesPage.tsx` | `CollectionPage` + `ItemList` |

**Fix:** Add `buildWebPageSchema()` + inline `ItemList` schema via `<JsonLd>` component (same pattern as `BlogPage.tsx:57`).

---

#### 5. BeforeAfterSlider Eager Image Loading — **Week 4 unresolved**
`src/components/portfolio/BeforeAfterSlider.tsx` lines 78 and 93: both `<img>` elements have `decoding="async"` and `width`/`height` but **no `loading="lazy"`**. Portfolio section renders far below the fold on all pages.

**Fix:** Add `loading="lazy"` to both `<img>` elements at lines 78 and 93.

---

#### 6. Hero Images Missing `fetchpriority="high"` — **Week 4 unresolved**
`src/components/home/HeroSection.tsx` contains no `<img>` elements — hero visuals appear to be CSS or SVG. The browser cannot automatically identify and prioritize an LCP candidate image.

**Fix:** If there is a hero background image asset, convert to `<img fetchPriority="high" loading="eager">` or add `<link rel="preload" as="image" fetchpriority="high">` in `SeoHead` for the hero asset path.

---

#### 7. Supabase Client Initialized Globally — **P0 from CLAUDE.md**
`src/lib/supabase.ts` is imported by 6 lib files (`subdomain.ts`, `site-analytics.ts`, `seed-templates.ts`, `user-sites.ts`, `asset-upload.ts`, `form-submissions.ts`). The Supabase SDK initializes on every page load, adding unnecessary bundle weight for all public visitors who never authenticate.

**Fix:** Lazy-initialize the Supabase client — move `createClient()` inside an async getter; only load on routes wrapped in `AuthGuard` or `AdminGuard`.

---

#### 8. Blog Content Gap — 43 Days Without New Articles
Last blog article published: 2026-03-15. Extended publishing gaps weaken Google's freshness signals and reduce crawl frequency.

**Target:** Minimum 1 article per week. See Content Recommendations below.

---

#### 9. Root Redirect & HSTS Missing — **P1 from CLAUDE.md**
No `.htaccess` configured for:
- Root `/` → `/{browser-locale}/` redirect (blank SPA shell risk)
- `Strict-Transport-Security` header (HSTS)

---

#### 10. Organization Schema Not Using `@graph` Pattern — **P1 from CLAUDE.md**
Multiple JSON-LD blocks are injected per page via separate `<JsonLd>` components. Google recommends a single `@graph` array for correct entity relationship parsing.

**Fix:** Refactor `src/lib/seo-schemas.ts` to produce a unified `@graph` output when multiple schemas are combined on one page.

---

#### 11. FileUpload.tsx Empty `alt` Attribute
`src/components/ui/FileUpload.tsx:157`: `<img alt="" />` — empty alt on a visible image fails both accessibility and image SEO.

**Fix:** Add descriptive alt text (e.g., `alt={t("ui.fileUpload.preview", "File preview")}`).

---

#### 12. Locale-Specific Blog Posts: `x-default` Hreflang Points to Self
DE-only blog posts in sitemap (e.g., `/de/blog/website-erstellen-deutschland/`) include only `hreflang="de"` and `hreflang="x-default"` — with `x-default` pointing to the DE URL itself. Per Google guidelines, `x-default` should point to the EN version or the blog index if no EN version exists.

**Fix:** For locale-specific posts, set `x-default` to `https://dmckreatif.com/en/blog/` as fallback, or exclude `x-default` from single-locale pages.

---

### 🟢 Passed Checks

- **H1 LCP Fix** — `HeroSection.tsx:22`: H1 is now outside the Framer Motion tree (comment: "H1 rendered outside motion tree for instant LCP paint") ✅
- **Robots.txt** — Correctly allows all crawlers + 9 AI bots; blocks CCBot, admin, auth, and editor routes ✅
- **Hreflang** — Implemented in both HTML `<head>` (`SeoHead.tsx`) and `sitemap.xml` for all 4 locales + `x-default` ✅
- **OpenGraph & Twitter Card** — All public pages have `og:title`, `og:description`, `og:image` (1200×630), `og:locale`, Twitter `summary_large_image` ✅
- **Canonical URLs** — Set on every page via `SeoHead.tsx` ✅
- **Sitemap Completeness** — 446 URLs, trailing slashes consistent, all route categories covered ✅
- **Schema Coverage** — 32+ page files use structured data ✅
- **Blog Freshness** — All 52 articles published 2025-12-01 to 2026-03-15; none older than 5 months ✅
- **Image Dimensions** — `ProjectCard.tsx` has `width`/`height` on mobile and desktop images ✅
- **BeforeAfterSlider Dimensions** — `1200×675` width/height on both `<img>` tags ✅
- **Image Alt Text (portfolio)** — Descriptive alt on `ProjectCard`, `CaseStudyModal`, `BeforeAfterSlider` ✅
- **Portfolio Data Quality** — All projects have URL, tech stack, year, country code, metrics, testimonials, WebP images ✅
- **Lazy Route Loading** — All 38 pages use `lazy()` + `Suspense` ✅
- **`decoding="async"`** — Set on `BeforeAfterSlider` images ✅
- **No duplicate meta descriptions** — i18n key-driven descriptions are unique per page ✅
- **AI crawlers** — GPTBot, ClaudeBot, PerplexityBot, Google-Extended and 5 others explicitly allowed in robots.txt ✅

---

### 📊 Statistics

| Metric | Value |
|--------|-------|
| Total page components | 38 |
| Sitemap URLs | 446 |
| Blog articles | 52 |
| Pages with complete meta (title + desc + OG + canonical + noindex where needed) | ~33/38 |
| Images with descriptive alt tags | ~14/15 |
| Schema types deployed | 7 (ProfessionalService, BreadcrumbList, BlogPosting, Person, SoftwareApplication, Service, ContactPage) |
| i18n locale coverage | 4/4 (EN, FR, NL, DE) |
| Hreflang implementation | HTML head + sitemap ✅ |
| Sitemap lastmod staleness | 56 days (non-blog pages) |
| Blog content gap | 43 days (last post: 2026-03-15) |
| Internal linking (CTA density) | 7/10 |
| Pre-rendering | ❌ Not implemented |
| Supabase lazy load | ❌ Global init on all routes |

---

### 📝 Content Recommendations

Topics to publish in the next 4 weeks to close the content gap and capture European market keywords:

| # | Title Suggestion | Target Keywords | Language | Priority |
|---|-----------------|----------------|----------|----------|
| 1 | "Agence Web Bruxelles — Création de Site Professionnel en Belgique" | agence web bruxelles, création site web belgique | FR | High |
| 2 | "Refonte de Site Web : Guide Complet pour PME en 2026" | refonte site web, renouveler site internet | FR | High |
| 3 | "Web Agency Netherlands — Professional Website Design for Dutch Businesses" | web agency netherlands, website laten maken | EN/NL | High |
| 4 | "React vs WordPress: Which Is Better for European Business Websites in 2026?" | react website europe, wordpress alternative | EN | Medium |
| 5 | "E-Commerce Development for European Markets: Platform Guide 2026" | ecommerce development europe, online shop creation | EN | Medium |

---

### 📅 Action Items (prioritized)

1. **[IMMEDIATE]** Add `noIndex={true}` to 5 legal pages — 5-minute fix, 5 weeks overdue
2. **[THIS WEEK]** Update sitemap `<lastmod>` to `2026-04-27` for all non-blog URLs
3. **[THIS WEEK]** Add `loading="lazy"` to `BeforeAfterSlider.tsx` lines 78 and 93
4. **[THIS WEEK]** Publish 1 blog article to end 43-day content gap
5. **[THIS WEEK]** Add `CollectionPage` + `ItemList` JSON-LD to `IndustriesPage.tsx` and `TechnologiesPage.tsx`
6. **[THIS WEEK]** Fix `FileUpload.tsx:157` empty `alt` attribute
7. **[THIS MONTH]** Fix `x-default` hreflang for locale-specific blog posts in sitemap
8. **[THIS MONTH]** Lazy-initialize Supabase client (auth routes only)
9. **[THIS MONTH]** Add `.htaccess` root redirect + HSTS header
10. **[THIS MONTH]** Implement `vite-plugin-prerender` for key public routes
11. **[BACKLOG]** Merge JSON-LD schemas into `@graph` pattern in `seo-schemas.ts`
12. **[BACKLOG]** Add `fetchPriority="high"` / `<link rel="preload">` for hero visual asset

---

### 📖 Content Freshness Audit

All 52 articles are within the 6-month freshness window. No "needs review" or "urgent update" flags.

| Period | Count | Status |
|--------|-------|--------|
| 2025-12-01 to 2025-12-31 | 11 articles | ✅ Within 5 months |
| 2026-01-01 to 2026-01-31 | 10 articles | ✅ Fresh |
| 2026-02-01 to 2026-02-28 | 9 articles | ✅ Fresh |
| 2026-03-01 to 2026-03-15 | 22 articles | ✅ Fresh |
| 2026-03-16 to 2026-04-27 | **0 articles** | ⚠️ 43-day publishing gap |

---

### History

| Date | Score | Notes |
|------|-------|-------|
| **2026-04-27** | **81/100** | H1 LCP fix confirmed; sitemap lastmod staleness flagged; 43-day content gap |
| 2026-04-20 | 81/100 | +2 vs prior week; trailing slashes, 195 doorway pages removed, images compressed |
| 2026-04-13 | 79/100 | Baseline |

**Carry-over warnings from 2026-04-20:** All 6 previously listed warnings remain unresolved. Legal pages noIndex is now in Week 5.
