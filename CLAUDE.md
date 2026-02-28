# CLAUDE.md — dmckreatif-vite

## Proje Özeti
DMC Kreatif ajans sitesi. React + Vite + TypeScript + Tailwind CSS.
4 dil (EN/FR/NL/DE), data-driven mimari, 470+ URL, ~14s build.
Canlı URL: dmckreatif.com (Hostinger, GitHub auto-deploy)

## Tech Stack
- React 18 + Vite 5 + TypeScript (strict)
- Tailwind CSS v4 + Framer Motion 11
- react-i18next (4 locale), react-router-dom, react-helmet-async
- Supabase (auth + DB), react-hook-form + zod
- GrapesJS (template editor — EditorPage.tsx)
- Lucide React (iconlar), i18next

## Kritik Dosyalar
```
src/App.tsx                        — Tüm routing (lazy imports)
src/i18n/locales/en.json          — Ana içerik (~3500+ satır)
src/i18n/locales/{fr,nl,de}.json  — SEO meta only, content EN fallback
src/lib/seo-schemas.ts            — JSON-LD schema fonksiyonları
public/sitemap.xml                — 470+ URL, 4 locale
scripts/generate-rss.ts           — RSS feed (public/rss.xml)
```

## Data Mimarisi (Data-Driven Pattern)
Her içerik türü `src/data/{type}/` altında:
- `types.ts` — Interface tanımı
- `{category}.ts` — Data dosyaları
- `index.ts` — Barrel (tüm items[], getBySlug(), getByCategory())

### Tamamlanan Data Modülleri:
| Modül | Dosya | İçerik |
|-------|-------|--------|
| Services | `src/data/services/` | 4 kategori, 44 servis, ICON_MAP |
| Technologies | `src/data/technologies/` | frontend.ts + backend.ts, 12 tech |
| Industries | `src/data/industries/` | 8 sektör (construction→tourism) |
| Blog | `src/data/blog/` | 30 article metadata + 30 content dosyası |
| Cities | `src/data/cities/` | Şehir bazlı servis sayfaları |

### Blog Content Dosyaları:
`src/data/blog/content/en/{slug}.ts` — her makale ayrı dosya
Format: `const content = \`<h2>...</h2>\`; export default content;`
BlogPostPage: `import.meta.glob` ile lazy load (shortNames dict)

## i18n Yapısı
- `en.json`: Tam içerik (longDesc, FAQ, tüm textler)
- `fr/nl/de.json`: Sadece SEO meta (`seo.serviceDetail.{slug}.title/description` vb.)
- Content fallback: `lng: "en"` fallback, FR/NL/DE sadece meta override

### i18n Key Pattern:
```
services.{key}.title/desc/longDesc/faq{1-8}Q/A
seo.serviceDetail.{slug}.title/description   — kebab-case slug
seo.techDetail.{slug}.title/description
seo.industryDetail.{slug}.title/description
seo.blogPost.{slug}.title/description
cityPages.{slug}.name/title/description/intro/benefit1-6/cta
```

## Sayfa Yapısı (src/pages/)
38 sayfa, hepsi lazy import ile App.tsx'te route edilmiş.
Admin/dashboard sayfaları Supabase auth korumalı.
CityServicePage.tsx — `/en/web-design/{city}` pattern, cities data'dan

## Kalan Görevler (ACTION-PLAN.md)
### P0 — Kritik:
- Pre-rendering ekle (vite-plugin-prerender) — indexability fix
- Cookie banner mobil slim bar
- Supabase lazy load (sadece auth route'larında)
- H1 animasyonunu kaldır (LCP fix — HeroSection.tsx)

### P1 — Bu Hafta:
- Root redirect `.htaccess`
- HSTS header `.htaccess`
- Organization schema merge (`@graph` pattern)
- Font weight azalt (9 → 3-4 weight)
- Template detail URL'leri sitemap'e ekle
- Blog post hreflang (EN-only)
- BreadcrumbList null fix (`src/lib/seo-schemas.ts:208`)

### P2-P3 — Backlog:
ACTION-PLAN.md'de 16-31 arası maddeler

## Build & Deploy
```bash
npm run build          # ~14-16s, dist/ klasörü
npm run dev            # localhost:5173
npx tsc --noEmit      # TypeScript check
```
Build başarılıysa `✓ built in Xs` ve `✓ rss.xml generated` çıktısı.

## Gerçek Portfolio (Sitede Gösterilen)
- CAKIR Facades (cakirfacades.fr) — FR, cephe renovasyon
- Altinbas Moustiquaire (altinbasmoustiquaire.fr) — FR, sineklik
- Consulting Energy (consulting-energy.fr) — FR, enerji danışmanlık
- ISO Home Energy (ih-energy.fr) — FR, yalıtım
- Archi Construction Véranda (archi.constructionveranda.com) — BE
- Adamsons Accountants (adamsons.uk.com) — UK
- FilenesSports (filenessports.com) — E-commerce

## Geçici Dosyalar (Temizlenebilir)
`scripts/` klasöründe artık ihtiyaç olmayan:
- merge-service-content.cjs, fix-service-keys.cjs, add-i18n-meta.cjs
- add-industries.cjs, add-industry-meta.cjs
- migrate-blog-content.cjs, add-blog-seo-meta.cjs, update-blog-sitemap.cjs

---

## Token Tasarrufu Kuralları
- Dolgu cümle yazma, sadece sonuç bildir
- Tüm dosyayı gösterme, sadece değişen satırları göster
- Açıklama istenmediği sürece açıklama yapma
- Kod yorum satırı ekleme (mevcut yoksa)
- Çoklu değişiklikte kısa liste formatı kullan
- Hata yoksa "başarılı" de, sebep açıklama

## Dosya Okuma Kuralları
- Önce .claudeignore kontrol et, oradaki dosyaları okuma
- Büyük dosyaları (500+ satır) tamamen okuma, offset/limit kullan
- node_modules, dist, build, .next klasörlerine GİRME
- package-lock.json, yarn.lock OKUMA
- Görsel dosyaları (.png, .jpg, .svg) OKUMA (path yeterli)
- en.json büyük dosya — sadece ilgili section'ı oku

## Sub-Agent Model Kuralları
- Glob/Grep aramaları → model: "haiku"
- Tek dosya okuma + küçük analiz → model: "haiku"
- Kod yazma/düzenleme → model: "sonnet"
- Karmaşık mimari karar → model: "opus"
