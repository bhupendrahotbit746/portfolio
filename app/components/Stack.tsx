"use client";

import { techStack, techStackItemCount, type TechStackItem } from "@/lib/data";
import SystemCard from "./SystemCard";
import { useActiveTech } from "./ActiveTechContext";

export default function Stack() {
  const { activeId, setActiveId, selectActiveId } = useActiveTech();

  const flatItems = techStack.flatMap((group) => group.items);
  const activeItem =
    flatItems.find((item) => item.id === activeId) ?? flatItems[0];
  const activeIndex = flatItems.findIndex((item) => item.id === activeItem.id);

  return (
    <section id="stack" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
        <p className="mb-3 font-mono text-sm tracking-widest text-violet">
          04 / STACK
        </p>
        <h2 className="mb-12 text-4xl font-bold tracking-tight sm:text-5xl">
          TOOLS I THINK IN
        </h2>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
          <div>
            {techStack.map((group, gi) => (
              <div key={group.category} className={gi > 0 ? "mt-10" : ""}>
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/90">
                    {group.category}
                  </h3>
                  <span className="font-mono text-xs tracking-widest text-violet-bright/80">
                    {group.code}
                  </span>
                </div>

                <ul>
                  {group.items.map((item, ii) => {
                    const active = item.id === activeItem.id;
                    return (
                      <TechRow
                        key={item.id}
                        item={item}
                        index={ii}
                        active={active}
                        onHover={() => setActiveId(item.id)}
                        onSelect={() => selectActiveId(item.id)}
                      />
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24">
            <SystemCard
              item={activeItem}
              index={activeIndex}
              total={techStackItemCount}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TechRow({
  item,
  index,
  active,
  onHover,
  onSelect,
}: {
  item: TechStackItem;
  index: number;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <li id={`tech-row-${item.id}`} className="border-b border-border">
      <button
        type="button"
        onMouseEnter={onHover}
        onFocus={onHover}
        onClick={onSelect}
        className={`flex w-full items-center gap-4 py-3 text-left text-base transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet ${
          active ? "bg-surface text-violet-bright" : "text-foreground/85 hover:text-violet-bright"
        }`}
      >
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        {item.title}
        {active && <span className="ml-auto text-violet-bright">&#9668;</span>}
      </button>
    </li>
  );
}
