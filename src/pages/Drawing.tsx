import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import ImageLightbox from "@/components/ImageLightbox";
import { drawings } from "@/data/drawings";
import { drawingBook } from "@/data/books";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Locale } from "@/i18n/translations";
import type { ArtworkItem } from "@/data/drawings";

const philosophy = {
  en: "Drawing is the most direct conversation between thought and surface. Each mark carries the weight of intention and the freedom of accident — a tension we return to again and again.",
  zh: "绘画是思想与平面之间最直接的对话。每一笔都承载着意图的重量与偶然的自由——这种张力是我们反复回归的主题。",
  fr: "Le dessin est la conversation la plus directe entre la pensée et la surface. Chaque trait porte le poids de l'intention et la liberté de l'accident — une tension à laquelle nous revenons sans cesse.",
};

function ArtCard({ item, index, locale, onClick }: { item: ArtworkItem; index: number; locale: Locale; onClick: () => void }) {
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

const Drawing = () => {
  const { locale } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Group by category, sorted newest first within each group
  const grouped = useMemo(() => {
    const sorted = [...drawings].sort((a, b) => b.year - a.year);
    const map = new Map<string, { category: typeof drawings[0]["category"]; yearRange: string; items: ArtworkItem[] }>();
    for (const item of sorted) {
      const key = item.category.en;
      if (!map.has(key)) {
        map.set(key, { category: item.category, yearRange: "", items: [] });
      }
      map.get(key)!.items.push(item);
    }
    // Compute year ranges
    for (const group of map.values()) {
      const years = group.items.map((i) => i.year);
      const min = Math.min(...years);
      const max = Math.max(...years);
      group.yearRange = min === max ? `${min}` : `${min}–${max}`;
    }
    return Array.from(map.values());
  }, []);

  // Flat list for lightbox navigation
  const flatItems = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);
  const lightboxImages = useMemo(() => flatItems.map((i) => ({ src: i.src, alt: i.title[locale] })), [flatItems, locale]);

  // Map from (groupIdx, itemIdx) to flat index
  let flatOffset = 0;

  return (
    <Layout navVariant="light" className="bg-white">
      <section className="pt-10 sm:pt-14 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Left sidebar */}
          <aside className="lg:w-[200px] shrink-0 flex flex-col">
            <div>
              <h3 className="text-xs font-bold text-neutral-800 mb-2 tracking-wide uppercase">
                {locale === "zh" ? "创作理念" : locale === "fr" ? "Philosophie" : "Philosophy"}
              </h3>
              <p className="text-xs leading-relaxed text-neutral-500 max-w-[200px]">
                {philosophy[locale]}
              </p>
            </div>

            {/* Book Section */}
            <div className="mt-10">
              <h3 className="text-xs font-bold text-neutral-800 mb-3 tracking-wide uppercase">
                {locale === "zh" ? "出版物" : locale === "fr" ? "Publication" : "Publication"}
              </h3>
              <a href={drawingBook.purchaseUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <img
                  src={drawingBook.coverSrc}
                  alt={drawingBook.title[locale]}
                  className="w-full max-w-[180px] h-auto rounded shadow-sm transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </a>
              <p className="text-xs font-semibold text-neutral-800 mt-3">{drawingBook.title[locale]}</p>
              <p className="text-[11px] leading-relaxed text-neutral-500 mt-1 max-w-[200px]">{drawingBook.description[locale]}</p>
              <a
                href={drawingBook.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] text-neutral-700 font-medium mt-2 hover:text-neutral-900 transition-colors"
              >
                {locale === "zh" ? "购买 →" : locale === "fr" ? "Acheter →" : "Purchase →"}
              </a>
            </div>

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
          </aside>

          {/* Right content — grouped */}
          <div className="flex-1">
            {grouped.map((group) => {
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
                      <ArtCard
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
            })}
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
        />
      )}
    </Layout>
  );
};

export default Drawing;
