# SEO ACTION PLAN — dmckreatif.com

**Mevcut Skor:** 66/100
**Hedef Skor (1 ay):** 85/100
**Tarih:** 2026-02-27

---

## P0 — KRITIK (Hemen yap)

### 1. Pre-rendering Ekle (Indexability Fix)
**Sorun:** Tum sayfalar ayni index.html donderiyor. Canonical, lang, title hatali.
**Etki:** Indexability 35 → 85
**Dosyalar:** `vite.config.ts`, `index.html`
**Cozum:**
```bash
npm install vite-plugin-prerender
```
Build sirasinda /en, /fr, /nl, /de, /en/services, /en/pricing vb. icin statik HTML uret. Her birinde dogru canonical, lang, title olsun.

### 2. Blog Post'lari Genislet
**Sorun:** 15 yazi x 150-250 kelime = "unhelpful content" riski
**Etki:** Content Quality 40 → 75
**Dosyalar:** `src/i18n/locales/en.json` (blog section), `src/pages/BlogPostPage.tsx`
**Cozum:**
- Her yaziyi 1,500+ kelimeye genislet
- H2/H3 alt basliklar ekle
- Liste/tablo kullan
- Gercek proje deneyimleri referans ver
- BlogPostPage'de markdown renderer kullan (tek `<p>` yerine)

### 3. Cookie Banner Mobil Fix
**Sorun:** Mobilde ekranin %50'sini kapliyor, CTA'lar gorunmuyor
**Etki:** Conversion rate +30-50%
**Dosya:** `src/components/gdpr/CookieBanner.tsx`
**Cozum:** Mobilde slim bottom bar (tek satir Accept/Reject)

### 4. Istatistikleri Duzelt
**Sorun:** "48+ Projects, 44+ Countries" dogrulanamaz
**Etki:** E-E-A-T Trust sinyal iyilestirmesi
**Dosyalar:** `src/components/home/AgencyStats.tsx`, `src/components/home/HeroSection.tsx`, `src/i18n/locales/en.json`
**Cozum:** 12+ Projects, 4+ Countries (veya gercek rakamlar)

### 5. Supabase Lazy Load
**Sorun:** 166KB JS her sayfada yukleniyor, sadece auth icin gerekli
**Etki:** -41KB critical path, TBT -200ms
**Dosya:** `src/main.tsx`
**Cozum:** AuthProvider'i sadece /dashboard, /admin, /login, /register route'larina tasi

### 6. H1 Animasyonunu Kaldir (LCP Fix)
**Sorun:** H1 (LCP elemani) opacity:0 ile basliyor, 0.7s animasyon
**Etki:** LCP -0.5-1.0s
**Dosya:** `src/components/home/HeroSection.tsx`
**Cozum:** H1'i motion.div'den cikar, dogrudan render et

---

## P1 — YUKSEK (Bu hafta)

### 7. Root Redirect
**Cozum:** `.htaccess`'e `RewriteRule ^$ /en [R=301,L]` ekle

### 8. HSTS Header
**Cozum:** `.htaccess`'e `Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"` ekle

### 9. Organization Schema Birlestirme
**Cozum:** `index.html`'deki statik schema'yi `@graph` pattern'e cevir, HomePage'deki `buildOrganizationSchema()` cagrisini kaldir

### 10. Image Alt Text Zenginlestir
**Cozum:** "CAKIR FACADES" → "Cakir Facades — facade renovation website designed by DMC Kreatif, featuring responsive design and 98 Lighthouse score"

### 11. Font Weight Azalt
**Cozum:** 9 weight → 3-4 weight. `Space+Grotesk:wght@600;700` + `JetBrains+Mono:wght@400`

### 12. Template Detail URL'leri Sitemap'e Ekle
**Cozum:** `/en/templates/restaurant`, `/en/templates/construction` vb. hreflang ile ekle

### 13. Blog Post Hreflang
**Cozum:** EN-only post'lara `hreflang="en"` self + `x-default` ekle

### 14. BreadcrumbList Null Fix
**Dosya:** `src/lib/seo-schemas.ts:208`
**Cozum:** `item: undefined` yerine son ListItem'dan `item` property'sini tamamen cikar

### 15. Review Verisi ProfessionalService'e Gec
**Cozum:** ContactPage'de `buildProfessionalServiceSchema(reviews)` seklinde gercek review data'si gec

---

## P2 — ORTA (Bu ay)

### 16-25: Schema, Performance, Content Iyilestirmeleri
- Below-fold section lazy load
- i18n dil bazli split
- PortfolioPage CollectionPage schema
- ContactPage schema
- AboutPage Person schema
- Portfolio image optimize (srcset)
- CityServicePage serviceType fix
- Yazar biyografisi blog post'lara
- Permissions-Policy header
- Lastmod tarihleri gercek degerler

---

## P3 — DUSUK (Backlog)

### 26-31: Polish & Cleanup
- aria-label eksikleri
- OG image optimizasyonu
- Promosyon H2→p
- Theme color uyumu
- Privacy/Terms WebPage schema
- Dead schema fonksiyonlari temizle
