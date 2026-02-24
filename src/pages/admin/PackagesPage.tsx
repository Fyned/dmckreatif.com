import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import type { Package } from "@/types/database";

const NEO_COLORS = [
  "neo-lime",
  "neo-yellow",
  "neo-blue",
  "neo-pink",
  "neo-purple",
  "neo-green",
  "neo-orange",
  "neo-red",
];

export default function PackagesPage() {
  const { t } = useTranslation();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingFeature, setEditingFeature] = useState<{
    pkgId: string;
    index: number;
  } | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("packages")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) {
      const typed = (data as unknown as Package[]).map((p) => ({
        ...p,
        features: Array.isArray(p.features)
          ? p.features
          : typeof p.features === "string"
            ? JSON.parse(p.features as string)
            : [],
      }));
      setPackages(typed);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  function updatePackage(id: string, field: string, value: unknown) {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  function updateFeature(pkgId: string, index: number, value: string) {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id !== pkgId) return p;
        const feats = [...p.features];
        feats[index] = value;
        return { ...p, features: feats };
      })
    );
  }

  function removeFeature(pkgId: string, index: number) {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id !== pkgId) return p;
        const feats = p.features.filter((_, i) => i !== index);
        return { ...p, features: feats };
      })
    );
  }

  function addFeature(pkgId: string) {
    if (!newFeature.trim()) return;
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id !== pkgId) return p;
        return { ...p, features: [...p.features, newFeature.trim()] };
      })
    );
    setNewFeature("");
  }

  async function savePackage(pkg: Package) {
    setSaving(pkg.id);
    const { error } = await supabase
      .from("packages")
      .update({
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        currency: pkg.currency,
        features: JSON.stringify(pkg.features),
        delivery_days: pkg.delivery_days,
        color: pkg.color,
        popular: pkg.popular,
        active: pkg.active,
        sort_order: pkg.sort_order,
      })
      .eq("id", pkg.id);
    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(`${pkg.name} saved!`);
    }
    setSaving(null);
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
        <title>{t("admin.packages.title", "Packages")} | DMC Kreatif</title>
      </Helmet>

      {toast && (
        <div className="fixed top-4 right-4 z-50 border-2 border-neo-black bg-neo-lime px-6 py-3 shadow-hard font-mono text-sm font-bold uppercase animate-pulse">
          {toast}
        </div>
      )}

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-10">
          <NeoBadge color="neo-blue" className="mb-4">
            {t("admin.packages.badge", "PACKAGE MANAGEMENT")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.packages.title", "Packages")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t("admin.packages.subtitle", "Manage pricing tiers & features")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.id} variants={fadeInUp}>
              <NeoCard color={pkg.color} hover={false} className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => updatePackage(pkg.id, "name", e.target.value)}
                      className="font-space font-bold text-xl uppercase bg-transparent border-b-2 border-neo-black focus:outline-none focus:border-neo-lime w-32"
                    />
                    {pkg.popular && (
                      <NeoBadge color="neo-yellow">POPULAR</NeoBadge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pkg.active}
                        onChange={(e) => updatePackage(pkg.id, "active", e.target.checked)}
                        className="w-4 h-4 accent-neo-lime"
                      />
                      <span className="font-mono text-[10px] uppercase">Active</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pkg.popular}
                        onChange={(e) => updatePackage(pkg.id, "popular", e.target.checked)}
                        className="w-4 h-4 accent-neo-yellow"
                      />
                      <span className="font-mono text-[10px] uppercase">Popular</span>
                    </label>
                  </div>
                </div>

                {/* Price + Delivery */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Price</label>
                    <div className="flex items-center border-2 border-neo-black bg-neo-bg">
                      <span className="px-2 font-mono text-sm font-bold border-r-2 border-neo-black bg-neo-white">€</span>
                      <input
                        type="number"
                        value={pkg.price}
                        onChange={(e) => updatePackage(pkg.id, "price", Number(e.target.value))}
                        className="w-full px-3 py-2 font-mono text-sm bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Delivery (days)</label>
                    <input
                      type="number"
                      value={pkg.delivery_days ?? 0}
                      onChange={(e) => updatePackage(pkg.id, "delivery_days", Number(e.target.value))}
                      className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Color</label>
                    <select
                      value={pkg.color}
                      onChange={(e) => updatePackage(pkg.id, "color", e.target.value)}
                      className="w-full border-2 border-neo-black bg-neo-bg px-2 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime appearance-none"
                    >
                      {NEO_COLORS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <label className="block font-mono text-[10px] font-bold uppercase mb-2">
                    Features ({pkg.features.length})
                  </label>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto border-2 border-neo-black bg-neo-white p-3">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 group">
                        <span className="font-mono text-[10px] text-neo-black/40 w-4">{idx + 1}</span>
                        {editingFeature?.pkgId === pkg.id && editingFeature.index === idx ? (
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => updateFeature(pkg.id, idx, e.target.value)}
                            onBlur={() => setEditingFeature(null)}
                            onKeyDown={(e) => e.key === "Enter" && setEditingFeature(null)}
                            className="flex-1 font-mono text-xs bg-neo-bg border border-neo-black px-2 py-1 focus:outline-none focus:border-neo-lime"
                            autoFocus
                          />
                        ) : (
                          <span
                            onClick={() => setEditingFeature({ pkgId: pkg.id, index: idx })}
                            className="flex-1 font-mono text-xs cursor-pointer hover:bg-neo-bg px-2 py-1 transition-colors"
                          >
                            {feat}
                          </span>
                        )}
                        <button
                          onClick={() => removeFeature(pkg.id, idx)}
                          className="opacity-0 group-hover:opacity-100 font-mono text-xs text-neo-red font-bold hover:bg-neo-red/10 px-1 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Add feature */}
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addFeature(pkg.id)}
                      placeholder="Add feature..."
                      className="flex-1 border-2 border-neo-black bg-neo-bg px-3 py-1.5 font-mono text-xs placeholder:text-neo-black/30 focus:outline-none focus:border-neo-lime"
                    />
                    <button
                      onClick={() => addFeature(pkg.id)}
                      className="border-2 border-neo-black bg-neo-lime px-3 py-1.5 font-mono text-xs font-bold uppercase hover:bg-neo-lime/80 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Save */}
                <button
                  onClick={() => savePackage(pkg)}
                  disabled={saving === pkg.id}
                  className="w-full bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
                >
                  {saving === pkg.id ? "Saving..." : `Save ${pkg.name}`}
                </button>
              </NeoCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
