import Layout from "@/components/Layout";
import { photographs } from "@/data/photographs";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Locale } from "@/i18n/translations";
import type { ArtworkItem } from "@/data/drawings";

const philosophy = {
  en: "Photography is an act of attention — a way of holding still long enough to see what is already there. We are drawn to the quiet, the in-between, the light that reveals as much as it conceals.",
  zh: "摄影是一种专注的行为——一种足够安静地停下来，去看见已经存在之物的方式。我们被宁静、过渡与那些既揭示又隐藏的光所吸引。",
  fr: "La photographie est un acte d'attention — une façon de rester immobile assez longtemps pour voir ce qui est déjà là. Nous sommes attirés par le calme, l'entre-deux, la lumière qui révèle autant qu'elle dissimule.",
};

function PhotoCard({ item, index, locale }: { item: ArtworkItem; index: number; locale: Locale }) {
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

const Photographs = () => {
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
                {photographs.map((item) => {
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
            {photographs.map((item, i) => (
              <PhotoCard key={item.id} item={item} index={i} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Photographs;
