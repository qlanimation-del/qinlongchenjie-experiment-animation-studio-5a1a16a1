import { useEffect, useMemo, useRef, useState } from "react";
import ImageLightbox from "./ImageLightbox";
import { useLanguage } from "@/i18n/LanguageContext";

interface ProjectGalleryProps {
  projectId: string;
  thumbnail?: string;
  customImages?: { src: string; alt: string; width?: number; height?: number }[];
}

const ProjectGallery = ({ projectId, thumbnail, customImages }: ProjectGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const images = customImages ?? [];

  // Per-image aspect ratios: use provided width/height, then update from natural size on load.
  const [ratios, setRatios] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    images.forEach((img, i) => {
      if (img.width && img.height) initial[i] = img.width / img.height;
    });
    return initial;
  });
  const loadedRef = useRef<Record<number, boolean>>({});

  // Reset ratios when images change.
  useEffect(() => {
    const next: Record<number, number> = {};
    images.forEach((img, i) => {
      if (img.width && img.height) next[i] = img.width / img.height;
    });
    loadedRef.current = {};
    setRatios(next);
  }, [images]);

  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    if (loadedRef.current[index]) return;
    loadedRef.current[index] = true;
    const img = e.currentTarget;
    setRatios((prev) => ({
      ...prev,
      [index]: img.naturalWidth / img.naturalHeight,
    }));
  };

  const isSingleColumn = images.length <= 2;

  // Split images into two columns; even indices go left, odd go right.
  const columns = useMemo(() => {
    const left: number[] = [];
    const right: number[] = [];
    images.forEach((_, i) => (i % 2 === 0 ? left : right).push(i));
    return { left, right };
  }, [images]);

  const renderCard = (index: number, isRightColumn: boolean) => {
    const image = images[index];
    const ratio = ratios[index] ?? 4 / 3;
    return (
      <div
        key={index}
        className={`mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-pointer bg-muted/20 hover:-translate-y-1 transition-transform duration-300 ${
          isRightColumn ? "sm:translate-y-8" : ""
        }`}
        style={{ aspectRatio: ratio }}
        onClick={() => setLightboxIndex(index)}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
          onLoad={(e) => handleImageLoad(index, e)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-8">{t("projectDetail", "gallery")}</h2>
        {isSingleColumn ? (
          <div className="columns-1 sm:columns-2 gap-4">
            {images.map((_, i) => renderCard(i, i % 2 === 1))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div>{columns.left.map((i) => renderCard(i, false))}</div>
            <div className="sm:pt-16">{columns.right.map((i) => renderCard(i, true))}</div>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
          onGoTo={(i) => setLightboxIndex(i)}
        />
      )}
    </>
  );
};

export default ProjectGallery;
