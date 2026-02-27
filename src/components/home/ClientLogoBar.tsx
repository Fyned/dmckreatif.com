import { useTranslation } from "react-i18next";

const clients = [
  { name: "CAKIR FACADES", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "ALTINBAS", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "CONSULTING ENERGY", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "ISO HOME ENERGY", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "ID HOME", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "RETRO KOSAR", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "ARCHI CONSTRUCTION", flag: "\u{1F1E7}\u{1F1EA}" },
  { name: "MKN TECHNISCH", flag: "\u{1F1E7}\u{1F1EA}" },
  { name: "ADAMSONS", flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "ATA ACCOUNTANCY", flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "NORTHWEST AC", flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "GMG DESIGN", flag: "\u{1F30D}" },
];

export default function ClientLogoBar() {
  const { t } = useTranslation();

  const duplicated = [...clients, ...clients];

  return (
    <section className="py-8 overflow-hidden border-y-2 border-neo-black bg-neo-bg">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neo-black/40 border-2 border-neo-black/10 px-4 py-1.5 mb-2">
          {t("clientLogos.trustedBy", "TRUSTED BY BUSINESSES ACROSS EUROPE")}
        </span>
        <p className="font-mono text-xs text-neo-black/50">
          {t("clientLogos.projectsDelivered", "33+ projects delivered in 4 countries")}
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex gap-3 animate-marquee-logos motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-3">
          {duplicated.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-neo-black/15 bg-neo-white px-4 py-2 select-none hover:border-neo-lime hover:bg-neo-lime/5 transition-colors"
            >
              <span className="text-sm">{client.flag}</span>
              <span className="font-space font-bold text-[10px] uppercase tracking-wider text-neo-black/50 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
