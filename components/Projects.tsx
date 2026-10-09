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

const PRICE_PANTRY_PROJECT: Project = {
  title: "Price Pantry",
  badge: "Building",
  description:
    "A full-stack price-comparison platform that scrapes live grocery prices from UK supermarkets, tracks price history over time, and recommends the cheapest basket. The Phase-1 MVP runs end-to-end on real Tesco data — a Playwright scraper feeding a FastAPI + PostgreSQL backend and a Next.js dashboard — with multi-store support and AI product matching on the roadmap.",
  tags: ["Next.js", "FastAPI", "PostgreSQL", "Playwright", "SQLAlchemy", "Docker"],
  links: [{ label: "GitHub", href: "https://github.com/Umrii/pricepantry" }],
  image: {
    src: "/projects/pricepantry-preview.png",
    alt: "Price Pantry grocery price-comparison UI showing a cheapest basket with item prices",
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

// Cheapest-basket view — Price Pantry's headline output.
const PRICE_ITEMS = [
  { name: "Semi-Skimmed Milk 2L", price: "£1.45" },
  { name: "Wholemeal Bread 800g", price: "£0.89" },
  { name: "Free-Range Eggs ×12", price: "£2.10" },
  { name: "Mature Cheddar 400g", price: "£2.75" },
  { name: "Bananas 5pk", price: "£0.70" },
];

/* Stands in for the Price Pantry UI until the real PNG exists in
   /public/projects — a cheapest-basket price comparison. */
function PricePantryPreview() {
  return (
    <div className="absolute inset-0 flex flex-col bg-surface" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-text-muted">
          cheapest basket · tesco
        </span>
        <span className="font-mono text-[11px] text-accent">£7.89 ▼</span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2.5 p-4">
        {PRICE_ITEMS.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-3"
          >
            <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-text-muted">
              {item.name}
            </span>
            <span className="shrink-0 font-mono text-[10px] text-text-primary">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border px-4 py-2 font-mono text-[10px]">
        <span className="text-text-muted">price history · 30d</span>
        <span className="ml-auto text-accent">▼ 4.2%</span>
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
            project={PRICE_PANTRY_PROJECT}
            featured
            preview={<PricePantryPreview />}
          />
        </Reveal>
      </div>
    </section>
  );
}
