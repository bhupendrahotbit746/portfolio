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

          <p className="mt-8 mb-4 font-mono text-xs tracking-widest text-violet">
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

                  {yearPosts.map((post) => {
                    const globalIndex =
                      posts.findIndex((p) => p.id === post.id) + 1;
                    return (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group relative block border-t border-border px-4 py-7 transition-colors duration-200 ease-out last:border-b hover:bg-surface/60 focus-visible:bg-surface/60 focus-visible:outline-none"
                      >
                        <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
                        <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-b border-r border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />

                        <span className="font-mono text-xs tracking-widest text-muted">
                          B&middot;{String(globalIndex).padStart(2, "0")}
                        </span>

                        <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground transition-colors duration-200 ease-out group-hover:text-violet-bright sm:text-2xl">
                          {post.title}
                        </h2>

                        {post.coverImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.coverImage}
                            alt=""
                            className="mt-5 aspect-[16/7] w-full object-cover opacity-80"
                          />
                        )}

                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/75">
                          {post.description}
                        </p>

                        <p className="mt-3 font-mono text-xs tracking-widest text-muted">
                          {post.category.toUpperCase()} &middot;{" "}
                          {formatDate(post.createdAt)} &middot;{" "}
                          {readingTimeFromContent(post.content).toUpperCase()}
                        </p>
                      </Link>
                    );
                  })}
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

