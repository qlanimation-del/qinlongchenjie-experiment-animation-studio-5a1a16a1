import { useState } from "react";
import ImageLightbox from "./ImageLightbox";
import { useLanguage } from "@/i18n/LanguageContext";


interface ProjectGalleryProps {
  projectId: string;
  thumbnail?: string;
  customImages?: { src: string; alt: string }[];
}

const ProjectGallery = ({ projectId, thumbnail, customImages }: ProjectGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const images = customImages ?? generatePlaceholderImages(projectId, thumbnail || "/placeholder.svg");

  return (
    <>
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-8">{t("projectDetail", "gallery")}</h2>
        <div className="columns-1 sm:columns-2 gap-4">
          {images.map((image, index) => {
            // Pinterest-style: cycle through varied ratios so no two adjacent cards match
            const aspects = [
              "aspect-[4/3]",   // short
              "aspect-[3/5]",   // very tall
              "aspect-[5/4]",   // near-square
              "aspect-[2/3]",   // tall
              "aspect-[6/5]",   // slightly short
              "aspect-[3/4]",   // medium-tall
            ];
            const aspect = aspects[index % aspects.length];
            return (
              <div
                key={index}
                className="mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full ${aspect} object-cover`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}
    </>
  );
};

export default ProjectGallery;
