"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, profile } from "@/lib/data";
import Clock from "./Clock";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-widest transition-colors hover:text-violet-bright"
        >
          {profile.nameFirst.toUpperCase()} {profile.nameLast.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-6 font-mono text-xs tracking-widest text-muted sm:flex">
          {navItems.map((item) => {
            const isRoute = !item.href.includes("#");
            const isActive = isRoute && pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors hover:text-violet-bright ${
                  isActive ? "text-violet-bright" : ""
                }`}
              >
                {item.index} {item.label}
              </Link>
            );
          })}
        </nav>

        <span className="flex items-center gap-2 rounded-full border border-violet-dim px-3 py-1.5 font-mono text-[11px] tracking-widest text-violet-bright">
          <span className="h-1.5 w-1.5 rounded-full bg-violet animate-blink" />
          OPEN TO WORK
        </span>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-border px-6 py-2 font-mono text-[11px] tracking-widest text-muted sm:px-10">
        <span>
          {profile.coordinatesLat} — {profile.coordinatesLng} / {profile.city}
        </span>
        <span className="hidden items-center gap-2 sm:flex">
          {profile.focusTag} —{" "}
          <span className="text-violet-bright">
            <Clock showCity={false} />
          </span>
        </span>
      </div>
    </header>
  );
}
