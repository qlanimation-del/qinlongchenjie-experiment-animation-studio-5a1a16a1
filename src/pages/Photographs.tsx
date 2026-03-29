import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import ImageLightbox from "@/components/ImageLightbox";
import { photographs } from "@/data/photographs";
import { photographyBook } from "@/data/books";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Locale } from "@/i18n/translations";
import type { ArtworkItem } from "@/data/drawings";

const philosophy = {
  en: "The spectacle society that Debord feared and the emancipation of the spectator that Rancière envisioned are simultaneously realized in the present era. The massive production of images provides an endless supply of nourishment for the formation of the spectacle society, drawing people into a vast apparatus of images. Fortunately, people are no longer passive spectators; they both become part of the apparatus through their activities and, drawing on their own power, shape, transform, and extend it.<br />——Research on the Formation and Viewing Behavior of Crowdsourced Images",
  zh: "德波所恐惧的景观社会以及朗西埃所期盼的对于观众的解放在当下这个时代被同时实现。图像的大量生成为景观社会的形成提供了源源不断的养料，人们被吸纳进一个巨型的影像装置当中。幸好人们已不再是被动的观众，人们一边成为装置的一部分进行活动，一边以自身的力量对这个装置进行塑造、改变和延展。<br />——《众包影像的形成与观看行为研究》",
  fr: "La société du spectacle que Debord craignait et l'émancipation du spectateur que Rancière envisageait sont simultanément réalisées à l'ère actuelle. La production massive d'images fournit un approvisionnement sans fin pour la formation de la société du spectacle, attirant les gens dans un vaste appareil d'images. Heureusement, les gens ne sont plus des spectateurs passifs; ils deviennent à la fois partie de l'appareil à travers leurs activités et, s'appuyant sur leur propre pouvoir, le façonnent, le transforment et l'étendent.<br />——Recherche sur la Formation et le Comportement de Visualisation des Images Collectives",
};

const emptyMessage = {
  en: "Photographs coming soon.",
  zh: "摄影作品即将上线。",
  fr: "Photographies à venir.",
};

function PhotoCard({ item, index, locale, onClick }: { item: ArtworkItem; index: number; locale: Locale; onClick: () => void }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`cursor-pointer group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      onClick={onClick}
    >
      <img
        src={item.src}
        alt={item.title[locale]}
        className="w-full h-auto block rounded transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
      />
      <div className="mt-3 mb-1">
        <p className="text-sm font-medium text-neutral-800">{item.title[locale]}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{item.medium[locale]}</p>
      </div>
    </div>
  );
}

const Photographs = () => {
  const { locale } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const grouped = useMemo(() => {
    const sorted = [...photographs].sort((a, b) => b.year - a.year);
    const map = new Map<string, { category: typeof photographs[0]["category"]; yearRange: string; items: ArtworkItem[] }>();
    for (const item of sorted) {
      const key = item.category.en;
      if (!map.has(key)) {
        map.set(key, { category: item.category, yearRange: "", items: [] });
      }
      map.get(key)!.items.push(item);
    }
    for (const group of map.values()) {
      const years = group.items.map((i) => i.year);
      const min = Math.min(...years);
      const max = Math.max(...years);
      group.yearRange = min === max ? `${min}` : `${min}–${max}`;
    }
    return Array.from(map.values());
  }, []);

  const flatItems = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);
  const lightboxImages = useMemo(() => flatItems.map((i) => ({ src: i.src, alt: i.title[locale] })), [flatItems, locale]);

  let flatOffset = 0;

  return (
    <Layout navVariant="light" className="bg-white">
      <section className="pt-10 sm:pt-14 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <aside className="lg:w-[200px] shrink-0 flex flex-col">
            <div>
              <h3 className="text-xs font-bold text-neutral-800 mb-2 tracking-wide uppercase">
                {locale === "zh" ? "摄影理念" : locale === "fr" ? "Philosophie" : "Philosophy"}
              </h3>
              <p
                className="text-xs leading-relaxed text-neutral-500 max-w-[200px]"
                dangerouslySetInnerHTML={{ __html: philosophy[locale] }}
              />
            </div>

            {/* Book Section */}
            <div className="mt-10 max-w-[180px]">
              <h3 className="text-xs font-bold text-neutral-800 mb-3 tracking-wide uppercase">
                {locale === "zh" ? "出版物" : locale === "fr" ? "Publication" : "Publication"}
              </h3>
              <a href={photographyBook.purchaseUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <img
                  src={photographyBook.coverSrc}
                  alt={photographyBook.title[locale]}
                  className="w-full max-w-[180px] h-auto rounded shadow-sm transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </a>
              <p className="text-xs font-semibold text-neutral-800 mt-3">{photographyBook.title[locale]}</p>
              <p className="text-[11px] leading-relaxed text-neutral-500 mt-1">{photographyBook.description[locale]}</p>
              <a
                href={photographyBook.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] text-neutral-700 font-medium mt-2 hover:text-neutral-900 transition-colors"
              >
                {locale === "zh" ? "购买 →" : locale === "fr" ? "Acheter →" : "Purchase →"}
              </a>
            </div>

            {grouped.length > 0 && (
              <nav className="mt-16 lg:mt-24">
                {grouped.map((group) => (
                  <div key={group.category.en} className="mb-6">
                    <h4 className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                      {group.category[locale]} <span className="text-neutral-400 font-normal">({group.yearRange})</span>
                    </h4>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item.id} className="text-[11px] text-neutral-400 leading-snug">
                          <span className="text-neutral-600 italic">{item.title[locale]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}
          </aside>

          {/* Right content */}
          <div className="flex-1">
            {grouped.length === 0 ? (
              <div className="flex items-center justify-center min-h-[40vh]">
                <p className="text-neutral-400 text-sm">{emptyMessage[locale]}</p>
              </div>
            ) : (
              grouped.map((group) => {
                const startOffset = flatOffset;
                flatOffset += group.items.length;
                return (
                  <div key={group.category.en} className="mb-16 last:mb-0">
                    <h2 className="text-lg font-semibold text-neutral-800 mb-1">
                      {group.category[locale]}
                    </h2>
                    <p className="text-xs text-neutral-400 mb-6">{group.yearRange}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                      {group.items.map((item, i) => (
                        <PhotoCard
                          key={item.id}
                          item={item}
                          index={i}
                          locale={locale}
                          onClick={() => setLightboxIndex(startOffset + i)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % lightboxImages.length)}
          onGoTo={(i) => setLightboxIndex(i)}
        />
      )}
    </Layout>
  );
};

export default Photographs;