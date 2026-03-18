import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { ParallaxLayer } from "@/data/projects";

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
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const effectiveLayers: (ParallaxLayer & { overlay?: string; scaleBase?: number })[] = layers && layers.length > 0
    ? layers
    : singleImage
      ? [
          { src: singleImage, speed: 0.1, scaleBase: 1.15 },
          { src: singleImage, speed: 0.25, overlay: "bg-black/30", scaleBase: 1.1 },
          { src: "", speed: 0.4, overlay: "vignette", scaleBase: 1.05 },
        ]
      : [];

  const titleOpacity = Math.max(0, 1 - scrollY / 400);
  const titleTranslateY = scrollY * 0.3;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {effectiveLayers.map((layer, i) => {
        // Each layer scrolls at (1 - speed) of normal scroll speed
        // speed=0.1 → moves at 0.9 of scroll → lags behind by 10% (slowest, background)
        // speed=0.4 → moves at 0.6 of scroll → lags behind by 40% (fastest parallax offset)
        // The negative translateY makes layers appear to move up slower than the page scroll
        // Background: moves down; Mid: static; Foreground: moves up
        const parallaxOffset = i === 0 ? scrollY * 0.15 : i === 1 ? 0 : -scrollY * 0.3;
        const scale = (layer as any).scaleBase || (1.15 - i * 0.05);
        const isVignette = (layer as any).overlay === "vignette";

        if (isVignette) {
          return (
            <div
              key={i}
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                zIndex: i + 1,
                willChange: "transform",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>
          );
        }

        return (
          <div
            key={i}
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `translateY(${parallaxOffset}px) scale(${scale})`,
              zIndex: i,
              willChange: "transform",
            }}
          >
            {layer.src && (
              <img
                src={layer.src}
                alt={`Layer ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "auto" : "async"}
              />
            )}
          </div>
        );
      })}

      {/* Type label */}
      <div
        className="absolute top-1/2 left-1/2 z-[7] pointer-events-none"
        style={{
          opacity: titleOpacity,
          transform: `translate(-50%, -50%) translateY(${titleTranslateY}px)`,
          willChange: "transform, opacity",
        }}
      >
        <span className="tracking-[0.35em] uppercase text-base sm:text-lg md:text-xl text-white font-medium drop-shadow-lg">{type}</span>
      </div>

      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[8] animate-bounce"
        onClick={onScrollDown}
        aria-label="Scroll to content"
        style={{ opacity: titleOpacity }}
      >
        <ChevronDown className="text-white/50" size={48} />
      </button>
    </div>
  );
};

export default ParallaxHero;
