import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { projects } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";

// Pinterest-style staggered heights via grid row spans
const cardSpan: Record<string, number> = {
  "dreamscape":      3,   // medium
  "shadows-within":  5,   // very tall
  "fizzy-pop":       3,   // medium
  "resonance":       3,   // medium
  "tiny-worlds":     4,   // tall
  "between-us":      4,   // tall
  "beyond-orbit":    3,   // medium
};

function ProjectCard({ project, index, locale }: {project: typeof projects[0]; index: number; locale: Locale}) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const aspect = cardAspect[project.id] || "aspect-square";

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}>
      
      <Link to={`/work/${project.id}`} className="group block relative overflow-hidden rounded-lg">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full ${aspect} object-cover transition-transform duration-400 group-hover:scale-105`} />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-250 flex items-center justify-center">
          <div className="text-center px-4">
            <span
              className="tracking-[0.2em] uppercase block mb-2 text-base text-white
                opacity-0 blur-md translate-y-3
                group-hover:opacity-100 group-hover:blur-0 group-hover:translate-y-0
                transition-all duration-300"
              style={{ transitionDelay: '0.03s' }}>
              {project.type[locale]}
            </span>
            <h3
              className="font-bold mb-1 text-2xl lg:text-3xl
                opacity-0 blur-lg scale-95
                group-hover:opacity-100 group-hover:blur-0 group-hover:scale-100
                transition-all duration-300"
              style={{
                color: project.glowColor,
                textShadow: `0 0 10px ${project.glowColor}, 0 0 20px ${project.glowColor}, 0 0 40px ${project.glowColor}`,
                transitionDelay: '0.08s'
              }}>
              {project.title}
            </h3>
            <div
              className="w-20 h-px mx-auto my-3 bg-white
                scale-x-0 group-hover:scale-x-100
                transition-transform duration-300"
              style={{ transitionDelay: '0.13s' }} />
            <span
              className="text-lg block text-white
                opacity-0 blur-md translate-y-2
                group-hover:opacity-100 group-hover:blur-0 group-hover:translate-y-0
                transition-all duration-300"
              style={{ transitionDelay: '0.16s' }}>
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
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project, i) =>
            <ProjectCard key={project.id} project={project} index={i} locale={locale} />
          )}
        </div>
      </section>
    </Layout>);
};

export default Work;