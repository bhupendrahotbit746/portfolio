import { NextResponse } from "next/server";
import { AdminAuthError } from "./require-admin";

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AdminAuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
}
