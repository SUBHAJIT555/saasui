import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import aboutUsaImage from "@/assets/img/Home/ABOUTCYBERLABSUSA.webp";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingFramedTwoCol,
  LandingBentoCell,
  LandingTagPill,
  landingRevealVariants,
  homeSectionSpacingClass,
} from "@/components/ui/landing-section";

const professionalTags = [
  "Served in elite Israeli cyber and intelligence units",
  "Built and commanded national and enterprise cyber defense operations",
  "Designed large-scale cyber training frameworks",
  "Led real incident response and threat investigation teams",
];

const AboutUsa = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell className={homeSectionSpacingClass}>
      <div ref={timelineRef}>
       

        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 text-pretty"
        >
          <ShinyText
            text="About CYBERLABS USA."
            className="text-2xl font-semibold  leading-tight sm:text-3xl md:text-4xl"
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <TimelineContent
          as="h3"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 text-lg font-bold text-blue-600 md:text-xl lg:text-2xl"
        >
          Israeli-Founded. Globally Respected.
        </TimelineContent>

        <LandingBento className="mt-8">
          <LandingFramedTwoCol>
            <LandingBentoCell className="md:px-0 md:pr-8">
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="group relative min-h-[280px] w-full overflow-hidden md:min-h-[360px]"
              >
                <img
                  src={assetSrc(aboutUsaImage)}
                  alt="About CYBERLABS USA"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="md:px-0 md:pl-8">
              <TimelineContent
                as="p"
                animationNum={4}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="text-sm leading-relaxed text-zinc-600 md:text-base lg:text-lg"
              >
                CYBERLABS USA is an Israeli-founded global cybersecurity training and simulation organization, created by leaders from Israel's cyber defense and intelligence ecosystem.
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={5}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-6 text-sm font-semibold text-zinc-900 md:text-base"
              >
                Its programs are built by professionals who have:
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 flex flex-wrap gap-2"
              >
                {professionalTags.map((tag) => (
                  <LandingTagPill key={tag}>{tag}</LandingTagPill>
                ))}
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={7}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-6 text-sm italic leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                 This Israeli operational experience forms the foundation of every CYBERLABS program - now delivered in India through{" "}
                <span className="font-semibold text-blue-600">CYBERLABS INDIA</span>. 
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default AboutUsa;
