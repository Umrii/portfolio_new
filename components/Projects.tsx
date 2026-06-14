import { Fragment } from "react";
import PreviewImage from "@/components/PreviewImage";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const FEATURED_PROJECT: Project = {
  title: "Carbon Market Tracker",
  badge: "Live · Featured",
  description:
    "End-to-end data pipeline tracking live EU ETS carbon allowance prices from the European Energy Exchange (EEX). Serves rolling analytics via a FastAPI REST API with automated price alert scheduling.",
  tags: ["Python", "FastAPI", "SQLite", "Streamlit", "Plotly", "APScheduler"],
  links: [
    { label: "Live Demo", href: "https://carbon-market-tracker.onrender.com/" },
    { label: "GitHub", href: "https://github.com/Umrii/carbon-market-tracker" },
  ],
  image: {
    src: "/projects/carbon-tracker-preview.png",
    alt: "Carbon Market Tracker Streamlit dashboard showing EU ETS price analytics",
  },
};

const WIP_REPO_URL =
  "https://github.com/Umrii/market-data-reconciliation-pipeline";

// Quality-score heatmap (instrument × source) — the dashboard's signature
// view. Drives the placeholder until a real screenshot is captured.
const HEATMAP_SOURCES = ["YH", "AV", "TD"];
const HEATMAP_ROWS: { label: string; scores: number[] }[] = [
  { label: "BARC.L", scores: [96, 92, 88] },
  { label: "HSBA.L", scores: [94, 71, 90] },
  { label: "BP.L", scores: [90, 89, -1] },
  { label: "VOD.L", scores: [97, 95, 86] },
  { label: "RIO.L", scores: [58, 91, 93] },
  { label: "LLOY.L", scores: [93, 87, 90] },
];

function cellColor(score: number): string {
  if (score < 0) return "var(--border)"; // gap / missing bar
  if (score < 70) return "rgba(255, 96, 96, 0.55)"; // anomaly flagged
  if (score < 85) return "rgba(0, 255, 135, 0.35)"; // medium
  return "rgba(0, 255, 135, 0.8)"; // pass
}

/* Stands in for the dashboard screenshot until the real PNG exists in
   /public/projects — a quality-score heatmap so the card never looks broken. */
function QualityHeatmapPreview() {
  return (
    <div className="absolute inset-0 flex flex-col bg-surface" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-text-muted">
          data quality · inst × source
        </span>
        <span className="font-mono text-[11px] text-accent">avg 88 ▲</span>
      </div>

      <div className="flex-1 p-4">
        <div
          className="grid h-full gap-1.5"
          style={{
            gridTemplateColumns: "auto repeat(3, minmax(0, 1fr))",
            gridTemplateRows: "auto repeat(6, minmax(0, 1fr))",
          }}
        >
          <span />
          {HEATMAP_SOURCES.map((source) => (
            <span
              key={source}
              className="text-center font-mono text-[9px] uppercase tracking-wider text-text-faint"
            >
              {source}
            </span>
          ))}

          {HEATMAP_ROWS.map((row) => (
            <Fragment key={row.label}>
              <span className="flex items-center whitespace-nowrap pr-2 font-mono text-[9px] text-text-faint">
                {row.label}
              </span>
              {row.scores.map((score, index) => (
                <span
                  key={index}
                  className="rounded-[3px]"
                  style={{ backgroundColor: cellColor(score) }}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border px-4 py-2">
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
          <span
            className="h-2 w-2 rounded-[2px]"
            style={{ backgroundColor: "rgba(0, 255, 135, 0.8)" }}
          />
          pass
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
          <span
            className="h-2 w-2 rounded-[2px]"
            style={{ backgroundColor: "rgba(255, 96, 96, 0.55)" }}
          />
          alert
        </span>
        <span className="ml-auto font-mono text-[10px] text-text-faint">
          reconciled 5m ago
        </span>
      </div>
    </div>
  );
}

/* Active work-in-progress project — signals momentum to recruiters and
   links straight to the repo. Mirrors the featured card layout. */
function WipCard() {
  return (
    <article className="grid overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-text-faint lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex h-full flex-col p-6 md:p-8">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent-dim px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Building
        </span>

        <h3 className="font-mono text-2xl font-bold tracking-tight text-text-primary md:text-[1.75rem]">
          Market Data Reconciliation Pipeline
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
          A production-grade pipeline that ingests 1-minute OHLCV bars from three
          market-data vendors and reconciles them into one trusted source.
          Cross-source discrepancy, gap, and staleness detectors score data
          quality and raise alerts before bad ticks reach downstream risk and
          pricing models. Built with Airflow, dbt, DuckDB, FastAPI, and
          Streamlit.
        </p>

        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-6">
          <a
            href={WIP_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 font-mono text-sm font-medium text-text-primary transition-colors hover:text-accent"
          >
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-200 group-hover/link:translate-x-0.5"
            >
              →
            </span>
            GitHub
          </a>
        </div>
      </div>

      <div className="relative min-h-[260px] overflow-hidden border-t border-border lg:min-h-0 lg:border-l lg:border-t-0">
        <PreviewImage
          src="/projects/market-data-reconciliation-preview.png"
          alt="Market Data Reconciliation Pipeline dashboard showing a data-quality heatmap across instruments and sources"
          fallback={<QualityHeatmapPreview />}
        />
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="container-site py-20 md:py-30">
        <Reveal>
          <SectionHeading>Featured Projects</SectionHeading>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <ProjectCard project={FEATURED_PROJECT} featured />
        </Reveal>

        <Reveal delay={100} className="mt-6">
          <WipCard />
        </Reveal>
      </div>
    </section>
  );
}
