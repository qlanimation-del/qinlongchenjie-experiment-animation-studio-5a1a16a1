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

  // Refs for layers + title — DOM-direct transforms, no React re-render on scroll.
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);

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

  // Single rAF-driven scroll handler — writes transforms to refs directly.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;

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
        // translate3d forces GPU compositor layer for smoother desktop scrolling
        el.style.transform = `translate3d(0, ${y}px, 0) scale(${baseScales[i]})`;
      }

      // Title
      if (titleRef.current) {
        const titleOpacity = Math.max(0, 1 - scrollY / 400);
        const titleTranslateY = scrollY * 0.3;
        titleRef.current.style.opacity = String(titleOpacity);
        titleRef.current.style.transform = `translate3d(-50%, ${titleTranslateY}px, 0)`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Initial paint so transforms are correct before first scroll
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, isTablet, effectiveLayers.length, baseScales.join(","), extraYs.join(",")]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
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
