# SEO Report — dmckreatif.com
## Date: 2026-06-22
## Overall Score: 72/100 (↓1 from 73 on 2026-06-15, 7-day gap)

---

### Executive Summary

- **Score dropped another point** — no issues resolved since last report; EN content gap now hits **113 days** (last article: 2026-03-01), the longest gap ever recorded in this audit series
- **8 EN blog articles are now past the 6-month freshness threshold** (up from 6 last week); 3 more cross over in the next 8 days — by June 30, all 11 December 2025 articles will be stale
- **Noindex crisis enters Week 10** — 7 pages (5 legal + 2 order-flow) remain fully indexed; 5-minute fix, zero action taken in 10 consecutive report cycles
- **New finding:** `robots.txt` gap — `/*/template-order-confirm/*` is not blocked; `TemplateOrderConfirmPage` is indexable with order-specific URLs in the wild
- Monthly deep audit skipped — June 22 is outside the 1st–7th window

---

### 🔴 Critical Issues (fix immediately)

#### 1. Legal Pages Missing `noindex` — **WEEK 10 UNRESOLVED** 🚨 CRITICAL DECAY
Five thin-content pages remain fully indexed. First flagged 2026-03-31. Each crawl accumulates thin-content signals that drag down domain authority.

| File | Route | Fix |
|------|-------|-----|
| `src/pages/PrivacyPage.tsx` | `/:locale/privacy` | Add `noIndex={true}` to `<SeoHead>` |
| `src/pages/TermsPage.tsx` | `/:locale/terms` | Add `noIndex={true}` to `<SeoHead>` |
| `src/pages/LegalNoticePage.tsx` | `/:locale/legal` | Add `noIndex={true}` to `<SeoHead>` |
| `src/pages/CookiePolicyPage.tsx` | `/:locale/cookie-policy` | Add `noIndex={true}` to `<SeoHead>` |
| `src/pages/RefundPolicyPage.tsx` | `/:locale/refund-policy` | Add `noIndex={true}` to `<SeoHead>` |

`SeoHead.tsx:14` already supports this prop. 5 files × 1 line each ≈ 5 minutes total.

#### 2. Template Order Pages Missing `noindex` — **WEEK 5 UNRESOLVED**

| File | Route |
|------|-------|
| `src/pages/TemplateOrderPage.tsx` | `/:locale/templates/order/:templateId` |
| `src/pages/TemplateOrderConfirmPage.tsx` | `/:locale/templates/order/confirm/:orderId` |

Same fix: add `noIndex={true}` to `<SeoHead>` in both files.

#### 3. `robots.txt` Gap — NEW THIS WEEK
`Disallow: /*/template-order` does **not** match `/*/templates/order/confirm/:orderId` (different path segment). `TemplateOrderConfirmPage` URLs with real order IDs can be discovered and indexed.

**Fix:** Add to `public/robots.txt`:
```
Disallow: /*/templates/order/
```

#### 4. EN Blog Content Gap — **113 Days** (last article: 2026-03-01)
Google's freshness signals treat 90+ days with no new content as a sustained negative signal for "agency" and "web development" queries. No EN article in almost 4 months.

**Minimum viable fix:** Publish 1 new EN article this week (600+ words, target a fresh keyword).
Suggested topic: "What Is a Digital Agency? Roles, Services, and Costs for European SMBs" (targets high-volume `digital agency europe` cluster).

#### 5. SPA Prerendering — **P0, ~16 Weeks Unresolved**
All 446 sitemap URLs are JavaScript-rendered. Googlebot must execute client-side JS to index content. The `vite-plugin-prerender` implementation listed in CLAUDE.md as P0 remains unstarted. Every other SEO improvement has diminished returns until indexability is solved.

---

### 🟡 Warnings (fix this week)

#### 6. Content Freshness Crisis — 8 Articles Past 6-Month Threshold
As of 2026-06-22, the following EN articles have crossed the 6-month freshness threshold:

| Slug | Published | Age | Status |
|------|-----------|-----|--------|
| `roi-professional-web-design` | 2025-12-01 | 203 days | **URGENT** |
| `core-web-vitals-explained` | 2025-12-03 | 201 days | **URGENT** |
| `ai-web-development-2026` | 2025-12-06 | 198 days | **URGENT** |
| `web-design-construction` | 2025-12-09 | 195 days | **URGENT** |
| `multilingual-seo-europe` | 2025-12-12 | 192 days | Needs refresh |
| `state-of-web-development-2026` | 2025-12-15 | 189 days | Needs refresh |
| `ecommerce-platform-comparison-europe` | 2025-12-18 | 186 days | Needs refresh |
| `what-is-headless-cms` | 2025-12-21 | 183 days | Needs refresh |

**Crossing within 8 days:**

| Slug | Published | Threshold Date |
|------|-----------|---------------|
| `wordpress-vs-custom-cost` | 2025-12-24 | 2026-06-24 (2 days) |
| `shopify-vs-prestashop-europe` | 2025-12-27 | 2026-06-27 (5 days) |
| `vercel-vs-netlify-vs-aws` | 2025-12-30 | 2026-06-30 (8 days) |

Minimum refresh = update `date` field + add 1 new section or update any stale statistics.

#### 7. `BeforeAfterSlider.tsx` Missing `loading="lazy"` — **WEEK 9 UNRESOLVED**
`src/components/portfolio/BeforeAfterSlider.tsx:78` and `:93` have `decoding="async"` but no `loading="lazy"`. These above-the-fold images on the portfolio page block LCP.

#### 8. `IndustriesPage` + `TechnologiesPage` Missing CollectionPage JSON-LD — **WEEK 9 UNRESOLVED**
Both index pages have only `BreadcrumbList` schema. Google's rich results for listing pages expect `CollectionPage` + `ItemList`. Missing from: `src/pages/IndustriesPage.tsx`, `src/pages/TechnologiesPage.tsx`.

#### 9. Sitemap `lastmod` 112 Days Stale
All non-blog pages show `<lastmod>2026-03-02</lastmod>`. Search engines use `lastmod` to prioritize recrawl scheduling. Update to `2026-06-22` for all static pages.

#### 10. Portfolio Data Bugs — **WEEK 5 UNRESOLVED**
- `src/lib/portfolio-data.ts:209` — `ata-accountancy` URL: `http://ataaccountancy.com` → must be `https://`
- `src/lib/portfolio-data.ts:253` — `gmg-design` URL: `https://dmckreatif.com` → self-referential, replace with actual client site URL

#### 11. `buildBreadcrumbSchema()` Null ListItem Bug — **WEEK 5 UNRESOLVED**
`src/lib/seo-schemas.ts:208` — `listItems` array is spread directly without `.filter(Boolean)`. If any item is null/undefined (e.g., when called with partial breadcrumbs), the resulting JSON-LD is invalid and may suppress rich results across all detail pages.

**Fix:**
```ts
// seo-schemas.ts:208 — add .filter(Boolean) before spread
"itemListElement": listItems.filter(Boolean).map((item, index) => ({ ... }))
```

#### 12. `SoftwareApplication` Review Author Type Bug — **WEEK 4 UNRESOLVED**
`buildTechnologySchema()` in `src/lib/seo-schemas.ts` sets `review.author["@type"]` to `"Organization"` instead of `"Person"`. Schema.org requires `Person` for user review authors; Google's SoftwareApplication rich result validator rejects `Organization` in the `author` field of a `Review`. Affects all 12 technology detail pages.

#### 13. FR/NL/DE Blog Post Hreflang `x-default` Bug — **WEEK 6 UNRESOLVED**
Locale-specific blog posts (FR/NL/DE) in `sitemap.xml` include `hreflang="x-default"` pointing to the same locale URL instead of `/en/blog/`. `x-default` should always point to the canonical international URL (the EN blog index).

#### 14. Internal Blog Links Use Hardcoded `/en/` Prefix
Multiple blog content files under `src/data/blog/content/` use hardcoded `/en/` path prefixes for internal links (e.g., `/en/pricing`, `/en/blog/multilingual-seo`). FR/NL/DE blog posts linking to other content will incorrectly route readers to EN pages.

---

### 🟢 Passed Checks

- **robots.txt** — correctly blocks `/*/admin`, `/*/dashboard`, `/*/login`, `/*/register`, `/*/editor`, `/*/template-order`, `/*/site`, `/api/`; separate rules for AI crawlers; blocks CCBot
- **HSTS + www redirect** — `.htaccess` correctly configured
- **Hreflang (HTML)** — `SeoHead.tsx` generates correct `<link rel="alternate">` for all 4 locales + `x-default` → `/en/`
- **Hreflang (sitemap)** — all 446 URLs have full `xhtml:link` annotations (4 locales + x-default)
- **OpenGraph + Twitter Card** — `SeoHead.tsx` fully implements OG title, description, image (1200×630), alt, type, locale, locale:alternate; Twitter `summary_large_image`
- **Canonical URLs** — correctly set via `SeoHead.tsx` with `canonicalLocale` override for EN-only content
- **Schema coverage** — 17 schema types implemented across page types (ProfessionalService, BlogPosting, Service, OfferCatalog, BreadcrumbList, WebPage, AboutPage, ContactPage, CityPage, CountryPage, SoftwareApplication, IndustryPage, CaseStudy, PersonProfile, TemplateSchema, LocalBusiness, ItemList)
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
| EN articles past 6-month freshness | **8** (3 more in 8 days) |
| Days since last EN article | **113** |
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

1. **"Digital Agency vs Web Agency: What's the Difference?"** — `digital agency europe` gets high volume; the site covers web agency but not the broader digital agency cluster. Target EN + FR (`agence digitale vs agence web`).
2. **"How to Get a Google Business Profile for a European Company"** — local SEO content that pairs with the existing `/en/cities/` and country pages; high transactional intent.
3. **"React Server Components Explained for Business Owners"** — 2026 React ecosystem shift; positions the agency as technically current; target EN.
4. **"GDPR-Compliant Analytics: GA4 vs Matomo vs Plausible"** — evergreen European compliance topic; ties to existing GDPR blog post; target EN + FR.
5. **"Web Design for Professional Services Firms (Law, Finance, Consulting)"** — extends the industry content cluster; high-value B2B keyword group across FR/NL/DE markets.

---

### 📅 Action Items (prioritized)

1. **Add `noIndex={true}` to 5 legal pages** — `PrivacyPage.tsx`, `TermsPage.tsx`, `LegalNoticePage.tsx`, `CookiePolicyPage.tsx`, `RefundPolicyPage.tsx` (~5 min, 10 weeks overdue)
2. **Add `noIndex={true}` to 2 order pages** — `TemplateOrderPage.tsx`, `TemplateOrderConfirmPage.tsx` (~2 min)
3. **Fix `robots.txt`** — add `Disallow: /*/templates/order/` to block order-confirm URLs
4. **Publish 1 new EN blog article** — 113-day gap; publish before June 30
5. **Refresh 8 stale articles** — update `date` + add 1 new section to each Dec 2025 EN article
6. **Add `loading="lazy"` to `BeforeAfterSlider.tsx:78,93`** — LCP impact on portfolio page
7. **Fix portfolio data bugs** — `ata-accountancy` HTTP→HTTPS (`portfolio-data.ts:209`); `gmg-design` self-URL (`portfolio-data.ts:253`)
8. **Add `.filter(Boolean)` to `buildBreadcrumbSchema()`** — `seo-schemas.ts:208`
9. **Fix `SoftwareApplication` review author type** — `Organization` → `Person` in `buildTechnologySchema()`
10. **Update sitemap `<lastmod>`** — set all non-blog pages to `2026-06-22`
11. **Add `CollectionPage` + `ItemList` JSON-LD** — `IndustriesPage.tsx` + `TechnologiesPage.tsx`
12. **Fix `x-default` hreflang** — locale-specific blog posts in `sitemap.xml` should point `x-default` → `/en/blog/`
13. **Fix hardcoded `/en/` in blog content** — replace with locale-relative paths in `src/data/blog/content/fr/`, `nl/`, `de/`
14. **Implement `vite-plugin-prerender`** — highest single-impact SEO improvement; unblocks all 446 URLs for reliable indexing

---

### History

| Date | Score | Change | Notes |
|------|-------|--------|-------|
| 2026-06-22 | **72/100** | ↓1 | New: robots.txt gap; EN gap 113d; 8 stale articles |
| 2026-06-15 | 73/100 | ↓3 | EN gap 106d; 6 stale articles |
| 2026-05-25 | 76/100 | ↓1 | |
| 2026-05-18 | 77/100 | ↓2 | |
| 2026-05-04 | 79/100 | ↓0 | |
| 2026-04-27 | 81/100 | ↓0 | |
| 2026-04-20 | 81/100 | — | Baseline |

**Trend:** 7-week consecutive decline (-9 points total). Score has been falling every report due to compounding unresolved issues rather than new regressions. The top 3 action items above (noindex + content) would recover approximately +6 points immediately.
