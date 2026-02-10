"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import DualLogo from "./DualLogo";
import NeoButton from "@/components/ui/NeoButton";

const navLinks = [
  { key: "services", href: "/services" },
  { key: "portfolio", href: "/portfolio" },
  { key: "pricing", href: "/pricing" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-neo-bg border-b-4 border-neo-black">
      <div className="max-w-container mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        <DualLogo size="sm" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                className={`font-mono text-xs uppercase tracking-wider px-3 py-2 border-2 transition-all duration-150 ${
                  isActive
                    ? "border-neo-black bg-neo-lime shadow-hard-sm"
                    : "border-transparent hover:border-neo-black hover:bg-neo-yellow"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex border-2 border-neo-black">
            <Link
              href={pathname}
              locale="en"
              className="px-2 py-1 text-xs font-mono font-bold hover:bg-neo-lime transition-colors"
            >
              EN
            </Link>
            <div className="w-0.5 bg-neo-black" />
            <Link
              href={pathname}
              locale="fr"
              className="px-2 py-1 text-xs font-mono font-bold hover:bg-neo-lime transition-colors"
            >
              FR
            </Link>
          </div>

          <NeoButton href="/contact" size="sm" color="neo-lime">
            {t("startProject")}
          </NeoButton>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden border-2 border-neo-black p-2 hover:bg-neo-lime transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden border-t-4 border-neo-black bg-neo-bg">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wider px-4 py-3 border-2 border-neo-black hover:bg-neo-lime transition-colors"
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex gap-2 mt-2">
              <Link
                href={pathname}
                locale="en"
                className="flex-1 text-center px-4 py-3 font-mono text-sm font-bold border-2 border-neo-black hover:bg-neo-lime transition-colors"
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="fr"
                className="flex-1 text-center px-4 py-3 font-mono text-sm font-bold border-2 border-neo-black hover:bg-neo-lime transition-colors"
              >
                FR
              </Link>
            </div>
            <NeoButton
              href="/contact"
              size="md"
              color="neo-lime"
              className="mt-2 w-full"
            >
              {t("startProject")}
            </NeoButton>
          </nav>
        </div>
      )}
    </header>
  );
}
