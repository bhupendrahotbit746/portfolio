"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

const HOVER_LOCK_MS = 1000;

type ActiveTechContextValue = {
  activeId: string | null;
  /** Hover/focus preview — ignored while a recent click still holds the lock. */
  setActiveId: (id: string) => void;
  /** Explicit selection (click) — always wins and briefly locks out hover. */
  selectActiveId: (id: string) => void;
};

const ActiveTechContext = createContext<ActiveTechContextValue | null>(null);

export function ActiveTechProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveIdState] = useState<string | null>(null);
  const lockUntilRef = useRef(0);

  function setActiveId(id: string) {
    if (Date.now() < lockUntilRef.current) return;
    setActiveIdState(id);
  }

  function selectActiveId(id: string) {
    lockUntilRef.current = Date.now() + HOVER_LOCK_MS;
    setActiveIdState(id);
  }

  return (
    <ActiveTechContext.Provider value={{ activeId, setActiveId, selectActiveId }}>
      {children}
    </ActiveTechContext.Provider>
  );
}

export function useActiveTech() {
  const ctx = useContext(ActiveTechContext);
  if (!ctx) throw new Error("useActiveTech must be used within ActiveTechProvider");
  return ctx;
}
