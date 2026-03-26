import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { ParallaxLayer } from "@/data/projects";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
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

const ParallaxHero = ({ layers, singleImage, title, type, year, glowColor, onScrollDown }: ParallaxHeroProps) => {
  const isMobile = useIsMobile();
  const rafRef = useRef<number>(0);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(isMobile);

  // Keep mobile ref in sync without triggering scroll recalc
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  const effectiveLayers: (ParallaxLayer & { overlay?: string; scaleBase?: number })[] = layers && layers.length > 0
    ? layers
    : singleImage
      ? [
          { src: singleImage, speed: 0.1, scaleBase: 1.35 },
          { src: singleImage, speed: 0.25, overlay: "bg-black/30", scaleBase: 1.3 },
          { src: "", speed: 0.4, overlay: "vignette", scaleBase: 1.25 },
        ]
      : [];

  const updatePositions = useCallback(() => {
    const scrollY = window.scrollY;
    const mobile = isMobileRef.current;

    // Update layers
    effectiveLayers.forEach((layer, i) => {
      const el = layerRefs.current[i];
      if (!el) return;

      const parallaxOffset = mobile
        ? (i === 0 ? scrollY * 0.2 : i === 1 ? 0 : -scrollY * 0.2)
        : (i === 0 ? scrollY * 0.4 : i === 1 ? 0 : -scrollY * 0.6);

      const isVignette = (layer as any).overlay === "vignette";

      if (isVignette) {
        el.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
      } else {
        const baseScale = mobile ? 1.25 : 1.35;
        const scale = (layer as any).scaleBase
          ? ((layer as any).scaleBase + (mobile ? -0.15 : 0))
          : (baseScale - i * 0.03);
        el.style.transform = `translate3d(0, ${parallaxOffset}px, 0) scale(${scale})`;
      }
    });

    // Update title
    if (titleRef.current) {
      const opacity = Math.max(0, 1 - scrollY / 400);
      const translateY = scrollY * 0.3;
      titleRef.current.style.opacity = String(opacity);
      titleRef.current.style.transform = `translateX(-50%) translate3d(0, ${translateY}px, 0)`;
    }

    // Update chevron
    if (chevronRef.current) {
      const opacity = Math.max(0, 1 - scrollY / 400);
      chevronRef.current.style.opacity = String(opacity);
    }
  }, [effectiveLayers]);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePositions);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial position
    updatePositions();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updatePositions]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {effectiveLayers.map((layer, i) => {
        const isVignette = (layer as any).overlay === "vignette";

        if (isVignette) {
          return (
            <div
              key={i}
              ref={(el) => { layerRefs.current[i] = el; }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                zIndex: i + 1,
                willChange: "transform",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>
          );
        }

        const baseScale = isMobile ? 1.25 : 1.35;
        const scale = (layer as any).scaleBase
          ? ((layer as any).scaleBase + (isMobile ? -0.15 : 0))
          : (baseScale - i * 0.03);

        return (
          <div
            key={i}
            ref={(el) => { layerRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transform: `translate3d(0, 0, 0) scale(${scale})`,
              zIndex: i,
              willChange: "transform",
            }}
          >
            {layer.src && (
              <img
                src={layer.src}
                alt={`Layer ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: isMobile ? 'center 15%' : 'center center' }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "auto" : "async"}
                fetchPriority={i === 0 ? "high" : undefined}
              />
            )}
          </div>
        );
      })}

      {/* Type label */}
      <div
        ref={titleRef}
        className="absolute bottom-44 left-1/2 z-[7] pointer-events-none"
        style={{
          transform: `translateX(-50%) translate3d(0, 0, 0)`,
          willChange: "transform, opacity",
        }}
      >
        <span className="tracking-[0.35em] uppercase text-base sm:text-lg md:text-xl text-white font-medium drop-shadow-lg">{type}</span>
      </div>

      <div
        ref={chevronRef}
        className="absolute bottom-14 sm:bottom-8 left-0 right-0 z-[20] flex justify-center pointer-events-none"
      >
        <button
          className="animate-bounce touch-manipulation pointer-events-auto"
          onClick={onScrollDown}
          aria-label="Scroll to content"
          type="button"
        >
          <ChevronDown className="text-white/50" size={48} />
        </button>
      </div>
    </div>
  );
};

export default ParallaxHero;
