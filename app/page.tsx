import Navbar from "@/components/ui/Navbar";
import { HeroGeometric } from "../components/ui/shape-landing-hero";
import Skills from "@/components/ui/pages/Skills";
import Projects from "@/components/ui/pages/Projects";
import Contact from "@/components/ui/pages/Contact";

export default function Home() {
  return ( 
<div>   
  <Navbar/>
    <HeroGeometric />
    <Skills />
    <Projects />
    <Contact />
     </div>
  );
}
