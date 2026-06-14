/**
 * Single source of truth for blog content. Add an entry here and it
 * auto-populates both the home "// Writing" list and its own
 * /blog/[slug] page — no routing changes needed (spec §5.7).
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang?: string; code: string };

export type Post = {
  slug: string;
  title: string;
  /** ISO date for <time> + sorting */
  date: string;
  /** Human label shown in the UI, e.g. "Jan 2026" */
  dateLabel: string;
  excerpt: string;
  blocks: PostBlock[];
};

const POSTS: Post[] = [
  {
    slug: "system-design-netflix-case-study",
    title: "System Design: Netflix Case Study",
    date: "2026-01-12",
    dateLabel: "Jan 2026",
    excerpt:
      "What actually happens between pressing play and the first frame — and where the data engineering hides in a service that streams to 260M+ members.",
    blocks: [
      {
        type: "p",
        text: "Netflix streams to more than 260 million members across nearly every country on earth. Pressing play feels instant, but behind that single tap is one of the most studied distributed systems in the industry. This is a walk through the parts I find most instructive as a data engineer.",
      },
      {
        type: "h2",
        text: "The requirements that shape everything",
      },
      {
        type: "p",
        text: "Before any boxes-and-arrows, it helps to name the non-functional requirements, because they dictate every later trade-off:",
      },
      {
        type: "ul",
        items: [
          "Massive read scale — playback vastly outnumbers writes.",
          "High availability — a regional failure must not take down playback.",
          "Low startup latency — time-to-first-frame is the metric members feel.",
          "Global reach — quality has to hold up far from any data centre.",
        ],
      },
      {
        type: "h2",
        text: "Open Connect: push the bytes to the edge",
      },
      {
        type: "p",
        text: "The heavy video bytes never travel from a central cloud. Netflix ships its own caching appliances — Open Connect — that sit inside ISP networks, close to members. Popular titles are pre-positioned overnight during off-peak hours, so when you hit play the stream is served from a box maybe one hop away. The control plane runs in AWS; the data plane lives at the edge.",
      },
      {
        type: "h2",
        text: "A control plane of microservices",
      },
      {
        type: "p",
        text: "Everything that isn't raw video — auth, the home page, search, billing, playback authorisation — is a mesh of microservices in AWS. An API gateway fans requests out to hundreds of services, each owning its data and failing independently. The guiding principle is graceful degradation: if recommendations are slow, you still get a usable, if less personal, home row rather than an error.",
      },
      {
        type: "h2",
        text: "Where the data engineering lives",
      },
      {
        type: "p",
        text: "This is the part that maps onto my own work. Every play, pause, and scrub is an event. Those events stream through a log-based pipeline into the data platform, where batch and stream jobs turn them into the signals that power ranking, encoding decisions, and A/B analysis.",
      },
      {
        type: "code",
        lang: "text",
        code: "client events → Kafka → stream + batch processing → data lake → ML features → recommendations",
      },
      {
        type: "p",
        text: "The lesson I keep relearning: the product experience is only as good as the pipeline feeding it. Precompute what you can, keep the hot path read-optimised, and treat the event stream as a first-class product, not an afterthought.",
      },
      {
        type: "h2",
        text: "Takeaways",
      },
      {
        type: "ul",
        items: [
          "Push data to the edge — latency you remove from the network you never have to optimise away in code.",
          "Design for graceful degradation, not just uptime.",
          "Precompute aggressively; the cheapest request is the one you answered ahead of time.",
        ],
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function readingMinutes(post: Post): number {
  const words = post.blocks.reduce((total, block) => {
    if (block.type === "ul") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    if (block.type === "code") {
      return total + block.code.split(/\s+/).length;
    }
    return total + block.text.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
