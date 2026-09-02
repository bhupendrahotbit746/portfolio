"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import InteractiveGrid from "./InteractiveGrid";
import { useScramble } from "./useScramble";

export default function Hero() {
  const [scrambleOn, setScrambleOn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setScrambleOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const first = useScramble(profile.nameFirst.toUpperCase(), scrambleOn, 1800);
  const last = useScramble(profile.nameLast.toUpperCase(), scrambleOn, 1800);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <InteractiveGrid />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 sm:px-10 sm:pt-28">
        <h1 className="relative text-[15vw] font-bold leading-[0.9] tracking-tight sm:text-[6.5rem]">
          <span className="pointer-events-none absolute -left-1 -top-3 h-4 w-4 border-l border-t border-violet-bright/70" />
          <span className="block">{first}</span>
          <span className="text-glow block text-violet-bright">{last}</span>
        </h1>

        <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-16 grid gap-10 border-t border-border pt-8 sm:grid-cols-3">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Location
            </h2>
            <p className="mt-2 text-sm text-foreground/90">{profile.location}</p>
          </div>
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Availability
            </h2>
            <p className="mt-2 text-sm text-foreground/90">{profile.availability}</p>
          </div>
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Signals
            </h2>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tracking-widest">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-bright hover:text-violet"
              >
                GitHub &#8599;
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-bright hover:text-violet"
              >
                LinkedIn &#8599;
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="text-violet-bright hover:text-violet"
              >
                Email &#8599;
              </a>
              <a
                href={profile.cvUrl}
                download
                className="text-violet-bright hover:text-violet"
              >
                CV &#8599;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
