"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import TechTag from "./TechTag";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
        <p className="mb-4 font-mono text-sm tracking-widest text-violet">
          &#9670; SELECTED WORK
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          A FEW THINGS I&apos;VE BUILT
        </h2>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/75">
          Each build was shaped around a real product problem: latency, trust, workflow complexity,
          or user experience clarity. The work below focuses on the decisions behind the delivery,
          not just the stack used to ship it.
        </p>

        <div className="mt-12">
          {projects.map((project, i) => {
            const isExpanded = expandedId === project.name;
            return (
              <div
                key={project.name}
                className="group relative rounded-xl border border-border bg-surface/30 px-5 py-7 transition-all duration-300 ease-out last:border-b hover:border-violet-dim hover:bg-surface/60"
              >
                <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-b border-r border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />

                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : project.name)}
                  aria-expanded={isExpanded}
                  className="block w-full text-left outline-none focus-visible:ring-1 focus-visible:ring-violet"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-xs tracking-widest text-muted">
                      P&middot;{String(i + 1).padStart(2, "0")} &middot; {project.tags[0].toUpperCase()}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {isExpanded ? <>&#8593;</> : <>&#8595;</>}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground transition-colors duration-200 ease-out group-hover:text-violet-bright sm:text-3xl">
                    {project.name}
                  </h3>

                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/75">
                    {!isExpanded && project.highlights.length > 1
                      ? project.highlights[0].replace(/[.!?]+$/, "")
                      : project.highlights[0]}
                    {!isExpanded && project.highlights.length > 1 && (
                      <span className="text-muted"> &hellip;</span>
                    )}
                  </p>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-4 max-w-3xl space-y-2 pt-1">
                        {project.highlights.slice(1).map((point, hi) => (
                          <li
                            key={hi}
                            className="flex gap-3 text-sm leading-relaxed text-foreground/75"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-dim" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <TechTag key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
