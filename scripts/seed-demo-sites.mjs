/**
 * Seed 20 demo sites — one per template — as published projects.
 * Run: node scripts/seed-demo-sites.mjs
 *
 * Authenticates as the admin user using email/password.
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://mjewxaphcmricetqpejv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZXd4YXBoY21yaWNldHFwZWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzI1MjcsImV4cCI6MjA4MTc0ODUyN30.gyKqCIaE4_iA0BBqMQFSnVPRLKzftV7W95a6RL_fDxs";

const ADMIN_EMAIL = "admin@dmckreatif.com";
const ADMIN_PASSWORD = "Admin123!";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DEMOS_DIR = path.resolve(__dirname, "../public/demos");

/** Demo site metadata per template slug. */
const DEMO_SITES = [
  {
    slug: "savoria-restaurant",
    name: "Savoria — Fine Dining Restaurant",
    subdomain: "savoria-demo",
    seo: {
      title: "Savoria — Fine Dining Restaurant Paris",
      description:
        "Experience award-winning French cuisine at Savoria. Fine dining in the heart of Paris since 2012.",
    },
    business: { business_name: "Savoria Restaurant", primary_color: "#CDFF50" },
  },
  {
    slug: "bistro-modern",
    name: "Bistro Modern — Contemporary Dining",
    subdomain: "bistro-demo",
    seo: {
      title: "Bistro Modern — Contemporary European Dining",
      description:
        "Modern European bistro with seasonal menus and a relaxed atmosphere. Open daily for lunch and dinner.",
    },
    business: { business_name: "Bistro Modern", primary_color: "#E8A87C" },
  },
  {
    slug: "buildcraft-construction",
    name: "BuildCraft Construction — Premium Builders",
    subdomain: "buildcraft-demo",
    seo: {
      title: "BuildCraft Construction — Building Excellence Since 1985",
      description:
        "Premium construction services for residential and commercial projects. Quality craftsmanship guaranteed.",
    },
    business: { business_name: "BuildCraft Construction", primary_color: "#F59E0B" },
  },
  {
    slug: "steelframe-builders",
    name: "SteelFrame Builders — Industrial Construction",
    subdomain: "steelframe-demo",
    seo: {
      title: "SteelFrame Builders — Industrial & Commercial Construction",
      description:
        "Specializing in steel frame construction for warehouses, factories, and commercial buildings across Europe.",
    },
    business: { business_name: "SteelFrame Builders", primary_color: "#3B82F6" },
  },
  {
    slug: "glow-studio-salon",
    name: "Glow Studio — Beauty & Wellness Salon",
    subdomain: "glow-demo",
    seo: {
      title: "Glow Studio Salon — Beauty & Wellness",
      description:
        "Premium beauty salon offering hair, skin, and wellness treatments. Discover your glow today.",
    },
    business: { business_name: "Glow Studio Salon", primary_color: "#EC4899" },
  },
  {
    slug: "luxe-beauty",
    name: "Luxe Beauty — Luxury Spa & Salon",
    subdomain: "luxe-demo",
    seo: {
      title: "Luxe Beauty — Luxury Spa & Beauty Treatments",
      description:
        "Indulge in luxury spa treatments and beauty services. Expert stylists and therapists at your service.",
    },
    business: { business_name: "Luxe Beauty", primary_color: "#D4A574" },
  },
  {
    slug: "legaledge-law",
    name: "LegalEdge — Law Firm",
    subdomain: "legaledge-demo",
    seo: {
      title: "LegalEdge Law Firm — Expert Legal Services",
      description:
        "Trusted legal advisors for business, family, and criminal law. Protecting your rights since 1998.",
    },
    business: { business_name: "LegalEdge Law Firm", primary_color: "#1E3A5F" },
  },
  {
    slug: "justice-pro",
    name: "Justice Pro — Attorneys at Law",
    subdomain: "justice-demo",
    seo: {
      title: "Justice Pro — Attorneys & Legal Consultants",
      description:
        "Professional legal representation for individuals and businesses. Justice served with excellence.",
    },
    business: { business_name: "Justice Pro", primary_color: "#7C3AED" },
  },
  {
    slug: "medicare-plus",
    name: "MediCare Plus — Medical Clinic",
    subdomain: "medicare-demo",
    seo: {
      title: "MediCare Plus Clinic — Comprehensive Healthcare",
      description:
        "State-of-the-art medical clinic providing primary care, specialists, and diagnostic services.",
    },
    business: { business_name: "MediCare Plus Clinic", primary_color: "#10B981" },
  },
  {
    slug: "healthpoint-clinic",
    name: "HealthPoint — Family Health Clinic",
    subdomain: "healthpoint-demo",
    seo: {
      title: "HealthPoint Clinic — Your Family Health Partner",
      description:
        "Compassionate healthcare for the whole family. Book your appointment today with our expert doctors.",
    },
    business: { business_name: "HealthPoint Clinic", primary_color: "#06B6D4" },
  },
  {
    slug: "shopflow-store",
    name: "ShopFlow — E-Commerce Store",
    subdomain: "shopflow-demo",
    seo: {
      title: "ShopFlow — Modern Online Store",
      description:
        "Discover quality products at great prices. Free shipping on orders over 50 EUR. Shop now!",
    },
    business: { business_name: "ShopFlow Store", primary_color: "#F43F5E" },
  },
  {
    slug: "marketpro-shop",
    name: "MarketPro — Digital Marketplace",
    subdomain: "marketpro-demo",
    seo: {
      title: "MarketPro — Your Premium Digital Marketplace",
      description:
        "Browse thousands of products from verified sellers. Secure payments and fast delivery guaranteed.",
    },
    business: { business_name: "MarketPro Shop", primary_color: "#8B5CF6" },
  },
  {
    slug: "propertyvue-realty",
    name: "PropertyVue — Real Estate Agency",
    subdomain: "propertyvue-demo",
    seo: {
      title: "PropertyVue Realty — Find Your Dream Property",
      description:
        "Premium real estate agency offering residential and commercial properties across major European cities.",
    },
    business: { business_name: "PropertyVue Realty", primary_color: "#059669" },
  },
  {
    slug: "homefinder-agency",
    name: "HomeFinder — Property Agency",
    subdomain: "homefinder-demo",
    seo: {
      title: "HomeFinder Agency — Your Home Search Starts Here",
      description:
        "Expert real estate agents helping you find the perfect home. Free property valuations available.",
    },
    business: { business_name: "HomeFinder Agency", primary_color: "#D97706" },
  },
  {
    slug: "autodrive-motors",
    name: "AutoDrive — Motors & Dealership",
    subdomain: "autodrive-demo",
    seo: {
      title: "AutoDrive Motors — Premium Car Dealership",
      description:
        "New and pre-owned vehicles at competitive prices. Expert servicing and financing available.",
    },
    business: { business_name: "AutoDrive Motors", primary_color: "#DC2626" },
  },
  {
    slug: "motorhub-garage",
    name: "MotorHub — Auto Garage & Service",
    subdomain: "motorhub-demo",
    seo: {
      title: "MotorHub Garage — Expert Auto Repair & Service",
      description:
        "Full-service auto repair garage. MOT testing, servicing, and bodywork specialists since 2005.",
    },
    business: { business_name: "MotorHub Garage", primary_color: "#EA580C" },
  },
  {
    slug: "eduportal-academy",
    name: "EduPortal — Online Academy",
    subdomain: "eduportal-demo",
    seo: {
      title: "EduPortal Academy — Learn Without Limits",
      description:
        "Online courses and certifications from industry experts. Start learning today with EduPortal.",
    },
    business: { business_name: "EduPortal Academy", primary_color: "#2563EB" },
  },
  {
    slug: "learnspace-school",
    name: "LearnSpace — Modern School",
    subdomain: "learnspace-demo",
    seo: {
      title: "LearnSpace School — Inspiring Future Leaders",
      description:
        "Progressive education for children aged 3-18. Nurturing curiosity, creativity, and confidence.",
    },
    business: { business_name: "LearnSpace School", primary_color: "#16A34A" },
  },
  {
    slug: "techforge-startup",
    name: "TechForge — Tech Startup",
    subdomain: "techforge-demo",
    seo: {
      title: "TechForge — Innovative Technology Solutions",
      description:
        "Building the future of tech. AI-powered solutions for modern businesses. Join the revolution.",
    },
    business: { business_name: "TechForge", primary_color: "#6366F1" },
  },
  {
    slug: "bytestack-saas",
    name: "ByteStack — SaaS Platform",
    subdomain: "bytestack-demo",
    seo: {
      title: "ByteStack — All-in-One SaaS Platform",
      description:
        "Streamline your workflow with ByteStack. Project management, analytics, and collaboration in one place.",
    },
    business: { business_name: "ByteStack", primary_color: "#0EA5E9" },
  },
];

async function main() {
  console.log("🔐 Authenticating as admin...");
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

  if (authError || !authData.user) {
    console.error("❌ Auth failed:", authError?.message);
    process.exit(1);
  }

  const userId = authData.user.id;
  console.log(`✅ Logged in as ${userId}\n`);
  console.log("🚀 Seeding 20 demo sites...\n");

  // Get existing demo sites to skip
  const { data: existing } = await supabase
    .from("user_projects")
    .select("subdomain")
    .eq("user_id", userId);

  const existingSubdomains = new Set(
    (existing ?? []).map((e) => e.subdomain).filter(Boolean),
  );

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const demo of DEMO_SITES) {
    // Skip if already exists
    if (existingSubdomains.has(demo.subdomain)) {
      console.log(`  ⏭️  ${demo.subdomain} — already exists, skipping`);
      skipped++;
      continue;
    }

    // Read demo HTML file
    const htmlPath = path.join(DEMOS_DIR, `${demo.slug}.html`);
    if (!fs.existsSync(htmlPath)) {
      console.log(`  ⚠️  ${demo.slug} — no demo HTML file, skipping`);
      skipped++;
      continue;
    }

    const publishedHtml = fs.readFileSync(htmlPath, "utf-8");

    // Extract body content for custom_html (strip DOCTYPE, html, head, body wrappers)
    const bodyMatch = publishedHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const customHtml = bodyMatch ? bodyMatch[1].trim() : publishedHtml;

    // Extract CSS from <style> tags
    const styleMatch = publishedHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const customCss = styleMatch ? styleMatch[1].trim() : "";

    // Get template_id
    const { data: tmpl } = await supabase
      .from("templates")
      .select("id")
      .eq("slug", demo.slug)
      .single();

    const now = new Date().toISOString();

    const { error } = await supabase.from("user_projects").insert({
      user_id: userId,
      template_slug: demo.slug,
      template_id: tmpl?.id ?? null,
      project_name: demo.name,
      custom_html: customHtml,
      custom_css: customCss,
      published_html: publishedHtml,
      published: true,
      status: "published",
      subdomain: demo.subdomain,
      published_at: now,
      business_info: {
        ...demo.business,
        email: "",
        phone: "",
        address: "",
        hours: "",
        slogan: "",
        short_description: "",
        social_facebook: "",
        social_instagram: "",
        social_twitter: "",
        social_linkedin: "",
        secondary_color: "#111111",
      },
      seo_settings: {
        ...demo.seo,
        lang: "en",
        favicon: "",
        ogImage: "",
        keywords: "",
        canonical: "",
        noIndex: false,
      },
    });

    if (error) {
      console.log(`  ❌ ${demo.subdomain} — ERROR: ${error.message}`);
      errors++;
    } else {
      console.log(`  ✅ ${demo.subdomain} — created`);
      created++;
    }
  }

  console.log(
    `\n📊 Done! Created: ${created}, Skipped: ${skipped}, Errors: ${errors}`,
  );

  await supabase.auth.signOut();
}

main().catch(console.error);
