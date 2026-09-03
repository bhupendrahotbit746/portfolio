import type { BlogPostInput } from "./blog-types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validatePostInput(body: unknown): BlogPostInput {
  if (typeof body !== "object" || body === null) {
    throw new Error("Request body must be an object.");
  }

  const b = body as Record<string, unknown>;

  const slug = String(b.slug ?? "").trim();
  const title = String(b.title ?? "").trim();
  const description = String(b.description ?? "").trim();
  const content = String(b.content ?? "");
  const category = String(b.category ?? "").trim();
  const coverImage = String(b.coverImage ?? "").trim();
  const tags = Array.isArray(b.tags) ? b.tags.map((t) => String(t).trim()).filter(Boolean) : [];
  const published = Boolean(b.published);

  if (!slug || !SLUG_PATTERN.test(slug)) {
    throw new Error("Slug must be lowercase letters, numbers, and hyphens only.");
  }
  if (!title) throw new Error("Title is required.");
  if (!description) throw new Error("Description is required.");
  if (!content.trim()) throw new Error("Content is required.");
  if (!category) throw new Error("Category is required.");

  return { slug, title, description, content, category, tags, coverImage, published };
}
