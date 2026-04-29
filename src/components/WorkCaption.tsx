import type { Project } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

interface WorkCaptionProps {
  project: Project;
}

/**
 * Museum-style caption block — grayscale, no effects, used on project detail pages.
 * Renders only the fields that are actually present, so it works for any project.
 */
const WorkCaption = ({ project }: WorkCaptionProps) => {
  const { t, locale } = useLanguage();

  const rows: { label: string; value: string }[] = [];

  // Title / Year line is rendered above; this block is the technical caption.
  if (project.medium?.[locale]) rows.push({ label: t("caption", "medium"), value: project.medium[locale] });
  if (project.duration) rows.push({ label: t("caption", "duration"), value: project.duration });
  if (project.edition?.[locale]) rows.push({ label: t("caption", "edition"), value: project.edition[locale] });
  if (project.commissionedBy?.[locale]) rows.push({ label: t("caption", "commissionedBy"), value: project.commissionedBy[locale] });
  if (project.courtesy?.[locale]) rows.push({ label: t("caption", "courtesy"), value: project.courtesy[locale] });

  if (rows.length === 0) return null;

  return (
    <div className="mb-12 border-t border-b border-white/10 py-6">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
          <em className="not-italic">{project.title}</em>
          <span className="text-muted-foreground font-normal">, {project.year}</span>
        </h1>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="text-muted-foreground/70 uppercase tracking-wider text-xs pt-0.5">{row.label}</dt>
            <dd className="text-foreground/90 leading-relaxed">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default WorkCaption;
