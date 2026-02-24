import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DualLogo from "./DualLogo";
import NeoButton from "@/components/ui/NeoButton";

const navLinks = [
  { key: "services", href: "/services" },
  { key: "portfolio", href: "/portfolio" },
  { key: "pricing", href: "/pricing" },
  { key: "templates", href: "/templates" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const isLoggedIn = !!user;
  const currentLocale = locale ?? "en";

  async function handleLogout() {
    await signOut();
    navigate(`/${currentLocale}/login`);
    setMenuOpen(false);
  }

  const isActive = (href: string) => {
    return location.pathname === `/${currentLocale}${href}`;
  };

  const switchLanguage = (lang: string) => {
    const pathWithoutLocale = location.pathname.replace(`/${currentLocale}`, "") || "";
    navigate(`/${lang}${pathWithoutLocale}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-neo-bg border-b-4 border-neo-black" role="banner">
      <div className="max-w-container mx-auto px-4 xl:px-10 flex items-center justify-between h-20 xl:h-24 gap-3">
        <DualLogo size="md" />

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1 shrink-0" aria-label="Main navigation">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              to={`/${currentLocale}${href}`}
              aria-current={isActive(href) ? "page" : undefined}
              className={`relative font-mono text-[13px] uppercase tracking-wide whitespace-nowrap px-3 py-2 border-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-neo-lime focus-visible:outline-offset-2 ${
                isActive(href)
                  ? "border-neo-black bg-neo-lime shadow-hard-sm"
                  : "border-transparent hover:border-neo-black hover:bg-neo-yellow"
              }`}
            >
              {t(`nav.${key}`)}
              {key === "templates" && (
                <span className="absolute -top-2 -right-1 bg-neo-lime border border-neo-black px-1 py-px text-[9px] font-bold leading-none">
                  €39
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Right — Language + Auth Icon + CTA */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          {/* Language switcher */}
          <div className="flex border-2 border-neo-black shrink-0" role="group" aria-label="Language switcher">
            {(["en", "fr", "nl", "de"] as const).map((lang, i) => (
              <div key={lang} className="flex">
                {i > 0 && <div className="w-0.5 bg-neo-black" />}
                <button
                  onClick={() => switchLanguage(lang)}
                  aria-label={`Switch to ${lang === "en" ? "English" : lang === "fr" ? "Français" : lang === "nl" ? "Nederlands" : "Deutsch"}`}
                  aria-pressed={currentLocale === lang}
                  className={`px-2.5 py-1.5 text-xs font-mono font-bold transition-colors focus-visible:outline-2 focus-visible:outline-neo-lime focus-visible:outline-offset-1 ${
                    currentLocale === lang ? "bg-neo-lime" : "hover:bg-neo-lime"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              </div>
            ))}
          </div>

          {/* Auth — dashboard + logout icons when logged in, login/register when logged out */}
          {isLoggedIn ? (
            <div className="flex gap-1 shrink-0">
              <Link
                to={`/${currentLocale}${role === "ADMIN" ? "/admin" : "/dashboard"}`}
                className="flex items-center justify-center w-9 h-9 border-2 border-neo-black bg-neo-blue hover:bg-neo-blue/80 transition-colors"
                aria-label={role === "ADMIN" ? "Admin" : t("auth.dashboard")}
                title={role === "ADMIN" ? "Admin" : t("auth.dashboard")}
              >
                <LayoutDashboard size={16} className="text-neo-white" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-9 h-9 border-2 border-neo-black hover:bg-neo-red/20 transition-colors"
                aria-label={t("auth.logout", "Sign Out")}
                title={t("auth.logout", "Sign Out")}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex gap-1 shrink-0">
              <Link
                to={`/${currentLocale}/login`}
                className="flex items-center justify-center w-9 h-9 border-2 border-neo-black hover:bg-neo-yellow transition-colors"
                aria-label={t("auth.login")}
                title={t("auth.login")}
              >
                <LogIn size={16} />
              </Link>
              <Link
                to={`/${currentLocale}/register`}
                className="flex items-center justify-center w-9 h-9 border-2 border-neo-black bg-neo-blue hover:bg-neo-blue/80 transition-colors"
                aria-label={t("auth.register")}
                title={t("auth.register")}
              >
                <UserPlus size={16} className="text-neo-white" />
              </Link>
            </div>
          )}

          {/* CTA */}
          <NeoButton href="/contact" size="sm" color="neo-lime">
            {t("nav.startProject")}
          </NeoButton>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="xl:hidden border-2 border-neo-black p-2 hover:bg-neo-lime transition-colors focus-visible:outline-2 focus-visible:outline-neo-lime focus-visible:outline-offset-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div id="mobile-nav" className="xl:hidden border-t-4 border-neo-black bg-neo-bg">
          <nav className="flex flex-col p-4 gap-2" aria-label="Mobile navigation">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                to={`/${currentLocale}${href}`}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative font-mono text-sm uppercase tracking-wider px-4 py-3 border-2 border-neo-black transition-colors focus-visible:outline-2 focus-visible:outline-neo-lime focus-visible:outline-offset-2 ${isActive(href) ? "bg-neo-lime shadow-hard-sm" : "hover:bg-neo-lime"}`}
              >
                {t(`nav.${key}`)}
                {key === "templates" && (
                  <span className="absolute top-1 right-2 bg-neo-lime border border-neo-black px-1 py-px text-[9px] font-bold leading-none">
                    €39
                  </span>
                )}
              </Link>
            ))}
            <div className="grid grid-cols-4 gap-2 mt-2">
              {(["en", "fr", "nl", "de"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { switchLanguage(lang); setMenuOpen(false); }}
                  aria-label={`Switch to ${lang === "en" ? "English" : lang === "fr" ? "Français" : lang === "nl" ? "Nederlands" : "Deutsch"}`}
                  aria-pressed={currentLocale === lang}
                  className={`text-center px-4 py-3 font-mono text-sm font-bold border-2 border-neo-black transition-colors focus-visible:outline-2 focus-visible:outline-neo-lime focus-visible:outline-offset-2 ${
                    currentLocale === lang ? "bg-neo-lime" : "hover:bg-neo-lime"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Auth buttons - mobile */}
            {isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <NeoButton
                  href={role === "ADMIN" ? "/admin" : "/dashboard"}
                  size="md"
                  color="neo-blue"
                  className="w-full"
                >
                  <LayoutDashboard size={16} />
                  {role === "ADMIN" ? "Admin Panel" : t("auth.dashboard")}
                </NeoButton>
                <NeoButton
                  onClick={handleLogout}
                  size="md"
                  variant="outline"
                  className="w-full"
                >
                  <LogOut size={16} />
                  {t("auth.logout", "Sign Out")}
                </NeoButton>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <NeoButton href="/login" size="md" variant="outline" className="w-full">
                  <LogIn size={16} />
                  {t("auth.login")}
                </NeoButton>
                <NeoButton href="/register" size="md" color="neo-blue" className="w-full">
                  <UserPlus size={16} />
                  {t("auth.register")}
                </NeoButton>
              </div>
            )}

            <NeoButton
              href="/contact"
              size="md"
              color="neo-lime"
              className="mt-2 w-full"
            >
              {t("nav.startProject")}
            </NeoButton>
          </nav>
        </div>
      )}
    </header>
  );
}
