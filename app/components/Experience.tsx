import { education, experience, profile } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
        <p className="mb-6 font-mono text-xs tracking-widest text-violet">
          02 / EXPERIENCE
        </p>

        <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
          EXPERIENCE
        </h2>

        <div className="mt-12">
          {experience.map((item, i) => (
            <article
              key={item.company}
              tabIndex={0}
              className="group relative border-t border-border px-4 py-8 outline-none transition-colors duration-200 ease-out hover:bg-surface/60 focus-within:bg-surface/60 focus:bg-surface/60"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100" />
              <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-b border-r border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100" />

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-xs tracking-widest text-muted">
                  E&middot;{String(i + 1).padStart(2, "0")} &middot; {item.tag}
                </span>
                <span className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted">
                  {item.current && (
                    <span className="h-1.5 w-1.5 rounded-full bg-violet animate-blink" />
                  )}
                  {item.period}
                </span>
              </div>

              <h3
                className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${
                  item.current ? "text-glow text-violet-bright" : ""
                }`}
              >
                <span className="transition-colors duration-200 ease-out group-hover:text-violet-bright group-focus-within:text-violet-bright">
                  {item.company}
                </span>{" "}
                <span className="text-sm font-normal tracking-widest text-muted">
                  {item.role.toUpperCase()}
                </span>
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75">
                {item.description}
              </p>
            </article>
          ))}

          <div className="mt-6 flex items-center justify-between rounded border border-border px-5 py-4 font-mono text-xs tracking-widest text-muted">
            <span>
              E&middot;{String(experience.length + 1).padStart(2, "0")} &middot; FULL RECORD
            </span>
            <a
              href={profile.cvUrl}
              download
              className="text-violet-bright hover:text-violet"
            >
              Every role, in detail &mdash; Download CV &#8599;
            </a>
          </div>

          <div className="mt-6 space-y-2">
            {education.map((entry) => (
              <div
                key={entry.school}
                className="flex flex-wrap items-baseline gap-3 font-mono text-xs tracking-widest text-muted"
              >
                <span className="text-violet-bright">EDU</span>
                <span>{entry.school}</span>
                <span>&middot; {entry.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
