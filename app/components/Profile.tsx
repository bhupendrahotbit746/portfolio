import { skillsCarousel, whatIDo } from "@/lib/data";

function renderHighlighted(text: string, highlights: string[]) {
  if (highlights.length === 0) return text;
  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    highlights.includes(part) ? (
      <span key={i} className="text-violet-bright">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function Profile() {
  return (
    <section id="profile" className="border-b border-border">
      <div className="mx-auto min-h-[calc(100vh-6rem)] max-w-6xl px-6 py-12 sm:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
          <div className="pt-6 lg:pt-16">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-violet-bright">
              01 / PROFILE
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-foreground">
              WHAT
              <span className="block">I DO</span>
            </h2>
          </div>

          <div className="lg:pt-20">
            <div className="max-w-[38rem] space-y-8 text-[clamp(1.1rem,1.4vw,1.5rem)] font-normal leading-[1.55] tracking-normal text-foreground/85">
              {whatIDo.paragraphs.map((p, i) => (
                <p key={i}>{renderHighlighted(p.text, p.highlights)}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-border py-4">
        <div className="flex w-max animate-[scroll_28s_linear_infinite] gap-10 whitespace-nowrap font-mono text-sm text-muted">
          {[...skillsCarousel, ...skillsCarousel].map((skill, i) => (
            <span key={`${skill}-${i}`} className="flex items-center gap-10">
              <span className="hover:text-violet-bright">{skill}</span>
              <span className="text-violet-dim">&#9670;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
