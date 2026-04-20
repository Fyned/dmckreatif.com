# SEO Report — dmckreatif.com
## Date: 2026-04-20
## Overall Score: 81/100 (+2 vs 2026-04-13)

---

### Executive Summary

- **Significant improvements landed (Apr 19):** Trailing slashes added to all 446 URLs (eliminates 301 redirects), 195 low-quality doorway pages removed (641→446 sitemap URLs), ~1.45MB of images compressed, 6 dead-end pages gained internal links, `CountryFlag.tsx` alt attribute fixed
- **Score improves to 81/100** (+2 vs last week) driven by the sitemap cleanup and crawl-efficiency gains
- **9 warnings carried over** — most urgent remains the 5 legal pages without `noIndex` (now week 4 unresolved)
- **Blog content fully fresh:** All 52 articles date between 2025-12-01 and 2026-03-14 — none older than 6 months, zero content flags triggered
- **Monthly deep audit skipped** — today is the 20th; Part 3 runs on the 1st–7th only (see 2026-04-06 report for keyword gaps and structured data deep check)

---

### 🔴 Critical Issues (fix immediately)

*No new critical issues.* All previous P0 items remain resolved.

---

### 🟡 Warnings (fix this week)

#### 1. Legal pages crawlable without `noIndex` — **WEEK 4 UNRESOLVED**
- **Files:** `src/pages/PrivacyPage.tsx`, `TermsPage.tsx`, `LegalNoticePage.tsx`, `CookiePolicyPage.tsx`, `RefundPolicyPage.tsx`
- **Issue:** None of the 5 legal/policy pages set `noindex`. They are not in the sitemap but remain crawlable — Google may index boilerplate legal text as thin content, diluting crawl budget
- **Fix:** Add `<SeoHead noIndex={true} ... />` to each of the 5 files (5-minute task)

#### 2. `IndustriesPage` and `TechnologiesPage` missing JSON-LD — **WEEK 3 UNRESOLVED**
- **Files:** `src/pages/IndustriesPage.tsx`, `src/pages/TechnologiesPage.tsx`
- **Issue:** Both listing pages render no structured data — missed `CollectionPage` + `ItemList` schema opportunity; every other listing page already has schema
- **Fix:** Apply `buildWebPageSchema()` + inline `ItemList` via `<JsonLd>` component on each page

#### 3. `BeforeAfterSlider.tsx` — eager image loading — **WEEK 3 UNRESOLVED**
- **File:** `src/components/portfolio/BeforeAfterSlider.tsx`
- **Issue:** Both `<img>` elements (before/after) load eagerly even when the slider is off-screen — unnecessary LCP bandwidth cost on portfolio pages
- **Fix:** Add `loading="lazy"` to both `<img>` tags (they are always below the fold)

#### 4. Missing `width`/`height` on `<img>` tags — CLS risk — **WEEK 3 UNRESOLVED**
- **Files:** `src/components/portfolio/ProjectCard.tsx`, `src/components/home/ClientLogoBar.tsx`, `src/components/templates/TemplatePreviewGallery.tsx`
- **Issue:** No explicit dimensions → browser cannot reserve layout space → Cumulative Layout Shift penalty
- **Fix:** Add `width` + `height` attributes (or CSS `aspect-ratio`) to all `<img>` elements in these 3 files

#### 5. Missing `fetchpriority="high"` on hero images — **WEEK 3 UNRESOLVED**
- **File:** `src/components/home/HeroSection.tsx` (and above-fold images on key landing pages)
- **Issue:** LCP candidate images are fetched at normal browser priority — a free LCP improvement is being skipped
- **Fix:** Add `fetchPriority="high"` to the first visible hero `<img>` on HomPage, ServicesPage, and ContactPage

#### 6. Portfolio URL issues — **WEEK 4 UNRESOLVED**
- **File:** `src/lib/portfolio-data.ts`
- **GMG Design:** URL is still a placeholder — verify and update to production URL
- **ATA Accountancy:** URL still uses `http://` — upgrade to `https://` to avoid mixed-content and trust signals

#### 7. `TemplateOrderPage` — ambiguous empty `alt` attributes — **WEEK 3 UNRESOLVED**
- **File:** `src/pages/TemplateOrderPage.tsx`
- **Issue:** `<img alt="">` without `role="presentation"` — ambiguous to screen readers; WCAG 2.1 AA failure
- **Fix:** Add `role="presentation"` for decorative images, or descriptive `alt` text for meaningful ones

#### 8. No `SearchAction` on `WebSite` schema — **WEEK 3 UNRESOLVED**
- **File:** `src/lib/seo-schemas.ts`
- **Issue:** `WebSite` schema lacks `potentialAction: SearchAction` — site is ineligible for Google Sitelinks Searchbox
- **Fix:** Add `potentialAction: { "@type": "SearchAction", "target": "https://dmckreatif.com/blog?q={search_term_string}", "query-input": "required name=search_term_string" }` to the root WebSite schema

#### 9. `FilenesSports` missing from portfolio — **WEEK 3 UNRESOLVED**
- **File:** `src/lib/portfolio-data.ts`
- **Issue:** `filenessports.com` is listed in CLAUDE.md as a real portfolio project but absent from the data array — not displayed on site or linked anywhere
- **Fix:** Add the project entry with description, URL, tech stack, country (`INT`), and screenshot path

---

### 🟢 Passed Checks

- **Sitemap (Apr 19 fix)** — 446 URLs confirmed (EN: 171, FR: 94, NL: 91, DE: 90); all have trailing slashes (no 301 redirects); hreflang `xhtml:link` blocks present on every URL; 195 low-quality doorway pages removed ✅
- **Robots.txt** — Allows all public pages; blocks `/admin`, `/dashboard`, `/login`, `/editor`, `/api/`; all major AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, Bytespider, OAI-SearchBot, cohere-ai, anthropic-ai); CCBot blocked; sitemap declared ✅
- **Schema markup** — 17 JSON-LD builder functions in `src/lib/seo-schemas.ts`; `JsonLd` component injecting structured data across all major page types (ProfessionalService, BreadcrumbList, BlogPosting, WebPage, ContactPage, AboutPage, CollectionPage, CityService, IndustryService, SoftwareApplication, CreativeWork, Person, Service, OfferCatalog) ✅
- **Hreflang** — `SeoHead.tsx` emits all 4 locale variants + `x-default` on every page; blog posts correctly restrict to article language (FR-only articles get `locales=["fr"]`); sitemap hreflang bidirectional ✅
- **Meta tags** — `SeoHead` component covers: title, description, canonical, OG (9 tags), Twitter Card (summary_large_image), article timestamps, robots directive, HTML lang; `noIndex` prop available ✅
- **No duplicate meta descriptions** — all descriptions keyed to unique i18n slugs (`seo.serviceDetail.{slug}.description` pattern); grep found zero cross-page duplicates ✅
- **Portfolio images** — all 24 desktop/mobile screenshots in WebP format under `/public/portfolio/`; compressed to <120KB desktop / <60KB mobile (Apr 19) ✅
- **Internal links** — 6 previously dead-end pages (Pricing, Contact, Blog, Services, WhyUs, Careers) now have outbound cross-links; blog posts average 3+ related-article links ✅
- **CountryFlag alt text** — ✅ **RESOLVED this week** — `src/components/ui/CountryFlag.tsx` now uses `alt={LABEL_MAP[iso] ?? iso.toUpperCase()}` — no longer a WCAG failure
- **Blog content freshness** — All 52 articles dated 2025-12-01 to 2026-03-14; oldest is 4.7 months ago (cutoff: 6 months = 2025-10-20); **zero articles require review or urgent update** ✅
- **i18n coverage** — 4 locales fully implemented (EN/FR/NL/DE) with dedicated content files and i18n keys ✅

---

### 📊 Statistics

| Metric | Value |
|--------|-------|
| Total sitemap URLs | 446 (↓195 from 641, intentional cleanup) |
| URLs by locale | EN: 171 · FR: 94 · NL: 91 · DE: 90 |
| Blog posts in sitemap | 55 (EN:31 · FR:10 · NL:7 · DE:7) |
| Total blog articles | 52 (all within 6 months) |
| Schema builder functions | 17 |
| Schema types in use | 14 distinct types |
| Pages with complete meta | ~95% (all routed pages via SeoHead) |
| Portfolio images alt tags | ✅ all present |
| WebP portfolio images | 24 (12 desktop + 12 mobile) |
| i18n locales | 4/4 (EN, FR, NL, DE) |
| Open warnings | 9 (↓1 from 10 — CountryFlag resolved) |
| Routes in App.tsx | 41 public routes × 4 locales |
| Cities with local pages | 31 across 6 countries |

---

### 📝 Content Recommendations

Focus on European B2B audience — gaps identified vs. existing 52-article corpus:

1. **"How to Choose a Web Agency in Belgium / Brussels" (EN + FR + NL)** — *High priority* — Belgium (Brussels, Antwerp, Ghent) city pages exist but no dedicated editorial content; targets `agence web Belgique`, `webbureau Brussel`
2. **"Webflow vs Framer: Which is Better for European Businesses in 2026?" (EN)** — *High priority* — React/Next.js vs WordPress already covered; Webflow/Framer is a growing market gap; targets `Webflow agency Europe`, `Framer vs Webflow`
3. **"WCAG 2.2 Accessibility Checklist for Business Websites" (EN + FR)** — *Medium priority* — EU Accessibility Act deadline creates urgency; zero accessibility content exists; targets `WCAG compliance website`, `accessibilité web RGAA`
4. **"Google Analytics 4 Setup Guide for Small Businesses" (EN + DE)** — *Medium priority* — No analytics/tracking content exists; high commercial intent keyword; targets `Google Analytics 4 setup`, `GA4 einrichten`
5. **"Content Marketing Strategy for European B2B Companies" (EN + NL)** — *Medium priority* — Zero content-marketing articles; complements existing SEO articles; targets `content marketing strategie Nederland`, `B2B content marketing Europe`

---

### 📅 Action Items (prioritized)

1. **Add `noIndex` to 5 legal pages** — 5-minute change, week 4 of carrying this warning (`PrivacyPage`, `TermsPage`, `LegalNoticePage`, `CookiePolicyPage`, `RefundPolicyPage`)
2. **Add JSON-LD to `IndustriesPage` and `TechnologiesPage`** — 30-minute task, use existing `buildWebPageSchema()` + `ItemList`
3. **Fix `BeforeAfterSlider` lazy loading** — Add `loading="lazy"` to 2 img tags
4. **Add `width`/`height` to `ProjectCard`, `ClientLogoBar`, `TemplatePreviewGallery`** — Eliminate CLS risk
5. **Add `fetchPriority="high"` to hero images** — Free LCP improvement
6. **Fix portfolio URLs** — GMG Design placeholder + ATA http:// upgrade
7. **Add FilenesSports to portfolio-data.ts** — 4th week this project is missing from the site
8. **Fix `TemplateOrderPage` empty alt** — Add `role="presentation"` or descriptive alt text
9. **Add `SearchAction` to WebSite schema** — Sitelinks Searchbox eligibility

---

### History

| Date | Score | Key Changes |
|------|-------|-------------|
| 2026-04-20 | **81/100** | +2 · Trailing slashes, doorway pages removed, images compressed, 6 internal links added, CountryFlag alt fixed |
| 2026-04-13 | 79/100 | No change · 3 new FR blog articles added |
| 2026-04-06 | 79/100 | +5 · Monthly deep audit, keyword gaps mapped, BreadcrumbList null fixed |
| 2026-03-30 | 74/100 | First report baseline |
