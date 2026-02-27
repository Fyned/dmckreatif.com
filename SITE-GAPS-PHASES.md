# DMC Kreatif — Site Eksikleri & Geliştirme Fazları

> **Tarih:** 2026-02-27
> **Analiz:** Mevcut site vs. premium ajans standartları (2025-2026)
> **Kapsam:** 43 sayfa, 131 bileşen, 4 dil, Supabase backend

---

## MEVCUT DURUM — NEYE SAHİBİZ

### Güçlü Yanlar
- 43 sayfa (18 public + 4 auth + 7 dashboard + 11 admin + 3 special)
- 4 dil desteği (EN, FR, NL, DE) — i18n altyapısı sağlam
- SEO altyapısı: 12+ schema tipi, hreflang, sitemap, robots.txt
- Supabase backend: auth, storage, 10 tablo
- Admin paneli (11 route) + Client dashboard (7 route)
- Template marketplace + GrapesJS editör
- PWA desteği (service worker, manifest)
- Framer Motion animasyonlar
- Marketing: campaign popup, exit-intent, social proof notification
- WhatsApp floating buton
- Cookie consent banner

### Zayıf Yanlar
- Blog "coming soon" — hiç içerik yok
- Case study'ler derinliksiz — ölçülebilir sonuç yok
- Legal sayfalar eksik (Impressum, Cookie Policy, Refund Policy)
- Accessibility (WCAG/EAA) uyumsuz — Haziran 2025'ten beri zorunlu
- Booking/takvim entegrasyonu yok
- Email marketing entegrasyonu yok
- Review/testimonial platformu entegrasyonu yok (Google Reviews, Trustpilot)
- Analytics yetersiz — GA4 consent mode düzgün yapılandırılmamış
- Ödeme sistemi bağlı değil (Stripe keys admin'de ama checkout yok)
- Görsel optimizasyonu eksik (WebP/AVIF, srcset, lazy loading tutarsız)
- prefers-reduced-motion desteği yok
- Skip-to-content link yok
- Keyboard navigation eksikleri olabilir

---

## FAZ 1 — YASAL UYUMLULUK & KRİTİK EKSİKLER (Acil)
> **Öncelik:** EN YÜKSEK — Avrupa'da yasal ceza riski
> **Süre:** 2-3 gün
> **Etki:** Yasal koruma + profesyonel güvenilirlik

### 1.1 Impressum / Legal Notice Sayfası
- [ ] `/legal` veya `/impressum` route oluştur
- [ ] Ülkeye göre yasal bilgiler: şirket adı, adres, VAT ID, kayıt numarası
- [ ] Fransa: Mentions Légales (SIRET, hosting provider, editorial director)
- [ ] Almanya: Impressum (Handelsregister, USt-IdNr)
- [ ] Belçika: KBO/BCE numarası
- [ ] UK: Companies House number
- [ ] 4 dilde çeviri
- [ ] Footer'a link ekle

### 1.2 Cookie Policy Sayfası
- [ ] `/cookie-policy` route oluştur
- [ ] Kullanılan cookie'lerin detaylı listesi (isim, süre, amaç, provider)
- [ ] Kategori bazlı açıklama: Zorunlu, Analitik, Pazarlama, Tercihler
- [ ] 4 dilde çeviri
- [ ] Footer'a link ekle

### 1.3 Cookie Consent Güncelleme
- [ ] Mevcut CookieBanner'ı GDPR-uyumlu yap
- [ ] Accept ve Reject butonları EŞİT belirginlikte (CNIL zorunluluğu)
- [ ] Granüler kategori seçimi (zorunlu, analitik, pazarlama)
- [ ] Consent kaydını saklama (Supabase'de veya localStorage'da)
- [ ] Consent'i geri çekme kolaylığı (ayarlar linki footer'da)
- [ ] GTM'yi consent mode v2 ile entegre et

### 1.4 Refund / Cancellation Policy
- [ ] `/refund-policy` route oluştur
- [ ] AB 14 gün forfeiture hakkı (dijital ürünler için istisna koşulları)
- [ ] Template satışları için iade koşulları
- [ ] Custom projeler için iptal koşulları
- [ ] 4 dilde çeviri

### 1.5 Mevcut Privacy & Terms Güncelleme
- [ ] Privacy Policy'ye Supabase veri işleme detayları ekle
- [ ] Data retention süreleri belirt
- [ ] Sub-processor listesi (Supabase, Google Analytics, vb.)
- [ ] Terms of Service'e liability sınırları ekle

---

## FAZ 2 — ERİŞİLEBİLİRLİK (WCAG 2.1 AA / EAA) (Acil)
> **Öncelik:** YÜKSEK — Haziran 2025'ten beri AB'de zorunlu, 100.000€'ya kadar ceza
> **Süre:** 3-4 gün
> **Etki:** Yasal uyumluluk + daha geniş kullanıcı kitlesi

### 2.1 Temel Erişilebilirlik
- [ ] Skip-to-content link ekle (her sayfanın başında)
- [ ] `lang` attribute tüm sayfalarda doğru dil kodunu göstersin
- [ ] Tüm resimlere anlamlı `alt` text ekle (boş alt text'ler sadece dekoratif görsellerde)
- [ ] Tüm form input'larına `label` veya `aria-label` ekle
- [ ] Focus indicator'ları görünür yap (outline: 2px solid, tüm interaktif elementlerde)
- [ ] Renk kontrast oranlarını kontrol et: normal text 4.5:1, büyük text 3:1

### 2.2 Keyboard Navigation
- [ ] Tab sırası mantıklı mı kontrol et (tüm sayfalar)
- [ ] Keyboard trap yok mu kontrol et (modal'lar, popup'lar, dropdown'lar)
- [ ] Escape ile modal/popup kapatma çalışıyor mu
- [ ] Enter/Space ile butonlar çalışıyor mu
- [ ] Arrow keys ile dropdown/accordion navigasyonu

### 2.3 Reduced Motion
- [ ] `prefers-reduced-motion` media query ekle
- [ ] Framer Motion animasyonlarını disable edecek global config
- [ ] CSS transition'ları disable etme
- [ ] Auto-scrolling marquee'yi durdurma

### 2.4 Semantic HTML
- [ ] `<main>` landmark her sayfada var mı
- [ ] `<nav>` landmark header'da var mı
- [ ] `<footer>` landmark var mı
- [ ] `aria-live` region'ları dinamik içerik için (form hataları, bildirimler)
- [ ] Heading hiyerarşisi: H1 > H2 > H3 atlama yok mu

### 2.5 ARIA & Screen Reader
- [ ] Hamburger menü: `aria-expanded`, `aria-label` ekle
- [ ] Modal/popup'lar: `role="dialog"`, `aria-modal="true"`
- [ ] Accordion/FAQ: `aria-expanded`, `aria-controls`
- [ ] Tab panel'ler: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- [ ] Loading state'ler: `aria-busy="true"`
- [ ] Dekoratif ikonlar: `aria-hidden="true"`

### 2.6 Touch Target
- [ ] Tüm buton/link'ler minimum 44x44px
- [ ] Mobilde butonlar arası minimum 8px boşluk

---

## FAZ 3 — İÇERİK DERİNLEŞTİRME & E-E-A-T (Yüksek)
> **Öncelik:** YÜKSEK — Google sıralaması ve güvenilirlik
> **Süre:** 5-7 gün
> **Etki:** SEO sıralaması + müşteri güveni + AI citation

### 3.1 Blog Sistemi Aktifleştirme
- [ ] Minimum 4 pillar article yaz (her biri 1500-3000 kelime):
  - "How Much Does a Website Cost in Europe in 2026?"
  - "React vs WordPress: Which Is Better for European SMBs?"
  - "SEO Guide for Small Businesses in France"
  - "Why Your Business Needs a Multi-Language Website"
- [ ] Author bio bileşeni: fotoğraf, isim, rol, kısa bio, LinkedIn linki
- [ ] Article schema markup (BlogPosting, author, datePublished, dateModified)
- [ ] Table of Contents bileşeni (2000+ kelime makaleler için)
- [ ] "Last updated" tarihi göster
- [ ] İç linkler: her makaleden minimum 3 sayfa linkle
- [ ] Dış linkler: 2-3 otoriter kaynak per makale
- [ ] 4 dilde makale çevirisi (en azından FR + EN başlangıç)
- [ ] Blog RSS feed (zaten mevcut, içerikle doldur)

### 3.2 Case Study Derinleştirme
- [ ] Her portföy projesine detaylı case study yaz:
  - Problem / Challenge (müşterinin sorunu)
  - Solution (ne yaptık, neden bu teknoloji)
  - Process (timeline, milestones)
  - Results (ölçülebilir: %traffic artışı, Lighthouse skoru, load time)
  - Client testimonial (gerçek isim + şirket)
- [ ] Before/After screenshot'ları ekle (BeforeAfterSlider zaten var)
- [ ] Device mockup görselleri (desktop + tablet + mobile)
- [ ] Her case study için ayrı sayfa (CaseStudyDetailPage)
- [ ] Filtreleme: sektör, ülke, hizmet türü

### 3.3 About Page Güçlendirme
- [ ] Kurucu bio'yu daha da genişlet: eğitim, deneyim yılı, sertifikalar
- [ ] Team üyeleri (varsa GMG Design partner bilgisi)
- [ ] Ajans değerleri (value proposition section)
- [ ] Timeline: ajansın kuruluş ve büyüme hikayesi
- [ ] Teknoloji stack görseli (kullanılan araçlar ve neden)

### 3.4 Services Page Detaylandırma
- [x] Hizmet açıklamaları derinleştirildi (150-250 kelime, 4 dil) ✓
- [ ] Her hizmete "ideal for" section ekle (hangi müşteriler için uygun)
- [ ] Hizmet bazlı case study linkleri
- [ ] İlgili FAQ'ları hizmet bazlı grupla
- [ ] "Our tech stack" bölümü: ikon + açıklama

---

## FAZ 4 — LEAD GENERASYonu & DÖNÜŞÜM OPTİMİZASYONU (Yüksek)
> **Öncelik:** YÜKSEK — Gelir doğrudan etkiler
> **Süre:** 3-5 gün
> **Etki:** Ziyaretçi → müşteri dönüşüm oranı

### 4.1 Booking / Takvim Entegrasyonu
- [ ] Cal.com veya Calendly entegrasyonu
- [ ] "Book a Free 15-Min Call" butonu — header, hero, contact page, pricing page
- [ ] 2 slot tipi: "Quick Chat (15 min)" + "Discovery Call (30 min)"
- [ ] Google Calendar sync
- [ ] Otomatik onay + hatırlatma email'i
- [ ] Zaman dilimi otomatik algılama (uluslararası müşteriler için)

### 4.2 Lead Magnet
- [ ] "Free Website Audit Checklist" PDF oluştur
- [ ] Download CTA: blog yazılarının sonunda, sidebar'da, popup'ta
- [ ] Email toplama: isim + email + şirket (Supabase'e kaydet)
- [ ] Otomatik PDF gönderim (email veya anında indirme)

### 4.3 Contact Form İyileştirme
- [ ] Form alanlarını azalt: ilk adımda sadece ad, email, hizmet türü, mesaj
- [ ] Multi-step form: basit → detaylı (progressive disclosure)
- [ ] "Response time: Within 4 hours" promise göster
- [ ] Form submit sonrası: teşekkür mesajı + sonraki adım bilgisi
- [ ] Real-time form validation (her alan doldurulurken)

### 4.4 CTA Optimizasyonu
- [ ] Sticky mobile CTA: sayfa scroll edildiğinde altta sabit buton
- [ ] Her section sonunda contextual CTA (not generic)
- [ ] Pricing page'de her tier'ın kendi CTA'sı (zaten var, kontrol et)
- [ ] Blog yazılarında inline CTA'lar
- [ ] Homepage hero'da tek, net CTA: "Book a Free Call" veya "Get a Free Quote"

### 4.5 Social Proof Güçlendirme
- [ ] Client logo bar: homepage hero'nun hemen altında
- [ ] "Trusted by 30+ European businesses" badge
- [ ] Google Reviews widget entegrasyonu (veya Trustpilot)
- [ ] Testimonial'lara gerçek fotoğraf, şirket adı, ülke ekle
- [ ] Video testimonial section (varsa müşteri videosu)
- [ ] Clutch.co profili oluştur ve badge ekle

---

## FAZ 5 — PERFORMANS & GÖRSEL OPTİMİZASYON (Orta)
> **Öncelik:** ORTA — Lighthouse skorunu 95+'da tut
> **Süre:** 2-3 gün
> **Etki:** Sayfa hızı + UX + SEO sıralaması

### 5.1 Görsel Optimizasyon
- [x] Tüm görseller zaten WebP formatında ✓
- [ ] Responsive `srcset` + `sizes` attribute (gelecekte multi-resolution eklenebilir)
- [x] Lazy loading: `loading="lazy"` tüm fold-altı görsellerde ✓
- [x] Hero'da görsel yok (text-based) — fetchpriority N/A ✓
- [x] `width/height` + `aspect-ratio` + `decoding="async"` tüm img tag'larına eklendi ✓
- [ ] OG image: her sayfaya unique OG image (şu an default kullanılıyor)

### 5.2 Font Optimizasyonu
- [x] Font weight azaltıldı: Space Grotesk 5→4 (500 kaldırıldı), JetBrains Mono 4→2 (500,600 kaldırıldı) ✓
- [x] `font-display: swap` zaten var ✓
- [x] Preload critical font stylesheet (`<link rel="preload">`) ✓
- [x] DNS prefetch Google Fonts için eklendi ✓
- [x] Font dosya sayısı minimize: 6 variant (4+2) ✓

### 5.3 Bundle Optimizasyonu
- [x] GrapesJS ayrı chunk'a alındı (1,122KB → sadece /editor route'unda yükleniyor) ✓
- [x] EditorPage chunk: 1,218KB → 96KB (GrapesJS ayrılınca) ✓
- [x] index chunk: 506KB → 192KB (-62%) — locale lazy loading ile ✓
- [x] FR/NL/DE locale'leri dynamic import → ayrı chunk'lar ✓
- [x] react-hook-form + zod ayrı "forms" chunk'a alındı ✓
- [x] Supabase zaten ayrı chunk'ta ✓

### 5.4 Core Web Vitals
- [x] CLS: tüm img'lere width/height eklendi, aspect-ratio tanımlı ✓
- [x] LCP: text-rendering optimizeSpeed, background-attachment fixed kaldırıldı ✓
- [x] INP: gereksiz font weight'ler kaldırıldı, bundle boyutu düşürüldü ✓
- [ ] CDN kullanımı kontrol et (Hostinger CDN veya Cloudflare)

---

## FAZ 6 — ANALİTİK & İZLEME (Orta)
> **Öncelik:** ORTA — Veri olmadan karar alınamaz
> **Süre:** 1-2 gün
> **Etki:** Data-driven kararlar

### 6.1 GA4 GDPR Uyumlu Kurulum
- [x] Consent Mode v2 entegrasyonu — default denied, update on consent ✓
- [x] ad_user_data + ad_personalization consent signals eklendi (v2 zorunlu) ✓
- [x] IP anonymization kontrol et (GA4'te otomatik) ✓
- [ ] Google Signals EU kullanıcıları için disable (GA4 admin panelinden)
- [ ] Data retention minimum süreye ayarla (GA4 admin panelinden)
- [ ] Server-side tagging değerlendir (gelecek)

### 6.2 Privacy-First Alternatif
- [ ] Plausible veya Fathom Analytics değerlendir (cookieless, EU-hosted)
- [ ] Consent gerektirmeden temel metrikler toplama
- [ ] < 1KB script boyutu avantajı

### 6.3 Event Tracking
- [x] Page view tracking — useAnalytics hook ile tüm public sayfalarda aktif ✓
- [x] Scroll depth tracking — 25/50/75/90% thresholds, useAnalytics ile otomatik ✓
- [x] CTA click tracking — Contact page booking CTA ✓
- [x] Form submission tracking — ContactPage form submit ✓
- [x] Language switch tracking — LocaleRouter'da otomatik ✓
- [x] Newsletter signup tracking — ExitIntentPopup'ta aktif ✓
- [x] Template order funnel tracking (zaten aktifti: add_to_cart, begin_checkout, conversion) ✓

### 6.4 Heatmap & Session Recording
- [x] Microsoft Clarity entegrasyonu — VITE_CLARITY_ID ile, consent'e bağlı ✓
- [x] Consent banner'da "Analytics" kategorisine bağlı ✓

---

## FAZ 7 — EMAIL MARKETING & OTOMASYON (Orta)
> **Öncelik:** ORTA — Recurring müşteri ilişkisi
> **Süre:** 2-3 gün
> **Etki:** Lead nurturing + repeat business

### 7.1 Email Platform Entegrasyonu
- [ ] Brevo (Sendinblue) veya MailerLite kurulumu (EU-hosted, GDPR native)
- [ ] API key Supabase Edge Function üzerinden (frontend'e koyma)
- [ ] Newsletter signup form footer'da (zaten var, backend'e bağla)
- [ ] Double opt-in flow (AB zorunluluğu)

### 7.2 Email Sequences
- [ ] Welcome sequence (3 email, 2 hafta):
  1. Hoş geldin + "hakkımızda" bilgi
  2. En iyi case study + testimonial
  3. Free audit teklifi veya booking CTA
- [ ] Post-project follow-up (proje tesliminden 1 hafta sonra)
- [ ] Monthly newsletter template (portföy güncellemeleri, ipuçları)

### 7.3 Form → Email Entegrasyonu
- [ ] Contact form submit → otomatik e-posta bildirimi (admin'e)
- [ ] Auto-reply: "We received your message, response within 4 hours"
- [ ] Template order → onay e-postası (müşteriye)
- [ ] Invoice oluşturulunca → e-posta bildirimi (müşteriye)

---

## FAZ 8 — REVIEW & TESTIMONIAL PLATFORMLARI (Orta-Düşük)
> **Öncelik:** ORTA-DÜŞÜK — Müşteriler geldikçe büyür
> **Süre:** 1-2 gün
> **Etki:** Güvenilirlik + local SEO

### 8.1 Google Business Profile
- [ ] Google Business Profile oluştur (veya mevcut olanı doğrula)
- [ ] İş bilgilerini doldur: adres, saat, fotoğraflar, hizmetler
- [ ] Review toplama stratejisi: proje tesliminden 1 hafta sonra link gönder
- [ ] GMB widget'ı siteye embed et (veya rating badge)

### 8.2 Trustpilot / Clutch.co
- [ ] Clutch.co profili oluştur (B2B ajans platformu)
- [ ] Trustpilot business profili (isteğe bağlı)
- [ ] Badge'leri footer'a veya about page'e ekle
- [ ] İlk 5 review'u mevcut müşterilerden topla

### 8.3 Testimonial Display İyileştirme
- [ ] Mevcut testimonial'lara gerçek fotoğraf ekle
- [ ] Şirket logosu ekle
- [ ] Ülke bayrağı ekle
- [ ] Spesifik sonuçlar: "147% daha fazla lead" gibi rakamlar
- [ ] Schema: AggregateRating wiring'i güçlendir

---

## FAZ 9 — İLERİ SEVİYE ÖZELLİKLER (Düşük / Gelecek)
> **Öncelik:** DÜŞÜK — Müşteri tabanı büyüdükçe
> **Süre:** Devam eden
> **Etki:** Premium deneyim

### 9.1 AI Chatbot
- [ ] 7/24 FAQ yanıtlama chatbot'u
- [ ] Lead qualification: bütçe, süre, hizmet türü soruları
- [ ] Human handoff: çalışma saatlerinde canlı destek
- [ ] Tawk.to veya Crisp (ücretsiz katman)

### 9.2 Client Portal Geliştirme
- [ ] Dashboard'a proje timeline/milestones ekle
- [ ] File sharing: deliverables upload/download
- [ ] Approval workflow: tasarım onay sistemi
- [ ] Monthly report auto-generation
- [ ] Push notification'lar (proje güncellemeleri)

### 9.3 Ödeme Sistemi
- [ ] Stripe checkout flow aktifleştir
- [ ] Invoice'larda online ödeme linki
- [ ] Template siparişlerinde anlık ödeme
- [ ] Recurring billing: Care Plan aylık otomatik çekim
- [ ] Multi-currency: EUR (varsayılan), GBP (UK müşteriler)

### 9.4 Video İçerik
- [ ] Client video testimonial'ları
- [ ] 30 saniyelik proje demo videoları
- [ ] About page'de kurucu tanıtım videosu
- [ ] YouTube kanalı ve embed'ler

### 9.5 Gelişmiş SEO
- [ ] Programmatic SEO: şehir + hizmet sayfaları (web-agency-lyon, web-agency-brussels, vb.)
- [ ] More city pages: Berlin, Munich, Hamburg, Amsterdam, Rotterdam, Lyon, Marseille
- [ ] Industry-specific landing pages (restaurant, construction, medical, legal)
- [ ] FAQ content hub: tüm sorular tek sayfada + kategorize
- [ ] Internal linking strategy: her sayfadan min 3 iç link

---

## UYGULAMA TAKVİMİ

| Faz | Süre | Öncelik | Bağımlılık |
|-----|------|---------|------------|
| **Faz 1** — Yasal Uyumluluk | 2-3 gün | 🔴 Acil | Yok |
| **Faz 2** — Erişilebilirlik | 3-4 gün | 🔴 Acil | Yok |
| **Faz 3** — İçerik & E-E-A-T | 5-7 gün | 🟠 Yüksek | Yok |
| **Faz 4** — Lead Gen & CRO | 3-5 gün | 🟠 Yüksek | Yok |
| **Faz 5** — Performans | 2-3 gün | 🟡 Orta | Yok |
| **Faz 6** — Analitik | 1-2 gün | 🟡 Orta | Faz 1 (consent) |
| **Faz 7** — Email Marketing | 2-3 gün | 🟡 Orta | Faz 1 (consent) |
| **Faz 8** — Review Platformları | 1-2 gün | 🟢 Orta-Düşük | Müşteri tabanı |
| **Faz 9** — İleri Özellikler | Devam eden | 🔵 Düşük | Gelir akışı |

**Toplam tahmini süre (Faz 1-7):** 18-27 gün
**Kritik fazlar (1-2):** 5-7 gün

---

## PREMIUM AJANS KARŞILAŞTIRMA MATRİSİ

| Özellik | DMC Kreatif | Premium Standart | Durum |
|---------|-------------|------------------|-------|
| Custom tasarım | ✅ Stripe/Linear seviye | ✅ | ✅ Tam |
| Multi-language (4 dil) | ✅ EN/FR/NL/DE | ✅ | ✅ Tam |
| SEO altyapısı (schema, meta) | ✅ 12+ schema | ✅ | ✅ Tam |
| Responsive / Mobile-first | ✅ | ✅ | ✅ Tam |
| Animasyon sistemi | ✅ Framer Motion | ✅ | ✅ Tam |
| Admin panel | ✅ 11 route | ✅ | ✅ Tam |
| Client dashboard | ✅ 7 route | ✅ | ✅ Tam |
| Template marketplace | ✅ GrapesJS | ⚡ Bonus | ✅ Bonus |
| Auth sistemi | ✅ Supabase | ✅ | ✅ Tam |
| **Impressum / Legal Notice** | ❌ | ✅ Zorunlu | ❌ Eksik |
| **Cookie Policy sayfası** | ❌ | ✅ Zorunlu | ❌ Eksik |
| **GDPR Cookie Consent (uyumlu)** | ⚠️ Kısmen | ✅ Zorunlu | ⚠️ Güncelle |
| **WCAG 2.1 AA / EAA** | ❌ | ✅ Zorunlu | ❌ Eksik |
| **Refund Policy** | ❌ | ✅ Zorunlu | ❌ Eksik |
| Blog (aktif içerik) | ❌ Coming soon | ✅ | ❌ Eksik |
| Case study derinliği | ⚠️ Yüzeysel | ✅ Detaylı | ⚠️ Güncelle |
| Booking / Takvim | ❌ | ✅ | ❌ Eksik |
| Email marketing | ❌ | ✅ | ❌ Eksik |
| Google Business Profile | ❌ | ✅ | ❌ Eksik |
| Review platform (Clutch vb.) | ❌ | ✅ | ❌ Eksik |
| Client logo bar | ❌ | ✅ | ❌ Eksik |
| Video testimonials | ❌ | ⚡ Premium | ❌ Eksik |
| AI chatbot | ❌ | ⚡ Premium | ❌ Gelecek |
| Ödeme entegrasyonu | ⚠️ Yapı var, bağlı değil | ✅ | ⚠️ Aktifle |
| Privacy-first analytics | ✅ GA4 + Consent Mode v2 + Clarity | ✅ Plausible/GA4 uyumlu | ✅ Tam |
| WebP/AVIF görseller | ❌ | ✅ | ❌ Eksik |
| prefers-reduced-motion | ❌ | ✅ Zorunlu | ❌ Eksik |
| Skip-to-content link | ❌ | ✅ Zorunlu | ❌ Eksik |

### Skor: 15/28 ✅ Tam — 6/28 ⚠️ Kısmen — 13/28 ❌ Eksik

---

## NOTLAR

- **Faz 1 ve 2 MUTLAKA önce yapılmalı** — AB'de yasal yaptırım riski var
- **Faz 3 (blog)** SEO sıralaması için en büyük etki
- **Faz 4 (booking + lead magnet)** gelir için en büyük etki
- **Faz 5-7** teknik borç ve altyapı iyileştirmesi
- **Faz 8-9** büyüme aşaması — müşteri tabanı oluştukça devreye girer
- Tüm fazlar paralel çalışabilir ancak Faz 6-7 consent altyapısına (Faz 1) bağımlı
