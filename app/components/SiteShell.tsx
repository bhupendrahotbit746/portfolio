import type { ReactNode } from "react";
import Nav from "./Nav";
import SideRail from "./SideRail";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <SideRail />
      <Nav />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
