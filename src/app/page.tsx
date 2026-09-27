import { Background } from "@/components/background";
import { ScrollProgress } from "@/components/scroll-progress";
import { Dock } from "@/components/dock";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Videos } from "@/components/sections/videos";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Background />
      <main id="main" className="mx-auto w-full max-w-6xl space-y-24 px-4 sm:space-y-32 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Videos />
        <Contact />
      </main>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
      <Dock />
    </>
  );
}
