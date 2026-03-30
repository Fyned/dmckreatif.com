# SEO Report — dmckreatif.com
## Date: 2026-03-30
## Overall Score: 74/100

---

### Executive Summary
- **641 URLs in sitemap** across 4 locales — comprehensive coverage with services, cities, blog, industries, technologies, and templates
- **All 52 blog articles are fresh** (newest: 2026-03-15, oldest: 2025-12-01) — zero content urgency
- **Critical gap:** `ProcessPage.tsx` is live in sitemap but has NO meta tags and NO schema at all
- **LCP performance issue** persists: H1 inside Framer Motion `staggerContainer initial="hidden"` delays Largest Contentful Paint (P0 flagged in CLAUDE.md, not yet fixed)
- **16 open issues** carried over from previous audit (FULL-AUDIT-REPORT.md, 2026-03-19)

---

### 🔴 Critical Issues (fix immediately)

#### 1. ProcessPage has NO meta tags and NO schema
- **File:** `src/pages/ProcessPage.tsx`
- **Issue:** Page is in sitemap at `/en/about/process` but has zero SeoHead, no title, no description, no canonical, no hreflang, no JSON-LD
- **Fix:** Add `<SeoHead>` with title/description/canonical/hreflang and a `WebPage` or `HowTo` JSON-LD schema

#### 2. H1 animation causing LCP delay (P0)
- **File:** `src/components/sections/HeroSection.tsx`
- **Issue:** H1 wrapped in Framer Motion `staggerContainer` with `initial="hidden"` — browser cannot render H1 until JS hydrates, directly delaying LCP score
- **Fix:** Remove animation from H1 (or use CSS animation), keep motion only on sub-elements

#### 3. EN and FR blog `lastmod` dates hardcoded in sitemap
- **File:** `public/sitemap.xml`
- **Issue:** All 30 EN blog posts share `lastmod: 2026-02-28`; all 9 FR posts share `lastmod: 2026-03-02` — crawlers see stale signals for individual posts that were recently published
- **Fix:** Update sitemap generation to use per-article `date` from `articles.ts` (NL/DE already do this correctly)

---

### 🟡 Warnings (fix this week)

#### 4. ProfessionalServiceSchema.image not wrapped in ImageObject
- **File:** `src/lib/seo-schemas.ts` ~line 42
- **Issue:** `image` property is bare string (`${BASE_URL}/og-image.png`) — should be an `ImageObject` with `url`, `width`, `height`
- **Fix:** Wrap as `{ "@type": "ImageObject", "url": "...", "width": 1200, "height": 630 }`

#### 5. Legal pages: no `noIndex` and absent from sitemap
- **Files:** PrivacyPage, TermsPage, LegalNoticePage, CookiePolicyPage, RefundPolicyPage
- **Issue:** Pages are fully indexable (no `noIndex`) but not submitted in sitemap — inconsistent signal to crawlers
- **Fix:** Either add `noIndex` to all 5 legal pages, or add them to sitemap (pick one approach)

#### 6. HomePage has no page-level JSON-LD
- **File:** `src/pages/HomePage.tsx`
- **Issue:** Relies entirely on static `index.html` @graph — no dynamic/locale-aware schema injected
- **Fix:** Add `WebPage` or `WebSite` JsonLd with localized name/description via SeoHead

#### 7. IndustriesPage and TechnologiesPage missing JSON-LD
- **Files:** `src/pages/IndustriesPage.tsx`, `src/pages/TechnologiesPage.tsx`
- **Issue:** Both pages have SeoHead but inject no JSON-LD schema (other listing pages like ServicesPage do have schema)
- **Fix:** Add `CollectionPage` or `ItemList` JSON-LD

#### 8. BeforeAfterSlider images missing `loading="lazy"`
- **File:** `src/components/portfolio/BeforeAfterSlider.tsx` lines 78, 93
- **Issue:** Portfolio before/after images load eagerly — adds unnecessary bytes on initial page load
- **Fix:** Add `loading="lazy"` to both `<img>` elements

#### 9. TemplateOrderPage empty `alt` attributes on template preview images
- **File:** `src/pages/TemplateOrderPage.tsx` lines 517, 936
- **Issue:** `alt=""` on what appear to be meaningful template preview images
- **Fix:** Add descriptive alt text (e.g., `alt={`${template.name} preview`}`) or confirm decorative

#### 10. `gmg-design` portfolio URL is a placeholder
- **File:** `src/lib/portfolio-data.ts`
- **Issue:** `gmg-design` project URL points to `https://dmckreatif.com` — likely a placeholder
- **Fix:** Update to actual GMG Design project URL, or remove from portfolio if not yet live

#### 11. No `fetchpriority="high"` on LCP images
- **Files:** All hero/above-fold sections
- **Issue:** Only `CaseStudyDetailPage.tsx:229` uses `fetchPriority="high"` — hero images sitewide lack this hint
- **Fix:** Add `fetchPriority="high"` + `loading="eager"` to the primary hero image on key landing pages

#### 12. `ata-accountancy` portfolio URL uses HTTP (not HTTPS)
- **File:** `src/lib/portfolio-data.ts`
- **Issue:** `http://ataaccountancy.com` — all other portfolio URLs use HTTPS
- **Fix:** Verify if site has SSL, then update to `https://ataaccountancy.com`

#### 13. `WebSite` schema missing `SearchAction` (Sitelinks Searchbox)
- **File:** `index.html`
- **Issue:** No `SearchAction` potentialAction on WebSite schema — site misses eligibility for Google Sitelinks Searchbox
- **Fix:** Add `potentialAction` with `SearchAction` pointing to site search

#### 14. FilenesSports missing from portfolio-data.ts
- **Issue:** `CLAUDE.md` lists `FilenesSports (filenessports.com)` as a portfolio project but it is absent from `src/lib/portfolio-data.ts`
- **Fix:** Add the project or remove it from CLAUDE.md if not included intentionally

---

### 🟢 Passed Checks

- **robots.txt:** Excellent — allows all search engines + major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), blocks only non-search scrapers. Auth paths properly blocked.
- **Sitemap coverage:** 641 URLs across services (184), cities (241), blog (52), technologies (52), industries (36), templates (20), case studies (10), core/about pages (~46)
- **SeoHead component:** Comprehensive — title, description, canonical, full 4-language hreflang, OG (title/desc/url/image with dimensions/alt/type), Twitter Card, robots noIndex support, article timestamps, html lang
- **Blog content freshness:** All 52 articles fresh — 30 EN, 9 FR, 6 NL, 6 DE; oldest article 2025-12-01, newest 2026-03-15
- **Blog hreflang logic:** Per-language canonical + hreflang correctly set; EN-only posts get `hreflang="en"` only; FR/NL/DE articles get their locale only
- **Portfolio images:** All 13 portfolio projects use WebP format with descriptive alt text
- **Schema coverage:** 17 schema builder functions covering all major page types
- **4-locale URL structure:** `/:locale/path` — consistent routing, proper locale prefixes
- **i18n meta coverage:** EN full content, FR/NL/DE SEO meta override via i18n keys
- **Code splitting:** All 38+ pages lazy-imported in App.tsx — no heavy initial bundle
- **NL/DE sitemap `lastmod`:** Per-article dates correctly used (inconsistency is only in EN/FR batch)
- **RSS feed:** Auto-generated at build time (`public/rss.xml`)

---

### 📊 Statistics

| Metric | Value |
|--------|-------|
| Total pages (routes) | 38+ |
| Sitemap URLs | 641 |
| Pages with SeoHead | ~57/58 public pages |
| Pages missing SeoHead | 1 (ProcessPage) |
| Images with alt tags | ~95% (3 empty alt attributes found) |
| Portfolio projects | 13 |
| Schema builder functions | 17 |
| Schema types in use | WebPage, Service, SoftwareApplication, BlogPosting, BreadcrumbList, CollectionPage, ProfessionalService, AboutPage, ContactPage, Person/ProfilePage, CitySchema, CaseStudy, OfferCatalog |
| i18n coverage | 4/4 locales |
| Blog articles | 52 total (30 EN, 9 FR, 6 NL, 6 DE) |
| Articles needing review (>6mo) | 0 |
| Articles urgent update (>12mo) | 0 |
| Internal linking score | 7/10 |
| WebP image adoption | ~100% (portfolio), flagcdn (PNG) |

---

### 📝 Content Recommendations

1. **"Agence web PME Belgique" series** — Expand BE market content. Only `agence-web-belgique` and `agence-web-bruxelles` cover Belgium. Target: `agence web Liège`, `agence web Gand`, `création site web PME belge` — high commercial intent, lower competition than Paris.

2. **"Kosten website laten maken 2026" deep-dive (NL)** — The `kosten-website-nederland-2026` exists but a follow-up comparing packages (basic/business/enterprise) in NL pricing context would capture transactional queries from Dutch SMBs.

3. **"Web agency for construction companies in Europe"** — `web-design-construction` exists in EN but no dedicated service/industry page for the construction vertical. A case study combining CAKIR Facades + Archi Construction + idhome-travaux would be high-authority content.

4. **"GDPR-compliant website design"** — Positions DMC Kreatif on a compliance-aware keyword with strong European relevance. Could link to `gdpr-compliance-checklist` blog post. Targets: `GDPR-conforme website`, `site web conforme RGPD`.

5. **"Best React web agency Europe 2026"** — Targets developer-aware B2B buyers. Article exists (`react-vs-wordpress-2026`) but no dedicated pillar page. Cross-link with `nextjs-vs-gatsby-vs-remix` and `state-of-web-development-2026`.

---

### 📅 Action Items (prioritized)

1. **[CRITICAL]** Add `SeoHead` + JSON-LD to `ProcessPage.tsx` — page is live, indexed, currently returns no meta
2. **[CRITICAL]** Remove Framer Motion `initial="hidden"` from H1 in `HeroSection.tsx` — direct LCP fix
3. **[HIGH]** Fix EN/FR blog sitemap `lastmod` to use per-article dates from `articles.ts`
4. **[HIGH]** Add `noIndex` to all 5 legal pages (Privacy, Terms, Legal Notice, Cookie Policy, Refund Policy)
5. **[HIGH]** Wrap `ProfessionalServiceSchema.image` in `ImageObject` in `seo-schemas.ts`
6. **[MEDIUM]** Add `loading="lazy"` to `BeforeAfterSlider.tsx` images (lines 78, 93)
7. **[MEDIUM]** Fix empty `alt=""` on template preview images in `TemplateOrderPage.tsx` (lines 517, 936)
8. **[MEDIUM]** Add `CollectionPage` JSON-LD to `IndustriesPage.tsx` and `TechnologiesPage.tsx`
9. **[MEDIUM]** Add `fetchpriority="high"` to hero images on homepage and key service landing pages
10. **[MEDIUM]** Fix `gmg-design` portfolio URL (currently points to dmckreatif.com)
11. **[LOW]** Add `SearchAction` potentialAction to `WebSite` schema in `index.html`
12. **[LOW]** Update `ata-accountancy` URL to HTTPS
13. **[LOW]** Verify and add `FilenesSports` to `portfolio-data.ts` or remove from CLAUDE.md
14. **[BACKLOG]** Add `WebPage` JSON-LD to `HomePage.tsx` (currently only static index.html schema)
15. **[BACKLOG]** Write EN content for 7 newer portfolio projects (currently only 6 have case studies)

---

### History

**Previous audit:** FULL-AUDIT-REPORT.md (2026-03-19)

**Resolved since last audit:**
- Technologies and Industries pages added to sitemap ✅
- `index.html lang="en"` → `lang="x-default"` ✅
- NL and DE blog articles added to sitemap with accurate per-article `lastmod` ✅
- `BlogPosting.image` correctly wrapped in ImageObject ✅
- Duplicate breadcrumb schema concern resolved (Breadcrumbs.tsx is UI-only, no schema) ✅

**Still open from 2026-03-19 audit:** Items 1-16 in action list above (all P0/P1 items from FULL-AUDIT carry forward).

**Score change:** Not comparable (first use of this report format). FULL-AUDIT-REPORT.md used different scoring.
