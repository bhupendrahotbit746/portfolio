import Hero from "../components/Hero";
import Profile from "../components/Profile";
import Experience from "../components/Experience";
import Stack from "../components/Stack";
import Projects from "../components/Projects";
import Writing from "../components/Writing";
import Contact from "../components/Contact";
import { ActiveTechProvider } from "../components/ActiveTechContext";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <ActiveTechProvider>
      <Hero />
      <Profile />
      <Writing />
      <Experience />
      <Stack />
      <Projects />
      <Contact />
    </ActiveTechProvider>
  );
}
