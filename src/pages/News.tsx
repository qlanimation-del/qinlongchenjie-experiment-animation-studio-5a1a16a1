import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { newsItems } from "@/data/news";
import { useLanguage } from "@/i18n/LanguageContext";

const News = () => {
  const { t, locale } = useLanguage();

  // Split into upcoming / past based on YYYY.MM compared to today.
  const now = new Date();
  const todayKey = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`;
  const upcoming = newsItems.filter((n) => n.date >= todayKey).sort((a, b) => a.date.localeCompare(b.date));
  const past = newsItems.filter((n) => n.date < todayKey).sort((a, b) => b.date.localeCompare(a.date));

  const Section = ({ heading, items }: { heading: string; items: typeof newsItems }) => (
    <div className="mb-12">
      <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70 mb-5">{heading}</h2>
      <ul className="divide-y divide-white/10 border-t border-b border-white/10">
        {items.map((item, i) => (
          <li key={i} className="py-5 grid grid-cols-[5rem_8rem_1fr] gap-4 items-baseline">
            <span className="text-foreground font-medium tabular-nums">{item.date}</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">{item.kind[locale]}</span>
            <div>
              <span className="text-foreground">{item.title[locale]}</span>
              <span className="block text-sm text-muted-foreground mt-1">{item.venue[locale]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Layout>
      <section className="pt-12 sm:pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection variant="reveal">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              {t("news", "title")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t("news", "title")}</h1>
            <p className="text-muted-foreground mb-12">{t("news", "subtitle")}</p>
          </AnimatedSection>

          {newsItems.length === 0 ? (
            <p className="text-muted-foreground/70 italic border-t border-white/10 pt-8">
              {t("news", "empty")}
            </p>
          ) : (
            <>
              {upcoming.length > 0 && <Section heading={t("news", "upcoming")} items={upcoming} />}
              {past.length > 0 && <Section heading={t("news", "past")} items={past} />}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
