import { Preloader } from "@/components/scenes/Preloader";
import { Hero } from "@/components/scenes/Hero";
import { About } from "@/components/scenes/About";
import { Projects } from "@/components/scenes/Projects";
import { FilmographyWall } from "@/components/scenes/FilmographyWall";
import { Skills } from "@/components/scenes/Skills";
import { Achievements } from "@/components/scenes/Achievements";
import { Contact } from "@/components/scenes/Contact";

export default function Home() {
  return (
    <main className="w-full relative bg-void">
      <Preloader />
      
      <Hero />
      
      {/* 
        The prompt mentions "SCENE 02 — SCROLL TRANSITION ('The Cut')". 
        This transition logic can be embedded within Hero's ScrollTrigger end animation 
        or integrated at the boundary. For now, the natural Lenis scroll handles smooth transition. 
      */}
      
      <About />
      <Projects />
      <FilmographyWall />
      <Skills />
      <Achievements />
      <Contact />
      
    </main>
  );
}
