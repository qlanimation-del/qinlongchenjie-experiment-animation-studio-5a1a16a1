import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { newsItems } from "@/data/news";

// Use stable public-path assets so preload + cache headers match
const heroPosterImg = "/hero-poster.webp";
import whoWeAreImg from "@/assets/who-we-are.webp";
import whatWeDoImg from "@/assets/what-we-do.webp";
import annieAward from "@/assets/awards/annie-award.webp";
import baftaAward from "@/assets/awards/bafta-award.webp";
import vimeoAward from "@/assets/awards/vimeo-award.webp";
import mascotImg from "@/assets/awards/mascot.webp";

const Index = () => {
  const { t, locale } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  // Defer mounting <source> tags until after first paint, so video doesn't
  // compete with the poster + critical JS for bandwidth on first load.
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  // Skip video entirely on save-data / very slow networks — show poster only.
  const [skipVideo, setSkipVideo] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleVideoLoaded = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    setVideoLoaded(true);
    setProgress(100);
    setTimeout(() => {
      video.style.opacity = "1";
      setLoaderVisible(false);
    }, 400);
  }, []);

  // Detect slow networks / data-saver mode → skip video entirely
  useEffect(() => {
    const conn = (navigator as any).connection;
    if (conn) {
      const slow = conn.saveData === true ||
        conn.effectiveType === "slow-2g" ||
        conn.effectiveType === "2g";
      if (slow) {
        setSkipVideo(true);
        setLoaderVisible(false);
        return;
      }
    }
    // Defer video source attachment until browser is idle (after first paint)
    const ric = (window as any).requestIdleCallback as ((cb: () => void, opts?: { timeout: number }) => number) | undefined;
    if (ric) {
      ric(() => setShouldLoadVideo(true), { timeout: 500 });
    } else {
      setTimeout(() => setShouldLoadVideo(true), 100);
    }
  }, []);

  useEffect(() => {
    if (videoLoaded || skipVideo) return;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 60) return prev + 2;
        if (prev < 85) return prev + 0.8;
        if (prev < 95) return prev + 0.2;
        return prev;
      });
    }, 50);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [videoLoaded, skipVideo]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <Layout fullBleed>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* 视频 + 加载动画 */}
        <div className="absolute inset-0" style={{ backgroundImage: `url(${heroPosterImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Poster backdrop — visible instantly while video loads */}
          <img
            src={heroPosterImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />

          {loaderVisible && (
            <div className={`absolute inset-0 flex items-center justify-center bg-black/30 z-10 transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
              <div className="relative flex items-center justify-center loader-glow-pulse">
                <svg width="80" height="80" viewBox="0 0 80 80" className="transform -rotate-90">
                  <circle cx="40" cy="40" r={radius} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="2.5" />
                  <circle
                    cx="40" cy="40" r={radius}
                    fill="none"
                    stroke="url(#loaderGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
                  />
                  <defs>
                    <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-white text-sm font-light tabular-nums tracking-wider">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          )}

          {/* 视频 — only mounted after first paint to avoid blocking critical resources */}
          {!skipVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={heroPosterImg}
              className="absolute inset-0 z-[5] w-full h-full object-cover opacity-0 transition-opacity duration-1000"
              onLoadedData={handleVideoLoaded}
            >
              {shouldLoadVideo && (
                <>
                  <source src="/videos/hero-bg.webm" type="video/webm" />
                  <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </>
              )}
            </video>
          )}
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

      {/* Upcoming — minimal single-line announcement strip (contemporary art convention) */}
      <section className="border-y border-white/5 py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70 shrink-0">
            {t("upcoming", "label")}
          </span>
          {newsItems.length > 0 ? (() => {
            const now = new Date();
            const todayKey = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`;
            const next = [...newsItems]
              .filter((n) => n.date >= todayKey)
              .sort((a, b) => a.date.localeCompare(b.date))[0];
            if (!next) {
              return <span className="text-sm text-muted-foreground italic">{t("upcoming", "empty")}</span>;
            }
            return (
              <Link to="/news" className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm hover:text-foreground transition-colors">
                <span className="text-foreground font-medium tabular-nums">{next.date}</span>
                <span className="text-muted-foreground uppercase tracking-wider text-xs">{next.kind[locale]}</span>
                <span className="text-foreground/90 group-hover:underline underline-offset-4">{next.title[locale]}</span>
                <span className="text-muted-foreground">— {next.venue[locale]}</span>
              </Link>
            );
          })() : (
            <Link to="/news" className="text-sm text-muted-foreground italic hover:text-foreground transition-colors">
              {t("upcoming", "empty")}
            </Link>
          )}
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">{t("whoWeAre", "sectionLabel")}</p>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <AnimatedSection variant="reveal">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">{t("whoWeAre", "title")}</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                {t("whoWeAre", "description")}
              </p>
            </AnimatedSection>
            <AnimatedSection className="flex justify-center">
              <img
                src={whoWeAreImg}
                alt="Studio"
                className="rounded-lg w-full max-w-md object-cover aspect-[4/3] will-change-auto"
                loading="lazy"
                decoding="async"
                width={448}
                height={336}
                fetchPriority="low"
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
            <AnimatedSection variant="reveal" className="order-1 md:order-2">
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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Award badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 flex-1">
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
                      className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px] object-contain"
                      loading="lazy"
                    />
                    <span className="text-[10px] sm:text-xs font-medium tracking-wider text-black uppercase text-center max-w-[100px] sm:max-w-none">
                      {award.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mascot / animated character */}
              <div className="shrink-0 w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[300px] h-[180px] sm:h-[220px] relative">
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