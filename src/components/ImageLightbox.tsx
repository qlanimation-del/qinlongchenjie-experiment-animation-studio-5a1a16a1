import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext }: ImageLightboxProps) => {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Reset loading state on index change
  useEffect(() => {
    setLoaded(false);
  }, [currentIndex]);

  // Preload neighbours for smoother nav
  useEffect(() => {
    const preload = (i: number) => {
      const img = new Image();
      img.src = images[(i + images.length) % images.length].src;
    };
    preload(currentIndex + 1);
    preload(currentIndex - 1);
  }, [currentIndex, images]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (absX > 50 && absX > absY) {
      if (dx < 0) onNext(); else onPrev();
    } else if (dy > 100 && absY > absX) {
      onClose();
    }
    touchStart.current = null;
  };

  if (!mounted || !images.length) return null;

  return createPortal(
    <div
      className="fixed z-[10000] bg-black select-none touch-none"
      style={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        minHeight: "100vh",
        isolation: "isolate",
      }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Image fills the entire viewport */}
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        onLoad={() => setLoaded(true)}
        onClick={(e) => e.stopPropagation()}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        draggable={false}
      />

      {/* Loading spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Loader2 className="text-white/70 animate-spin" size={40} />
        </div>
      )}

      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white/90 hover:text-white hover:bg-black/60 transition-colors z-10"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white/90 hover:text-white hover:bg-black/60 transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white/90 hover:text-white hover:bg-black/60 transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-xs sm:text-sm text-white/80 tabular-nums px-3 py-1.5 rounded-full bg-black/40 backdrop-blur z-10 pointer-events-none">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImageLightbox;
