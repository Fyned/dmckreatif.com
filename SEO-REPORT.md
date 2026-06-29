# SEO Report — dmckreatif.com
## Date: 2026-06-29
## Overall Score: 70/100 (↓2 from 72 on 2026-06-22, 7-day gap)

---

### Executive Summary

- **Score drops to 70** — no issues resolved since last report; 3 more articles crossed the 6-month freshness threshold (now 11 total, up from 8), exactly as predicted last week
- **EN blog content gap hits 120 days** (last EN article: 2026-03-01 `web-agency-london-2026`); enters a new tier of Google freshness penalty — persistent gaps beyond 90 days compound against "agency" and "web development" query rankings
- **Noindex crisis enters Week 11** — 7 pages (5 legal + 2 order-flow) remain fully indexed; 5-minute fix, zero action taken in 11 consecutive report cycles
- **robots.txt gap persists** — `/*/templates/order/confirm/:orderId` remains crawlable and indexable; unique order IDs may already be in Google's index
- Monthly deep audit skipped — June 29 is outside the 1st–7th window

---

### 🔴 Critical Issues (fix immediately)

#### 1. Legal Pages Missing `noindex` — **WEEK 11 UNRESOLVED** 🚨 CRITICAL DECAY
Five thin-content pages remain fully indexed. First flagged 2026-03-31. Eleven consecutive audit cycles with no action. Each Googlebot recrawl accumulates thin-content signals.

| File | Route | Fix |
|------|-------|-----|
| `src/pages/PrivacyPage.tsx` | `/:locale/privacy` | Add `noIndex={true}` to `<SeoHead>` |
| `src/pages/TermsPage.tsx` | `/:locale/terms` | Add `noIndex={true}` to `<SeoHead>` |
| `src/pages/LegalNoticePage.tsx` | `/:locale/legal` | Add `noIndex={true}` to `<SeoHead>` |
| `src/pages/CookiePolicyPage.tsx` | `/:locale/cookie-policy` | Add `noIndex={true}` to `<SeoHead>` |
| `src/pages/RefundPolicyPage.tsx` | `/:locale/refund-policy` | Add `noIndex={true}` to `<SeoHead>` |

`SeoHead.tsx:14` already supports this prop. 5 files × 1 line each ≈ 5 minutes total.

#### 2. Template Order Pages Missing `noindex` — **WEEK 6 UNRESOLVED**
Both `TemplateOrderPage.tsx` and `TemplateOrderConfirmPage.tsx` use bare `<Helmet>` without a `<meta name="robots" content="noindex">` tag. Order-specific URLs with real orderId parameters are indexable.

| File | Route |
|------|-------|
| `src/pages/TemplateOrderPage.tsx` | `/:locale/templates/order` |
| `src/pages/TemplateOrderConfirmPage.tsx` | `/:locale/templates/order/confirm/:orderId` |

**Fix:** Replace `<Helmet>` in both files with `<SeoHead noIndex={true} ... />`, or add:
```tsx
<meta name="robots" content="noindex, nofollow" />
```
inside the existing `<Helmet>` block.

#### 3. `robots.txt` Gap — **WEEK 2 UNRESOLVED**
`Disallow: /*/template-order` does **not** match `/*/templates/order/confirm/:orderId` (different path). Order confirmation URLs with real order IDs remain discoverable and indexable.

**Fix:** Add to `public/robots.txt`:
```
Disallow: /*/templates/order/
```

#### 4. EN Blog Content Gap — **120 Days** (last article: 2026-03-01)
Google's freshness ranking signal treats 90+ day gaps as a sustained negative. 120 days with no new EN content is the longest gap ever recorded in this audit series. No EN article in 4 months.

**Minimum viable fix:** Publish 1 new EN article this week (600+ words).
Suggested topic: "What Is a Digital Agency? Roles, Services, and Costs for European SMBs" — targets the high-volume `digital agency europe` cluster currently unserved by the site.

#### 5. SPA Prerendering — **P0, ~17 Weeks Unresolved**
All 446 sitemap URLs are JavaScript-rendered. Googlebot must execute client-side JS to index content. The `vite-plugin-prerender` implementation listed in CLAUDE.md as P0 remains unstarted. Every other SEO improvement has diminished returns until indexability is solved.

---

### 🟡 Warnings (fix this week)

#### 6. Content Freshness Crisis — **11 Articles Past 6-Month Threshold** (↑3 from last week)
As of 2026-06-29, the following EN articles have crossed the 6-month (180-day) freshness threshold:

| Slug | Published | Age | Status |
|------|-----------|-----|--------|
| `roi-professional-web-design` | 2025-12-01 | 210 days | **URGENT** |
| `core-web-vitals-explained` | 2025-12-03 | 208 days | **URGENT** |
| `ai-web-development-2026` | 2025-12-06 | 205 days | **URGENT** |
| `web-design-construction` | 2025-12-09 | 202 days | **URGENT** |
| `multilingual-seo-europe` | 2025-12-12 | 199 days | Needs refresh |
| `state-of-web-development-2026` | 2025-12-15 | 196 days | Needs refresh |
| `ecommerce-platform-comparison-europe` | 2025-12-18 | 193 days | Needs refresh |
| `what-is-headless-cms` | 2025-12-21 | 190 days | Needs refresh |
| `wordpress-vs-custom-cost` | 2025-12-24 | 187 days | ⚠️ NEW this week |
| `shopify-vs-prestashop-europe` | 2025-12-27 | 184 days | ⚠️ NEW this week |
| `vercel-vs-netlify-vs-aws` | 2025-12-30 | 181 days | ⚠️ NEW this week |

**Crossing within 7 days:**

| Slug | Published | Threshold Date |
|------|-----------|---------------|
| `tailwind-vs-bootstrap` | 2026-01-03 | 2026-07-02 (3 days) |
| `headless-vs-traditional-cms` | 2026-01-06 | 2026-07-05 (6 days) |

Minimum refresh = update `date` field + add 1 new section or update any stale statistics.

#### 7. `BeforeAfterSlider.tsx` Missing `loading="lazy"` — **WEEK 10 UNRESOLVED**
`src/components/portfolio/BeforeAfterSlider.tsx:78` and `:93` have `decoding="async"` but no `loading="lazy"`. These above-the-fold portfolio page images block LCP.

#### 8. `IndustriesPage` + `TechnologiesPage` Missing CollectionPage JSON-LD — **WEEK 10 UNRESOLVED**
Both index pages have only `BreadcrumbList` schema. Google's rich results for listing pages expect `CollectionPage` + `ItemList`. Missing from: `src/pages/IndustriesPage.tsx`, `src/pages/TechnologiesPage.tsx`.

#### 9. Sitemap `lastmod` 119 Days Stale
All non-blog pages show `<lastmod>2026-03-02</lastmod>`. Search engines use `lastmod` to prioritize recrawl scheduling. Should be updated to `2026-06-29` for all static pages.

#### 10. Portfolio Data Bugs — **WEEK 6 UNRESOLVED**
- `src/lib/portfolio-data.ts:209` — `ata-accountancy` URL: `http://ataaccountancy.com` → must be `https://`
- `src/lib/portfolio-data.ts:253` — `gmg-design` URL: `https://dmckreatif.com` → self-referential, replace with actual client site URL

#### 11. `buildBreadcrumbSchema()` Null ListItem Bug — **WEEK 6 UNRESOLVED**
`src/lib/seo-schemas.ts:174` — `itemListElement: listItems` is not guarded against null/undefined items. If any breadcrumb item is missing, the resulting JSON-LD is invalid and may suppress rich results across all detail pages.

**Fix:**
```ts
// seo-schemas.ts ~line 174 — add .filter(Boolean) guard
"itemListElement": listItems.filter(Boolean).map((item, index) => ({ ... }))
```

#### 12. `SoftwareApplication` Review Author Type Bug — **WEEK 5 UNRESOLVED**
`src/lib/seo-schemas.ts:417,423` — `buildTechnologySchema()` sets both `author["@type"]` and `review.author["@type"]` to `"Organization"`. Schema.org requires `"Person"` for user review authors; Google's SoftwareApplication rich result validator rejects `Organization` in a `Review.author` field. Affects all 12 technology detail pages.

#### 13. FR/NL/DE Blog Post Hreflang `x-default` Bug — **WEEK 7 UNRESOLVED**
Locale-specific blog posts (FR/NL/DE) in `sitemap.xml` include `hreflang="x-default"` pointing to the same locale URL instead of `/en/blog/`. `x-default` should always point to the canonical international URL.

#### 14. Internal Blog Links Use Hardcoded `/en/` Prefix — **WEEK 7 UNRESOLVED**
Multiple blog content files under `src/data/blog/content/` use hardcoded `/en/` path prefixes for internal links. FR/NL/DE blog posts linking to other content incorrectly route readers to EN pages.

---

### 🟢 Passed Checks

- **robots.txt** — correctly blocks `/*/admin`, `/*/dashboard`, `/*/login`, `/*/register`, `/*/editor`, `/*/template-order`, `/*/site`, `/api/`; separate rules for AI crawlers; blocks CCBot
- **HSTS + www redirect** — `.htaccess` correctly configured
- **Hreflang (HTML)** — `SeoHead.tsx` generates correct `<link rel="alternate">` for all 4 locales + `x-default` → `/en/`
- **Hreflang (sitemap)** — all 446 URLs have full `xhtml:link` annotations (4 locales + x-default)
- **OpenGraph + Twitter Card** — `SeoHead.tsx` fully implements OG title, description, image (1200×630), alt, type, locale, locale:alternate; Twitter `summary_large_image`
- **Canonical URLs** — correctly set via `SeoHead.tsx` with `canonicalLocale` override for EN-only content
- **Schema coverage** — 17 schema types implemented (ProfessionalService, BlogPosting, Service, OfferCatalog, BreadcrumbList, WebPage, AboutPage, ContactPage, CityPage, CountryPage, SoftwareApplication, IndustryPage, CaseStudy, PersonProfile, TemplateSchema, LocalBusiness, ItemList)
- **All public pages have meta tags** — only `EditorPage.tsx` (admin) lacks `SeoHead`, which is correct
- **Portfolio images** — all 26 portfolio images are WebP format with meaningful `alt` attributes
- **React.lazy() code-splitting** — all 40+ pages are code-split; 12 homepage sections use `React.lazy()`
- **Auth/dashboard blocked** — `noIndex` correctly set on admin and auth pages
- **No broken internal links** — all `<Link to="">` and `<NeoButton href="">` targets resolve to defined routes
- **`img` alt coverage** — all 18 `<img>` tags have alt text; 2 `alt=""` are contextually decorative (file upload preview)
- **Self-hosted fonts** — no third-party font requests; no render-blocking font CDN
- **Cookie banner** — implemented
- **CSP header** — in place
- **Gzip + cache headers** — configured
- **i18n route structure** — all routes correctly prefixed `/:locale/`
- **Blog internal linking** — `relatedServiceSlugs` and `relatedSlugs` implemented on all 52 articles

---

### 📊 Statistics

| Metric | Value |
|--------|-------|
| Total pages (routes) | 59 |
| Sitemap URLs | 446 |
| Pages with complete meta | ~52/59 (7 pages need `noIndex`) |
| Schema types implemented | 17 |
| Blog articles total | 52 (31 EN + 9 FR + 6 NL + 6 DE) |
| EN articles past 6-month freshness | **11** (↑3 from last week) |
| Days since last EN article | **120** |
| Portfolio projects | 13 (2 with data bugs) |
| Images with alt tags | 18/18 |
| WebP portfolio images | 26/26 |
| Images missing `loading="lazy"` | 2 (`BeforeAfterSlider.tsx:78,93`) |
| i18n coverage | 4/4 locales |
| Hreflang (HTML) | ✓ all pages |
| Hreflang (sitemap) | ✓ all 446 URLs |
| Internal linking score | 7/10 (hardcoded `/en/` in blog content) |
| SPA prerendering | ✗ not implemented |

---

### 📝 Content Recommendations (European Market)

1. **"What Is a Digital Agency? Roles, Services, and Costs for European SMBs"** — `digital agency europe` cluster is high-volume and unserved by the site; pairs well with existing country and city pages; target EN + FR (`agence digitale`).
2. **"How to Get a Google Business Profile for a European Company"** — local SEO content that pairs with `/en/cities/` and country pages; high transactional intent; target EN + FR.
3. **"React Server Components Explained for Business Owners"** — 2026 React ecosystem shift; positions agency as technically current; target EN.
4. **"GDPR-Compliant Analytics: GA4 vs Matomo vs Plausible"** — evergreen European compliance topic; ties to existing GDPR blog post; target EN + FR.
5. **"Web Design for Professional Services Firms (Law, Finance, Consulting)"** — extends the industry content cluster; high-value B2B keyword group across FR/NL/DE markets.

---

### 📅 Action Items (prioritized)

1. **Add `noIndex={true}` to 5 legal pages** — `PrivacyPage.tsx`, `TermsPage.tsx`, `LegalNoticePage.tsx`, `CookiePolicyPage.tsx`, `RefundPolicyPage.tsx` (~5 min, 11 weeks overdue)
2. **Add `noIndex={true}` to 2 order pages** — `TemplateOrderPage.tsx`, `TemplateOrderConfirmPage.tsx` (~2 min, 6 weeks overdue)
3. **Fix `robots.txt`** — add `Disallow: /*/templates/order/` to block order-confirm URLs (2 weeks overdue)
4. **Publish 1 new EN blog article** — 120-day gap; freshness is compounding negatively
5. **Refresh 11 stale articles** — update `date` + add 1 new section to each article past 6 months
6. **Add `loading="lazy"` to `BeforeAfterSlider.tsx:78,93`** — LCP impact on portfolio page
7. **Fix portfolio data bugs** — `ata-accountancy` HTTP→HTTPS (`portfolio-data.ts:209`); `gmg-design` self-URL (`portfolio-data.ts:253`)
8. **Add `.filter(Boolean)` to `buildBreadcrumbSchema()`** — `seo-schemas.ts:174`
9. **Fix `SoftwareApplication` review author type** — `"Organization"` → `"Person"` at `seo-schemas.ts:417,423`
10. **Update sitemap `<lastmod>`** — set all non-blog pages to `2026-06-29`
11. **Add `CollectionPage` + `ItemList` JSON-LD** — `IndustriesPage.tsx` + `TechnologiesPage.tsx`
12. **Fix `x-default` hreflang** — locale-specific blog posts in `sitemap.xml` should point `x-default` → `/en/blog/`
13. **Fix hardcoded `/en/` in blog content** — replace with locale-relative paths in `src/data/blog/content/fr/`, `nl/`, `de/`
14. **Implement `vite-plugin-prerender`** — highest single-impact SEO improvement; unblocks all 446 URLs for reliable indexing

---

### History

| Date | Score | Change | Notes |
|------|-------|--------|-------|
| 2026-06-29 | **70/100** | ↓2 | 11 stale articles (↑3); EN gap 120d; no issues resolved |
| 2026-06-22 | 72/100 | ↓1 | robots.txt gap found; EN gap 113d; 8 stale articles |
| 2026-06-15 | 73/100 | ↓3 | EN gap 106d; 6 stale articles |
| 2026-05-25 | 76/100 | ↓1 | |
| 2026-05-18 | 77/100 | ↓2 | |
| 2026-05-04 | 79/100 | ↓0 | |
| 2026-04-27 | 81/100 | ↓0 | |
| 2026-04-20 | 81/100 | — | Baseline |

**Trend:** 8-week consecutive decline (−11 points total). Every point lost traces to compounding unresolved issues. The top 3 action items (noindex x7, robots.txt, new EN article) would recover approximately +6–7 points and take under 30 minutes combined.
