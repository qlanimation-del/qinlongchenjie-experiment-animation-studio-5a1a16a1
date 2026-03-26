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

const LERP_FACTOR = 0.08;
const LERP_THRESHOLD = 0.5;

const ParallaxHero = ({ layers, singleImage, title, type, year, glowColor, onScrollDown }: ParallaxHeroProps) => {
  const isMobile = useIsMobile();
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(isMobile);
  const targetY = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef(0);
  const isRunning = useRef(false);

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

  const updateDOM = useCallback((scrollY: number) => {
    const mobile = isMobileRef.current;

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

    if (titleRef.current) {
      const opacity = Math.max(0, 1 - scrollY / 400);
      const translateY = scrollY * 0.3;
      titleRef.current.style.opacity = String(opacity);
      titleRef.current.style.transform = `translateX(-50%) translate3d(0, ${translateY}px, 0)`;
    }

    if (chevronRef.current) {
      const opacity = Math.max(0, 1 - scrollY / 400);
      chevronRef.current.style.opacity = String(opacity);
    }
  }, [effectiveLayers]);

  const animate = useCallback(() => {
    const diff = targetY.current - currentY.current;
    if (Math.abs(diff) < LERP_THRESHOLD) {
      currentY.current = targetY.current;
      updateDOM(currentY.current);
      isRunning.current = false;
      return;
    }
    currentY.current += diff * LERP_FACTOR;
    updateDOM(currentY.current);
    rafId.current = requestAnimationFrame(animate);
  }, [updateDOM]);

  const startLoop = useCallback(() => {
    if (!isRunning.current) {
      isRunning.current = true;
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    const handleScroll = () => {
      targetY.current = window.scrollY;
      startLoop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial position (no lerp needed)
    currentY.current = window.scrollY;
    targetY.current = window.scrollY;
    updateDOM(currentY.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
      isRunning.current = false;
    };
  }, [startLoop, updateDOM]);

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
                backfaceVisibility: "hidden",
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
              backfaceVisibility: "hidden",
              contain: "paint",
            }}
          >
            {layer.src && (
              <img
                src={layer.src}
                alt={`Layer ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: isMobile ? 'center 15%' : 'center center',
                  backfaceVisibility: "hidden",
                }}
                loading="eager"
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
