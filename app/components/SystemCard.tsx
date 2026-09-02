"use client";

import { type StackPosition, type TechStackItem } from "@/lib/data";
import { useTypewriter } from "./useTypewriter";

const STACK_POSITIONS: StackPosition[] = ["CLIENT", "SERVER", "DATA", "CLOUD"];

type SystemCardProps = {
  item: TechStackItem;
  index: number;
  total: number;
};

export default function SystemCard({ item, index, total }: SystemCardProps) {
  const startIdx = STACK_POSITIONS.indexOf(item.position.start);
  const endIdx = STACK_POSITIONS.indexOf(item.position.end);
  const rangeStart = Math.min(startIdx, endIdx);
  const rangeEnd = Math.max(startIdx, endIdx);

  const { output: titleOut, done: titleDone } = useTypewriter(item.title);
  const { output: descOut } = useTypewriter(titleDone ? item.description : "");

  return (
    <div className="relative flex flex-col border border-border bg-[#050505] p-8 font-mono text-foreground sm:p-10">
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-violet-bright/50" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-violet-bright/50" />

      <div className="flex items-baseline justify-between">
        <span className="text-xs tracking-[0.25em] text-muted">
          {item.eyebrow}
        </span>
        <span className="text-xs tracking-[0.25em] text-violet-bright/80">
          S/{String(index + 1).padStart(2, "0")}&middot;
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 h-[2.4em] text-4xl font-bold leading-[1.2em] tracking-tight sm:text-5xl">
        {titleOut}
        {!titleDone && <Cursor />}
      </h3>

      <p className="mt-6 h-[6em] max-w-lg text-xl leading-[1.5em] text-foreground/80">
        {descOut}
        {titleDone && <Cursor />}
      </p>

      <div className="mt-auto pt-10">
        <div className="border border-border p-6">
          <p className="mb-6 text-xs tracking-[0.25em] text-muted">
            POSITION IN THE STACK
          </p>

          <div className="relative h-px bg-border">
            <div
              className="absolute inset-y-0 bg-violet transition-all"
              style={{
                left: `${(rangeStart / (STACK_POSITIONS.length - 1)) * 100}%`,
                right: `${100 - (rangeEnd / (STACK_POSITIONS.length - 1)) * 100}%`,
              }}
            />
            {STACK_POSITIONS.map((pos, i) => (
              <span
                key={pos}
                className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-colors ${
                  i >= rangeStart && i <= rangeEnd ? "bg-violet-bright" : "bg-muted"
                }`}
                style={{ left: `${(i / (STACK_POSITIONS.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-between text-xs tracking-widest">
            {STACK_POSITIONS.map((pos, i) => (
              <span
                key={pos}
                className={
                  i >= rangeStart && i <= rangeEnd ? "text-violet-bright" : "text-muted"
                }
              >
                {pos}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-xs tracking-widest text-muted">
            SEL {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-[3px]">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-[3px] ${
                  i === index ? "bg-violet-bright" : "bg-border"
                }`}
              />
            ))}
          </div>

          <span className="flex items-center gap-1.5 text-xs tracking-widest text-violet-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-violet animate-blink" />
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}

function Cursor() {
  return (
    <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-violet-bright animate-blink" />
  );
}
