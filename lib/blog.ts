import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  updatedAt?: string;
  draft?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function readingTimeFromContent(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function listMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

function loadPost(filename: string): BlogPost {
  const slug = slugFromFilename(filename);
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  return {
    ...frontmatter,
    tags: frontmatter.tags ?? [],
    featured: frontmatter.featured ?? false,
    slug,
    readingTime: readingTimeFromContent(content),
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return listMdxFiles()
    .map((file) => loadPost(file))
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ content, ...meta }) => meta);
}

export function getAllPostSlugs(): string[] {
  return listMdxFiles().map(slugFromFilename);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filename = `${slug}.mdx`;
  if (!listMdxFiles().includes(filename)) return null;

  const post = loadPost(filename);
  if (post.draft) return null;

  return post;
}

export function getLatestPosts(count: number): BlogPostMeta[] {
  return getAllPosts().slice(0, count);
}
