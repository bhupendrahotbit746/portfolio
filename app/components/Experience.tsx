"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/data";
import TechTag from "./TechTag";

const METRIC_PATTERN = /(\d+(?:\.\d+)?%|\d+\+)/g;
const METRIC_MATCH = /^\d+(?:\.\d+)?%$|^\d+\+$/;

function renderWithMetrics(text: string) {
  const parts = text.split(METRIC_PATTERN);
  return parts.map((part, i) =>
    METRIC_MATCH.test(part) ? (
      <span key={i} className="font-semibold text-violet-bright">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function SectionBlock({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-6"}>
      <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-violet-bright">
        {label}
      </p>
      {children}
    </div>
  );
}

const ALL_PROBLEMS = "All Problems";

export default function Experience() {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState(ALL_PROBLEMS);
  const filterGroupRef = useRef<HTMLDivElement>(null);

  const problemTypes = [
    ALL_PROBLEMS,
    ...Array.from(new Set(experience.flatMap((item) => item.problems))),
  ];

  const matchingCompanies = experience
    .filter((item) => activeFilter === ALL_PROBLEMS || item.problems.includes(activeFilter))
    .map((item) => item.company);

  useEffect(() => {
    if (activeFilter === ALL_PROBLEMS) return;

    function handleOutsideClick(e: MouseEvent) {
      if (filterGroupRef.current && !filterGroupRef.current.contains(e.target as Node)) {
        setActiveFilter(ALL_PROBLEMS);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeFilter]);

  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
        <p className="mb-6 font-mono text-sm tracking-widest text-violet">
          03 / EXPERIENCE
        </p>

        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          EXPERIENCE
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75">
          Every role is presented as context &rarr; challenge &rarr; engineering approach &rarr;
          technical decisions &rarr; impact, not a list of technology badges. Filter by the kind
          of problem being solved.
        </p>

        <div ref={filterGroupRef} className="mt-6 flex flex-wrap gap-2">
          {problemTypes.map((problem) => {
            const isActive = activeFilter === problem;
            return (
              <button
                key={problem}
                type="button"
                onClick={() => {
                  setActiveFilter(problem);
                  setExpandedCompany(null);
                }}
                className={`rounded-full border px-4 py-2 font-mono text-xs tracking-widest transition-colors duration-200 ease-out ${
                  isActive
                    ? "border-violet-bright bg-violet-bright/15 text-violet-bright"
                    : "border-border text-foreground/70 hover:border-violet-dim hover:text-foreground"
                }`}
              >
                {problem}
              </button>
            );
          })}
        </div>

        <p className="mt-4 font-mono text-xs tracking-widest text-muted">
          {activeFilter === ALL_PROBLEMS
            ? `Showing all ${experience.length} roles.`
            : `${activeFilter} appeared in: ${matchingCompanies.join(", ")}.`}
        </p>

        <div className="mt-8 space-y-3">
          {experience.map((item, i) => {
            const isExpanded = expandedCompany === item.company;
            const isMatch = matchingCompanies.includes(item.company);

            const isFiltering = activeFilter !== ALL_PROBLEMS;

            return (
              <div
                key={item.company}
                className={`rounded-xl border bg-surface/40 transition-[scale,opacity,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMatch
                    ? `opacity-100 hover:border-violet-dim ${
                        isFiltering
                          ? "scale-[1.02] border-violet-bright shadow-[0_0_24px_rgba(0,217,255,0.15)]"
                          : "scale-100 border-border"
                      }`
                    : "scale-100 border-border/50 opacity-40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedCompany(isExpanded ? null : item.company)}
                  aria-expanded={isExpanded}
                  className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left outline-none focus-visible:ring-1 focus-visible:ring-violet sm:flex-nowrap"
                >
                  <div className="flex min-w-0 items-baseline gap-3">
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-base font-bold text-foreground">
                      {item.company}
                    </span>
                    <span className="hidden truncate font-mono text-xs tracking-widest text-muted sm:inline">
                      {item.role} &middot; {item.location} &middot; {item.period}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    {item.current && (
                      <span className="h-1.5 w-1.5 rounded-full bg-violet animate-blink" />
                    )}
                    <span className="rounded-full border border-violet-dim bg-violet-dim/20 px-3 py-1 font-mono text-xs tracking-widest text-violet-bright">
                      {item.tag}
                    </span>
                    <span
                      className={`font-mono text-xs text-muted transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      &#9660;
                    </span>
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border px-5 py-5">
                      <p className="mb-4 font-mono text-xs tracking-widest text-muted sm:hidden">
                        {item.role} &middot; {item.location} &middot; {item.period}
                      </p>

                      <SectionBlock label="Context">
                        <p className="text-base leading-relaxed text-foreground/75">{item.context}</p>
                      </SectionBlock>

                      <SectionBlock label="Engineering Challenge">
                        <p className="text-base leading-relaxed text-foreground/75">
                          {renderWithMetrics(item.challenge)}
                        </p>
                      </SectionBlock>

                      <SectionBlock label="Engineering Approach">
                        <p className="text-base leading-relaxed text-foreground/75">{item.approach}</p>
                      </SectionBlock>

                      <SectionBlock label="Technical Decisions">
                        <ul className="space-y-2">
                          {item.decisions.map((point, hi) => (
                            <li
                              key={hi}
                              className="flex gap-3 text-base leading-relaxed text-foreground/75"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-dim" />
                              <span>{renderWithMetrics(point)}</span>
                            </li>
                          ))}
                        </ul>
                      </SectionBlock>

                      <SectionBlock label="System Flow">
                        <div className="flex flex-wrap items-center gap-2">
                          {item.flow.map((step, si) => (
                            <span key={step} className="flex items-center gap-2">
                              <span className="rounded border border-border px-3 py-1.5 font-mono text-xs text-foreground/85">
                                {step}
                              </span>
                              {si < item.flow.length - 1 && (
                                <span className="text-muted">&rarr;</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </SectionBlock>

                      <SectionBlock label="Impact" last>
                        <p className="text-base leading-relaxed text-foreground/75">
                          {renderWithMetrics(item.impact)}
                        </p>
                      </SectionBlock>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <TechTag key={tag} tag={tag} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
