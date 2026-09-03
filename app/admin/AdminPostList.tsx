"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getIdToken } from "./useAdminAuth";
import type { BlogPost } from "@/lib/blog-types";

async function fetchPosts(): Promise<{ posts?: BlogPost[]; error?: string }> {
  const token = await getIdToken();
  if (!token) {
    return { error: "Not signed in." };
  }
  const res = await fetch("/api/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { error: body.error ?? "Failed to load posts." };
  }
  const body = await res.json();
  return { posts: body.posts };
}

export default function AdminPostList() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPosts().then((result) => {
      if (cancelled) return;
      if (result.error) {
        setError(result.error);
      } else {
        setPosts(result.posts ?? []);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    const token = await getIdToken();
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeletingId(null);
    if (res.ok) {
      setPosts((prev) => prev?.filter((p) => p.id !== id) ?? null);
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Failed to delete post.");
    }
  }

  if (error) {
    return <p className="font-mono text-xs text-red-400">{error}</p>;
  }

  if (posts === null) {
    return <p className="font-mono text-xs text-muted">Loading posts…</p>;
  }

  if (posts.length === 0) {
    return <p className="font-mono text-xs text-muted">No posts yet.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-5 last:border-b"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  post.published ? "bg-violet" : "bg-muted"
                }`}
              />
              <h3 className="truncate text-lg font-semibold text-foreground">
                {post.title}
              </h3>
            </div>
            <p className="mt-1 font-mono text-xs tracking-widest text-muted">
              {post.slug} &middot; {post.category.toUpperCase()} &middot;{" "}
              {post.published ? "PUBLISHED" : "DRAFT"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 font-mono text-xs tracking-widest">
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className="text-violet-bright hover:text-violet"
            >
              EDIT
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(post.id)}
              disabled={deletingId === post.id}
              className="text-red-400 hover:text-red-300 disabled:opacity-50"
            >
              {deletingId === post.id ? "DELETING…" : "DELETE"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
