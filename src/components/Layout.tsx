import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import type { NavVariant } from "./Navbar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  fullBleed?: boolean;
  navVariant?: NavVariant;
  className?: string;
}

const Layout = ({ children, fullBleed = false, navVariant = "dark", className }: LayoutProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  // Page transition on route change
  useEffect(() => {
    setIsTransitioning(true);
    const t = setTimeout(() => setIsTransitioning(false), 50);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Cursor glow effect (desktop only)
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--glow-x", `${e.clientX}px`);
      el.style.setProperty("--glow-y", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={cn("min-h-screen flex flex-col relative", className)}>
      {/* Cursor glow overlay */}
      <div
        ref={glowRef}
        className="cursor-glow pointer-events-none fixed inset-0 z-[9998] opacity-0 transition-opacity duration-300 hidden lg:block"
        aria-hidden="true"
      />
      <Navbar variant={navVariant} />
      <main
        className={cn(
          "flex-1 transition-opacity duration-300 ease-out",
          fullBleed ? "" : "pt-[72px]",
          isTransitioning ? "opacity-0" : "opacity-100"
        )}
      >
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
