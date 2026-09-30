import PlatformHero from "@/components/ui/SimulatorHero";
import IntroLearning from "@/components/features/learning-environment/IntroLearning";
import WhoThisEnvironment from "@/components/features/learning-environment/WhoThisEnvironment";
import VirtualSimulator from "@/components/features/learning-environment/VirtualSimulator";
import EnterpriseLab from "@/components/features/learning-environment/EnterpriseLab";
import WhyThisMatters from "@/components/features/home/WhyThisMatters";

const Platform = () => {
  return (
    <>
      
      <div className="relative z-10">
        <PlatformHero />
        <IntroLearning />
        <VirtualSimulator />
        <EnterpriseLab />
        <WhoThisEnvironment />
        <WhyThisMatters />
      </div>
    </>
  );
};

export default Platform;
