# SEO Report — dmckreatif.com
## Date: 2026-04-06
## Overall Score: 79/100 (+5 vs last week)

---

### Executive Summary

- **4 critical issues resolved** since last audit: ProcessPage SeoHead, H1 LCP animation, EN/FR blog `lastmod`, and ProfessionalService `ImageObject` — significant scoring improvement
- **641 sitemap URLs confirmed accurate**: 31 EN + 9 FR + 6 NL + 6 DE blog posts all correctly represented (false alarm from previous audit — no missing articles)
- **Persistent technical debt**: 9 open warnings carried over from last week (legal page `noIndex`, lazy images, broken portfolio URLs, missing JSON-LD on listing pages)
- **New finding**: `BeforeAfterSlider.tsx` images still load eagerly (no `loading="lazy"`); most `<img>` tags lack explicit `width`/`height` — CLS risk across portfolio/template sections
- **Monthly audit (P3)**: Keyword gap analysis and structured data deep check added below (today is 6th of month)

---

### 🔴 Critical Issues (fix immediately)

*No new critical issues.* All previous P0 items resolved. See Warnings for remaining open items.

---

### 🟡 Warnings (fix this week)

#### 1. Legal pages not `noIndex` and absent from sitemap (carried over)
- **Files:** `src/pages/PrivacyPage.tsx`, `TermsPage.tsx`, `LegalNoticePage.tsx`, `CookiePolicyPage.tsx`, `RefundPolicyPage.tsx`
- **Issue:** All 5 pages are fully crawlable, not in sitemap, and have no `noindex` directive — inconsistent crawl signal
- **Fix:** Add `noIndex={true}` prop to `<SeoHead>` in each file (preferred), OR add all 5 to sitemap with `<changefreq>yearly</changefreq>`

#### 2. IndustriesPage and TechnologiesPage missing JSON-LD (carried over)
- **Files:** `src/pages/IndustriesPage.tsx`, `src/pages/TechnologiesPage.tsx`
- **Issue:** Both listing pages have `<SeoHead>` but inject no JSON-LD. `ServicesPage` and `PortfolioPage` both have schema — inconsistency
- **Fix:** Add `<JsonLd data={buildCollectionPageSchema(...)} />` to each. A minimal `CollectionPage` + `ItemList` is sufficient

#### 3. BeforeAfterSlider images missing `loading="lazy"` (carried over)
- **File:** `src/components/portfolio/BeforeAfterSlider.tsx` (lines ~78, ~93)
- **Issue:** Portfolio before/after images load eagerly — unnecessary bytes on initial page load for users not scrolling to portfolio
- **Fix:** Add `loading="lazy"` to both `<img>` elements

#### 4. Missing `width`/`height` on `<img>` tags — CLS risk (new)
- **Files:** `src/components/portfolio/ProjectCard.tsx` (has `width` but no `height`), `src/components/ui/ClientLogoBar.tsx` (has inline height style, no `width` attr), `src/components/TemplatePreviewGallery.tsx`, `src/components/CountryFlag.tsx`
- **Issue:** Images without explicit dimensions cause layout shift as the browser reserves no space before the image loads — hurts CLS Core Web Vital
- **Fix:** Add `width` and `height` attributes matching the intrinsic image size to every `<img>` tag

#### 5. GMG Design portfolio URL is a placeholder (carried over)
- **File:** `src/lib/portfolio-data.ts` line 253
- **Issue:** `url: "https://dmckreatif.com"` — links to the agency's own site instead of the client project
- **Fix:** Replace with actual GMG Design project URL, or set to `null`/remove if project not publicly live

#### 6. ATA Accountancy portfolio URL uses HTTP (carried over)
- **File:** `src/lib/portfolio-data.ts` line 209
- **Issue:** `url: "http://ataaccountancy.com"` — only non-HTTPS URL in the portfolio
- **Fix:** Update to `"https://ataaccountancy.com"` after verifying SSL certificate is valid

#### 7. TemplateOrderPage empty `alt` attributes (carried over)
- **File:** `src/pages/TemplateOrderPage.tsx` lines ~517, ~936
- **Issue:** `alt=""` on template preview images — accessibility violation and missed keyword opportunity
- **Fix:** `alt={`${template.name} template preview`}` or confirm images are purely decorative

#### 8. No `fetchpriority="high"` on above-fold hero images (carried over)
- **Files:** `src/components/home/HeroSection.tsx` and key landing page hero sections
- **Issue:** LCP candidate images lack `fetchPriority="high"` + `loading="eager"`. Only `CaseStudyDetailPage.tsx:229` uses this hint correctly
- **Fix:** Add `fetchPriority="high" loading="eager"` to the primary hero image on homepage, service category pages, and country pages

#### 9. No `SearchAction` on `WebSite` schema (carried over)
- **File:** `index.html` — static `@graph` block
- **Issue:** `WebSite` schema has no `potentialAction` → site misses Google Sitelinks Searchbox eligibility
- **Fix:** Add `potentialAction: { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://dmckreatif.com/en/blog?q={search_term_string}" }, "query-input": "required name=search_term_string" }`

#### 10. FilenesSports missing from `portfolio-data.ts` (carried over)
- **Issue:** Listed in `CLAUDE.md`, referenced in `en-industries.json` and `AuthorPage.tsx`, but not a portfolio entry in `portfolio-data.ts`
- **Fix:** Add entry with `id: "filenes-sports"`, `url: "https://filenessports.com"`, or remove from CLAUDE.md if it shouldn't appear in portfolio

---

### 🟢 Passed Checks

- **ProcessPage** now has `<SeoHead>` + `WebPage` JSON-LD + `BreadcrumbList` ✅ (fixed since 2026-03-30)
- **H1 LCP fix** applied: `<h1>` is outside `motion.div initial="hidden"` — no longer JS-gated ✅ (fixed since 2026-03-30)
- **EN/FR blog `lastmod` dates** now per-article from `articles.ts` — all 52 posts have accurate individual dates ✅ (fixed since 2026-03-30)
- **ProfessionalServiceSchema.image** wrapped in `ImageObject` with url/width/height ✅ (fixed since 2026-03-30)
- **robots.txt** — allows all major search + AI crawlers, blocks auth/dashboard/editor paths correctly ✅
- **Sitemap completeness** — 641 URLs, all 52 blog posts present across 4 locales, per-article lastmod ✅
- **Hreflang** — two-layer implementation (sitemap + SeoHead dynamic), all 4 locales + `x-default` ✅
- **SeoHead** — title, description, canonical, full OG tags, Twitter Card, article timestamps, html lang ✅
- **Schema coverage** — 17 builder functions, 15+ schema types across all major page categories ✅
- **Code splitting** — all 38+ pages lazy-imported, no heavy initial bundle ✅
- **Self-hosted fonts** with `<link rel="preload">` — no Google Fonts dependency ✅
- **HSTS** + **www→non-www redirect** + **cache headers** in `.htaccess` ✅
- **`llms.txt` + `llms-full.txt`** in `/public/` — GEO-optimized for AI indexing ✅
- **Blog articles** — all 52 fresh (newest: 2026-03-10, oldest: 2025-12-01, none >12 months old) ✅
- **Portfolio images** — all WebP format with descriptive alt text ✅
- **React Router v6 route order** — `templates/order` static route correctly takes priority over `templates/:slug` dynamic route ✅

---

### 📊 Statistics

| Metric | Value | Change |
|--------|-------|--------|
| Total pages (routes) | 38+ | — |
| Sitemap URLs | 641 | — |
| Blog articles in sitemap | 52 (31 EN, 9 FR, 6 NL, 6 DE) | ✅ confirmed complete |
| Pages with SeoHead | ~58/58 public pages | ✅ +1 (ProcessPage fixed) |
| Pages missing SeoHead | 0 | ✅ 0 (was 1) |
| Images with explicit width+height | ~20% | ❌ low — CLS risk |
| Images with alt tags | ~95% (2-3 empty) | — |
| Schema builder functions | 17 | — |
| Schema types deployed | 15+ | — |
| i18n coverage | 4/4 locales | ✅ |
| Blog articles needing review (>6mo) | 0 | ✅ |
| Blog articles urgent update (>12mo) | 0 | ✅ |
| Internal linking score | 7/10 | — |
| WebP image adoption | ~100% portfolio, flagcdn uses PNG | — |
| Portfolio entries | 13 (2 with broken/placeholder URLs) | ⚠️ |
| Open warnings | 10 | -4 vs last week |

---

### 📊 Monthly Deep Audit (2026-04-06)

#### 12. Internal Link Mapping

High-level `<Link to=>` usage count is low (27 occurrences across 11 files), but most navigation happens through `NeoButton` href props, `<a>` tags in Header/Footer/Breadcrumbs, and the navigation component's link lists. Key findings:

- **Well-linked pages**: Services, Blog, Portfolio, Technologies — linked from Header nav + Footer
- **Weakly linked pages**: ProcessPage (`/about/process`), CareersPage, PartnersPage, WhyUsPage — only reachable via About submenu; no deep-links from content pages
- **Orphan risk**: Individual city service pages (e.g., `/en/web-agency-paris/seo`) — only reachable via CityServicePage breadcrumb or direct URL; no cross-links from service detail pages
- **Recommendation**: Add "Cities we serve" section to `ServiceDetailPage.tsx` linking to top 5 city variants of each service (e.g., from `/en/services/seo` → link to `/en/web-agency-paris/seo`, `/en/web-agency-lyon/seo`)

#### 13. Keyword Gap Analysis

Top 10 keyword opportunities for European web agency market:

| Priority | Keyword (EN) | Keyword (FR) | Intent | Gap |
|----------|-------------|-------------|--------|-----|
| 🔴 High | "web agency for accountants UK" | — | Commercial | No dedicated accountant vertical page; Adamsons case study buried |
| 🔴 High | "agence web renovation batiment" | "agence web renovation" | Commercial | CAKIR Facades case study exists but no dedicated renovation industry page |
| 🔴 High | "multilingual website Europe" | "site web multilingue Europe" | Commercial | Strong technical fit, not targeted in blog or services |
| 🔴 High | "website redesign agency France" | "refonte site web agence" | Transactional | No "redesign" service or landing page exists |
| 🟡 Medium | "Lighthouse 100 score website" | "performance site web score" | Informational | Metric mentioned in portfolio but no dedicated blog/guide |
| 🟡 Medium | "headless CMS agency Europe" | "agence headless CMS" | Commercial | Not covered despite React/Next.js stack |
| 🟡 Medium | "e-commerce agency Belgium" | "agence e-commerce Belgique" | Commercial | Archi Construction case study is BE but no BE e-comm content |
| 🟢 Low | "web design for energy companies" | "site web entreprise énergie" | Commercial | Consulting Energy + ISO Home Energy are portfolio references |
| 🟢 Low | "TypeScript web development agency" | — | Informational | Stack is TypeScript-first but no content targeting this keyword |
| 🟢 Low | "Core Web Vitals optimization service" | "optimisation Core Web Vitals" | Commercial | Services mention performance but no dedicated CWV page |

**Top 3 content actions:**
1. Write `/en/services/website-redesign` service page + FR/NL/DE meta
2. Publish blog post "How we build multilingual websites for European SMBs" (EN + FR)
3. Add "Renovation & Construction" to Industries section (extends CAKIR + Archi Construction case studies)

#### 14. Structured Data Deep Check

| Schema | Required Fields | Status | Issues |
|--------|----------------|--------|--------|
| ProfessionalService | name, url, address | ✅ | `priceRange` uses "€€" — Google accepts this |
| BreadcrumbList | item[0].name, item[0].id | ✅ | `buildBreadcrumbSchema` generates correct `@id` URLs |
| BlogPosting | headline, author, datePublished, image | ✅ | `image` now wrapped in ImageObject ✅ |
| Service (detail) | name, provider | ✅ | Missing recommended `offers` on most service schemas |
| WebPage (legal) | name, url | ✅ | `dateModified` is hardcoded string — consider ISO 8601 |
| AboutPage | name, url, description | ✅ | Missing `founder` link to PersonSchema |
| SoftwareApplication | name, operatingSystem, applicationCategory | ⚠️ | `operatingSystem: "Web"` is non-standard (should be omitted or "Browser") |
| CityService (ProfessionalService) | name, areaServed, address | ✅ | `areaServed` uses `PostalAddress` correctly |
| CollectionPage (Portfolio) | name, hasPart | ✅ | — |
| Person / ProfilePage | name, url | ✅ | Missing `sameAs` links to social profiles |

**Recommended enhancements:**
- Add `offers: { "@type": "Offer", "priceCurrency": "EUR", "priceSpecification": {...} }` to `buildServiceSchema` for richer rich results eligibility
- Fix `SoftwareApplication.operatingSystem` — change `"Web"` to `"Any"` or remove the field
- Add `sameAs: ["https://linkedin.com/in/...", "https://github.com/..."]` to `buildPersonProfileSchema`

#### 15. Accessibility (Heading Hierarchy)

Sample findings from key page components:

| Page | H1 | H2 | H3 | Issue |
|------|----|----|----|----|
| HomePage | ✅ 1× | ✅ multiple | ✅ nested | Clean hierarchy |
| ServiceDetailPage | ✅ 1× | ✅ | ✅ | — |
| BlogPostPage | ✅ 1× | ✅ (from content) | ✅ | Content H2s from raw HTML — no enforcement |
| CityServicePage | ✅ 1× | ✅ | ✅ | — |
| TemplatesPage | ⚠️ — | — | — | No H1 visible in grep — verify |
| ProcessPage | ✅ 1× | ✅ | — | — |

**Aria concerns:**
- `ClientLogoBar.tsx` — `<img alt={client.name}>` ✅
- `CountryFlag.tsx` — `<img loading="lazy">` but no `alt` attribute found — **accessibility violation**
- `BeforeAfterSlider.tsx` — slider drag handle likely has no `aria-label` (unverified)
- `FileUpload.tsx` — no `alt`, but image is UI icon — needs `aria-hidden` or `alt=""`

---

### 📝 Content Recommendations

1. **"Website Redesign Agency" service page** — Create `/en/services/website-redesign` with a French mirror (`refonte site web`). High commercial intent, direct fit for the agency's core offering. Include before/after metrics using CAKIR Facades and Archi Construction as examples. Target: `website redesign agency France`, `agence refonte site web Paris`.

2. **"Multilingual Website Design for European Businesses"** — Pillar blog post (EN + FR). Targets growing demand for cross-border European SMB websites. Cite real DMC Kreatif projects: Adamsons (UK), Consulting Energy (FR). Internal link to `/services/multilingual-website` and city pages. Keywords: `multilingual website Europe`, `site multilingue PME`.

3. **"Web Design for Renovation & Construction Companies"** — Industry vertical page or case study combining CAKIR Facades + Archi Construction Veranda. Highly specific, low competition. Keywords: `web design construction company`, `agence web bâtiment rénovation`.

4. **"Core Web Vitals Optimization Service"** — Dedicated service page (currently only mentioned in passing). Position DMC Kreatif as a performance specialist: `98+ Lighthouse`, `<1.4s load time`. Target developers and marketing managers frustrated with slow agencies. Keywords: `Core Web Vitals optimization`, `amélioration performance site web`.

5. **"How Much Does a Website Cost in Belgium 2026"** — Complement existing UK and France cost guides. Belgium is underrepresented in blog content (only 2 articles). Target: `prix site web Belgique`, `coût site internet PME belge`. Internal-link to Archi Construction case study and Brussels city page.

---

### 📅 Action Items (prioritized)

1. **[HIGH — this week]** Add `noIndex={true}` to 5 legal pages (Privacy, Terms, Legal Notice, Cookie Policy, Refund) — 5 one-line changes in each page's `<SeoHead>`
2. **[HIGH — this week]** Add `width`+`height` attributes to all `<img>` tags in `ProjectCard.tsx`, `ClientLogoBar.tsx`, `TemplatePreviewGallery.tsx`, `CountryFlag.tsx` — CLS fix
3. **[HIGH — this week]** Fix `CountryFlag.tsx` missing `alt` attribute — accessibility violation
4. **[MEDIUM]** Add `CollectionPage` + `ItemList` JSON-LD to `IndustriesPage.tsx` and `TechnologiesPage.tsx`
5. **[MEDIUM]** Add `loading="lazy"` to `BeforeAfterSlider.tsx` lines ~78 and ~93
6. **[MEDIUM]** Fix `gmg-design` portfolio URL (`src/lib/portfolio-data.ts:253`) — replace `https://dmckreatif.com` with actual project URL or `null`
7. **[MEDIUM]** Update `ata-accountancy` URL to HTTPS (`src/lib/portfolio-data.ts:209`)
8. **[MEDIUM]** Fix `TemplateOrderPage.tsx` empty alt attributes (lines ~517, ~936)
9. **[MEDIUM]** Add `fetchPriority="high" loading="eager"` to hero images in `HeroSection.tsx` and country/service landing pages
10. **[MEDIUM]** Fix `SoftwareApplication.operatingSystem` — change `"Web"` to `"Any"` in `buildTechnologySchema` or `buildSoftwareApplicationSchema`
11. **[LOW]** Add `FilenesSports` to `portfolio-data.ts` or remove reference from CLAUDE.md
12. **[LOW]** Add `SearchAction` potentialAction to `WebSite` schema in `index.html`
13. **[LOW]** Add `sameAs` social links to `buildPersonProfileSchema` in `seo-schemas.ts`
14. **[BACKLOG]** Create `/en/services/website-redesign` page (keyword gap — high commercial intent)
15. **[BACKLOG]** Write "Multilingual Website Design for European Businesses" blog post (EN + FR)

---

### History

**Previous audit:** SEO-REPORT.md (2026-03-30) — Score: 74/100

**Resolved since 2026-03-30:**
- ProcessPage now has `<SeoHead>` + `WebPage` JSON-LD + `BreadcrumbList` ✅
- H1 in `HeroSection.tsx` moved outside `motion.div initial="hidden"` — LCP fix applied ✅
- EN and FR blog sitemap `lastmod` now uses per-article dates from `articles.ts` ✅
- `ProfessionalServiceSchema.image` wrapped in `ImageObject` with url/width/height ✅

**Confirmed not a bug (investigated this audit):**
- "21 blog posts missing from sitemap" — false alarm; all 52 articles are correctly distributed across EN/FR/NL/DE locale sections ✅
- `templates/order` route order — React Router v6 prioritizes static routes over dynamic; no bug ✅

**Still open (carried from 2026-03-30):**
Items 1–2, 5–14 from that report → now items 1–14 above. No regressions.

**Score change:** 74 → 79/100 (+5) — driven by 4 resolved criticals.
