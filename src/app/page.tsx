import { WaveDivider } from "@/components/background/wave-divider";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Volunteering } from "@/components/sections/volunteering";

export default function Home() {
  return (
    <>
      <Hero />
      <WaveDivider />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Volunteering />
      <WaveDivider />
      <Contact />
    </>
  );
}
