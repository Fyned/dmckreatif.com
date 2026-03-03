import { useTranslation } from "react-i18next";

const clients = [
  { name: "CAKIR FACADES", logo: "/logos/cakir.svg", country: "FR" },
  { name: "ALTINBAS", logo: "/logos/altinbas.svg", country: "FR" },
  { name: "CONSULTING ENERGY", logo: "/logos/consulting-energy.svg", country: "FR" },
  { name: "ISO HOME ENERGY", logo: "/logos/ih-energy.svg", country: "FR" },
  { name: "ID HOME", logo: "/logos/idhome.svg", country: "FR" },
  { name: "ARCHI CONSTRUCTION", logo: "/logos/archi.svg", country: "BE" },
  { name: "MKN TECHNISCH", logo: "/logos/mkn.svg", country: "BE" },
  { name: "ADAMSONS", logo: "/logos/adamsons.svg", country: "UK" },
  { name: "ATA ACCOUNTANCY", logo: "/logos/ata.svg", country: "UK" },
  { name: "NORTHWEST AC", logo: "/logos/northwest.svg", country: "UK" },
  { name: "GMG DESIGN", logo: null, country: "INT" },
];

export default function ClientLogoBar() {
  const { t } = useTranslation();
  const duplicated = [...clients, ...clients];

  return (
    <section className="py-8 overflow-hidden border-y-2 border-neo-black bg-neo-white">
      <div className="text-center mb-5">
        <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neo-black/40 border-2 border-neo-black/10 px-4 py-1.5 mb-2">
          {t("clientLogos.trustedBy", "TRUSTED BY BUSINESSES ACROSS EUROPE")}
        </span>
        <p className="font-mono text-xs text-neo-black/50">
          {t("clientLogos.projectsDelivered", "33+ projects delivered across Europe")}
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-4 animate-marquee-logos motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4">
          {duplicated.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 inline-flex items-center justify-center border-2 border-neo-black/10 bg-neo-bg px-6 py-3 select-none hover:border-neo-lime hover:bg-neo-lime/5 transition-colors"
              style={{ minWidth: 160, height: 64 }}
              title={client.name}
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-8 max-w-[120px] w-auto object-contain"
                  style={{ filter: "grayscale(100%) contrast(0.8)" }}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    (e.currentTarget.nextSibling as HTMLElement | null)?.removeAttribute("hidden");
                  }}
                />
              ) : null}
              <span
                hidden={!!client.logo}
                className="font-space font-bold text-[10px] uppercase tracking-wider text-neo-black/50 whitespace-nowrap"
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
