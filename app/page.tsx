import FloatingDock from "@/components/FloatingDock";
import CursorFollower from "@/components/CursorFollower";
import HeroIntro from "@/components/sections/HeroIntro";
import Work from "@/components/sections/Work";
import SkillsStrip from "@/components/sections/SkillsStrip";
import GitHubSection from "@/components/sections/GitHubSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto">
      <CursorFollower />
      <HeroIntro />
      <Work />
      <SkillsStrip />
      <GitHubSection />
      <ContactSection />
      <FloatingDock />
    </main>
  );
}
