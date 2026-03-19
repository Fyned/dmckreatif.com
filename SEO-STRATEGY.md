# DMC Kreatif — 1 Yıllık SEO Stratejisi
**Başlangıç:** Mart 2026 | **Bitiş:** Mart 2027
**Mevcut Skor:** 70/100 | **Hedef:** 88/100

---

## Özet Hedefler

| Metrik | Şu An | 3 Ay | 6 Ay | 12 Ay |
|--------|-------|------|------|-------|
| SEO Health Score | 70/100 | 78/100 | 83/100 | 88/100 |
| Organic Traffic/ay | ~800 visit | 1.500 | 3.000 | 6.000+ |
| Ranking (top 10) | ~12 kw | 40 kw | 80 kw | 150+ kw |
| Domain Authority | ~18 | 22 | 28 | 35+ |
| Blog makalesi | 51 | 65 | 85 | 110+ |
| İndexlenmiş sayfa | ~200 | 350 | 450 | 500+ |
| Lighthouse (avg) | 75 | 85 | 92 | 95+ |

---

## Hedef Pazarlar ve Öncelik Sırası

| Pazar | Dil | Öncelik | Neden |
|-------|-----|---------|-------|
| 🇫🇷 Fransa | FR | P0 | 4 proje var, en güçlü referans |
| 🇬🇧 İngiltere | EN | P1 | Adamsons referansı, UK banka hesabı |
| 🇧🇪 Belçika | FR+NL | P2 | Archi Construction referansı |
| 🇳🇱 Hollanda | NL | P3 | Blog içeriği var, pazar potansiyeli |
| 🇩🇪 Almanya | DE | P4 | En rekabetçi pazar, uzun vadeli |

### Hedef Anahtar Kelimeler (Öncelikli)

**Fransa:**
- "agence web france" (1.600/ay)
- "création site internet france" (2.400/ay)
- "agence web paris" (3.600/ay) ← blog yazısı var
- "site web professionnel france" (880/ay)
- "création site web entreprise" (1.200/ay)

**İngiltere:**
- "web agency europe" (480/ay)
- "web development agency france" (390/ay)
- "multilingual website agency" (320/ay)
- "react web development agency" (260/ay)

**Hollanda:**
- "webbureau nederland" (720/ay)
- "website laten maken" (2.400/ay)
- "webbureau amsterdam" (880/ay) ← blog var

**Almanya:**
- "webdesign agentur" (8.100/ay — çok rekabetçi, uzun vade)
- "website erstellen lassen" (1.900/ay)
- "webdesign agentur berlin" (1.300/ay)

---

## Q1: Mart–Mayıs 2026 — TEKNİK TEMEL

> Hedef: SEO skor 70 → 78. Kritik teknik sorunları çöz, indexability'i onar.

### Mart 2026 (Hafta 1-2): KRİTİK DÜZELTMELER

**Hafta 1 — index.html temizliği (2-3 saat):**
- [ ] `index.html:24` — Statik canonical sil
- [ ] `index.html:2` — `lang="en"` → `lang="x-default"`
- [ ] `index.html:47-52` — Statik hreflang'ı x-default'a indir
- [ ] `index.html:71` — `logo` → `ImageObject`
- [ ] `.htaccess:54` — `no-store` kaldır → `no-cache, must-revalidate`

**Hafta 2 — Schema düzeltmeleri (3-4 saat):**
- [ ] `seo-schemas.ts:284` — `image` → `ImageObject` (42+ blog'da Article rich result)
- [ ] `seo-schemas.ts:34,330` — `logo` → `ImageObject`
- [ ] Çift BreadcrumbList sorunu çöz (`Breadcrumbs.tsx`)
- [ ] BreadcrumbList null guard ekle (`seo-schemas.ts:136-161`)
- [ ] `index.html` WebSite'a `potentialAction` (SearchAction) ekle
- [ ] `seo-schemas.ts` — `contactPoint` + `serviceType` + `wordCount` ekle
- [ ] `index.html:86` — Geo koordinatları düzelt (51.4513, 0.0515)

### Mart 2026 (Hafta 3-4): HREFLANG + SİTEMAP

**Hafta 3 (3-4 saat):**
- [ ] H1 Framer Motion'dan çıkar (LCP fix — HeroSection.tsx)
- [ ] `SeoHead.tsx` path normalisation (trailing slash)
- [ ] `en.json` — 10 sayfa title'ını 60 karaktere indir
- [ ] `en.json` — `seo.team.description` duplikatını düzelt
- [ ] `en.json` — "28-strong team" çelişkisini çöz (güvenilirlik)

**Hafta 4 (2-3 saat):**
- [ ] `sitemap.xml` — Technologies + Industries ekle
- [ ] `sitemap.xml` — EN blog lastmod düzelt (articles.ts ile eşitle)
- [ ] `sitemap.xml` — Legal sayfaları çıkar (20 URL tasarruf)
- [ ] `sitemap.xml` — UK şehirler NL/DE/FR hreflang kaldır
- [ ] `sitemap.xml` — FR case studylere `hreflang="fr"` ekle
- [ ] Blog yazılarına author byline ekle (`articles.ts` + `BlogPostPage.tsx`)

**Haftalık Test:**
```
npx tsc --noEmit && npm run build
```
Google Search Console'da Coverage kontrolü yap.

---

### Nisan 2026: İÇERİK GENİŞLEMESİ

> Hedef: İnce içerik sorunlarını çöz, E-E-A-T sinyallerini güçlendir.

**Hafta 1-2 — E-E-A-T İyileştirmeleri:**
- [ ] Kurucu fotoğrafı ekle (AboutPage + AuthorPage) ← EN KRİTİK
- [ ] Testimonial headshot'ları ekle (6 müşteri — WhatsApp'tan iste)
- [ ] UK Companies House numarasını footer'a + LegalNoticePage'e ekle
- [ ] `about.description` "28-strong team" → "boutique agency + specialist network"
- [ ] Digital Marketing servis açıklamasını genişlet (12 → 200+ kelime)

**Hafta 3-4 — Blog İçeriği:**
Hedef: Haftada 2 yeni makale (EN + FR dönüşümlü)

Öncelikli konular:
- "How Much Does a Website Cost in France 2026" (EN — yüksek arama hacmi)
- "Agence web Belgique — FR/NL bölünmüş site" (FR)
- "React vs WordPress: European Business Guide" (EN)
- "GDPR Compliant Website Checklist" (EN — trust builder)
- "How to Choose a Web Agency in Europe" (EN — conversion intent)
- "Website voor MKB Nederland" (NL)
- "e-Commerce Europa Guide" (FR)
- "Webdesign für kleine Unternehmen" (DE)

**Hafta 4 — Şehir Sayfaları Karar:**
Seçenek A (Önerilen): 34 → 10 şehre indir. Top 10:
Paris, Lyon, London, Brussels, Amsterdam, Berlin, Hamburg, Zurich, Manchester, Bordeaux.

Seçenek B: 34 şehir kalsın ama her birine 500+ kelime ekle.

---

### Mayıs 2026: TEKNİK PERFORMANS

> Hedef: Lighthouse 75 → 85. CWV'yi geç.

**Hafta 1-2 — Core Web Vitals:**
- [ ] LCP: `fetchpriority="high"` ekle LCP imagelara
- [ ] `BeforeAfterSlider.tsx:78,93` — `loading="lazy"` + `alt` ekle
- [ ] Font yüklemesi optimize et (9 weight → 3-4, preload all)
- [ ] Supabase promo 406 hatasını düzelt (kampanya sorgusu)

**Hafta 3-4 — Prerender Kararı:**
Seçenek A: `vite-plugin-prerender` ile Windows uyumlu prerender
Seçenek B: Next.js App Router'a geçiş (uzun vadeli en iyi çözüm)

**Mayıs Ayı Blog Hedefi:** 6 yeni makale (toplamda ~65 makale)

---

## Q2: Haziran–Ağustos 2026 — OTORİTE İNŞASI

> Hedef: SEO skor 78 → 83. Dış bağlantı ve üçüncü taraf referanslar.

### Haziran 2026: HARICI OTORİTE

**Dizin Kayıtları (hepsi ücretsiz, 1 haftada tamamlanır):**
- [ ] Clutch.co profil aç + 6 müşteriden review iste
- [ ] Google Business Profile (UK — Londra adresi) aç
- [ ] DesignRush profil aç
- [ ] Sortlist.com (FR/BE/NL pazarı için çok önemli)
- [ ] Expertise.com
- [ ] AgencySpotter
- [ ] GoodFirms
- [ ] Manifest.co

**Clutch Taktikleri:**
1. Her eski müşteriye (Pierre Cakir, Mehmet Altinbas, James Adams, vb.) kişisel WhatsApp mesajı: "Clutch.co'da review bırakır mısın? Link gönderiyorum"
2. Review'lar geldikçe Schema `sameAs` güncelle

**LinkedIn İçerik Takvimi:**
Her hafta 2 post:
- Salı: Case study / proje showcase
- Perşembe: Web geliştirme ipucu / sektör içgörüsü

**Blog Hedefi:** 6 yeni makale (toplam ~71)

---

### Temmuz 2026: BAĞLANTI İNŞASI (Link Building)

**Fransa — Hedef Siteler:**
- Bpifrance (girişim destek) — kaynak makalelerinde yer al
- Chambre de Commerce FR — yerel iş rehberi
- Yoast/Semrush Fransa blog — misafir yazarlık
- French Tech toplulukları

**Teknikler:**
1. **Kaynak Sayfası Bağlantıları:** "Meilleure agence web France" listeleyen sayfaları bul, dahil olmak için iletişime geç
2. **Misafir Yazarlık:** 2 adet misafir makale (FR web geliştirme blogları)
3. **Eski Müşteri Siteleri:** Tüm müşteri sitelerine footer'da "Site développé par DMC Kreatif" bağlantısı ekle (6 backlink)
4. **Portföy Siteleri:** Awwwards, CSS Design Awards submit

**Blog Hedefi:** 5 yeni makale (toplam ~76)
**Konular:**
- "Best Web Agencies in France 2026" (kendi siteni listele)
- "Multilingual SEO Guide for European SMEs"
- "Why Your Business Needs a React Website"

---

### Ağustos 2026: HOLLANDA PUSH

**NL Pazar Öncelikli Dönem:**

**İçerik:**
- 4 adet NL blog makalesi ekle (toplamda 10 NL makaleye çıkar)
- Amsterdam/Rotterdam şehir sayfalarını genişlet (500+ kelime)
- NL case study: Archi Construction Belçika → Hollanda pazarı için çerçevele

**Dizinler:**
- Thuiswinkel.org (NL iş rehberi)
- Kvk.nl (KvK — NL ticaret odası)
- Dutchwebdesign directories

**Blog Hedefi:** 6 yeni makale (toplam ~82)

---

## Q3: Eylül–Kasım 2026 — SCALE + GEO

> Hedef: SEO skor 83 → 86. AI arama görünürlüğü.

### Eylül 2026: AI ARAMALARI (GEO Optimization)

**AI Overview Hedefleri:**
Hangi sorularda AI Overviews'ta yer almak istiyoruz:
- "how much does a website cost in France"
- "best web agency for European businesses"
- "multilingual website development"
- "React web development agency Europe"

**GEO Teknik Eylemler:**
- [ ] `llms.txt` güncelle (yeni istatistikler, 2026 güncel veriler)
- [ ] FAQ schema servis sayfalarına ekle (AI Overview sinyali)
- [ ] Blog makalelerine "What is...", "How to...", "Why does..." başlıklı H2'ler ekle
- [ ] Her makalede 1 adet özet tablosu veya info-box ekle
- [ ] Müşteri sonuçlarını spesifik sayılarla yeniden yaz ("leads arttı" → "40% leads artışı ilk ayda")

**Blog:** "Complete Guide to AI-Powered Web Search for European Businesses" (GEO odaklı makale)

**Blog Hedefi:** 6 yeni makale (toplam ~88)

---

### Ekim 2026: ALMANYA PUSH

**DE Pazar Öncelikli Dönem:**

**İçerik:**
- 4 adet DE blog makalesi ekle (toplamda 10 DE makaleye çıkar)
- Berlin/Hamburg/München şehir sayfalarını genişlet
- DSGVO (Almanya GDPR) compliance sayfası ekle (trust builder)

**Teknik:**
- DE schema: `knowsLanguage: "de"`, `areaServed` Almanya şehirleri
- DE sitemap coverage teyit et

**Blog Hedefi:** 5 yeni makale (toplam ~93)

---

### Kasım 2026: PERFORMANS OPTİMİZASYONU

**Core Web Vitals Son Düzeltmeler:**
- [ ] Tüm sayfalar için LCP < 2.0s hedefi
- [ ] INP < 200ms — React render optimizasyonu
- [ ] CLS < 0.05 — sağdaki beyaz kutu artifact'ını çöz
- [ ] Bundle analizi: `npm run build -- --report`, gereksiz paket temizle
- [ ] Supabase: Auth sayfaları dışında lazy load

**Lighthouse Hedefi: 92+ tüm kategorilerde**

**Blog Hedefi:** 5 yeni makale (toplam ~98)

---

## Q4: Aralık 2026–Mart 2027 — OTORİTE + BÜYÜME

> Hedef: SEO skor 86 → 88+. Sürdürülebilir trafik ve lead akışı.

### Aralık 2026: YILSONU İÇERİK ATAĞU

**Yıl Sonu Makaleler (trend):**
- "Web Development Trends 2027 for European Businesses"
- "State of Web Design in France, Belgium, UK 2026-2027"
- "Agency Year in Review: Projects, Results, Lessons"

**Sosyal Kanıt:**
- [ ] Clutch'tan alınan review badge'i siteye ekle
- [ ] "Our Clients" bölümüne logo ekle (6 müşteri SVG logo)
- [ ] Kurucu "Year in Review" LinkedIn makalesi (thought leadership)

**Blog Hedefi:** 4 yeni makale (toplam ~102)

---

### Ocak 2027: PROGRAMATIK SEO KARARI

**Karar Noktası:** Şehir sayfaları ne olacak?

Eğer Şehir Sayfaları Çalışıyorsa (trafik geliyorsa):
- 10 core şehirden 20'ye genişlet
- Her şehre 1.000+ kelime içerik
- Şehir bazlı case study ekle

Eğer Çalışmıyorsa:
- 34 şehri 8 şehre indir
- Kaynakları FR/DE/NL blog içeriğine yönlendir

**Nasıl Ölçülür:** Google Search Console → Pages → şehir URL'lerinin impression + click'leri

**Sitemap Otomasyonu:**
`scripts/generate-sitemap.ts` yaz — `generate-rss.ts` pattern'ini takip ederek `allArticles`, `allCities`, `allServices` data'sından otomatik sitemap üret.

---

### Şubat–Mart 2027: YENİ MİLESTONE

**Değerlendirme:**
- Yıllık trafik artışı: Hedef 6.000 visit/ay (başlangıç: ~800)
- Rank durumu: 150+ anahtar kelimede ilk 10
- Revenue bağlantısı: Her ay Clutch/GSC üzerinden kaç lead geldi?

**Yeni Hedefler:**
- İsviçre pazarı (FR + DE çift dil)
- UK Google Ads desteği
- Template satışları (€39+ recurring)

---

## Aylık Rutin (Her Ay Yapılacaklar)

### Her Hafta Pazartesi (30 dk):
1. Google Search Console → Coverage kontrolü (yeni hatalar?)
2. Google Search Console → Performance → Yeni anahtar kelimeler?
3. 1 blog makalesi yaz veya incele

### Her Ay 1'i (2 saat):
1. Anahtar kelime sıralamalarını kontrol et (Ubersuggest/Semrush)
2. Rakip siteleri kontrol et (yeni içerik, yeni backlink?)
3. Google Search Console → Link report
4. Lighthouse skorlarını çalıştır (3 sayfa: homepage, bir servis sayfası, bir blog)
5. Sitemap submit et (Search Console → Sitemaps)
6. İçerik takvimini gelecek ay için güncelle

### Her 3 Ayda Bir (4 saat):
1. Tam SEO skoru hesapla (Action Plan'ı güncelle)
2. Blog içerik kalitesini gözden geçir (en az trafik alan 5 makale güncelle)
3. Backlink profili analizi
4. Şehir sayfası performansı değerlendir
5. Clutch/Google Reviews kontrol — yeni review var mı?

---

## Bütçe Tahsisi

| Araç/Hizmet | Maliyet | Sıklık | Öncelik |
|-------------|---------|--------|---------|
| Semrush (starter) | €120/ay | Aylık | Önerilir |
| Google Search Console | Ücretsiz | — | Zorunlu |
| Clutch.co | Ücretsiz | — | Zorunlu |
| DesignRush | Ücretsiz | — | Yüksek |
| Sortlist.com | Ücretsiz | — | Yüksek (FR/BE/NL) |
| Awwwards submit | €40 (tek seferlik) | Yıllık | Orta |
| UK telefon numarası (VoIP) | €5-10/ay | Aylık | Yüksek |
| Google Ads (isteğe bağlı) | €200-400/ay | Aylık | Büyüme aşaması |

**Zorunlu minimum:** £0 — tüm kritik aksiyonlar ücretsiz araçlarla yapılabilir.
**Önerilen:** €120-130/ay (Semrush + VoIP)

---

## Risk Faktörleri

| Risk | Olasılık | Etki | Çözüm |
|------|----------|------|-------|
| Google algorithm güncelleme | Orta | Yüksek | E-E-A-T odaklı kalmak |
| SPA indexability sorunu devam eder | Yüksek | Yüksek | Next.js migrasyonu düşün |
| Şehir sayfaları penalty | Orta | Orta | 10 şehre indir, içerik genişlet |
| Rakip ajanslar FR pazarında | Orta | Orta | Niş (multilingual) özelliğini öne çıkar |
| Blog içeriği zaman alır | Yüksek | Orta | Haftada 1-2 makale, tutarlı takvim |

---

## Başarı Göstergeleri — Çeyreklik

| Çeyrek | Teknik | İçerik | Backlink | Trafik |
|--------|--------|--------|----------|--------|
| Q1 (Mart-May) | Lighthouse 85+ | 65 makale | 15 domain | 1.500/ay |
| Q2 (Haz-Ağu) | CWV pass | 82 makale | 30 domain | 3.000/ay |
| Q3 (Eyl-Kas) | 95+ LH | 98 makale | 50 domain | 4.500/ay |
| Q4 (Ara-Mar) | — | 110+ makale | 70+ domain | 6.000+/ay |
