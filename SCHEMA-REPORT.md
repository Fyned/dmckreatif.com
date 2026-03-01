# Schema Markup Report — dmckreatif.com

**Date:** 2026-02-27
**Format:** JSON-LD (all schemas)
**Delivery:** Static (index.html) + Dynamic (React components via JsonLd)

---

## Schema Inventory

### Static Schemas (index.html `<head>` — visible to ALL crawlers)

| # | Schema Type | Status | Issues |
|---|-------------|--------|--------|
| 1 | Organization | OK | Missing `contactPoint`, limited `sameAs` (only LinkedIn) |
| 2 | WebSite | OK | Missing `potentialAction` (SearchAction for sitelinks search box) |

### Dynamic Schemas (React — JS-only, invisible to non-Google AI crawlers)

| # | Page | Schema Type | Status | Issues |
|---|------|-------------|--------|--------|
| 3 | HomePage | Organization | OK | Duplicate of static — acceptable for completeness |
| 4 | HomePage | WebSite | OK | Duplicate of static |
| 5 | AboutPage | Organization | OK | No additional schemas (missing Person for founder) |
| 6 | ContactPage | ProfessionalService | OK | Uses deprecated alias `buildLocalBusinessSchema` |
| 7 | ServicesPage | Service | WARN | Only 1 Service schema for "Web Development" — should cover all 4 services |
| 8 | ServiceDetailPage | Service | OK | Per-service schema, correct |
| 9 | PricingPage | Service + OfferCatalog | OK | Good structure |
| 10 | BlogPage | *(none)* | MISSING | No Blog or CollectionPage schema |
| 11 | BlogPostPage | BlogPosting | OK | Good — has author, publisher, dates |
| 12 | PortfolioPage | *(none)* | MISSING | No CollectionPage schema (builder exists but not used) |
| 13 | CaseStudiesPage | CreativeWork (per item) | OK | Multiple per project |
| 14 | TemplatesPage | SoftwareApplication | OK | Per template |
| 15 | CityServicePage | ProfessionalService | ERROR | Uses invalid `serviceType` property |
| 16 | TestimonialsMarquee | ProfessionalService + Reviews | OK | AggregateRating + Review embedded correctly |
| 17 | Breadcrumbs (all pages) | BreadcrumbList | WARN | Current page has `item: undefined` — should omit `item` key entirely |

---

## Validation Details

### ERROR: CityServicePage `serviceType` is not a valid Schema.org property

**File:** `src/pages/CityServicePage.tsx:152`
**Issue:** `serviceType` is not a recognized property of `ProfessionalService`. Google will ignore it.
**Fix:** Replace with `knowsAbout` (same as Organization schema).

### WARN: ServicesPage only emits 1 Service schema

**File:** `src/pages/ServicesPage.tsx:187-194`
**Issue:** Only builds schema for "Web Development" — the page shows 4 services (Web Dev, E-Commerce, SEO, Maintenance). `buildAllServicesSchema()` exists in `seo-schemas.ts` but is NOT used.
**Fix:** Use `buildAllServicesSchema(currentLocale)` instead of single `buildServiceSchema()`.

### WARN: BreadcrumbList last item has `item: undefined`

**File:** `src/lib/seo-schemas.ts:208`
**Issue:** `item: undefined` is serialized as `item: null` in JSON. Google expects the last item to simply NOT have an `item` property.
**Fix:** Conditionally omit `item` for the last element.

### MISSING: PortfolioPage has no schema

**File:** `src/pages/PortfolioPage.tsx`
**Issue:** `buildPortfolioPageSchema()` exists in `seo-schemas.ts` but is never imported or used.

### MISSING: BlogPage has no schema

**File:** `src/pages/BlogPage.tsx`
**Issue:** No CollectionPage or Blog schema. Should have a `CollectionPage` or `Blog` schema listing articles.

### MISSING: Person schema for founder

**Issue:** Musa Kerem Demirci is referenced in Organization/BlogPosting schemas as nested `Person`, but no standalone `Person` schema exists. A dedicated Person schema with `sameAs`, `knowsAbout`, and `jobTitle` would strengthen E-E-A-T signals.

### MISSING: Static ProfessionalService in index.html

**Issue:** The ProfessionalService schema (with AggregateRating, address, geo) only loads via TestimonialsMarquee on the homepage. AI crawlers that don't execute JS never see it.

### INFO: Review datePublished is hardcoded

**File:** `src/components/home/TestimonialsMarquee.tsx:46`
**Issue:** All reviews have `datePublished: "2024-01-15"` — identical dates look artificial. Should vary per testimonial.

---

## Fixes Applied

The following changes will be made:
1. Fix CityServicePage `serviceType` → `knowsAbout`
2. ServicesPage: use `buildAllServicesSchema()` instead of single schema
3. Fix BreadcrumbList last-item `undefined` issue
4. Add CollectionPage schema to PortfolioPage
5. Add Blog schema to BlogPage
6. Add static ProfessionalService + Person schema to index.html
7. Vary review datePublished per testimonial
