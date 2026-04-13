# SEO Report — dmckreatif.com
## Date: 2026-04-13
## Overall Score: 79/100 (= no change vs 2026-04-06)

---

### Executive Summary

- **No regression detected** — all previously-resolved P0 issues remain fixed; score stable at 79/100
- **New blog content confirmed:** 55 articles across 4 languages (EN: 26, FR: 15, NL: 7, DE: 7) — up from 52 last week (3 new FR articles detected)
- **10 persistent warnings** carried over unresolved from last week — most impactful: legal-page `noIndex` gap and missing JSON-LD on two listing pages
- **CLS risk remains** — majority of `<img>` tags still lack explicit `width`/`height` attributes; `BeforeAfterSlider.tsx` still loads images eagerly
- **Monthly deep audit skipped** — today is 13th (Part 3 runs only on 1st–7th of month); see 2026-04-06 report for keyword gaps and structured-data deep check

---

### 🔴 Critical Issues (fix immediately)

*No new critical issues.* All previous P0 items remain resolved.

---

### 🟡 Warnings (fix this week)

#### 1. Legal pages crawlable without `noIndex` (carried over — week 3)
- **Files:** `src/pages/PrivacyPage.tsx`, `TermsPage.tsx`, `LegalNoticePage.tsx`, `CookiePolicyPage.tsx`, `RefundPolicyPage.tsx`
- **Issue:** Pages are fully crawlable, not in sitemap, and lack `noindex` directive — inconsistent crawl signal; Google may index thin/duplicate boilerplate
- **Fix:** Add `<SeoHead noIndex={true} ... />` to each of the 5 files

#### 2. `IndustriesPage` and `TechnologiesPage` missing JSON-LD (carried over — week 3)
- **Files:** `src/pages/IndustriesPage.tsx`, `src/pages/TechnologiesPage.tsx`
- **Issue:** Both listing pages render no structured data — missed opportunity for `CollectionPage` + `ItemList` schema
- **Fix:** Apply `buildWebPageSchema()` + manual `ItemList` in `JsonLd` component on each page

#### 3. `BeforeAfterSlider.tsx` images — eager loading, no `loading="lazy"` (carried over — week 2)
- **File:** `src/components/portfolio/BeforeAfterSlider.tsx`
- **Issue:** Two `<img>` elements load immediately even when off-screen — unnecessary LCP/bandwidth cost
- **Fix:** Add `loading="lazy"` to both images (they are below the fold)

#### 4. Missing `width`/`height` on `<img>` tags — CLS risk (carried over — week 2)
- **Files:** `src/components/portfolio/ProjectCard.tsx`, `src/components/home/ClientLogoBar.tsx`, `src/components/ui/CountryFlag.tsx`, `src/components/templates/TemplatePreviewGallery.tsx`
- **Issue:** No explicit dimensions → browser can't reserve layout space → Cumulative Layout Shift
- **Fix:** Add explicit `width` + `height` attributes (or CSS aspect-ratio) on all `<img>` elements

#### 5. `CountryFlag.tsx` — missing `alt` attribute (accessibility + SEO violation)
- **File:** `src/components/ui/CountryFlag.tsx`
- **Issue:** `<img>` has no `alt` attribute — WCAG 2.1 AA failure; Google treats images without alt as decorative only
- **Fix:** Add `alt={`${countryCode} flag`}` or `alt=""` with `role="presentation"` if purely decorative

#### 6. Portfolio URL issues (carried over — week 3)
- **GMG Design:** URL is a placeholder — verify and update in `src/lib/portfolio-data.ts`
- **ATA Accountancy:** URL uses `http://` — upgrade to `https://` to avoid mixed-content warnings

#### 7. `TemplateOrderPage` — empty `alt` attributes (carried over — week 2)
- **File:** `src/pages/TemplateOrderPage.tsx`
- **Issue:** One or more `<img>` tags have `alt=""` without `role="presentation"` — ambiguous to screen readers
- **Fix:** Add descriptive alt text or explicit `role="presentation"` for purely decorative images

#### 8. Missing `fetchpriority="high"` on hero images (carried over — week 2)
- **File:** `src/components/home/HeroSection.tsx` (and other above-fold images)
- **Issue:** LCP candidate images lack `fetchpriority="high"` — browser fetches them at normal priority
- **Fix:** Add `fetchPriority="high"` to the first visible hero image on each key landing page

#### 9. No `SearchAction` on `WebSite` schema (low priority, carried over)
- **File:** `src/lib/seo-schemas.ts`
- **Issue:** `WebSite` schema does not include `potentialAction: SearchAction` — missed Google Sitelinks Searchbox eligibility
- **Fix:** Add `potentialAction: { "@type": "SearchAction", "target": "https://dmckreatif.com/blog?q={search_term_string}", "query-input": "required name=search_term_string" }` to the root WebSite schema

#### 10. `FilenesSports` missing from `portfolio-data.ts` (carried over — week 2)
- **File:** `src/lib/portfolio-data.ts`
- **Issue:** FilenesSports (filenessports.com) is listed in CLAUDE.md as a real portfolio project but absent from the data file — not displayed on site
- **Fix:** Add FilenesSports entry with description, URL, tech stack, and screenshot path

---

### 🟢 Passed Checks

- **Sitemap** — 641 URLs confirmed (EN: 307, FR: 113, NL: 113, DE: 108); all locales balanced; hreflang alternate links present per URL block ✅
- **Robots.txt** — Correctly allows all public pages; blocks `/admin`, `/dashboard`, `/login`, `/editor`, `/api/`; all major AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended); CCBot blocked; sitemap declared ✅
- **Schema markup** — 17 JSON-LD builder functions in `src/lib/seo-schemas.ts`; 26 pages actively inject structured data via `JsonLd` component; all major schema types covered (ProfessionalService, BreadcrumbList, BlogPosting, WebPage, ContactPage, AboutPage, PortfolioPage, CityService, IndustryService, SoftwareApplication) ✅
- **Meta tags** — 100% of public pages (58/58) include `<SeoHead>` with title, description, OG tags, Twitter card, and canonical URL ✅
- **Hreflang** — Dual-layer implementation: per-URL alternate links in `sitemap.xml` AND per-page `<link rel="alternate">` in HTML `<head>` via `SeoHead.tsx`; `x-default` points to `/en` ✅
- **Canonical URLs** — Present on all public pages; locale-aware; EN-only blog posts use `canonicalLocale="en"` override ✅
- **Content freshness** — All 55 blog articles published Dec 2025 – Mar 2026; none older than 5 months; no "needs review" or "urgent update" flags needed ✅
- **Blog i18n coverage** — EN articles supported by FR/NL/DE locale files with unique SEO meta overrides; no raw English fallback text in localized meta ✅
- **Alt tag coverage** — ~95% of images have meaningful alt text; only 2–3 gaps identified (CountryFlag, TemplateOrderPage) ✅
- **Image format** — Portfolio images confirmed WebP; 100% WebP adoption for portfolio section ✅
- **Internal linking** — 50+ files contain `Link` and `href` elements; service detail pages cross-link related services; blog posts link to related articles and services; no orphan pages detected ✅
- **SPA route coverage** — All 38+ routes in `App.tsx` are lazy-loaded and represented in sitemap; no missing pages detected ✅
- **Performance-critical route** — H1 LCP animation removed (resolved in prior week); `HeroSection.tsx` renders static H1 ✅
- **Supabase lazy load** — Auth routes load Supabase client only when needed (resolved in prior week) ✅

---

### 📊 Statistics

| Metric | Value |
|---|---|
| Total sitemap URLs | 641 |
| Pages (public routes) | 38+ |
| Pages with `SeoHead` | 58/58 (100%) |
| Pages with `JsonLd` schema | 26/38 (68%) |
| Schema types implemented | 17 builder functions |
| Images with alt tags | ~95% |
| Images with width/height | ~20% ⚠️ |
| Blog articles (total) | 55 |
| Blog articles (EN) | 26 |
| Blog articles (FR) | 15 |
| Blog articles (NL) | 7 |
| Blog articles (DE) | 7 |
| Services | 44 |
| Industries | 8 |
| City pages | 27 cities / 5 countries |
| Portfolio projects | 13 |
| i18n locales | 4/4 (EN, FR, NL, DE) |
| Hreflang coverage | 4/4 locales + x-default |
| Internal linking score | 8/10 |
| Robots.txt | ✅ Optimised |
| WebP adoption (portfolio) | 100% |
| Open warnings | 10 |
| Critical issues | 0 |

---

### 📝 Content Recommendations

Five content opportunities for the European market (current gaps):

1. **"How to Build a GDPR-Compliant Website in 2026"** (EN + FR)
   - Target: `site conforme RGPD`, `GDPR website checklist Europe`, `RGPD développeur web`
   - High intent; complements existing `gdpr-compliance` service page

2. **"Best Web Agencies in Brussels 2026"** (FR + NL)
   - Target: `agence web Bruxelles avis`, `webbureau Brussel`, `création site Bruxelles`
   - City coverage exists for Brussels but no dedicated blog article

3. **"React vs Next.js: Which Should Your Business Choose in 2026?"** (EN)
   - Target: `react vs nextjs 2026`, `nextjs for business`, `when to use nextjs`
   - High search volume; bridges tech content with commercial intent

4. **"Website Costs for SMEs in the Netherlands 2026"** (NL)
   - Target: `kosten website MKB 2026`, `website laten maken prijs Nederland`
   - NL has only 7 blog posts; this fills a direct commercial gap

5. **"Webdesign für Handwerksbetriebe in Deutschland"** (DE)
   - Target: `webdesign handwerk`, `website für handwerker`, `homepage handwerksbetrieb`
   - Untapped niche in DE market; ties to construction/energy industry vertical

---

### 📅 Action Items (prioritized)

1. **Add `noIndex={true}` to 5 legal pages** — `PrivacyPage`, `TermsPage`, `LegalNoticePage`, `CookiePolicyPage`, `RefundPolicyPage` — 10 min fix, prevents index of thin boilerplate
2. **Add `alt` to `CountryFlag.tsx`** — 2 min fix, resolves WCAG 2.1 AA violation
3. **Add `loading="lazy"` to `BeforeAfterSlider.tsx`** — 2 min fix, improves performance score
4. **Add `width`/`height` to all `<img>` tags** — `ProjectCard`, `ClientLogoBar`, `TemplatePreviewGallery` — eliminates CLS across portfolio/template sections
5. **Fix portfolio URLs** — GMG Design placeholder URL + ATA Accountancy HTTP → HTTPS
6. **Add JSON-LD to `IndustriesPage` and `TechnologiesPage`** — `CollectionPage` + `ItemList` schema; ~30 min
7. **Add `FilenesSports` to `portfolio-data.ts`** — missing real project from CLAUDE.md list
8. **Add `fetchPriority="high"` to hero images** — LCP improvement on landing pages
9. **Add `SearchAction` to WebSite schema** — Sitelinks Searchbox eligibility
10. **Publish 1 new NL or DE blog article** — both locales underrepresented vs EN/FR

---

### History

| Date | Score | Delta | Key Changes |
|---|---|---|---|
| 2026-03-30 | 74/100 | baseline | — |
| 2026-04-06 | 79/100 | +5 | ProcessPage SeoHead added; H1 LCP animation removed; blog `lastmod` fixed; ProfessionalService `ImageObject` fixed |
| **2026-04-13** | **79/100** | **= 0** | No issues resolved this week; 3 new FR blog articles detected (total: 55); all P0 items remain fixed |

> **Next action:** Resolve items 1–4 above to push score to ~85/100 next week.
