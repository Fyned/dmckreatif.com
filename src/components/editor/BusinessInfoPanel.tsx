import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Type,
  Palette,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  FileText,
  Wand2,
} from "lucide-react";
import type { BusinessInfo } from "@/lib/template-placeholders";
import { EMPTY_BUSINESS_INFO } from "@/lib/template-placeholders";

interface Props {
  onApply: (info: BusinessInfo) => void;
  initialData?: Partial<BusinessInfo>;
}

/** Compact text field for the dark editor sidebar. */
function Field({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#999] uppercase mb-1">
        <Icon size={11} />
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#222] border border-[#444] rounded px-2 py-1.5 text-xs text-white placeholder-[#666] font-mono focus:border-[#CDFF50] focus:outline-none transition-colors"
      />
    </label>
  );
}

/** Color picker field. */
function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#999] uppercase mb-1">
        <Palette size={11} />
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 border border-[#444] rounded cursor-pointer bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-[#222] border border-[#444] rounded px-2 py-1.5 text-xs text-white font-mono focus:border-[#CDFF50] focus:outline-none transition-colors"
        />
      </div>
    </label>
  );
}

export default function BusinessInfoPanel({ onApply, initialData }: Props) {
  const { t } = useTranslation();
  const [info, setInfo] = useState<BusinessInfo>({
    ...EMPTY_BUSINESS_INFO,
    ...initialData,
  });

  const set = useCallback(
    (field: keyof BusinessInfo) => (value: string) => {
      setInfo((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleApply = () => {
    onApply(info);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#333]">
        <h3 className="font-space font-semibold text-white text-xs uppercase tracking-wider">
          {t("editor.businessInfo", "Business Info")}
        </h3>
        <p className="text-[10px] text-[#666] font-mono mt-0.5">
          {t(
            "editor.businessInfoDesc",
            "Fill in your details to personalize the template",
          )}
        </p>
      </div>

      {/* Scrollable form */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {/* Core info */}
        <div className="space-y-2">
          <Field
            icon={Building2}
            label={t("editor.businessName", "Business Name")}
            value={info.business_name}
            onChange={set("business_name")}
            placeholder="Savoria Restaurant"
          />
          <Field
            icon={Type}
            label={t("editor.slogan", "Slogan / Tagline")}
            value={info.slogan}
            onChange={set("slogan")}
            placeholder="Where Every Dish Tells a Story"
          />
          <Field
            icon={FileText}
            label={t("editor.shortDescription", "Short Description")}
            value={info.short_description}
            onChange={set("short_description")}
            placeholder="Award-winning cuisine in the heart of Paris"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-[#333]" />

        {/* Contact */}
        <div className="space-y-2">
          <Field
            icon={Phone}
            label={t("editor.phone", "Phone")}
            value={info.phone}
            onChange={set("phone")}
            type="tel"
            placeholder="+33 1 23 45 67 89"
          />
          <Field
            icon={Mail}
            label={t("editor.email", "Email")}
            value={info.email}
            onChange={set("email")}
            type="email"
            placeholder="hello@savoria.fr"
          />
          <Field
            icon={MapPin}
            label={t("editor.address", "Address")}
            value={info.address}
            onChange={set("address")}
            placeholder="12 Rue de Rivoli, 75001 Paris"
          />
          <Field
            icon={Clock}
            label={t("editor.hours", "Working Hours")}
            value={info.hours}
            onChange={set("hours")}
            placeholder="Mon–Sat: 11:00–23:00"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-[#333]" />

        {/* Brand Colors */}
        <div className="space-y-2">
          <ColorField
            label={t("editor.primaryColor", "Primary Color")}
            value={info.primary_color}
            onChange={set("primary_color")}
          />
          <ColorField
            label={t("editor.secondaryColor", "Secondary Color")}
            value={info.secondary_color}
            onChange={set("secondary_color")}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-[#333]" />

        {/* Social Media */}
        <div className="space-y-2">
          <Field
            icon={Facebook}
            label="Facebook"
            value={info.social_facebook}
            onChange={set("social_facebook")}
            type="url"
            placeholder="https://facebook.com/savoria"
          />
          <Field
            icon={Instagram}
            label="Instagram"
            value={info.social_instagram}
            onChange={set("social_instagram")}
            type="url"
            placeholder="https://instagram.com/savoria"
          />
          <Field
            icon={Twitter}
            label="X / Twitter"
            value={info.social_twitter}
            onChange={set("social_twitter")}
            type="url"
            placeholder="https://x.com/savoria"
          />
          <Field
            icon={Linkedin}
            label="LinkedIn"
            value={info.social_linkedin}
            onChange={set("social_linkedin")}
            type="url"
            placeholder="https://linkedin.com/company/savoria"
          />
        </div>
      </div>

      {/* Apply button — sticky bottom */}
      <div className="px-3 py-2 border-t border-[#333]">
        <button
          onClick={handleApply}
          className="w-full flex items-center justify-center gap-2 bg-[#CDFF50] text-[#111] font-mono text-xs font-semibold py-2 rounded hover:bg-[#b8e645] transition-colors"
        >
          <Wand2 size={13} />
          {t("editor.applyToTemplate", "Apply to Template")}
        </button>
      </div>
    </div>
  );
}
