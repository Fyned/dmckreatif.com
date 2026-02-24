# DMC Kreatif — Wix-Like Website Builder: 30-Phase Implementation Plan

> Bu dosya context limiti aşılırsa bile plan detaylarını korumak için oluşturulmuştur.
> Her faz tamamlandığında test edilir, ardından sonraki faza geçilir.
> Son güncelleme: 2026-02-23

---

## MEVCUT DURUM (Başlangıç Noktası)

### Proje: `C:\Projects\CLAUDE-BOT\dmckreatif-vite`
- **Stack:** React 18.2 + Vite 7.3.1 + TypeScript 5.9 + Tailwind CSS v4 + Supabase
- **Supabase Project:** `mjewxaphcmricetqpejv` (eu-north-1)
- **Tasarım:** NeoBrutalist (cream bg #FFFDF5, black #121212, lime #CDFF50)
- **Fontlar:** Space Grotesk (heading) + JetBrains Mono (body)
- **Diller:** EN, FR, NL, DE (react-i18next)
- **Build:** 0 TypeScript hatası, production-ready

### Mevcut Özellikler:
- 37 route (public + dashboard + admin)
- 20 template + 10 kategori (Supabase'de)
- 22 demo HTML dosyası (`/public/demos/`)
- Template sipariş sistemi (4 adımlı wizard)
- Admin paneli (11 sayfa: clients, projects, invoices, messages, contacts, payments, packages, campaigns, templates, template-orders)
- Client dashboard (stats, projects, invoices, messages, template-orders)
- Auth sistemi (Supabase Auth + profiles + role-based: ADMIN/CLIENT)
- Google Analytics entegrasyonu
- SEO (Helmet + JSON-LD + OG tags)

### Supabase Tabloları:
1. `profiles` — kullanıcılar (id, name, email, role, company, phone, country)
2. `projects` — ajans projeleri
3. `invoices` — faturalar
4. `contact_submissions` — iletişim formu
5. `messages` — admin-user mesajlaşma
6. `template_categories` — 10 kategori (restaurant, construction, beauty-salon vb.)
7. `templates` — 20 template (slug, name, category_id, demo_data, tier_compatibility vb.)
8. `template_orders` — sipariş takibi
9. `packages` — fiyat paketleri
10. `campaigns` — promosyonlar
11. `site_settings` — global ayarlar

### RLS Politikaları (templates için):
- `templates_public_read` → SELECT where active=true (herkese açık)
- `templates_admin_all` → ALL where is_admin() (admin full erişim)
- `template_categories_public_read` → SELECT where active=true
- `template_categories_admin_all` → ALL where is_admin()

### Teknik Karar: GrapesJS
- **Neden:** 25.5K GitHub yıldız, 500K haftalık indirme, 8+ yıl olgun
- **Lisans:** BSD-3 (ücretsiz, ticari kullanım serbest)
- **Çıktı:** Temiz HTML/CSS/JS
- **React:** Resmi React Renderer plugin mevcut
- **Özellikler:** Drag-drop, blok sistemi, katman yöneticisi, asset yöneticisi, stil paneli
- **Alternatifler değerlendirildi:** Craft.js (daha çok custom UI gerekli), Builder.io (freemium/pahalı), Unlayer (email odaklı)

---

## FAZ 0 — "LOADING..." Bug Fix
**Öncelik: ACİL**
**Tahmini süre: 30 dakika**

### Problem:
`/en/templates` sayfası "LOADING..." gösteriyor, templateler render edilmiyor.

### Analiz:
- RLS politikaları doğru (public SELECT izni var)
- Veriler doğru (20 template, hepsi active=true, category_id'ler valid)
- Sorun muhtemelen: `is_admin()` fonksiyonunun hata vermesi veya error handling eksikliği

### Değiştirilecek Dosyalar:
1. `src/pages/TemplatesPage.tsx`

### Yapılacaklar:
1. `fetchData()` fonksiyonuna try/catch ekle — `setLoading(false)` her durumda çalışsın
2. `categoriesRes.error` ve `templatesRes.error` logla
3. Supabase'de `is_admin()` fonksiyonunu kontrol et — varsa çalıştığını doğrula, yoksa oluştur
4. Tarayıcıda test et — templateler render edilmeli

### Test:
```
1. npm run dev
2. http://localhost:5173/en/templates aç
3. 20 template kartı görünmeli
4. Kategori filtreleme çalışmalı
5. Arama çalışmalı
6. Template kartına tıklayınca detail sayfası açılmalı
```

### Supabase is_admin() Fonksiyonu (gerekirse oluşturulacak):
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'ADMIN'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## FAZ 1 — GrapesJS Entegrasyonu
**Tahmini süre: 2-3 saat**

### Amaç:
GrapesJS kurulumu ve temel editor sayfası oluşturma.

### Kurulacak Paketler:
```bash
npm install grapesjs grapesjs-preset-webpage grapesjs-blocks-basic grapesjs-plugin-forms
```

### Oluşturulacak Dosyalar:
1. `src/pages/EditorPage.tsx` — GrapesJS editor sayfası
2. `src/App.tsx` — yeni route ekleme

### Değiştirilecek Dosyalar:
1. `package.json` — yeni bağımlılıklar
2. `src/App.tsx` — `/:locale/editor/:templateSlug` route'u

### EditorPage.tsx Yapısı:
```typescript
// GrapesJS init
const editor = grapesjs.init({
  container: '#gjs',
  plugins: [grapesjsPresetWebpage, grapesjsBlocksBasic, grapesjsPluginForms],
  storageManager: false, // Supabase ile manual save
  canvas: {
    styles: ['template-styles.css'],
  },
});

// Template HTML'ini yükle
const response = await fetch(`/demos/${templateSlug}.html`);
const html = await response.text();
editor.setComponents(html);
```

### Route:
```typescript
// App.tsx'e ekle
<Route path="/:locale/editor/:templateSlug" element={
  <AuthGuard><EditorPage /></AuthGuard>
} />
```

### Test:
```
1. npm run build → 0 hata
2. npm run dev
3. Login yap (auth gerekli)
4. /en/editor/savoria-restaurant aç
5. GrapesJS editörü yüklenmeli
6. Savoria Restaurant HTML'i canvas'ta görünmeli
7. Drag-drop çalışmalı
8. Blok paneli sol tarafta görünmeli
```

---

## FAZ 2 — Template HTML → GrapesJS JSON Dönüşümü
**Tahmini süre: 2 saat**

### Amaç:
20 demo HTML dosyasını GrapesJS JSON formatına çevirip Supabase'e kaydetmek.

### Oluşturulacak Dosyalar:
1. `src/lib/grapesjs-utils.ts` — HTML↔JSON dönüşüm yardımcıları
2. `scripts/convert-templates.ts` — toplu dönüşüm scripti

### Mevcut Sütun:
`templates.demo_data` (JSONB) — zaten var, boş. GrapesJS JSON burada saklanacak.

### grapesjs-utils.ts Yapısı:
```typescript
export function htmlToGrapesJson(html: string): GrapesProjectData {
  // GrapesJS instance oluştur (headless)
  // HTML yükle
  // getProjectData() ile JSON al
  // Return JSON
}

export function grapesJsonToHtml(json: GrapesProjectData): string {
  // GrapesJS instance oluştur (headless)
  // loadProjectData(json)
  // getHtml() + getCss() birleştir
  // Return standalone HTML
}
```

### Test:
```
1. npx tsx scripts/convert-templates.ts çalıştır
2. Supabase'de templates.demo_data dolmuş olmalı (20 kayıt)
3. Editor'da JSON'dan yükleme çalışmalı
4. JSON → HTML export doğru görünmeli
```

---

## FAZ 3 — Editor UI: Toolbar & Paneller
**Tahmini süre: 3-4 saat**

### Amaç:
NeoBrutalist tarzda özel editor arayüzü.

### Oluşturulacak Dosyalar:
1. `src/components/editor/EditorToolbar.tsx` — üst bar (kaydet, önizle, yayınla, geri al/ileri al)
2. `src/components/editor/EditorSidebar.tsx` — sol panel (bloklar, katmanlar, stiller)
3. `src/components/editor/EditorCanvas.tsx` — merkez canvas wrapper
4. `src/components/editor/BlocksPanel.tsx` — sürüklenebilir bloklar
5. `src/components/editor/StylesPanel.tsx` — CSS özellik editörü

### Toolbar Butonları:
- Geri Al / İleri Al (undo/redo)
- Cihaz Önizleme (Desktop/Tablet/Mobile)
- Kaydet (draft)
- Önizle (yeni sekmede)
- Yayınla (şimdilik disabled)

### NeoBrutalist Styling:
```css
/* Editor chrome */
.editor-toolbar { @apply border-b-2 border-neo-black bg-neo-bg h-14 }
.editor-sidebar { @apply border-r-2 border-neo-black bg-neo-white w-72 }
.editor-canvas { @apply bg-gray-100 flex-1 }
```

### Test:
```
1. npm run build → 0 hata
2. Editor sayfası NeoBrutalist tarzda görünmeli
3. Toolbar butonları çalışmalı (undo/redo)
4. Sidebar panelleri açılıp kapanmalı
5. Canvas responsive (device toggle)
6. GrapesJS varsayılan UI yerine custom UI kullanılmalı
```

---

## FAZ 4 — İş Sektörlerine Özel Bloklar
**Tahmini süre: 3 saat**

### Amaç:
Kullanıcıların sürükleyip bırakabileceği sektör bazlı hazır bloklar.

### Oluşturulacak Dosyalar:
1. `src/lib/editor-blocks.ts` — blok tanımları
2. `src/components/editor/blocks/` — blok kategorileri

### Blok Kategorileri:
| Kategori | Bloklar |
|----------|---------|
| **Genel** | Header, Hero, Footer, CTA, Hakkımızda, İletişim |
| **Galeri** | Resim Galerisi, Video, Slider |
| **İçerik** | Hizmetler Grid, Fiyat Tablosu, Testimonials, SSS, İstatistikler |
| **Restoran** | Menü Listesi, Rezervasyon Formu, Şef Profili |
| **İnşaat** | Proje Galerisi, Hizmet Kartları, Sertifikalar |
| **Güzellik** | Hizmet Fiyatları, Uzman Profilleri, Randevu Butonu |
| **Hukuk** | Avukat Profili, Uzmanlık Alanları, Dava İstatistikleri |
| **Tıp** | Doktor Profili, Bölümler, Randevu Formu |

### Blok Yapısı (örnek):
```typescript
{
  id: 'restaurant-menu',
  label: 'Restaurant Menu',
  category: 'Restaurant',
  content: `<section class="menu-section">
    <h2>{{menu_title}}</h2>
    <div class="menu-item">
      <span class="item-name">{{item_name}}</span>
      <span class="item-price">{{item_price}}</span>
    </div>
  </section>`,
  media: '<svg>...</svg>' // blok ikonu
}
```

### Test:
```
1. Editor'da blok paneli açılmalı
2. Blok kategorileri görünmeli
3. Blok sürükleyip canvas'a bırakılabilmeli
4. Sektör bazlı bloklar doğru HTML üretmeli
5. Placeholder'lar ({{...}}) düzenlenebilir olmalı
```

---

## FAZ 5 — İşletme Bilgisi Formu & Otomatik Doldurma
**Tahmini süre: 3 saat**

### Amaç:
Kullanıcı işletme bilgilerini girer → templateteki placeholder'lar otomatik dolar.

### Oluşturulacak Dosyalar:
1. `src/components/editor/BusinessInfoPanel.tsx` — form
2. `src/lib/template-placeholders.ts` — placeholder eşleme sistemi

### Form Alanları:
```
- İşletme Adı (business_name)
- Logo (logo_url) → Supabase Storage upload
- Telefon (phone)
- E-posta (email)
- Adres (address)
- Çalışma Saatleri (hours)
- Slogan (slogan)
- Marka Rengi - Ana (primary_color) → renk seçici
- Marka Rengi - İkincil (secondary_color) → renk seçici
- Sosyal Medya Linkleri (social_facebook, social_instagram, social_twitter, social_linkedin)
- Kısa Açıklama (short_description)
```

### Placeholder Sistemi:
```typescript
const PLACEHOLDERS = {
  '{{business_name}}': businessInfo.name,
  '{{phone}}': businessInfo.phone,
  '{{email}}': businessInfo.email,
  '{{address}}': businessInfo.address,
  '{{hours}}': businessInfo.hours,
  '{{slogan}}': businessInfo.slogan,
  '{{logo_url}}': businessInfo.logoUrl,
};

// GrapesJS içeriğinde find-and-replace
function applyBusinessInfo(editor: Editor, info: BusinessInfo) {
  const html = editor.getHtml();
  let updated = html;
  for (const [placeholder, value] of Object.entries(PLACEHOLDERS)) {
    updated = updated.replaceAll(placeholder, value);
  }
  editor.setComponents(updated);
}
```

### Logo Upload:
```typescript
// Supabase Storage'a yükle
const { data } = await supabase.storage
  .from('site-assets')
  .upload(`${userId}/logo/${file.name}`, file);
```

### Test:
```
1. Editor'da "İşletme Bilgileri" paneli açılmalı
2. Form doldurulunca template'teki placeholder'lar değişmeli
3. Logo yükleme çalışmalı (Supabase Storage)
4. Renk seçici → template'in CSS değişkenleri güncellemeli
5. Değişiklikler anlık olarak canvas'ta görünmeli
```

---

## FAZ 6 — Proje Kaydetme/Yükleme (Supabase)
**Tahmini süre: 3 saat**

### Amaç:
Kullanıcılar çalışmalarını kaydedip sonra devam edebilsin.

### Yeni Supabase Tablosu:
```sql
CREATE TABLE user_sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES templates(id),
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE,
  grapesjs_data JSONB NOT NULL DEFAULT '{}',
  business_info JSONB NOT NULL DEFAULT '{}',
  seo_settings JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'unpublished')),
  published_html TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE user_sites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_sites" ON user_sites
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "admin_all_sites" ON user_sites
  FOR ALL USING (is_admin());
```

### Oluşturulacak Dosyalar:
1. `src/lib/user-sites.ts` — CRUD operasyonları
2. `src/pages/dashboard/MySitesPage.tsx` — kullanıcı siteleri listesi

### Kaydetme Akışı:
```typescript
// Save
async function saveSite(siteId: string, editor: Editor, businessInfo: BusinessInfo) {
  const projectData = editor.getProjectData();
  await supabase.from('user_sites').upsert({
    id: siteId,
    user_id: currentUser.id,
    grapesjs_data: projectData,
    business_info: businessInfo,
    updated_at: new Date().toISOString(),
  });
}

// Auto-save (60 saniyede bir)
useEffect(() => {
  const interval = setInterval(() => saveSite(siteId, editor, businessInfo), 60000);
  return () => clearInterval(interval);
}, [editor, businessInfo]);
```

### Dashboard "Sitelerim" Sayfası:
- Site kartları: isim, template adı, durum badge (draft/published), son güncelleme
- "Düzenle" butonu → editor'a yönlendir
- "Sil" butonu (onay dialogu ile)
- "Yeni Site Oluştur" butonu → template seçimine yönlendir

### Test:
```
1. Editor'da "Kaydet" butonuna tıkla → başarılı mesajı
2. Sayfayı yenile → kayıtlı veri yüklensin
3. Dashboard'da "Sitelerim" sayfasında site görünsün
4. Otomatik kayıt 60 saniyede bir çalışsın (network tab'dan kontrol)
5. Supabase'de user_sites tablosunda veri oluşmuş olmalı
```

---

## FAZ 7 — HTML Export & Statik Site Üretimi
**Tahmini süre: 3 saat**

### Amaç:
Düzenlenmiş template'i temiz, bağımsız HTML/CSS olarak export etmek.

### Oluşturulacak Dosyalar:
1. `src/lib/site-generator.ts` — HTML export motoru

### Export Süreci:
```typescript
function generateStaticSite(editor: Editor, businessInfo: BusinessInfo, seoSettings: SeoSettings): string {
  const html = editor.getHtml();
  const css = editor.getCss();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seoSettings.title || businessInfo.name}</title>
  <meta name="description" content="${seoSettings.description}">
  <meta name="generator" content="DMC Kreatif">
  <meta property="og:title" content="${seoSettings.title}">
  <meta property="og:description" content="${seoSettings.description}">
  <style>${css}</style>
</head>
<body>
  ${html}
  <!-- DMC Kreatif Branding -->
  <footer class="dmc-branding">
    <a href="https://dmckreatif.com" target="_blank" rel="noopener">
      Built with DMC Kreatif
    </a>
  </footer>
</body>
</html>`;
}
```

### Depolama:
- Export edilen HTML → `user_sites.published_html` sütununa kaydet
- Ayrıca Supabase Storage'a `published-sites/{subdomain}/index.html` olarak yükle

### Test:
```
1. Editor'da düzenleme yap → "Export" butonuna tıkla
2. Üretilen HTML dosyası temiz ve çalışır olmalı
3. DMC Kreatif footer branding mevcut olmalı
4. Meta taglar doğru olmalı
5. CSS inline olarak dahil edilmeli
6. Harici bağımlılık yok (standalone)
```

---

## FAZ 8 — Subdomain Sistemi: DNS & Routing
**Tahmini süre: 4-5 saat**

### Amaç:
`clientname.dmckreatif.com` üzerinden yayınlanmış siteleri sunmak.

### Altyapı Seçenekleri:

**Seçenek A — Supabase Edge Function:**
```typescript
// supabase/functions/serve-site/index.ts
Deno.serve(async (req) => {
  const host = req.headers.get('host') || '';
  const subdomain = host.split('.')[0];

  // user_sites tablosundan subdomain ile sorgula
  const { data: site } = await supabaseAdmin
    .from('user_sites')
    .select('published_html')
    .eq('subdomain', subdomain)
    .eq('status', 'published')
    .single();

  if (!site) return new Response('Site not found', { status: 404 });

  return new Response(site.published_html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
});
```

**Seçenek B — Vercel Middleware (eğer Vercel'e geçilirse):**
```typescript
// middleware.ts
export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host');
  const subdomain = hostname?.split('.')[0];
  if (subdomain && subdomain !== 'www' && subdomain !== 'dmckreatif') {
    return NextResponse.rewrite(new URL(`/api/site/${subdomain}`, req.url));
  }
}
```

### DNS Yapılandırması (Hostinger):
```
Tip     İsim              Değer                  TTL
A       *.dmckreatif.com  [sunucu IP adresi]     3600
CNAME   *.dmckreatif.com  [edge function URL]    3600
```

### Subdomain Validasyonu:
```typescript
function isValidSubdomain(name: string): boolean {
  return /^[a-z0-9]([a-z0-9-]{1,28}[a-z0-9])?$/.test(name);
}

const RESERVED_SUBDOMAINS = [
  'www', 'admin', 'api', 'app', 'mail', 'smtp', 'ftp',
  'blog', 'shop', 'store', 'help', 'support', 'status',
  'cdn', 'static', 'assets', 'media', 'img', 'images',
];
```

### Test:
```
1. user_sites tablosuna subdomain='testsite' kaydet
2. testsite.dmckreatif.com → published HTML göstermeli
3. Olmayan subdomain → 404 sayfası göstermeli
4. Reserved subdomain'ler reddedilmeli
5. Subdomain unique olmalı (duplicate engellenmeli)
```

---

## FAZ 9 — Yayınlama Akışı UI
**Tahmini süre: 2-3 saat**

### Amaç:
"Yayınla" butonuna bas → subdomain seç → site canlıya al.

### Oluşturulacak Dosyalar:
1. `src/components/editor/PublishDialog.tsx` — yayınlama modal'ı
2. `src/components/editor/PublishStatus.tsx` — durum göstergesi

### Yayınlama Akışı:
1. "Yayınla" butonuna tıkla → dialog açılır
2. Subdomain input (gerçek zamanlı availability check)
3. Kullanılabilir → yeşil onay, Kullanılmıyor → kırmızı uyarı
4. "Yayınla" onayla → HTML generate et → Supabase'e kaydet → status='published'
5. Başarılı → URL göster + kopyala butonu + QR kod

### Özellikler:
- Subdomain availability: Supabase'den `user_sites` tablosu sorgusu
- QR kod: `qrcode` npm paketi ile generate
- "Yayından Kaldır" butonu → status='unpublished'
- Düzenleme sonrası "Güncelle" butonu → mevcut subdomain'de yeniden yayınla

### Test:
```
1. Editor'da "Yayınla" butonuna tıkla → dialog açılsın
2. Subdomain yaz → anlık kontrol çalışsın
3. Yayınla → başarılı mesajı + URL göstersin
4. URL'yi tarayıcıda aç → site görünsün
5. "Yayından Kaldır" → site erişilemez olsun
6. Dashboard'da site durumu "Published" olarak güncellensin
```

---

## FAZ 10 — Site Önizleme & Cihaz Testi
**Tahmini süre: 2 saat**

### Amaç:
Yayınlamadan önce farklı cihaz boyutlarında önizleme.

### Oluşturulacak Dosyalar:
1. `src/components/editor/PreviewPanel.tsx` — iframe önizleme
2. `src/pages/PreviewPage.tsx` — tam ekran önizleme route'u

### Cihaz Boyutları:
- Desktop: 1280×800
- Tablet: 768×1024
- Mobile: 375×812

### Özellikler:
- GrapesJS'in dahili device manager'ı kullanılacak
- Tam ekran önizleme (yeni sekmede, no-chrome)
- Paylaşılabilir önizleme linki (24 saat geçerli, token-based)

### Test:
```
1. Device toggle butonları çalışmalı (desktop/tablet/mobile)
2. Canvas boyutu değişmeli
3. Tam ekran önizleme açılmalı
4. Önizleme linki oluşturulmalı (kısa ömürlü)
```

---

## FAZ 11 — Görsel & Asset Yönetimi
**Tahmini süre: 3 saat**

### Amaç:
Kullanıcılar sitelerine resim yükleyip yönetebilsin.

### Supabase Storage:
```
Bucket: site-assets
Yapı: /{user_id}/{site_id}/images/
Limit: 50MB free, 200MB premium
```

### Oluşturulacak Dosyalar:
1. `src/components/editor/AssetManager.tsx` — görsel kütüphanesi
2. `src/lib/asset-upload.ts` — upload yardımcıları

### Özellikler:
- Drag-and-drop yükleme
- Resim optimizasyonu: max 1920px genişlik, WebP format
- GrapesJS Asset Manager entegrasyonu
- Unsplash API entegrasyonu (ücretsiz stock foto)
- Kullanıcı başına kota takibi

### Test:
```
1. Editor'da resim yükleme çalışmalı
2. Yüklenen resimler Supabase Storage'da görünmeli
3. Asset panelinde tüm yüklenen görseller listelensin
4. Resim canvas'a sürüklenebilmeli
5. Unsplash araması çalışmalı (API key gerekli)
```

---

## FAZ 12 — SEO Ayarları Paneli
**Tahmini süre: 2 saat**

### Amaç:
Kullanıcılar sitelerinin SEO ayarlarını yapabilsin.

### Oluşturulacak Dosyalar:
1. `src/components/editor/SeoPanel.tsx` — SEO formu

### Form Alanları:
- Sayfa başlığı (title, max 60 karakter, canlı karakter sayacı)
- Meta açıklama (description, max 160 karakter)
- OG Image (yükleme veya URL)
- Favicon (yükleme)
- Google Analytics ID (opsiyonel)
- Google Search Console doğrulama kodu (opsiyonel)

### Otomatik Üretilenler:
- sitemap.xml (DMC Kreatif girişi dahil)
- robots.txt
- JSON-LD (LocalBusiness schema)
- Google arama sonucu önizlemesi

### Test:
```
1. SEO paneli editor'da görünmeli
2. Başlık/açıklama değişiklikleri export'ta yansımalı
3. Google arama önizlemesi anlık güncellensin
4. sitemap.xml DMC Kreatif linkini içersin
```

---

## FAZ 13 — Domain Müsaitlik Kontrolü
**Tahmini süre: 3 saat**

### Amaç:
Kullanıcı istediği domainin boş olup olmadığını kontrol edebilsin.

### API Seçenekleri:
1. **Domainr API** — Ücretsiz, 16 istek/saat limiti
2. **WHOIS XML API** — 100 ücretsiz sorgu/ay
3. **Node.js whois paketi** — Direkt WHOIS sorgusu (yavaş ama ücretsiz)

### Oluşturulacak Dosyalar:
1. `src/components/domains/DomainChecker.tsx` — arama UI
2. `supabase/functions/check-domain/index.ts` — Edge Function

### Edge Function:
```typescript
Deno.serve(async (req) => {
  const { domain } = await req.json();

  // Domainr API veya WHOIS sorgusu
  const response = await fetch(
    `https://domainr.p.rapidapi.com/v2/status?domain=${domain}`,
    { headers: { 'X-RapidAPI-Key': RAPIDAPI_KEY } }
  );

  const data = await response.json();
  const available = data.status.some(s => s.status === 'undelegated');

  return Response.json({ domain, available });
});
```

### Desteklenen TLD'ler:
.com, .fr, .nl, .de, .be, .co.uk, .eu, .net, .org, .io

### Rate Limiting:
- Kullanıcı başına saatte max 10 sorgu
- IP başına saatte max 30 sorgu

### Test:
```
1. Domain arama UI çalışmalı
2. Var olan domain → "Kullanımda" göstersin
3. Boş domain → "Müsait" göstersin + fiyat (€50/yıl)
4. Rate limit aşılınca uyarı göstersin
5. Geçersiz domain formatı → hata mesajı
```

---

## FAZ 14 — Custom Domain: Sipariş & Ödeme
**Tahmini süre: 4 saat**

### Amaç:
Kullanıcı domain sipariş edip ödeme yapabilsin.

### Yeni Supabase Tablosu:
```sql
CREATE TABLE domain_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  site_id UUID REFERENCES user_sites(id) NOT NULL,
  domain_name TEXT NOT NULL,
  tld TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_payment'
    CHECK (status IN ('pending_payment', 'paid', 'registering', 'active', 'expired', 'cancelled')),
  price DECIMAL(10,2) NOT NULL DEFAULT 50.00,
  currency TEXT NOT NULL DEFAULT 'EUR',
  paid_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  dns_configured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Ödeme Akışı:
1. Domain kontrol et → müsait
2. "Domain Satın Al (€50/yıl)" butonu
3. LemonSqueezy checkout sayfasına yönlendir
4. Ödeme başarılı → webhook → `domain_orders` status='paid'
5. Admin'e bildirim gönder
6. Admin domaini manuel alır → status='registering' → 'active'

### Test:
```
1. Domain sipariş akışı çalışmalı
2. LemonSqueezy checkout açılmalı
3. Webhook simülasyonu → status güncellenmeli
4. Admin panelde yeni sipariş görünmeli
5. Supabase'de domain_orders tablosu dolmalı
```

---

## FAZ 15 — Admin: Domain Yönetimi
**Tahmini süre: 3 saat**

### Amaç:
Admin domain siparişlerini görsün, işlesin, bağlasın.

### Oluşturulacak Dosyalar:
1. `src/pages/admin/DomainsAdminPage.tsx` — domain siparişleri sayfası

### Admin Akışı:
1. Yeni sipariş bildirimi (admin dashboard'da badge)
2. Domain listesi: domain adı, müşteri, durum, tarih
3. Admin: domaini satın al (harici) → "Kayıt Ediliyor" yap
4. DNS ayarlarını gir → "Aktif" yap
5. Site otomatik olarak custom domain'den sunulur

### Test:
```
1. Admin panelde "Domains" sayfası görünmeli
2. Domain siparişleri listelenmeli
3. Status değişiklikleri çalışmalı
4. Dashboard'da bildirim badge'i görünmeli
```

---

## FAZ 16 — Custom Domain: DNS & SSL
**Tahmini süre: 4 saat**

### Amaç:
Custom domain'leri HTTPS ile çalışır hale getirmek.

### user_sites Tablosu Güncellemesi:
```sql
ALTER TABLE user_sites ADD COLUMN custom_domain TEXT UNIQUE;
ALTER TABLE user_sites ADD COLUMN custom_domain_verified BOOLEAN DEFAULT FALSE;
```

### Edge Function Güncelleme:
```typescript
// Host header'dan hem subdomain hem custom domain kontrol et
const host = req.headers.get('host');

// Önce custom_domain ile eşleşme ara
let site = await supabase.from('user_sites')
  .select('published_html')
  .eq('custom_domain', host)
  .eq('custom_domain_verified', true)
  .single();

// Yoksa subdomain ile dene
if (!site.data) {
  const subdomain = host.split('.')[0];
  site = await supabase.from('user_sites')
    .select('published_html')
    .eq('subdomain', subdomain)
    .single();
}
```

### DNS Doğrulama:
- Admin domain'in doğru sunucuya yönlendirildiğini kontrol eder
- CNAME/A record talimatları müşteriye gösterilir
- SSL: hosting provider'ın Let's Encrypt otomasyonu

### Test:
```
1. Custom domain ile siteye erişim çalışmalı
2. HTTPS aktif olmalı
3. Subdomain fallback çalışmalı
4. DNS doğrulama mekanizması çalışmalı
```

---

## FAZ 17 — DMC Kreatif Marka Enjeksiyonu
**Tahmini süre: 2 saat**

### Amaç:
Tüm template sitelerde DMC Kreatif markası bulunmalı.

### Oluşturulacak Dosyalar:
1. `src/lib/branding-injector.ts` — HTML post-işleme

### Enjekte Edilecekler:
1. **Footer:** "Built with ❤ by DMC Kreatif" linki (kaldırılamaz)
2. **Sitemap.xml:** `https://dmckreatif.com` girişi
3. **Meta tag:** `<meta name="generator" content="DMC Kreatif">`
4. **Favicon fallback:** DMC Kreatif favicon (kullanıcı yüklemediyse)
5. **robots.txt:** standart + sitemap URL

### Footer HTML:
```html
<footer class="dmc-branding" style="text-align:center;padding:16px;font-size:12px;opacity:0.7;">
  <a href="https://dmckreatif.com" target="_blank" rel="noopener noreferrer"
     style="color:inherit;text-decoration:none;">
    Built with DMC Kreatif
  </a>
</footer>
```

### Test:
```
1. Yayınlanan her site footer'da DMC Kreatif linki içermeli
2. Link dmckreatif.com'a yönlendirmeli
3. sitemap.xml'de DMC Kreatif girişi olmalı
4. Meta generator tag mevcut olmalı
5. Kullanıcı footer'ı GrapesJS'te silememiş olmalı (locked component)
```

---

## FAZ 18 — Dashboard: Site Analitikleri
**Tahmini süre: 4 saat**

### Amaç:
Kullanıcılar sitelerinin basit ziyaret istatistiklerini görsün.

### Yeni Tablo:
```sql
CREATE TABLE site_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES user_sites(id) ON DELETE CASCADE NOT NULL,
  path TEXT DEFAULT '/',
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Index for performance
CREATE INDEX idx_site_visits_site_id ON site_visits(site_id);
CREATE INDEX idx_site_visits_created_at ON site_visits(created_at);
```

### Tracking Pixel:
Yayınlanan HTML'e 1px tracking image veya JS snippet enjekte et:
```html
<script>
  fetch('https://mjewxaphcmricetqpejv.supabase.co/functions/v1/track-visit', {
    method: 'POST',
    body: JSON.stringify({ site: '{{subdomain}}', path: location.pathname }),
    headers: { 'Content-Type': 'application/json' }
  });
</script>
```

### Dashboard Sayfası:
- Toplam görüntülenme, benzersiz ziyaretçi
- Son 7/30/90 gün seçici
- Çubuk grafik (günlük ziyaretler)
- Referrer kaynakları (Google, Direct, Social vb.)
- Ülke dağılımı

### Test:
```
1. Yayınlanmış siteyi ziyaret et → tracking çalışsın
2. Dashboard'da ziyaret sayısı artmış olmalı
3. Grafik ve istatistikler doğru görünmeli
4. GDPR uyumlu (IP anonim, cookie yok)
```

---

## FAZ 19 — Çok Sayfalı Siteler
**Tahmini süre: 4 saat**

### Amaç:
Kullanıcılar tek sayfa değil, çok sayfalı site oluşturabilsin.

### Yapı:
```
user_sites.pages JSONB = [
  { slug: 'index', title: 'Home', grapesjs_data: {...} },
  { slug: 'about', title: 'About Us', grapesjs_data: {...} },
  { slug: 'services', title: 'Services', grapesjs_data: {...} },
  { slug: 'contact', title: 'Contact', grapesjs_data: {...} },
]
```

### Özellikler:
- Sayfa yöneticisi: ekle/sil/sırala
- Her sayfa ayrı GrapesJS projesi
- Navigasyon bileşeni otomatik oluşturulur
- Sayfalar arası dahili linkleme
- Sayfa bazlı SEO (title, description)
- 404 sayfa şablonu (otomatik)

### URL Yapısı:
```
clientsite.dmckreatif.com/          → index sayfası
clientsite.dmckreatif.com/about     → about sayfası
clientsite.dmckreatif.com/services  → services sayfası
```

### Test:
```
1. Editor'da sayfa ekle/sil/sırala çalışmalı
2. Sayfalar arası geçiş çalışmalı
3. Navigasyon otomatik güncellenmeli
4. Her sayfa farklı GrapesJS içeriğe sahip olmalı
5. Yayınlanan site çok sayfalı çalışmalı
```

---

## FAZ 20 — İletişim Formu Oluşturucu
**Tahmini süre: 3 saat**

### Amaç:
Kullanıcılar sitelerine çalışan formlar ekleyebilsin.

### Yeni Tablo:
```sql
CREATE TABLE site_form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES user_sites(id) ON DELETE CASCADE NOT NULL,
  form_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### GrapesJS Form Bloğu:
- Sürükle-bırak form bileşeni (isim, email, telefon, mesaj)
- Form action → Supabase Edge Function
- Honeypot spam koruması
- Rate limiting (IP başına 5/saat)

### Edge Function (form handler):
```typescript
Deno.serve(async (req) => {
  const { siteId, formData } = await req.json();

  // Rate limit check
  // Honeypot check
  // Insert to site_form_submissions
  // Email notification to site owner

  return Response.json({ success: true });
});
```

### Test:
```
1. Editor'da form bloğu eklenebilmeli
2. Yayınlanmış sitede form çalışmalı
3. Gönderilen veriler Supabase'de görünmeli
4. Dashboard'da form gönderileri listelensin
5. Spam koruması çalışmalı
```

---

## FAZ 21 — Template Marketplace: Kullanıcı Yorumları
**Tahmini süre: 2 saat**

### Yeni Tablo: `template_reviews`
### Özellikler: 1-5 yıldız + yorum, ortalama puan, admin moderasyon

---

## FAZ 22 — Template Filtreleme İyileştirmeleri
**Tahmini süre: 2 saat**

### Özellikler: Kategori, tier, fiyat, puan filtreleri. Sıralama. "Yeni" badge. Karşılaştırma.

---

## FAZ 23 — E-posta Bildirim Sistemi
**Tahmini süre: 3 saat**

### Servis: Resend.com (3000 ücretsiz/ay) veya SendGrid
### E-postalar: Hoşgeldin, site yayınlandı, domain durumu, form bildirimi, şifre sıfırlama

---

## FAZ 24 — Kullanıcı Onboarding Akışı
**Tahmini süre: 3 saat**

### Adımlar: Template seç → İşletme bilgisi → Editor turu → Subdomain seç → Yayınla
### Tooltip-based tur sistemi

---

## FAZ 25 — Performans Optimizasyonu
**Tahmini süre: 3 saat**

### Lazy loading, CSS purging, HTML minify, preload, CDN headers, Lighthouse check

---

## FAZ 26 — Mobil Editor Deneyimi
**Tahmini süre: 2 saat**

### Tablet (1024px) responsive, touch-friendly, mobilde uyarı

---

## FAZ 27 — Admin Dashboard Geliştirmeleri
**Tahmini süre: 3 saat**

### Platform istatistikleri, aktivite feed'i, kullanıcı yönetimi, gelir raporu

---

## FAZ 28 — Ödeme & Abonelik Sistemi
**Tahmini süre: 4 saat**

### LemonSqueezy entegrasyonu, fatura üretimi (PDF), yıllık yenileme, ödeme geçmişi

---

## FAZ 29 — Yasal & GDPR Uyumluluğu
**Tahmini süre: 3 saat**

### Cookie consent, privacy policy, terms of service, veri export, hesap silme

---

## FAZ 30 — Lansman Hazırlığı & QA
**Tahmini süre: 5 saat**

### Uçtan uca test, cross-browser, load test, güvenlik audit, yedekleme, monitoring, dokümantasyon
### Beta: 5 kullanıcı ile soft launch

---

## TOPLAM TAHMİNİ SÜRE
- Faz 0: 30 dk
- Faz 1-10: ~28 saat (Editor + Publishing temel)
- Faz 11-20: ~30 saat (Assets + Domain + Advanced)
- Faz 21-30: ~30 saat (Polish + Launch)
- **Toplam: ~90 saat** (~3-4 hafta tam zamanlı çalışma)

---

## HER FAZDA ZORUNLU TEST PROTOKOLÜ
```
✅ npm run build → 0 TypeScript hatası
✅ Özellik tarayıcıda test edildi
✅ Supabase verisi doğrulandı (MCP tools ile)
✅ Konsolda hata yok (production mode)
✅ Lighthouse skoru ≥ 90 korunuyor
✅ Mevcut özellikler bozulmamış (regression test)
```
