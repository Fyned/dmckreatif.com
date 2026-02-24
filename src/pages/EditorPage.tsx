import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "@/styles/grapesjs-dark.css";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import {
  ArrowLeft,
  Save,
  Eye,
  Undo2,
  Redo2,
  Smartphone,
  Tablet,
  Monitor,
  Layers,
  Paintbrush,
  LayoutGrid,
  Check,
  Globe,
  Lock,
  Download,
  Search,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { Editor } from "grapesjs";
import { supabase } from "@/lib/supabase";
import {
  loadProjectJson,
  exportFullHtml,
  parseHtmlDocument,
} from "@/lib/grapesjs-utils";
import type { GrapesProjectData } from "@/lib/grapesjs-utils";
import { registerCustomBlocks } from "@/lib/editor-blocks";
import BusinessInfoPanel from "@/components/editor/BusinessInfoPanel";
import type { BusinessInfo } from "@/lib/template-placeholders";
import { EMPTY_BUSINESS_INFO, applyBusinessInfo } from "@/lib/template-placeholders";
import { Building2 } from "lucide-react";
import { createSite, saveSite, savePublishedHtml } from "@/lib/user-sites";
import {
  generateStaticSite,
  downloadHtmlFile,
  makeFilename,
  EMPTY_SEO_SETTINGS,
} from "@/lib/site-generator";
import type { SeoSettings } from "@/lib/site-generator";
import PublishDialog from "@/components/editor/PublishDialog";
import SeoPanel from "@/components/editor/SeoPanel";
import {
  uploadAsset,
  listProjectAssets,
} from "@/lib/asset-upload";

type PanelTab = "blocks" | "layers" | "styles" | "business" | "seo";

export default function EditorPage() {
  const { t } = useTranslation();
  const { locale, templateSlug } = useParams();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");
  const navigate = useNavigate();
  const { user } = useAuth();
  const editorRef = useRef<Editor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [activePanel, setActivePanel] = useState<PanelTab>("blocks");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(
    projectId
  );
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({ ...EMPTY_BUSINESS_INFO });
  const businessInfoRef = useRef<BusinessInfo>(businessInfo);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({ ...EMPTY_SEO_SETTINGS });
  const seoSettingsRef = useRef<SeoSettings>(seoSettings);
  const [exporting, setExporting] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [siteSubdomain, setSiteSubdomain] = useState<string | null>(null);
  const [siteStatus, setSiteStatus] = useState<string>("draft");
  // Dirty flag: true when editor has unsaved changes
  const [dirty, setDirty] = useState(false);
  // Last auto-save timestamp for status display
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  // All features enabled for now — payment gating added later
  const hasPaidPlan = true;

  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;

    async function initEditor() {
      try {
        let bodyContent = "";
        let cssContent = "";
        let projectData: GrapesProjectData | null = null;

        // If we have a project ID, load from Supabase
        if (projectId) {
          const { data, error: fetchError } = await supabase
            .from("user_projects")
            .select("*")
            .eq("id", projectId)
            .single();

          if (fetchError || !data) {
            throw new Error("Project not found");
          }

          setTemplateName(data.project_name);
          setCurrentProjectId(data.id);

          // Restore saved business info
          if (data.business_info && typeof data.business_info === "object") {
            const restored = { ...EMPTY_BUSINESS_INFO, ...(data.business_info as Partial<BusinessInfo>) };
            setBusinessInfo(restored);
            businessInfoRef.current = restored;
          }

          // Restore saved SEO settings
          if (data.seo_settings && typeof data.seo_settings === "object") {
            const restoredSeo = { ...EMPTY_SEO_SETTINGS, ...(data.seo_settings as Partial<SeoSettings>) };
            setSeoSettings(restoredSeo);
            seoSettingsRef.current = restoredSeo;
          }

          // Restore publish state
          if (data.subdomain) setSiteSubdomain(data.subdomain);
          if (data.status) setSiteStatus(data.status);

          if (
            data.grapesjs_data &&
            Object.keys(data.grapesjs_data).length > 0
          ) {
            projectData = data.grapesjs_data as GrapesProjectData;
          } else if (data.custom_html) {
            const parsed = parseHtmlDocument(data.custom_html);
            bodyContent = parsed.body;
            cssContent = parsed.css;
          }
        } else {
          // Load from demo HTML file
          const response = await fetch(`/demos/${templateSlug}.html`);
          if (!response.ok) {
            throw new Error(`Template not found: ${templateSlug}`);
          }
          const html = await response.text();
          const parsed = parseHtmlDocument(html);
          bodyContent = parsed.body;
          cssContent = parsed.css;
          if (parsed.title) setTemplateName(parsed.title);
        }

        // Initialize GrapesJS
        const editor = grapesjs.init({
          container: containerRef.current!,
          height: "100%",
          width: "auto",
          plugins: [grapesjsBlocksBasic, grapesjsPluginForms],
          pluginsOpts: {
            [grapesjsBlocksBasic as unknown as string]: {
              flexGrid: true,
            },
            [grapesjsPluginForms as unknown as string]: {},
          },
          storageManager: false,
          deviceManager: {
            devices: [
              { name: "Desktop", width: "" },
              { name: "Tablet", width: "768px", widthMedia: "992px" },
              { name: "Mobile", width: "375px", widthMedia: "480px" },
            ],
          },
          panels: { defaults: [] },
          blockManager: {
            appendTo: "#blocks-panel",
          },
          layerManager: {
            appendTo: "#layers-panel",
          },
          styleManager: {
            appendTo: "#styles-panel",
            sectors: [
              {
                name: "General",
                open: true,
                properties: [
                  "display",
                  "float",
                  "position",
                  "top",
                  "right",
                  "left",
                  "bottom",
                ],
              },
              {
                name: "Dimension",
                open: false,
                properties: [
                  "width",
                  "height",
                  "max-width",
                  "min-height",
                  "margin",
                  "padding",
                ],
              },
              {
                name: "Typography",
                open: false,
                properties: [
                  "font-family",
                  "font-size",
                  "font-weight",
                  "letter-spacing",
                  "color",
                  "line-height",
                  "text-align",
                  "text-decoration",
                  "text-shadow",
                ],
              },
              {
                name: "Decorations",
                open: false,
                properties: [
                  "background-color",
                  "background",
                  "border-radius",
                  "border",
                  "box-shadow",
                  "opacity",
                ],
              },
            ],
          },
          assetManager: {
            uploadName: "files",
            multiUpload: true,
            autoAdd: true,
            dropzone: true,
            // Dummy upload URL so GrapesJS shows the upload UI (dropzone + file button)
            upload: "https://localhost/noop",
            // Custom upload handler — intercepts file uploads and sends to Supabase
            async uploadFile(e: DragEvent | Event) {
              const fileInput = e as DragEvent & { target?: HTMLInputElement };
              const files = fileInput.dataTransfer
                ? fileInput.dataTransfer.files
                : (fileInput.target as HTMLInputElement)?.files;

              if (!files?.length || !user) return;

              const pid = projectId || "unsaved";
              const fileArray = Array.from(files);

              try {
                await Promise.all(
                  fileArray.map((file) =>
                    uploadAsset(file, user.id, pid).then((asset) => {
                      editor.AssetManager.add({
                        src: asset.url,
                        name: asset.name,
                        type: "image",
                      });
                    }),
                  ),
                );
              } catch (err) {
                console.error("[editor] asset upload error:", err);
              }
            },
          },
          canvas: {
            styles: [
              "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500&family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap",
            ],
          },
        });

        // Register industry-specific blocks
        registerCustomBlocks(editor);

        // Load existing project assets into the asset manager
        if (projectId && user) {
          listProjectAssets(user.id, projectId).then((assets) => {
            for (const asset of assets) {
              editor.AssetManager.add({
                src: asset.url,
                name: asset.name,
                type: "image",
              });
            }
          });
        }

        // Load content
        if (projectData) {
          loadProjectJson(editor, projectData);
        } else {
          editor.setComponents(bodyContent);
          editor.setStyle(cssContent);
        }

        editorRef.current = editor;

        // Track dirty state — mark as dirty whenever editor content changes
        editor.on("change:changesCount", () => setDirty(true));

        // Expose for debugging (dev only)
        if (import.meta.env.DEV) {
          (window as unknown as Record<string, unknown>).__gjs_editor = editor;
        }
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize editor"
        );
        setLoading(false);
      }
    }

    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [templateSlug, projectId]);

  function handleUndo() {
    editorRef.current?.UndoManager.undo();
  }

  function handleRedo() {
    editorRef.current?.UndoManager.redo();
  }

  function handleDevice(device: string) {
    editorRef.current?.setDevice(device);
  }

  function handlePreview() {
    const editor = editorRef.current;
    if (!editor) return;
    const fullHtml = exportFullHtml(editor);
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  const handleSave = useCallback(async () => {
    if (!editorRef.current || saving || !user) return;
    setSaving(true);
    setSaved(false);

    try {
      if (currentProjectId) {
        // Update existing project
        const ok = await saveSite(currentProjectId, editorRef.current, businessInfoRef.current, seoSettingsRef.current as unknown as Record<string, unknown>);
        if (!ok) throw new Error("Save failed");
      } else if (templateSlug) {
        // Create new project
        const newSite = await createSite(
          user.id,
          templateSlug,
          templateName || templateSlug,
          editorRef.current,
          businessInfoRef.current,
        );
        if (newSite) {
          setCurrentProjectId(newSite.id);
        }
      }

      setSaved(true);
      setDirty(false);
      setTimeout(() => {
        setSaving(false);
        setSaved(false);
      }, 1500);
    } catch {
      setSaving(false);
    }
  }, [saving, user, templateSlug, templateName, currentProjectId]);

  // Keyboard shortcut: Ctrl+S to save
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSave]);

  function handleApplyBusinessInfo(info: BusinessInfo) {
    if (!editorRef.current) return;
    setBusinessInfo(info);
    businessInfoRef.current = info;
    applyBusinessInfo(editorRef.current, info);
    setDirty(true);
  }

  function handleApplySeo(seo: SeoSettings) {
    setSeoSettings(seo);
    seoSettingsRef.current = seo;
    setDirty(true);
  }

  /** Export the current site as a standalone HTML file and trigger download. */
  async function handleExportHtml() {
    if (!editorRef.current || exporting) return;
    setExporting(true);

    try {
      const htmlContent = generateStaticSite(
        editorRef.current,
        businessInfoRef.current,
        seoSettingsRef.current,
        currentProjectId || undefined,
      );

      // Save published HTML to Supabase if we have a project
      if (currentProjectId) {
        await savePublishedHtml(currentProjectId, htmlContent);
      }

      // Trigger browser download
      const filename = makeFilename(
        businessInfoRef.current.business_name || templateName || templateSlug || "site",
      );
      downloadHtmlFile(htmlContent, filename);
    } finally {
      setExporting(false);
    }
  }

  /** Generate the static HTML used for publishing (includes tracking + form scripts). */
  function generateHtmlForPublish(publishSubdomain?: string): string {
    if (!editorRef.current) return "";
    return generateStaticSite(
      editorRef.current,
      businessInfoRef.current,
      seoSettingsRef.current,
      currentProjectId || undefined,
      publishSubdomain || siteSubdomain || undefined,
    );
  }

  function handlePublished(subdomain: string) {
    setSiteSubdomain(subdomain);
    setSiteStatus("published");
    setPublishDialogOpen(false);
  }

  function handleUnpublished() {
    setSiteSubdomain(null);
    setSiteStatus("unpublished");
    setPublishDialogOpen(false);
  }

  // Auto-save every 60 seconds — with status indicator
  useEffect(() => {
    if (!editorRef.current || !user) return;
    const interval = setInterval(async () => {
      if (editorRef.current && !saving && currentProjectId && dirty) {
        const ok = await saveSite(
          currentProjectId,
          editorRef.current,
          businessInfoRef.current,
          seoSettingsRef.current as unknown as Record<string, unknown>,
        );
        if (ok) {
          setDirty(false);
          setLastAutoSave(new Date());
        }
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [user, saving, currentProjectId, dirty]);

  // Warn before closing tab with unsaved changes
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (dirty) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  function handleBack() {
    if (dirty) {
      const confirmed = window.confirm(
        t(
          "editor.unsavedWarning",
          "You have unsaved changes. Are you sure you want to leave?",
        ),
      );
      if (!confirmed) return;
    }
    // Navigate to My Sites if user has projects, otherwise templates
    if (currentProjectId) {
      navigate(`/${locale}/dashboard/my-sites`);
    } else {
      navigate(`/${locale}/templates`);
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <div className="border-2 border-neo-red bg-neo-red/10 shadow-hard p-8 max-w-md text-center">
          <p className="font-space font-bold text-neo-black mb-2">
            {t("editor.error", "Editor Error")}
          </p>
          <p className="font-mono text-sm text-neo-black/70 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="font-mono text-xs border-2 border-neo-black px-4 py-2 bg-neo-bg hover:bg-neo-lime transition-colors shadow-hard-sm"
          >
            {t("editor.backToTemplates", "Back to Templates")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1a1a1a] overflow-hidden">
      {/* Toolbar */}
      <div className="h-12 bg-[#111] border-b border-[#333] flex items-center justify-between px-3 shrink-0">
        {/* Left: Back + Template Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-[#999] hover:text-white transition-colors text-xs font-mono"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">
              {t("editor.back", "Back")}
            </span>
          </button>
          <div className="w-px h-5 bg-[#333]" />
          <span className="font-space font-semibold text-white text-sm truncate max-w-[200px]">
            {templateName || templateSlug}
          </span>
          {/* Dirty / auto-save indicator */}
          {dirty && (
            <span className="ml-1.5 w-2 h-2 rounded-full bg-yellow-400 shrink-0" title={t("editor.unsaved", "Unsaved changes")} />
          )}
          {!dirty && lastAutoSave && (
            <span className="ml-1.5 text-[10px] text-[#666] font-mono shrink-0 hidden md:inline">
              {t("editor.autoSaved", "Auto-saved")}
            </span>
          )}
        </div>

        {/* Center: Device switcher + Undo/Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleDevice("Desktop")}
            className="p-1.5 text-[#999] hover:text-white transition-colors"
            title="Desktop"
          >
            <Monitor size={16} />
          </button>
          <button
            onClick={() => handleDevice("Tablet")}
            className="p-1.5 text-[#999] hover:text-white transition-colors"
            title="Tablet"
          >
            <Tablet size={16} />
          </button>
          <button
            onClick={() => handleDevice("Mobile")}
            className="p-1.5 text-[#999] hover:text-white transition-colors"
            title="Mobile"
          >
            <Smartphone size={16} />
          </button>
          <div className="w-px h-5 bg-[#333] mx-1" />
          <button
            onClick={handleUndo}
            className="p-1.5 text-[#999] hover:text-white transition-colors"
            title="Undo"
          >
            <Undo2 size={16} />
          </button>
          <button
            onClick={handleRedo}
            className="p-1.5 text-[#999] hover:text-white transition-colors"
            title="Redo"
          >
            <Redo2 size={16} />
          </button>
        </div>

        {/* Right: Preview + Save + Publish */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreview}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#ccc] border border-[#444] hover:border-[#666] hover:text-white transition-colors rounded"
          >
            <Eye size={13} />
            {t("editor.preview", "Preview")}
          </button>
          <button
            onClick={handleExportHtml}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#ccc] border border-[#444] hover:border-[#666] hover:text-white transition-colors rounded disabled:opacity-50"
            title={t("editor.exportHtml", "Download as HTML")}
          >
            <Download size={13} />
            {t("editor.export", "Export")}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded transition-colors disabled:opacity-50 ${
              saved
                ? "bg-green-500 text-white"
                : "bg-[#CDFF50] text-[#111] hover:bg-[#b8e645]"
            }`}
          >
            {saved ? <Check size={13} /> : <Save size={13} />}
            {saved
              ? t("editor.saved", "Saved!")
              : saving
                ? t("editor.saving", "Saving...")
                : t("editor.save", "Save")}
          </button>
          <button
            onClick={() => {
              if (!currentProjectId) {
                // Must save first before publishing
                handleSave();
                return;
              }
              setPublishDialogOpen(true);
            }}
            disabled={!hasPaidPlan && !currentProjectId}
            title={
              !currentProjectId
                ? t("editor.saveFirst", "Save your site first")
                : siteStatus === "published"
                  ? t("editor.managePublish", "Manage published site")
                  : t("editor.publishSite", "Publish your site")
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded transition-colors ${
              siteStatus === "published"
                ? "bg-green-600 text-white hover:bg-green-700"
                : currentProjectId
                  ? "bg-[#333] text-[#ccc] border border-[#444] hover:border-[#666] hover:text-white"
                  : "bg-[#333] text-[#999] border border-[#444] opacity-40 cursor-not-allowed"
            }`}
          >
            {siteStatus === "published" ? <Globe size={13} /> : currentProjectId ? <Globe size={13} /> : <Lock size={13} />}
            {siteStatus === "published"
              ? t("editor.published", "Published")
              : t("editor.publish", "Publish")}
          </button>
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel tabs */}
        <div className="w-10 bg-[#111] border-r border-[#333] flex flex-col items-center py-2 gap-1 shrink-0">
          <button
            onClick={() => setActivePanel("blocks")}
            className={`p-2 rounded transition-colors ${
              activePanel === "blocks"
                ? "bg-[#CDFF50]/20 text-[#CDFF50]"
                : "text-[#666] hover:text-[#999]"
            }`}
            title={t("editor.blocks", "Blocks")}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setActivePanel("layers")}
            className={`p-2 rounded transition-colors ${
              activePanel === "layers"
                ? "bg-[#CDFF50]/20 text-[#CDFF50]"
                : "text-[#666] hover:text-[#999]"
            }`}
            title={t("editor.layers", "Layers")}
          >
            <Layers size={16} />
          </button>
          <button
            onClick={() => setActivePanel("styles")}
            className={`p-2 rounded transition-colors ${
              activePanel === "styles"
                ? "bg-[#CDFF50]/20 text-[#CDFF50]"
                : "text-[#666] hover:text-[#999]"
            }`}
            title={t("editor.styles", "Styles")}
          >
            <Paintbrush size={16} />
          </button>
          <div className="w-6 border-t border-[#333] my-1" />
          <button
            onClick={() => setActivePanel("business")}
            className={`p-2 rounded transition-colors ${
              activePanel === "business"
                ? "bg-[#CDFF50]/20 text-[#CDFF50]"
                : "text-[#666] hover:text-[#999]"
            }`}
            title={t("editor.businessInfo", "Business Info")}
          >
            <Building2 size={16} />
          </button>
          <button
            onClick={() => setActivePanel("seo")}
            className={`p-2 rounded transition-colors ${
              activePanel === "seo"
                ? "bg-[#CDFF50]/20 text-[#CDFF50]"
                : "text-[#666] hover:text-[#999]"
            }`}
            title={t("editor.seoSettings", "SEO Settings")}
          >
            <Search size={16} />
          </button>
        </div>

        {/* Left panel content */}
        <div className="w-60 bg-[#1a1a1a] border-r border-[#333] overflow-y-auto shrink-0">
          <div
            id="blocks-panel"
            className={activePanel === "blocks" ? "block" : "hidden"}
          />
          <div
            id="layers-panel"
            className={activePanel === "layers" ? "block" : "hidden"}
          />
          <div
            id="styles-panel"
            className={activePanel === "styles" ? "block" : "hidden"}
          />
          <div className={activePanel === "business" ? "flex flex-col h-full" : "hidden"}>
            <BusinessInfoPanel onApply={handleApplyBusinessInfo} initialData={businessInfo} />
          </div>
          <div className={activePanel === "seo" ? "flex flex-col h-full" : "hidden"}>
            {hasPaidPlan ? (
              <SeoPanel onApply={handleApplySeo} initialData={seoSettings} />
            ) : (
              <div className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#CDFF50]/10 flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="text-[#CDFF50]" />
                </div>
                <h3 className="text-sm font-space font-semibold text-white mb-1">
                  {t("editor.seoPro", "SEO Settings")}
                </h3>
                <p className="text-[11px] text-[#888] font-mono mb-4 leading-relaxed">
                  {t(
                    "editor.seoUpgrade",
                    "Optimize your site for search engines with custom meta titles, descriptions, keywords, and social sharing settings. Available with the Growth plan.",
                  )}
                </p>
                <div className="border border-[#333] rounded-lg p-3 mb-3 text-left">
                  <p className="text-[10px] text-[#CDFF50] font-mono font-semibold uppercase mb-2">
                    {t("editor.seoIncludes", "Growth Plan includes:")}
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-[#999] font-mono">
                    <li className="flex items-center gap-1.5">
                      <Check size={10} className="text-[#CDFF50] shrink-0" />
                      {t("editor.seoFeature1", "Custom page title & description")}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={10} className="text-[#CDFF50] shrink-0" />
                      {t("editor.seoFeature2", "Google search preview")}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={10} className="text-[#CDFF50] shrink-0" />
                      {t("editor.seoFeature3", "Social media sharing image")}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={10} className="text-[#CDFF50] shrink-0" />
                      {t("editor.seoFeature4", "Keywords & canonical URL")}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check size={10} className="text-[#CDFF50] shrink-0" />
                      {t("editor.seoFeature5", "Search engine visibility control")}
                    </li>
                  </ul>
                </div>
                <a
                  href={`/${locale}/pricing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#CDFF50] text-[#111] text-xs font-mono font-semibold rounded hover:bg-[#b8e645] transition-colors"
                >
                  <Lock size={12} />
                  {t("editor.seoUpgradeBtn", "Upgrade to Growth")}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10">
              <div className="border-2 border-[#CDFF50] bg-[#CDFF50]/10 px-6 py-3 font-space font-bold text-white uppercase animate-pulse text-sm">
                {t("editor.loading", "Loading Editor...")}
              </div>
            </div>
          )}
          <div ref={containerRef} className="h-full" />
        </div>
      </div>

      {/* Publish Dialog */}
      {currentProjectId && (
        <PublishDialog
          open={publishDialogOpen}
          onClose={() => setPublishDialogOpen(false)}
          siteId={currentProjectId}
          currentSubdomain={siteSubdomain}
          currentStatus={siteStatus}
          onPublished={handlePublished}
          onUnpublished={handleUnpublished}
          generateHtml={generateHtmlForPublish}
        />
      )}
    </div>
  );
}
