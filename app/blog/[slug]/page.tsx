import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  readingMinutes,
  type PostBlock,
} from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Anas Atiq`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-mono text-xl font-bold tracking-tight text-text-primary md:text-2xl">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-5 text-base leading-[1.8] text-text-muted md:text-lg">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-[1.7] text-text-muted md:text-lg"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface p-5 font-mono text-xs leading-6 text-text-primary md:text-sm">
          <code>{block.code}</code>
        </pre>
      );
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container-site flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-base font-bold tracking-tight text-text-primary"
          >
            anas atiq<span className="text-accent">.</span>
          </Link>
          <Link
            href="/#writing"
            className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] text-text-muted transition-colors hover:text-accent"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              ←
            </span>
            BACK
          </Link>
        </div>
      </header>

      <article className="container-site max-w-2xl py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          <span className="text-accent">[{post.dateLabel}]</span>
          <span aria-hidden="true" className="text-text-faint">
            ·
          </span>
          <time dateTime={post.date}>{readingMinutes(post)} min read</time>
        </div>

        <h1 className="mt-5 font-mono text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-4 h-px w-full bg-border" />

        <div className="mt-6">
          {post.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/#writing"
            className="group inline-flex items-center gap-2 font-mono text-sm text-text-primary transition-colors hover:text-accent"
          >
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-200 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to all writing
          </Link>
        </div>
      </article>
    </div>
  );
}
