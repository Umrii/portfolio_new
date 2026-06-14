"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view using an IntersectionObserver.
 * A section becomes active when it overlaps a thin band ~20-30% from the
 * top of the viewport; the last known section stays active in the gaps.
 */
export function useScrollSpy(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        const active = sectionIds.find((id) => intersecting.has(id));
        if (active) setActiveId(active);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // The last section may never reach the detection band on short pages.
    // Skip while the document isn't scrollable (e.g. menu scroll lock).
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollable = scrollHeight > window.innerHeight + 2;
      const reachedBottom =
        window.innerHeight + window.scrollY >= scrollHeight - 2;
      if (scrollable && reachedBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join("|")]);

  return activeId;
}
