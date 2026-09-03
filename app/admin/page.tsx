import Link from "next/link";
import AdminGate from "./AdminGate";
import AdminPostList from "./AdminPostList";

export default function AdminDashboardPage() {
  return (
    <AdminGate>
      <div className="min-h-screen bg-background px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest text-violet">
                &#9670; ADMIN
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                Posts
              </h1>
            </div>
            <Link
              href="/admin/posts/new"
              className="rounded border border-violet-dim px-4 py-2 font-mono text-xs tracking-widest text-violet-bright transition-colors hover:border-violet"
            >
              + NEW POST
            </Link>
          </div>

          <div className="mt-10">
            <AdminPostList />
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
