import { useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext, onGoTo }: ImageLightboxProps) => {

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentIndex]);

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-center h-[100dvh]"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-20 right-4 sm:top-24 sm:right-6 text-white/70 hover:text-white z-10 transition-colors p-2"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 transition-colors p-2"
        aria-label="Previous image"
      >
        <ChevronLeft size={36} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 transition-colors p-2"
        aria-label="Next image"
      >
        <ChevronRight size={36} />
      </button>

      {/* Main image */}
      <div
        className="flex-1 flex items-center justify-center px-4 pb-2 max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[70vh] object-contain rounded-lg"
        />
      </div>

      {/* Thumbnail strip */}
      <div
        ref={thumbContainerRef}
        className="w-full px-4 pb-4 pt-2 pb-[env(safe-area-inset-bottom)] flex items-center justify-start gap-2 overflow-x-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 mx-auto">
          {images.map((image, index) => (
            <button
              key={index}
              ref={index === currentIndex ? activeThumbRef : null}
              onClick={() => onGoTo(index)}
              className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden transition-all duration-200 ${
                index === currentIndex
                  ? "ring-2 ring-white opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
