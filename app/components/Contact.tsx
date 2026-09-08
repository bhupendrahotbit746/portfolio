import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-sm tracking-widest text-violet">
            04 / CONTACT
          </p>
          <p className="font-mono text-xs tracking-widest text-muted">
            REPLIES WITHIN 24H — {profile.timezone} TIME
          </p>
        </div>

        <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          HAVE SOMETHING TO BUILD? SAY HELLO.
        </h2>

        <div className="mt-10 border-t border-border pt-6">
          <p className="font-mono text-xs tracking-widest text-muted">
            &#9656; MAILTO
          </p>
          <a
            href={`mailto:${profile.email}?subject=Let's build something`}
            className="text-glow mt-2 flex items-center gap-3 break-all text-xl text-violet-bright transition-colors hover:text-violet sm:text-2xl"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[0.85em] w-[0.85em] shrink-0"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m3 6 9 7 9-7" />
            </svg>
            {profile.email}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs tracking-widest">
            <a
              href={profile.cvUrl}
              download
              className="text-muted transition-colors hover:text-violet-bright"
            >
              DOWNLOAD CV &#8599;
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-violet-bright"
            >
              GITHUB &#8599;
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-violet-bright"
            >
              LINKEDIN &#8599;
            </a>
          </div>

          <p className="font-mono text-xs tracking-widest text-muted">
            NO AUTO-REPLIES. JUST ME
          </p>
        </div>
      </div>
    </section>
  );
}
