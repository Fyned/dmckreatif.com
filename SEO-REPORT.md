# SEO Report — dmckreatif.com
## Date: 2026-06-15
## Overall Score: 73/100 (↓3 from 76 on 2026-05-25, 3-week gap)

---

### Executive Summary

- **Score dropped 3 points** since last report (21 days without any fixes applied); all 15 previously flagged issues remain open — decay is now structural, not situational
- **Content crisis now severe:** English content gap hits **106 days** (last EN article: 2026-03-01); total gap 92 days; 6 articles at or past the 6-month freshness threshold, with 5 more crossing before June 30 — by month's end, all 11 December 2025 articles will be 6+ months stale
- **Noindex issue enters 9th consecutive week** unresolved — 7 pages (5 legal, 2 order-flow) remain fully indexed, wasting crawl budget and accumulating thin-content signals
- **Sitemap `lastmod` now 105 days stale** (all non-blog pages still show `2026-03-02`); search engines may be deprioritizing recrawl
- Monthly deep audit skipped — June 15 is outside the 1st–7th window

---

### 🔴 Critical Issues (fix immediately)

#### 1. Legal Pages Missing `noindex` — **WEEK 9 UNRESOLVED** ⚠️ ESCALATING
Five publicly-crawlable thin-content pages remain fully indexed. First flagged 2026-03-31; no action taken in 9 consecutive report cycles.

| File | Route |
|------|-------|
| `src/pages/PrivacyPage.tsx` | `/:locale/privacy` |
| `src/pages/TermsPage.tsx` | `/:locale/terms` |
| `src/pages/LegalNoticePage.tsx` | `/:locale/legal` |
| `src/pages/CookiePolicyPage.tsx` | `/:locale/cookie-policy` |
| `src/pages/RefundPolicyPage.tsx` | `/:locale/refund-policy` |

`SeoHead` component supports `noIndex={true}` prop (line 14 of `SeoHead.tsx`). This is 5 files, one prop each, ~5 minutes total.

**Fix:** Add `noIndex={true}` to each `<SeoHead>` block.

---

#### 2. Blog Content Gap — 106 Days EN / 92 Days Total — CRITICAL

| Locale | Last Article | Gap | Change Since May 25 |
|--------|-------------|-----|---------------------|
| English | 2026-03-01 | **106 days** | +21 days |
| Any locale | 2026-03-15 | **92 days** | +21 days |

**6 articles at or past the 6-month freshness threshold:**

| Slug | Published | Age Today | Flag |
|------|-----------|-----------|------|
| `roi-professional-web-design` | 2025-12-01 | **6 mo 14 d** | 🔴 Urgent update |
| `core-web-vitals-explained` | 2025-12-03 | **6 mo 12 d** | 🔴 Urgent update |
| `ai-web-development-2026` | 2025-12-06 | **6 mo 9 d** | 🔴 Stale "2026" title |
| `web-design-construction` | 2025-12-09 | **6 mo 6 d** | 🔴 Urgent update |
| `multilingual-seo-europe` | 2025-12-12 | **6 mo 3 d** | 🔴 Urgent update |
| `state-of-web-development-2026` | 2025-12-15 | **exactly 6 mo** | 🔴 Stale "2026" title |

**5 more crossing the 6-month threshold before June 30:**

| Slug | Published | Crosses Threshold | Days Left |
|------|-----------|------------------|-----------|
| `ecommerce-platform-comparison-europe` | 2025-12-18 | June 18 | 3 days |
| `what-is-headless-cms` | 2025-12-21 | June 21 | 6 days |
| `wordpress-vs-custom-cost` | 2025-12-24 | June 24 | 9 days |
| `shopify-vs-prestashop-europe` | 2025-12-27 | June 27 | 12 days |
| `vercel-vs-netlify-vs-aws` | 2025-12-30 | June 30 | 15 days |

By June 30, **all 11 December 2025 articles** will be past the 6-month mark. January 2026 articles (now ~5.5 months old) will start crossing in early July.

**Fix:** Publish 1 new EN article immediately to break the 106-day gap. Update `dateModified` + add a light content refresh (2–3 new sentences, updated data points) to the 6 articles above.

---

#### 3. TemplateOrderPage + TemplateOrderConfirmPage Missing `noindex` — **Week 4 Unresolved**
`robots.txt` partially covers `/*/template-order` but NOT `/*/templates/order/confirm/:orderId`. Defense-in-depth requires the HTML meta robots tag.

**Fix:** Add `<meta name="robots" content="noindex, nofollow" />` inside the `<Helmet>` block in `src/pages/TemplateOrderPage.tsx` and `src/pages/TemplateOrderConfirmPage.tsx`.

---

#### 4. SPA Indexability — **P0 from CLAUDE.md, Ongoing**
Entire site is client-side rendered. Googlebot must execute JavaScript to read content — affects all 446 sitemap URLs. No progress this cycle.

**Fix:** Implement `vite-plugin-prerender` per CLAUDE.md P0 action. Priority routes: 4 locale homepages, 44 service detail pages, industry/tech indexes, blog, contact, pricing.

---

### 🟡 Warnings (fix this week)

#### 5. IndustriesPage & TechnologiesPage Missing JSON-LD — **Week 8 Unresolved**

| Page | File | Missing Schema |
|------|------|----------------|
| `/:locale/industries` | `src/pages/IndustriesPage.tsx` | `CollectionPage` + `ItemList` |
| `/:locale/technologies` | `src/pages/TechnologiesPage.tsx` | `CollectionPage` + `ItemList` |

Both pages have BreadcrumbList but no page-level schema. Pattern to follow: `BlogPage.tsx`.

**Fix:** Add `<JsonLd>` component with `buildWebPageSchema()` + inline `ItemList` (same pattern as `BlogPage.tsx`).

---

#### 6. BeforeAfterSlider Missing `loading="lazy"` — **Week 8 Unresolved**
`src/components/portfolio/BeforeAfterSlider.tsx` lines ~78 and ~93: both `<img>` elements have `width`, `height`, `decoding="async"` but no `loading="lazy"`. Component renders far below the fold.

**Fix:** Add `loading="lazy"` to both `<img>` elements.

---

#### 7. Portfolio Data Issues — **Week 4 Unresolved**

| Item | File | Issue |
|------|------|-------|
| `ata-accountancy` (#07) | `src/lib/portfolio-data.ts:209` | URL uses `http://` — must be HTTPS |
| `gmg-design` (#09) | `src/lib/portfolio-data.ts:253` | URL points to `https://dmckreatif.com` — self-referential; replace with actual client URL |

---

#### 8. Sitemap `lastmod` Staleness — **Now 105 Days Stale** ↑
All non-blog pages in `sitemap.xml` show `lastmod: 2026-03-02`. Was 84 days stale at last report (May 25); now 105 days.

**Fix:** Update `<lastmod>` for all non-blog static pages to `2026-06-15`.

---

#### 9. BreadcrumbList Null Item Bug — **P1 from CLAUDE.md, Ongoing**
`buildBreadcrumbSchema()` in `src/lib/seo-schemas.ts` can produce `null` `ListItem` entries, triggering Search Console rich result errors.

**Fix:** Add `.filter(Boolean)` on the `listItems` array before building `itemListElement`.

---

#### 10. `SoftwareApplication` Schema — Author Type Bug — **Week 3 Unresolved**
`buildTechnologySchema()` in `src/lib/seo-schemas.ts` sets review `author` as `{"@type": "Organization"}`. Google's SoftwareApplication rich results eligibility requires `Person`.

**Fix:** Change to `{"@type": "Person", "name": "Musa Kerem Demirci"}`.

---

#### 11. Locale-Specific Blog Posts: `x-default` Points to Self — **Week 5 Unresolved**
FR/NL/DE-only blog posts in `sitemap.xml` include `hreflang="x-default"` pointing to the same single-locale URL. Per Google guidelines, `x-default` for locale-exclusive content should point to `/en/blog/`.

---

#### 12. Supabase Client Initialized Globally — **P0 from CLAUDE.md, Ongoing**
`src/lib/supabase.ts` initializes the SDK for every page visitor, including unauthenticated ones. Adds unnecessary bundle weight.

**Fix:** Move `createClient()` inside a lazy getter; initialize only on routes wrapped by `AuthGuard` / `AdminGuard`.

---

#### 13. Organization Schema Not Using `@graph` Pattern — **P1 from CLAUDE.md, Ongoing**
Multiple separate `<script type="application/ld+json">` blocks injected per page. Google recommends a single `@graph` array for correct entity relationship linking.

---

#### 14. `headless-wordpress` Meta Description Too Short — **Week 3 Unresolved**
`seo.techDetail.headless-wordpress.description` in `src/i18n/locales/en.json` is ~87 characters. Target: 150–160 characters.

---

#### 15. Meta Description Boilerplate Endings
~20% of service and technology meta descriptions end with `"for European businesses."` — near-duplicate endings across pages weaken differentiation. Diversify to reflect specific service value propositions.

---

### 🟢 Passed Checks

- **Robots.txt** — Correctly configured; allows all search crawlers + 9 named AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, etc.); properly blocks auth/admin/dashboard/editor routes ✅
- **HSTS Header** — `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` in `.htaccess` ✅
- **www Redirect** — `www.dmckreatif.com` → `dmckreatif.com` via 301 in `.htaccess` ✅
- **Root Redirect** — `RewriteRule ^$ /en/ [R=301,L]` in `.htaccess` ✅
- **Hreflang in HTML + Sitemap** — Both `SeoHead.tsx` and `sitemap.xml` for all 4 locales + `x-default`; EN-only content correctly restricts hreflang to `["en"]` ✅
- **OpenGraph & Twitter Card** — All public pages emit `og:title`, `og:description`, `og:image` (1200×630), `og:locale`, `og:locale:alternate`, Twitter `summary_large_image` ✅
- **Canonical URLs** — Set on every page via `SeoHead.tsx`; supports `canonicalLocale` override for EN-only content ✅
- **Schema Coverage** — 17+ schema types across `seo-schemas.ts`; ProfessionalService, BreadcrumbList, Service, BlogPosting, SoftwareApplication, WebPage, AboutPage, ContactPage, OfferCatalog, CityPage, CountryPage, Industry, CaseStudy, PersonProfile, Templates ✅
- **Sitemap URL Count** — 446 URLs, trailing slashes consistent, hreflang annotations on all locale variants ✅
- **About Sub-pages in Sitemap** — team, process, why-us, partners, careers, musa-kerem-demirci all present × 4 locales ✅
- **Portfolio Images** — All WebP format; proper `alt` attributes on all img tags; 100% coverage ✅
- **Template Detail Pages in Sitemap** — 20 template detail URLs (EN only with `x-default`) ✅
- **Self-hosted Fonts** — Syne and DM Sans preloaded in `index.html`; zero Google Fonts dependency ✅
- **H1 LCP** — `HeroSection.tsx` H1 renders outside Framer Motion for immediate LCP paint ✅
- **Auth/Dashboard Blocked** — Login, register, forgot-password, reset-password, editor, dashboard, admin all disallowed in `robots.txt` ✅
- **CSP Header** — Content-Security-Policy set in `.htaccess`; `frame-ancestors 'none'` replaces X-Frame-Options ✅
- **Gzip Compression** — `mod_deflate` configured for HTML, CSS, JS, JSON, SVG, XML ✅
- **Cache Headers** — Immutable for hashed assets (JS/CSS: 1 year), images (1 month), HTML (no-cache) ✅
- **i18n Route Structure** — All public pages under `/:locale/` prefix; root `/` redirects to `/en` ✅
- **Case Study Detail Pages** — 10+ case studies with full data; CreativeWork schema deployed ✅
- **BreadcrumbList on Detail Pages** — `buildBreadcrumbSchema()` used on service, blog, industry, tech, city detail pages ✅
- **Blog Internal Linking** — `relatedServiceSlugs` renders "Related Services" at article bottom ✅
- **Cookie Banner** — GDPR-compliant `CookieBanner` component included in `App.tsx` layout ✅
- **No Broken Internal Links** — All `<Link to=>` values map to existing routes ✅

---

### 📊 Statistics

| Metric | 2026-06-15 | 2026-05-25 | Trend |
|--------|-----------|-----------|-------|
| Total page components | 41 | 38 | → |
| Sitemap URLs | 446 | 446 | → |
| Blog articles total | 52 (31 EN + 9 FR + 6 NL + 6 DE) | 52 | → |
| Blog content gap (any locale) | **92 days** | 71 days | ↓ |
| Blog content gap (EN only) | **106 days** | 85 days | ↓ |
| Articles at/past 6-month threshold | **6** | 9 (rolling window) | ↕ |
| Articles crossing threshold by June 30 | **11 total** | — | ↓ |
| Pages with complete meta | ~32/41 | ~32/38 | → |
| Pages with correct noindex | ~26/41 | ~26/38 | → |
| Images with descriptive alt tags | 14/14 (100%) | 14/14 | ✅ |
| Schema types deployed | 17 | 17 | → |
| i18n locale coverage | 4/4 | 4/4 | → |
| Hreflang (HTML + sitemap) | ✅ | ✅ | → |
| Pre-rendering | ❌ | ❌ | → |
| Supabase lazy load | ❌ | ❌ | → |
| Sitemap lastmod (non-blog) | **105 days stale** (2026-03-02) | 84 days stale | ↓ |
| Internal linking score | 6/10 | 6/10 | → |
| Portfolio image format | WebP ✅ | WebP ✅ | → |
| HSTS header | ✅ | ✅ | → |
| Portfolio HTTP URL | ❌ ata-accountancy | ❌ | → |

**URL category breakdown (sitemap):**
| Category | URLs |
|----------|------|
| Service detail pages (all locales) | 180 |
| City/local SEO pages | 46 |
| Technology detail pages | 52 |
| Industry detail pages | 36 |
| Blog posts (all locales) | 55 |
| Template detail pages | 20 |
| Core pages (home, about, contact, etc.) | ~40 |
| Country pages | 4 |
| Case study detail pages | 6 |
| About sub-pages | ~28 |
| Legal/utility pages | ~12 |

**Blog freshness breakdown:**
| Age | Count | Notes |
|-----|-------|-------|
| < 1 month | 0 | — |
| 1–3 months | 6 | NL/DE/FR batch (Mar 2–15), EN London (Mar 1) |
| 3–6 months | 40 | Jan–Nov 2025 EN + Dec 16–30, 2025 |
| At/past 6 months | **6** | Dec 1–15, 2025 |
| Crossing threshold within 15 days | **5** | Dec 18–30, 2025 |

---

### 📝 Content Recommendations

5 article topics targeting active European market gaps:

| # | Title | Target Keywords | Locale | Priority |
|---|-------|----------------|--------|----------|
| 1 | "Agence Web Belgique — Création de Site pour PME Belges" | agence web belgique, site internet bruxelles | FR | **Urgent** |
| 2 | "Website Laten Maken in België — Praktische Gids voor KMO" | website laten maken belgie, webbureau antwerpen | NL | **Urgent** |
| 3 | "Web Design Agency Netherlands — Building for Dutch Businesses" | web agency netherlands, website design amsterdam | EN | **High** |
| 4 | "E-Commerce Entwicklung für deutsche Unternehmen — Plattformvergleich 2026" | ecommerce entwicklung deutschland, onlineshop erstellen | DE | **High** |
| 5 | "AI Act & GDPR Compliance for European Websites in 2026" | AI act compliance, GDPR website europe 2026 | EN | High |

---

### 📅 Action Items (prioritized)

1. **[IMMEDIATE — 5 min]** Add `noIndex={true}` to `<SeoHead>` in 5 legal pages (`PrivacyPage.tsx`, `TermsPage.tsx`, `LegalNoticePage.tsx`, `CookiePolicyPage.tsx`, `RefundPolicyPage.tsx`) — **9 weeks overdue**
2. **[IMMEDIATE — 10 min]** Add `<meta name="robots" content="noindex, nofollow" />` to `TemplateOrderPage.tsx` and `TemplateOrderConfirmPage.tsx`
3. **[IMMEDIATE]** Publish 1 new EN blog article to break the 106-day gap (suggestion: "Web Design Agency Netherlands" — high intent, untapped territory)
4. **[IMMEDIATE]** Update `dateModified` + light content refresh on 6 articles at/past 6-month threshold (Dec 1–15, 2025)
5. **[THIS WEEK]** Refresh 5 more Dec 18–30 articles before they individually cross the threshold (June 18–30)
6. **[THIS WEEK]** Add `loading="lazy"` to both `<img>` elements in `BeforeAfterSlider.tsx` (~lines 78, 93)
7. **[THIS WEEK]** Add `CollectionPage` + `ItemList` JSON-LD to `IndustriesPage.tsx` and `TechnologiesPage.tsx`
8. **[THIS WEEK]** Fix `src/lib/portfolio-data.ts`: `ata-accountancy` HTTP → HTTPS; `gmg-design` self-referential URL → actual client URL
9. **[THIS WEEK]** Update sitemap `<lastmod>` for all non-blog URLs to `2026-06-15`
10. **[THIS WEEK]** Add `.filter(Boolean)` on `listItems` in `buildBreadcrumbSchema()` (`src/lib/seo-schemas.ts`)
11. **[THIS WEEK]** Change `SoftwareApplication` review `author` from `Organization` to `Person` in `buildTechnologySchema()`
12. **[THIS WEEK]** Extend `headless-wordpress` tech meta description from ~87 → 150+ chars in `src/i18n/locales/en.json`
13. **[THIS MONTH]** Fix `x-default` hreflang on locale-specific blog posts — change from self-reference to `/en/blog/`
14. **[ONGOING]** Implement `vite-plugin-prerender` — P0, highest single impact SEO fix
15. **[ONGOING]** Lazy-initialize Supabase client (auth routes only)
16. **[ONGOING]** Refactor JSON-LD output to single `@graph` pattern per page

---

### Scoring Breakdown

| Area | Score | Max | Change | Notes |
|------|-------|-----|--------|-------|
| Sitemap completeness | 12 | 15 | ↓1 | 446 URLs, hreflang OK; non-blog lastmod 105 days stale (was 84d) |
| Schema markup | 12 | 15 | → | 17 types deployed; IndustriesPage/TechnologiesPage missing; author type bug |
| Meta tags quality | 14 | 20 | ↓1 | noindex missing on 7 pages; 9 consecutive weeks unresolved |
| Robots.txt | 5 | 5 | → | Complete, AI bot allowlist, auth routes blocked |
| Performance/images | 12 | 15 | → | WebP portfolio, 100% alt coverage; BeforeAfterSlider lazy missing; SPA unrendered |
| i18n/hreflang | 12 | 15 | → | HTML + sitemap hreflang OK; x-default self-reference bug on locale-only posts |
| Content freshness | 6 | 15 | ↓1 | 106-day EN gap; 6 articles at/past 6-month threshold; 5 more crossing by June 30 |
| **Total** | **73** | **100** | **↓3** | |

---

### History

| Date | Score | Key Events |
|------|-------|-----------|
| 2026-06-15 | **73/100** | Score ↓3 over 3-week gap; EN content gap 106 days; 6 articles at/past 6-month threshold; 5 more crossing by June 30; sitemap lastmod 105 days stale; all 15 prior issues remain unresolved |
| 2026-05-25 | 76/100 | 3 more Dec 2025 articles crossed 6-month threshold (9 total by their count); EN content gap 85 days; no prior issues resolved; sitemap lastmod 84 days stale |
| 2026-05-18 | 77/100 | Dec 2025 articles at 6-month threshold; content gap 64 days; no prior issues resolved; HSTS/root redirect confirmed present |
| 2026-05-04 | 79/100 | 2 new noindex gaps; content gap 50 days; blog freshness threshold approaching; monthly deep audit run |
| 2026-04-27 | 81/100 | H1 LCP fix confirmed ✅; sitemap lastmod partially updated; no new fixes |
| 2026-04-20 | 81/100 | Score unchanged; 4 image issues + Supabase global init persisting |
