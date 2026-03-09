import { useState } from "react";
import { motion } from "framer-motion";
import CountryFlag from "@/components/ui/CountryFlag";

interface Location {
  city: string;
  country: string;
  flag: string;
  type: "hq" | "coworking";
  x: number;
  y: number;
}

const locations: Location[] = [
  { city: "London",     country: "United Kingdom", flag: "gb", type: "hq",        x: 28.6, y: 55.4 },
  { city: "Paris",      country: "France",          flag: "fr", type: "coworking", x: 35.1, y: 62.4 },
  { city: "Brussels",   country: "Belgium",         flag: "be", type: "coworking", x: 41.1, y: 57.3 },
  { city: "Amsterdam",  country: "Netherlands",     flag: "nl", type: "coworking", x: 42.6, y: 53.0 },
  { city: "Berlin",     country: "Germany",         flag: "de", type: "coworking", x: 66.9, y: 52.7 },
  { city: "Zurich",     country: "Switzerland",     flag: "ch", type: "coworking", x: 52.9, y: 66.5 },
  { city: "Barcelona",  country: "Spain",           flag: "es", type: "coworking", x: 34.9, y: 82.7 },
  { city: "Copenhagen", country: "Denmark",         flag: "dk", type: "coworking", x: 64.6, y: 44.1 },
  { city: "Stockholm",  country: "Sweden",          flag: "se", type: "coworking", x: 80.3, y: 34.3 },
  { city: "Vienna",     country: "Austria",         flag: "at", type: "coworking", x: 75.4, y: 64.9 },
];

const countries = [
  { flag: "gb", name: "United Kingdom", status: "Registered HQ" },
  { flag: "fr", name: "France",         status: "Primary Market" },
  { flag: "be", name: "Belgium",        status: "Active Market" },
  { flag: "nl", name: "Netherlands",   status: "Active Market" },
  { flag: "de", name: "Germany",        status: "Active Market" },
  { flag: "ch", name: "Switzerland",   status: "Active Market" },
  { flag: "se", name: "Sweden",         status: "Served" },
  { flag: "dk", name: "Denmark",        status: "Served" },
  { flag: "no", name: "Norway",         status: "Served" },
  { flag: "es", name: "Spain",          status: "Served" },
  { flag: "at", name: "Austria",        status: "Served" },
  { flag: "lu", name: "Luxembourg",     status: "Served" },
];

export default function GlobalPresenceMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Dot map */}
      <div className="border-2 border-neo-black bg-neo-white shadow-hard overflow-hidden">
        <div className="border-b-2 border-neo-black px-5 py-3 flex items-center justify-between bg-neo-black text-neo-bg">
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">NETWORK.MAP — EUROPE</span>
          <span className="font-mono text-xs text-neo-bg/60">{locations.length} locations • {countries.length} markets</span>
        </div>

        <div
          className="relative w-full bg-neo-bg"
          style={{ paddingBottom: "75%", backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        >
          {/* SVG lines from London to all others */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {locations.filter(l => l.type !== "hq").map((loc) => (
              <line
                key={loc.city}
                x1="28.6" y1="55.4"
                x2={loc.x} y2={loc.y}
                stroke="rgba(205,255,80,0.35)"
                strokeWidth="0.3"
                strokeDasharray="1 1"
              />
            ))}
          </svg>

          {/* City dots */}
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="absolute"
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setHovered(loc.city)}
              onMouseLeave={() => setHovered(null)}
            >
              {loc.type === "hq" ? (
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="relative"
                >
                  <div className="w-5 h-5 bg-neo-lime border-2 border-neo-black shadow-hard flex items-center justify-center cursor-default">
                    <div className="w-2 h-2 bg-neo-black" />
                  </div>
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-bold bg-neo-black text-neo-lime px-1.5 py-0.5 border border-neo-lime/40">
                    HQ — LONDON
                  </div>
                </motion.div>
              ) : (
                <div className="relative cursor-default">
                  <div className={`w-3 h-3 border-2 border-neo-black transition-colors duration-150 ${hovered === loc.city ? "bg-neo-lime" : "bg-neo-black/70"}`} />
                  {hovered === loc.city && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-bold bg-neo-black text-neo-bg px-2 py-0.5 z-10"
                    >
                      <CountryFlag code={loc.flag} size="sm" /> {loc.city}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t-2 border-neo-black px-5 py-3 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neo-lime border-2 border-neo-black flex-shrink-0" />
            <span className="font-mono text-[10px] text-neo-black/70 uppercase tracking-wider">Registered Office (HQ)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neo-black/70 border-2 border-neo-black flex-shrink-0" />
            <span className="font-mono text-[10px] text-neo-black/70 uppercase tracking-wider">Co-working / Remote</span>
          </div>
        </div>
      </div>

      {/* Country grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {countries.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            viewport={{ once: true }}
            className={`border-2 border-neo-black p-3 flex items-center gap-3 ${c.status === "Registered HQ" ? "bg-neo-lime shadow-hard" : "bg-neo-white"}`}
          >
            <CountryFlag code={c.flag} size="lg" />
            <div className="min-w-0">
              <div className="font-space font-bold text-xs truncate">{c.name}</div>
              <div className="font-mono text-[10px] text-neo-black/60 uppercase tracking-wide">{c.status}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
