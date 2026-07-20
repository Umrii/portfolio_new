"use client";

import { useCountUp } from "@/lib/useCountUp";

type Stat = { value: number; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 2, suffix: "+", label: "Years Exp" },
  { value: 10, suffix: "+", label: "APIs Built" },
  { value: 1000, suffix: "+", label: "Daily Reqs" },
  { value: 2, suffix: "", label: "Live Projects" },
];

type StatusItem = { icon: string; prefix?: string; value: string };

const STATUS_ITEMS: StatusItem[] = [
  { icon: "📍", value: "Newcastle, UK" },
  { icon: "🎓", value: "MSc Data Science — Yr 1/2" },
  {
    icon: "🔨",
    prefix: "Building:",
    value: "Market Data Reconciliation Pipeline",
  },
  { icon: "📚", prefix: "Studying:", value: "Data Engineering & AI" },
];

function CurrentlyCard() {
  return (
    <div
      className="animate-fade-up rounded-lg border border-border bg-surface p-6 shadow-[0_0_60px_var(--accent-dim)] md:p-7"
      style={{ animationDelay: "320ms" }}
    >
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
  );
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const { ref, value } = useCountUp<HTMLDivElement>(stat.value);

  return (
    <div
      ref={ref}
      className="animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="font-mono text-3xl font-bold text-text-primary md:text-4xl">
        {value}
        {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
      </p>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
        {stat.label}
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 75% 35%, var(--accent-dim), transparent 70%)",
        }}
      />

      <div className="container-site relative flex min-h-screen flex-col justify-center pb-14 pt-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.15em] text-accent md:text-sm">
              Creative Problem Solver
            </p>

            <h1
              className="animate-fade-up mt-5 font-mono text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              Hi, I&apos;m
              <br />
              Anas Atiq<span className="text-accent">.</span>
            </h1>

            <div
              className="animate-fade-up mt-6 space-y-4 text-base leading-relaxed text-text-muted md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              <p>
                I&apos;m a developer who genuinely loves{" "}
                <span className="text-text-primary">solving problems</span> —
                the messier, the better. I build{" "}
                <span className="text-text-primary">data pipelines</span>,{" "}
                <span className="text-text-primary">REST APIs</span>, and{" "}
                <span className="text-text-primary">AI-powered systems</span>,
                move with a strong{" "}
                <span className="text-text-primary">bias for action</span>, and
                take <span className="text-text-primary">full ownership</span>{" "}
                of whatever I ship.
              </p>
              <p>
                Off the clock, I&apos;m still building — weekends turn into{" "}
                <span className="text-text-primary">side projects</span> and
                late-night{" "}
                <span className="text-text-primary">vibe-coding</span>, chasing
                whatever new tech caught my eye. Turns out I just really like
                making things work.
              </p>
            </div>

            <div
              className="animate-fade-up mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono text-sm font-bold text-background transition-all hover:shadow-[0_0_24px_var(--accent-dim)] hover:brightness-110"
              >
                View Projects
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="/Resume.pdf"
                download="Muhammad Atiq CV.pdf"
                className="inline-flex items-center rounded-lg border border-border px-6 py-3 font-mono text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                Download CV
              </a>
            </div>
          </div>

          <CurrentlyCard />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-10 md:mt-20 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} delay={400 + index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
