import PreviewImage from "@/components/PreviewImage";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  badge?: string;
  image?: { src: string; alt: string };
};

/* Stands in for the dashboard screenshot until the real PNG exists in
   /public/projects — styled as a plausible EUA price chart so the card
   never looks broken. */
function PreviewFallback() {
  return (
    <div className="absolute inset-0 flex flex-col bg-surface" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-text-muted">
          eu-ets · eua dec-26
        </span>
        <span className="font-mono text-[11px] text-accent">€71.42 ▲ 2.1%</span>
      </div>
      <div className="flex-1 p-4">
        <svg
          viewBox="0 0 320 140"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <line x1="0" y1="28" x2="320" y2="28" stroke="var(--border)" strokeWidth="1" />
          <line x1="0" y1="56" x2="320" y2="56" stroke="var(--border)" strokeWidth="1" />
          <line x1="0" y1="84" x2="320" y2="84" stroke="var(--border)" strokeWidth="1" />
          <line x1="0" y1="112" x2="320" y2="112" stroke="var(--border)" strokeWidth="1" />
          <polyline
            points="0,104 26,101 52,106 78,97 104,99 130,90 156,93 182,82 208,85 234,74 260,78 286,66 320,68"
            fill="none"
            stroke="var(--text-faint)"
            strokeWidth="1.5"
          />
          <path
            d="M0,95 L26,90 L52,97 L78,84 L104,88 L130,72 L156,78 L182,60 L208,66 L234,50 L260,57 L286,42 L320,46 L320,140 L0,140 Z"
            fill="var(--accent-dim)"
            stroke="none"
          />
          <polyline
            points="0,95 26,90 52,97 78,84 104,88 130,72 156,78 182,60 208,66 234,50 260,57 286,42 320,46"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="flex items-center gap-4 border-t border-border px-4 py-2">
        <span className="font-mono text-[10px] text-accent">— spot</span>
        <span className="font-mono text-[10px] text-text-muted">— 30d ma</span>
        <span className="ml-auto font-mono text-[10px] text-text-faint">
          refreshed 15m ago
        </span>
      </div>
    </div>
  );
}

function CardPreview({ image }: { image: { src: string; alt: string } }) {
  return (
    <div className="relative min-h-[260px] overflow-hidden border-t border-border lg:min-h-0 lg:border-l lg:border-t-0">
      <PreviewImage src={image.src} alt={image.alt} fallback={<PreviewFallback />} />
    </div>
  );
}

function CardBody({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col p-6 md:p-8">
      {project.badge && (
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent-dim px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {project.badge}
        </span>
      )}

      <h3 className="font-mono text-2xl font-bold tracking-tight text-text-primary md:text-[1.75rem]">
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs text-text-muted transition-all hover:border-accent/50 hover:text-accent hover:shadow-[0_0_8px_var(--accent-dim)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-6">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group/link inline-flex items-center gap-1.5 font-mono text-sm font-medium text-text-primary transition-colors hover:text-accent"
          >
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-200 group-hover/link:translate-x-0.5"
            >
              →
            </span>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const cardClasses =
    "overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-text-faint";

  if (featured) {
    return (
      <article className={`grid ${cardClasses} lg:grid-cols-[1.05fr_0.95fr]`}>
        <CardBody project={project} />
        {project.image && <CardPreview image={project.image} />}
      </article>
    );
  }

  return (
    <article className={`flex h-full flex-col ${cardClasses}`}>
      <CardBody project={project} />
    </article>
  );
}
