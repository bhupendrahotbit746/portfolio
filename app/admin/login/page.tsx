"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signOut } from "firebase/auth";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase-client";
import { useAdminAuth } from "../useAdminAuth";

export default function AdminLoginPage() {
  const { user, loading } = useAdminAuth();
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const router = useRouter();

  async function handleSignIn() {
    setError(null);
    setSigningIn(true);
    try {
      await signInWithPopup(getFirebaseAuth(), googleProvider);
      router.push("/admin");
    } catch {
      setError("Sign-in failed. Try again.");
    } finally {
      setSigningIn(false);
    }
  }

  async function handleSignOut() {
    await signOut(getFirebaseAuth());
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm border border-border bg-surface p-8">
        <p className="font-mono text-xs tracking-widest text-violet">
          &#9670; ADMIN
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Only the configured admin account can manage posts.
        </p>

        {loading ? (
          <p className="mt-8 font-mono text-xs text-muted">Checking session…</p>
        ) : user ? (
          <div className="mt-8 space-y-3">
            <p className="text-sm text-foreground/80">
              Signed in as <span className="text-violet-bright">{user.email}</span>
            </p>
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="w-full rounded border border-violet-dim px-4 py-2 font-mono text-xs tracking-widest text-violet-bright transition-colors hover:border-violet"
            >
              GO TO DASHBOARD &#8599;
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full font-mono text-xs tracking-widest text-muted hover:text-violet-bright"
            >
              SIGN OUT
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <button
              type="button"
              onClick={handleSignIn}
              disabled={signingIn}
              className="w-full rounded border border-violet-dim px-4 py-2 font-mono text-xs tracking-widest text-violet-bright transition-colors hover:border-violet disabled:opacity-50"
            >
              {signingIn ? "SIGNING IN…" : "SIGN IN WITH GOOGLE"}
            </button>
            {error && (
              <p className="mt-3 font-mono text-xs text-red-400">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
