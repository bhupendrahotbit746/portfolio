import type { ReactNode } from "react";
import Nav from "../components/Nav";
import SideRail from "../components/SideRail";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <SideRail />
      <Nav />
      <main className="flex flex-1 flex-col">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
