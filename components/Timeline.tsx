import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

type TimelineEntry = {
  period: string;
  kind: "education" | "work";
  title: string;
  org: string;
  details?: string[];
  current?: boolean;
};

const ENTRIES: TimelineEntry[] = [
  {
    period: "Present",
    kind: "education",
    title: "MSc Data Science",
    org: "Northumbria University, Newcastle",
    details: ["Advanced Practice (2025–2027)"],
    current: true,
  },
  {
    period: "Mar–Sept 2025",
    kind: "work",
    title: "Python Developer",
    org: "Hoboetech, Lahore",
    details: [
      "Built scalable data processing pipelines.",
      "Implemented fault-handling and retry logic for distributed workflows.",
    ],
  },
  {
    period: "Jul 2023–Feb 2025",
    kind: "work",
    title: "Python Developer",
    org: "CyberEvangelists, Lahore",
    details: [
      "10+ production REST APIs · FastAPI · 1000+ daily requests · 12% latency reduction",
      "Async processing: Celery + Redis",
    ],
  },
  {
    period: "2019–2023",
    kind: "education",
    title: "BSc Computer Science",
    org: "FAST-NUCES, Pakistan",
  },
];

function Node({ current }: { current?: boolean }) {
  return (
    <span
      className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center"
      aria-hidden="true"
    >
      {current && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
      )}
      <span
        className={`relative h-3.5 w-3.5 rounded-full border-2 ${
          current
            ? "border-accent bg-accent"
            : "border-text-faint bg-background"
        }`}
      />
    </span>
  );
}

export default function Timeline() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="container-site py-20 md:py-30">
        <Reveal>
          <SectionHeading>Experience</SectionHeading>
        </Reveal>

        <div className="relative mt-12">
          {/* Spec §5.6: left-aligned accent line. Fades out at the tail. */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[6px] top-2 w-px bg-gradient-to-b from-accent/50 via-border to-transparent"
          />

          <ol className="space-y-10">
            {ENTRIES.map((entry, index) => (
              <Reveal key={`${entry.title}-${entry.period}`} delay={index * 90}>
                <li className="relative pl-9 md:pl-12">
                  <Node current={entry.current} />

                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      className={`font-mono text-xs tracking-[0.1em] ${
                        entry.current ? "text-accent" : "text-text-muted"
                      }`}
                    >
                      [ {entry.period} ]
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
                      {entry.kind}
                    </span>
                  </div>

                  <h3 className="font-mono text-lg font-bold text-text-primary md:text-xl">
                    {entry.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-text-muted md:text-base">
                    {entry.org}
                  </p>

                  {entry.details && (
                    <ul className="mt-3 space-y-1.5">
                      {entry.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex gap-2 text-sm leading-relaxed text-text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint"
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
