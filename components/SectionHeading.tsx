import type { ReactNode } from "react";

export default function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
      <span className="text-accent">{"// "}</span>
      {children}
    </h2>
  );
}
