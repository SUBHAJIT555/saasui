import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "@/lib/react-router";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { GgwButton } from "@/components/ui/ggw-button";
import { siteRoutes } from "@/config/routes";
import { assetSrc } from "@/lib/utils";
import heroScene from "@/assets/img/HeroImage/HomeHero.webp";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

const HomeHero = () => {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" ref={timelineRef} className="relative isolate overflow-hidden bg-canvas pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-120 w-[calc(100%-6px)] overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 50%)",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 50%)",
        }}
      >
        <img src={assetSrc(heroScene)} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <TimelineContent
          as="h1"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="max-w-[22ch] text-balance text-hero text-ink md:max-w-[28ch]"
        >
          Support for the work{" "}
          <span className="bg-brand-accent px-1.5 text-on-primary">behind the business</span>
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-[56ch] text-pretty text-copy text-body"
        >
          Planning, administration, documents, projects, billing, and customer communication. Scoped work, with a clear payment purpose.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <GgwButton type="button" variant="accent" className="h-11 px-5" onClick={() => navigate(siteRoutes.services)}>
            View services
            <ArrowRight className="h-4 w-4" />
          </GgwButton>
          <GgwButton type="button" variant="secondary" className="h-11 px-5" onClick={() => navigate(siteRoutes.contact)}>
            Contact
          </GgwButton>
        </TimelineContent>
      </div>
    </section>
  );
};

export default HomeHero;
