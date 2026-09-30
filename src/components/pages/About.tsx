import AboutHero from "@/components/ui/AboutHero";
import {
  AboutMerged,
  AboutIndiaSection,
  AboutGlobalFramework,
  AboutHowDifferent,
  AboutTrainsWhoClosing,
} from "@/components/features/about";


const About = () => {
  return (
    <>
     
      <div className="relative z-10">
        <AboutHero />
        <AboutMerged />
        <AboutIndiaSection />
        <AboutGlobalFramework />
        <AboutHowDifferent />
        <AboutTrainsWhoClosing />
      </div>
    </>
  );
};

export default About;
