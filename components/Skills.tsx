"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

type SkillGroup = {
  name: string;
  skills: string[];
  level: number;
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Core Stack",
    level: 90,
    skills: [
      "Python",
      "FastAPI",
      "SQL",
      "PostgreSQL",
      "SQLite",
      "Docker",
      "Redis",
      "Celery",
    ],
  },
  {
    name: "Data Engineering",
    level: 75,
    skills: ["pandas", "NumPy", "Streamlit", "Plotly"],
  },
  {
    name: "Cloud & DevOps",
    level: 70,
    skills: ["AWS", "Git", "GitHub Actions", "Linux"],
  },
];

/* Spec §5.5: thin proficiency line under each group (not per-tag).
   Fills to `level`% once scrolled into view. */
function Meter({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFilled(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-auto pt-6">
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent shadow-[0_0_8px_var(--accent-dim)] transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          style={{ width: filled ? `${level}%` : "0%", transitionDelay: "350ms" }}
        />
      </div>
    </div>
  );
}

function GroupCard({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
      <div className="flex items-baseline justify-between">
        <h3 className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-text-primary">
          {group.name}
        </h3>
        <span className="font-mono text-xs text-text-faint">0{index + 1}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="cursor-default rounded-full border border-border bg-background/60 px-3 py-1.5 font-mono text-xs text-text-muted transition-all hover:border-accent/50 hover:text-accent hover:shadow-[0_0_8px_var(--accent-dim)]"
          >
            {skill}
          </span>
        ))}
      </div>

      <Meter level={group.level} />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="container-site py-20 md:py-30">
        <Reveal>
          <SectionHeading>Technical Skills</SectionHeading>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => (
            <Reveal key={group.name} delay={index * 120} className="h-full">
              <GroupCard group={group} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
