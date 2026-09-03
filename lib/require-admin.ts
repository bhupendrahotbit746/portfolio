import "server-only";
import { getAdminAuth } from "./firebase-admin";

export class AdminAuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function requireAdmin(request: Request): Promise<void> {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    throw new AdminAuthError("Missing authorization token.", 401);
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new AdminAuthError("Admin email is not configured.", 500);
  }

  let decoded;
  try {
    decoded = await getAdminAuth().verifyIdToken(token);
  } catch {
    throw new AdminAuthError("Invalid or expired token.", 401);
  }

  if (decoded.email?.toLowerCase() !== adminEmail.toLowerCase()) {
    throw new AdminAuthError("This account is not authorized.", 403);
  }
}
