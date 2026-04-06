# SEO Full Audit Report — dmckreatif.com

## Date: 2026-04-06
## Overall SEO Health Score: 68/100
## Business Type: Digital Agency (European B2B)

---

### Executive Summary

- **SPA rendering is the #1 blocker** — all body content requires JavaScript execution; Googlebot relies on second-wave rendering which delays indexing by days
- **Trailing slash redirect chain** — every URL in the sitemap returns 301 (3 hops from root), diluting PageRank and wasting crawl budget
- **4 major pages missing H1** — Portfolio, Pricing, Contact, Blog have no H1 heading element
- **239 location pages exceed quality gate** — HARD STOP threshold (50+) breached; content uniqueness unverified
- **Duplicate ProfessionalService schema** — two JSON-LD blocks with same `@id` create entity conflicts

---

### Score Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 71 | 17.75 |
| Content Quality | 25% | 64 | 16.00 |
| On-Page SEO | 20% | 64 | 12.80 |
| Schema / Structured Data | 10% | 71 | 7.10 |
| Performance (CWV) | 10% | 72 | 7.20 |
| Images | 5% | 72 | 3.60 |
| AI Search Readiness | 5% | 72 | 3.60 |
| **Total** | **100%** | | **68.05** |

---

## 1. Technical SEO — 71/100

### Passed
- robots.txt well-structured with AI crawler allowlist and sitemap reference
- HSTS with preload + includeSubDomains correctly configured
- Viewport meta tag correct, touch targets meet 44px minimum
- Self-hosted fonts (Syne, DM Sans, JetBrains Mono) with preload
- Static JSON-LD @graph in index.html visible to first-wave crawlers

### Critical Issues
| ID | Issue | Impact |
|----|-------|--------|
| T-C1 | 3-hop redirect chain: `dmckreatif.com` -> 301 -> `/en` -> 301 -> `/en/` -> 200 | PageRank dilution, crawl budget waste |
| T-C2 | SPA content JS-dependent: `<div id="root">` empty except cookie banner | Second-wave indexing delay |

### High Issues
| ID | Issue |
|----|-------|
| T-H1 | Blog hreflang orphans — posts only self-reference, no cross-locale alternates |
| T-H2 | All 661 sitemap URLs return 301 (canonical/server trailing-slash mismatch) |
| T-H3 | CSP `frame-ancestors 'none'` contradicts `X-Frame-Options: SAMEORIGIN` |
| T-H4 | HTML Cache-Control `no-cache, must-revalidate` on every visit |

### Medium Issues
- Sitemap lastmod bulk-stamped (97% share two dates)
- CDN BYPASS on all responses (Hostinger hcdn not caching)
- www subdomain 2-hop redirect chain
- No changefreq/priority in sitemap

---

## 2. Content Quality — 64/100

### E-E-A-T Assessment
| Signal | Score | Key Gap |
|--------|-------|---------|
| Experience | 52 | Founder bio 2 sentences; no photo; 33+ vs 12 shown |
| Expertise | 72 | Strong tech blog; specific stack naming |
| Authoritativeness | 50 | Only 1 sameAs (LinkedIn); no Clutch/Trustpilot |
| Trustworthiness | 68 | Legal pages exist; GDPR consent; no visible address |

### Content Depth Failures
| Page | Est. Words | Minimum | Status |
|------|-----------|---------|--------|
| Services | ~450 | 800 | FAIL |
| Portfolio | ~250 | 500 | FAIL |
| Contact | ~200 | 300 | FAIL |
| Blog Index | ~200 | 300 | FAIL |

### Critical
- AggregateRating schema says 5.0 but UI shows 4.9
- FR/NL/DE pages render EN content body (only meta differs) — duplicate content risk

---

## 3. On-Page SEO — 64/100

### Missing H1 (Critical)
- PortfolioPage — SectionHeader defaults to H2
- PricingPage — first heading is `<motion.h2>`
- ContactPage — SectionHeader defaults to H2
- BlogPage — SectionHeader defaults to H2

### Title Length Issues
| Status | Pages |
|--------|-------|
| CRITICAL (<25 chars) | Blog (18), Contact (21), WhyUs (22) |
| HIGH (<40 chars) | Services (39), Pricing (38), Team (37) |
| GOOD (50-60) | Home, Portfolio, Process, About, Careers |

### Description Length Issues
| Status | Pages |
|--------|-------|
| CRITICAL (<80 chars) | WhyUs (63), Contact (79) |
| HIGH (<100 chars) | Portfolio (92), Blog (92), Pricing (95) |
| GOOD (150-160) | Process (153) only |

### Other
- H2 skipped on ServicesPage, WhyUsPage, CareersPage
- BlogPostPage has 2 H1 elements (error state + article)
- PricingPage: only 1 internal link (needs 3+)
- CareersPage: zero internal links (dead-end)
- ~24 hardcoded English strings in ServicesPage features

---

## 4. Schema / Structured Data — 71/100

### Critical
- Duplicate ProfessionalService with same `@id: #organization` (index.html + TestimonialsMarquee)
- index.html ProfessionalService missing `telephone`

### High
- Person entity missing `image`
- WebSite missing SearchAction potentialAction
- ServiceDetailPage missing BreadcrumbList
- `offers.price` is string not number

### Missing Schema
| Page | Needed |
|------|--------|
| IndustriesPage | CollectionPage + BreadcrumbList |
| TechnologiesPage | CollectionPage + BreadcrumbList |
| CareersPage | WebPage + JobPosting |
| PartnersPage | WebPage + BreadcrumbList |

---

## 5. Performance (CWV) — 72/100

### Estimated Metrics
| Metric | Estimate | Threshold | Status |
|--------|----------|-----------|--------|
| LCP | ~2.8-3.5s | <=2.5s | Needs Improvement |
| INP | ~120-180ms | <=200ms | Good |
| CLS | ~0.02-0.06 | <=0.1 | Good |

### Key Findings
- H1 correctly outside Framer Motion tree (LCP not animation-blocked)
- Fonts preloaded but missing `fetchpriority="high"` on hero font
- Initial JS ~144KB gzip (at 150KB boundary)
- No prerender active (prerenderPlugin exists but Puppeteer not installed)
- GTM/Clarity consent-gated (correct)

---

## 6. Images — 72/100

### Oversized (>200KB)
- mkn-desktop.webp (288KB), cakir-desktop.webp (284KB), altinbas-desktop.webp (272KB)

### Mobile >100KB
- altinbas-mobile (196KB), iso-mobile (168KB), retro-mobile (164KB), cakir-mobile (164KB)

### Missing Dimensions (CLS risk)
- TemplateCard.tsx, CaseStudiesPage.tsx, ClientLogoBar.tsx

### Positive
- 100% WebP format, 100% alt text coverage
- ProjectCard uses `<picture>` + srcSet
- CaseStudyDetailPage uses fetchPriority="high" correctly

---

## 7. Sitemap — 54/100

### Statistics
- Total URLs: 661
- Location pages: 239 (EXCEEDS 50-page hard stop)
- All 661 loc URLs return 301
- Lastmod: 97% bulk-stamped with 2 dates

---

## Comparison with Previous Report (2026-03-19: 74/100)

| Fixed Since Last | New Issues Found |
|-----------------|-----------------|
| ProcessPage schema added | 4 pages missing H1 |
| H1 LCP delay fixed | 239 location pages quality gate |
| Blog lastmod dates updated | Duplicate schema @id conflict |
| Scroll lock bug fixed | Title/description length failures |
| Supabase 406 error handled | E-E-A-T depth gaps |
| Emoji flags replaced | SPA prerender still missing |

Score decreased 74 -> 68 due to expanded audit scope (E-E-A-T, quality gates, schema validation).
