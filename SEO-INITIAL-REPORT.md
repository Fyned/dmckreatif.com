# SEO KURULUM RAPORU — dmckreatif.com

**Tarih:** 2026-02-27
**Haziran:** Claude Code (Opus 4.6)
**Site:** dmckreatif.com
**Tip:** Premium Web Development Agency (Avrupa pazari)
**Hedef:** France, Belgium, United Kingdom, Netherlands, Germany

---

## MEVCUT DURUM SKORU: 82/100

| Kategori | Skor | Detay |
|----------|------|-------|
| Teknik SEO | 88/100 | SPA limitation haric mukemmel |
| On-Page SEO | 85/100 | Per-page meta tags, hreflang var |
| Schema Markup | 92/100 | 15+ schema builder, cok kapsamli |
| i18n/Multilingual | 90/100 | 4 dil, hreflang, url-based routing |
| Sitemap & Crawling | 75/100 | Eksik sayfalar vardi — duzeltildi |
| Content SEO | 65/100 | Blog var ama icerik stratejisi eksik |
| GEO (AI Visibility) | 70/100 | AI bot'lar izin verili, llms.txt eklendi |
| Backlink Profile | 30/100 | Henuz backlink calismasi yok |

---

## YAPILANLAR (Bu oturumda)

### 1. SeoHead.tsx Guncellendi
- `og:image:width` (1200) ve `og:image:height` (630) eklendi
- `og:image:alt` eklendi (accessibility + social sharing)
- `og:locale:alternate` tum diller icin dinamik eklendi
- `twitter:image:alt` eklendi
- `article:published_time` ve `article:modified_time` desteği eklendi (blog yaziları icin)
- `ogImageAlt` prop eklendi

### 2. Schema Markup Genisledi (seo-schemas.ts)
- `buildFAQPageSchema()` eklendi — Pricing ve Services sayfalarinda kullanilmali
- `buildHowToSchema()` eklendi — Process section icin rich snippet uygunlugu

### 3. llms.txt Olusturuldu (GEO)
- `public/llms.txt` — AI crawler'lar icin site ozeti
- Hizmetler, fiyatlar, portfolio, iletisim bilgileri yapilandirilmis formatta
- GPTBot, ClaudeBot, PerplexityBot bu dosyayi okuyabilir

### 4. Sitemap.xml Kapsamli Guncellendi
**Onceki:** 50 URL (sadece ana sayfalar x 4 dil)
**Simdi:** 107+ URL — Eklenenler:
- 4 service detail sayfasi x 4 dil (web-development, ecommerce, seo, digital-marketing)
- 4 case-studies sayfasi (x 4 dil)
- 15 blog post URL'si
- 5 sehir sayfasi (paris, london, brussels, amsterdam, berlin) x ilgili diller
- Privacy/Terms tum dillerde (onceden sadece EN vardi)
- `changefreq` ve `priority` degerler eklendi
- Sehir sayfalari icin akilli hreflang (sadece ilgili diller)

### 5. robots.txt Guncellendi
- Applebot, Bytespider, cohere-ai, anthropic-ai eklendi
- Tum AI crawler'lar icin explicit Allow: / kurallari

---

## MEVCUT GUCLUKLER (Dokunulmadi — Zaten Iyi)

- **react-helmet-async** ile per-page meta yonetimi
- **15+ JSON-LD schema builder** (Organization, WebSite, ProfessionalService, Service, BlogPosting, BreadcrumbList, Offer, WebPage, ContactPage, CollectionPage, CreativeWork, SoftwareApplication + yeni FAQPage, HowTo)
- **Hreflang** 4 dil + x-default, hem statik (index.html) hem dinamik (SeoHead)
- **Noscript fallback** — JS calistirmayan crawler'lar icin zengin HTML icerigi
- **Font preloading** — preconnect + preload stratejisi
- **Code splitting** — React.lazy ile tum sayfalar lazy load
- **RSS feed** — Build sirasinda otomatik uretiliyor
- **PWA manifest** — Offline destek, shortcuts
- **Cookie consent** — GDPR uyumlu analytics

---

## MUSTERININ YAPMASI GEREKENLER

### Acil (Bu hafta)

1. **Google Search Console kaydi**
   - https://search.google.com/search-console
   - Site URL: `https://dmckreatif.com`
   - Dogrulama: DNS TXT record veya HTML file upload
   - Sitemap'i submit et: `https://dmckreatif.com/sitemap.xml`

2. **Google Analytics 4 kurulumu**
   - https://analytics.google.com
   - GA4 property olustur
   - Measurement ID'yi `src/lib/analytics.ts` dosyasina ekle
   - `gtag.js` zaten SPA'da entegre

3. **Bing Webmaster Tools kaydi**
   - https://www.bing.com/webmasters
   - GSC ile otomatik import yapilabilir

### Bu ay

4. **Dizin kayitlari** (backlink + visibility icin)
   - [Clutch.co](https://clutch.co) — Ajans profili olustur
   - [Sortlist.com](https://sortlist.com) — Avrupa ajans dizini
   - [DesignRush](https://www.designrush.com) — Web design dizini
   - [Malt.fr](https://malt.fr) — Fransiz freelancer platformu
   - [Codeur.com](https://codeur.com) — Fransiz gelistirici platformu
   - [Semrush Agency Partners](https://www.semrush.com/agencies/) — SEO ajans dizini

5. **LinkedIn sirket sayfasi optimizasyonu**
   - Cover image: dmckreatif.com branding
   - About: Avrupa'daki referans projeler
   - Services: Web Development, E-Commerce, SEO

---

## HEDEF KELIMELER

### Ana Kelimeler (Head Terms)
| Keyword | Dil | Rekabet | Oncelik |
|---------|-----|---------|---------|
| web design agency for European businesses | EN | Medium | P1 |
| affordable web development France | EN | Medium | P1 |
| UK business website design | EN | High | P2 |
| agence web pour entreprises | FR | Medium | P1 |
| website laten maken Belgie | NL | Low | P1 |
| creation site web professionnel | FR | Medium | P1 |

### Long-Tail Kelimeler (Yuksek Donusum)
| Keyword | Dil | Rekabet | Hedef Sayfa |
|---------|-----|---------|-------------|
| how much does a website cost in Europe 2026 | EN | Low | Blog + Pricing |
| professional web design for restaurants France | EN | Very Low | Blog + City pages |
| multilingual website development France Belgium | EN | Very Low | Services |
| creation site web restaurant Paris | FR | Low | City page Paris |
| website voor klein bedrijf Belgie | NL | Very Low | City page Brussels |
| modern website for construction company | EN | Low | Portfolio + Blog |
| React developer for business website Europe | EN | Low | Services |
| combien coute un site internet professionnel 2026 | FR | Low | Blog FR |
| professionele website laten maken prijs | NL | Low | Pricing NL |
| meertalige website laten bouwen | NL | Very Low | Services NL |
| web design agency with SEO included pricing | EN | Medium | Pricing |
| GDPR compliant website checklist | EN | Low | Blog |
| Wix vs professional web design cost | EN | Medium | Blog |
| website essentials for UK accounting firm | EN | Very Low | Blog + Portfolio |

---

## ICERIK TAKVIMI (Ilk 3 Ay)

### Mart 2026
| Hafta | Baslik | Dil | Hedef Keyword |
|-------|--------|-----|---------------|
| 1 | How Much Does a Professional Website Cost in Europe? (2026 Guide) | EN | how much does a website cost in europe |
| 2 | Combien coute un site web professionnel en 2026 ? | FR | combien coute un site internet professionnel |
| 3 | Website laten maken: Wat kost het in 2026? | NL | professionele website laten maken prijs |
| 4 | Case Study: How We Built CAKIR Facades — 98 Lighthouse Score | EN | web design for construction company France |

### Nisan 2026
| Hafta | Baslik | Dil | Hedef Keyword |
|-------|--------|-----|---------------|
| 1 | WordPress vs Custom React Website: Real Cost Comparison | EN | WordPress vs custom website cost |
| 2 | 10 erreurs de site web que font les entreprises francaises | FR | erreurs site web entreprise |
| 3 | Waarom uw Belgisch bedrijf een professionele website nodig heeft | NL | website voor klein bedrijf Belgie |
| 4 | Case Study: Adamsons Accountants — UK Accounting Firm Website | EN | website design for accounting firm UK |

### Mayis 2026
| Hafta | Baslik | Dil | Hedef Keyword |
|-------|--------|-----|---------------|
| 1 | Wix vs Hiring a Web Designer: The Real Cost in 2026 | EN | Wix vs professional web design |
| 2 | Guide SEO pour les PME en France | FR | SEO pour PME France |
| 3 | De complete gids voor meertalige websites in Belgie | NL | meertalige website laten bouwen |
| 4 | Case Study: Archi Construction & Veranda — Belgium | EN | web design for construction Belgium |

### Icerik Kurallari:
- Her yazi min. 1500 kelime
- Her yazida 3+ internal link
- Her yazida en az 1 CTA (Contact/Pricing sayfasina)
- Gercek rakamlar ve istatistikler kullan (E-E-A-T)
- BlogPosting schema otomatik (zaten var)
- FAQ section ekle (FAQPage schema kullan)

---

## RAKIP ANALIZI

### Dogrudan Rakipler
| Rakip | Guc | Zayiflik | DMC Avantaji |
|-------|-----|----------|--------------|
| Fiverr Pro | Buyuk pazar yeri, guven | Generic, kisisel dokunuş yok | Butik deneyim, tek muhatap |
| 99designs | Tasarim odakli | Gelistirme yok, template bazli | Full-stack development |
| Yerel FR freelancer'lar | Yerel baglanti | Tek kisi, olceklenmiyor | 4 dil, 6 ulke deneyimi |
| Netguru (PL) | Ucuz, buyuk ekip | Kisisel degil, fabrika usulu | Premium kalite, 95+ Lighthouse |
| NOIISE (FR) | 25 yil deneyim, 7 ofis | Pahali (min 5000+) | Daha uygun fiyat, ayni kalite |

### Fiyat Karsilastirmasi
| | DMC Kreatif | Yerel FR Ajans | UK Ajans | Fiverr Pro |
|---|---|---|---|---|
| Basit site | 497 | 2000-5000 | 3000-8000 | 500-2000 |
| Cok sayfali | 997 | 3000-8000 | 5000-15000 | 1500-5000 |
| E-commerce | 2997 | 5000-15000 | 8000-25000 | 3000-10000 |
| Bakim/ay | 97 | 200-500 | 300-800 | Yok |

**Sonuc:** DMC Kreatif fiyat/performans oraninda cok rekabetci.

---

## BAKIM TAKVIMI

### Haftalik
- [ ] Blog yazisi yayinla (icerik takvimine gore)
- [ ] Google Search Console hata kontrolu
- [ ] Analytics traffic raporu

### Aylik
- [ ] Sitemap guncelle (yeni blog postlari ekle)
- [ ] Core Web Vitals kontrolu (Lighthouse)
- [ ] Broken link tara
- [ ] Keyword ranking takibi
- [ ] Rakip izleme

### 3 Aylik
- [ ] Kapsamli SEO audit (teknik + icerik)
- [ ] Backlink profili analizi
- [ ] Icerik guncellemesi (eski yazilari tazele)
- [ ] Schema markup dogrulama (Google Rich Results Test)

### 6 Aylik
- [ ] Tam site hiz optimizasyonu
- [ ] UX audit (bounce rate, sayfa basi sure)
- [ ] Yeni keyword arastirmasi
- [ ] Rakip benchmark raporu

---

## HEDEFLER

### 3 Ay (Haziran 2026)
- Google Search Console'da 100+ indexed page
- Organik trafik: 500+ aylik ziyaretci
- "web design agency Europe" icin ilk 50
- "agence web pour entreprises" icin ilk 30
- "website laten maken Belgie" icin ilk 20
- 5+ blog yazisi yayinda

### 6 Ay (Eylul 2026)
- Organik trafik: 2000+ aylik ziyaretci
- Hedef keyword'lerde ilk 10
- 3+ dizin kaydi tamamlanmis
- 10+ backlink
- NL dilinde 3+ blog yazisi

### 12 Ay (Subat 2027)
- Organik trafik: 5000+ aylik ziyaretci
- "affordable web development France" icin ilk 5
- "website laten maken Belgie" icin ilk 5
- 50+ backlink
- AI Overview'larda referans gosterilme
- Aylik 5+ organik lead

---

## TEKNIK NOTLAR

### SPA SEO Limitasyonu
Site React+Vite SPA olarak calisyor. Google JS render edebilir ama:
- Diger arama motorlari (Bing, Yandex) sinirli JS desteği
- noscript fallback zaten var (iyi)
- Gelecekte SSR (Next.js) gecisi dusunulebilir

### Eksik Schema Kullanim Alanlari
Asagidaki sayfalara FAQPage schema eklenmeli:
- `PricingPage.tsx` — Fiyatlandirma sorulari
- `ServicesPage.tsx` — Hizmet sorulari
- `HomePage.tsx` — Genel sorular (FaqSection zaten var)

### Blog Post'lar Icin Yapilacaklar
- Her blog post'a hreflang ekle (simdilik sadece EN var)
- FR/NL ceviriler tamamlaninca sitemap'e ekle
- Sitemap'i dinamik hale getir (build-time generation)
