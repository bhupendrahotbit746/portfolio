import Nav from "./components/Nav";
import SideRail from "./components/SideRail";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Experience from "./components/Experience";
import Stack from "./components/Stack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SideRail />
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Profile />
        <Experience />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
