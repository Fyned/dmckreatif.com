import { useTranslation } from "react-i18next";

const clients = [
  { name: "CAKIR FACADES", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "ALTINBAS", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "CONSULTING ENERGY", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "ISO HOME ENERGY", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "ARCHI CONSTRUCTION", flag: "\u{1F1E7}\u{1F1EA}" },
  { name: "ADAMSONS", flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "FILENESSPORTS", flag: "\u{1F30D}" },
  { name: "GMG DESIGN", flag: "\u{1F30D}" },
];

export default function ClientLogoBar() {
  const { t } = useTranslation();

  const duplicated = [...clients, ...clients];

  return (
    <section className="py-10 overflow-hidden border-y-2 border-neo-black bg-neo-bg">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neo-black/40 border-2 border-neo-black/10 px-4 py-1.5 mb-2">
          {t("clientLogos.trustedBy", "TRUSTED BY BUSINESSES ACROSS EUROPE")}
        </span>
        <p className="font-mono text-xs text-neo-black/50">
          {t("clientLogos.projectsDelivered", "33+ projects delivered in 4 countries")}
        </p>
      </div>

      {/* Marquee — CSS animation */}
      <div className="relative">
        <div className="flex gap-4 animate-marquee-logos motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-3">
          {duplicated.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 inline-flex items-center gap-2 border border-neo-black/10 bg-neo-white px-5 py-2.5 select-none"
            >
              <span className="text-sm">{client.flag}</span>
              <span className="font-space font-bold text-xs uppercase tracking-wider text-neo-black/40 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
