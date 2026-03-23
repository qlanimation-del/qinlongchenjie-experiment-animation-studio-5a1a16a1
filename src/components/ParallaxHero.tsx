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
        // 1. 降低手机端视差位移幅度（避免图片快速出界）
        const parallaxOffset = isMobile
          ? (i === 0 ? scrollY * 0.2 : i === 1 ? 0 : -scrollY * 0.2)
          : (i === 0 ? scrollY * 0.5 : i === 1 ? 0 : -scrollY * 0.8);
        
        // 2. 优化手机端缩放（仅轻微缩小，避免图片过小）
        const baseScale = isMobile ? 1.1 : 1.35; // 手机端基础缩放从1→1.1（轻微放大）
        const scale = (layer as any).scaleBase 
          ? ((layer as any).scaleBase + (isMobile ? -0.15 : 0)) // 缩小幅度从-0.5→-0.15
          : (baseScale - i * 0.03); // 图层间缩放差异减小
        
        const isVignette = (layer as any).overlay === "vignette";

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

        return (
          <div
            key={i}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              transform: `translateY(${parallaxOffset}px) scale(${scale})`,
              zIndex: i,
              willChange: "transform",
              // 可选：手机端加轻微内边距，保护核心内容不被裁
              padding: isMobile ? '2% 0' : 0,
              boxSizing: 'border-box'
            }}
          >
            {layer.src && (
              <img
                src={layer.src}
                alt={`Layer ${i + 1}`}
                // 3. 保留object-cover保证占比，仅调整objectPosition控制裁剪区域
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  // 关键：控制裁剪锚点，优先显示图片上部/中心
                  objectPosition: isMobile ? 'center 15%' : 'center center',
                  // 移除img的transform，避免和外层冲突
                }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "auto" : "async"}
              />
            )}
          </div>
        );
      })}

      {/* Type label */}
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