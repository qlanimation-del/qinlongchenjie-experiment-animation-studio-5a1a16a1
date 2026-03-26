import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { ParallaxLayer } from "@/data/projects";

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

const ParallaxHero = ({ layers, singleImage, title, type, year, glowColor, onScrollDown }: ParallaxHeroProps) => {
  const { isMobile, isTablet } = useIsMobile();
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
          { src: singleImage, speed: 0.1, scaleBase: 1.35 },
          { src: singleImage, speed: 0.25, overlay: "bg-black/30", scaleBase: 1.3 },
          { src: "", speed: 0.4, overlay: "vignette", scaleBase: 1.25 },
        ]
      : [];

  const titleOpacity = Math.max(0, 1 - scrollY / 400);
  const titleTranslateY = scrollY * 0.3;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {effectiveLayers.map((layer, i) => {
        const parallaxOffset = isMobile
          ? (i === 0 ? scrollY * 0.2 : i === 1 ? 0 : -scrollY * 0.2)
          : isTablet
            ? (i === 0 ? scrollY * 0.3 : i === 1 ? 0 : -scrollY * 0.4)
            : (i === 0 ? scrollY * 0.4 : i === 1 ? 0 : -scrollY * 0.6);

        const baseScale = isMobile ? 1.25 : isTablet ? 1.3 : 1.35;
        const scale = (layer as any).scaleBase
          ? ((layer as any).scaleBase + (isMobile ? -0.15 : isTablet ? -0.05 : 0))
          : (baseScale - i * 0.03);
        
        const isVignette = (layer as any).overlay === "vignette";
        const isMid = layer.src.includes('parallax-mid');

        if (isVignette) {
          return (
            <div
              key={i}
              className="absolute inset-0 w-full h-full pointer-events-none"
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

        // 平板端中景偏移自然过渡，不跳变
        const extraY = isMobile
          ? (isMid ? 60 : 0)
          : isTablet
            ? (isMid ? 20 : 0)
            : 0;

        return (
          <div
            key={i}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transform: `translateY(${parallaxOffset + extraY}px) scale(${scale})`,
              zIndex: i,
              willChange: "transform",
            }}
          >
            {layer.src && (
              <img
                src={layer.src}
                alt={`Layer ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: isMobile ? 'center 15%' : isTablet ? 'center 12%' : 'center 15%',
                  transform: (() => {
                    if (i === 0) {
                      // 底层背景
                      return isMobile 
                        ? 'scale(0.85) translateY(20px)'
                        : isTablet
                          ? 'scale(0.95) translateY(0px)'
                          : 'scale(1) translateY(-40px)';
                    } else {
                      // 中景 / 前景
                      return isMobile 
                        ? 'scale(1.3) translateY(20px)'
                        : isTablet
                          ? 'scale(1.15) translateY(0px)'
                          : 'scale(1) translateY(-30px)';
                    }
                  })(),
                }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "auto" : "async"}
              />
            )}
          </div>
        );
      })}

      <div
        className="absolute bottom-44 left-1/2 z-[7] pointer-events-none"
        style={{
          opacity: titleOpacity,
          transform: `translateX(-50%) translateY(${titleTranslateY}px)`,
          willChange: "transform, opacity",
        }}
      >
        <span className="tracking-[0.35em] uppercase text-base sm:text-lg md:text-xl text-white font-medium drop-shadow-lg">{type}</span>
      </div>

      <div
        className="absolute bottom-14 sm:bottom-8 left-0 right-0 z-[20] flex justify-center pointer-events-none"
        style={{ opacity: titleOpacity }}
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