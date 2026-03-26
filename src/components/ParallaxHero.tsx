import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { ParallaxLayer } from "@/data/projects";

// =========================================
// 设备判断
// =========================================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);          // 手机
      setIsTablet(width >= 768 && width < 1024); // 平板
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
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  // 滚动监听
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

  // 默认图层数据
  const effectiveLayers: (ParallaxLayer & { overlay?: string; scaleBase?: number })[] = layers && layers.length > 0
    ? layers
    : singleImage
      ? [
          { src: singleImage, speed: 0.1, scaleBase: 1.35 },
          { src: singleImage, speed: 0.25, overlay: "bg-black/30", scaleBase: 1.3 },
          { src: "", speed: 0.4, overlay: "vignette", scaleBase: 1.25 },
        ]
      : [];

  // 文字动画
  const titleOpacity = Math.max(0, 1 - scrollY / 400);
  const titleTranslateY = scrollY * 0.3;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {effectiveLayers.map((layer, i) => {
        
        // =========================================
        // 视差滚动强度
        // i=0 背景 | i=1 中景 | i=2 前景
        // =========================================
        const parallaxOffset = (() => {
          if (isMobile) {
            // 手机
            return i === 0 ? scrollY * 0.2 : i === 1 ? 0 : -scrollY * 0.2;
          }
          if (isTablet) {
            // 平板
            return i === 0 ? scrollY * 0.25 : i === 1 ? 0 : -scrollY * 0.35;
          }
          // 电脑
          return i === 0 ? scrollY * 0.4 : i === 1 ? 0 : -scrollY * 0.6;
        })();

        // 基础缩放
        const baseScale = isMobile ? 1.25 : isTablet ? 1.3 : 1.35;
        const scale = (layer as any).scaleBase
          ? ((layer as any).scaleBase + (isMobile ? -0.15 : isTablet ? -0.05 : 0))
          : (baseScale - i * 0.03);

        const isVignette = (layer as any).overlay === "vignette";
        const isMid = layer.src.includes('parallax-mid');

        // 遮罩层
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

        // =========================================
        // 中景额外偏移（仅中景）
        // =========================================
        const extraY = (() => {
          if (isMobile) return isMid ? 60 : 0;      // 手机
          if (isTablet) return isMid ? 25 : 0;      // 平板
          return 0;                                 // 电脑
        })();

        // =========================================
        // 👇 核心：图片 大小 + 上下位置 控制
        // =========================================
        const imgTransform = (() => {
          // --------------------
          // 背景层 i=0
          // --------------------
          if (i === 0) {
            return isMobile
              ? 'scale(0.85) translateY(10px)'   // 手机 - 背景
              : isTablet
                ? 'scale(0.95) translateY(0px)'  // 平板 - 背景
                : 'scale(1) translateY(-20px)';  // 电脑 - 背景
          }

          // --------------------
          // 中景 i=1 + 前景 i=2
          // --------------------
          return isMobile
            ? 'scale(1.5) translateY(40px)'     // 手机 - 中景 + 前景
            : isTablet
              ? 'scale(1.5) translateY(30px)'   // 平板 - 中景 + 前景
              : 'scale(1) translateY(-50px)';   // 电脑 - 中景 + 前景
        })();

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
                  objectPosition: isMobile ? 'center 15%' : isTablet ? 'center 14%' : 'center 15%',
                  transform: imgTransform,
                }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "auto" : "async"}
              />
            )}
          </div>
        );
      })}

      {/* 底部文字 */}
      <div
        className="absolute bottom-44 left-1/2 z-[7] pointer-events-none"
        style={{
          opacity: titleOpacity,
          transform: `translateX(-50%) translateY(${titleTranslateY}px)`,
        }}
      >
        <span className="tracking-[0.35em] uppercase text-white drop-shadow-lg">{type}</span>
      </div>

      {/* 向下按钮 */}
      <div className="absolute bottom-14 left-1/2 z-[20]">
        <button onClick={onScrollDown} className="animate-bounce text-white/50">
          <ChevronDown size={48} />
        </button>
      </div>
    </div>
  );
};

export default ParallaxHero;