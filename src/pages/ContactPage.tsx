import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertTriangle, Mail, Globe, ArrowRight, Clock, MapPin, Star, ExternalLink } from "lucide-react";
import { z } from "zod";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { supabase } from "@/lib/supabase";
import JsonLd from "@/components/seo/JsonLd";
import { buildLocalBusinessSchema } from "@/lib/seo-schemas";
import { fadeInUp, viewportConfig } from "@/lib/animations";

const EU_PHONE_REGEX = /^(\+?\d{1,4}[\s.-]?)?\(?\d{1,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{2,4}[\s.-]?\d{0,4}$/;

const RATE_LIMIT_KEY = "dmc_contact_last_submit";
const RATE_LIMIT_MS = 5 * 60 * 1000;

function isRateLimited(): boolean {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return false;
  return Date.now() - parseInt(last, 10) < RATE_LIMIT_MS;
}

function setRateLimitTimestamp(): void {
  localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
}

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional().refine(
    (val) => !val || EU_PHONE_REGEX.test(val),
    "Please enter a valid phone number"
  ),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

type SubmitStatus = "idle" | "loading" | "success" | "error" | "rate-limited";

const serviceOptions = [
  { value: "", labelKey: "contact.selectService" },
  { value: "template-card", labelKey: "contact.serviceTemplateCard" },
  { value: "template-starter", labelKey: "contact.serviceTemplateStarter" },
  { value: "template-pro", labelKey: "contact.serviceTemplatePro" },
  { value: "launch", labelKey: "contact.serviceLaunch" },
  { value: "growth", labelKey: "contact.serviceGrowth" },
  { value: "scale", labelKey: "contact.serviceScale" },
  { value: "commerce", labelKey: "contact.serviceCommerce" },
];

const budgetOptions = [
  { value: "", labelKey: "contact.selectBudget" },
  { value: "under-500", labelKey: "contact.budgetUnder500" },
  { value: "500-1000", labelKey: "contact.budget500" },
  { value: "1000-2000", labelKey: "contact.budget1000" },
  { value: "2000-3000", labelKey: "contact.budget2000" },
  { value: "3000+", labelKey: "contact.budget3000" },
];

const timelineOptions = [
  { value: "", labelKey: "contact.selectTimeline" },
  { value: "asap", labelKey: "contact.timelineAsap" },
  { value: "1-2-weeks", labelKey: "contact.timeline1_2Weeks" },
  { value: "1-month", labelKey: "contact.timeline1Month" },
  { value: "2-3-months", labelKey: "contact.timeline2_3Months" },
  { value: "flexible", labelKey: "contact.timelineFlexible" },
];

const countries = [
  { flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
  { flag: "\u{1F1E7}\u{1F1EA}", name: "Belgium" },
  { flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
  { flag: "\u{1F1F3}\u{1F1F1}", name: "Netherlands" },
  { flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { flag: "\u{1F1E8}\u{1F1ED}", name: "Switzerland" },
];

export default function ContactPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    if (data.website && data.website.length > 0) {
      setSubmitStatus("success");
      return;
    }

    if (isRateLimited()) {
      setSubmitStatus("rate-limited");
      return;
    }

    setSubmitStatus("loading");

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      setSubmitStatus("error");
      return;
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name: result.data.name,
      email: result.data.email,
      company: result.data.company ?? null,
      phone: result.data.phone ?? null,
      service: result.data.service ?? null,
      budget: result.data.budget ?? null,
      timeline: result.data.timeline ?? null,
      message: result.data.message,
      locale: locale ?? "en",
    });

    if (error) {
      setSubmitStatus("error");
      return;
    }

    setRateLimitTimestamp();
    setSubmitStatus("success");
    reset();
  };

  return (
    <>
      <SeoHead
        title={t("seo.contact.title", "Contact — DMC Kreatif")}
        description={t("seo.contact.description", "Get in touch with DMC Kreatif. Premium web development for European businesses.")}
        path="/contact"
      />

      <JsonLd data={buildLocalBusinessSchema()} />

      <Breadcrumbs items={[{ label: t("nav.contact", "CONTACT") }]} />

      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("contact.title", "Get in Touch")}
            subtitle={t("contact.subtitle", "CONTACT")}
          />

          {/* SEO intro paragraph */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12 max-w-3xl"
          >
            <h2 className="font-space font-bold text-xl lg:text-2xl text-neo-black mb-4">
              {t("contact.introHeading", "Start a Conversation About Your Project")}
            </h2>
            <p className="font-mono text-sm lg:text-base text-neo-black/70 leading-relaxed">
              {t("contact.introText", "Whether you need a new website, want to redesign an existing one, or are exploring e-commerce options, we are here to help.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:col-span-2"
            >
              {submitStatus === "success" ? (
                <div className="border-2 border-neo-black bg-neo-lime/20 shadow-hard p-10 text-center">
                  <CheckCircle2
                    size={48}
                    className="text-neo-green mx-auto mb-4"
                  />
                  <h3 className="font-space font-bold text-2xl text-neo-black mb-3">
                    {t("contact.successTitle", "Message sent!")}
                  </h3>
                  <p className="font-mono text-sm text-neo-black/70 mb-6">
                    {t(
                      "contact.successDescription",
                      "Thank you for reaching out. We will get back to you within 24 hours."
                    )}
                  </p>
                  <NeoButton
                    onClick={() => setSubmitStatus("idle")}
                    color="neo-lime"
                  >
                    {t("contact.sendAnother", "Send another message")}
                  </NeoButton>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative border-2 border-neo-black bg-neo-white shadow-hard p-8 lg:p-10 space-y-6"
                >
                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2">
                        {t("contact.name", "Name")} *
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: t(
                            "contact.nameRequired",
                            "Name is required"
                          ),
                        })}
                        className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all placeholder:text-neo-black/30"
                        placeholder={t("contact.namePlaceholder", "John Doe")}
                      />
                      {errors.name && (
                        <span className="font-mono text-xs text-neo-red mt-1 block">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2">
                        {t("contact.email", "Email")} *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: t(
                            "contact.emailRequired",
                            "Email is required"
                          ),
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t(
                              "contact.emailInvalid",
                              "Please enter a valid email"
                            ),
                          },
                        })}
                        className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all placeholder:text-neo-black/30"
                        placeholder={t(
                          "contact.emailPlaceholder",
                          "john@company.com"
                        )}
                      />
                      {errors.email && (
                        <span className="font-mono text-xs text-neo-red mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company & Phone row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2">
                        {t("contact.company", "Company")}
                      </label>
                      <input
                        type="text"
                        {...register("company")}
                        className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all placeholder:text-neo-black/30"
                        placeholder={t(
                          "contact.companyPlaceholder",
                          "Acme Corp"
                        )}
                      />
                    </div>

                    <div>
                      <label className="font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2">
                        {t("contact.phone", "Phone")}
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all placeholder:text-neo-black/30"
                        placeholder={t(
                          "contact.phonePlaceholder",
                          "+33 6 12 34 56 78"
                        )}
                      />
                      {errors.phone && (
                        <span className="font-mono text-xs text-neo-red mt-1 block">
                          {t("contact.phoneInvalid", "Please enter a valid EU phone number")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service & Budget row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2">
                        {t("contact.service", "Service")}
                      </label>
                      <select
                        {...register("service")}
                        className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all appearance-none cursor-pointer"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {t(opt.labelKey, opt.labelKey)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2">
                        {t("contact.budget", "Budget")}
                      </label>
                      <select
                        {...register("budget")}
                        className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all appearance-none cursor-pointer"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {t(opt.labelKey, opt.labelKey)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2">
                      <Clock size={14} className="inline mr-1.5 -mt-0.5" />
                      {t("contact.timeline", "Timeline")}
                    </label>
                    <select
                      {...register("timeline")}
                      className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all appearance-none cursor-pointer"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {t(opt.labelKey, opt.labelKey)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Honeypot - hidden from users */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input
                      type="text"
                      {...register("website")}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-space font-bold text-sm text-neo-black uppercase tracking-wider block mb-2">
                      {t("contact.message", "Message")} *
                    </label>
                    <textarea
                      {...register("message", {
                        required: t(
                          "contact.messageRequired",
                          "Message is required"
                        ),
                        minLength: {
                          value: 10,
                          message: t(
                            "contact.messageMinLength",
                            "Message must be at least 10 characters"
                          ),
                        },
                      })}
                      rows={5}
                      className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all resize-vertical placeholder:text-neo-black/30"
                      placeholder={t(
                        "contact.messagePlaceholder",
                        "Tell us about your project..."
                      )}
                    />
                    {errors.message && (
                      <span className="font-mono text-xs text-neo-red mt-1 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Rate limited state */}
                  {submitStatus === "rate-limited" && (
                    <div className="flex items-center gap-3 p-4 border-2 border-neo-yellow bg-neo-yellow/10">
                      <Clock size={20} className="text-neo-black flex-shrink-0" />
                      <p className="font-mono text-sm text-neo-black">
                        {t(
                          "contact.rateLimited",
                          "Please wait a few minutes before sending another message."
                        )}
                      </p>
                    </div>
                  )}

                  {/* Error state */}
                  {submitStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 border-2 border-neo-red bg-neo-red/10">
                      <AlertTriangle size={20} className="text-neo-red flex-shrink-0" />
                      <p className="font-mono text-sm text-neo-red">
                        {t(
                          "contact.errorMessage",
                          "Something went wrong. Please try again."
                        )}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <NeoButton
                    type="submit"
                    color="neo-lime"
                    size="lg"
                    disabled={submitStatus === "loading" || submitStatus === "rate-limited"}
                    className="w-full"
                  >
                    {submitStatus === "loading" ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-neo-black border-t-transparent animate-spin" />
                        {t("contact.sending", "Sending...")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        {t("contact.submit", "Send Message")}
                      </span>
                    )}
                  </NeoButton>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="space-y-8"
            >
              {/* Email card */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border-2 border-neo-black bg-neo-lime flex items-center justify-center">
                    <Mail size={18} className="text-neo-black" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider block">
                      {t("contact.emailLabel", "Email")}
                    </span>
                    <a
                      href="mailto:hello@dmckreatif.com"
                      className="font-space font-bold text-sm text-neo-black hover:text-neo-lime transition-colors"
                    >
                      hello@dmckreatif.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Countries card */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 border-2 border-neo-black bg-neo-yellow flex items-center justify-center">
                    <Globe size={18} className="text-neo-black" />
                  </div>
                  <span className="font-space font-bold text-sm text-neo-black">
                    {t("contact.countriesServed", "Countries We Serve")}
                  </span>
                </div>
                <div className="space-y-3">
                  {countries.map((country) => (
                    <div
                      key={country.name}
                      className="flex items-center gap-3 font-mono text-sm text-neo-black"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response time card */}
              <div className="border-2 border-neo-black bg-neo-lime/20 shadow-hard p-6 text-center">
                <span className="font-space font-bold text-3xl text-neo-black block mb-1">
                  24h
                </span>
                <span className="font-mono text-xs font-bold text-neo-black/70 uppercase tracking-wider">
                  {t("contact.responseTime", "Average Response Time")}
                </span>
              </div>

              {/* Quick CTA */}
              <div className="border-2 border-neo-black bg-neo-bg shadow-hard p-6">
                <h3 className="font-space font-bold text-lg text-neo-black mb-3">
                  {t("contact.quickCta", "Not sure which plan?")}
                </h3>
                <p className="font-mono text-xs text-neo-black/70 mb-4 leading-relaxed">
                  {t(
                    "contact.quickCtaDescription",
                    "Check out our pricing packages to find the perfect fit for your business."
                  )}
                </p>
                <NeoButton href="/pricing" color="neo-yellow" size="sm">
                  {t("contact.viewPricing", "View Pricing")}
                  <ArrowRight size={14} />
                </NeoButton>
              </div>

              {/* Opening Hours */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border-2 border-neo-black bg-neo-blue flex items-center justify-center">
                    <Clock size={18} className="text-neo-black" />
                  </div>
                  <span className="font-space font-bold text-sm text-neo-black">
                    {t("contact.openingHours", "Working Hours")}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-xs text-neo-black">
                    <span>{t("contact.weekdays", "Monday — Friday")}</span>
                    <span className="font-bold">09:00 — 18:00</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs text-neo-black/50">
                    <span>{t("contact.weekend", "Saturday — Sunday")}</span>
                    <span>{t("contact.closed", "Closed")}</span>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-3 border-b-2 border-neo-black bg-neo-bg">
                  <MapPin size={14} className="text-neo-black" />
                  <span className="font-space font-bold text-xs uppercase tracking-wider text-neo-black">
                    {t("contact.location", "Our Location")}
                  </span>
                </div>
                <div className="aspect-[4/3]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.94722687619!2d2.2646349!3d48.8588897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2s!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="DMC Kreatif Location - Europe"
                  />
                </div>
              </div>

              {/* Leave a Review CTA */}
              <div className="border-2 border-neo-black bg-neo-lime/10 shadow-hard p-6 text-center">
                <Star size={24} className="text-neo-black mx-auto mb-3" />
                <h3 className="font-space font-bold text-sm text-neo-black mb-2">
                  {t("contact.reviewTitle", "Happy with our work?")}
                </h3>
                <p className="font-mono text-xs text-neo-black/70 mb-4 leading-relaxed">
                  {t("contact.reviewDescription", "We appreciate your feedback. Leave us a review on Google.")}
                </p>
                <a
                  href="https://g.page/r/dmckreatif/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-space font-bold text-xs uppercase tracking-wider text-neo-black border-2 border-neo-black px-4 py-2 bg-neo-lime hover:shadow-hard-sm transition-all"
                >
                  <Star size={12} />
                  {t("contact.leaveReview", "Leave a Review")}
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Internal Links */}
              <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6 space-y-3">
                <h3 className="font-space font-bold text-sm uppercase tracking-wider text-neo-black mb-4">
                  {t("contact.explore", "Explore")}
                </h3>
                <Link
                  to={`/${locale ?? "en"}/services`}
                  className="flex items-center justify-between py-2 border-b border-neo-black/10 font-mono text-xs text-neo-black hover:text-neo-lime transition-colors group"
                >
                  {t("nav.services", "SERVICES")}
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={`/${locale ?? "en"}/portfolio`}
                  className="flex items-center justify-between py-2 border-b border-neo-black/10 font-mono text-xs text-neo-black hover:text-neo-lime transition-colors group"
                >
                  {t("nav.portfolio", "PORTFOLIO")}
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={`/${locale ?? "en"}/about`}
                  className="flex items-center justify-between py-2 font-mono text-xs text-neo-black hover:text-neo-lime transition-colors group"
                >
                  {t("nav.about", "ABOUT")}
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
