import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const EMAIL = "anas.atiq2023@gmail.com";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: "linkedin" | "github";
};

const CHANNELS: Channel[] = [
  {
    label: "LinkedIn",
    value: "in/anas-atiq",
    href: "https://www.linkedin.com/in/anas-atiq",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "Umrii",
    href: "https://github.com/Umrii",
    icon: "github",
  },
];

function ChannelIcon({ icon }: { icon: Channel["icon"] }) {
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.23c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="border-b border-border">
      <div className="container-site py-20 md:py-30">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for new roles
              </span>
            </Reveal>

            <Reveal delay={80} className="mt-5">
              <SectionHeading>Let&apos;s Talk</SectionHeading>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted md:text-lg">
                Open to Data Engineering and AI/ML roles in the UK.
                Particularly interested in companies working on{" "}
                <span className="text-text-primary">infrastructure</span>,{" "}
                <span className="text-text-primary">energy</span>, or{" "}
                <span className="text-text-primary">developer tooling</span>.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <a
                href={`mailto:${EMAIL}`}
                className="group mt-8 inline-flex items-center gap-2.5 rounded-lg bg-accent px-6 py-3.5 font-mono text-sm font-bold text-background transition-all hover:shadow-[0_0_24px_var(--accent-dim)] hover:brightness-110"
              >
                <MailIcon />
                {EMAIL}
              </a>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="rounded-lg border border-border bg-surface">
              <div className="flex items-center gap-1.5 border-b border-border px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-text-faint" />
                <span className="h-2.5 w-2.5 rounded-full bg-text-faint" />
                <span className="h-2.5 w-2.5 rounded-full bg-text-faint" />
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  {"// find me online"}
                </span>
              </div>

              <ul className="divide-y divide-border">
                {CHANNELS.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-background/40"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent">
                        <ChannelIcon icon={channel.icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.15em] text-text-faint">
                          {channel.label}
                        </span>
                        <span className="block truncate font-mono text-sm text-text-primary transition-colors group-hover:text-accent">
                          {channel.value}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 border-t border-border px-5 py-3.5 font-mono text-[11px] text-text-muted">
                <span aria-hidden="true">📍</span>
                Newcastle, UK
                <span aria-hidden="true" className="text-text-faint">
                  ·
                </span>
                Usually replies within a day
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
