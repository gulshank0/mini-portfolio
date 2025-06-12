import Navbar from "@/components/ui/Navbar";
import { HeroGeometric } from "../components/ui/shape-landing-hero";
import Skills from "@/components/ui/pages/Skills";
import Projects from "@/components/ui/pages/Projects";
import Contact from "@/components/ui/pages/Contact";

export default function Home() {
  
  
  
  return ( 
<div>   
  <Navbar/>
<section id="home">
    <HeroGeometric />
</section>
  <section id="skills">
    <Skills />
  </section>
  <section id="projects">
    <Projects />
  </section>
  <section id="contact">
    <Contact />
  </section>
     </div>
  );
}
