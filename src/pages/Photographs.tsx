import Layout from "@/components/Layout";
import { photographs } from "@/data/photographs";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Locale } from "@/i18n/translations";
import type { ArtworkItem } from "@/data/drawings";

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
      <section className="pt-10 sm:pt-14 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {photographs.map((item, i) => (
            <PhotoCard key={item.id} item={item} index={i} locale={locale} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Photographs;
