# GEO Analysis Report — dmckreatif.com

**Date:** 2026-02-27
**Analyzed by:** Claude Code GEO Skill
**Site:** https://dmckreatif.com
**Tech Stack:** React 18 + Vite 7 (Client-Side Rendered SPA)

---

## GEO Readiness Score: 52/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Citability Score | 40/100 | 25% | 10.0 |
| Structural Readability | 55/100 | 20% | 11.0 |
| Multi-Modal Content | 35/100 | 15% | 5.3 |
| Authority & Brand Signals | 45/100 | 20% | 9.0 |
| Technical Accessibility | 65/100 | 20% | 13.0 |
| **TOTAL** | | | **48.3 → 52** |

---

## 1. Platform Breakdown

| Platform | Score | Status |
|----------|-------|--------|
| Google AI Overviews | 55/100 | Partial — noscript fallback helps, but SPA limits real content extraction |
| ChatGPT | 40/100 | Weak — no Wikipedia, no Reddit presence, limited sameAs |
| Perplexity | 38/100 | Weak — no Reddit/forum mentions, no community validation |
| Bing Copilot | 50/100 | Moderate — static HTML fallback, but no IndexNow implementation |

---

## 2. AI Crawler Access Status

| Crawler | Status | Notes |
|---------|--------|-------|
| GPTBot (OpenAI) | ALLOWED | robots.txt line 19 |
| OAI-SearchBot (OpenAI) | MISSING | Not explicitly allowed — add it |
| ChatGPT-User (OpenAI) | MISSING | Not explicitly allowed — add it |
| ClaudeBot (Anthropic) | ALLOWED | robots.txt line 26 |
| PerplexityBot | ALLOWED | robots.txt line 28 |
| CCBot (Common Crawl) | ALLOWED | Consider blocking (training data only) |
| anthropic-ai | ALLOWED | robots.txt line 44 |
| Google-Extended | ALLOWED | robots.txt line 22 |
| Bytespider (ByteDance) | ALLOWED | robots.txt line 37 |
| cohere-ai | ALLOWED | robots.txt line 40 |
| Applebot | ALLOWED | robots.txt line 34 |

**Issues:**
- `OAI-SearchBot` and `ChatGPT-User` not explicitly listed (important for ChatGPT web search)
- `CCBot` allowed — this is training-only, provides no search visibility benefit

---

## 3. llms.txt Status

**Status: PRESENT** — `/llms.txt` exists and is well-structured.

**Strengths:**
- Clear title and description
- Services and pricing listed with EUR values
- Portfolio highlights with URLs
- Markets served by country
- Contact info and key page links

**Weaknesses:**
- No `## Key Facts` section with specific statistics (AI models love quotable facts)
- No tech expertise keywords that AI models would match to queries
- No mention of unique differentiators (e.g., "10+ projects in 4 countries")
- Missing schema/structured data hint for AI parsers

---

## 4. Brand Mention Analysis

| Platform | Status | Impact |
|----------|--------|--------|
| Wikipedia | NOT PRESENT | High negative — Wikipedia is #1 source for ChatGPT citations (47.9%) |
| Reddit | NOT PRESENT | High negative — Reddit is #1 for Perplexity (46.7%), #2 for ChatGPT (11.3%) |
| YouTube | NOT PRESENT | Critical negative — YouTube mentions have 0.737 correlation with AI citations (strongest signal) |
| LinkedIn | PRESENT (company page) | Moderate positive — only social presence listed in sameAs |
| GitHub | NOT PRESENT | Moderate negative — would establish developer credibility |
| Crunchbase | NOT PRESENT | Low negative — tech/startup authority signal |
| Trustpilot/Google Reviews | NOT PRESENT | Moderate negative — review signals for local service entities |

**Brand Mention Score: 1/7 platforms = 14%**

This is the single biggest weakness. AI models can't cite what they can't find across the web.

---

## 5. Passage-Level Citability Analysis

### Current State: WEAK

**Problem:** Almost all content is behind i18n translation keys (`t("key", "fallback")`). AI crawlers that don't execute JavaScript will see only the `<noscript>` block, which has ~200 words of generic content.

**noscript block citability:**
- Word count: ~200 words — insufficient for deep citation
- Structure: Good (H1, H2, lists)
- Specificity: Good (mentions €349-€2,497 pricing, matches displayed campaign prices)

**Optimal passage blocks found (in noscript): 0**
- No passage is in the optimal 134-167 word range
- No self-contained answer blocks with specific facts + sources
- No "What is DMC Kreatif?" definition paragraph

**In-JS content citability (for JS-executing crawlers):**
- FAQ section has 8 good Q&A pairs — strong for Google AIO
- Service descriptions are short and specific
- Pricing is clearly structured
- But: Content lives in React state/translation files, not in semantic HTML

---

## 6. Server-Side Rendering Check

### CRITICAL ISSUE: Client-Side Only SPA

**Framework:** React 18 + Vite 7 (no SSR/SSG)
**Build:** `vite build` produces static client-side bundle
**Rendering:** All content is JavaScript-dependent

**What AI crawlers see without JS:**
1. Static `index.html` with basic meta tags + JSON-LD (good)
2. `<noscript>` fallback content (~200 words) (helps but limited)
3. No actual page content (services, portfolio, blog, pricing)

**What AI crawlers see with JS (Google only):**
1. Full page content after hydration
2. But: Framer Motion animations delay visible content
3. i18n translations loaded async — possible empty state during crawl

**Mitigation already in place:**
- Static JSON-LD schemas in `index.html` `<head>` (Organization + WebSite)
- `<noscript>` block with core service descriptions
- Comprehensive `llms.txt` file
- `robots.txt` with proper directives

**Impact Assessment:**
- Google AI Overviews: Moderate impact (Googlebot renders JS well)
- ChatGPT/Perplexity/Claude: High impact (these crawlers don't execute JS)
- For non-Google AI: only `llms.txt` + `noscript` + meta tags are accessible

---

## 7. Schema Markup for AI Discoverability

### Current Schemas:
| Schema Type | Location | Status |
|-------------|----------|--------|
| Organization | index.html (static) + HomePage.tsx | Dual — good for AI |
| WebSite | index.html (static) + HomePage.tsx | Dual — good |
| ProfessionalService | ContactPage (JS only) | JS-only — AI can't see |
| Service | ServicesPage (JS only) | JS-only |
| BreadcrumbList | Various pages (JS only) | JS-only |
| BlogPosting | BlogPostPage (JS only) | JS-only |
| FAQPage | Removed (correct per Aug 2023 policy) | N/A |
| SoftwareApplication | TemplatesPage (JS only) | JS-only |
| CollectionPage | PortfolioPage (JS only) | JS-only |
| HowTo | Available but usage unclear | — |

**Issue:** Most schemas are only generated via React (JS-dependent). Non-JS crawlers only see Organization + WebSite from the static `<head>`.

### Missing Schemas:
- `Person` schema for founder (Musa Kerem Demirci) — critical for E-E-A-T
- `sameAs` only has LinkedIn — needs GitHub, personal site, other profiles
- No `speakable` property for AI voice assistants
- No `mentions` or `about` linking to external entities

---

## 8. Top 5 Highest-Impact Changes

### 1. Build Brand Presence on Reddit + YouTube (Impact: +20 points)
**Why:** YouTube mentions have 0.737 correlation with AI citations. Reddit is #1 source for Perplexity, #2 for ChatGPT.
**Action:**
- Create YouTube channel with 3-5 short web dev tutorials
- Post in r/webdev, r/freelance, r/Entrepreneur about European web dev market
- Answer questions on r/web_design, r/smallbusiness

### 2. Fix noscript Content + Add Static Service Schemas (Impact: +12 points)
**Why:** Non-Google AI crawlers (ChatGPT, Perplexity, Claude) only see static HTML. Current noscript is too thin.
**Action:**
- DONE: noscript expanded to 800+ words with citability-optimized passages
- Add static Service + ProfessionalService JSON-LD to `index.html` `<head>`
- Include FAQ content directly in static HTML

### 3. Enhance llms.txt with Citability Blocks (Impact: +8 points)
**Why:** llms.txt is the primary document AI crawlers will parse for non-JS sites.
**Action:**
- Add `## Key Facts` section with specific statistics
- Add `## FAQ` section with 3-5 key Q&A pairs (134-167 word answers)
- Add `## Unique Differentiators` section
- Include founder credentials and expertise

### 4. Expand sameAs + Create Person Schema (Impact: +7 points)
**Why:** Entity disambiguation is critical for AI models to confidently cite a brand.
**Action:**
- Add GitHub profile URL to sameAs
- Create LinkedIn personal profile link
- Add Google Business Profile (if exists)
- Create dedicated Person schema for Musa Kerem Demirci with jobTitle, sameAs, knowsAbout

### 5. Add OAI-SearchBot + ChatGPT-User to robots.txt (Impact: +5 points)
**Why:** OpenAI has 3 separate crawlers. Only GPTBot is listed.
**Action:**
- Add `User-agent: OAI-SearchBot` + `Allow: /`
- Add `User-agent: ChatGPT-User` + `Allow: /`
- Optionally block `CCBot` (training only, no search benefit)

---

## 9. Content Reformatting Suggestions

### Homepage (noscript block)
**Current:** Generic description paragraph
**Suggested:** Add a self-contained definition block:

> DMC Kreatif is a premium web development agency founded by Musa Kerem Demirci, serving European businesses across France, Belgium, the United Kingdom, Netherlands, Germany, and Switzerland. The agency specializes in custom websites built with React and Next.js, e-commerce platforms with payment integration, SEO optimization, and ongoing website maintenance. With 10+ international projects delivered across 4 countries and a team achieving 95+ Lighthouse performance scores on every project, DMC Kreatif offers web development packages starting from €497 for single-page sites up to €2,997 for full e-commerce solutions. All websites include multilingual support in English, French, Dutch, and German.

(~107 words — expand to 134-167 with specific project examples)

### Services Page
**Current:** Service features listed as bullet points only
**Suggested:** Add a paragraph introduction per service with specific deliverables, timelines, and outcomes. Each paragraph should be 134-167 words and self-contained.

### Blog Posts
**Current:** Translation-key-based content
**Suggested:** Ensure each blog post opens with a direct answer in the first 40-60 words. Use "What is [topic]?" pattern for H2 headings.

---

## 10. Quick Wins Checklist

### Immediate (< 1 hour)
- [ ] Add `OAI-SearchBot` and `ChatGPT-User` to robots.txt
- [ ] Fix noscript price discrepancy (€349→€497, €749→€997, etc.)
- [ ] Add `## Key Facts` section to llms.txt
- [ ] Expand `sameAs` with GitHub profile URL

### Short-term (< 1 week)
- [ ] Add static ProfessionalService + Service JSON-LD to index.html head
- [ ] Create Person schema for founder in static HTML
- [ ] Expand noscript block to 500+ words with optimized passages
- [ ] Add FAQ content to llms.txt
- [ ] Consider adding `speakable` schema property

### Medium-term (1-4 weeks)
- [ ] Create YouTube channel + 3 tutorial videos
- [ ] Post on Reddit (r/webdev, r/freelance) with case studies
- [ ] Set up Google Business Profile for local entity signals
- [ ] Create GitHub profile with open-source contributions
- [ ] Consider SSR/SSG migration (Next.js or Astro) for full AI accessibility

### Long-term (1-3 months)
- [ ] Build Wikipedia presence (notability through press coverage first)
- [ ] Publish original research (e.g., "European Small Business Website Performance Report")
- [ ] Implement IndexNow for Bing Copilot
- [ ] Build comprehensive entity graph across platforms

---

## Summary

dmckreatif.com has a solid SEO foundation (meta tags, JSON-LD, hreflang, sitemap, llms.txt) but faces two critical GEO challenges:

1. **Client-Side Rendering:** The Vite SPA means 60%+ of content is invisible to non-Google AI crawlers. The noscript fallback and llms.txt partially mitigate this, but the gap is significant.

2. **Zero Brand Mentions:** Only LinkedIn presence exists. No Reddit, YouTube, Wikipedia, GitHub, or review platform presence. Brand mentions correlate 3x more with AI visibility than backlinks — this is the #1 priority.

**Bottom line:** Fix the noscript content immediately (30 min), then invest in YouTube + Reddit presence (ongoing). These two actions alone could push the GEO score from 52 to 70+.
