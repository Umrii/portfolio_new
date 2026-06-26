import type { ReactNode } from "react";
import PreviewImage from "@/components/PreviewImage";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  badge?: string;
  image?: { src: string; alt: string };
};

function CardPreview({
  image,
  preview,
}: {
  image: { src: string; alt: string };
  preview: ReactNode;
}) {
  return (
    <div className="relative min-h-[260px] overflow-hidden border-t border-border lg:min-h-0 lg:border-l lg:border-t-0">
      <PreviewImage src={image.src} alt={image.alt} fallback={preview} />
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

      {project.tags.length > 0 && (
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
      )}

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
  preview,
}: {
  project: Project;
  featured?: boolean;
  preview?: ReactNode;
}) {
  const cardClasses =
    "overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-text-faint";

  if (featured) {
    return (
      <article className={`grid ${cardClasses} lg:grid-cols-[1.05fr_0.95fr]`}>
        <CardBody project={project} />
        {project.image && (
          <CardPreview image={project.image} preview={preview} />
        )}
      </article>
    );
  }

  return (
    <article className={`flex h-full flex-col ${cardClasses}`}>
      <CardBody project={project} />
    </article>
  );
}
