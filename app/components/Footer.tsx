import { profile } from "@/lib/data";
import Clock from "./Clock";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-6 font-mono text-[11px] tracking-widest text-muted sm:px-10">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          {profile.nameFirst.toUpperCase()} {profile.nameLast.toUpperCase()}{" "}
          <a href="#" className="ml-2 hover:text-violet-bright">
            / LEGAL &#8599;
          </a>
        </span>
        <Clock />
      </div>
    </footer>
  );
}
