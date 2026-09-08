import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts, readingTimeFromContent } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog-types";
import { profile } from "@/lib/data";
import { formatDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: `Writing — ${profile.nameFirst} ${profile.nameLast}`,
  description:
    "Informative articles and insights on web development, engineering, and technology.",
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  let posts: BlogPost[] = [];
  let loadFailed = false;

  try {
    posts = await getPublishedPosts();
  } catch (error) {
    console.error("Failed to load posts:", error);
    loadFailed = true;
  }

  const postsByYear = groupByYear(posts);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
          <Link
            href="/"
            className="font-mono text-xs tracking-widest text-muted transition-colors hover:text-violet-bright"
          >
            &#8592; HOME
          </Link>

          <p className="mt-8 mb-4 font-mono text-sm tracking-widest text-violet">
            &#9670; WRITING
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            WRITING_/
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">
            Informative articles and insights on web development,
            engineering, and technology.
          </p>

          {loadFailed ? (
            <p className="mt-16 font-mono text-sm text-muted">
              Writing is temporarily unavailable — check back soon.
            </p>
          ) : posts.length === 0 ? (
            <p className="mt-16 font-mono text-sm text-muted">
              Nothing published yet — check back soon.
            </p>
          ) : (
            <div className="mt-16">
              {postsByYear.map(([year, yearPosts]) => (
                <div key={year} className="mt-12 first:mt-0">
                  <p className="mb-4 font-mono text-xs tracking-widest text-violet-bright/80">
                    {year}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {yearPosts.map((post) => {
                      const globalIndex =
                        posts.findIndex((p) => p.id === post.id) + 1;
                      return (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="group relative block overflow-hidden rounded-2xl border border-border bg-surface shadow-lg shadow-black/20 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-dim/30 focus-visible:-translate-y-1 focus-visible:outline-none"
                        >
                          <div className="aspect-[16/9] w-full overflow-hidden bg-surface-2">
                            {post.coverImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={post.coverImage}
                                alt=""
                                className="h-full w-full object-cover opacity-85 transition-opacity duration-200 ease-out group-hover:opacity-100"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <span className="font-mono text-xs tracking-widest text-muted">
                                  {post.category.toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="px-5 py-5">
                            <span className="font-mono text-xs tracking-widest text-muted">
                              B&middot;{String(globalIndex).padStart(2, "0")} &middot;{" "}
                              {post.category.toUpperCase()}
                            </span>

                            <h2 className="mt-2 text-xl font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 ease-out group-hover:text-violet-bright">
                              {post.title}
                            </h2>

                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/75">
                              {post.description}
                            </p>

                            <div className="mt-4 flex items-center gap-1.5 text-muted">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="font-mono text-[11px] tracking-widest">
                                {formatDate(post.createdAt)} &middot;{" "}
                                {readingTimeFromContent(post.content).toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function groupByYear(posts: BlogPost[]): [string, BlogPost[]][] {
  const groups = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const year = post.createdAt ? post.createdAt.slice(0, 4) : "Undated";
    const existing = groups.get(year) ?? [];
    existing.push(post);
    groups.set(year, existing);
  }
  return Array.from(groups.entries());
}

