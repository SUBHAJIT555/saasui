import { useRef } from "react";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { FeatureCard } from "@/components/ui/FeatureCard";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingGoalBanner,
  landingRevealVariants,
  homeSectionSpacingClass,
} from "@/components/ui/landing-section";

const cyberDefenseFeatures = [
  {
    text: "Mission-critical.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M4 12a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
        <path d="M12 2l0 2" /><path d="M12 20l0 2" /><path d="M20 12l2 0" /><path d="M2 12l2 0" />
      </svg>
    ),
  },
  {
    text: "Intelligence-led.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 10a2 2 0 0 1 1.678 .911l.053 .089h7.269l.117 .007a1 1 0 0 1 .883 .993c0 5.523 -4.477 10 -10 10a1 1 0 0 1 -1 -1v-7.269l-.089 -.053a2 2 0 0 1 -.906 -1.529l-.005 -.149a2 2 0 0 1 2 -2m9.428 -1.334a1 1 0 0 1 -1.884 .668a8 8 0 1 0 -10.207 10.218a1 1 0 0 1 -.666 1.886a10 10 0 1 1 12.757 -12.772m-4.628 -.266a1 1 0 0 1 -1.6 1.2a4 4 0 1 0 -5.6 5.6a1 1 0 0 1 -1.2 1.6a6 6 0 1 1 8.4 -8.4" />
      </svg>
    ),
  },
  {
    text: "Continuously tested against real adversaries.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
        <path d="M15 19l2 2l4 -4" />
      </svg>
    ),
  },
  {
    text: "Integrated into national security, enterprises, and infrastructure.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M14 5a2 2 0 0 0 -2 2v10a2 2 0 0 1 -2 2" />
        <path d="M3 17h4v4h-4l0 -4" /><path d="M17 3h4v4h-4l0 -4" />
      </svg>
    ),
  },
];

const WhyIsrael = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell className={homeSectionSpacingClass}>
      <div ref={timelineRef}>
        <LandingBento>
          <LandingBentoRow>
            <LandingBentoCell>
              

              <TimelineContent
                as="h2"
                animationNum={1}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-pretty"
              >
                <ShinyText
                  text="Why Israel Leads Global Cyber Defense ?"
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
                className="mt-6 text-lg font-bold text-blue-600 md:text-xl lg:text-2xl"
              >
                Cybersecurity Forged in Real Conflict, Not Classrooms
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm font-semibold leading-relaxed text-zinc-800 md:text-base lg:text-lg"
              >
                Israel is globally recognized as the leader in cybersecurity and cyber defense - not by theory, but by necessity.
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={4}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-6 text-sm font-semibold text-zinc-900 md:text-base"
              >
                Cyber defense in Israel is:
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={5}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base"
              >
                Israeli cyber professionals are trained to{" "}
                <span className="font-bold text-zinc-900">
                  defend live systems, respond to real attacks, and protect national-scale assets.
                </span>
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center justify-center">
              <TimelineContent
                as="div"
                animationNum={2}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="w-full"
              >
                <DatabaseWithRestApi
                  title="CYBERLABS INDIA"
                  badgeTexts={{ first: "scan", second: "protect", third: "monitor", fourth: "respond" }}
                  buttonTexts={{ first: "CYBERLABS", second: "Defense" }}
                  lightColor="#27E0B3"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>

          <LandingBentoCell>
            <div className="grid grid-cols-1 gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
              {cyberDefenseFeatures.map((feature, index) => (
                <TimelineContent
                  key={feature.text}
                  as="div"
                  animationNum={6 + index}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className="bg-white"
                >
                  <FeatureCard
                    feature={{ icon: feature.icon, title: feature.text }}
                    className="h-full border transition-colors hover:bg-zinc-50/70"
                  />
                </TimelineContent>
              ))}
            </div>
          </LandingBentoCell>
        </LandingBento>

        <TimelineContent
          as="div"
          animationNum={10}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-12"
        >
          <LandingGoalBanner
            title="This real-world mindset is what defines CYBERLABS."
          />
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
};

export default WhyIsrael;
