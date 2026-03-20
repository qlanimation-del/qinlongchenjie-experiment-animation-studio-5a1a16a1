import { useParams, Link } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ChevronUp } from "lucide-react";
import Layout from "@/components/Layout";
import ParallaxHero from "@/components/ParallaxHero";
import ProjectGallery from "@/components/ProjectGallery";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const ProjectDetail = () => {
  const { id } = useParams();
  const { t, locale } = useLanguage();
  const project = projects.find((p) => p.id === id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(() => {
    setShowBackToTop(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!project) {
    return (
      <Layout fullBleed>
        <div className="flex items-center justify-center min-h-[60vh] text-center px-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{t("projectDetail", "notFound")}</h1>
            <Button asChild variant="outline">
              <Link to="/work">{t("projectDetail", "backToWork")}</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const galleryImages = project.galleryImages;

  return (
    <Layout fullBleed>
      <div className="relative w-full h-screen overflow-hidden" style={{ marginBottom: '-4rem' }}>
        <ParallaxHero
          layers={project.parallaxLayers}
          singleImage={!project.parallaxLayers?.length ? project.thumbnail : undefined}
          title={project.title}
          type={project.type[locale]}
          year={project.year}
          glowColor={project.glowColor}
          onScrollDown={scrollToContent}
        />
      </div>

      <div ref={contentRef} className="relative z-10">
        <div className="pointer-events-none h-32 sm:h-52 bg-gradient-to-b from-transparent via-background/60 to-background -mt-20 sm:-mt-40 relative z-10 rounded-t-3xl" />

        <div className="bg-background py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto w-full max-w-3xl">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 mb-8 text-sm tracking-wider backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10"
            >
              <ArrowLeft size={18} />
              <span>{t("projectDetail", "backToWork")}</span>
            </Link>

            <p
              className="mb-12 text-muted-foreground leading-relaxed text-base sm:text-lg text-justify"
              style={{ textIndent: "2em", lineHeight: 1.85 }}
            >
              {project.description[locale]}
            </p>

            {/* Video Embed(s) */}
            {(() => {
              const videoUrls = Array.isArray(project.videoUrl) ? project.videoUrl : project.videoUrl ? [project.videoUrl] : [];
              const videoAspects = Array.isArray(project.videoAspect) ? project.videoAspect : project.videoAspect ? [project.videoAspect] : [];
              return videoUrls.map((url, i) => {
                const aspect = videoAspects[i];
                const isVertical = aspect === "9/16";
                return (
                  <div key={i} className="mb-12">
                    <div
                      className={`mx-auto rounded-lg overflow-hidden ${isVertical ? 'max-w-[65%] sm:max-w-[50%]' : 'w-full bg-black/20'}`}
                      style={{ aspectRatio: aspect || "16/9" }}
                    >
                      <iframe
                        title={`${project.title} ${i + 1}`}
                        src={url}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              });
            })()}

            {/* Metadata Grid — always visible */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 bg-white/5 rounded-lg p-4 sm:p-6">
              <div className="text-left">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground/60 mb-1">{t("projectDetail", "year")}</span>
                <span className="text-sm font-medium text-foreground">{project.year}</span>
              </div>
              <div className="text-left sm:text-center border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground/60 mb-1">{t("projectDetail", "crew")}</span>
                <span className="text-sm font-medium text-foreground">{project.crew?.[locale] || "—"}</span>
              </div>
              <div className="text-left sm:text-right border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground/60 mb-1">{t("projectDetail", "client")}</span>
                <span className="text-sm font-medium text-foreground">{project.client?.[locale] || "—"}</span>
              </div>
            </div>

            {project.credits[locale].length > 0 && (
              <div className="mb-10 sm:mb-16">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">{t("projectDetail", "credits")}</h2>
                <ul className="space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
                  {project.credits[locale].map((credit, i) => (
                    <li key={i}>{credit}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.exhibitions?.[locale]?.length ? (
              <div className="mb-10 sm:mb-16">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">{t("projectDetail", "exhibitions")}</h2>
                <ul className="space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
                  {project.exhibitions[locale].map((item, i) => {
                    const isYear = /^\d{4}$/.test(item.trim());
                    return (
                      <li key={i} className={isYear ? "font-bold text-foreground text-sm sm:text-base mt-4 first:mt-0" : ""}>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            <ProjectGallery
              projectId={project.id}
              thumbnail={project.thumbnail}
              customImages={galleryImages}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed right-5 bottom-8 z-[9999] bg-muted/50 hover:bg-muted backdrop-blur-md p-3 rounded-full text-foreground transition-all duration-300
          ${showBackToTop ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        aria-label="Back to top"
      >
        <ChevronUp size={22} />
      </button>
    </Layout>
  );
};

export default ProjectDetail;
