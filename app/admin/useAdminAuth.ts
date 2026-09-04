"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase-client";

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase();

export function isAdminUser(user: User | null): boolean {
  if (!user || !adminEmail) return false;
  return user.email?.toLowerCase() === adminEmail;
}

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
      if (nextUser && !isAdminUser(nextUser)) {
        signOut(getFirebaseAuth());
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(nextUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
}

export async function getIdToken(): Promise<string | null> {
  const user = getFirebaseAuth().currentUser;
  if (!user) return null;
  return user.getIdToken();
}
