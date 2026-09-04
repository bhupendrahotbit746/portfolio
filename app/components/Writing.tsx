import Link from "next/link";
import { getLatestPublishedPosts, readingTimeFromContent } from "@/lib/blog";
import { formatDate } from "@/lib/format-date";

export default async function Writing() {
  const posts = await getLatestPublishedPosts(3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 font-mono text-xs tracking-widest text-violet">
              &#9670; LATEST WRITING
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Blogs
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-mono text-xs tracking-widest text-violet-bright underline decoration-violet-dim underline-offset-4 hover:text-violet"
          >
            VIEW ALL &#8599;
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative block rounded-lg border border-border px-5 py-5 transition-colors duration-200 ease-out hover:bg-surface/60 focus-visible:bg-surface/60 focus-visible:outline-none"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-b border-r border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />

              <span className="font-mono text-xs tracking-widest text-muted">
                B&middot;{String(i + 1).padStart(2, "0")} &middot; {post.category.toUpperCase()}
              </span>

              <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 ease-out group-hover:text-violet-bright">
                {post.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/75">
                {post.description}
              </p>

              <p className="mt-4 font-mono text-[11px] tracking-widest text-muted">
                {formatDate(post.createdAt)} &middot; {readingTimeFromContent(post.content).toUpperCase()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
