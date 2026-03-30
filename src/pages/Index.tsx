import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";

import whoWeAreImg from "@/assets/who-we-are.webp";
import whatWeDoImg from "@/assets/what-we-do.webp";
import annieAward from "@/assets/awards/annie-award.webp";
import baftaAward from "@/assets/awards/bafta-award.webp";
import vimeoAward from "@/assets/awards/vimeo-award.webp";
import mascotImg from "@/assets/awards/mascot.webp";

const Index = () => {
  const { t } = useLanguage();

  return (
    <Layout fullBleed>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
         <video
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  className="w-full h-full object-cover"
>
  <source src="/videos/hero-bg.mp4" type="video/mp4" />
</video>
        </div>
        <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full px-4 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md rounded-full px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base md:px-16 md:py-6 md:text-xl h-auto shadow-lg shadow-black/10"
          >
            <Link to="/work" className="flex items-center gap-3 sm:gap-4">
              <span className="font-light tracking-wider">{t("hero", "nowPlaying")}</span>
              <span className="w-px h-4 sm:h-5 bg-white/30" />
              <span className="font-semibold tracking-wide">{t("hero", "ourWork")}</span>
            </Link>
          </Button>
        </div>
        <a
          href="#who-we-are"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </a>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t("whoWeAre", "sectionLabel")}</p>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">{t("whoWeAre", "title")}</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                {t("whoWeAre", "description")}
              </p>
            </AnimatedSection>
            <AnimatedSection className="flex justify-center">
              <img
                src={whoWeAreImg}
                alt="Studio"
                className="rounded-lg w-full max-w-md object-cover aspect-[4/3]"
                loading="lazy"
                decoding="async"
                width={448}
                height={336}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <AnimatedSection className="order-2 md:order-1 flex justify-center">
              <img
                src={whatWeDoImg}
                alt="Animation production"
                className="rounded-lg w-full max-w-md object-cover aspect-[4/3]"
                loading="lazy"
                decoding="async"
                width={448}
                height={336}
              />
            </AnimatedSection>
            <AnimatedSection className="order-1 md:order-2">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t("whatWeDo", "sectionLabel")}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">{t("whatWeDo", "title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base text-justify">
                {t("whatWeDo", "description")}
              </p>
              <Link
                to="/work"
                className="inline-block text-xs tracking-[0.2em] uppercase font-semibold text-foreground border border-foreground/30 px-8 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                {t("whatWeDo", "viewWork")}
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

     {/* Awards */}
<section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    <AnimatedSection>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Award badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 flex-1">
          {[
            { label: "Silver Award", icon: annieAward },
            { label: "Canadian Screen Award Qualifying", icon: vimeoAward },
            { label: "Dold AWARD", icon: baftaAward },
          ].map((award) => (
            <div
              key={award.label}
              className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              <img
                src={award.icon}
                alt={award.label}
                className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] object-contain"
                loading="lazy"
              />
              <span className="text-[10px] sm:text-xs font-medium tracking-wider text-black uppercase text-center max-w-[100px] sm:max-w-none">
                {award.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mascot / animated character */}
        <div className="shrink-0 w-full max-w-[220px] sm:max-w-[280px] md:max-w-[300px] h-[180px] sm:h-[220px] relative">
          <img
            src={mascotImg}
            alt="Studio mascot"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </AnimatedSection>
  </div>
</section>
    </Layout>
  );
};

export default Index;
