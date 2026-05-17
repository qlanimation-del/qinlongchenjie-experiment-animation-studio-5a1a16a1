import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { ParallaxLayer } from "@/data/projects";

// Device detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return { isMobile, isTablet };
};

interface ParallaxHeroProps {
  layers?: ParallaxLayer[];
  singleImage?: string;
  title: string;
  type: string;
  year: string;
  glowColor: string;
  onScrollDown: () => void;
}

const ParallaxHero = ({
  layers,
  singleImage,
  title,
  type,
  year,
  glowColor,
  onScrollDown,
}: ParallaxHeroProps) => {
  const { isMobile, isTablet } = useIsMobile();
  const is3D = !isMobile && !isTablet;

  // Refs for layers + title — DOM-direct transforms, no React re-render on scroll.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Layer data (unchanged)
  const effectiveLayers: (ParallaxLayer & { overlay?: string; scaleBase?: number })[] = layers && layers.length > 0
    ? layers
    : singleImage
      ? [
          { src: singleImage, speed: 0.1, scaleBase: 1.35 },
          { src: singleImage, speed: 0.25, overlay: "bg-black/30", scaleBase: 1.3 },
          { src: "", speed: 0.4, overlay: "vignette", scaleBase: 1.25 },
        ]
      : [];

  // Compute the static base scale per layer (does NOT depend on scroll)
  const baseScales = effectiveLayers.map((layer, i) => {
    const baseScale = isMobile ? 1.25 : isTablet ? 1.3 : 1.35;
    return (layer as any).scaleBase
      ? ((layer as any).scaleBase + (isMobile ? -0.15 : isTablet ? -0.05 : 0))
      : (baseScale - i * 0.03);
  });

  // Per-layer extra Y offset (mid layer only)
  const extraYs = effectiveLayers.map((layer) => {
    const isMid = layer.src.includes("parallax-mid");
    if (isMobile) return isMid ? 60 : 0;
    if (isTablet) return isMid ? 25 : 0;
    return 0;
  });

  // Per-layer Z depth for 3D parallax (desktop only)
  const layerZ = (i: number) => {
    if (!is3D) return 0;
    if (i === 0) return -100;
    if (i === 1) return 0;
    return 80;
  };
  // Mouse parallax strength per layer (px)
  const mouseStrength = (i: number) => {
    if (!is3D) return 0;
    if (i === 0) return 8;
    if (i === 1) return 16;
    return 24;
  };

  // Single rAF-driven scroll + mouse handler — writes transforms to refs directly.
  useEffect(() => {
    let ticking = false;
    let reduced = false;
    if (typeof window !== "undefined") {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const update = () => {
      const scrollY = window.scrollY;
      const m = mouseRef.current;
      // Ease mouse towards target
      m.x += (m.tx - m.x) * 0.08;
      m.y += (m.ty - m.y) * 0.08;

      // Layers
      for (let i = 0; i < effectiveLayers.length; i++) {
        const el = layerRefs.current[i];
        if (!el) continue;

        const parallaxOffset = (() => {
          if (isMobile) return i === 0 ? scrollY * 0.2 : i === 1 ? 0 : -scrollY * 0.2;
          if (isTablet) return i === 0 ? scrollY * 0.25 : i === 1 ? 0 : -scrollY * 0.35;
          return i === 0 ? scrollY * 0.4 : i === 1 ? 0 : -scrollY * 0.6;
        })();

        const y = parallaxOffset + extraYs[i];
        const z = layerZ(i);
        const ms = mouseStrength(i);
        const mx = m.x * ms;
        const my = m.y * ms * 0.7;
        el.style.transform = `translate3d(${mx}px, ${y + my}px, ${z}px) scale(${baseScales[i]})`;
      }

      // Title
      if (titleRef.current) {
        const titleOpacity = Math.max(0, 1 - scrollY / 400);
        const titleTranslateY = scrollY * 0.3;
        const z = is3D ? 120 : 0;
        const mx = is3D ? m.x * 30 : 0;
        titleRef.current.style.opacity = String(titleOpacity);
        titleRef.current.style.transform = `translate3d(calc(-50% + ${mx}px), ${titleTranslateY}px, ${z}px)`;
      }

      // Container subtle push-back on scroll
      if (containerRef.current && is3D) {
        const pushZ = -Math.min(scrollY * 0.15, 80);
        containerRef.current.style.transform = `translateZ(${pushZ}px)`;
      }

      ticking = false;
    };

    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onMouse = (e: MouseEvent) => {
      if (!is3D || reduced) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseRef.current.tx = (e.clientX / w) * 2 - 1;
      mouseRef.current.ty = (e.clientY / h) * 2 - 1;
      schedule();
    };

    // Continuous easing loop while mouse target != current (lightweight)
    let raf = 0;
    const loop = () => {
      const m = mouseRef.current;
      if (Math.abs(m.tx - m.x) > 0.001 || Math.abs(m.ty - m.y) > 0.001) {
        update();
      }
      raf = requestAnimationFrame(loop);
    };

    // Initial paint so transforms are correct before first scroll
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    if (is3D && !reduced) {
      window.addEventListener("mousemove", onMouse, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("mousemove", onMouse);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile, isTablet, is3D, effectiveLayers.length, baseScales.join(","), extraYs.join(",")]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      style={is3D ? { perspective: "1200px", transformStyle: "preserve-3d" } : undefined}
    >
      {effectiveLayers.map((layer, i) => {
        const isVignette = (layer as any).overlay === "vignette";

        // Per-image transform (size + position, NOT scroll-driven)
        const imgTransform = (() => {
          if (i === 0) {
            return isMobile
              ? "scale(0.85) translateY(10px)"
              : isTablet
                ? "scale(0.95) translateY(0px)"
                : "scale(1) translateY(-40px)";
          }
          return isMobile
            ? "scale(1.3) translateY(10px)"
            : isTablet
              ? "scale(1.5) translateY(30px)"
              : "scale(1) translateY(-30px)";
        })();

        if (isVignette) {
          return (
            <div
              key={i}
              ref={(el) => { layerRefs.current[i] = el; }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: i + 1, willChange: "transform" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>
          );
        }

        return (
          <div
            key={i}
            ref={(el) => { layerRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: i, willChange: "transform" }}
          >
            {layer.src && (
              <img
                src={layer.src}
                alt={`Layer ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: isMobile ? "center 15%" : isTablet ? "center 14%" : "center 15%",
                  transform: imgTransform,
                }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "auto" : "async"}
              />
            )}
          </div>
        );
      })}

      {/* Bottom title — transform driven by ref, not React state */}
      <div
        ref={titleRef}
        className="absolute bottom-44 left-1/2 z-[7] pointer-events-none w-full px-6 text-center"
        style={{ willChange: "transform, opacity", transform: "translate3d(-50%, 0, 0)" }}
      >
        <span className="tracking-[0.35em] uppercase text-white drop-shadow-lg inline-block pl-[0.35em]">{type}</span>
      </div>

      {/* Down chevron */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[20]">
        <button onClick={onScrollDown} className="animate-bounce text-white/50">
          <ChevronDown size={48} />
        </button>
      </div>
    </div>
  );
};

export default ParallaxHero;
