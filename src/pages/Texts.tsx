import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { textItems } from "@/data/texts";
import { useLanguage } from "@/i18n/LanguageContext";

const Texts = () => {
  const { t, locale } = useLanguage();

  return (
    <Layout>
      <section className="pt-12 sm:pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection variant="reveal">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              {t("texts", "title")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t("texts", "title")}</h1>
            <p className="text-muted-foreground mb-12">{t("texts", "subtitle")}</p>
          </AnimatedSection>

          {textItems.length === 0 ? (
            <p className="text-muted-foreground/70 italic border-t border-white/10 pt-8">
              {t("texts", "empty")}
            </p>
          ) : (
            <ul className="divide-y divide-white/10 border-t border-b border-white/10">
              {textItems.map((item, i) => (
                <li key={i} className="py-5 grid grid-cols-[4rem_1fr] gap-4 items-baseline">
                  <span className="text-foreground font-medium tabular-nums">{item.year}</span>
                  <div>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline underline-offset-4">
                        {item.title[locale]}
                      </a>
                    ) : (
                      <span className="text-foreground">{item.title[locale]}</span>
                    )}
                    <span className="block text-sm text-muted-foreground mt-1">
                      {item.author[locale]}
                      {item.publication?.[locale] ? <span className="italic">, {item.publication[locale]}</span> : null}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Texts;
