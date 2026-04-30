import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { artists, type CVSection } from "@/data/artists";

const CVBlock = ({ sections, locale }: { sections: CVSection[]; locale: "en" | "zh" | "fr" }) => {
  const populated = sections.filter((s) => s.entries.length > 0);
  if (populated.length === 0) {
    return (
      <p className="text-xs sm:text-sm text-muted-foreground/60 italic mt-6">
        {locale === "zh" ? "完整简历即将更新。" : locale === "fr" ? "CV complet bientôt disponible." : "Full CV coming soon."}
      </p>
    );
  }
  return (
    <div className="mt-8 space-y-10">
      {populated.map((section) => (
        <div key={section.key}>
          <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3 sm:mb-4">
            {section.label[locale]}
          </h4>
          <ul className="divide-y divide-border/40">
            {section.entries.map((entry, i) => (
              <li key={i} className="py-2.5 grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-6 text-sm">
                <span className="text-muted-foreground tabular-nums">{entry.year}</span>
                <span className="text-foreground">
                  <span className="font-medium">{entry.title[locale]}</span>
                  {entry.venue && <span className="text-muted-foreground"> — {entry.venue[locale]}</span>}
                  {entry.city && <span className="text-muted-foreground">, {entry.city[locale]}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const Artists = () => {
  const { t, locale } = useLanguage();

  return (
    <Layout>
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
            {t("nav", "team")}
          </h1>

          <div className="space-y-20 sm:space-y-28">
            {artists.map((artist) => (
              <AnimatedSection key={artist.id}>
                <article id={artist.id} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 sm:gap-12 scroll-mt-28">
                  <div className="flex flex-col items-center md:items-start">
                    <img
                      src={artist.image}
                      alt={artist.name[locale]}
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-[180px] md:h-[180px] rounded-full object-cover border border-border"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{artist.name[locale]}</h2>
                    <p className="text-sm text-muted-foreground mt-1 tracking-wide">{artist.role[locale]}</p>

                    <p className="mt-5 text-sm sm:text-base text-foreground/90 leading-relaxed">
                      {artist.shortBio[locale]}
                    </p>
                    <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {artist.longBio[locale]}
                    </p>

                    <CVBlock sections={artist.sections} locale={locale} />
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Artists;
