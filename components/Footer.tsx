export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="container-site flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="#home"
          className="w-fit font-mono text-base font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
        >
          anas atiq<span className="text-accent">.</span>
        </a>

        <div className="space-y-1 font-mono text-xs sm:text-right">
          <p className="text-text-muted">Built with Next.js &amp; TypeScript</p>
          <p className="text-text-faint">© {year} · Newcastle, UK</p>
        </div>
      </div>
    </footer>
  );
}
