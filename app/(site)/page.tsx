import Hero from "../components/Hero";
import Profile from "../components/Profile";
import Experience from "../components/Experience";
import Stack from "../components/Stack";
import Projects from "../components/Projects";
import Writing from "../components/Writing";
import Contact from "../components/Contact";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <Profile />
      <Writing />
      <Experience />
      <Stack />
      <Projects />
      <Contact />
    </>
  );
}
