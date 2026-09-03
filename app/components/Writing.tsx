import Link from "next/link";
import { getLatestPublishedPosts, readingTimeFromContent } from "@/lib/blog";

export default async function Writing() {
  const posts = await getLatestPublishedPosts(3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
        <p className="mb-4 font-mono text-xs tracking-widest text-violet">
          &#9670; LATEST WRITING
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Field notes from production
        </h2>

        <div className="mt-12">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative block border-t border-border px-4 py-8 transition-colors duration-200 ease-out last:border-b hover:bg-surface/60 focus-visible:bg-surface/60 focus-visible:outline-none"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-b border-r border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-xs tracking-widest text-muted">
                  B&middot;{String(i + 1).padStart(2, "0")} &middot; {post.category.toUpperCase()}
                </span>
                <span className="font-mono text-xs tracking-widest text-muted opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                  READ &#8599;
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground transition-colors duration-200 ease-out group-hover:text-violet-bright sm:text-3xl">
                {post.title}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75">
                {post.description}
              </p>

              <p className="mt-4 font-mono text-xs tracking-widest text-muted">
                {formatDate(post.createdAt)} &middot; {readingTimeFromContent(post.content).toUpperCase()}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="mt-8 inline-block font-mono text-xs tracking-widest text-violet-bright underline decoration-violet-dim underline-offset-4 hover:text-violet"
        >
          VIEW ALL WRITING &#8599;
        </Link>
      </div>
    </section>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso)
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
}
