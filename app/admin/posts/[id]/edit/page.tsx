"use client";

import { use, useEffect, useState } from "react";
import AdminGate from "../../../AdminGate";
import PostForm from "../../../PostForm";
import { getIdToken } from "../../../useAdminAuth";
import type { BlogPost } from "@/lib/blog-types";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const token = await getIdToken();
      if (!token) {
        setError("Not signed in.");
        return;
      }
      const res = await fetch(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setError("Post not found.");
        return;
      }
      const body = await res.json();
      setPost(body.post);
    }
    load();
  }, [id]);

  return (
    <AdminGate>
      <div className="min-h-screen bg-background px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-sm tracking-widest text-violet">
            &#9670; ADMIN / EDIT POST
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Edit post
          </h1>

          <div className="mt-10">
            {error && <p className="font-mono text-xs text-red-400">{error}</p>}
            {post === undefined && !error && (
              <p className="font-mono text-xs text-muted">Loading…</p>
            )}
            {post && <PostForm initialPost={post} />}
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
