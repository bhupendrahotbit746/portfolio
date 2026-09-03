"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAdminAuth } from "./useAdminAuth";

export default function AdminGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-mono text-xs tracking-widest text-muted">
          Checking session…
        </p>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
