import { SiteNavbar } from "../components/layout/SiteNavbar";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Hero } from "../components/home/Hero";
import { AboutSection } from "../components/home/AboutSection";
import { PillarsSection } from "../components/home/PillarsSection";
import { NovedadesSection } from "../components/home/NovedadesSection";
import { TeamSection } from "../components/home/TeamSection";
import { SocialSection } from "../components/home/SocialSection";
import { FinalCtaSection } from "../components/home/FinalCtaSection";

export function HomePage() {
  return (
    <div>
      <SiteNavbar />
      <Hero />
      <AboutSection />
      <PillarsSection />
      <NovedadesSection />
      <TeamSection />
      <SocialSection />
      <FinalCtaSection />
      <SiteFooter />
    </div>
  );
}
