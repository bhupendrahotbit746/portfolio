"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getIdToken } from "./useAdminAuth";
import type { BlogPost, BlogPostInput } from "@/lib/blog-types";
import MarkdownContent from "@/app/components/MarkdownContent";

const SNIPPET_LANGUAGES = [
  "javascript",
  "typescript",
  "jsx",
  "tsx",
  "python",
  "java",
  "c",
  "cpp",
  "csharp",
  "go",
  "rust",
  "php",
  "ruby",
  "sql",
  "bash",
  "json",
  "yaml",
  "html",
  "css",
  "markdown",
  "text",
];

type PostFormProps = {
  initialPost?: BlogPost;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostForm({ initialPost }: PostFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialPost);

  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [description, setDescription] = useState(initialPost?.description ?? "");
  const [category, setCategory] = useState(initialPost?.category ?? "");
  const [tagsInput, setTagsInput] = useState(initialPost?.tags.join(", ") ?? "");
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [published, setPublished] = useState(initialPost?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snippetLang, setSnippetLang] = useState("javascript");
  const [showPreview, setShowPreview] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  function insertCodeSnippet() {
    const textarea = contentRef.current;
    const placeholder = "// your code here";
    const snippet = "```" + snippetLang + "\n" + placeholder + "\n```";

    if (!textarea) {
      setContent((prev) => `${prev}${prev && !prev.endsWith("\n") ? "\n\n" : ""}${snippet}\n`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.slice(0, start);
    const after = content.slice(end);

    const needsLeadingNewline = before.length > 0 && !before.endsWith("\n\n") && !before.endsWith("\n");
    const prefix = before + (needsLeadingNewline ? "\n\n" : before.length > 0 && !before.endsWith("\n\n") ? "\n" : "");
    const needsTrailingNewline = after.length > 0 && !after.startsWith("\n");
    const suffix = (needsTrailingNewline ? "\n\n" : "") + after;

    const nextContent = prefix + snippet + suffix;
    setContent(nextContent);

    const selectionStart = prefix.length + snippet.indexOf(placeholder);
    const selectionEnd = selectionStart + placeholder.length;

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart, selectionEnd);
    });
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const input: BlogPostInput = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      category: category.trim(),
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      coverImage: coverImage.trim(),
      content,
      published,
    };

    const token = await getIdToken();
    if (!token) {
      setError("Not signed in.");
      setSaving(false);
      return;
    }

    const url = isEditing ? `/api/posts/${initialPost!.id}` : "/api/posts";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Failed to save post.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field label="Title">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-violet"
        />
      </Field>

      <Field label="Slug">
        <input
          type="text"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          required
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          className="w-full border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-violet"
        />
      </Field>

      <Field label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={2}
          className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-violet"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Category">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-violet"
          />
        </Field>

        <Field label="Tags (comma-separated)">
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-violet"
          />
        </Field>
      </div>

      <Field label="Cover image (optional)">
        <div className="space-y-3">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={uploadingImage || saving}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setUploadingImage(true);
              setError(null);
              const token = await getIdToken();
              if (!token) {
                setError("Not signed in.");
                setUploadingImage(false);
                return;
              }

              const formData = new FormData();
              formData.append("file", file);
              const res = await fetch("/api/uploads/image", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
              });

              const body = await res.json().catch(() => ({}));
              setUploadingImage(false);
              if (!res.ok) {
                setError(body.error ?? "Failed to upload image.");
                return;
              }
              setCoverImage(body.url);
            }}
            className="block w-full border border-border bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:border-0 file:bg-violet-dim file:px-3 file:py-1 file:font-mono file:text-xs file:text-foreground"
          />
          <p className="font-mono text-xs text-muted">
            {uploadingImage ? "UPLOADING…" : coverImage ? "IMAGE READY" : "JPG, PNG, WEBP OR GIF · MAX 5MB"}
          </p>
          {coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverImage} alt="Cover preview" className="aspect-[16/7] w-full object-cover" />
          )}
        </div>
      </Field>

      <Field label="Content">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={snippetLang}
              onChange={(e) => setSnippetLang(e.target.value)}
              className="border border-border bg-background px-2 py-1.5 font-mono text-xs text-foreground outline-none focus:border-violet"
            >
              {SNIPPET_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={insertCodeSnippet}
              className="rounded border border-violet-dim px-3 py-1.5 font-mono text-xs tracking-widest text-violet-bright transition-colors hover:border-violet"
            >
              {"</>"} INSERT CODE SNIPPET
            </button>
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="ml-auto rounded border border-border px-3 py-1.5 font-mono text-xs tracking-widest text-muted transition-colors hover:border-violet hover:text-violet-bright"
            >
              {showPreview ? "EDIT" : "PREVIEW"}
            </button>
          </div>

          {showPreview ? (
            <div className="min-h-[24rem] w-full border border-border bg-background px-4 py-3">
              {content.trim() ? (
                <MarkdownContent content={content} className="prose-blog text-sm leading-relaxed text-foreground/80" />
              ) : (
                <p className="font-mono text-xs text-muted">Nothing to preview yet.</p>
              )}
            </div>
          ) : (
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={16}
              placeholder={"Write in Markdown. Use the button above to insert a code block, e.g.\n\n```javascript\nconsole.log('hello');\n```"}
              className="w-full border border-border bg-background px-3 py-2 font-mono text-sm leading-relaxed text-foreground outline-none focus:border-violet"
            />
          )}
          <p className="font-mono text-[11px] tracking-widest text-muted">
            SUPPORTS MARKDOWN · FENCED CODE BLOCKS ARE SYNTAX-HIGHLIGHTED
          </p>
        </div>
      </Field>

      <label className="flex items-center gap-2 font-mono text-xs tracking-widest text-foreground/85">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 accent-violet"
        />
        PUBLISHED
      </label>

      {error && <p className="font-mono text-xs text-red-400">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving || uploadingImage}
          className="rounded border border-violet-dim px-5 py-2 font-mono text-xs tracking-widest text-violet-bright transition-colors hover:border-violet disabled:opacity-50"
        >
          {saving ? "SAVING…" : isEditing ? "SAVE CHANGES" : "CREATE POST"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs tracking-widest text-muted">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}
