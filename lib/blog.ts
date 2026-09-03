import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "./firebase-admin";
import type { BlogPost, BlogPostInput } from "./blog-types";

const COLLECTION = "posts";

function readingTimeFromContent(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function toBlogPost(id: string, data: FirebaseFirestore.DocumentData): BlogPost {
  return {
    id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: data.content,
    category: data.category,
    tags: data.tags ?? [],
    published: data.published ?? false,
    createdAt: data.createdAt?.toDate?.().toISOString() ?? "",
    updatedAt: data.updatedAt?.toDate?.().toISOString() ?? "",
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection(COLLECTION)
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => toBlogPost(doc.id, doc.data()));
}

/**
 * Used by the homepage's optional Writing section. Fails soft — a
 * misconfigured or unreachable Firestore shouldn't take down the whole
 * homepage, it should just mean the section renders nothing.
 */
export async function getLatestPublishedPosts(count: number): Promise<BlogPost[]> {
  try {
    const db = getAdminDb();
    const snapshot = await db
      .collection(COLLECTION)
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(count)
      .get();

    return snapshot.docs.map((doc) => toBlogPost(doc.id, doc.data()));
  } catch (error) {
    console.error("getLatestPublishedPosts failed:", error);
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = getAdminDb();
  const snapshot = await db
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .where("published", "==", true)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return toBlogPost(doc.id, doc.data());
}

export async function getAllPostsForAdmin(): Promise<BlogPost[]> {
  const db = getAdminDb();
  const snapshot = await db.collection(COLLECTION).orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => toBlogPost(doc.id, doc.data()));
}

export async function getPostByIdForAdmin(id: string): Promise<BlogPost | null> {
  const db = getAdminDb();
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return toBlogPost(doc.id, doc.data()!);
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const db = getAdminDb();
  const snapshot = await db.collection(COLLECTION).where("slug", "==", slug).get();
  return snapshot.docs.some((doc) => doc.id !== excludeId);
}

export async function createPost(input: BlogPostInput): Promise<string> {
  const db = getAdminDb();
  const ref = await db.collection(COLLECTION).add({
    ...input,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function updatePost(id: string, input: BlogPostInput): Promise<void> {
  const db = getAdminDb();
  await db
    .collection(COLLECTION)
    .doc(id)
    .update({
      ...input,
      updatedAt: FieldValue.serverTimestamp(),
    });
}

export async function deletePost(id: string): Promise<void> {
  const db = getAdminDb();
  await db.collection(COLLECTION).doc(id).delete();
}

export { readingTimeFromContent };
