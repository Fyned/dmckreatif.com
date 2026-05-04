# SEO Report — dmckreatif.com
## Date: 2026-05-04
## Overall Score: 79/100 (↓ from 81 on 2026-04-27)

---

### Executive Summary

- **Score declined 2 points** — blog content gap worsened to 50 days, 2 new noindex gaps discovered, no prior open items resolved
- **Week 6 unresolved:** Legal pages still indexed without `noindex` — this is the highest-value 5-minute fix remaining in the codebase
- **50-day content gap:** Last blog post published 2026-03-15; freshness signals degrading; 11 December 2025 articles now 4.5–5 months old, approaching the 6-month review threshold
- **New findings:** `TemplateOrderPage` and `TemplateOrderConfirmPage` have no `noindex` tag (though `robots.txt` partially mitigates); portfolio item #09 links to agency's own domain (self-referential); portfolio item #07 uses HTTP
- **Monthly deep audit (May 1–7):** Full link audit, keyword gap analysis, schema deep-check, and accessibility findings included below

---

### 🔴 Critical Issues (fix immediately)

#### 1. Legal Pages Missing `noindex` — **Week 6 unresolved**
5 publicly-crawlable pages with no ranking value are being indexed, wasting crawl budget and risking thin-content signals. This was first flagged 2026-03-31 and has gone unresolved for 5 consecutive reports.

| File | Route |
|------|-------|
| `src/pages/PrivacyPage.tsx` | `/:locale/privacy` |
| `src/pages/TermsPage.tsx` | `/:locale/terms` |
| `src/pages/LegalNoticePage.tsx` | `/:locale/legal` |
| `src/pages/CookiePolicyPage.tsx` | `/:locale/cookie-policy` |
| `src/pages/RefundPolicyPage.tsx` | `/:locale/refund-policy` |

**Fix:** Add `noIndex={true}` to the `<SeoHead>` in each of the 5 files. 5-minute fix.

---

#### 2. Blog Content Gap — 50 Days Without New Article
Last article published: **2026-03-15**. Google interprets extended publishing silence as reduced site activity, lowering crawl frequency and freshness scores for the entire domain.

Additionally, **11 articles published in December 2025** are now 4.5–5 months old and will cross the 6-month "needs review" threshold within weeks. The highest-priority refresh candidate is the article with slug `state-of-web-development-2026` (dated 2026-12-15) — "2026 trends" content published in late 2025 appears stale to users and crawlers alike.

**Fix:** Publish 1 new article immediately; schedule monthly refreshes for December 2025 articles.

---

#### 3. No Pre-rendering (SPA Indexability) — **P0 from CLAUDE.md, ongoing**
The site is a client-side SPA. Googlebot must execute JavaScript to read any content. This remains the largest indexability risk for organic ranking across all 446 sitemap URLs.

**Fix:** Implement `vite-plugin-prerender` (documented in `CLAUDE.md:P0`). Priority routes: homepage × 4 locales, all 44 service detail pages, industries index, technologies index, blog index, contact, pricing.

---

#### 4. TemplateOrderPage Missing `noindex` — **New**
`src/pages/TemplateOrderPage.tsx` sets a title and description via `<Helmet>` but has no `noindex` tag. `robots.txt` disallows `/*/template-order` as a prefix, which covers the order page path — but `<meta name="robots" content="noindex, nofollow">` is defense-in-depth best practice for transactional pages.

`src/pages/TemplateOrderConfirmPage.tsx` has the same gap. Confirm page paths (`/*/templates/order/confirm/:orderId`) may not match the `template-order` disallow prefix depending on the URL structure.

**Fix:** Add `<meta name="robots" content="noindex, nofollow" />` inside the `<Helmet>` block in both files.

---

### 🟡 Warnings (fix this week)

#### 5. IndustriesPage & TechnologiesPage Missing JSON-LD — **Week 5 unresolved**

| Page | File | Missing Schema |
|------|------|----------------|
| `/:locale/industries` | `src/pages/IndustriesPage.tsx` | `CollectionPage` + `ItemList` |
| `/:locale/technologies` | `src/pages/TechnologiesPage.tsx` | `CollectionPage` + `ItemList` |

**Fix:** Add `<JsonLd>` component with `buildWebPageSchema()` + inline `ItemList` (same pattern as `BlogPage.tsx:57`).

---

#### 6. BeforeAfterSlider Missing `loading="lazy"` — **Week 5 unresolved**
`src/components/portfolio/BeforeAfterSlider.tsx` lines 78 and 93: both `<img>` elements have `decoding="async"` but no `loading="lazy"`. Portfolio section renders far below the fold.

**Fix:** Add `loading="lazy"` to both `<img>` elements.

---

#### 7. Portfolio URL Issues — **New**

| Item | File | Issue |
|------|------|-------|
| `ata-accountancy` (#07) | `src/lib/portfolio-data.ts` | `url` uses `http://` — not HTTPS. Verify if live site has SSL; update to `https://`. |
| `gmg-design` (#09) | `src/lib/portfolio-data.ts` | `url` points to `https://dmckreatif.com` — agency's own domain. Visitors clicking "Visit Site" stay on the same page. Replace with the actual client URL. |

---

#### 8. CaseStudiesPage Listing Images Missing `width`/`height` — **New**
`src/pages/CaseStudiesPage.tsx` — card listing images lack explicit `width` and `height` attributes. This causes Cumulative Layout Shift (CLS) in browsers that don't fully respect CSS aspect-ratio before the image loads.

**Fix:** Add `width={1200}` and `height={675}` to card `<img>` elements (matches the actual asset dimensions used across the portfolio).

---

#### 9. Supabase Client Initialized Globally — **P0 from CLAUDE.md, ongoing**
`src/lib/supabase.ts` is imported at module level by 6 lib files, triggering SDK initialization on every page load for all visitors — the majority of whom never authenticate. Adds unnecessary bundle overhead and network latency.

**Fix:** Move `createClient()` inside a lazy getter; load only on routes wrapped by `AuthGuard` / `AdminGuard`.

---

#### 10. Root Redirect & HSTS Missing — **P1 from CLAUDE.md, ongoing**
No `.htaccess` handles:
- Root `/` → `/{browser-locale}/` server-side redirect (blank SPA shell risk on direct navigation)
- `Strict-Transport-Security` (HSTS) header

---

#### 11. Organization Schema Not Using `@graph` Pattern — **P1 from CLAUDE.md, ongoing**
Multiple JSON-LD scripts are injected per page via separate `<JsonLd>` components. Google's documentation recommends a single `@graph` array for correct entity relationship linking.

---

#### 12. Short Meta Description — `headless-wordpress` Tech Page — **New**
`headless-wordpress` technology detail meta description is only **87 characters** — well below the recommended 150–160 range. Short descriptions are often auto-rewritten by Google with lower-quality text.

**Fix:** Extend to 150–160 characters in `src/i18n/locales/en.json` under `seo.techDetail.headless-wordpress.description`.

---

#### 13. Meta Description Boilerplate Ending — **New**
Approximately 20% of service and technology meta descriptions in `en.json` end with the phrase `"for European businesses."` While not identical full strings, near-duplicate endings are a weak quality signal. Diversify endings to reflect the specific service and target market more precisely.

---

#### 14. Locale-Specific Blog Posts: `x-default` Points to Self — **Week 2 unresolved**
DE/FR/NL-only blog posts in `sitemap.xml` include only `hreflang="{locale}"` + `hreflang="x-default"` — with `x-default` pointing to the same locale URL. Per Google guidelines, `x-default` for locale-exclusive content should point to the blog index (`/en/blog/`) rather than the single-locale post URL.

---

#### 15. `SoftwareApplicationSchema` Review Author Type
`src/lib/seo-schemas.ts` — `buildSoftwareApplicationSchema()` sets the review `author` as type `Organization`. Google's SoftwareApplication rich results eligibility favors `Person` as review author type.

**Fix:** Change review `author` to `{ "@type": "Person", "name": "..." }` in the schema builder.

---

#### 16. Blog Posts from December 2025 Approaching Freshness Threshold
11 articles published 2025-12-01 to 2025-12-31 are now 4.5–5 months old and will cross the 6-month stale threshold in late May / early June 2026. Articles with "2025" or "2026" in their titles or H1s are especially vulnerable to searcher bounce from perceived outdated content.

**Prioritized refresh list:**
1. `state-of-web-development-2026` — title claims currency, dated Dec 2025
2. Any article with "2025 trends" or "this year" language in the body

---

### 🟢 Passed Checks

- **Robots.txt** — Correctly configured; allows all crawlers + 9 named AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.); blocks CCBot, admin/auth/editor routes ✅
- **H1 LCP Fix** — `HeroSection.tsx` H1 is outside the Framer Motion tree for instant LCP paint ✅
- **Hreflang** — Implemented in both `<SeoHead>` HTML head and `sitemap.xml` for all 4 locales + `x-default`; EN-only content correctly restricts hreflang to `["en"]` ✅
- **OpenGraph & Twitter Card** — All 32+ public page components emit `og:title`, `og:description`, `og:image` (1200×630), `og:locale`, `og:locale:alternate`, Twitter `summary_large_image` ✅
- **Canonical URLs** — Set on every page via `SeoHead.tsx` ✅
- **Schema Coverage** — 17 schema types across 820 lines of `seo-schemas.ts`; static `@graph` in `index.html` for site-level entities ✅
- **FAQPage Schema Removed** — Correctly absent; Google restricted FAQ rich results to government/healthcare (August 2023) ✅
- **Auth/Dashboard Pages Properly Blocked** — Login, register, forgot-password, reset-password, editor, dashboard, admin all have `noindex` or are disallowed in `robots.txt` ✅
- **Sitemap Structure** — 446 URLs, trailing slashes consistent, all locale variants with hreflang annotations; about/ sub-pages included (28 URLs across 4 locales × 7 sub-pages) ✅
- **About Sub-pages in Sitemap** — team, process, why-us, partners, careers, musa-kerem-demirci all present × 4 locales ✅
- **Portfolio Images** — All WebP format in `/public/portfolio/`; `ProjectCard.tsx` has proper `width`, `height`, `loading="lazy"` ✅
- **Self-hosted Fonts** — Syne and DM Sans preloaded via `<link rel="preload" as="font">` in `index.html`; no Google Fonts dependency ✅
- **CaseStudyDetailPage Hero** — Uses `loading="eager"` + `fetchPriority="high"` for LCP image ✅
- **Client Logo Alt Text** — `ClientLogoBar.tsx` uses client name as alt text ✅
- **GrapeJS Code-split** — Heavy GrapeJS editor is auth-guarded and lazy-loaded; should not appear in main bundle ✅
- **i18n Route Structure** — All public pages under `/:locale/` prefix; root `/` redirects to `/en` ✅
- **BreadcrumbList** — Implemented via `buildBreadcrumbSchema()` across detail pages ✅
- **Sitemap `changefreq`/`priority` absence** — Acceptable; Google ignores these signals as of 2023 ✅

---

### 📊 Statistics

| Metric | This Week | Last Week | Trend |
|--------|-----------|-----------|-------|
| Total page components | 38 | 38 | → |
| Sitemap URLs | 446 | 446 | → |
| Blog articles total | 30 EN + 9 FR + 6 NL + 6 DE = **51** | 52 | → |
| Blog content gap | **50 days** | 43 days | ↓ |
| Blog posts near 6-month threshold | **11** (Dec 2025) | 0 | ↓ |
| Pages with complete meta (title+desc+OG+canonical) | ~32/38 | ~33/38 | ↓ |
| Pages with correct noindex where needed | **~30/38** | ~33/38 | ↓ (new gaps found) |
| Images with descriptive alt tags | ~14/15 | ~14/15 | → |
| Schema types deployed | **17** | 7 (undercounted prev.) | ↑ |
| i18n locale coverage | 4/4 | 4/4 | → |
| Hreflang (HTML + sitemap) | ✅ | ✅ | → |
| Pre-rendering | ❌ | ❌ | → |
| Supabase lazy load | ❌ | ❌ | → |
| Sitemap lastmod staleness | **50 days** (last: 2026-03-15) | 56 days (partial improvement) | ↑ |
| Internal linking score | 6/10 | 7/10 | ↓ |

---

### 📅 Monthly Deep Audit — May 2026

#### 12. Full Internal Link Audit

**Pages with insufficient internal links (< 3 inbound links):**

| Page | Issue |
|------|-------|
| `/:locale/industries` | Not in main nav or footer; only reachable from homepage CTAs and sitemap |
| `/:locale/technologies` | Not in main nav or footer; only reachable from service detail pages and sitemap |
| `/:locale/case-studies` (FR/NL/DE) | Individual case study pages exist only in EN; other locales have only the listing page with no deep linking |
| `/:locale/about/musa-kerem-demirci` | Author bio page only linked from blog post bylines |
| `/:locale/about/partners` | Partners page only reachable from `/about/` listing |

**One-directional link problem:**
Blog articles reference related services via `relatedServiceSlugs`, which renders "Related Services" cards at the bottom of each post — **but service detail pages do not link back to relevant blog posts**. This means blog equity flows to services, but services pass no equity back. Recommended fix: add a "Related Articles" section (2–3 posts) to each `ServiceDetailPage.tsx` using the inverse of `relatedServiceSlugs`.

**City service sub-pages:**
City-specific service sub-pages (`/en/web-agency-amsterdam/seo/` etc.) exist only in EN in both the sitemap and in-page hreflang. FR/NL/DE locales have only the top-level city pages. This is likely intentional (incomplete translation) but represents a structural gap for non-EN city targeting.

---

#### 13. Keyword Gap Analysis — European Market (10 Targets)

**High Priority — attainable with existing content structure:**

| # | Keyword | Volume Est. | Language | Gap |
|---|---------|-------------|----------|-----|
| 1 | `agence web belgique` | High | FR | No dedicated FR Belgium landing page |
| 2 | `website laten maken belgie` | High | NL | No dedicated NL Belgium landing page |
| 3 | `web agency london` | High | EN | London city page exists; needs stronger content |
| 4 | `création site internet artisan` | Medium | FR | No service page targeting trades/artisans |
| 5 | `refonte site web PME` | Medium | FR | No blog article or service page on site redesign |

**Medium Priority — new content required:**

| # | Keyword | Volume Est. | Language | Gap |
|---|---------|-------------|----------|-----|
| 6 | `seo agency europe` | Medium | EN | No dedicated "SEO agency" landing page (only SEO as a service) |
| 7 | `react development europe` | Medium | EN | Tech page exists but not geo-targeted |
| 8 | `ecommerce entwicklung deutschland` | Medium | DE | No DE-language e-commerce article |
| 9 | `digital marketing bureau nederland` | Medium | NL | No NL-language digital marketing article |
| 10 | `website redesign small business uk` | Low-Medium | EN | UK market underserved in blog content |

---

#### 14. Structured Data Deep Check

**BreadcrumbList null fix (P1 from CLAUDE.md):**
`src/lib/seo-schemas.ts:208` — BreadcrumbList builder may output `null` breadcrumb items in edge cases. This was flagged in CLAUDE.md P1 but not yet investigated. A malformed BreadcrumbList with null ListItem positions causes Google Search Console rich result errors.

**Recommended investigation:** Add a guard in `buildBreadcrumbSchema()` to filter null/undefined items before building the `itemListElement` array.

**SoftwareApplication review author type:**
`buildSoftwareApplicationSchema()` uses `{ "@type": "Organization" }` as review author. Google's SoftwareApp rich results eligibility favors `Person` authors. Change to `{ "@type": "Person", "name": "..." }`.

**@graph pattern (P1 from CLAUDE.md, ongoing):**
Currently multiple `<JsonLd>` components inject separate `<script type="application/ld+json">` blocks per page. Pages can have 2–4 separate schema scripts. Merging into a single `@graph` array improves entity disambiguation — Google parses all entities in a single `@graph` as related to the same web page.

**Missing schemas identified:**
- `IndustriesPage` — no JSON-LD (Week 5 unresolved)
- `TechnologiesPage` — no JSON-LD (Week 5 unresolved)
- `TemplateDetailPage` — has `SeoHead` but schema type not confirmed; should have `SoftwareApplication` or `Product` schema

**Schema quality summary:**

| Schema | Status | Notes |
|--------|--------|-------|
| ProfessionalService | ✅ | Static @graph in index.html; includes aggregateRating + 6 Reviews |
| BreadcrumbList | ⚠️ | null item fix needed (CLAUDE.md P1) |
| Service | ✅ | Per service detail page |
| BlogPosting | ✅ | Per blog post; datePublished + dateModified present |
| SoftwareApplication | ⚠️ | Review author should be Person not Organization |
| WebPage | ✅ | Generic fallback for unlisted page types |
| AboutPage | ✅ | |
| ContactPage | ✅ | |
| CollectionPage | ⚠️ | Missing on IndustriesPage and TechnologiesPage |
| ProfessionalService (city) | ✅ | Geo-targeted for city pages |
| ItemList | ❌ | Missing on IndustriesPage and TechnologiesPage |

---

#### 15. Accessibility Audit

**Heading hierarchy** (based on component survey):
- `HeroSection.tsx` — H1 confirmed outside Framer Motion (LCP fix applied) ✅
- Service, industry, tech, blog detail pages — each uses a single H1 from i18n title key ✅
- Risk area: Blog post content files in `src/data/blog/content/en/*.ts` inject raw HTML strings. If any article's HTML starts with `<h2>` or skips heading levels, the heading hierarchy breaks. No automated validation exists for injected blog HTML.

**Recommended fix:** Add a CI lint step or build-time check that validates blog content HTML strings start with an `<h2>` (not `<h1>` — the page-level H1 comes from the `BlogPostPage.tsx` component itself).

**Aria labels:**
Interactive elements in GrapeJS editor are auth-gated. Main site components (navigation, modals, forms) were not audited deeply this cycle. Flagged for next deep audit.

---

### 📝 Content Recommendations

5 article topics to close the content gap and capture high-value European keywords:

| # | Title | Target Keywords | Locale | Priority |
|---|-------|----------------|--------|----------|
| 1 | "Agence Web Bruxelles — Création de Site Professionnel pour PME Belges" | agence web bruxelles, création site web belgique | FR | **High** |
| 2 | "Website Laten Maken in België — Complete Gids voor Ondernemers" | website laten maken belgie, webdesign bureau antwerpen | NL | **High** |
| 3 | "Refonte de Site Web en 2026 : Quand et Comment Repenser Votre Présence Digitale" | refonte site web, redesign site internet france | FR | **High** |
| 4 | "React vs WordPress in 2026: Which Is Right for Your European Business?" | react website europe, wordpress alternative 2026 | EN | Medium |
| 5 | "E-Commerce Development for French and Belgian Markets: Platform Guide 2026" | ecommerce développement france, boutique en ligne belgique | EN/FR | Medium |

---

### 📅 Action Items (prioritized)

1. **[IMMEDIATE — 5 min]** Add `noIndex={true}` to `SeoHead` in 5 legal pages — **6 weeks overdue**
2. **[IMMEDIATE — 10 min]** Add `<meta name="robots" content="noindex, nofollow" />` to `TemplateOrderPage.tsx` and `TemplateOrderConfirmPage.tsx`
3. **[THIS WEEK]** Publish 1 blog article to break 50-day content gap (see recommendations above)
4. **[THIS WEEK]** Add `CollectionPage` + `ItemList` JSON-LD to `IndustriesPage.tsx` and `TechnologiesPage.tsx`
5. **[THIS WEEK]** Add `loading="lazy"` to `BeforeAfterSlider.tsx` lines 78 and 93
6. **[THIS WEEK]** Fix portfolio item #09 self-referential URL in `src/lib/portfolio-data.ts`; verify #07 HTTP→HTTPS
7. **[THIS WEEK]** Update sitemap `<lastmod>` for all non-blog URLs to `2026-05-04`
8. **[THIS WEEK]** Investigate BreadcrumbList null item bug at `src/lib/seo-schemas.ts:208`
9. **[THIS WEEK]** Extend `headless-wordpress` tech meta description from 87 → 150+ chars
10. **[THIS MONTH]** Schedule refreshes for 11 December 2025 articles before they hit the 6-month threshold (deadline: late May / early June)
11. **[THIS MONTH]** Add "Related Articles" section to `ServiceDetailPage.tsx` using inverse of `relatedServiceSlugs`
12. **[ONGOING]** Implement pre-rendering (`vite-plugin-prerender`) — highest-impact P0
13. **[ONGOING]** Lazy-initialize Supabase client (only on auth routes)
14. **[ONGOING]** Configure `.htaccess` for root redirect + HSTS
15. **[ONGOING]** Refactor schema output to single `@graph` pattern

---

### History

| Date | Score | Key Events |
|------|-------|-----------|
| 2026-05-04 | **79/100** | 2 new noindex gaps; content gap 50 days; blog freshness threshold approaching; monthly deep audit run |
| 2026-04-27 | 81/100 | H1 LCP fix confirmed ✅; sitemap lastmod partially updated; no new fixes |
| 2026-04-20 | 81/100 | Score unchanged; 4 image issues + Supabase global init persisting |
