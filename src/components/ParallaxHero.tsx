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

const ParallaxHero = ({
  layers,
  singleImage,
  title,
  type,
  year,
  glowColor,
  onScrollDown,
}: ParallaxHeroProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // 🔥 核心修复：不使用 state，直接 DOM 操作，永不重渲染
  const updateParallax = useCallback(() => {
    const scrollY = window.scrollY;
    const container = containerRef.current;
    if (!container) return;

    // 所有视差层统一更新
    const items = container.querySelectorAll<HTMLElement>("[data-parallax]");
    const titleEl = container.querySelector<HTMLElement>("[data-title]");
    const arrowEl = container.querySelector<HTMLElement>("[data-arrow]");

    items.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0");
      const move = scrollY * speed * -1;
      // ✅ translate3d 硬件加速，绝对不卡
      el.style.transform = `translate3d(0, ${move}px, 0)`;
    });

    // 标题渐变 + 位移
    if (titleEl) {
      const opacity = Math.max(0, 1 - scrollY / 400);
      const y = scrollY * 0.3;
      titleEl.style.opacity = String(opacity);
      titleEl.style.transform = `translate3d(-50%, ${y}px, 0)`;
    }

    // 箭头透明度
    if (arrowEl) {
      arrowEl.style.opacity = Math.max(0, 1 - scrollY / 400).toString();
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax(); // 初始化

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateParallax]);

  // 自动生成视差图层（保持你原来的逻辑）
  const effectiveLayers =
    layers && layers.length > 0
      ? layers
      : singleImage
      ? [
          { src: singleImage, speed: 0.4 },
          { src: singleImage, speed: 0, overlay: "bg-black/30" },
          { src: "", speed: -0.6, overlay: "vignette" },
        ]
      : [];

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {effectiveLayers.map((layer, i) => {
        const speed = isMobile
          ? i === 0
            ? 0.2
            : i === 1
            ? 0
            : -0.2
          : layer.speed ?? 0;

        const isVignette = layer.overlay === "vignette";

        if (isVignette) {
          return (
            <div
              key={i}
              data-parallax
              data-speed={speed}
              className="absolute inset-0 pointer-events-none"
              style={{ transform: "translate3d(0,0,0)", zIndex: i + 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>
          );
        }

        return (
          <div
            key={i}
            data-parallax
            data-speed={speed}
            className="absolute inset-0 pointer-events-none"
            style={{ transform: "translate3d(0,0,0)", zIndex: i }}
          >
            {layer.src && (
           <img
  src={layer.src}
  alt=""
  className="absolute inset-0 w-full h-full object-cover"
  style={{
    objectPosition: isMobile ? "center 15%" : "center",
    transform: isMobile ? "scale(1.25)" : "scale(1.35)",
    // 👇 只对中景生效
    ...(layer.src.includes('parallax-mid') && {
      objectFit: "contain",
      transform: "scale(1.6)", // 👈 自己调大小！1.15=放大15%
      objectPosition: "center center",
    }),
  }}
  loading="eager"
/>
            )}
            {layer.overlay && layer.overlay !== "vignette" && (
              <div className={`absolute inset-0 ${layer.overlay}`} />
            )}
          </div>
        );
      })}

      {/* 标题 */}
      <div
        data-title
        className="absolute bottom-44 left-1/2 z-[7] pointer-events-none"
        style={{ transform: "translate3d(-50%,0,0)", opacity: 1 }}
      >
        <span className="tracking-[0.35em] uppercase text-base sm:text-lg md:text-xl text-white font-medium drop-shadow-lg">
          {type}
        </span>
      </div>

      {/* 箭头 */}
      <div
        data-arrow
        className="absolute bottom-14 sm:bottom-8 left-0 right-0 z-[20] flex justify-center pointer-events-none"
        style={{ opacity: 1 }}
      >
        <button
          onClick={onScrollDown}
          aria-label="Scroll"
          className="animate-bounce pointer-events-auto"
        >
          <ChevronDown className="text-white/50" size={48} />
        </button>
      </div>
    </div>
  );
};

export default ParallaxHero;