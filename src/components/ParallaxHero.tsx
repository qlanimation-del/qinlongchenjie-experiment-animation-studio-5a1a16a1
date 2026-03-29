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
  const scrollYRef = useRef(0); // ✅ 改用 ref，不触发重渲染
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null); // ✅ 容器 ref

  // 滚动监听：只更新 ref，不更新 state
  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
  }, []);

  // ✅ 统一渲染帧：所有图层只在一帧内更新
  useEffect(() => {
    const updateParallax = () => {
      const scrollY = scrollYRef.current;
      const container = containerRef.current;
      if (!container) return;

      // 获取所有视差图层
      const layers = container.querySelectorAll<HTMLElement>('[data-parallax-layer]');
      layers.forEach((layer, i) => {
        // 计算偏移
        let parallaxOffset;
        if (isMobile) {
          parallaxOffset = i === 0 ? scrollY * 0.2 : i === 1 ? 0 : -scrollY * 0.2;
        } else if (isTablet) {
          parallaxOffset = i === 0 ? scrollY * 0.25 : i === 1 ? 0 : -scrollY * 0.35;
        } else {
          parallaxOffset = i === 0 ? scrollY * 0.4 : i === 1 ? 0 : -scrollY * 0.6;
        }

        // 中景额外偏移
        const isMid = layer.querySelector('img')?.src.includes('parallax-mid');
        let extraY = 0;
        if (isMobile) extraY = isMid ? 60 : 0;
        else if (isTablet) extraY = isMid ? 25 : 0;

        // 应用 transform（原生 DOM，无 React 重渲染）
        layer.style.transform = `translateY(${parallaxOffset + extraY}px)`;
      });

      // 文字动画
      const titleEl = container.querySelector<HTMLElement>('[data-hero-title]');
      if (titleEl) {
        const opacity = Math.max(0, 1 - scrollY / 400);
        const translateY = scrollY * 0.3;
        titleEl.style.opacity = String(opacity);
        titleEl.style.transform = `translateX(-50%) translateY(${translateY}px)`;
      }

      rafRef.current = requestAnimationFrame(updateParallax);
    };

    // 启动
    rafRef.current = requestAnimationFrame(updateParallax);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, isMobile, isTablet]);

  // 默认图层数据
  const effectiveLayers = layers && layers.length > 0
    ? layers
    : singleImage
      ? [
          { src: singleImage, speed: 0.1, scaleBase: 1.35 },
          { src: singleImage, speed: 0.25, overlay: "bg-black/30", scaleBase: 1.3 },
          { src: "", speed: 0.4, overlay: "vignette", scaleBase: 1.25 },
        ]
      : [];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {effectiveLayers.map((layer, i) => {
        const baseScale = isMobile ? 1.25 : isTablet ? 1.3 : 1.35;
        const scale = (layer as any).scaleBase
          ? ((layer as any).scaleBase + (isMobile ? -0.15 : isTablet ? -0.05 : 0))
          : (baseScale - i * 0.03);

        const isVignette = (layer as any).overlay === "vignette";

        // 遮罩层
        if (isVignette) {
          return (
            <div
              key={i}
              data-parallax-layer
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: i + 1, willChange: "transform" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>
          );
        }

        // 固定静态样式：缩放、位置只渲染一次
        const imgTransform = (() => {
          if (i === 0) {
            return isMobile ? 'scale(0.85) translateY(10px)'
              : isTablet ? 'scale(0.95) translateY(0px)'
              : 'scale(1) translateY(-40px)';
          }
          return isMobile ? 'scale(1.3) translateY(10px)'
            : isTablet ? 'scale(1.5) translateY(30px)'
            : 'scale(1) translateY(-30px)';
        })();

        return (
          <div
            key={i}
            data-parallax-layer
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              zIndex: i,
              willChange: "transform",
              transform: `scale(${scale})`, // ✅ 静态 scale 只写一次
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
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        );
      })}

      {/* 底部文字 */}
      <div
        data-hero-title
        className="absolute bottom-44 left-1/2 z-[7] pointer-events-none"
      >
        <span className="tracking-[0.35em] uppercase text-white drop-shadow-lg text-center">{type}</span>
      </div>

      {/* 向下按钮 */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-[20]">
        <button onClick={onScrollDown} className="animate-bounce text-white/50">
          <ChevronDown size={48} />
        </button>
      </div>
    </div>
  );
};

export default ParallaxHero;