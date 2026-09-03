import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { getPostByIdForAdmin, updatePost, deletePost, slugExists } from "@/lib/blog";
import { validatePostInput } from "@/lib/validate-post";
import { handleApiError } from "@/lib/api-errors";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const post = await getPostByIdForAdmin(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const existing = await getPostByIdForAdmin(id);
    if (!existing) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const body = await request.json();
    const input = validatePostInput(body);

    if (await slugExists(input.slug, id)) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }

    await updatePost(id, input);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const existing = await getPostByIdForAdmin(id);
    if (!existing) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    await deletePost(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
