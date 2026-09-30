import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import aboutIndiaImage from "@/assets/img/Home/ABOUTCYBERLABSINDIA.webp";
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

const tags = [
  "Global technology companies",
  "Multinational enterprises",
  "Banks and financial institutions",
  "Critical infrastructure providers",
  "Governments and public-sector organizations",
];

const AboutIndia = () => {
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
            text="About CYBERLABS INDIA."
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
          Bringing Israeli Cyber Defense Training to India.
        </TimelineContent>

        <LandingBento className="mt-8">
          <LandingFramedTwoCol>
            <LandingBentoCell className="md:px-0 md:pr-8">
              <TimelineContent
                as="p"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="text-sm font-semibold leading-relaxed text-zinc-800 md:text-base lg:text-lg"
              >
                CYBERLABS INDIA is the Indian launch of a globally proven, Israeli - led cyber defense training ecosystem.
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={4}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base"
              >
                Through a strategic collaboration between{" "}
                <span className="font-semibold text-zinc-900">Cyveritas Technology</span> and{" "}
                <span className="font-semibold text-zinc-900">CYBERLABS USA</span>, CYBERLABS INDIA brings to India{" "}
                <span className="font-bold text-zinc-900">
                  training programs designed by Israeli cyber defense leaders and practitioners.
                </span>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={5}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-6 text-sm font-semibold text-zinc-900 md:text-base"
              >
                These programs are built to meet the expectations of:
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 flex flex-wrap gap-2"
              >
                {tags.map((tag) => (
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
                CYBERLABS INDIA is built for{" "}
                <span className="font-semibold text-blue-600">global threats</span>,{" "}
                <span className="font-semibold text-blue-600">global standards</span>, and{" "}
                <span className="font-semibold text-blue-600">global careers</span> - with{" "}
                <span className="font-semibold text-blue-600">Israeli cyber defense</span> at its core. 
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="md:px-0 md:pl-8">
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="group relative min-h-[280px] w-full overflow-hidden md:min-h-[360px]"
              >
                <img
                  src={assetSrc(aboutIndiaImage)}
                  alt="About CYBERLABS INDIA"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default AboutIndia;
