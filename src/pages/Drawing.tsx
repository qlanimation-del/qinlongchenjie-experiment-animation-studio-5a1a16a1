import Layout from "@/components/Layout";
import { drawings } from "@/data/drawings";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Locale } from "@/i18n/translations";
import type { ArtworkItem } from "@/data/drawings";

const philosophy = {
  en: "Drawing is the most direct conversation between thought and surface. Each mark carries the weight of intention and the freedom of accident — a tension we return to again and again.",
  zh: "绘画是思想与平面之间最直接的对话。每一笔都承载着意图的重量与偶然的自由——这种张力是我们反复回归的主题。",
  fr: "Le dessin est la conversation la plus directe entre la pensée et la surface. Chaque trait porte le poids de l'intention et la liberté de l'accident — une tension à laquelle nous revenons sans cesse.",
};

function ArtCard({ item, index, locale }: { item: ArtworkItem; index: number; locale: Locale }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <img
        src={item.src}
        alt={item.title[locale]}
        className="w-full h-auto block"
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

  return (
    <Layout navVariant="light" className="bg-white">
      <section className="pt-10 sm:pt-14 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Left sidebar */}
          <aside className="lg:w-[200px] shrink-0 flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
            <div>
              <p className="text-xs leading-relaxed text-neutral-500 max-w-[200px]">
                {philosophy[locale]}
              </p>
            </div>
            <nav className="mt-8 lg:mt-0">
              <ul className="space-y-1.5">
                {drawings.map((item) => {
                  const year = item.medium[locale].match(/\d{4}/)?.[0] ?? "";
                  return (
                    <li key={item.id} className="text-[11px] text-neutral-400 leading-snug">
                      <span className="text-neutral-600 italic">{item.title[locale]}</span>
                      {year && <span> — {year}</span>}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Right image grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {drawings.map((item, i) => (
              <ArtCard key={item.id} item={item} index={i} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Drawing;
