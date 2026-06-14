"use client";

import { useEffect, useState } from "react";
import { useCountUp } from "@/lib/useCountUp";

const CODE_LINES = [
  "# EU ETS Carbon Tracker",
  "pipeline = (",
  "    fetch_eex_prices()",
  "    | clean_ohlcv()",
  "    | compute_rolling_ma(windows=[7, 30])",
  "    | alert_on_threshold(price=65.0)",
  ")",
  "pipeline.run()",
];
const FULL_CODE = CODE_LINES.join("\n");
const OUTPUT_LINE = "✓ pipeline scheduled · polling EEX every 15m";
const TYPE_SPEED_MS = 24;
const TYPE_START_DELAY_MS = 500;

type Stat = { value: number; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 2, suffix: "+", label: "Years Exp" },
  { value: 10, suffix: "+", label: "APIs Built" },
  { value: 1000, suffix: "+", label: "Daily Reqs" },
  { value: 2, suffix: "", label: "Live Projects" },
];

function Cursor() {
  return (
    <span className="ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[3px] animate-blink bg-accent" />
  );
}

function Terminal() {
  const [typedChars, setTypedChars] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const done = typedChars >= FULL_CODE.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedChars(FULL_CODE.length);
      return;
    }
    let interval = 0;
    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setTypedChars((count) => {
          if (count >= FULL_CODE.length) {
            window.clearInterval(interval);
            return count;
          }
          return count + 1;
        });
      }, TYPE_SPEED_MS);
    }, TYPE_START_DELAY_MS);
    return () => {
      window.clearTimeout(startDelay);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const timeout = window.setTimeout(() => setShowOutput(true), 450);
    return () => window.clearTimeout(timeout);
  }, [done]);

  const typedLines = FULL_CODE.slice(0, typedChars).split("\n");

  return (
    <div
      aria-hidden="true"
      className="animate-fade-up overflow-hidden rounded-lg border border-border bg-surface shadow-[0_0_60px_var(--accent-dim)]"
      style={{ animationDelay: "320ms" }}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-text-faint" />
        <span className="h-2.5 w-2.5 rounded-full bg-text-faint" />
        <span className="h-2.5 w-2.5 rounded-full bg-text-faint" />
        <span className="ml-3 font-mono text-xs text-text-muted">
          carbon_tracker.py — python
        </span>
      </div>
      <pre className="min-h-[14rem] overflow-x-auto p-5 font-mono text-xs leading-6 md:text-[13px]">
        <code>
          {typedLines.map((line, index) => {
            const isLastLine = index === typedLines.length - 1;
            return (
              <div
                key={index}
                className={
                  line.trimStart().startsWith("#")
                    ? "text-text-muted"
                    : "text-text-primary"
                }
              >
                {line}
                {isLastLine && !showOutput && <Cursor />}
              </div>
            );
          })}
          {showOutput && (
            <div className="mt-2 text-accent">
              {OUTPUT_LINE}
              <Cursor />
            </div>
          )}
        </code>
      </pre>
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
              Data Engineer & Python Developer
            </p>

            <h1
              className="animate-fade-up mt-5 font-mono text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              Hi, I&apos;m
              <br />
              Anas Atiq<span className="text-accent">.</span>
            </h1>

            <p
              className="animate-fade-up mt-6 text-lg leading-relaxed text-text-muted md:text-xl"
              style={{ animationDelay: "160ms" }}
            >
              I build data pipelines, REST APIs, and real-time systems that
              turn raw market data into actionable intelligence.
            </p>

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
                download
                className="inline-flex items-center rounded-lg border border-border px-6 py-3 font-mono text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                Download CV
              </a>
            </div>
          </div>

          <Terminal />
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
