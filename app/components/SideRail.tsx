"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function SideRail() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.round((doc.scrollTop / max) * 100) : 0;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-4 top-0 z-40 hidden h-screen flex-col items-center justify-between py-24 font-mono text-[10px] tracking-widest text-violet-dim sm:flex">
      <span
        className="whitespace-nowrap"
        style={{ writingMode: "vertical-rl" }}
      >
        {profile.coordinatesLat}
      </span>
      <span
        className="whitespace-nowrap"
        style={{ writingMode: "vertical-rl" }}
      >
        {profile.coordinatesLng} &middot; {profile.brandTag}
      </span>
      <span
        className="whitespace-nowrap text-violet-bright"
        style={{ writingMode: "vertical-rl" }}
      >
        SCROLL {String(scrollPct).padStart(2, "0")}%
      </span>
    </div>
  );
}
