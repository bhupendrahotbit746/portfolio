import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-28">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs tracking-widest text-violet">
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
            className="text-glow mt-2 block break-all text-3xl font-bold text-violet-bright transition-colors hover:text-violet sm:text-5xl"
          >
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
