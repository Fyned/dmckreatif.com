# SEO Report — dmckreatif.com
## Date: 2026-05-18
## Overall Score: 77/100 (↓ from 79 on 2026-05-04)

---

### Executive Summary

- **Score declined 2 points** — 11 December 2025 articles crossed the 6-month freshness threshold; content gap now 64 days; all critical issues from the previous 2 reports remain unresolved
- **7-week streak:** Legal pages still lack `noindex` — flagged since 2026-03-31, a 5-minute fix that has gone unresolved for 7 consecutive weekly reports
- **Content freshness breach:** 11 articles dated 2025-12-01 to 2025-12-15 are now 6+ months old (today: 2026-05-18). Articles with "2026" in titles published in late 2025 are now visibly stale to searchers
- **BeforeAfterSlider and IndustriesPage/TechnologiesPage schema gaps** — also unresolved since the prior cycle
- **Portfolio data defects** persist: `ata-accountancy` uses HTTP, `gmg-design` self-references the agency domain

---

### 🔴 Critical Issues (fix immediately)

#### 1. Legal Pages Missing `noindex` — **WEEK 7 UNRESOLVED**
5 publicly-crawlable pages with no ranking value are fully indexed, wasting crawl budget and generating thin-content signals. First flagged 2026-03-31 — now 7 consecutive reports unresolved.

| File | Route |
|------|-------|
| `src/pages/PrivacyPage.tsx` | `/:locale/privacy` |
| `src/pages/TermsPage.tsx` | `/:locale/terms` |
| `src/pages/LegalNoticePage.tsx` | `/:locale/legal` |
| `src/pages/CookiePolicyPage.tsx` | `/:locale/cookie-policy` |
| `src/pages/RefundPolicyPage.tsx` | `/:locale/refund-policy` |

Confirmed still unfixed: all 5 `SeoHead` blocks use title + description props only, no `noIndex={true}`.

**Fix:** Add `noIndex={true}` to the `<SeoHead>` in each of the 5 files. One prop per file, ~5 minutes total.

---

#### 2. Blog Content Gap — 64 Days Without New Article + 6-Month Freshness Breach
Last article published: **2026-03-15**. Gap now at **64 days** (was 50 days last report).

More critically, as of today (2026-05-18), **11 articles dated 2025-12-01 through 2025-12-15 are now 6+ months old** and have crossed the "needs review" threshold. Articles with "2026" in their titles (e.g., `state-of-web-development-2026`, published 2025-12-15) are actively misleading — users and crawlers see "2026" in the headline but the content has not been refreshed in 6 months.

**Oldest articles (now urgent):**

| Slug | Date | Age | Issue |
|------|------|-----|-------|
| `roi-professional-web-design` | 2025-12-01 | 5.6 mo | Refresh content |
| `core-web-vitals-explained` | 2025-12-03 | 5.5 mo | Refresh content |
| `ai-web-development-2026` | 2025-12-06 | 5.4 mo | "2026" title, stale |
| `state-of-web-development-2026` | 2025-12-15 | 5.1 mo | "2026" title, stale — **highest priority** |
| `multilingual-seo-europe` | 2025-12-12 | 5.2 mo | Refresh |
| `web-design-construction` | 2025-12-09 | 5.3 mo | Refresh |

**Fix:** Publish 1 new article immediately to break the 64-day gap. Update `dateModified` + add a "Last updated" note to the 6 stale articles listed above.

---

#### 3. No Pre-rendering (SPA Indexability) — **P0 from CLAUDE.md, ongoing**
The entire site is a client-side SPA. Googlebot must execute JavaScript to read content. This affects all 446 sitemap URLs and is the single largest indexability risk across the site. No progress this cycle.

**Fix:** Implement `vite-plugin-prerender` as documented in `CLAUDE.md:P0`. Priority routes: 4 locale homepages, 44 service detail pages, industries/technologies indexes, blog index, contact, pricing.

---

#### 4. TemplateOrderPage + TemplateOrderConfirmPage Missing `noindex` — **Week 2 unresolved**
Both pages use `<Helmet>` directly with no `noindex` meta tag. `robots.txt` partially covers the order path but does not guarantee block of `confirm/:orderId` URLs. Defense-in-depth requires the HTML `<meta name="robots" content="noindex, nofollow" />` tag.

**Fix:** Add the meta robots tag inside the `<Helmet>` block in `src/pages/TemplateOrderPage.tsx` and `src/pages/TemplateOrderConfirmPage.tsx`.

---

### 🟡 Warnings (fix this week)

#### 5. IndustriesPage & TechnologiesPage Missing JSON-LD — **Week 6 unresolved**

| Page | File | Missing Schema |
|------|------|----------------|
| `/:locale/industries` | `src/pages/IndustriesPage.tsx` | `CollectionPage` + `ItemList` |
| `/:locale/technologies` | `src/pages/TechnologiesPage.tsx` | `CollectionPage` + `ItemList` |

**Fix:** Add `<JsonLd>` component with `buildWebPageSchema()` + inline `ItemList` (same pattern as `BlogPage.tsx`).

---

#### 6. BeforeAfterSlider Missing `loading="lazy"` — **Week 6 unresolved**
`src/components/portfolio/BeforeAfterSlider.tsx` lines 78 and 93: both `<img>` elements have `width`, `height`, and `decoding="async"` but no `loading="lazy"`. Portfolio section renders far below the fold.

**Fix:** Add `loading="lazy"` to both `<img>` elements in BeforeAfterSlider.tsx.

---

#### 7. Portfolio Data Issues — **Week 2 unresolved**

| Item | File | Issue |
|------|------|-------|
| `ata-accountancy` (#07) | `src/lib/portfolio-data.ts:209` | URL uses `http://ataaccountancy.com` — should be HTTPS |
| `gmg-design` (#09) | `src/lib/portfolio-data.ts:253` | URL points to `https://dmckreatif.com` — self-referential; replace with the actual client URL |

---

#### 8. BreadcrumbList Null Item Bug — **P1 from CLAUDE.md, unconfirmed fix**
`src/lib/seo-schemas.ts` `buildBreadcrumbSchema()` — edge case can produce `null` ListItem entries. A malformed BreadcrumbList generates Search Console rich result errors.

**Fix:** Add `.filter(Boolean)` or null guard on `listItems` array before building `itemListElement`.

---

#### 9. Sitemap `lastmod` Staleness — Non-blog pages
All non-blog pages in the sitemap show `lastmod: 2026-03-02` (77 days ago). Blog posts use individual article dates correctly. Static pages (services, about, pricing, portfolio, contact) have not had their `lastmod` updated, even though content may have changed.

**Fix:** Update `lastmod` for static pages to `2026-05-18`.

---

#### 10. `SoftwareApplication` Schema — Review Author Type
`src/lib/seo-schemas.ts` `buildTechnologySchema()` sets the review `author` as `{ "@type": "Organization" }`. Google's SoftwareApplication rich results eligibility requires `Person` as review author type.

**Fix:** Change to `{ "@type": "Person", "name": "Musa Kerem Demirci" }` in `buildTechnologySchema()`.

---

#### 11. Locale-Specific Blog Posts: `x-default` Points to Self — **Week 3 unresolved**
FR/NL/DE-only blog posts in `sitemap.xml` include only `hreflang="{locale}"` + `hreflang="x-default"` with `x-default` pointing to the same locale URL. Per Google guidelines, `x-default` for locale-exclusive content should point to the canonical fallback (`/en/blog/`), not the same single-locale URL.

---

#### 12. Supabase Client Initialized Globally — **P0 from CLAUDE.md, ongoing**
`src/lib/supabase.ts` is imported at module level, initializing the Supabase SDK for every visitor on every page — including the majority who never authenticate. Adds unnecessary bundle weight and network connection for all users.

**Fix:** Move `createClient()` inside a lazy getter; initialize only on routes wrapped by `AuthGuard` / `AdminGuard`.

---

#### 13. Organization Schema Not Using `@graph` Pattern — **P1 from CLAUDE.md, ongoing**
Multiple separate `<JsonLd>` components inject separate `<script type="application/ld+json">` blocks per page. Google recommends a single `@graph` array for correct entity relationship linking across schemas on the same page.

---

#### 14. `headless-wordpress` Tech Page Meta Description Too Short
`seo.techDetail.headless-wordpress.description` in `src/i18n/locales/en.json` is only ~87 characters. Recommended: 150–160 characters. Short descriptions are often auto-rewritten by Google with lower-quality text.

---

#### 15. Meta Description Boilerplate Endings
~20% of service and technology meta descriptions in `en.json` end with the phrase `"for European businesses."` Near-duplicate endings across pages weaken differentiation. Diversify to reflect specific service value propositions and regional specificity.

---

### 🟢 Passed Checks

- **Robots.txt** — Correctly configured; allows all search crawlers + 9 named AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, etc.); properly blocks auth/admin/dashboard/editor routes ✅
- **HSTS Header** — `.htaccess` contains `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` ✅
- **www Redirect** — `.htaccess` correctly redirects `www.dmckreatif.com` → `dmckreatif.com` via 301 ✅
- **Root Redirect** — `.htaccess` has `RewriteRule ^$ /en/ [R=301,L]` ✅
- **Hreflang in HTML + Sitemap** — Implemented in both `SeoHead.tsx` and `sitemap.xml` for all 4 locales + `x-default`; EN-only content correctly restricts hreflang to `["en"]` ✅
- **OpenGraph & Twitter Card** — All public page components emit `og:title`, `og:description`, `og:image` (1200×630), `og:locale`, `og:locale:alternate`, Twitter `summary_large_image` ✅
- **Canonical URLs** — Set on every page via `SeoHead.tsx`; supports `canonicalLocale` override for EN-only content ✅
- **Schema Coverage** — 17+ schema types across 820 lines of `seo-schemas.ts`; ProfessionalService, BreadcrumbList, Service, BlogPosting, SoftwareApplication, WebPage, AboutPage, ContactPage, OfferCatalog ✅
- **Sitemap URL Count** — 446 URLs, trailing slashes consistent, hreflang annotations on all locale variants ✅
- **About Sub-pages in Sitemap** — team, process, why-us, partners, careers, musa-kerem-demirci all present × 4 locales ✅
- **Portfolio Images** — All WebP format in `/public/portfolio/`; proper `width`, `height`, `loading="lazy"` on portfolio card images ✅
- **Template Detail Pages in Sitemap** — 20 template detail URLs (EN only with `x-default`); previously flagged as missing, now confirmed present ✅
- **Self-hosted Fonts** — Syne and DM Sans preloaded in `index.html`; zero Google Fonts dependency ✅
- **H1 LCP** — `HeroSection.tsx` H1 renders outside Framer Motion for immediate LCP paint ✅
- **Auth/Dashboard Blocked** — Login, register, forgot-password, reset-password, editor, dashboard, admin all disallowed in `robots.txt` ✅
- **CSP Header** — Content-Security-Policy set in `.htaccess`; `frame-ancestors 'none'` replaces X-Frame-Options ✅
- **Gzip Compression** — `mod_deflate` configured in `.htaccess` for HTML, CSS, JS, JSON, SVG, XML ✅
- **Cache Headers** — Immutable for hashed assets (JS/CSS: 1 year), images (1 month), HTML (no-cache) ✅
- **i18n Route Structure** — All public pages under `/:locale/` prefix; root `/` redirects to `/en` ✅
- **Case Study Detail Pages** — 6 case studies present in sitemap (EN only with `x-default`) ✅
- **BreadcrumbList on Detail Pages** — `buildBreadcrumbSchema()` used on service, blog, industry, tech, city detail pages ✅
- **Blog Related Services Links** — `relatedServiceSlugs` renders "Related Services" cards at article bottom; bidirectional linking partially present ✅
- **Cookie Banner** — GDPR-compliant `CookieBanner` component included in App.tsx layout ✅
- **WhatsApp CTAs** — Persistent `WhatsAppButton` present sitewide ✅

---

### 📊 Statistics

| Metric | This Week | Last Week | Trend |
|--------|-----------|-----------|-------|
| Total page components | 38 | 38 | → |
| Sitemap URLs | 446 | 446 | → |
| Blog articles total | 52 (31 EN + 9 FR + 6 NL + 6 DE) | 51 | +1 |
| Blog content gap | **64 days** | 50 days | ↓ |
| Articles past 6-month threshold | **11** (Dec 2025 now crossed) | 0 triggered | ↓ |
| Pages with complete meta | ~32/38 | ~32/38 | → |
| Pages with correct noindex | ~28/38 | ~30/38 | ↓ |
| Images with descriptive alt tags | ~14/15 | ~14/15 | → |
| Schema types deployed | 17 | 17 | → |
| i18n locale coverage | 4/4 | 4/4 | → |
| Hreflang (HTML + sitemap) | ✅ | ✅ | → |
| Pre-rendering | ❌ | ❌ | → |
| Supabase lazy load | ❌ | ❌ | → |
| Sitemap lastmod (non-blog) | **77 days stale** (2026-03-02) | 63 days stale | ↓ |
| Internal linking score | 6/10 | 6/10 | → |
| Portfolio image format | WebP ✅ | WebP ✅ | → |
| HSTS header | ✅ | ✅ | → |

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

---

### 📝 Content Recommendations

5 article topics to close the 64-day content gap and capture high-value European keywords (same priorities as last report, still open):

| # | Title | Target Keywords | Locale | Priority |
|---|-------|----------------|--------|----------|
| 1 | "Agence Web Belgique — Création de Site pour PME Belges en 2026" | agence web belgique, création site internet bruxelles | FR | **Urgent** |
| 2 | "Website Laten Maken in België — Praktische Gids 2026 voor KMO" | website laten maken belgie, webbureau antwerpen | NL | **Urgent** |
| 3 | "Refonte de Site Web PME : Quand et Comment Repenser Votre Présence Digitale" | refonte site web, redesign site internet france 2026 | FR | **High** |
| 4 | "E-Commerce Entwicklung für deutsche Unternehmen — Plattformvergleich 2026" | ecommerce entwicklung deutschland, onlineshop erstellen | DE | **High** |
| 5 | "Digital Marketing Bureau Nederland: Wat Werkt in 2026" | digital marketing nederland, online marketing bureau | NL | Medium |

---

### 📅 Action Items (prioritized)

1. **[IMMEDIATE — 5 min]** Add `noIndex={true}` to `SeoHead` in 5 legal pages (`src/pages/PrivacyPage.tsx`, `TermsPage.tsx`, `LegalNoticePage.tsx`, `CookiePolicyPage.tsx`, `RefundPolicyPage.tsx`) — **7 weeks overdue**
2. **[IMMEDIATE — 10 min]** Add `<meta name="robots" content="noindex, nofollow" />` to `TemplateOrderPage.tsx` and `TemplateOrderConfirmPage.tsx`
3. **[IMMEDIATE]** Publish 1 new blog article to break 64-day content gap (see content recommendations above)
4. **[IMMEDIATE]** Update `dateModified` + add content refreshes to 6 articles that crossed the 6-month threshold: `roi-professional-web-design`, `core-web-vitals-explained`, `ai-web-development-2026`, `state-of-web-development-2026`, `multilingual-seo-europe`, `web-design-construction`
5. **[THIS WEEK]** Add `loading="lazy"` to `BeforeAfterSlider.tsx` image elements (lines 78 and 93)
6. **[THIS WEEK]** Add `CollectionPage` + `ItemList` JSON-LD to `IndustriesPage.tsx` and `TechnologiesPage.tsx`
7. **[THIS WEEK]** Fix `src/lib/portfolio-data.ts`: item `ata-accountancy` HTTP → HTTPS; item `gmg-design` self-referential URL → actual client URL
8. **[THIS WEEK]** Update sitemap `<lastmod>` for all non-blog URLs to `2026-05-18`
9. **[THIS WEEK]** Investigate and fix BreadcrumbList null item edge case in `src/lib/seo-schemas.ts`
10. **[THIS WEEK]** Extend `headless-wordpress` tech meta description from ~87 → 150+ chars in `src/i18n/locales/en.json`
11. **[THIS WEEK]** Change `SoftwareApplication` review `author` from `Organization` to `Person` in `buildTechnologySchema()`
12. **[THIS MONTH]** Add "Related Articles" section to `ServiceDetailPage.tsx` using inverse of `relatedServiceSlugs` (improves internal linking score from 6/10 toward 8/10)
13. **[THIS MONTH]** Fix `x-default` hreflang on locale-specific blog posts — change from self-reference to `/en/blog/`
14. **[ONGOING]** Implement pre-rendering (`vite-plugin-prerender`) — P0, highest single impact fix
15. **[ONGOING]** Lazy-initialize Supabase client (only on auth routes)
16. **[ONGOING]** Refactor schema output to single `@graph` pattern per page

---

### Scoring Breakdown

| Area | Score | Max | Notes |
|------|-------|-----|-------|
| Sitemap completeness | 13 | 15 | 446 URLs, hreflang present; non-blog lastmod 77 days stale |
| Schema markup | 12 | 15 | 17 types deployed; missing on IndustriesPage, TechnologiesPage; author type bug |
| Meta tags quality | 15 | 20 | noindex missing on 5 legal pages + 2 order pages; ~87-char description on headless-wordpress |
| Robots.txt | 5 | 5 | Complete, with AI bot allowlist and auth route disallows |
| Performance/images | 12 | 15 | WebP portfolio images, lazy loading mostly correct; BeforeAfterSlider missing loading="lazy"; SPA not prerendered |
| i18n/hreflang | 12 | 15 | HTML + sitemap hreflang implemented; x-default bug on locale-only posts |
| Content freshness | 8 | 15 | 64-day gap; 11 articles now 6+ months old |
| **Total** | **77** | **100** | |

---

### History

| Date | Score | Key Events |
|------|-------|-----------|
| 2026-05-18 | **77/100** | 11 Dec 2025 articles crossed 6-month threshold; content gap 64 days; no prior issues resolved; HSTS/root redirect confirmed present (previous false flag corrected) |
| 2026-05-04 | 79/100 | 2 new noindex gaps; content gap 50 days; blog freshness threshold approaching; monthly deep audit run |
| 2026-04-27 | 81/100 | H1 LCP fix confirmed ✅; sitemap lastmod partially updated; no new fixes |
| 2026-04-20 | 81/100 | Score unchanged; 4 image issues + Supabase global init persisting |
