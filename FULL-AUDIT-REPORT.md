# SEO Full Audit Report — dmckreatif.com

## Date: 2026-04-10
## Overall SEO Health Score: 54/100
## Previous Score: 68/100 (2026-04-06)
## Business Type: Digital Agency (European B2B)

---

## Executive Summary

Score dropped from 68 to 54 due to expanded audit scope — content E-E-A-T analysis revealed fabricated team/project numbers across locales, and sitemap quality gate failure on 241 location pages. Technical issues from previous audit remain largely unfixed.

### Top 5 Critical Issues
1. **Fabricated numbers across locales** — EN says 33 projects/4 countries, FR/NL/DE say 200+ projects/12+ countries
2. **241 location pages exceed quality gate** — doorway page pattern, HARD STOP threshold breached 4.8x
3. **3-hop redirect chain** — root domain requires 3 redirects to reach content
4. **661 sitemap URLs all return 301** — trailing slash mismatch wastes crawl budget
5. **4 major pages missing H1** — Portfolio, Pricing, Contact, Blog

### Top 5 Quick Wins
1. Add H1 to 4 pages (PortfolioPage, PricingPage, ContactPage, BlogPage)
2. Fix trailing slash in sitemap URLs (add `/` to all 641 `<loc>` values)
3. Remove X-Frame-Options header (CSP frame-ancestors sufficient)
4. Remove duplicate ProfessionalService schema from index.html
5. Add 3+ internal links to 6 dead-end pages

---

## Category Scores

| Category | Weight | Score | Weighted | Trend |
|----------|--------|-------|----------|-------|
| Technical SEO | 25% | 62/100 | 15.5 | ↓ from 71 |
| Content Quality | 25% | 34/100 | 8.5 | ↓ from 64 |
| On-Page SEO | 20% | 62/100 | 12.4 | ↓ from 64 |
| Schema / Structured Data | 10% | 74/100 | 7.4 | ↑ from 71 |
| Performance (CWV) | 10% | 62/100 | 6.2 | ↓ from 72 |
| Sitemap | 5% | 42/100 | 2.1 | ↓ from 54 |
| AI Search Readiness | 5% | 25/100 | 1.25 | NEW |
| **TOTAL** | **100%** | | **53.4** | **↓ from 68** |

---

## 1. Technical SEO — 62/100

### CRITICAL
- **3-hop redirect chain STILL PRESENT**: `dmckreatif.com` → 301 → `/en` → 301 → `/en/` → 200
- **www subdomain WORSENED to 3-hop**: `www.dmckreatif.com` → `dmckreatif.com/` → `/en` → `/en/`
- **All 661 sitemap URLs return 301**: Trailing slash mismatch between sitemap `<loc>` and server config
- **Cache-Control prevents caching**: `no-cache, must-revalidate` on HTML, CDN always BYPASS

### HIGH
- CSP `frame-ancestors 'none'` contradicts `X-Frame-Options: SAMEORIGIN`
- `Retry-After: 60` on 200 responses — wrong signal, may throttle crawlers
- SPA JS-dependent rendering partially addressed (cookie banner in shell) but no true prerendering

### MEDIUM
- Canonical URL trailing slash inconsistency
- Hreflang URLs point to 301-redirecting paths
- `og:locale` uses `en_US` instead of `en_GB` for UK-focused business

### PASSED
- robots.txt correctly configured with AI crawler management
- Security headers: HSTS (preload), Permissions-Policy, Referrer-Policy, X-Content-Type-Options
- Font strategy: self-hosted woff2, preload, font-display: swap
- manifest.webmanifest present

---

## 2. Content Quality — 34/100

### CRITICAL: Fabricated Numbers (TRUST DESTROYER)
| Metric | EN | FR | NL | DE |
|--------|----|----|----|----|
| Projects | 33+ | 200+ | 200+ | 200+ |
| Countries | 4 | 12+ | — | — |
| Team | 28-strong | 150+ equipe | 100+ professionals | 100+ Fachleute |

Real figures: ~8 projects, 1 founder, 3-4 countries. This is the single biggest E-E-A-T destroyer.

### E-E-A-T Breakdown
| Factor | Score | Key Issue |
|--------|-------|-----------|
| Experience | 35/100 | 7 real projects listed but no photo, no verifiable credentials |
| Expertise | 40/100 | Blog has 30 articles but skill bars (88-98%) are vanity metrics |
| Authoritativeness | 15/100 | Only LinkedIn sameAs, no Clutch/Trustpilot/GBP |
| Trustworthiness | 20/100 | Fabricated numbers, no physical address, no company reg number |

### Content Depth Failures
| Page | Words | Minimum | Status |
|------|-------|---------|--------|
| About | ~350 | 500 | FAIL |
| Portfolio | ~200 | 300 | FAIL |
| Blog Index | ~100 | 200 | FAIL |
| Contact | ~250 | 300 | FAIL |
| AuthorPage | ~450 | 500 | FAIL |

### Duplicate Content
60-70% of FR/NL/DE page body content falls back to English via `lng: "en"` fallback. Only SEO meta tags are translated.

### NEW: Price Contradictions
- EN: "from EUR 497" vs FR: "à partir de 349 EUR"
- Pricing page vs hero microcopy conflicts

---

## 3. On-Page SEO — 62/100

### Titles — 85/100 (IMPROVED from previous)
- 15/17 pages optimal (40-60ch) — Blog, Contact, WhyUs titles FIXED
- 2 borderline: partners (68ch), templates (61ch)

### Meta Descriptions — 80/100 (IMPROVED)
- 14/17 optimal (120-160ch) — WhyUs, Contact FIXED
- 3 over 160ch: about (163), team (164), author (170)

### Heading Hierarchy — 45/100 (STILL BROKEN)
- **4 pages STILL missing H1**: PortfolioPage, PricingPage, ContactPage, BlogPage
- **BlogPostPage STILL has 2 H1** elements
- **PricingPage skips H1 AND H2**, jumps to H3
- H2 skips on ServicesPage, WhyUsPage, CareersPage — FIXED

### Internal Linking — 35/100 (STILL BROKEN)
| Page | Links | Status |
|------|-------|--------|
| PricingPage | 0 | FAIL |
| ContactPage | 0 | FAIL |
| BlogPage | 0 | FAIL |
| CareersPage | 0 | FAIL |
| ServicesPage | 0 | FAIL |
| WhyUsPage | 0 | FAIL |

### Image Alt Text — 92/100 (GOOD)
### OG/Twitter Cards — 95/100 (GOOD)
### Hardcoded Strings — ~40 in ServicesPage

---

## 4. Schema / Structured Data — 74/100

### CRITICAL
- **Duplicate ProfessionalService**: index.html @graph AND TestimonialsMarquee both emit same `@id`
- **Person missing `image`** in index.html
- **ProfessionalService missing `telephone`** in index.html static version

### HIGH
- `offers.price` typed as string instead of number
- `buildSoftwareApplicationSchema` missing required `aggregateRating`
- `buildTechnologySchema` self-review (Organization reviews own software)

### MEDIUM
- AggregateRating 5.0 vs UI 4.9 mismatch
- ServiceDetailPage missing BreadcrumbList
- Person `@id` inconsistency: `#founder` vs `/#founder`
- City/Country schemas lack `@id`

### WORKING WELL
- 17 builder functions, good coverage
- @graph pattern correct in index.html
- BreadcrumbList omits URL on last item (Google guideline)
- All dates ISO 8601, absolute URLs throughout

---

## 5. Performance — 62/100 (mobile) / 78/100 (desktop)

### Core Web Vitals Estimates
| Metric | Estimate | Target | Status |
|--------|----------|--------|--------|
| LCP | ~3.2s (mobile) | ≤2.5s | FAIL |
| INP | ~180ms | ≤200ms | PASS (marginal) |
| CLS | ~0.03 | ≤0.1 | PASS |

### Critical Bundle Issues
- **GrapesJS chunk: 1.1MB** — production dependency, should be devDependency or dynamic import
- **Initial JS path: ~545KB uncompressed** (~160-180KB gzipped, target 150KB exceeded)
- Locale chunks oversized: fr.js 157KB, de.js 133KB, nl.js 127KB

### Critical Image Issues
- Portfolio: mkn-desktop.webp 286KB, cakir-desktop.webp 283KB, altinbas-desktop.webp 271KB (target: <120KB)
- **SVG logos unoptimized**: ata.svg 308KB, mkn.svg 117KB (SVGO could reduce 90%+)
- No `fetchPriority="high"` on homepage hero image

### GOOD
- Font strategy optimal (self-hosted, preload, swap)
- 38 pages all lazy-loaded with React.lazy()
- No third-party script bloat detected

---

## 6. Sitemap — 42/100

### Structure
- **641 URLs** total (was reported as 661 — minor discrepancy, recount)
- 241 location pages (171 unique city slugs)
- 52 blog posts (31 EN, 9 FR, 6 NL, 6 DE)
- ~348 core pages across 4 locales

### CRITICAL: Location Page Quality Gate BREACHED
241 location pages = 4.8x the 50-page HARD STOP threshold. Textbook doorway page pattern — city name swapped with identical service descriptions.

### Lastmod — FAIL
97% of URLs share two bulk-stamped dates (2026-02-28 and 2026-03-02). Google ignores bulk dates.

### Hreflang — PARTIAL
- Core pages: full 4-locale + x-default ✓
- Location pages: EN-only, no cross-locale links ✗
- Blog: each locale self-references only, no cross-linking ✗

### Missing Pages
- Technology detail pages (12 techs)
- Industry detail pages (8 industries)
- Template detail pages (partially missing)

---

## 7. AI Search Readiness — 25/100

- No FAQ schema on FaqAccordion sections
- No HowTo schema on process sections
- No author schema per blog post
- No dateModified signals on content
- Service descriptions well-structured but lack quotable statistics
- Blog has 30 articles but no definitive "answer format" for AI extraction

---

## Changes Since Previous Audit (2026-04-06)

### Fixed
| Item | Previous | Current |
|------|----------|---------|
| Title lengths (Blog, Contact, WhyUs) | 18-22ch | 43-60ch |
| Description lengths (WhyUs, Contact) | 63-79ch | 120-155ch |
| H2 skips (Services, WhyUs, Careers) | Skipped | Fixed |
| ProcessPage missing schema | Missing | Added |
| Empty alumniOf array | Present | Removed |

### Worsened
| Item | Previous | Current |
|------|----------|---------|
| www redirect chain | 2 hops | 3 hops |
| Content E-E-A-T score | Not scored separately | 34/100 (fabricated numbers) |

### Unchanged (Still Broken)
- 4 pages missing H1
- Trailing slash redirect on all sitemap URLs
- 3-hop root redirect chain
- Duplicate ProfessionalService schema
- 6 pages with zero internal links
- CDN BYPASS on all responses

---

## Statistics

| Metric | Value |
|--------|-------|
| Total sitemap URLs | 641 |
| Pages with JSON-LD | 20+ |
| Schema builder functions | 17 |
| Blog articles | 30 (EN) + 21 (FR/NL/DE) |
| Supported locales | 4 (EN, FR, NL, DE) |
| Location pages | 241 |
| Bundle size (initial, gzip) | ~170KB |
| Largest image | ata.svg (308KB) |
| Pages missing H1 | 4 |
| Pages with 0 internal links | 6 |
| Redirect chains | 3 (root, www, trailing slash) |
