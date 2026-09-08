import { getLatestPublishedPosts } from "@/lib/blog";
import BlogCarousel from "./BlogCarousel";

export default async function Writing() {
  const posts = await getLatestPublishedPosts(9);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-20">
        <div>
          <p className="mb-4 font-mono text-xs tracking-widest text-violet">
            &#9670; LATEST WRITING
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Blogs
          </h2>
        </div>

        <div className="mt-10">
          <BlogCarousel posts={posts} />
        </div>
      </div>
    </section>
  );
}
