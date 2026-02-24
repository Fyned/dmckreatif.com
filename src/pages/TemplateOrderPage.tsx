import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  ImageIcon,
  AlertTriangle,
  Palette,
} from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import SectionHeader from "@/components/ui/SectionHeader";
import OrderStepper from "@/components/templates/OrderStepper";
import TemplateTierCard from "@/components/templates/TemplateTierCard";
import FileUpload from "@/components/ui/FileUpload";
import ColorPicker from "@/components/ui/ColorPicker";
import {
  templateTiers,
  TEMPLATE_TIER_PRICES,
} from "@/lib/template-data";
import {
  trackAddToCart,
  trackBeginCheckout,
  trackConversion,
} from "@/lib/analytics";
import { supabase } from "@/lib/supabase";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import type { TemplateTier } from "@/types/database";

/* ── Zod Schema ── */
const orderSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  contact_name: z.string().min(1, "Contact name is required"),
  contact_email: z.string().email("Please enter a valid email"),
  contact_phone: z.string().optional(),
  business_industry: z.string().optional(),
  business_description: z.string().min(10, "Description must be at least 10 characters"),
  business_address: z.string().optional(),
  business_hours: z.string().optional(),
  business_services: z.string().optional(),
  business_slogan: z.string().optional(),
  special_requests: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

/* ── Types ── */
interface TemplateCategory {
  id: string;
  name: string;
  slug: string;
}

interface Template {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  preview_images: string[];
  features: string[];
  pages_included: number;
  tiers: string[];
  category: TemplateCategory | null;
}

const STEP_LABELS = ["SELECT", "CUSTOMIZE", "BUSINESS INFO", "REVIEW & ORDER"];

export default function TemplateOrderPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentLocale = locale ?? "en";

  /* ── Step State ── */
  const [step, setStep] = useState(1);

  /* ── Template & Tier ── */
  const preselectedSlug = searchParams.get("template");
  const preselectedTier = searchParams.get("tier") as TemplateTier | null;

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [selectedTier, setSelectedTier] = useState<TemplateTier | null>(
    preselectedTier
  );
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);

  /* ── Customization State ── */
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#121212");
  const [secondaryColor, setSecondaryColor] = useState("#CDFF50");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  /* ── Form & Submit ── */
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<OrderFormData>();

  /* ── Fetch template(s) ── */
  useEffect(() => {
    async function fetchTemplates() {
      if (preselectedSlug) {
        const { data } = await supabase
          .from("templates")
          .select("*, category:template_categories(*)")
          .eq("slug", preselectedSlug)
          .eq("active", true)
          .single();

        if (data) {
          setSelectedTemplate(data as Template);
        }
      }

      const { data: all } = await supabase
        .from("templates")
        .select("*, category:template_categories(*)")
        .eq("active", true)
        .order("sort_order");

      if (all) {
        setAllTemplates(all as Template[]);
      }
    }

    fetchTemplates();
  }, [preselectedSlug]);

  /* ── Navigation ── */
  const canProceedStep1 = selectedTemplate !== null && selectedTier !== null;

  function goNext() {
    if (step === 1 && canProceedStep1 && selectedTier) {
      const tierPrice = TEMPLATE_TIER_PRICES[selectedTier];
      trackAddToCart(
        selectedTemplate?.slug ?? "",
        selectedTemplate?.name ?? "",
        selectedTier,
        tierPrice
      );
    }
    if (step === 3 && selectedTier) {
      trackBeginCheckout(
        selectedTemplate?.slug ?? "",
        selectedTemplate?.name ?? "",
        selectedTier,
        TEMPLATE_TIER_PRICES[selectedTier]
      );
    }
    setStep((prev) => Math.min(prev + 1, 4));
  }

  function goBack() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  /* ── File Upload Handlers ── */
  const handleLogoUpload = useCallback((url: string) => {
    setLogoUrl(url);
  }, []);

  const handleImagesUpload = useCallback(
    (url: string) => {
      setUploadedImages((prev) => {
        if (prev.length >= 10) return prev;
        return [...prev, url];
      });
    },
    []
  );

  const removeImage = useCallback((index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /* ── Submit Order ── */
  const onSubmit = async (data: OrderFormData) => {
    if (!selectedTemplate || !selectedTier) return;

    setSubmitStatus("loading");

    const result = orderSchema.safeParse(data);
    if (!result.success) {
      setSubmitStatus("error");
      return;
    }

    const price = TEMPLATE_TIER_PRICES[selectedTier];

    const { data: order, error } = await supabase
      .from("template_orders")
      .insert({
        template_id: selectedTemplate.id,
        tier: selectedTier,
        business_name: result.data.business_name,
        business_industry: result.data.business_industry || null,
        contact_name: result.data.contact_name,
        contact_email: result.data.contact_email,
        contact_phone: result.data.contact_phone || null,
        brand_colors: { primary: primaryColor, secondary: secondaryColor },
        logo_url: logoUrl || null,
        images: uploadedImages,
        business_description: result.data.business_description || null,
        special_requests: result.data.special_requests || null,
        business_address: result.data.business_address || null,
        business_hours: result.data.business_hours || null,
        business_services: result.data.business_services || null,
        business_slogan: result.data.business_slogan || null,
        price,
        currency: "EUR",
        locale: currentLocale,
      })
      .select()
      .single();

    if (error || !order) {
      setSubmitStatus("error");
      return;
    }

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
          content: `Template: ${selectedTemplate?.name ?? preselectedSlug}\nTier: ${selectedTier}\nBusiness: ${result.data.business_name}\nContact: ${result.data.contact_name} (${result.data.contact_email})\nPrice: EUR ${price}`,
          from_admin: false,
          read: false,
          user_id: admins[0].id,
        });
      }
    } catch {
      // Bildirim hatası siparişi engellememeli
    }

    trackConversion(price, "EUR");
    navigate(
      `/${currentLocale}/templates/order/confirm/${orderData.id}`
    );
  };

  /* ── Shared input classes ── */
  const inputClass =
    "w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all placeholder:text-neo-black/30";
  const labelClass =
    "font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2";

  /* ── Derived ── */
  const price = selectedTier ? TEMPLATE_TIER_PRICES[selectedTier] : 0;

  return (
    <>
      <Helmet>
        <title>
          {t(
            "seo.templates.orderTitle",
            "Order Template \u2014 DMC Kreatif"
          )}
        </title>
        <meta
          name="description"
          content={t(
            "seo.templates.orderDescription",
            "Order a premium website template. Customize, provide your business info, and launch your site."
          )}
        />
      </Helmet>

      <section className="py-12 lg:py-20">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          {/* Stepper */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12"
          >
            <OrderStepper steps={STEP_LABELS} currentStep={step} />
          </motion.div>

          {/* ═══════════════ STEP 1: SELECT ═══════════════ */}
          {step === 1 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <SectionHeader
                title={t(
                  "templates.order.step1Title",
                  "SELECT TEMPLATE & TIER"
                )}
                subtitle={t("templates.order.step1Subtitle", "STEP 01")}
              />

              {/* Template Selection */}
              {selectedTemplate ? (
                <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-1">
                        {t(
                          "templates.order.selectedTemplate",
                          "Selected Template"
                        )}
                      </span>
                      <h3 className="font-space font-bold text-xl text-neo-black">
                        {selectedTemplate.name}
                      </h3>
                      {selectedTemplate.category && (
                        <NeoBadge color="neo-yellow" className="mt-2">
                          {selectedTemplate.category.name}
                        </NeoBadge>
                      )}
                    </div>
                    <NeoButton
                      onClick={() => setSelectedTemplate(null)}
                      variant="outline"
                      size="sm"
                    >
                      {t("templates.order.change", "Change")}
                    </NeoButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className={labelClass}>
                    {t(
                      "templates.order.chooseTemplate",
                      "Choose a Template"
                    )}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allTemplates.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => setSelectedTemplate(tmpl)}
                        className="text-left border-2 border-neo-black bg-neo-white shadow-hard p-4 hover:border-neo-lime hover:shadow-hard-sm transition-all duration-200"
                      >
                        <h4 className="font-space font-bold text-sm text-neo-black mb-1">
                          {tmpl.name}
                        </h4>
                        {tmpl.category && (
                          <span className="font-mono text-xs text-neo-black/60">
                            {tmpl.category.name}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tier Selection */}
              <div>
                <label className={labelClass}>
                  {t("templates.order.chooseTier", "Choose Your Package")}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {templateTiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() =>
                        setSelectedTier(tier.id as TemplateTier)
                      }
                      className={`text-left transition-all duration-200 ${
                        selectedTier === tier.id
                          ? "ring-4 ring-neo-lime ring-offset-2"
                          : ""
                      }`}
                    >
                      <TemplateTierCard
                        tier={tier}
                        selected={selectedTier === tier.id}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-4">
                <NeoButton
                  onClick={goNext}
                  color="neo-lime"
                  disabled={!canProceedStep1}
                >
                  {t("templates.order.next", "Next")}{" "}
                  <ArrowRight size={16} />
                </NeoButton>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ STEP 2: CUSTOMIZE ═══════════════ */}
          {step === 2 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <SectionHeader
                title={t(
                  "templates.order.step2Title",
                  "CUSTOMIZE YOUR TEMPLATE"
                )}
                subtitle={t("templates.order.step2Subtitle", "STEP 02")}
              />

              {/* Logo Upload */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6 lg:p-8">
                <label className={labelClass}>
                  {t("templates.order.logoUpload", "Upload Your Logo")}
                </label>
                <p className="font-mono text-xs text-neo-black/60 mb-4">
                  {t(
                    "templates.order.logoHint",
                    "PNG, JPG or SVG. Recommended: 512x512px or higher."
                  )}
                </p>
                <FileUpload
                  bucket="order-uploads"
                  path={`logos/${Date.now()}`}
                  onUpload={handleLogoUpload}
                  accept="image/*"
                />
                {logoUrl && (
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-16 h-16 border-2 border-neo-black bg-neo-bg overflow-hidden">
                      <img
                        src={logoUrl}
                        alt={t("templates.order.logoPreview", "Logo preview")}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <NeoBadge color="neo-green">
                      <CheckCircle2 size={12} className="mr-1" />
                      {t("templates.order.uploaded", "Uploaded")}
                    </NeoBadge>
                  </div>
                )}
              </div>

              {/* Color Pickers */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6 lg:p-8">
                <label className={labelClass}>
                  <Palette size={16} className="inline mr-2" />
                  {t("templates.order.brandColors", "Brand Colors")}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-2">
                      {t("templates.order.primaryColor", "Primary Color")}
                    </span>
                    <ColorPicker
                      value={primaryColor}
                      onChange={setPrimaryColor}
                    />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-2">
                      {t(
                        "templates.order.secondaryColor",
                        "Secondary Color"
                      )}
                    </span>
                    <ColorPicker
                      value={secondaryColor}
                      onChange={setSecondaryColor}
                    />
                  </div>
                </div>
              </div>

              {/* Images Upload */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6 lg:p-8">
                <label className={labelClass}>
                  <ImageIcon size={16} className="inline mr-2" />
                  {t("templates.order.imagesUpload", "Upload Images")}
                </label>
                <p className="font-mono text-xs text-neo-black/60 mb-4">
                  {t(
                    "templates.order.imagesHint",
                    "Upload up to 10 images for your website. Products, team photos, office, etc."
                  )}
                </p>
                {uploadedImages.length < 10 && (
                  <FileUpload
                    bucket="order-uploads"
                    path={`images/${Date.now()}`}
                    onUpload={handleImagesUpload}
                    accept="image/*"
                  />
                )}

                {/* Image Thumbnails */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                    {uploadedImages.map((img, idx) => (
                      <div
                        key={`${img}-${idx}`}
                        className="relative group"
                      >
                        <div className="aspect-square border-2 border-neo-black overflow-hidden bg-neo-bg">
                          <img
                            src={img}
                            alt={`${t("templates.order.imageAlt", "Upload")} ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-neo-red border-2 border-neo-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={t(
                            "templates.order.removeImage",
                            "Remove image"
                          )}
                        >
                          <Trash2
                            size={12}
                            className="text-neo-white"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="font-mono text-xs text-neo-black/40 mt-3">
                  {uploadedImages.length}/10{" "}
                  {t("templates.order.imagesUploaded", "images uploaded")}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <NeoButton onClick={goBack} variant="outline">
                  <ArrowLeft size={16} />{" "}
                  {t("templates.order.back", "Back")}
                </NeoButton>
                <NeoButton onClick={goNext} color="neo-lime">
                  {t("templates.order.next", "Next")}{" "}
                  <ArrowRight size={16} />
                </NeoButton>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ STEP 3: BUSINESS INFO ═══════════════ */}
          {step === 3 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <SectionHeader
                title={t(
                  "templates.order.step3Title",
                  "YOUR BUSINESS INFORMATION"
                )}
                subtitle={t("templates.order.step3Subtitle", "STEP 03")}
              />

              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6 lg:p-10 space-y-6">
                {/* Business Name & Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>
                      {t(
                        "templates.order.businessName",
                        "Business Name"
                      )}{" "}
                      *
                    </label>
                    <input
                      type="text"
                      {...register("business_name", {
                        required: t(
                          "templates.order.businessNameRequired",
                          "Business name is required"
                        ),
                      })}
                      className={inputClass}
                      placeholder={t(
                        "templates.order.businessNamePlaceholder",
                        "Acme Corp"
                      )}
                    />
                    {errors.business_name && (
                      <span className="font-mono text-xs text-neo-red mt-1 block">
                        {errors.business_name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t(
                        "templates.order.businessIndustry",
                        "Business Industry"
                      )}
                    </label>
                    <input
                      type="text"
                      {...register("business_industry")}
                      className={inputClass}
                      placeholder={t(
                        "templates.order.industryPlaceholder",
                        "Restaurant, Construction, Salon..."
                      )}
                    />
                  </div>
                </div>

                {/* Contact Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>
                      {t(
                        "templates.order.contactName",
                        "Contact Name"
                      )}{" "}
                      *
                    </label>
                    <input
                      type="text"
                      {...register("contact_name", {
                        required: t(
                          "templates.order.contactNameRequired",
                          "Contact name is required"
                        ),
                      })}
                      className={inputClass}
                      placeholder={t(
                        "templates.order.contactNamePlaceholder",
                        "John Doe"
                      )}
                    />
                    {errors.contact_name && (
                      <span className="font-mono text-xs text-neo-red mt-1 block">
                        {errors.contact_name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t(
                        "templates.order.contactEmail",
                        "Contact Email"
                      )}{" "}
                      *
                    </label>
                    <input
                      type="email"
                      {...register("contact_email", {
                        required: t(
                          "templates.order.emailRequired",
                          "Email is required"
                        ),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t(
                            "templates.order.emailInvalid",
                            "Please enter a valid email"
                          ),
                        },
                      })}
                      className={inputClass}
                      placeholder={t(
                        "templates.order.emailPlaceholder",
                        "john@company.com"
                      )}
                    />
                    {errors.contact_email && (
                      <span className="font-mono text-xs text-neo-red mt-1 block">
                        {errors.contact_email.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>
                      {t(
                        "templates.order.contactPhone",
                        "Contact Phone"
                      )}
                    </label>
                    <input
                      type="tel"
                      {...register("contact_phone")}
                      className={inputClass}
                      placeholder={t(
                        "templates.order.phonePlaceholder",
                        "+33 6 12 34 56 78"
                      )}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t(
                        "templates.order.businessAddress",
                        "Business Address"
                      )}
                    </label>
                    <input
                      type="text"
                      {...register("business_address")}
                      className={inputClass}
                      placeholder={t(
                        "templates.order.addressPlaceholder",
                        "123 Rue de la Paix, Paris"
                      )}
                    />
                  </div>
                </div>

                {/* Business Hours & Slogan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>
                      {t(
                        "templates.order.businessHours",
                        "Business Hours"
                      )}
                    </label>
                    <input
                      type="text"
                      {...register("business_hours")}
                      className={inputClass}
                      placeholder={t(
                        "templates.order.hoursPlaceholder",
                        "Mon-Fri 9:00-18:00"
                      )}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {t(
                        "templates.order.businessSlogan",
                        "Business Slogan"
                      )}
                    </label>
                    <input
                      type="text"
                      {...register("business_slogan")}
                      className={inputClass}
                      placeholder={t(
                        "templates.order.sloganPlaceholder",
                        "Your tagline or motto"
                      )}
                    />
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className={labelClass}>
                    {t(
                      "templates.order.businessServices",
                      "Services You Offer"
                    )}
                  </label>
                  <textarea
                    {...register("business_services")}
                    rows={3}
                    className={`${inputClass} resize-vertical`}
                    placeholder={t(
                      "templates.order.servicesPlaceholder",
                      "Web design, branding, consulting..."
                    )}
                  />
                </div>

                {/* Business Description */}
                <div>
                  <label className={labelClass}>
                    {t(
                      "templates.order.businessDescription",
                      "Business Description"
                    )}{" "}
                    *
                  </label>
                  <textarea
                    {...register("business_description", {
                      required: t(
                        "templates.order.descriptionRequired",
                        "Business description is required"
                      ),
                      minLength: {
                        value: 10,
                        message: t(
                          "templates.order.descriptionMinLength",
                          "Description must be at least 10 characters"
                        ),
                      },
                    })}
                    rows={5}
                    className={`${inputClass} resize-vertical`}
                    placeholder={t(
                      "templates.order.descriptionPlaceholder",
                      "Tell us about your business. We'll use this to generate your website content."
                    )}
                  />
                  {errors.business_description && (
                    <span className="font-mono text-xs text-neo-red mt-1 block">
                      {errors.business_description.message}
                    </span>
                  )}
                  <p className="font-mono text-xs text-neo-black/40 mt-2">
                    {t(
                      "templates.order.descriptionHint",
                      "We'll use AI to generate your website content based on this description."
                    )}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <NeoButton onClick={goBack} variant="outline">
                  <ArrowLeft size={16} />{" "}
                  {t("templates.order.back", "Back")}
                </NeoButton>
                <NeoButton onClick={goNext} color="neo-lime">
                  {t("templates.order.next", "Next")}{" "}
                  <ArrowRight size={16} />
                </NeoButton>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ STEP 4: REVIEW & ORDER ═══════════════ */}
          {step === 4 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <SectionHeader
                title={t(
                  "templates.order.step4Title",
                  "REVIEW & PLACE ORDER"
                )}
                subtitle={t("templates.order.step4Subtitle", "STEP 04")}
              />

              {/* Order Summary Card */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6 lg:p-8 space-y-6">
                <h3 className="font-space font-bold text-lg uppercase tracking-wider border-b-2 border-neo-black pb-3">
                  {t("templates.order.orderSummary", "Order Summary")}
                </h3>

                {/* Template + Tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-1">
                      {t("templates.order.template", "Template")}
                    </span>
                    <span className="font-space font-bold text-base text-neo-black">
                      {selectedTemplate?.name}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-1">
                      {t("templates.order.package", "Package")}
                    </span>
                    <NeoBadge color="neo-lime">
                      {selectedTier
                        ? selectedTier.replace("_", " ").toUpperCase()
                        : ""}
                    </NeoBadge>
                  </div>
                </div>

                {/* Colors Preview */}
                <div>
                  <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-2">
                    {t("templates.order.brandColors", "Brand Colors")}
                  </span>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 border-2 border-neo-black"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <span className="font-mono text-xs text-neo-black/80">
                        {primaryColor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 border-2 border-neo-black"
                        style={{ backgroundColor: secondaryColor }}
                      />
                      <span className="font-mono text-xs text-neo-black/80">
                        {secondaryColor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Logo + Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-2">
                      {t("templates.order.logo", "Logo")}
                    </span>
                    {logoUrl ? (
                      <div className="w-16 h-16 border-2 border-neo-black bg-neo-bg overflow-hidden">
                        <img
                          src={logoUrl}
                          alt={t("templates.order.logoPreview", "Logo preview")}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <span className="font-mono text-xs text-neo-black/40">
                        {t("templates.order.noLogo", "No logo uploaded")}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-2">
                      {t("templates.order.images", "Images")}
                    </span>
                    <span className="font-mono text-sm text-neo-black font-bold">
                      {uploadedImages.length}{" "}
                      {t(
                        "templates.order.imagesCount",
                        "images uploaded"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Info Summary */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6 lg:p-8 space-y-4">
                <h3 className="font-space font-bold text-lg uppercase tracking-wider border-b-2 border-neo-black pb-3">
                  {t(
                    "templates.order.businessSummary",
                    "Business Information"
                  )}
                </h3>
                {[
                  {
                    label: t("templates.order.businessName", "Business Name"),
                    value: getValues("business_name"),
                  },
                  {
                    label: t("templates.order.contactName", "Contact Name"),
                    value: getValues("contact_name"),
                  },
                  {
                    label: t("templates.order.contactEmail", "Contact Email"),
                    value: getValues("contact_email"),
                  },
                  {
                    label: t("templates.order.contactPhone", "Contact Phone"),
                    value: getValues("contact_phone"),
                  },
                  {
                    label: t(
                      "templates.order.businessIndustry",
                      "Business Industry"
                    ),
                    value: getValues("business_industry"),
                  },
                  {
                    label: t(
                      "templates.order.businessAddress",
                      "Business Address"
                    ),
                    value: getValues("business_address"),
                  },
                  {
                    label: t(
                      "templates.order.businessHours",
                      "Business Hours"
                    ),
                    value: getValues("business_hours"),
                  },
                  {
                    label: t(
                      "templates.order.businessSlogan",
                      "Business Slogan"
                    ),
                    value: getValues("business_slogan"),
                  },
                ].map(
                  (item) =>
                    item.value && (
                      <div
                        key={item.label}
                        className="flex items-start gap-4"
                      >
                        <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider w-36 flex-shrink-0">
                          {item.label}
                        </span>
                        <span className="font-mono text-sm text-neo-black">
                          {item.value}
                        </span>
                      </div>
                    )
                )}
              </div>

              {/* Special Requests */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6 lg:p-8">
                <label className={labelClass}>
                  {t(
                    "templates.order.specialRequests",
                    "Special Requests"
                  )}
                </label>
                <textarea
                  {...register("special_requests")}
                  rows={3}
                  className={`${inputClass} resize-vertical`}
                  placeholder={t(
                    "templates.order.specialRequestsPlaceholder",
                    "Any additional notes or requirements..."
                  )}
                />
              </div>

              {/* Price & Notices */}
              <div className="border-2 border-neo-black bg-neo-lime/10 shadow-hard p-6 lg:p-8 text-center space-y-4">
                <span className="font-mono text-sm text-neo-black/60 uppercase tracking-wider block">
                  {t("templates.order.total", "Total")}
                </span>
                <span className="font-space font-bold text-3xl lg:text-4xl text-neo-black block">
                  {"\u20AC"}{price}
                </span>

                <div className="space-y-2 pt-4">
                  <p className="font-mono text-xs text-neo-black/60">
                    {t(
                      "templates.order.domainNotice",
                      "Domain registration billed separately (\u20AC15-25/year)"
                    )}
                  </p>
                  <p className="font-mono text-xs text-neo-black/60">
                    {t(
                      "templates.order.noRevisions",
                      "Template packages do not include revision rights"
                    )}
                  </p>
                </div>
              </div>

              {/* Error */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-3 p-4 border-2 border-neo-red bg-neo-red/10">
                  <AlertTriangle
                    size={20}
                    className="text-neo-red flex-shrink-0"
                  />
                  <p className="font-mono text-sm text-neo-red">
                    {t(
                      "templates.order.errorMessage",
                      "Something went wrong. Please try again."
                    )}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <NeoButton onClick={goBack} variant="outline">
                  <ArrowLeft size={16} />{" "}
                  {t("templates.order.back", "Back")}
                </NeoButton>
                <NeoButton
                  onClick={handleSubmit(onSubmit)}
                  color="neo-lime"
                  size="lg"
                  disabled={submitStatus === "loading"}
                  className="min-w-[220px]"
                >
                  {submitStatus === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-neo-black border-t-transparent animate-spin" />
                      {t(
                        "templates.order.processing",
                        "Processing..."
                      )}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={18} />
                      {t(
                        "templates.order.placeOrder",
                        "PLACE ORDER"
                      )}
                    </span>
                  )}
                </NeoButton>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
