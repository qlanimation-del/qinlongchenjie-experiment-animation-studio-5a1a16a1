import { useState, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { projects, type Project } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Locale } from "@/i18n/translations";
import { cn } from "@/lib/utils";

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

type ViewMode = "grid" | "index";
type CategoryFilter = "all" | NonNullable<Project["category"]>;

const CATEGORY_LABELS: Record<CategoryFilter, Record<Locale, string>> = {
  "all":          { en: "All",                zh: "全部",       fr: "Tout" },
  "animation":    { en: "Animation",          zh: "动画",       fr: "Animation" },
  "video-essay":  { en: "Video Essay",        zh: "视频散文",   fr: "Essai vidéo" },
  "experimental": { en: "Experimental",       zh: "实验",       fr: "Expérimental" },
  "installation": { en: "Installation",       zh: "装置",       fr: "Installation" },
  "commission":   { en: "Commission",         zh: "委约",       fr: "Commande" },
};

function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const span = cardSpan[project.id] || 3;
  const tiltRef = useRef<HTMLAnchorElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 6;
    const ry = (px - 0.5) * 6;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    });
  }, []);

  const handleEnter = useCallback(() => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.willChange = "transform";
    el.style.transition = "transform 0.15s ease-out";
  }, []);

  const handleLeave = useCallback(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    setTimeout(() => { if (el) el.style.willChange = "auto"; }, 600);
  }, []);

  return (
    <div style={{ gridRow: `span ${span}`, perspective: "1000px" }} className="relative">
      {!imgLoaded && (
        <div className="absolute inset-0 rounded-lg bg-muted skeleton-shimmer" />
      )}

      <Link
        ref={tiltRef}
        to={`/work/${project.id}`}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="card-inset-border group block relative overflow-hidden rounded-lg h-full [transform-style:preserve-3d]"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
        />

        {/* Specular shine — follows cursor */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-soft-light"
          style={{
            background: "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.35), transparent 45%)",
          }}
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-250 flex items-center justify-center">
          <div className="text-center px-4">
            <span className="tracking-[0.2em] uppercase block mb-2 text-base text-white opacity-0 group-hover:[animation:cardSlideFromRight_0.15s_ease-out_0.03s_forwards]">
              {project.type[locale]}
            </span>
            <h3
              className="font-bold mb-1 text-2xl lg:text-3xl opacity-0 group-hover:[animation:cardTitleGlow_0.6s_ease-out_0.2s_forwards]"
              style={{ color: project.glowColor, '--glow-color': project.glowColor } as React.CSSProperties}>
              {project.title}
            </h3>
            <div className="w-20 h-px mx-auto my-3 bg-white origin-left scale-x-0 group-hover:[animation:cardLineReveal_0.1s_ease-out_0.25s_forwards]" />
            <span className="text-lg block text-white opacity-0 group-hover:[animation:cardSlideFromRight_0.4s_ease-out_0.2s_forwards]">
              {project.year}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function IndexRow({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="group grid grid-cols-[5rem_1fr_auto] sm:grid-cols-[6rem_1fr_12rem_auto] gap-4 items-baseline py-4 sm:py-5 border-b border-white/10 hover:border-white/30 transition-colors"
    >
      <span className="text-foreground/80 tabular-nums text-sm sm:text-base">{project.year}</span>
      <span className="text-foreground text-base sm:text-lg group-hover:underline underline-offset-4 decoration-foreground/40">
        {project.title}
      </span>
      <span className="hidden sm:inline text-xs uppercase tracking-wider text-muted-foreground">
        {project.type[locale]}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground tabular-nums">
        {project.duration || ""}
      </span>
    </Link>
  );
}

const Work = () => {
  const { t, locale } = useLanguage();
  const [view, setView] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [fadeOut, setFadeOut] = useState(false);

  const changeFilter = (cat: CategoryFilter) => {
    if (cat === filter) return;
    setFadeOut(true);
    window.setTimeout(() => {
      setFilter(cat);
      setFadeOut(false);
    }, 180);
  };

  // Build the filter list dynamically from categories actually present in data.
  const availableCategories = useMemo<CategoryFilter[]>(() => {
    const set = new Set<CategoryFilter>(["all"]);
    projects.forEach((p) => { if (p.category) set.add(p.category); });
    // Preserve a stable display order
    const order: CategoryFilter[] = ["all", "animation", "video-essay", "experimental", "installation", "commission"];
    return order.filter((c) => set.has(c));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  // Index view: sort by year desc
  const indexList = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ay = parseInt(a.year, 10) || 0;
      const by = parseInt(b.year, 10) || 0;
      return by - ay;
    });
  }, [filtered]);

  return (
    <Layout>
      <SEO
        title="Selected Works 2019–2025"
        description="Selected animation projects and video essays by QINLONG&CHENJIE studio, 2019–2025."
        path="/work"
      />
      <section className="pt-10 sm:pt-14 pb-16 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Toolbar: filter chips + view toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => changeFilter(cat)}
                  className={cn(
                    "text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors",
                    filter === cat
                      ? "border-foreground text-foreground bg-foreground/5"
                      : "border-white/15 text-muted-foreground hover:text-foreground hover:border-white/30"
                  )}
                >
                  {CATEGORY_LABELS[cat][locale]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 self-start sm:self-auto border border-white/15 rounded-full p-1">
              {(["grid", "index"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setView(m)}
                  className={cn(
                    "text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-colors",
                    view === m ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {m === "grid" ? t("works", "viewGrid") : t("works", "viewIndex")}
                </button>
              ))}
            </div>
          </div>

          {view === "grid" ? (
            <div
              className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 grid-fade", fadeOut && "is-out")}
              style={{ gridAutoRows: '60px' }}
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          ) : (
            <div className={cn("border-t border-white/10 grid-fade", fadeOut && "is-out")}>
              {indexList.map((project) => (
                <IndexRow key={project.id} project={project} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Work;
