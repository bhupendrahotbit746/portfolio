"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/data";
import Clock from "./Clock";

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-[0.2em] text-white transition-colors hover:text-violet-bright sm:text-xl"
        >
          {profile.nameFirst.toUpperCase()} {profile.nameLast.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-6 font-mono text-sm tracking-widest sm:flex">
          {navItems.map((item) => {
            const isRoute = !item.href.includes("#");
            const isActive = isRoute && pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors hover:text-violet-bright ${
                  isActive ? "text-violet-bright" : "text-white"
                }`}
              >
                {item.index} {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-violet-dim px-3 py-1.5 font-mono text-[11px] tracking-widest text-violet-bright sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-violet animate-blink" />
            OPEN TO WORK
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-violet-dim hover:text-violet-bright sm:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-1.25 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-1.25 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-border px-6 py-2 font-mono text-[11px] tracking-widest text-muted sm:px-10">
        <span className="truncate">
          {profile.coordinatesLat} — {profile.coordinatesLng} / {profile.city}
        </span>
        <span className="hidden items-center gap-2 sm:flex">
          {profile.focusTag} —{" "}
          <span className="text-violet-bright">
            <Clock showCity={false} />
          </span>
        </span>
      </div>

      <div
        id="mobile-nav"
        className={`grid overflow-hidden border-t border-border bg-background transition-[grid-template-rows] duration-300 ease-out sm:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-6 py-4 font-mono text-sm tracking-widest">
            {navItems.map((item) => {
              const isRoute = !item.href.includes("#");
              const isActive = isRoute && pathname.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 transition-colors hover:bg-surface hover:text-violet-bright ${
                    isActive ? "text-violet-bright" : "text-white"
                  }`}
                >
                  {item.index} {item.label}
                </Link>
              );
            })}
            <span className="mt-2 flex items-center gap-2 self-start rounded-full border border-violet-dim px-3 py-1.5 font-mono text-[11px] tracking-widest text-violet-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-violet animate-blink" />
              OPEN TO WORK
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
