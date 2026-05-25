# SEO Report — dmckreatif.com
## Date: 2026-05-25
## Overall Score: 76/100 (↓ from 77 on 2026-05-18)

---

### Executive Summary

- **Score fell 1 point** — content freshness worsened again; 3 more December 2025 articles crossed the 6-month threshold this week; no previously flagged issues have been resolved
- **8-week streak:** Legal pages still lack `noindex` — first flagged 2026-03-31, now 8 consecutive reports unresolved. Five pages, one prop each, ~5 minutes total work
- **Content crisis deepening:** Last article published 2026-03-15 (71-day total gap); last *English* article: 2026-03-01 (85-day gap). Now **9 articles** (Dec 1–24, 2025) are past the 6-month freshness threshold; 2 more (Dec 27–30) will cross it within the next 5 days
- **Three articles newly past 6 months this week:** `ecommerce-platform-comparison-europe` (Dec 18), `what-is-headless-cms` (Dec 21), `wordpress-vs-custom-cost` (Dec 24)
- **All critical/warning issues from last report remain open** — sitemap lastmod now 84 days stale; IndustriesPage/TechnologiesPage still missing JSON-LD; BeforeAfterSlider still missing lazy loading; portfolio HTTP URL still present

---

### 🔴 Critical Issues (fix immediately)

#### 1. Legal Pages Missing `noindex` — **WEEK 8 UNRESOLVED**
Five publicly-crawlable pages with zero ranking value remain fully indexed, wasting crawl budget and generating thin-content signals. First flagged 2026-03-31.

| File | Route |
|------|-------|
| `src/pages/PrivacyPage.tsx` | `/:locale/privacy` |
| `src/pages/TermsPage.tsx` | `/:locale/terms` |
| `src/pages/LegalNoticePage.tsx` | `/:locale/legal` |
| `src/pages/CookiePolicyPage.tsx` | `/:locale/cookie-policy` |
| `src/pages/RefundPolicyPage.tsx` | `/:locale/refund-policy` |

Confirmed still unfixed this week: all 5 `SeoHead` blocks use title + description props only, no `noIndex={true}`. The `SeoHead` component supports this prop (line 14 of `SeoHead.tsx`).

**Fix:** Add `noIndex={true}` to the `<SeoHead>` in each of the 5 files. One prop per file, ~5 minutes total.

---

#### 2. Blog Content Gap — 71 Days Total / 85 Days EN + 6-Month Freshness Breach Expanding

Last article published (any locale): **2026-03-15** — NL/DE locales.
Last **English** article published: **2026-03-01** — gap is now **85 days**.

**9 articles are now past the 6-month freshness threshold** (up from the 6 that crossed last week):

| Slug | Published | Age Today | Status |
|------|-----------|-----------|--------|
| `roi-professional-web-design` | 2025-12-01 | **6 mo 24 d** | 🔴 Urgent update |
| `core-web-vitals-explained` | 2025-12-03 | **6 mo 22 d** | 🔴 Urgent update |
| `ai-web-development-2026` | 2025-12-06 | **6 mo 19 d** | 🔴 "2026" title, stale |
| `web-design-construction` | 2025-12-09 | **6 mo 16 d** | 🔴 Urgent update |
| `multilingual-seo-europe` | 2025-12-12 | **6 mo 13 d** | 🔴 Urgent update |
| `state-of-web-development-2026` | 2025-12-15 | **6 mo 10 d** | 🔴 "2026" title, stale |
| `ecommerce-platform-comparison-europe` | 2025-12-18 | **6 mo 7 d** | 🆕 Newly crossed |
| `what-is-headless-cms` | 2025-12-21 | **6 mo 4 d** | 🆕 Newly crossed |
| `wordpress-vs-custom-cost` | 2025-12-24 | **6 mo 1 d** | 🆕 Newly crossed |

**2 more will cross within the next 5 days:**
| Slug | Published | Days Until 6-Month |
|------|-----------|-------------------|
| `shopify-vs-prestashop-europe` | 2025-12-27 | 2 days |
| `vercel-vs-netlify-vs-aws` | 2025-12-30 | 5 days |

**Fix:** Publish 1 new EN article immediately to break the 85-day gap. Update `dateModified` and add "Last updated: May 2026" notes + minor content refreshes to the 9 articles listed above.

---

#### 3. No Pre-rendering (SPA Indexability) — **P0 from CLAUDE.md, ongoing**
The entire site is a client-side SPA. Googlebot must execute JavaScript to read content — this affects all 446 sitemap URLs and is the single largest indexability risk. No progress this cycle.

**Fix:** Implement `vite-plugin-prerender` as documented in `CLAUDE.md:P0`. Priority routes: 4 locale homepages, 44 service detail pages, industries/technologies indexes, blog index, contact, pricing.

---

#### 4. TemplateOrderPage + TemplateOrderConfirmPage Missing `noindex` — **Week 3 unresolved**
Both pages use `<Helmet>` directly with no `noindex` meta tag. `robots.txt` partially covers the order path but does not guarantee blocking of `confirm/:orderId` URLs. Defense-in-depth requires the HTML robots meta tag.

**Fix:** Add `<meta name="robots" content="noindex, nofollow" />` inside the `<Helmet>` block in `src/pages/TemplateOrderPage.tsx` and `src/pages/TemplateOrderConfirmPage.tsx`.

---

### 🟡 Warnings (fix this week)

#### 5. IndustriesPage & TechnologiesPage Missing JSON-LD — **Week 7 unresolved**

| Page | File | Missing Schema |
|------|------|----------------|
| `/:locale/industries` | `src/pages/IndustriesPage.tsx` | `CollectionPage` + `ItemList` |
| `/:locale/technologies` | `src/pages/TechnologiesPage.tsx` | `CollectionPage` + `ItemList` |

Both pages have BreadcrumbList but no page-level schema. Pattern to follow: `BlogPage.tsx`.

**Fix:** Add `<JsonLd>` component with `buildWebPageSchema()` + inline `ItemList` (same pattern as `BlogPage.tsx`).

---

#### 6. BeforeAfterSlider Missing `loading="lazy"` — **Week 7 unresolved**
`src/components/portfolio/BeforeAfterSlider.tsx` lines ~78 and ~93: both `<img>` elements have `width`, `height`, and `decoding="async"` but no `loading="lazy"`. Portfolio section renders far below the fold — lazy loading is required.

**Fix:** Add `loading="lazy"` to both `<img>` elements in `BeforeAfterSlider.tsx`.

---

#### 7. Portfolio Data Issues — **Week 3 unresolved**

| Item | File | Issue |
|------|------|-------|
| `ata-accountancy` (#07) | `src/lib/portfolio-data.ts:209` | URL uses `http://ataaccountancy.com` — must be HTTPS |
| `gmg-design` (#09) | `src/lib/portfolio-data.ts:253` | URL points to `https://dmckreatif.com` — self-referential; replace with actual client URL |

---

#### 8. Sitemap `lastmod` Staleness — **Now 84 Days Stale**
All non-blog pages in the sitemap show `lastmod: 2026-03-02` (84 days ago today). Was 77 days stale last week.

**Fix:** Update `<lastmod>` for all non-blog static pages to `2026-05-25`.

---

#### 9. BreadcrumbList Null Item Bug — **P1 from CLAUDE.md, unconfirmed fix**
`src/lib/seo-schemas.ts` `buildBreadcrumbSchema()` — edge case can produce `null` ListItem entries, generating Search Console rich result errors.

**Fix:** Add `.filter(Boolean)` or null guard on `listItems` array before building `itemListElement`.

---

#### 10. `SoftwareApplication` Schema — Author Type Bug — **Week 2 unresolved**
`src/lib/seo-schemas.ts` `buildTechnologySchema()` sets the review `author` as `{ "@type": "Organization" }`. Google's SoftwareApplication rich results eligibility requires `Person` as review author type.

**Fix:** Change to `{ "@type": "Person", "name": "Musa Kerem Demirci" }` in `buildTechnologySchema()`.

---

#### 11. Locale-Specific Blog Posts: `x-default` Points to Self — **Week 4 unresolved**
FR/NL/DE-only blog posts in `sitemap.xml` include `hreflang="{locale}"` + `hreflang="x-default"` where `x-default` points to the same locale URL. Per Google guidelines, `x-default` for locale-exclusive content should point to the canonical fallback (`/en/blog/`), not the same single-locale URL.

---

#### 12. Supabase Client Initialized Globally — **P0 from CLAUDE.md, ongoing**
`src/lib/supabase.ts` is imported at module level, initializing the Supabase SDK for every visitor on every page — including the majority who never authenticate. Adds unnecessary bundle weight and network connection overhead for all users.

**Fix:** Move `createClient()` inside a lazy getter; initialize only on routes wrapped by `AuthGuard` / `AdminGuard`.

---

#### 13. Organization Schema Not Using `@graph` Pattern — **P1 from CLAUDE.md, ongoing**
Multiple separate `<JsonLd>` components inject separate `<script type="application/ld+json">` blocks per page. Google recommends a single `@graph` array for correct entity relationship linking.

---

#### 14. `headless-wordpress` Tech Page Meta Description Too Short — **Week 2 unresolved**
`seo.techDetail.headless-wordpress.description` in `src/i18n/locales/en.json` is only ~87 characters. Recommended: 150–160 characters.

---

#### 15. Meta Description Boilerplate Endings
~20% of service and technology meta descriptions in `en.json` end with `"for European businesses."` Near-duplicate endings across pages weaken differentiation. Diversify to reflect specific service value propositions.

---

### 🟢 Passed Checks

- **Robots.txt** — Correctly configured; allows all search crawlers + 9 named AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, etc.); properly blocks auth/admin/dashboard/editor routes ✅
- **HSTS Header** — `.htaccess` contains `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` ✅
- **www Redirect** — `.htaccess` correctly redirects `www.dmckreatif.com` → `dmckreatif.com` via 301 ✅
- **Root Redirect** — `.htaccess` has `RewriteRule ^$ /en/ [R=301,L]` ✅
- **Hreflang in HTML + Sitemap** — Implemented in both `SeoHead.tsx` and `sitemap.xml` for all 4 locales + `x-default`; EN-only content correctly restricts hreflang to `["en"]` ✅
- **OpenGraph & Twitter Card** — All public page components emit `og:title`, `og:description`, `og:image` (1200×630), `og:locale`, `og:locale:alternate`, Twitter `summary_large_image` ✅
- **Canonical URLs** — Set on every page via `SeoHead.tsx`; supports `canonicalLocale` override for EN-only content ✅
- **Schema Coverage** — 17+ schema types across `seo-schemas.ts`; ProfessionalService, BreadcrumbList, Service, BlogPosting, SoftwareApplication, WebPage, AboutPage, ContactPage, OfferCatalog, CityPage, CountryPage, Industry, CaseStudy, PersonProfile, Product ✅
- **Sitemap URL Count** — 446 URLs, trailing slashes consistent, hreflang annotations on all locale variants ✅
- **About Sub-pages in Sitemap** — team, process, why-us, partners, careers, musa-kerem-demirci all present × 4 locales ✅
- **Portfolio Images** — All WebP format in `/public/portfolio/`; 26 files (desktop + mobile per project); proper `alt` attributes on all img tags ✅
- **Template Detail Pages in Sitemap** — 20 template detail URLs (EN only with `x-default`) ✅
- **Self-hosted Fonts** — Syne and DM Sans preloaded in `index.html`; zero Google Fonts dependency ✅
- **H1 LCP** — `HeroSection.tsx` H1 renders outside Framer Motion for immediate LCP paint ✅
- **Auth/Dashboard Blocked** — Login, register, forgot-password, reset-password, editor, dashboard, admin all disallowed in `robots.txt` ✅
- **CSP Header** — Content-Security-Policy set in `.htaccess`; `frame-ancestors 'none'` replaces X-Frame-Options ✅
- **Gzip Compression** — `mod_deflate` configured for HTML, CSS, JS, JSON, SVG, XML ✅
- **Cache Headers** — Immutable for hashed assets (JS/CSS: 1 year), images (1 month), HTML (no-cache) ✅
- **i18n Route Structure** — All public pages under `/:locale/` prefix; root `/` redirects to `/en` ✅
- **Case Study Detail Pages** — 6 case studies present in sitemap (EN only with `x-default`) ✅
- **BreadcrumbList on Detail Pages** — `buildBreadcrumbSchema()` used on service, blog, industry, tech, city detail pages ✅
- **Blog Internal Linking** — `relatedServiceSlugs` renders "Related Services" at article bottom ✅
- **Cookie Banner** — GDPR-compliant `CookieBanner` component included in `App.tsx` layout ✅
- **WhatsApp CTAs** — Persistent `WhatsAppButton` present sitewide ✅
- **All Major Routes in Sitemap** — Homepage, services (44), technologies (13), industries (8+), portfolio, pricing, about sub-pages, blog, case studies, templates, contact, country pages, city service pages all confirmed ✅
- **No Broken Internal Links** — All `<Link to=>` and `href=` values in components map to existing routes ✅
- **All img Tags Have Alt Attributes** — Full sweep confirmed; only intentionally empty alt on a decorative upload preview in `FileUpload.tsx` ✅

---

### 📊 Statistics

| Metric | This Week | Last Week | Trend |
|--------|-----------|-----------|-------|
| Total page components | 38 | 38 | → |
| Sitemap URLs | 446 | 446 | → |
| Blog articles total | 52 (31 EN + 9 FR + 6 NL + 6 DE) | 52 | → |
| Blog content gap (any locale) | **71 days** | 64 days | ↓ |
| Blog content gap (EN only) | **85 days** | 78 days | ↓ |
| Articles past 6-month threshold | **9** (+3 this week) | 6 | ↓ |
| Articles crossing threshold in next 7 days | 2 (Dec 27, Dec 30) | — | ↓ |
| Pages with complete meta | ~32/38 | ~32/38 | → |
| Pages with correct noindex | ~26/38 | ~28/38 | ↓ |
| Images with descriptive alt tags | 14/14 (100%) | 14/15 | ✅ |
| Schema types deployed | 17 | 17 | → |
| i18n locale coverage | 4/4 | 4/4 | → |
| Hreflang (HTML + sitemap) | ✅ | ✅ | → |
| Pre-rendering | ❌ | ❌ | → |
| Supabase lazy load | ❌ | ❌ | → |
| Sitemap lastmod (non-blog) | **84 days stale** (2026-03-02) | 77 days stale | ↓ |
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
| Core pages (home, about, blog, contact, etc.) | ~40 |
| Country pages | 4 |
| Case study detail pages | 6 |
| About sub-pages | ~28 |
| Legal/utility pages | ~12 |

**Blog freshness breakdown:**
| Age | Count | Articles |
|-----|-------|---------|
| < 1 month | 0 | — |
| 1–3 months | 6 | NL/DE batch (Mar 10–15), FR batch (Mar 2–10), EN London (Mar 1) |
| 3–6 months | 16 | Jan–Feb 2026 EN articles |
| > 6 months | **9** | Dec 1–24, 2025 EN articles (urgent) |
| Approaching 6 months | 2 | Dec 27–30, 2025 (within 5 days) |

---

### 📝 Content Recommendations

5 article topics to close the 85-day EN content gap and capture high-value European keywords:

| # | Title | Target Keywords | Locale | Priority |
|---|-------|----------------|--------|----------|
| 1 | "Agence Web Belgique — Création de Site pour PME Belges en 2026" | agence web belgique, création site internet bruxelles | FR | **Urgent** |
| 2 | "Website Laten Maken in België — Praktische Gids 2026 voor KMO" | website laten maken belgie, webbureau antwerpen | NL | **Urgent** |
| 3 | "Web Design Agency Netherlands — Building for Dutch Businesses" | web agency netherlands, website design amsterdam | EN | **High** |
| 4 | "E-Commerce Entwicklung für deutsche Unternehmen — Plattformvergleich 2026" | ecommerce entwicklung deutschland, onlineshop erstellen | DE | **High** |
| 5 | "GDPR & AI Act Compliance for European Websites in 2026" | AI act compliance, GDPR website europe 2026 | EN | High |

---

### 📅 Action Items (prioritized)

1. **[IMMEDIATE — 5 min]** Add `noIndex={true}` to `<SeoHead>` in 5 legal pages (`PrivacyPage.tsx`, `TermsPage.tsx`, `LegalNoticePage.tsx`, `CookiePolicyPage.tsx`, `RefundPolicyPage.tsx`) — **8 weeks overdue**
2. **[IMMEDIATE — 10 min]** Add `<meta name="robots" content="noindex, nofollow" />` to `TemplateOrderPage.tsx` and `TemplateOrderConfirmPage.tsx`
3. **[IMMEDIATE]** Publish 1 new EN blog article to break the 85-day gap (suggestion: "Web Design Agency Netherlands" — high intent, fresh territory)
4. **[IMMEDIATE]** Update `dateModified` + light content refresh on 9 articles past 6-month threshold (Dec 1–24, 2025); add "Last updated: May 2026" note to each
5. **[THIS WEEK]** Add `loading="lazy"` to `BeforeAfterSlider.tsx` image elements (~lines 78 and 93)
6. **[THIS WEEK]** Add `CollectionPage` + `ItemList` JSON-LD to `IndustriesPage.tsx` and `TechnologiesPage.tsx`
7. **[THIS WEEK]** Fix `src/lib/portfolio-data.ts`: `ata-accountancy` HTTP → HTTPS; `gmg-design` self-referential URL → actual client URL
8. **[THIS WEEK]** Update sitemap `<lastmod>` for all non-blog URLs to `2026-05-25`
9. **[THIS WEEK]** Fix BreadcrumbList null item edge case in `src/lib/seo-schemas.ts` — add `.filter(Boolean)` on `listItems`
10. **[THIS WEEK]** Extend `headless-wordpress` tech meta description from ~87 → 150+ chars in `src/i18n/locales/en.json`
11. **[THIS WEEK]** Change `SoftwareApplication` review `author` from `Organization` to `Person` in `buildTechnologySchema()`
12. **[THIS MONTH]** Add "Related Articles" section to `ServiceDetailPage.tsx` (improves internal linking score from 6/10 → 8/10)
13. **[THIS MONTH]** Fix `x-default` hreflang on locale-specific blog posts — change from self-reference to `/en/blog/`
14. **[ONGOING]** Implement pre-rendering (`vite-plugin-prerender`) — P0, highest single impact fix
15. **[ONGOING]** Lazy-initialize Supabase client (only on auth routes)
16. **[ONGOING]** Refactor schema output to single `@graph` pattern per page

---

### Scoring Breakdown

| Area | Score | Max | Notes |
|------|-------|-----|-------|
| Sitemap completeness | 13 | 15 | 446 URLs, hreflang present; non-blog lastmod now 84 days stale |
| Schema markup | 12 | 15 | 17 types deployed; missing on IndustriesPage, TechnologiesPage; author type bug unresolved |
| Meta tags quality | 15 | 20 | noindex missing on 5 legal + 2 order pages (7 total); ~87-char meta on headless-wordpress |
| Robots.txt | 5 | 5 | Complete, AI bot allowlist, auth route disallows |
| Performance/images | 12 | 15 | WebP portfolio images, alt tags 100%; BeforeAfterSlider lazy loading missing; SPA not prerendered |
| i18n/hreflang | 12 | 15 | HTML + sitemap hreflang implemented; x-default bug on locale-only posts |
| Content freshness | 7 | 15 | 71-day gap overall / 85-day EN gap; 9 articles past 6-month threshold (up from 6) |
| **Total** | **76** | **100** | |

---

### History

| Date | Score | Key Events |
|------|-------|-----------|
| 2026-05-25 | **76/100** | 3 more Dec 2025 articles crossed 6-month threshold (total: 9); EN content gap 85 days; no prior issues resolved; sitemap lastmod 84 days stale |
| 2026-05-18 | 77/100 | 11 Dec 2025 articles at 6-month threshold; content gap 64 days; no prior issues resolved; HSTS/root redirect confirmed present |
| 2026-05-04 | 79/100 | 2 new noindex gaps; content gap 50 days; blog freshness threshold approaching; monthly deep audit run |
| 2026-04-27 | 81/100 | H1 LCP fix confirmed ✅; sitemap lastmod partially updated; no new fixes |
| 2026-04-20 | 81/100 | Score unchanged; 4 image issues + Supabase global init persisting |
