import HomeHero from "@/components/ui/HomeHero";
import HomeOverview from "@/components/features/home/HomeOverview";
import HomeCompany from "@/components/features/home/HomeCompany";
import HomeServices from "@/components/features/home/HomeServices";
import HomeWork from "@/components/features/home/HomeWork";
import Testimonials from "@/components/common/Testimonials";
import CallToAction from "@/components/common/CallToAction";

const Home = () => {
  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <HomeHero />
      <HomeOverview />
      <HomeCompany />
      <HomeServices />
      <HomeWork />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
