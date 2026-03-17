import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/logo.webp";

export type NavVariant = "dark" | "light";

interface NavbarProps {
  className?: string;
  variant?: NavVariant;
}

const SHOW_NAV_THRESHOLD = 400;

const Navbar = ({ className = "", variant = "dark" }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const lastScrollY = useRef(0);
  const hideProgress = useRef(0);
  const [, forceRender] = useState(0);

  const isLight = variant === "light";

  const navLinks = [
    { label: t("nav", "work"), to: "/work" },
    { label: t("nav", "drawing"), to: "/drawing" },
    { label: t("nav", "photographs"), to: "/photographs" },
    { label: t("nav", "team"), to: "/team" },
    { label: t("nav", "contact"), to: "/contact" },
  ];

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY.current;

    if (currentY < 10) {
      hideProgress.current = 0;
    } else if (delta > 0) {
      hideProgress.current = Math.min(1, hideProgress.current + delta * 0.012);
    } else if (currentY < SHOW_NAV_THRESHOLD) {
      hideProgress.current = Math.max(0, hideProgress.current + delta * 0.012);
    } else {
      hideProgress.current = 1;
    }

    lastScrollY.current = currentY;
    forceRender((p) => p + 1);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const textColor = isLight ? "text-black" : "text-white";
  const textMuted = isLight ? "text-black/70" : "text-white/70";
  const textActive = isLight ? "text-black" : "text-white";
  const hoverText = isLight ? "hover:text-black" : "hover:text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] pt-[env(safe-area-inset-top)] ${className}`}
        style={{
          height: "72px",
          transform: `translateY(-${hideProgress.current * 100}%)`,
          willChange: "transform",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[72px] sm:h-[80px] md:h-[88px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <img src={logo} alt="Logo" className="h-11 sm:h-14 md:h-16 w-auto rounded object-contain" />
            <div className="flex flex-col gap-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <span className={cn("text-sm sm:text-base md:text-lg font-extrabold tracking-[0.02em] leading-none", textColor)}>
                QinLong<span className={cn("font-normal", isLight ? "text-black/80" : "text-white/80")}>&</span>ChenJie
              </span>
              <span
                className={cn("text-[8px] sm:text-[9px] md:text-[10px] uppercase leading-none block w-full font-medium mt-0.5", textMuted)}
                style={{ textAlign: "justify", textAlignLast: "justify", letterSpacing: "0.12em" }}
              >
                experiment animation studio
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium tracking-widest transition-colors",
                  hoverText,
                  location.pathname === link.to ? textActive : textMuted
                )}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher variant={variant} />
          </div>

          {/* Mobile/tablet hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher variant={variant} />
            <button
              className={cn("p-1 relative z-[10001]", textColor)}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/tablet fullscreen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[10000] flex flex-col items-center justify-center transition-all duration-300",
          "bg-black/50 backdrop-blur-xl",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <button
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-2xl font-medium tracking-[0.2em] uppercase transition-colors hover:text-white",
                location.pathname === link.to ? "text-white" : "text-white/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
