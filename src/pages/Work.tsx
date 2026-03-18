// Work page – grid masonry layout
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { projects } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";

// Pinterest-style staggered heights via grid row spans
const cardSpan: Record<string, number> = {
  "dreamscape":      4,   // medium
  "shadows-within":  7,   // very tall
  "fizzy-pop":       5,   // medium-tall
  "resonance":       4,   // medium
  "tiny-worlds":     6,   // tall
  "between-us":      5,   // medium-tall
  "beyond-orbit":    4,   // medium
  "entering-cloud":  5,   // medium-tall
  "gafa-logo":       5,   // medium-tall
};

function ProjectCard({ project, index, locale }: {project: typeof projects[0]; index: number; locale: Locale}) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const span = cardSpan[project.id] || 3;

  return (
    <div
      ref={ref}
      style={{ gridRow: `span ${span}`, transitionDelay: `${index * 80}ms` }}
      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      
      <Link to={`/work/${project.id}`} className="group block relative overflow-hidden rounded-lg h-full">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-250 flex items-center justify-center">
          <div className="text-center px-4">
            <span
              className="tracking-[0.2em] uppercase block mb-2 text-base text-white
                opacity-0 group-hover:[animation:cardSlideFromRight_0.45s_ease-out_0.03s_forwards]">
              {project.type[locale]}
            </span>
            <h3
              className="font-bold mb-1 text-2xl lg:text-3xl
                opacity-0 group-hover:[animation:cardTitleGlow_0.7s_ease-out_0.06s_forwards]"
              style={{
                color: project.glowColor,
                '--glow-color': project.glowColor,
              } as React.CSSProperties}>
              {project.title}
            </h3>
            <div
              className="w-20 h-px mx-auto my-3 bg-white origin-left
                scale-x-0 group-hover:[animation:cardLineReveal_0.35s_ease-out_0.25s_forwards]" />
            <span
              className="text-lg block text-white
                opacity-0 group-hover:[animation:cardSlideFromRight_0.5s_ease-out_0.2s_forwards]">
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