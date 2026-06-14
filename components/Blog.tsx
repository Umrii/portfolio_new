import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getAllPosts, readingMinutes } from "@/lib/posts";

const LINKEDIN_URL = "https://www.linkedin.com/in/anas-atiq";

export default function Blog() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="writing" className="border-b border-border">
      <div className="container-site py-20 md:py-30">
        <Reveal>
          <SectionHeading>Writing</SectionHeading>
        </Reveal>

        <div className="mt-10 space-y-4">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-text-faint sm:flex-row sm:items-center sm:gap-6 md:p-7"
              >
                <span className="shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-accent sm:w-28">
                  [{post.dateLabel}]
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="font-mono text-lg font-bold tracking-tight text-text-primary transition-colors group-hover:text-accent md:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-muted">
                    {post.excerpt}
                  </p>
                  <span className="mt-2 inline-block font-mono text-[11px] text-text-faint">
                    {readingMinutes(post)} min read
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-text-primary transition-colors group-hover:text-accent">
                  Read More
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 font-mono text-sm text-text-muted">
            More posts coming —{" "}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary underline decoration-text-faint underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              follow on LinkedIn
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
