import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteShell from "../../components/SiteShell";
import MdxRenderer from "../MdxRenderer";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";
import { profile } from "@/lib/data";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle ?? `${post.title} — ${profile.nameFirst} ${profile.nameLast}`,
    description: post.seoDescription ?? post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === post.slug) + 1;

  return (
    <SiteShell>
      <article className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
          <Link
            href="/blog"
            className="font-mono text-xs tracking-widest text-muted transition-colors hover:text-violet-bright"
          >
            &#8592; WRITING
          </Link>

          <p className="mt-8 font-mono text-xs tracking-widest text-violet">
            B&middot;{String(index).padStart(2, "0")} / {post.category.toUpperCase()}
          </p>

          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
            {post.description}
          </p>

          <p className="mt-6 font-mono text-xs tracking-widest text-muted">
            {formatDate(post.date)} &middot; {post.readingTime.toUpperCase()}
          </p>

          {post.tags.length > 0 && (
            <p className="mt-3 font-mono text-xs tracking-widest text-violet-bright/80">
              {post.tags.map((t) => t.toUpperCase()).join(" · ")}
            </p>
          )}

          {post.coverImage && (
            <div className="relative mt-12 overflow-hidden border border-border">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1600}
                height={900}
                priority
                className="h-auto w-full"
              />
            </div>
          )}

          <div className="mx-auto mt-14 max-w-2xl">
            <MdxRenderer source={post.content} />
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
    </SiteShell>
  );
}

function formatDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
}
