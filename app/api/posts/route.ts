import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { getAllPostsForAdmin, createPost, slugExists } from "@/lib/blog";
import { validatePostInput } from "@/lib/validate-post";
import { handleApiError } from "@/lib/api-errors";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const posts = await getAllPostsForAdmin();
    return NextResponse.json({ posts });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    const body = await request.json();
    const input = validatePostInput(body);

    if (await slugExists(input.slug)) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }

    const id = await createPost(input);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
