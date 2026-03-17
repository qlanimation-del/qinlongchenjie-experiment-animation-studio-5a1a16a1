import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import director1 from "@/assets/director-1.jpg";
import director2 from "@/assets/director-2.jpg";
import type { Locale } from "@/i18n/translations";

const directors: {name: Record<Locale, string>;role: Record<Locale, string>;image: string;}[] = [
{ name: { en: "Qinlong", zh: "秦龙", fr: "Qinlong" }, role: { en: "Director / Animator\nIndependent Animation", zh: "导演 / 动画师\n独立动画", fr: "Réalisateur / Animateur\nAnimation Indépendante" }, image: director1 },
{ name: { en: "Chenjie", zh: "陈洁", fr: "Chenjie" }, role: { en: "Director / Writer\nVideo Essay · Experimental Video", zh: "导演 / 编剧\n影像散文 · 实验影像", fr: "Réalisateur / Scénariste\nEssai Vidéo · Vidéo Expérimentale" }, image: director2 }];


const Team = () => {
  const { t, locale } = useLanguage();

  return (
    <Layout>
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">{t("team", "title")}</h1>

          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-10 sm:gap-16 mb-16 sm:mb-24">
              {directors.map((d) =>
              <div key={d.name.en} className="text-center">
                  <img
                  src={d.image}
                  alt={d.name[locale]}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover mx-auto mb-4 border-2 border-border"
                  loading="lazy" />
                
                  <h3 className="text-lg font-semibold">{d.name[locale]}</h3>
                  <p className="text-muted-foreground tracking-wide whitespace-pre-line text-base">{d.role[locale]}</p>
                </div>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t("team", "ourStory")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
                {t("team", "storyP1")}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {t("team", "storyP2")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>);

};

export default Team;