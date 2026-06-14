import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const STATUS_ITEMS: { icon: string; prefix?: string; value: string }[] = [
  { icon: "📍", value: "Newcastle, UK" },
  { icon: "🎓", value: "MSc Data Science — Yr 1/2" },
  {
    icon: "🔨",
    prefix: "Building:",
    value: "Market Data Reconciliation Pipeline",
  },
  { icon: "📚", prefix: "Studying:", value: "Data Engineering & AI" },
];

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="container-site py-20 md:py-30">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading>About Me</SectionHeading>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-8 text-base leading-relaxed text-text-muted md:text-lg">
                I&apos;m a Python developer and MSc Data Science student at{" "}
                <span className="text-text-primary">
                  Northumbria University, Newcastle
                </span>
                . With <span className="text-text-primary">2+ years</span>{" "}
                building production-grade APIs and data pipelines at Hoboetech
                and CyberEvangelists, I&apos;ve shipped systems handling{" "}
                <span className="text-text-primary">1000+ daily requests</span>{" "}
                and cut API latency by{" "}
                <span className="text-text-primary">12%</span>.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 text-base leading-relaxed text-text-muted md:text-lg">
                My focus right now: Data Engineering and AI —{" "}
                <span className="text-text-primary">
                  AWS, Python, Docker, SQL
                </span>{" "}
                — and how data-powered AI apps can power better decisions in
                fintech and energy markets.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent">
                    Active
                  </span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-faint">
                  {"// currently"}
                </span>
              </div>

              <ul className="mt-5 space-y-4">
                {STATUS_ITEMS.map((item) => (
                  <li key={item.value} className="flex items-start gap-3">
                    <span className="text-base leading-6" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="font-mono text-sm leading-6">
                      {item.prefix && (
                        <span className="text-text-muted">{item.prefix} </span>
                      )}
                      <span className="text-text-primary">{item.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
