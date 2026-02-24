# HANDOFF — dmckreatif-vite Template Marketplace
> Bu dosya, Claude Opus ile yeni bir chat'te devam etmek için yazılmıştır.
> Tarih: 2026-02-23 | Proje: DMC Kreatif Agency Site

---

## 1. PROJE ÖZETI

**Repo:** `C:\Projects\CLAUDE-BOT\dmckreatif-vite\`
**Stack:** React 18.2 + Vite 7.3.1 + TypeScript 5.9 + Tailwind CSS v4 + Supabase
**Design:** NeoBrutalist — `#FFFDF5` bg, `#121212` siyah, `#CDFF50` lime, Space Grotesk + JetBrains Mono, 2px border, 0px radius, hard shadows
**i18n:** react-i18next, 4 dil (EN/FR/NL/DE), locale-based routing `/:locale/...`
**Build durumu:** ✅ 0 TypeScript hatası, 2325 modül, build geçiyor

---

## 2. SUPABASE BAĞLANTISI

```
Project URL: https://mjewxaphcmricetqpejv.supabase.co
Region: eu-north-1 (Stockholm)
Dosya: src/lib/supabase.ts
```

**Tablolar:**
- `profiles` — kullanıcı profilleri (role: "ADMIN" | "CLIENT")
- `templates` — satılık şablonlar
- `template_categories` — 10 kategori (restaurant, construction, beauty-salon, law-firm, medical, e-commerce, real-estate, automotive, education, technology)
- `template_orders` — sipariş kayıtları
- `messages` — admin ↔ kullanıcı mesajlar

**Veri durumu:**
- `template_categories`: ✅ 10 kategori seeded
- `templates`: ❌ 0 kayıt (boş tablo — seed gerekli)

---

## 3. TİP TANIMLARI (src/types/database.ts)

```typescript
export type TemplateTier = "business_card" | "starter" | "professional";

export interface Template {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category_id: string;
  thumbnail_url: string | null;
  preview_url: string | null;        // ← Canlı demo URL, şu an HİÇBİR YERDE kullanılmıyor
  preview_images: string[];
  features: string[];
  pages_included: number;
  tier_compatibility: TemplateTier[];
  popular: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: TemplateCategory;       // join field
}

export interface Message {
  id: string;
  subject: string | null;
  content: string;
  from_admin: boolean;
  read: boolean;
  user_id: string;
  created_at: string;
}
```

---

## 4. FİYATLANDIRMA (src/lib/template-data.ts)

```typescript
export const TEMPLATE_TIER_PRICES: Record<TemplateTier, number> = {
  business_card: 50,
  starter: 100,
  professional: 150,
};
```

---

## 5. ANİMASYONLAR (src/lib/animations.ts)

Tüm sayfalarda kullanılan standart animasyonlar:

```typescript
import { fadeInUp, staggerContainer, viewportConfig, scaleIn } from "@/lib/animations";
// fadeInUp: y:40 → y:0, opacity: 0→1
// staggerContainer: staggerChildren: 0.1
// viewportConfig: { once: true, margin: "-100px" }
```

---

## 6. MEVCUT ROUTE YAPISI (src/App.tsx)

```tsx
<Route path="/:locale" element={<LocaleRouter />}>
  <Route element={<AppLayout />}>          // ← Header + Footer var
    ...
    <Route path="templates/:slug" element={<TemplateDetailPage />} />
    ...
  </Route>                                 // ← SATIR 75: AppLayout KAPANIR
                                           // ← YENİ VIEWER ROUTE BURAYA GELECEK
  <Route path="dashboard" element={<AuthGuard>...}>  // satır 78
  <Route path="admin" element={<AdminGuard>...}>     // satır 93
</Route>
```

---

## 7. TEMPLATE CARD MEVCUT DURUM (src/components/templates/TemplateCard.tsx)

Actions bölümü (satır 89-106):

```tsx
<div className="flex gap-2">
  {/* Preview → detail page */}
  <Link to={previewPath} className="flex-1 ...border-2... hover:bg-neo-yellow">
    <Eye size={14} />
    {t("templates.preview", "Preview")}
  </Link>
  {/* Order Now */}
  <button onClick={() => onOrder?.(template)} className="flex-1 ...bg-neo-lime...">
    <ShoppingCart size={14} />
    {t("templates.orderNow", "Order Now")}
  </button>
</div>
```

Mevcut imports: `{ Eye, ShoppingCart, Layers }` from lucide-react
Yeni import eklenecek: `Monitor`

---

## 8. TEMPLATE DETAIL PAGE EKLEME NOKTASI (src/pages/TemplateDetailPage.tsx)

Satır 267-279 arası (Tier Compatibility badge'leri):

```tsx
{/* Tier Compatibility */}
{template.tier_compatibility.length > 0 && (
  <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
    {template.tier_compatibility.map((tier) => (
      <NeoBadge key={tier} color="neo-blue">
        {tier.replace("_", " ").toUpperCase()}
      </NeoBadge>
    ))}
  </motion.div>
)}
// ← SATIR 280: BURADAN HEMEN SONRA Live Preview butonu eklenecek
```

Mevcut imports satır 6-12: `{ CheckCircle2, ArrowRight, ChevronRight, FileText, ArrowLeft }`
Yeni eklenecek: `Monitor`

---

## 9. ANALYTICS.TS EKLEME NOKTASI (src/lib/analytics.ts)

Satır 46-52 arası:

```typescript
// Dynamically load the gtag.js script
const script = document.createElement("script");
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
document.head.appendChild(script);

// ← SATIR 50: Noscript BURADAN HEMEN SONRA, gtmInitialized=true'dan önce eklenecek

gtmInitialized = true;
```

---

## 10. i18n DURUMU

✅ **TAMAMLANDI** — Tüm 4 locale dosyasına şu keyler eklendi:

```json
// src/i18n/locales/en.json → templates bölümüne:
"from": "From",
"liveDemo": "LIVE",
"livePreviewTitle": "LIVE PREVIEW",
"livePreviewUnavailable": "Live preview is not available for this template.",
"livePreviewUnavailableDesc": "This template does not have a live demo yet. Check the preview images on the detail page.",
"backToDetail": "BACK TO TEMPLATE",
"deviceDesktop": "Desktop",
"deviceTablet": "Tablet",
"deviceMobile": "Mobile",
"loadingPreview": "Loading preview...",
"openInNewTab": "OPEN IN NEW TAB"
```

FR/NL/DE çevirileri de mevcut. `contact.selectService` key'i de eklendi.

---

## 11. KALAN GÖREVLER (SIRAYLA YAPILACAK)

### GÖREV 1 ✅ — i18n (TAMAMLANDI)

---

### GÖREV 2 — YENİ DOSYA: `src/pages/TemplateViewerPage.tsx`

Full-screen iframe viewer. **AppLayout yok (Header/Footer yok).**
Route: `/:locale/templates/:slug/preview`

```tsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { fadeInUp } from "@/lib/animations";
import { TEMPLATE_TIER_PRICES } from "@/lib/template-data";
import type { Template, TemplateTier } from "@/types/database";

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTH: Record<Device, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export default function TemplateViewerPage() {
  const { t } = useTranslation();
  const { locale, slug } = useParams();
  const navigate = useNavigate();
  const currentLocale = locale ?? "en";

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState<Device>("desktop");
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    async function fetchTemplate() {
      setLoading(true);
      const { data } = await supabase
        .from("templates")
        .select("*, category:template_categories(*)")
        .eq("slug", slug)
        .eq("active", true)
        .single();

      setTemplate(data as Template | null);
      setLoading(false);
    }
    void fetchTemplate();
  }, [slug]);

  const lowestPrice = template?.tier_compatibility?.length
    ? Math.min(...template.tier_compatibility.map((t) => TEMPLATE_TIER_PRICES[t]))
    : TEMPLATE_TIER_PRICES.business_card;

  const detailPath = `/${currentLocale}/templates/${slug}`;
  const orderPath = `/${currentLocale}/templates/order?template=${slug}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <div className="neo-border bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("templates.loadingPreview", "Loading preview...")}
        </div>
      </div>
    );
  }

  // Template bulunamadı
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <div className="neo-border bg-neo-white shadow-hard p-10 max-w-md text-center">
          <p className="font-space font-bold text-xl uppercase text-neo-black mb-4">
            {t("templates.notFound", "Template not found")}
          </p>
          <Link
            to={`/${currentLocale}/templates`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-lime font-space font-bold uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
          >
            <ArrowLeft size={16} />
            {t("templates.backToTemplates", "All Templates")}
          </Link>
        </div>
      </div>
    );
  }

  // preview_url yok
  if (!template.preview_url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="neo-border bg-neo-white shadow-hard p-10 max-w-lg text-center"
        >
          <div className="w-16 h-16 border-2 border-neo-black bg-neo-yellow flex items-center justify-center mx-auto mb-6 shadow-hard">
            <Monitor size={32} className="text-neo-black" />
          </div>
          <h1 className="font-space font-bold text-2xl uppercase text-neo-black mb-3">
            {t("templates.livePreviewUnavailable", "Live preview is not available for this template.")}
          </h1>
          <p className="font-mono text-sm text-neo-black/70 mb-8 leading-relaxed">
            {t(
              "templates.livePreviewUnavailableDesc",
              "This template does not have a live demo yet. Check the preview images on the detail page."
            )}
          </p>
          <Link
            to={detailPath}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-lime font-space font-bold uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
          >
            <ArrowLeft size={16} />
            {t("templates.backToDetail", "BACK TO TEMPLATE")}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neo-bg flex flex-col">
      <Helmet>
        <title>{template.name} — Live Preview | DMC Kreatif</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* ── Sticky Toolbar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 border-b-2 border-neo-black bg-neo-white flex items-center px-4 gap-3 shadow-hard">
        {/* Back */}
        <Link
          to={detailPath}
          className="flex items-center gap-2 px-3 py-2 border-2 border-neo-black font-space font-bold text-xs uppercase hover:bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] transition-all shadow-hard-sm"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">{t("templates.backToDetail", "BACK TO TEMPLATE")}</span>
        </Link>

        {/* Template name */}
        <span className="font-space font-bold text-sm uppercase text-neo-black truncate flex-1 hidden sm:block">
          {template.name}
        </span>

        {/* Device toggles */}
        <div className="flex border-2 border-neo-black overflow-hidden">
          {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
            const Icon = d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDevice(d);
                  setIframeLoading(true);
                  setIframeError(false);
                }}
                className={`px-3 py-2 border-r-2 last:border-r-0 border-neo-black font-space font-bold text-xs uppercase transition-colors ${
                  device === d
                    ? "bg-neo-black text-neo-white"
                    : "bg-transparent hover:bg-neo-yellow"
                }`}
                title={t(`templates.device${d.charAt(0).toUpperCase() + d.slice(1)}`, d)}
              >
                <Icon size={14} />
              </button>
            );
          })}
        </div>

        {/* Price */}
        <span className="font-space font-bold text-sm text-neo-black hidden md:block">
          {t("templates.from", "From")} €{lowestPrice}
        </span>

        {/* Open in new tab */}
        <a
          href={template.preview_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 border-2 border-neo-black bg-transparent font-space font-bold text-xs uppercase hover:bg-neo-yellow transition-all shadow-hard-sm hidden sm:flex"
        >
          <ExternalLink size={14} />
          <span className="hidden lg:inline">{t("templates.openInNewTab", "OPEN IN NEW TAB")}</span>
        </a>

        {/* Order CTA */}
        <Link
          to={orderPath}
          className="flex items-center gap-2 px-4 py-2 border-2 border-neo-black bg-neo-lime font-space font-bold text-xs uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all whitespace-nowrap"
        >
          {t("templates.orderNow", "ORDER")}
        </Link>
      </div>

      {/* ── iframe area ── */}
      <div
        className="flex justify-center items-start bg-neo-bg transition-all duration-300"
        style={{ paddingTop: "56px", minHeight: "calc(100vh - 56px)" }}
      >
        {iframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neo-bg z-10" style={{ top: "56px" }}>
            <div className="neo-border bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
              {t("templates.loadingPreview", "Loading preview...")}
            </div>
          </div>
        )}

        {iframeError ? (
          <div className="flex flex-col items-center justify-center gap-6 p-10" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div className="neo-border bg-neo-white shadow-hard p-8 max-w-md text-center">
              <p className="font-space font-bold text-lg uppercase text-neo-black mb-2">
                {t("templates.previewBlocked", "Preview blocked by external site")}
              </p>
              <p className="font-mono text-sm text-neo-black/70 mb-6">
                {t("templates.openInNewTabDesc", "This site cannot be embedded. Open it in a new tab.")}
              </p>
              <a
                href={template.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-lime font-space font-bold uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
              >
                <ExternalLink size={16} />
                {t("templates.openInNewTab", "OPEN IN NEW TAB")}
              </a>
            </div>
          </div>
        ) : (
          <iframe
            key={`${slug}-${device}`}
            src={template.preview_url}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            title={`${template.name} — Live Preview`}
            className="border-2 border-neo-black bg-neo-white transition-all duration-300"
            style={{
              width: DEVICE_WIDTH[device],
              height: "calc(100vh - 56px)",
              maxWidth: "100vw",
            }}
            onLoad={() => setIframeLoading(false)}
            onError={() => {
              setIframeLoading(false);
              setIframeError(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
```

---

### GÖREV 3 — App.tsx GÜNCELLEME

**Dosya:** `src/App.tsx`

**1. Lazy import ekle** (satır 38'den sonra, diğer lazy import'ların sonuna):
```tsx
const TemplateViewerPage = lazy(() => import("@/pages/TemplateViewerPage"));
```

**2. Route ekle** (satır 75 `</Route>` kapandıktan HEMEN SONRA, satır 77 `{/* Client Dashboard */}` yorumundan önce):
```tsx
{/* Template Viewer — full-screen, no AppLayout */}
<Route path="templates/:slug/preview" element={<TemplateViewerPage />} />
```

**Sonuç şu şekilde görünmeli:**
```tsx
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/* Template Viewer — full-screen, no AppLayout */}
        <Route path="templates/:slug/preview" element={<TemplateViewerPage />} />
        {/* Client Dashboard (requires auth) */}
        <Route path="dashboard" ...>
```

---

### GÖREV 4 — TemplateDetailPage.tsx GÜNCELLEME

**Dosya:** `src/pages/TemplateDetailPage.tsx`

**1. Import ekle** (satır 6-12'deki import listesine `Monitor` ekle):
```tsx
import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  FileText,
  ArrowLeft,
  Monitor,   // ← EKLENDİ
} from "lucide-react";
```

**2. Live Preview butonu ekle** (satır 279'dan HEMEN SONRA, satır 280 `</motion.div>` kapanmadan önce değil, satır 280 `</motion.div>`'dan sonra):

Satır 278-283 şu an şöyle:
```tsx
                </motion.div>
              )}
            </motion.div>      // ← stagger container kapanıyor, satır 280
          </div>
        </div>
      </section>
```

`</motion.div>` kapanmadan (stagger içinde son eleman olarak) satır 279 sonrasına ekle:

```tsx
              {/* Live Preview Button */}
              {template.preview_url && (
                <motion.div variants={fadeInUp}>
                  <Link
                    to={`/${currentLocale}/templates/${template.slug}/preview`}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-yellow font-space font-bold text-sm uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
                  >
                    <Monitor size={16} />
                    {t("templates.livePreviewTitle", "LIVE PREVIEW")}
                  </Link>
                </motion.div>
              )}
```

---

### GÖREV 5 — TemplateCard.tsx GÜNCELLEME

**Dosya:** `src/components/templates/TemplateCard.tsx`

**1. Import ekle** (satır 4):
```tsx
import { Eye, ShoppingCart, Layers, Monitor } from "lucide-react";
```

**2. Aksiyon bölümüne LIVE butonu ekle** (satır 90 `<div className="flex gap-2">` içine, mevcut butonların ÖNÜNE):

```tsx
{/* Actions */}
<div className="flex gap-2">
  {/* LIVE butonu — sadece preview_url varsa */}
  {template.preview_url && (
    <Link
      to={`/${locale ?? "en"}/templates/${template.slug}/preview`}
      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-space font-bold uppercase tracking-wider border-2 border-neo-black bg-neo-yellow shadow-hard transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
    >
      <Monitor size={12} />
      {t("templates.liveDemo", "LIVE")}
    </Link>
  )}
  {/* Preview → detail page */}
  <Link
    to={previewPath}
    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-space font-bold uppercase tracking-wider border-2 border-neo-black bg-transparent shadow-hard transition-all duration-150 hover:bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
  >
    <Eye size={14} />
    {t("templates.preview", "Preview")}
  </Link>
  {/* Order Now */}
  <button
    type="button"
    onClick={() => onOrder?.(template)}
    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-space font-bold uppercase tracking-wider border-2 border-neo-black bg-neo-lime shadow-hard transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
  >
    <ShoppingCart size={14} />
    {t("templates.orderNow", "Order Now")}
  </button>
</div>
```

---

### GÖREV 6 — YENİ DOSYA: `src/lib/seed-templates.ts`

Supabase'e 20 şablon insert edecek yardımcı fonksiyon.

```typescript
import { supabase } from "@/lib/supabase";

interface TemplateSeedData {
  slug: string;
  name: string;
  category_slug: string;
  description: string;
  pages_included: number;
  tier_compatibility: string[];
  popular: boolean;
  features: string[];
  thumbnail_url: string;
  preview_url: null;
  preview_images: string[];
  sort_order: number;
  active: boolean;
}

const placeholder = (label: string) =>
  `https://placehold.co/800x450/121212/CDFF50?text=${encodeURIComponent(label)}`;

const pageImg = (templateName: string, page: string) =>
  `https://placehold.co/1280x800/FFFDF5/121212?text=${encodeURIComponent(`${templateName}+${page}`)}`;

const SEED_DATA: TemplateSeedData[] = [
  // ── RESTAURANT ──────────────────────────────────────────
  {
    slug: "savoria-restaurant",
    name: "Savoria Restaurant",
    category_slug: "restaurant",
    description: "Elegant restaurant website with online menu, reservation system, and gallery showcase. Perfect for fine dining establishments.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: true,
    features: ["Online Menu", "Reservation Form", "Photo Gallery", "Location Map", "Social Links", "Mobile Responsive"],
    thumbnail_url: placeholder("SAVORIA+RESTAURANT"),
    preview_url: null,
    preview_images: [
      pageImg("Savoria", "Home"),
      pageImg("Savoria", "Menu"),
      pageImg("Savoria", "Gallery"),
      pageImg("Savoria", "Contact"),
    ],
    sort_order: 1,
    active: true,
  },
  {
    slug: "bistro-modern",
    name: "Bistro Modern",
    category_slug: "restaurant",
    description: "Compact bistro template with a bold NeoBrutalist identity. Ideal for cafes, bakeries, and small eateries.",
    pages_included: 3,
    tier_compatibility: ["business_card", "starter"],
    popular: false,
    features: ["Menu Display", "Contact Form", "Social Links", "Mobile Responsive"],
    thumbnail_url: placeholder("BISTRO+MODERN"),
    preview_url: null,
    preview_images: [
      pageImg("Bistro Modern", "Home"),
      pageImg("Bistro Modern", "Menu"),
      pageImg("Bistro Modern", "Contact"),
    ],
    sort_order: 2,
    active: true,
  },
  // ── CONSTRUCTION ────────────────────────────────────────
  {
    slug: "buildcraft-construction",
    name: "BuildCraft Construction",
    category_slug: "construction",
    description: "Professional construction company website showcasing projects, services, and team. Trusted by contractors across Europe.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: true,
    features: ["Project Portfolio", "Services Grid", "Team Profiles", "Quote Form", "SEO Optimised", "Mobile Responsive"],
    thumbnail_url: placeholder("BUILDCRAFT"),
    preview_url: null,
    preview_images: [
      pageImg("BuildCraft", "Home"),
      pageImg("BuildCraft", "Projects"),
      pageImg("BuildCraft", "Services"),
      pageImg("BuildCraft", "Contact"),
    ],
    sort_order: 3,
    active: true,
  },
  {
    slug: "steelframe-builders",
    name: "SteelFrame Builders",
    category_slug: "construction",
    description: "Minimal construction template for local builders and renovation contractors. Quick setup, maximum impact.",
    pages_included: 3,
    tier_compatibility: ["business_card", "starter"],
    popular: false,
    features: ["Services List", "Contact Form", "Google Maps", "Mobile Responsive"],
    thumbnail_url: placeholder("STEELFRAME"),
    preview_url: null,
    preview_images: [
      pageImg("SteelFrame", "Home"),
      pageImg("SteelFrame", "Services"),
      pageImg("SteelFrame", "Contact"),
    ],
    sort_order: 4,
    active: true,
  },
  // ── BEAUTY SALON ─────────────────────────────────────────
  {
    slug: "glow-studio-salon",
    name: "Glow Studio Salon",
    category_slug: "beauty-salon",
    description: "Luxurious beauty salon template with online booking, treatment menu, and stylist showcase. Perfect for premium salons and spas.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: true,
    features: ["Online Booking", "Treatment Menu", "Team Showcase", "Before/After Gallery", "Reviews Section", "Mobile Responsive"],
    thumbnail_url: placeholder("GLOW+STUDIO"),
    preview_url: null,
    preview_images: [
      pageImg("Glow Studio", "Home"),
      pageImg("Glow Studio", "Services"),
      pageImg("Glow Studio", "Gallery"),
      pageImg("Glow Studio", "Book"),
    ],
    sort_order: 5,
    active: true,
  },
  {
    slug: "luxe-beauty",
    name: "Luxe Beauty",
    category_slug: "beauty-salon",
    description: "Sleek single-page beauty template for freelance stylists and small salons.",
    pages_included: 3,
    tier_compatibility: ["business_card", "starter"],
    popular: false,
    features: ["Service Prices", "Booking Form", "Instagram Feed", "Mobile Responsive"],
    thumbnail_url: placeholder("LUXE+BEAUTY"),
    preview_url: null,
    preview_images: [
      pageImg("Luxe Beauty", "Home"),
      pageImg("Luxe Beauty", "Services"),
      pageImg("Luxe Beauty", "Contact"),
    ],
    sort_order: 6,
    active: true,
  },
  // ── LAW FIRM ─────────────────────────────────────────────
  {
    slug: "legaledge-law",
    name: "LegalEdge Law Firm",
    category_slug: "law-firm",
    description: "Authoritative law firm website with practice area listings, attorney profiles, and case consultation forms.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: false,
    features: ["Practice Areas", "Attorney Profiles", "Case Evaluation Form", "Blog/Articles", "Testimonials", "Mobile Responsive"],
    thumbnail_url: placeholder("LEGALEDGE"),
    preview_url: null,
    preview_images: [
      pageImg("LegalEdge", "Home"),
      pageImg("LegalEdge", "Practice Areas"),
      pageImg("LegalEdge", "Team"),
      pageImg("LegalEdge", "Contact"),
    ],
    sort_order: 7,
    active: true,
  },
  {
    slug: "justice-pro",
    name: "Justice Pro",
    category_slug: "law-firm",
    description: "Clean and professional law office template. Ideal for solo attorneys and small practices.",
    pages_included: 3,
    tier_compatibility: ["business_card", "starter"],
    popular: false,
    features: ["Services Overview", "Contact Form", "Office Location", "Mobile Responsive"],
    thumbnail_url: placeholder("JUSTICE+PRO"),
    preview_url: null,
    preview_images: [
      pageImg("Justice Pro", "Home"),
      pageImg("Justice Pro", "Services"),
      pageImg("Justice Pro", "Contact"),
    ],
    sort_order: 8,
    active: true,
  },
  // ── MEDICAL ──────────────────────────────────────────────
  {
    slug: "medicare-plus",
    name: "MediCare Plus Clinic",
    category_slug: "medical",
    description: "Modern medical practice website with appointment booking, doctor profiles, and service department listings.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: true,
    features: ["Appointment Booking", "Doctor Profiles", "Departments", "Patient FAQ", "GDPR Compliant", "Mobile Responsive"],
    thumbnail_url: placeholder("MEDICARE+PLUS"),
    preview_url: null,
    preview_images: [
      pageImg("MediCare Plus", "Home"),
      pageImg("MediCare Plus", "Doctors"),
      pageImg("MediCare Plus", "Services"),
      pageImg("MediCare Plus", "Appointments"),
    ],
    sort_order: 9,
    active: true,
  },
  {
    slug: "healthpoint-clinic",
    name: "HealthPoint Clinic",
    category_slug: "medical",
    description: "Simple medical clinic template for general practitioners and dentists.",
    pages_included: 3,
    tier_compatibility: ["business_card", "starter"],
    popular: false,
    features: ["Service List", "Contact & Hours", "Map Integration", "Mobile Responsive"],
    thumbnail_url: placeholder("HEALTHPOINT"),
    preview_url: null,
    preview_images: [
      pageImg("HealthPoint", "Home"),
      pageImg("HealthPoint", "Services"),
      pageImg("HealthPoint", "Contact"),
    ],
    sort_order: 10,
    active: true,
  },
  // ── E-COMMERCE ───────────────────────────────────────────
  {
    slug: "shopflow-store",
    name: "ShopFlow E-Commerce",
    category_slug: "e-commerce",
    description: "Full-featured e-commerce template with product grid, cart, checkout flow, and order management. The complete online store solution.",
    pages_included: 7,
    tier_compatibility: ["professional"],
    popular: true,
    features: ["Product Grid", "Shopping Cart", "Checkout Flow", "Search & Filter", "Wishlist", "Order History", "Mobile Responsive"],
    thumbnail_url: placeholder("SHOPFLOW"),
    preview_url: null,
    preview_images: [
      pageImg("ShopFlow", "Home"),
      pageImg("ShopFlow", "Shop"),
      pageImg("ShopFlow", "Product"),
      pageImg("ShopFlow", "Cart"),
    ],
    sort_order: 11,
    active: true,
  },
  {
    slug: "marketpro-shop",
    name: "MarketPro Shop",
    category_slug: "e-commerce",
    description: "Streamlined product showcase template for small online stores and boutiques.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: false,
    features: ["Product Catalog", "Product Detail", "Contact/Order Form", "Featured Items", "Mobile Responsive"],
    thumbnail_url: placeholder("MARKETPRO"),
    preview_url: null,
    preview_images: [
      pageImg("MarketPro", "Home"),
      pageImg("MarketPro", "Products"),
      pageImg("MarketPro", "Product"),
      pageImg("MarketPro", "Contact"),
    ],
    sort_order: 12,
    active: true,
  },
  // ── REAL ESTATE ──────────────────────────────────────────
  {
    slug: "propertyvue-realty",
    name: "PropertyVue Realty",
    category_slug: "real-estate",
    description: "Premium real estate agency website with property listings, advanced search, and agent profiles.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: false,
    features: ["Property Listings", "Search & Filter", "Agent Profiles", "Virtual Tour Link", "Mortgage Calculator", "Mobile Responsive"],
    thumbnail_url: placeholder("PROPERTYVUE"),
    preview_url: null,
    preview_images: [
      pageImg("PropertyVue", "Home"),
      pageImg("PropertyVue", "Listings"),
      pageImg("PropertyVue", "Property"),
      pageImg("PropertyVue", "Contact"),
    ],
    sort_order: 13,
    active: true,
  },
  {
    slug: "homefinder-agency",
    name: "HomeFinder Agency",
    category_slug: "real-estate",
    description: "Simple property agency template for independent brokers and small real estate offices.",
    pages_included: 3,
    tier_compatibility: ["business_card", "starter"],
    popular: false,
    features: ["Featured Properties", "Contact Form", "Office Location", "Mobile Responsive"],
    thumbnail_url: placeholder("HOMEFINDER"),
    preview_url: null,
    preview_images: [
      pageImg("HomeFinder", "Home"),
      pageImg("HomeFinder", "Properties"),
      pageImg("HomeFinder", "Contact"),
    ],
    sort_order: 14,
    active: true,
  },
  // ── AUTOMOTIVE ───────────────────────────────────────────
  {
    slug: "autodrive-motors",
    name: "AutoDrive Motors",
    category_slug: "automotive",
    description: "Dynamic automotive dealership website with inventory showcase, financing info, and service booking.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: false,
    features: ["Car Inventory", "Financing Info", "Service Booking", "Brand Partners", "Test Drive Form", "Mobile Responsive"],
    thumbnail_url: placeholder("AUTODRIVE"),
    preview_url: null,
    preview_images: [
      pageImg("AutoDrive", "Home"),
      pageImg("AutoDrive", "Inventory"),
      pageImg("AutoDrive", "Services"),
      pageImg("AutoDrive", "Contact"),
    ],
    sort_order: 15,
    active: true,
  },
  {
    slug: "motorhub-garage",
    name: "MotorHub Garage",
    category_slug: "automotive",
    description: "Compact mechanic shop template for local garages, tire shops, and auto repair services.",
    pages_included: 3,
    tier_compatibility: ["business_card", "starter"],
    popular: false,
    features: ["Services List", "Booking Form", "Hours & Location", "Mobile Responsive"],
    thumbnail_url: placeholder("MOTORHUB"),
    preview_url: null,
    preview_images: [
      pageImg("MotorHub", "Home"),
      pageImg("MotorHub", "Services"),
      pageImg("MotorHub", "Contact"),
    ],
    sort_order: 16,
    active: true,
  },
  // ── EDUCATION ────────────────────────────────────────────
  {
    slug: "eduportal-academy",
    name: "EduPortal Academy",
    category_slug: "education",
    description: "Complete educational institution website with course catalog, enrollment forms, and faculty directory.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: true,
    features: ["Course Catalog", "Enrollment Form", "Faculty Profiles", "Events Calendar", "Alumni Section", "Mobile Responsive"],
    thumbnail_url: placeholder("EDUPORTAL"),
    preview_url: null,
    preview_images: [
      pageImg("EduPortal", "Home"),
      pageImg("EduPortal", "Courses"),
      pageImg("EduPortal", "Faculty"),
      pageImg("EduPortal", "Enroll"),
    ],
    sort_order: 17,
    active: true,
  },
  {
    slug: "learnspace-school",
    name: "LearnSpace School",
    category_slug: "education",
    description: "Clean school website template for primary and secondary schools, tutoring centers, and language institutes.",
    pages_included: 3,
    tier_compatibility: ["business_card", "starter"],
    popular: false,
    features: ["Programs Overview", "Contact Form", "Schedule Display", "Mobile Responsive"],
    thumbnail_url: placeholder("LEARNSPACE"),
    preview_url: null,
    preview_images: [
      pageImg("LearnSpace", "Home"),
      pageImg("LearnSpace", "Programs"),
      pageImg("LearnSpace", "Contact"),
    ],
    sort_order: 18,
    active: true,
  },
  // ── TECHNOLOGY ───────────────────────────────────────────
  {
    slug: "techforge-startup",
    name: "TechForge Startup",
    category_slug: "technology",
    description: "Bold SaaS and tech startup landing page with feature grids, pricing tables, and demo CTAs. Built to convert.",
    pages_included: 5,
    tier_compatibility: ["starter", "professional"],
    popular: true,
    features: ["Hero with CTA", "Feature Grid", "Pricing Table", "Testimonials", "FAQ Section", "Mobile Responsive"],
    thumbnail_url: placeholder("TECHFORGE"),
    preview_url: null,
    preview_images: [
      pageImg("TechForge", "Home"),
      pageImg("TechForge", "Features"),
      pageImg("TechForge", "Pricing"),
      pageImg("TechForge", "Contact"),
    ],
    sort_order: 19,
    active: true,
  },
  {
    slug: "bytestack-saas",
    name: "ByteStack SaaS",
    category_slug: "technology",
    description: "Multi-page SaaS platform website with product documentation links, changelog, and enterprise features section.",
    pages_included: 7,
    tier_compatibility: ["professional"],
    popular: false,
    features: ["Hero + Demo CTA", "Feature Comparison", "Pricing Tiers", "Changelog", "Blog/Docs Link", "Enterprise Section", "Mobile Responsive"],
    thumbnail_url: placeholder("BYTESTACK"),
    preview_url: null,
    preview_images: [
      pageImg("ByteStack", "Home"),
      pageImg("ByteStack", "Features"),
      pageImg("ByteStack", "Pricing"),
      pageImg("ByteStack", "Docs"),
    ],
    sort_order: 20,
    active: true,
  },
];

export async function seedTemplates(
  client: typeof supabase
): Promise<{ success: boolean; message: string; count?: number }> {
  try {
    // category_slug'lardan ID'leri al
    const { data: categories, error: catError } = await client
      .from("template_categories")
      .select("id, slug");

    if (catError || !categories) {
      return { success: false, message: `Failed to fetch categories: ${catError?.message}` };
    }

    const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

    // Seed verisini hazırla
    const rows = SEED_DATA.map(({ category_slug, ...rest }) => {
      const category_id = categoryMap.get(category_slug);
      if (!category_id) {
        console.warn(`Category not found: ${category_slug}`);
      }
      return { ...rest, category_id: category_id ?? "" };
    }).filter((r) => r.category_id !== "");

    // Upsert (slug unique — tekrar basılırsa duplicate olmaz)
    const { error: insertError, count } = await client
      .from("templates")
      .upsert(rows, { onConflict: "slug", count: "exact" });

    if (insertError) {
      return { success: false, message: `Upsert failed: ${insertError.message}` };
    }

    return {
      success: true,
      message: `Successfully seeded ${count ?? rows.length} templates`,
      count: count ?? rows.length,
    };
  } catch (err) {
    return { success: false, message: String(err) };
  }
}
```

---

### GÖREV 7 — TemplatesAdminPage.tsx GÜNCELLEME

**Dosya:** `src/pages/admin/TemplatesAdminPage.tsx`

**1. Import ekle** (diğer import'ların yanına):
```tsx
import { seedTemplates } from "@/lib/seed-templates";
```

**2. State ekle** (satır 60 civarı, diğer state'lerin yanına):
```tsx
const [seeding, setSeeding] = useState(false);
```

**3. Handler ekle** (fetchData fonksiyonundan sonra):
```tsx
const handleSeedTemplates = async () => {
  setSeeding(true);
  const result = await seedTemplates(supabase);
  setSeeding(false);
  if (result.success) {
    // toast veya alert — mevcut notification sistemi varsa onu kullan
    alert(`✅ ${result.message}`);
    void fetchData(); // listeyi yenile
  } else {
    alert(`❌ ${result.message}`);
  }
};
```

**4. Templates tab'ine buton ekle** (templates tabının başına, tablonun üstüne):
```tsx
{/* Seed Button */}
<div className="flex justify-end mb-4">
  <button
    type="button"
    onClick={() => void handleSeedTemplates()}
    disabled={seeding}
    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-neo-black bg-neo-yellow font-space font-bold text-sm uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {seeding ? "⏳ Seeding..." : "🌱 Seed 20 Templates"}
  </button>
</div>
```

---

### GÖREV 8 — TemplateOrderPage.tsx GÜNCELLEME

**Dosya:** `src/pages/TemplateOrderPage.tsx`

Satır 241 (`const orderData = ...`) ile satır 243 (`trackConversion(...)`) arasına admin bildirim kodu ekle:

```tsx
const orderData = order as { id: string; order_number: string };

// Admin bildirim mesajı gönder
try {
  const { data: admins } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "ADMIN")
    .limit(1);

  if (admins?.[0]) {
    await supabase.from("messages").insert({
      subject: `New Template Order: ${orderData.order_number}`,
      content: `Template: ${selectedTemplate?.name ?? slug}\nTier: ${selectedTier}\nBusiness: ${result.data.business_name}\nContact: ${result.data.contact_name} (${result.data.contact_email})\nPrice: EUR ${price}`,
      from_admin: false,
      read: false,
      user_id: admins[0].id,
    });
  }
} catch {
  // Bildirim hatası siparişi engellememeli
}

trackConversion(price, "EUR");
```

**Not:** `result.data` = form verisi (react-hook-form). Bu fonksiyonun içinde hangi değişken isimlerinin kullanıldığını kontrol et. Satır 207-240 aralığını oku.

---

### GÖREV 9 — analytics.ts GÜNCELLEME

**Dosya:** `src/lib/analytics.ts`

Satır 49 (`document.head.appendChild(script);`) ile satır 51 (`gtmInitialized = true;`) arasına noscript ekle:

```typescript
document.head.appendChild(script);

// GTM noscript fallback (no-JS environments)
if (document.body) {
  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${measurementId}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.cssText = "display:none;visibility:hidden";
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
}

gtmInitialized = true;
```

---

### GÖREV 10 — BUILD DOĞRULAMA

```bash
cd C:\Projects\CLAUDE-BOT\dmckreatif-vite

# TypeScript hata kontrolü
npx tsc --noEmit

# Vite production build
npm run build
```

**Beklenen sonuç:**
- TypeScript: 0 hata
- Vite build: ✓ built in X.XXs
- dist/ klasörü oluşmalı

---

## 12. PROJE DOSYA YAPISI (ÖNEMLİ DOSYALAR)

```
src/
├── App.tsx                         ← Route kayıt
├── types/database.ts               ← Template, TemplateTier tipleri
├── lib/
│   ├── supabase.ts                 ← Supabase client
│   ├── analytics.ts                ← GTM / gtag
│   ├── template-data.ts            ← TEMPLATE_TIER_PRICES
│   ├── animations.ts               ← fadeInUp, staggerContainer, viewportConfig
│   └── seed-templates.ts           ← [YENİ DOSYA] 20 template seed
├── pages/
│   ├── TemplatesPage.tsx           ← Liste sayfası
│   ├── TemplateDetailPage.tsx      ← Detay sayfası
│   ├── TemplateOrderPage.tsx       ← Sipariş formu
│   ├── TemplateOrderConfirmPage.tsx← Sipariş onay
│   └── TemplateViewerPage.tsx      ← [YENİ DOSYA] Canlı iframe viewer
│   └── admin/
│       └── TemplatesAdminPage.tsx  ← Admin panel (templates tab'i)
├── components/
│   ├── templates/
│   │   ├── TemplateCard.tsx        ← Kart bileşeni
│   │   ├── TemplatePreviewGallery.tsx
│   │   ├── TemplateTierCard.tsx
│   │   └── TemplateCategoryFilter.tsx
│   └── ui/
│       ├── NeoButton.tsx
│       ├── NeoCard.tsx
│       └── NeoBadge.tsx
└── i18n/
    └── locales/
        ├── en.json  ✅ 11 yeni key eklendi
        ├── fr.json  ✅ 11 yeni key eklendi
        ├── nl.json  ✅ 11 yeni key eklendi
        └── de.json  ✅ 11 yeni key eklendi
```

---

## 13. ÖNEMLİ TAILWIND CSS SINIFLARI

```
bg-neo-bg      → #FFFDF5 (krem beyaz)
bg-neo-black   → #121212
bg-neo-white   → #FFFFFF
bg-neo-lime    → #CDFF50
bg-neo-yellow  → #FFE500
bg-neo-blue    → #4D9FFF
neo-border     → border-2 border-neo-black
shadow-hard    → 4px 4px 0px #121212
shadow-hard-sm → 2px 2px 0px #121212
font-space     → Space Grotesk
font-mono      → JetBrains Mono
```

---

## 14. YENİ CHAT İÇİN BAŞLANGIC PROMPTU

```
Sen DMC Kreatif ajansının lead developer'ısın.
Proje: C:\Projects\CLAUDE-BOT\dmckreatif-vite\
Tech: React 18.2 + Vite + TypeScript + Tailwind CSS v4 (NeoBrutalist) + Supabase

HANDOFF.md dosyasını oku ve "Kalan Görevler" bölümündeki tüm görevleri sırayla uygula.

GÖREV DURUMU:
✅ Görev 1 — i18n keyler (4 locale) TAMAMLANDI
⏳ Görev 2 — TemplateViewerPage.tsx (YENİ DOSYA oluştur)
⏳ Görev 3 — App.tsx route kayıt
⏳ Görev 4 — TemplateDetailPage Live Preview butonu
⏳ Görev 5 — TemplateCard LIVE butonu
⏳ Görev 6 — seed-templates.ts (YENİ DOSYA oluştur)
⏳ Görev 7 — TemplatesAdminPage seed butonu
⏳ Görev 8 — TemplateOrderPage admin bildirimi
⏳ Görev 9 — analytics.ts GTM noscript
⏳ Görev 10 — Build doğrulama (tsc + npm run build)

Tüm görev kodları HANDOFF.md'de hazır. Sadece kopyalayıp uygula, başka soru sorma.
```

---

## 15. YAKIN ZAMANDA YAPILAN DEĞİŞİKLİKLER (SON SESSION)

Bu session'da yapılanlar:
1. **i18n locales** (en, fr, nl, de) — 11 yeni template key eklendi (`liveDemo`, `livePreviewTitle`, `backToDetail`, `deviceDesktop/Tablet/Mobile`, `loadingPreview`, `openInNewTab`, `from`)
2. **contact.selectService** key'i tüm 4 locale'e eklendi

Bunların dışında hiçbir dosya değiştirilmedi. Build hâlâ ✅ geçiyor.

---

*HANDOFF.md sonu. Bu dosyayı yeni Opus chat'inde projeyi anlat başlangıcında oku.*
