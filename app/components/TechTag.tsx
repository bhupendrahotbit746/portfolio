"use client";

import { resolveTechId } from "@/lib/data";
import { useActiveTech } from "./ActiveTechContext";

export default function TechTag({ tag }: { tag: string }) {
  const { selectActiveId } = useActiveTech();
  const techId = resolveTechId(tag);

  if (!techId) {
    return (
      <span className="rounded-full border border-violet-dim px-3 py-1 font-mono text-xs tracking-widest text-violet-bright">
        {tag}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        selectActiveId(techId);
        document
          .getElementById(`tech-row-${techId}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className="rounded-full border border-violet-dim px-3 py-1 font-mono text-xs tracking-widest text-violet-bright transition-colors duration-200 ease-out hover:border-violet-bright hover:bg-violet-dim/20"
    >
      {tag}
    </button>
  );
}
