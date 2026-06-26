import { Fragment } from "react";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const CARBON_PROJECT: Project = {
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

const SCOUT_PROJECT: Project = {
  title: "Scout — Expert Sourcing Agent",
  badge: "Live",
  description:
    "An AI expert-sourcing agent that turns messy bios into a ranked, outreach-ready shortlist through an extract → classify → enrich → route loop over a queryable org memory. A structured-output agent layer with an eval harness measures extraction reliability — a disciplined prompt rewrite lifted accuracy to 89.7% and roughly halved hallucinations.",
  tags: ["Python", "FastAPI", "Gemini", "SQLAlchemy", "Pydantic", "Postgres"],
  links: [
    { label: "Live Demo", href: "https://scout-ibs2.onrender.com/" },
    { label: "GitHub", href: "https://github.com/Umrii/Scout_sourcing_loop" },
  ],
  image: {
    src: "/projects/scout-preview.png",
    alt: "Scout expert-sourcing agent UI showing a ranked candidate shortlist with match scores",
  },
};

const MARKET_DATA_PROJECT: Project = {
  title: "Market Data Reconciliation Pipeline",
  badge: "Building",
  description:
    "A production-grade pipeline that ingests 1-minute OHLCV bars from three market-data vendors and reconciles them into one trusted source. Cross-source discrepancy, gap, and staleness detectors score data quality and raise alerts before bad ticks reach downstream risk and pricing models. Built with Airflow, dbt, DuckDB, FastAPI, and Streamlit.",
  tags: [],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/Umrii/market-data-reconciliation-pipeline",
    },
  ],
  image: {
    src: "/projects/market-data-reconciliation-preview.png",
    alt: "Market Data Reconciliation Pipeline dashboard showing a data-quality heatmap across instruments and sources",
  },
};

/* Stands in for the dashboard screenshot until the real PNG exists in
   /public/projects — styled as a plausible EUA price chart. */
function CarbonChartPreview() {
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

// Ranked match shortlist — Scout's product output. Scores drive the bars.
const SCOUT_MATCHES = [
  { role: "Energy Markets · Lead", score: 94 },
  { role: "Quant Research · Sr", score: 88 },
  { role: "Risk Modelling · Lead", score: 81 },
  { role: "Commodities · Sr", score: 76 },
  { role: "Carbon Policy · Mid", score: 63 },
];

/* Stands in for the Scout UI until the real PNG exists in /public/projects —
   a ranked, scored candidate shortlist. */
function ScoutPreview() {
  return (
    <div className="absolute inset-0 flex flex-col bg-surface" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-text-muted">
          sourcing · top matches
        </span>
        <span className="font-mono text-[11px] text-accent">6 ranked</span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 p-4">
        {SCOUT_MATCHES.map((match) => (
          <div key={match.role} className="flex items-center gap-3">
            <span className="w-28 shrink-0 truncate font-mono text-[10px] text-text-muted">
              {match.role}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
              <span
                className="block h-full rounded-full bg-accent"
                style={{ width: `${match.score}%` }}
              />
            </span>
            <span className="w-7 shrink-0 text-right font-mono text-[10px] text-accent">
              0.{match.score}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border px-4 py-2 font-mono text-[10px]">
        <span className="text-text-muted">extract → classify → route</span>
        <span className="ml-auto text-accent">eval 89.7%</span>
      </div>
    </div>
  );
}

// Quality-score heatmap (instrument × source) — the dashboard's signature view.
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
   /public/projects — a quality-score heatmap. */
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

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="container-site py-20 md:py-30">
        <Reveal>
          <SectionHeading>Featured Projects</SectionHeading>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <ProjectCard
            project={CARBON_PROJECT}
            featured
            preview={<CarbonChartPreview />}
          />
        </Reveal>

        <Reveal delay={100} className="mt-6">
          <ProjectCard
            project={SCOUT_PROJECT}
            featured
            preview={<ScoutPreview />}
          />
        </Reveal>

        <Reveal delay={100} className="mt-6">
          <ProjectCard
            project={MARKET_DATA_PROJECT}
            featured
            preview={<QualityHeatmapPreview />}
          />
        </Reveal>
      </div>
    </section>
  );
}
