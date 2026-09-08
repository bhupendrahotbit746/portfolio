import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  readingTimeFromContent,
} from "@/lib/blog";
import { profile } from "@/lib/data";
import { formatDate } from "@/lib/format-date";
import MarkdownContent from "@/app/components/MarkdownContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let post;
  try {
    post = await getPublishedPostBySlug(slug);
  } catch {
    return {};
  }
  if (!post) return {};

  return {
    title: `${post.title} — ${profile.nameFirst} ${profile.nameLast}`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPublishedPostBySlug(slug);
  } catch (error) {
    console.error("Failed to load post:", error);
    notFound();
  }
  if (!post) notFound();

  const allPosts = await getPublishedPosts().catch((error) => {
    console.error("Failed to load post list for index:", error);
    return [];
  });

  const index = allPosts.findIndex((p) => p.id === post.id) + 1;

  return (
    <>
      <article className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
          <Link
            href="/blog"
            className="font-mono text-xs tracking-widest text-muted transition-colors hover:text-violet-bright"
          >
            &#8592; WRITING
          </Link>

          <p className="mt-8 font-mono text-sm tracking-widest text-violet">
            B&middot;{String(index).padStart(2, "0")} / {post.category.toUpperCase()}
          </p>

          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
            {post.description}
          </p>

          <p className="mt-6 font-mono text-xs tracking-widest text-muted">
            {formatDate(post.createdAt)} &middot; {readingTimeFromContent(post.content).toUpperCase()}
          </p>

          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt=""
              className="mt-12 aspect-[16/7] w-full object-cover opacity-85"
            />
          )}

          {post.tags.length > 0 && (
            <p className="mt-3 font-mono text-xs tracking-widest text-violet-bright/80">
              {post.tags.map((t) => t.toUpperCase()).join(" · ")}
            </p>
          )}

          <div className="mx-auto mt-14 max-w-2xl">
            <MarkdownContent
              content={post.content}
              className="prose-blog text-base leading-relaxed text-foreground/80 sm:text-lg"
            />
          </div>

          <div className="mx-auto mt-16 max-w-2xl border-t border-border pt-8">
            <Link
              href="/blog"
              className="font-mono text-xs tracking-widest text-violet-bright underline decoration-violet-dim underline-offset-4 hover:text-violet"
            >
              &#8592; BACK TO WRITING
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

