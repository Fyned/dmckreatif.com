# FULL SEO AUDIT REPORT — dmckreatif.com

**Tarih:** 2026-02-27
**Araclar:** 6 paralel uzman agent (Technical, Content, Schema, Sitemap, Performance, Visual)
**Site:** https://dmckreatif.com
**Tip:** React + Vite SPA | 4 dil (EN/FR/NL/DE) | Hostinger

---

## GENEL SEO SAGLIK SKORU: 66 / 100

| Kategori | Agirlik | Skor | Agirlikli |
|----------|---------|------|-----------|
| Technical SEO | 25% | 62 | 15.5 |
| Content Quality (E-E-A-T) | 25% | 62 | 15.5 |
| On-Page SEO & Visual | 20% | 78 | 15.6 |
| Schema / Structured Data | 10% | 68 | 6.8 |
| Performance (CWV) | 10% | 60 | 6.0 |
| Images | 5% | 75 | 3.75 |
| AI Search Readiness | 5% | 58 | 2.9 |
| **TOPLAM** | **100%** | | **66.05** |

---

## IS TIPI TESPIT

- **Sektör:** Web Development Agency (ProfessionalService)
- **Pazar:** B2B — Avrupa KOBİ'leri (Fransa, Belcika, UK, Hollanda, Almanya)
- **Diller:** EN (primary), FR, NL, DE
- **Fiyatlandirma:** EUR 349-2,497 (site) / EUR 497-2,997 (CLAUDE.md)
- **Hosting:** Hostinger shared (hCDN, Frankfurt POP)
- **Mimari:** React 18 + Vite 7 (Client-Side SPA)

---

## EN KRITIK 5 SORUN

### 1. SPA Mimarisi — Tum Sayfalar Ayni HTML'i Donderiyor (CRITICAL)
Tum URL'ler (`/en`, `/fr/services`, `/de/pricing`) ayni `index.html` dosyasini donduruyor. Bu demek ki:
- Canonical tag her sayfa icin `/en`'e isaret ediyor
- `<html lang="en">` FR/NL/DE sayfalarinda da "en" olarak geliyor
- Title, description, OG tagleri tum sayfalarda ayni
- Google ilk crawl'da JS calistirmadan statik HTML'i okuyor
- **Cozum:** Pre-rendering (vite-plugin-prerender) veya Next.js'e gecis

### 2. Blog Icerikleri Tehlikeli Derecede Ince (CRITICAL)
15 blog yazisinin her biri 150-250 kelime, tek `<p>` etiketi icinde. H2/H3 yok, liste yok, resim yok. Google'in "Helpful Content" sisteminde "unhelpful" olarak siniflandirilma riski cok yuksek.
- **Cozum:** Her yaziyi 1,500+ kelimeye genislet, H2/H3 yapisi ekle, orijinal proje deneyimleri referans ver

### 3. LCP 3-4.5s Mobil — JS Bundle Cok Buyuk (CRITICAL)
939KB uncompressed JS (282KB compressed) kritik path'te. Hero H1 Framer Motion animasyonu ile `opacity: 0` basliyor — LCP gecikiyor.
- **Cozum:** Supabase'i lazy load et (-166KB), H1 animasyonunu kaldir, below-fold section'lari lazy load et

### 4. Cookie Banner Mobilde Ekranin %50'sini Kapliyor (CRITICAL)
Ilk ziyarette cookie consent banner CTA butonlarini, subtitle'i ve guvenilirlik mesajini tamamen ortuyor. Her yeni mobil ziyaretci icin conversion killer.
- **Cozum:** Mobilde slim bottom bar formatina gecir

### 5. Istatistikler Sisirilmis — "48+ Projects, 44+ Countries" (CRITICAL)
Portfolio verisinde 12 proje, 4 ulke var. "48+" ve "44+" sayilari dogrulanamaz. Google Quality Rater'lari tarafindan "deceptive" olarak isaretlenme riski.
- **Cozum:** Gercek rakamlara duzelt (12+ projects, 4+ countries)

---

## EN IYI 5 HIZLI KAZANIM

### 1. Supabase'i Lazy Load Et (1 saat is)
`AuthProvider`'i sadece auth route'lari icin yukle. Kritik path'ten 41KB compressed, 166KB uncompressed JS cikar.

### 2. Hero H1'den Animasyonu Kaldir (30 dakika)
LCP elemani olan H1'i `opacity: 0` ile baslama, dogrudan render et. LCP'yi 0.5-1s iyilestir.

### 3. Font Weight'leri Azalt (15 dakika)
9 weight → 3-4 weight. Space Grotesk 600,700 + JetBrains Mono 400 yeterli. ~200KB font indirme tasarrufu.

### 4. Image Alt Text'leri Zenginlestir (30 dakika)
"CAKIR FACADES" → "Cakir Facades facade renovation company website designed by DMC Kreatif". 7 portfolio gorseli icin.

### 5. Root Domain Redirect Ekle (15 dakika)
`/` → `/en` yonlendirmesi .htaccess'e ekle. Duplicate content onle.

---

## DETAYLI KATEGORI RAPORLARI

### A. TECHNICAL SEO — 62/100

| Alt Kategori | Skor | Durum |
|-------------|------|-------|
| Crawlability | 82 | PASS |
| Indexability | 35 | FAIL |
| Security | 78 | PASS (bosluklar var) |
| URL Structure | 88 | PASS |
| Mobile | 85 | PASS |
| Core Web Vitals (kaynak analizi) | 55 | NEEDS IMPROVEMENT |
| JavaScript Rendering | 40 | FAIL |
| Structured Data | 75 | PASS |

**Kritik Sorunlar:**
- Tum sayfalar ayni static HTML donderiyor (canonical, lang, title hatali)
- CSR mimari nedeniyle JS rendering 2-fazli (crawl → render gecikmesi)
- HSTS header eksik
- Sosyal medya paylasimlarinda her zaman EN metadata gozukuyor

### B. CONTENT / E-E-A-T — 62/100

| Alt Kategori | Skor |
|-------------|------|
| Experience | 52 |
| Expertise | 58 |
| Authoritativeness | 45 |
| Trustworthiness | 68 |

**Kritik Sorunlar:**
- Blog post'lar 150-250 kelime, tek paragraf (CRITICAL)
- "48+ Projects, 44+ Countries" dogrulanamaz istatistikler
- Yazar biyografisi/profili blog post'larda yok
- Tek sosyal medya profili (LinkedIn) — Clutch, Trustpilot, Google Business Profile yok
- Services ve About sayfalari icerik olarak yetersiz
- NL/DE cevirilerin tamami EN'ye fallback yapiyorsa duplicate content riski

### C. SCHEMA / STRUCTURED DATA — 68/100

| Alt Kategori | Skor |
|-------------|------|
| Schema Detection & Coverage | 17/25 |
| Validation | 18/25 |
| Rich Results Eligibility | 10/20 |
| Entity Consistency | 8/15 |
| Dead Code & Hygiene | 15/15 |

**Kritik Sorunlar:**
- Homepage'de 3x Organization entity (static + dynamic + publisher) — duplicate
- BreadcrumbList son item'da `null` hatasi
- CityServicePage'de gecersiz `serviceType` property kullaniliyor
- PortfolioPage, BlogPage listing, ContactPage schema'lari tanimli ama KULLANILMIYOR
- FAQPage rich result Agustos 2023'te kisitlandi, HowTo Eylul 2023'te kaldirildi
- AggregateRating 6 review iddia ediyor ama review verisi gecilmiyor

**Calisan Rich Results:**
- BreadcrumbList — tum sayfalarda
- BlogPosting — blog yazilari

### D. SITEMAP — 80/100

| Alt Kategori | Skor |
|-------------|------|
| XML Format | 100 |
| URL Coverage | 72 |
| Hreflang | 78 |
| Lastmod Accuracy | 55 |
| robots.txt Integration | 100 |
| Quality Gates | 95 |

**Sorunlar:**
- Template detail sayfalari sitemap'te yok (CRITICAL)
- Blog post'larda hreflang yok (HIGH)
- 62/85 URL'de ayni lastmod tarihi — bulk-stamped (MEDIUM)

### E. PERFORMANCE (CWV) — 60/100

| Metrik | Tahmini (Mobil) | Hedef | Durum |
|--------|----------------|-------|-------|
| TTFB | 264ms | < 800ms | PASS |
| FCP | 2.0-3.0s | < 1.8s | FAIL |
| LCP | 3.0-4.5s | < 2.5s | FAIL |
| INP | 100-250ms | < 200ms | AT RISK |
| CLS | 0.05-0.15 | < 0.1 | AT RISK |
| TBT | 400-800ms | < 200ms | FAIL |

**JS Bundle Dagitimi (Kritik Path):**
| Chunk | Compressed | Uncompressed | Gerekli mi? |
|-------|-----------|-------------|-------------|
| index.js | 125KB | 403KB | Evet |
| vendor.js | 54KB | 173KB | Evet |
| supabase.js | 41KB | 166KB | HAYIR (lazy load) |
| motion.js | 35KB | 112KB | KISMI (sadece hero) |
| i18n.js | 15KB | 47KB | KISMI (tek dil yukle) |
| ui.js | 12KB | 38KB | Evet |
| **TOPLAM** | **282KB** | **939KB** | |

### F. VISUAL / MOBILE — 78/100

| Alt Kategori | Skor |
|-------------|------|
| Mobile Rendering | 72 |
| Above-the-Fold | 70 |
| Page Structure & SEO | 88 |
| Image Alt Texts | 75 |
| CWV Visual Indicators | 80 |
| Language Switcher | 90 |
| CTA Visibility | 82 |
| Font Loading | 85 |

**Kritik Sorunlar:**
- Cookie banner mobilde %50 ekrani kapliyor (CRITICAL)
- Fransizca "QUI CONVERTISSENT" 375px'te tasiyor
- Duplicate hreflang tag'ler (2x render ediliyor)
- Duplicate JSON-LD schema'lar
- Portfolio image alt text'leri sadece marka adi (SEO/accessibility zayif)

**Screenshot'lar:** `screenshots/` klasorunde 16 gorsel (4 viewport x 2 dil x 2 mod)

---

## ONCELIKLI AKSIYON PLANI

### P0 — KRITIK (Hemen yap)

| # | Aksiyon | Etki | Efor |
|---|---------|------|------|
| 1 | **Pre-rendering ekle** (vite-plugin-prerender veya build script) — doğru canonical, lang, title her sayfa icin | Indexability 35→85 | 1-2 gun |
| 2 | **Blog post'lari genislet** — 1,500+ kelime, H2/H3, listeler, proje referanslari | Content 40→75 | 2-3 hafta |
| 3 | **Cookie banner mobil'de kucult** — slim bar, CTA'lari ortmesin | Conversion +30-50% | 2 saat |
| 4 | **Istatistikleri duzelt** — gercek rakamlari yansitsin | Trust/E-E-A-T | 30 dk |
| 5 | **Supabase lazy load** — AuthProvider'i sadece auth route'lara tasi | -41KB critical JS | 1 saat |
| 6 | **H1 animasyonunu kaldir** — LCP elemani hemen render olsun | LCP -0.5-1s | 30 dk |

### P1 — YUKSEK (Bu hafta)

| # | Aksiyon | Etki |
|---|---------|------|
| 7 | Root `/` → `/en` 301 redirect ekle | Duplicate content onle |
| 8 | HSTS header ekle (.htaccess) | Security +10 |
| 9 | Organization schema'larini birlestir (@graph pattern) | Schema duplicate cikar |
| 10 | Image alt text'leri zenginlestir (7 portfolio gorseli) | SEO/Accessibility |
| 11 | Font weight'leri azalt (9→3-4) | -200KB font, CLS iyilestir |
| 12 | Template detail sayfalari sitemap'e ekle | Crawl discovery |
| 13 | Blog post'lara hreflang ekle (en-self + x-default) | Dil hedefleme |
| 14 | BreadcrumbList null item duzelt | Schema validation |
| 15 | Review verisi ProfessionalService'e gec | AggregateRating rich result |

### P2 — ORTA (Bu ay)

| # | Aksiyon |
|---|---------|
| 16 | Below-fold homepage section'lari lazy load et |
| 17 | i18n chunk'i dil bazli split et (4 dil → 1 aktif dil) |
| 18 | PortfolioPage'e CollectionPage schema ekle |
| 19 | ContactPage'e ContactPage schema ekle |
| 20 | AboutPage'e Person schema ekle (kurucu) |
| 21 | Portfolio image'lari optimize et (srcset + boyut kucult) |
| 22 | CityServicePage'de `serviceType` → `knowsAbout` duzelt |
| 23 | Yazar biyografisi blog post'lara ekle |
| 24 | Permissions-Policy header ekle |
| 25 | Lastmod tarihlerini gercek degerlere guncelle |

### P3 — DUSUK (Backlog)

| # | Aksiyon |
|---|---------|
| 26 | Login/Register butonlarina aria-label ekle |
| 27 | OG image'i optimize et (155KB PNG → 50-80KB) |
| 28 | Promosyon H2'leri `<p>` olarak degistir |
| 29 | Theme color uyumsuzlugunu duzelt (manifest vs HTML) |
| 30 | Privacy/Terms icin WebPage schema ekle |
| 31 | Dead schema fonksiyonlarini temizle |

---

## HEDEF SKOR PROJEKSIYONU

| Zaman | Aksiyonlar | Tahmini Skor |
|-------|-----------|-------------|
| Bugun | Istatistik duzeltme, H1 animasyon, font azaltma, alt text | 70/100 |
| 1 hafta | Pre-rendering, cookie banner, Supabase lazy, redirect, HSTS | 78/100 |
| 1 ay | Blog genisleme, schema duzeltme, image opt, section lazy load | 85/100 |
| 3 ay | Full content strategy, backlink calismasi, NL/DE icerik | 90+/100 |

---

## DOSYA REFERANSLARI

| Dosya | Ilgili Sorun |
|-------|-------------|
| `index.html` | Statik canonical, lang, title — P0 #1 |
| `src/components/seo/SeoHead.tsx` | Dinamik meta — CSR'de gecikme |
| `src/lib/seo-schemas.ts` | Schema builder'lar — duplicate, dead code |
| `src/components/home/HeroSection.tsx` | LCP — animasyon gecikme |
| `src/components/home/AgencyStats.tsx` | Sisirilmis istatistikler |
| `src/pages/BlogPostPage.tsx` | Tek `<p>` rendering |
| `src/i18n/locales/en.json` | Blog icerik — 150-250 kelime |
| `src/main.tsx` | AuthProvider — Supabase eager load |
| `src/components/layout/AppLayout.tsx` | Overlay component eager load |
| `src/components/gdpr/CookieBanner.tsx` | Mobil boyut sorunu |
| `public/sitemap.xml` | Eksik sayfalar |
| `public/robots.txt` | AI crawler'lar |
| `.htaccess` | Redirect, HSTS, cache |
