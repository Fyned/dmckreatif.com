import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, Sparkles } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import type { TemplateTier } from "@/types/database";

interface OrderTemplate {
  name: string;
  slug: string;
}

interface OrderData {
  id: string;
  order_number: string;
  tier: TemplateTier;
  price: number;
  currency: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  template: OrderTemplate | null;
}

export default function TemplateOrderConfirmPage() {
  const { t } = useTranslation();
  const { orderId } = useParams();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;

      setLoading(true);

      const { data } = await supabase
        .from("template_orders")
        .select("*, template:templates(name, slug)")
        .eq("id", orderId)
        .single();

      if (data) {
        setOrder(data as OrderData);
      }

      setLoading(false);
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-center py-20">
            <div className="border-2 border-neo-black bg-neo-lime/20 shadow-hard px-8 py-4 font-space font-bold text-neo-black uppercase animate-pulse">
              {t("templates.loading", "Loading...")}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <div className="border-2 border-neo-black bg-neo-white shadow-hard p-12">
            <h2 className="font-space font-bold text-2xl mb-4">
              {t("templates.orderNotFound", "Order Not Found")}
            </h2>
            <p className="font-mono text-sm text-neo-black/60 mb-6">
              {t(
                "templates.orderNotFoundDescription",
                "We could not find this order. Please check your email for confirmation details."
              )}
            </p>
            <NeoButton href="/templates" color="neo-lime">
              {t("templates.backToTemplates", "Back to Templates")}
            </NeoButton>
          </div>
        </div>
      </section>
    );
  }

  const tierLabel = order.tier.replace("_", " ").toUpperCase();

  return (
    <>
      <Helmet>
        <title>
          {t(
            "seo.templates.confirmTitle",
            "Order Confirmed \u2014 DMC Kreatif"
          )}
        </title>
        <meta
          name="description"
          content={t(
            "seo.templates.confirmDescription",
            "Your template order has been confirmed. We will start building your website shortly."
          )}
        />
      </Helmet>

      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="max-w-2xl mx-auto"
          >
            {/* Main Confirmation Card */}
            <motion.div
              variants={fadeInUp}
              className="border-2 border-neo-black bg-neo-white shadow-hard p-8 lg:p-12 text-center"
            >
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-neo-lime border-2 border-neo-black shadow-hard flex items-center justify-center">
                  <CheckCircle2 size={48} className="text-neo-black" />
                </div>
              </div>

              {/* Title */}
              <h1 className="font-space font-bold text-3xl lg:text-4xl text-neo-black uppercase mb-4">
                {t("templates.confirm.title", "ORDER CONFIRMED!")}
              </h1>

              {/* Order Number */}
              <div className="inline-block border-2 border-neo-black bg-neo-bg px-6 py-3 mb-6">
                <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider block mb-1">
                  {t("templates.confirm.orderNumber", "Order Number")}
                </span>
                <span className="font-space font-bold text-lg text-neo-black">
                  {order.order_number}
                </span>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-neo-black/80 leading-relaxed max-w-lg mx-auto mb-8">
                {t(
                  "templates.confirm.description",
                  "Your template order has been received. We will start building your website and notify you when it's ready for review."
                )}
              </p>

              {/* Delivery Estimate */}
              <div className="inline-flex items-center gap-2 mb-8">
                <NeoBadge color="neo-yellow">
                  <Clock size={12} className="mr-1" />
                  {t(
                    "templates.confirm.delivery",
                    "Estimated delivery: 2-5 business days"
                  )}
                </NeoBadge>
              </div>

              {/* Order Summary */}
              <div className="border-t-2 border-neo-black pt-6 space-y-3 text-left max-w-sm mx-auto">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider">
                    {t("templates.confirm.template", "Template")}
                  </span>
                  <span className="font-space font-bold text-sm text-neo-black">
                    {order.template?.name ?? "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider">
                    {t("templates.confirm.package", "Package")}
                  </span>
                  <NeoBadge color="neo-lime">{tierLabel}</NeoBadge>
                </div>
                <div className="flex items-center justify-between border-t-2 border-neo-black pt-3">
                  <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider">
                    {t("templates.confirm.total", "Total")}
                  </span>
                  <span className="font-space font-bold text-xl text-neo-black">
                    {"\u20AC"}{order.price}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <NeoButton href="/templates" color="neo-yellow">
                {t(
                  "templates.confirm.browseMore",
                  "Browse More Templates"
                )}{" "}
                <ArrowRight size={16} />
              </NeoButton>
              <NeoButton href="/pricing" variant="outline">
                {t(
                  "templates.confirm.viewPremium",
                  "View Premium Packages"
                )}{" "}
                <ArrowRight size={16} />
              </NeoButton>
            </motion.div>

            {/* Upsell Callout */}
            <motion.div
              variants={fadeInUp}
              className="border-2 border-neo-black bg-neo-lime/10 shadow-hard p-6 lg:p-8 mt-10"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-neo-purple border-2 border-neo-black flex items-center justify-center flex-shrink-0 shadow-hard-sm">
                  <Sparkles size={18} className="text-neo-white" />
                </div>
                <div>
                  <h3 className="font-space font-bold text-base text-neo-black uppercase mb-2">
                    {t(
                      "templates.confirm.upsellTitle",
                      "WANT A FULLY CUSTOM DESIGN?"
                    )}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-4">
                    {t(
                      "templates.confirm.upsellDescription",
                      "Our premium packages include fully custom designs with 24/7 support and revision rights. Check our premium packages starting at \u20AC497."
                    )}
                  </p>
                  <NeoButton href="/pricing" size="sm" color="neo-purple">
                    {t(
                      "templates.confirm.upsellButton",
                      "Explore Premium"
                    )}{" "}
                    <ArrowRight size={14} />
                  </NeoButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
