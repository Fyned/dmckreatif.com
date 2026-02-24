import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import { seedTemplates } from "@/lib/seed-templates";
import type {
  Template,
  TemplateCategory,
  TemplateTier,
} from "@/types/database";

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

const TIERS: TemplateTier[] = ["business_card", "starter", "professional"];

type ActiveTab = "templates" | "categories";

interface NewTemplateForm {
  name: string;
  slug: string;
  category_id: string;
  description: string;
}

interface NewCategoryForm {
  name: string;
  slug: string;
  icon: string;
  color: string;
  sort_order: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TemplatesAdminPage() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<ActiveTab>("templates");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  // Feature editing state
  const [editingFeature, setEditingFeature] = useState<{
    templateId: string;
    index: number;
  } | null>(null);
  const [newFeature, setNewFeature] = useState("");

  // New template form
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState<NewTemplateForm>({
    name: "",
    slug: "",
    category_id: "",
    description: "",
  });

  // New category form
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState<NewCategoryForm>({
    name: "",
    slug: "",
    icon: "folder",
    color: "neo-lime",
    sort_order: 0,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);

    const [templatesRes, categoriesRes] = await Promise.all([
      supabase
        .from("templates")
        .select("*, category:template_categories(*)")
        .order("sort_order"),
      supabase
        .from("template_categories")
        .select("*")
        .order("sort_order"),
    ]);

    if (templatesRes.data) {
      const typed = (templatesRes.data as unknown as Template[]).map((tpl) => ({
        ...tpl,
        features: Array.isArray(tpl.features)
          ? tpl.features
          : typeof tpl.features === "string"
            ? JSON.parse(tpl.features as string)
            : [],
        tier_compatibility: Array.isArray(tpl.tier_compatibility)
          ? tpl.tier_compatibility
          : typeof tpl.tier_compatibility === "string"
            ? JSON.parse(tpl.tier_compatibility as string)
            : [],
        preview_images: Array.isArray(tpl.preview_images)
          ? tpl.preview_images
          : [],
      }));
      setTemplates(typed);
    }

    if (categoriesRes.data) {
      setCategories(categoriesRes.data as unknown as TemplateCategory[]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSeedTemplates = async () => {
    setSeeding(true);
    const result = await seedTemplates(supabase);
    setSeeding(false);
    if (result.success) {
      showToast(result.message);
      void fetchData();
    } else {
      showToast(result.message);
    }
  };

  /* ── Template local state helpers ── */

  function updateTemplate(id: string, field: string, value: unknown) {
    setTemplates((prev) =>
      prev.map((tpl) => (tpl.id === id ? { ...tpl, [field]: value } : tpl))
    );
  }

  function toggleTier(templateId: string, tier: TemplateTier) {
    setTemplates((prev) =>
      prev.map((tpl) => {
        if (tpl.id !== templateId) return tpl;
        const current = tpl.tier_compatibility;
        const next = current.includes(tier)
          ? current.filter((t) => t !== tier)
          : [...current, tier];
        return { ...tpl, tier_compatibility: next };
      })
    );
  }

  function updateFeature(templateId: string, index: number, value: string) {
    setTemplates((prev) =>
      prev.map((tpl) => {
        if (tpl.id !== templateId) return tpl;
        const feats = [...tpl.features];
        feats[index] = value;
        return { ...tpl, features: feats };
      })
    );
  }

  function removeFeature(templateId: string, index: number) {
    setTemplates((prev) =>
      prev.map((tpl) => {
        if (tpl.id !== templateId) return tpl;
        return { ...tpl, features: tpl.features.filter((_, i) => i !== index) };
      })
    );
  }

  function addFeature(templateId: string) {
    if (!newFeature.trim()) return;
    setTemplates((prev) =>
      prev.map((tpl) => {
        if (tpl.id !== templateId) return tpl;
        return { ...tpl, features: [...tpl.features, newFeature.trim()] };
      })
    );
    setNewFeature("");
  }

  /* ── Save template ── */

  async function saveTemplate(tpl: Template) {
    setSaving(tpl.id);
    const { error } = await supabase
      .from("templates")
      .update({
        name: tpl.name,
        slug: tpl.slug,
        description: tpl.description,
        category_id: tpl.category_id,
        thumbnail_url: tpl.thumbnail_url,
        features: JSON.stringify(tpl.features),
        tier_compatibility: JSON.stringify(tpl.tier_compatibility),
        pages_included: tpl.pages_included,
        active: tpl.active,
        popular: tpl.popular,
        sort_order: tpl.sort_order,
      })
      .eq("id", tpl.id);

    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(`${tpl.name} ${t("common.saved", "saved")}!`);
    }
    setSaving(null);
  }

  /* ── Add new template ── */

  async function handleAddTemplate() {
    if (!newTemplate.name.trim() || !newTemplate.category_id) {
      showToast(t("admin.templates.fillRequired", "Fill in name & category"));
      return;
    }
    setSaving("new-template");
    const { error } = await supabase.from("templates").insert({
      name: newTemplate.name,
      slug: newTemplate.slug || slugify(newTemplate.name),
      category_id: newTemplate.category_id,
      description: newTemplate.description || null,
      thumbnail_url: null,
      preview_url: null,
      preview_images: [],
      features: [],
      pages_included: 1,
      tier_compatibility: ["starter"],
      demo_data: {},
      active: false,
      popular: false,
      sort_order: templates.length,
    });

    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(t("admin.templates.added", "Template added!"));
      setNewTemplate({ name: "", slug: "", category_id: "", description: "" });
      setShowNewTemplate(false);
      fetchData();
    }
    setSaving(null);
  }

  /* ── Category local state helpers ── */

  function updateCategory(id: string, field: string, value: unknown) {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat))
    );
  }

  async function saveCategory(cat: TemplateCategory) {
    setSaving(cat.id);
    const { error } = await supabase
      .from("template_categories")
      .update({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        sort_order: cat.sort_order,
        active: cat.active,
      })
      .eq("id", cat.id);

    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(`${cat.name} ${t("common.saved", "saved")}!`);
    }
    setSaving(null);
  }

  async function handleAddCategory() {
    if (!newCategory.name.trim()) {
      showToast(t("admin.categories.fillRequired", "Fill in category name"));
      return;
    }
    setSaving("new-category");
    const { error } = await supabase.from("template_categories").insert({
      name: newCategory.name,
      slug: newCategory.slug || slugify(newCategory.name),
      description: null,
      icon: newCategory.icon || null,
      color: newCategory.color,
      sort_order: newCategory.sort_order,
      active: true,
    });

    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(t("admin.categories.added", "Category added!"));
      setNewCategory({
        name: "",
        slug: "",
        icon: "folder",
        color: "neo-lime",
        sort_order: categories.length,
      });
      setShowNewCategory(false);
      fetchData();
    }
    setSaving(null);
  }

  /* ── Loading state ── */

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
        <title>
          {t("admin.templates.title", "Templates")} | DMC Kreatif
        </title>
      </Helmet>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 border-2 border-neo-black bg-neo-lime px-6 py-3 shadow-hard font-mono text-sm font-bold uppercase animate-pulse">
          {toast}
        </div>
      )}

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <NeoBadge color="neo-blue" className="mb-4">
            {t("admin.templates.badge", "TEMPLATE MANAGEMENT")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.templates.title", "Templates")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t(
              "admin.templates.subtitle",
              "Manage templates & categories"
            )}
          </p>
        </motion.div>

        {/* Tab Bar */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider border-2 border-neo-black transition-all duration-150 ${
              activeTab === "templates"
                ? "bg-neo-lime shadow-hard"
                : "bg-neo-white hover:bg-neo-bg"
            }`}
          >
            {t("admin.templates.tabTemplates", "TEMPLATES")} ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider border-2 border-neo-black transition-all duration-150 ${
              activeTab === "categories"
                ? "bg-neo-lime shadow-hard"
                : "bg-neo-white hover:bg-neo-bg"
            }`}
          >
            {t("admin.templates.tabCategories", "CATEGORIES")} ({categories.length})
          </button>
        </div>

        {/* ═══════════ TEMPLATES TAB ═══════════ */}
        {activeTab === "templates" && (
          <>
            {/* Seed Button */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => void handleSeedTemplates()}
                disabled={seeding}
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-neo-black bg-neo-yellow font-space font-bold text-sm uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {seeding ? "Seeding..." : "Seed 20 Templates"}
              </button>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {templates.map((tpl) => (
                <motion.div key={tpl.id} variants={fadeInUp}>
                  <NeoCard hover={false} className="p-6">
                    {/* Name + Slug */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={tpl.name}
                          onChange={(e) =>
                            updateTemplate(tpl.id, "name", e.target.value)
                          }
                          className="font-space font-bold text-xl uppercase bg-transparent border-b-2 border-neo-black focus:outline-none focus:border-neo-lime w-full"
                        />
                        <p className="font-mono text-xs text-neo-black/40 mt-1">
                          {tpl.slug}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4 shrink-0">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tpl.active}
                            onChange={(e) =>
                              updateTemplate(tpl.id, "active", e.target.checked)
                            }
                            className="w-4 h-4 accent-neo-lime"
                          />
                          <span className="font-mono text-[10px] uppercase">
                            {t("common.active", "Active")}
                          </span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tpl.popular}
                            onChange={(e) =>
                              updateTemplate(
                                tpl.id,
                                "popular",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 accent-neo-yellow"
                          />
                          <span className="font-mono text-[10px] uppercase">
                            {t("common.popular", "Popular")}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Category + Sort + Pages */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.templates.category", "Category")}
                        </label>
                        <select
                          value={tpl.category_id}
                          onChange={(e) =>
                            updateTemplate(
                              tpl.id,
                              "category_id",
                              e.target.value
                            )
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-2 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime appearance-none"
                        >
                          <option value="">--</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.templates.pages", "Pages")}
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={tpl.pages_included}
                          onChange={(e) =>
                            updateTemplate(
                              tpl.id,
                              "pages_included",
                              Number(e.target.value)
                            )
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.templates.sortOrder", "Sort")}
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={tpl.sort_order}
                          onChange={(e) =>
                            updateTemplate(
                              tpl.id,
                              "sort_order",
                              Number(e.target.value)
                            )
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                        {t("admin.templates.description", "Description")}
                      </label>
                      <textarea
                        rows={3}
                        value={tpl.description ?? ""}
                        onChange={(e) =>
                          updateTemplate(tpl.id, "description", e.target.value)
                        }
                        className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime resize-none"
                      />
                    </div>

                    {/* Thumbnail */}
                    <div className="mb-4">
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                        {t("admin.templates.thumbnail", "Thumbnail URL")}
                      </label>
                      <div className="flex items-center gap-3">
                        {tpl.thumbnail_url && (
                          <img
                            src={tpl.thumbnail_url}
                            alt={tpl.name}
                            className="w-16 h-12 object-cover border-2 border-neo-black"
                          />
                        )}
                        <input
                          type="text"
                          value={tpl.thumbnail_url ?? ""}
                          onChange={(e) =>
                            updateTemplate(
                              tpl.id,
                              "thumbnail_url",
                              e.target.value || null
                            )
                          }
                          placeholder="https://..."
                          className="flex-1 border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime placeholder:text-neo-black/30"
                        />
                      </div>
                    </div>

                    {/* Tier Compatibility */}
                    <div className="mb-4">
                      <label className="block font-mono text-[10px] font-bold uppercase mb-2">
                        {t("admin.templates.tierCompat", "Tier Compatibility")}
                      </label>
                      <div className="flex gap-3">
                        {TIERS.map((tier) => (
                          <label
                            key={tier}
                            className="flex items-center gap-1.5 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={tpl.tier_compatibility.includes(tier)}
                              onChange={() => toggleTier(tpl.id, tier)}
                              className="w-4 h-4 accent-neo-lime"
                            />
                            <span className="font-mono text-xs uppercase">
                              {tier.replace("_", " ")}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <label className="block font-mono text-[10px] font-bold uppercase mb-2">
                        {t("admin.templates.features", "Features")} (
                        {tpl.features.length})
                      </label>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto border-2 border-neo-black bg-neo-white p-3">
                        {tpl.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 group"
                          >
                            <span className="font-mono text-[10px] text-neo-black/40 w-4">
                              {idx + 1}
                            </span>
                            {editingFeature?.templateId === tpl.id &&
                            editingFeature.index === idx ? (
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) =>
                                  updateFeature(tpl.id, idx, e.target.value)
                                }
                                onBlur={() => setEditingFeature(null)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" && setEditingFeature(null)
                                }
                                className="flex-1 font-mono text-xs bg-neo-bg border border-neo-black px-2 py-1 focus:outline-none focus:border-neo-lime"
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() =>
                                  setEditingFeature({
                                    templateId: tpl.id,
                                    index: idx,
                                  })
                                }
                                className="flex-1 font-mono text-xs cursor-pointer hover:bg-neo-bg px-2 py-1 transition-colors"
                              >
                                {feat}
                              </span>
                            )}
                            <button
                              onClick={() => removeFeature(tpl.id, idx)}
                              className="opacity-0 group-hover:opacity-100 font-mono text-xs text-neo-red font-bold hover:bg-neo-red/10 px-1 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && addFeature(tpl.id)
                          }
                          placeholder={t(
                            "admin.templates.addFeaturePlaceholder",
                            "Add feature..."
                          )}
                          className="flex-1 border-2 border-neo-black bg-neo-bg px-3 py-1.5 font-mono text-xs placeholder:text-neo-black/30 focus:outline-none focus:border-neo-lime"
                        />
                        <button
                          onClick={() => addFeature(tpl.id)}
                          className="border-2 border-neo-black bg-neo-lime px-3 py-1.5 font-mono text-xs font-bold uppercase hover:bg-neo-lime/80 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Save */}
                    <button
                      onClick={() => saveTemplate(tpl)}
                      disabled={saving === tpl.id}
                      className="w-full bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
                    >
                      {saving === tpl.id
                        ? t("common.saving", "Saving...")
                        : `${t("common.save", "Save")} ${tpl.name}`}
                    </button>
                  </NeoCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Add New Template */}
            <div className="mt-8">
              <button
                onClick={() => setShowNewTemplate((v) => !v)}
                className="border-2 border-dashed border-neo-black bg-neo-bg px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-lime/20 transition-colors w-full"
              >
                {showNewTemplate
                  ? t("common.cancel", "Cancel")
                  : t("admin.templates.addNew", "+ Add New Template")}
              </button>

              {showNewTemplate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <NeoCard hover={false} className="p-6 mt-4">
                    <h3 className="font-space font-bold text-lg uppercase mb-4">
                      {t("admin.templates.newTemplate", "New Template")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.templates.name", "Name")} *
                        </label>
                        <input
                          type="text"
                          value={newTemplate.name}
                          onChange={(e) =>
                            setNewTemplate((prev) => ({
                              ...prev,
                              name: e.target.value,
                              slug: slugify(e.target.value),
                            }))
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.templates.slug", "Slug")}
                        </label>
                        <input
                          type="text"
                          value={newTemplate.slug}
                          readOnly
                          className="w-full border-2 border-neo-black bg-neo-black/5 px-3 py-2 font-mono text-xs text-neo-black/60"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.templates.category", "Category")} *
                        </label>
                        <select
                          value={newTemplate.category_id}
                          onChange={(e) =>
                            setNewTemplate((prev) => ({
                              ...prev,
                              category_id: e.target.value,
                            }))
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-2 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime appearance-none"
                        >
                          <option value="">
                            {t(
                              "admin.templates.selectCategory",
                              "-- Select --"
                            )}
                          </option>
                          {categories
                            .filter((c) => c.active)
                            .map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.templates.description", "Description")}
                        </label>
                        <input
                          type="text"
                          value={newTemplate.description}
                          onChange={(e) =>
                            setNewTemplate((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAddTemplate}
                      disabled={saving === "new-template"}
                      className="bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
                    >
                      {saving === "new-template"
                        ? t("common.saving", "Saving...")
                        : t("admin.templates.create", "Create Template")}
                    </button>
                  </NeoCard>
                </motion.div>
              )}
            </div>
          </>
        )}

        {/* ═══════════ CATEGORIES TAB ═══════════ */}
        {activeTab === "categories" && (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {categories.map((cat) => (
                <motion.div key={cat.id} variants={fadeInUp}>
                  <NeoCard hover={false} className="p-5">
                    <div className="flex flex-wrap items-end gap-4">
                      {/* Name */}
                      <div className="flex-1 min-w-[160px]">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.name", "Name")}
                        </label>
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) =>
                            updateCategory(cat.id, "name", e.target.value)
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-space font-bold text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>

                      {/* Slug */}
                      <div className="w-36">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.slug", "Slug")}
                        </label>
                        <input
                          type="text"
                          value={cat.slug}
                          onChange={(e) =>
                            updateCategory(cat.id, "slug", e.target.value)
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>

                      {/* Icon */}
                      <div className="w-28">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.icon", "Icon")}
                        </label>
                        <input
                          type="text"
                          value={cat.icon ?? ""}
                          onChange={(e) =>
                            updateCategory(cat.id, "icon", e.target.value)
                          }
                          placeholder="folder"
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime placeholder:text-neo-black/30"
                        />
                      </div>

                      {/* Color */}
                      <div className="w-32">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.color", "Color")}
                        </label>
                        <select
                          value={cat.color}
                          onChange={(e) =>
                            updateCategory(cat.id, "color", e.target.value)
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-2 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime appearance-none"
                        >
                          {NEO_COLORS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Sort Order */}
                      <div className="w-16">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.sort", "Sort")}
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={cat.sort_order}
                          onChange={(e) =>
                            updateCategory(
                              cat.id,
                              "sort_order",
                              Number(e.target.value)
                            )
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-2 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>

                      {/* Active */}
                      <label className="flex items-center gap-1.5 cursor-pointer pb-2">
                        <input
                          type="checkbox"
                          checked={cat.active}
                          onChange={(e) =>
                            updateCategory(cat.id, "active", e.target.checked)
                          }
                          className="w-4 h-4 accent-neo-lime"
                        />
                        <span className="font-mono text-[10px] uppercase">
                          {t("common.active", "Active")}
                        </span>
                      </label>

                      {/* Save */}
                      <button
                        onClick={() => saveCategory(cat)}
                        disabled={saving === cat.id}
                        className="bg-neo-lime border-2 border-neo-black shadow-hard px-5 py-2 font-space font-bold text-xs uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
                      >
                        {saving === cat.id
                          ? t("common.saving", "Saving...")
                          : t("common.save", "Save")}
                      </button>
                    </div>
                  </NeoCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Add New Category */}
            <div className="mt-8">
              <button
                onClick={() => setShowNewCategory((v) => !v)}
                className="border-2 border-dashed border-neo-black bg-neo-bg px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-lime/20 transition-colors w-full"
              >
                {showNewCategory
                  ? t("common.cancel", "Cancel")
                  : t("admin.categories.addNew", "+ Add Category")}
              </button>

              {showNewCategory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <NeoCard hover={false} className="p-6 mt-4">
                    <h3 className="font-space font-bold text-lg uppercase mb-4">
                      {t("admin.categories.newCategory", "New Category")}
                    </h3>
                    <div className="flex flex-wrap items-end gap-4 mb-4">
                      <div className="flex-1 min-w-[160px]">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.name", "Name")} *
                        </label>
                        <input
                          type="text"
                          value={newCategory.name}
                          onChange={(e) =>
                            setNewCategory((prev) => ({
                              ...prev,
                              name: e.target.value,
                              slug: slugify(e.target.value),
                            }))
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>
                      <div className="w-36">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.slug", "Slug")}
                        </label>
                        <input
                          type="text"
                          value={newCategory.slug}
                          readOnly
                          className="w-full border-2 border-neo-black bg-neo-black/5 px-3 py-2 font-mono text-xs text-neo-black/60"
                        />
                      </div>
                      <div className="w-28">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.icon", "Icon")}
                        </label>
                        <input
                          type="text"
                          value={newCategory.icon}
                          onChange={(e) =>
                            setNewCategory((prev) => ({
                              ...prev,
                              icon: e.target.value,
                            }))
                          }
                          placeholder="folder"
                          className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime placeholder:text-neo-black/30"
                        />
                      </div>
                      <div className="w-32">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.color", "Color")}
                        </label>
                        <select
                          value={newCategory.color}
                          onChange={(e) =>
                            setNewCategory((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-2 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime appearance-none"
                        >
                          {NEO_COLORS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-16">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1">
                          {t("admin.categories.sort", "Sort")}
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={newCategory.sort_order}
                          onChange={(e) =>
                            setNewCategory((prev) => ({
                              ...prev,
                              sort_order: Number(e.target.value),
                            }))
                          }
                          className="w-full border-2 border-neo-black bg-neo-bg px-2 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAddCategory}
                      disabled={saving === "new-category"}
                      className="bg-neo-lime border-2 border-neo-black shadow-hard px-6 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50"
                    >
                      {saving === "new-category"
                        ? t("common.saving", "Saving...")
                        : t("admin.categories.create", "Create Category")}
                    </button>
                  </NeoCard>
                </motion.div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
