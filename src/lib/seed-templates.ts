import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

/* ── Category seed data ─────────────────────────────── */

interface CategorySeedData {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  active: boolean;
}

const CATEGORY_SEED_DATA: CategorySeedData[] = [
  { slug: "restaurant", name: "Restaurant & Cafe", description: "Templates for restaurants, cafes, bistros, and food businesses", icon: "UtensilsCrossed", color: "#FF6B6B", sort_order: 1, active: true },
  { slug: "construction", name: "Construction & Building", description: "Templates for construction companies, contractors, and builders", icon: "HardHat", color: "#4ECDC4", sort_order: 2, active: true },
  { slug: "beauty-salon", name: "Beauty & Wellness", description: "Templates for salons, spas, and beauty professionals", icon: "Sparkles", color: "#FFB5E8", sort_order: 3, active: true },
  { slug: "law-firm", name: "Law & Legal", description: "Templates for law firms, attorneys, and legal practices", icon: "Scale", color: "#C4B5FD", sort_order: 4, active: true },
  { slug: "medical", name: "Medical & Health", description: "Templates for clinics, doctors, and healthcare providers", icon: "HeartPulse", color: "#67E8F9", sort_order: 5, active: true },
  { slug: "e-commerce", name: "E-Commerce & Shop", description: "Templates for online stores, boutiques, and product showcases", icon: "ShoppingBag", color: "#FCD34D", sort_order: 6, active: true },
  { slug: "real-estate", name: "Real Estate", description: "Templates for agencies, brokers, and property showcases", icon: "Home", color: "#86EFAC", sort_order: 7, active: true },
  { slug: "automotive", name: "Automotive", description: "Templates for car dealerships, garages, and auto services", icon: "Car", color: "#F87171", sort_order: 8, active: true },
  { slug: "education", name: "Education", description: "Templates for schools, academies, and tutoring centers", icon: "GraduationCap", color: "#818CF8", sort_order: 9, active: true },
  { slug: "technology", name: "Technology & SaaS", description: "Templates for startups, SaaS platforms, and tech companies", icon: "Cpu", color: "#38BDF8", sort_order: 10, active: true },
];

export async function seedCategories(
  client: typeof supabase
): Promise<{ success: boolean; message: string; count?: number }> {
  try {
    const { error, count } = await client
      .from("template_categories")
      .upsert(CATEGORY_SEED_DATA, { onConflict: "slug", count: "exact" });

    if (error) {
      return { success: false, message: `Category upsert failed: ${error.message}` };
    }

    return {
      success: true,
      message: `Successfully seeded ${count ?? CATEGORY_SEED_DATA.length} categories`,
      count: count ?? CATEGORY_SEED_DATA.length,
    };
  } catch (err) {
    return { success: false, message: String(err) };
  }
}

/* ── Template seed data ─────────────────────────────── */

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
  preview_url: string | null;
  preview_images: string[];
  sort_order: number;
  active: boolean;
}

const unsplash = (id: string, w = 800, h = 450) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

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
    thumbnail_url: unsplash("1414235077428-338989a2e8c0"),
    preview_url: "/demos/savoria-restaurant.html",
    preview_images: [
      unsplash("1414235077428-338989a2e8c0", 1280, 800),
      unsplash("1504674900247-0877df9cc836", 1280, 800),
      unsplash("1517248135467-4c7edcad34c4", 1280, 800),
      unsplash("1559339352-11d035aa65de", 1280, 800),
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
    thumbnail_url: unsplash("1554118811-1e0d58224f24"),
    preview_url: "/demos/bistro-modern.html",
    preview_images: [
      unsplash("1554118811-1e0d58224f24", 1280, 800),
      unsplash("1495474472287-4d71bcdd2085", 1280, 800),
      unsplash("1559925393-8be0ec4767c8", 1280, 800),
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
    thumbnail_url: unsplash("1504307651254-35680f356dfd"),
    preview_url: "/demos/buildcraft-construction.html",
    preview_images: [
      unsplash("1504307651254-35680f356dfd", 1280, 800),
      unsplash("1541888946425-d81bb19240f5", 1280, 800),
      unsplash("1503387762-592deb58ef4e", 1280, 800),
      unsplash("1581094794329-c8112a89af12", 1280, 800),
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
    thumbnail_url: unsplash("1590644365607-1c5a5e72b3e5"),
    preview_url: "/demos/steelframe-builders.html",
    preview_images: [
      unsplash("1590644365607-1c5a5e72b3e5", 1280, 800),
      unsplash("1581094288338-2314dddb7ece", 1280, 800),
      unsplash("1572981779307-38b8cabb2407", 1280, 800),
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
    thumbnail_url: unsplash("1560066984-138dadb4c035"),
    preview_url: "/demos/glow-studio-salon.html",
    preview_images: [
      unsplash("1560066984-138dadb4c035", 1280, 800),
      unsplash("1522337360788-8b13dee7a37e", 1280, 800),
      unsplash("1521590832167-7228fcb2e204", 1280, 800),
      unsplash("1633681122560-5056f5fa1796", 1280, 800),
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
    thumbnail_url: unsplash("1487412947147-5cebf100ffc2"),
    preview_url: "/demos/luxe-beauty.html",
    preview_images: [
      unsplash("1487412947147-5cebf100ffc2", 1280, 800),
      unsplash("1570172619644-dfd03ed5d881", 1280, 800),
      unsplash("1596755389378-c31d21fd1273", 1280, 800),
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
    thumbnail_url: unsplash("1589829545856-d10d557cf95f"),
    preview_url: "/demos/legaledge-law.html",
    preview_images: [
      unsplash("1589829545856-d10d557cf95f", 1280, 800),
      unsplash("1507003211169-0a1dd7228f2d", 1280, 800),
      unsplash("1573497019940-1c28c88b4f3e", 1280, 800),
      unsplash("1450101499163-c8848e968838", 1280, 800),
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
    thumbnail_url: unsplash("1521791055366-0d553872125f"),
    preview_url: "/demos/justice-pro.html",
    preview_images: [
      unsplash("1521791055366-0d553872125f", 1280, 800),
      unsplash("1575505586569-646b2ca898fc", 1280, 800),
      unsplash("1423592707957-3b212afa6b8d", 1280, 800),
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
    thumbnail_url: unsplash("1519494026892-80bbd2d6fd0d"),
    preview_url: "/demos/medicare-plus.html",
    preview_images: [
      unsplash("1519494026892-80bbd2d6fd0d", 1280, 800),
      unsplash("1579684385127-1ef15d508118", 1280, 800),
      unsplash("1631217868264-e5b90bb7e133", 1280, 800),
      unsplash("1666214280557-091e5cbe3e35", 1280, 800),
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
    thumbnail_url: unsplash("1538108149393-fbbd81895907"),
    preview_url: "/demos/healthpoint-clinic.html",
    preview_images: [
      unsplash("1538108149393-fbbd81895907", 1280, 800),
      unsplash("1551076805-e1869033e561", 1280, 800),
      unsplash("1629909613654-28e377c37b09", 1280, 800),
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
    thumbnail_url: unsplash("1523275335684-37898b6baf30"),
    preview_url: "/demos/shopflow-store.html",
    preview_images: [
      unsplash("1523275335684-37898b6baf30", 1280, 800),
      unsplash("1542291026-7eec264c27ff", 1280, 800),
      unsplash("1560343090-f0409e92791a", 1280, 800),
      unsplash("1491553895911-0055eca6402d", 1280, 800),
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
    thumbnail_url: unsplash("1602143407151-7111542de6e8"),
    preview_url: "/demos/marketpro-shop.html",
    preview_images: [
      unsplash("1602143407151-7111542de6e8", 1280, 800),
      unsplash("1583394838336-acd977736f90", 1280, 800),
      unsplash("1611930022073-b7a4ba5fcccd", 1280, 800),
      unsplash("1585386959984-a4155224a1ad", 1280, 800),
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
    thumbnail_url: unsplash("1600596542815-ffad4c1539a9"),
    preview_url: "/demos/propertyvue-realty.html",
    preview_images: [
      unsplash("1600596542815-ffad4c1539a9", 1280, 800),
      unsplash("1564013799919-ab600027ffc6", 1280, 800),
      unsplash("1600047509807-ba8f99d2cdde", 1280, 800),
      unsplash("1512917774080-9991f1c4c750", 1280, 800),
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
    thumbnail_url: unsplash("1600607687939-ce8a6c25118c"),
    preview_url: "/demos/homefinder-agency.html",
    preview_images: [
      unsplash("1600607687939-ce8a6c25118c", 1280, 800),
      unsplash("1605276374104-dee2a0ed3cd6", 1280, 800),
      unsplash("1600585154526-990dced4db0d", 1280, 800),
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
    thumbnail_url: unsplash("1503376780353-7e6692767b70"),
    preview_url: "/demos/autodrive-motors.html",
    preview_images: [
      unsplash("1503376780353-7e6692767b70", 1280, 800),
      unsplash("1555215695-3004980ad54e", 1280, 800),
      unsplash("1606664515524-ed2f786a0bd6", 1280, 800),
      unsplash("1580273916550-e323be2ae537", 1280, 800),
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
    thumbnail_url: unsplash("1625047509248-ec889cbff17f"),
    preview_url: "/demos/motorhub-garage.html",
    preview_images: [
      unsplash("1625047509248-ec889cbff17f", 1280, 800),
      unsplash("1486262715619-67b85e0b08d3", 1280, 800),
      unsplash("1558618666-fcd25c85f1aa", 1280, 800),
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
    thumbnail_url: unsplash("1523050854058-8df90110c476"),
    preview_url: "/demos/eduportal-academy.html",
    preview_images: [
      unsplash("1523050854058-8df90110c476", 1280, 800),
      unsplash("1517694712202-14dd9538aa97", 1280, 800),
      unsplash("1552664730-d307ca884978", 1280, 800),
      unsplash("1541462608143-67571c6738dd", 1280, 800),
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
    thumbnail_url: unsplash("1503676260728-1c00da094a0b"),
    preview_url: "/demos/learnspace-school.html",
    preview_images: [
      unsplash("1503676260728-1c00da094a0b", 1280, 800),
      unsplash("1580582932707-520aed937b7b", 1280, 800),
      unsplash("1497633762265-9d179a990aa6", 1280, 800),
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
    thumbnail_url: unsplash("1555066931-4365d14bab8c"),
    preview_url: "/demos/techforge-startup.html",
    preview_images: [
      unsplash("1555066931-4365d14bab8c", 1280, 800),
      unsplash("1517694712202-14dd9538aa97", 1280, 800),
      unsplash("1460925895917-afdab827c52f", 1280, 800),
      unsplash("1504639725590-34d0984388bd", 1280, 800),
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
    thumbnail_url: unsplash("1460925895917-afdab827c52f"),
    preview_url: "/demos/bytestack-saas.html",
    preview_images: [
      unsplash("1460925895917-afdab827c52f", 1280, 800),
      unsplash("1551288049-bebda4e38f71", 1280, 800),
      unsplash("1531497865144-0464ef8fb9a9", 1280, 800),
      unsplash("1498050108023-c5249f4df085", 1280, 800),
    ],
    sort_order: 20,
    active: true,
  },
];

export async function seedTemplates(
  client: typeof supabase
): Promise<{ success: boolean; message: string; count?: number }> {
  try {
    // Önce kategorileri seed et (yoksa oluştur, varsa güncelle)
    const catResult = await seedCategories(client);
    if (!catResult.success) {
      return { success: false, message: `Category seed failed: ${catResult.message}` };
    }

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
        logger.warn("seed-templates", `Category not found: ${category_slug}`);
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
      message: `Seeded ${catResult.count ?? 10} categories + ${count ?? rows.length} templates`,
      count: count ?? rows.length,
    };
  } catch (err) {
    return { success: false, message: String(err) };
  }
}
