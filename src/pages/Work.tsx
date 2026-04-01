// Work page – grid masonry layout
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";

// Pinterest-style staggered heights via grid row spans
const cardSpan: Record<string, number> = {
  "dreamscape":      4,
  "shadows-within":  7,
  "fizzy-pop":       5,
  "resonance":       4,
  "tiny-worlds":     6,
  "between-us":      5,
  "beyond-orbit":    4,
  "entering-cloud":  5,
  "gafa-logo":       5,
};

function ProjectCard({ project, index, locale }: {project: typeof projects[0]; index: number; locale: Locale}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const span = cardSpan[project.id] || 3;

  return (
    <div
      style={{ gridRow: `span ${span}` }}
      className="relative">
      
      {/* Skeleton shimmer – visible until image loads */}
      {!imgLoaded && (
        <div className="absolute inset-0 rounded-lg bg-muted skeleton-shimmer" />
      )}

      <Link to={`/work/${project.id}`} className="group block relative overflow-hidden rounded-lg h-full">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
        />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-250 flex items-center justify-center">
          <div className="text-center px-4">
            <span
              className="tracking-[0.2em] uppercase block mb-2 text-base text-white
                opacity-0 group-hover:[animation:cardSlideFromRight_0.15s_ease-out_0.03s_forwards]">
              {project.type[locale]}
            </span>
            <h3
              className="font-bold mb-1 text-2xl lg:text-3xl
                opacity-0 group-hover:[animation:cardTitleGlow_0.6s_ease-out_0.2s_forwards]"
              style={{
                color: project.glowColor,
                '--glow-color': project.glowColor,
              } as React.CSSProperties}>
              {project.title}
            </h3>
            <div
              className="w-20 h-px mx-auto my-3 bg-white origin-left
                scale-x-0 group-hover:[animation:cardLineReveal_0.1s_ease-out_0.25s_forwards]" />
            <span
              className="text-lg block text-white
                opacity-0 group-hover:[animation:cardSlideFromRight_0.4s_ease-out_0.2s_forwards]">
              {project.year}
            </span>
          </div>
        </div>
      </Link>
    </div>);
}

const Work = () => {
  const { t, locale } = useLanguage();

  return (
    <Layout>
       <section className="pt-14 sm:pt-16 pb-16 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
             style={{ gridAutoRows: '60px' }}>
          {projects.map((project, i) =>
            <ProjectCard key={project.id} project={project} index={i} locale={locale} />
          )}
        </div>
      </section>
    </Layout>);
};

export default Work;
