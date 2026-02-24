import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import type { Campaign } from "@/types/database";

const TEMPLATE_ICONS: Record<string, string> = {
  winter_sale: "❄️",
  new_year: "🎆",
  spring_launch: "🌱",
  summer_deal: "☀️",
  black_friday: "🖤",
  early_bird: "🐦",
};

const NEO_COLORS = [
  "neo-lime",
  "neo-yellow",
  "neo-blue",
  "neo-pink",
  "neo-purple",
  "neo-green",
  "neo-orange",
  "neo-black",
  "neo-red",
];

const PLACEMENTS = [
  { value: "banner", label: "Top Banner" },
  { value: "hero", label: "Hero Overlay" },
  { value: "popup", label: "Popup Modal" },
  { value: "pricing", label: "Pricing Badge" },
];

function formatDateForInput(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().slice(0, 16);
}

export default function CampaignsPage() {
  const { t } = useTranslation();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) {
      setCampaigns(data as unknown as Campaign[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  function updateSelected(field: string, value: unknown) {
    if (!selected) return;
    setSelected({ ...selected, [field]: value });
  }

  async function saveCampaign() {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("campaigns")
      .update({
        title: selected.title,
        description: selected.description,
        discount_type: selected.discount_type,
        discount_value: selected.discount_value,
        discount_code: selected.discount_code,
        banner_text: selected.banner_text,
        banner_color: selected.banner_color,
        cta_text: selected.cta_text,
        cta_link: selected.cta_link,
        placement: selected.placement,
        active: selected.active,
        start_date: selected.start_date || null,
        end_date: selected.end_date || null,
      })
      .eq("id", selected.id);

    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(`${selected.title} saved!`);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === selected.id ? { ...selected } : c))
      );
    }
    setSaving(false);
  }

  async function toggleActive(campaign: Campaign) {
    const newActive = !campaign.active;
    const { error } = await supabase
      .from("campaigns")
      .update({ active: newActive })
      .eq("id", campaign.id);
    if (!error) {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaign.id ? { ...c, active: newActive } : c))
      );
      if (selected?.id === campaign.id) {
        setSelected({ ...selected, active: newActive });
      }
      showToast(`${campaign.title} ${newActive ? "activated" : "deactivated"}`);
    }
  }

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="neo-border bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("common.loading", "Loading...")}
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("admin.campaigns.title", "Campaigns")} | DMC Kreatif</title>
      </Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-50 border-2 border-neo-black bg-neo-lime px-6 py-3 shadow-hard font-mono text-sm font-bold uppercase animate-pulse">
          {toast}
        </div>
      )}

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-10">
          <NeoBadge color="neo-pink" className="mb-4">
            {t("admin.campaigns.badge", "CAMPAIGN MANAGER")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.campaigns.title", "Campaigns")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t("admin.campaigns.subtitle", "Select a template, customize & activate")}
          </p>
        </motion.div>

        {/* ── Template Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10"
        >
          {campaigns.map((c) => (
            <motion.div key={c.id} variants={fadeInUp}>
              <button
                onClick={() => setSelected(c)}
                className={`w-full text-left border-2 border-neo-black p-4 transition-all duration-150 ${
                  selected?.id === c.id
                    ? "shadow-hard bg-neo-lime translate-x-[-2px] translate-y-[-2px]"
                    : "shadow-hard-sm bg-neo-white hover:shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px]"
                }`}
              >
                <span className="text-2xl block mb-2">
                  {TEMPLATE_ICONS[c.template] ?? "🏷️"}
                </span>
                <p className="font-space font-bold text-xs uppercase truncate">
                  {c.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      c.active ? "bg-green-500" : "bg-neo-black/20"
                    }`}
                  />
                  <span className="font-mono text-[10px] uppercase text-neo-black/50">
                    {c.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Editor + Preview ── */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Editor */}
              <div className="lg:col-span-2">
                <NeoCard hover={false} className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-space font-bold text-xl uppercase">
                      {TEMPLATE_ICONS[selected.template] ?? "🏷️"} Edit Campaign
                    </h2>
                    <button
                      onClick={() => toggleActive(selected)}
                      className={`border-2 border-neo-black px-4 py-1.5 font-mono text-xs font-bold uppercase transition-colors ${
                        selected.active
                          ? "bg-green-400 hover:bg-green-500"
                          : "bg-neo-bg hover:bg-neo-lime"
                      }`}
                    >
                      {selected.active ? "● Active" : "○ Activate"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Title</label>
                      <input
                        type="text"
                        value={selected.title}
                        onChange={(e) => updateSelected("title", e.target.value)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Discount Code</label>
                      <input
                        type="text"
                        value={selected.discount_code ?? ""}
                        onChange={(e) => updateSelected("discount_code", e.target.value)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Discount Type</label>
                      <select
                        value={selected.discount_type}
                        onChange={(e) => updateSelected("discount_type", e.target.value)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime appearance-none"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed (€)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Discount Value</label>
                      <input
                        type="number"
                        value={selected.discount_value ?? 0}
                        onChange={(e) => updateSelected("discount_value", Number(e.target.value))}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Placement</label>
                      <select
                        value={selected.placement}
                        onChange={(e) => updateSelected("placement", e.target.value)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime appearance-none"
                      >
                        {PLACEMENTS.map((p) => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Banner Text</label>
                    <input
                      type="text"
                      value={selected.banner_text ?? ""}
                      onChange={(e) => updateSelected("banner_text", e.target.value)}
                      className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Banner Color</label>
                      <select
                        value={selected.banner_color}
                        onChange={(e) => updateSelected("banner_color", e.target.value)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime appearance-none"
                      >
                        {NEO_COLORS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">CTA Text</label>
                      <input
                        type="text"
                        value={selected.cta_text ?? ""}
                        onChange={(e) => updateSelected("cta_text", e.target.value)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">CTA Link</label>
                      <input
                        type="text"
                        value={selected.cta_link}
                        onChange={(e) => updateSelected("cta_link", e.target.value)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Start Date</label>
                      <input
                        type="datetime-local"
                        value={formatDateForInput(selected.start_date)}
                        onChange={(e) => updateSelected("start_date", e.target.value ? new Date(e.target.value).toISOString() : null)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">End Date</label>
                      <input
                        type="datetime-local"
                        value={formatDateForInput(selected.end_date)}
                        onChange={(e) => updateSelected("end_date", e.target.value ? new Date(e.target.value).toISOString() : null)}
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:border-neo-lime"
                      />
                    </div>
                  </div>

                  <button
                    onClick={saveCampaign}
                    disabled={saving}
                    className="w-full bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Campaign"}
                  </button>
                </NeoCard>
              </div>

              {/* Preview */}
              <div>
                <NeoCard hover={false} className="p-6">
                  <h3 className="font-space font-bold text-sm uppercase mb-4">
                    Banner Preview
                  </h3>
                  <div
                    className={`border-2 border-neo-black bg-${selected.banner_color} p-4 text-center`}
                  >
                    <p className="font-space font-bold text-sm text-neo-black">
                      {selected.banner_text ?? "Banner text here..."}
                    </p>
                    {selected.cta_text && (
                      <span className="inline-block mt-2 border-2 border-neo-black bg-neo-white px-4 py-1.5 font-mono text-xs font-bold uppercase">
                        {selected.cta_text}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-neo-black/50 uppercase">Template</span>
                      <span className="font-bold">{selected.template}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-neo-black/50 uppercase">Discount</span>
                      <span className="font-bold">
                        {selected.discount_type === "percentage"
                          ? `${selected.discount_value}%`
                          : `€${selected.discount_value}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-neo-black/50 uppercase">Code</span>
                      <span className="font-bold">{selected.discount_code ?? "—"}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-neo-black/50 uppercase">Placement</span>
                      <span className="font-bold uppercase">{selected.placement}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-neo-black/50 uppercase">Status</span>
                      <NeoBadge color={selected.active ? "neo-green" : "neo-red"}>
                        {selected.active ? "ACTIVE" : "INACTIVE"}
                      </NeoBadge>
                    </div>
                  </div>
                </NeoCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <NeoCard hover={false} className="p-12 text-center">
              <p className="font-space font-bold text-xl uppercase text-neo-black/40">
                Select a campaign template above to edit
              </p>
            </NeoCard>
          </motion.div>
        )}
      </section>
    </>
  );
}
