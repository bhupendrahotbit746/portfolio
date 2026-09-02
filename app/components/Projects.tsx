import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
        <p className="mb-4 font-mono text-xs tracking-widest text-violet">
          &#9670; SELECTED WORK
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          A few things I&apos;ve built
        </h2>

        <div className="mt-12">
          {projects.map((project, i) => (
            <div
              key={project.name}
              tabIndex={0}
              className="group relative border-t border-border px-4 py-8 outline-none transition-colors duration-200 ease-out last:border-b hover:bg-surface/60 focus-within:bg-surface/60 focus:bg-surface/60"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100" />
              <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-b border-r border-violet-bright opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100" />

              <span className="font-mono text-xs tracking-widest text-muted">
                P&middot;{String(i + 1).padStart(2, "0")} &middot; {project.tags[0].toUpperCase()}
              </span>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground transition-colors duration-200 ease-out group-hover:text-violet-bright sm:text-3xl">
                {project.name}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75">
                {project.description}
              </p>

              <p className="mt-4 font-mono text-xs tracking-widest text-muted">
                {project.tags.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
