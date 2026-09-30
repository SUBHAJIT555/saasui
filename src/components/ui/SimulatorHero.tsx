import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { parseBoldText } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { FeatureCard } from "@/components/ui/FeatureCard";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";
import {
  LandingTagPill,
  landingRevealVariants,
  LANDING_GRADIENT_COLORS,
} from "@/components/ui/landing-section";

const AnimatedDesktopAnalyticsIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -10" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M7 20h10" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0.8, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M9 16v4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 1.1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 16v4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 1.3, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M9 12v-4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1.5, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 12v-1" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 1.7, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 12v-2" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1.9, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedClipboardSearchIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h4.5m7.5 -10v-4a2 2 0 0 0 -2 -2h-2" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 0.8, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M20.2 20.2l1.8 1.8" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1.7, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedUserScreenIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M19.03 17.818a3 3 0 0 0 1.97 -2.818v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3v8c0 1.317 .85 2.436 2.03 2.84" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M8 21a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1.4, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const SimulatorHero = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [featuresInView, setFeaturesInView] = useState(false);

  const items = [
    {
      title: parseBoldText("**Enterprise-Style Cyber Simulator**"),
      body: "Realistic environments used for hands-on labs, assessments, and investigations.",
      Icon: AnimatedDesktopAnalyticsIcon,
    },
    {
      title: parseBoldText("**Scenario & Investigation Driven**"),
      body: "Learners analyze failures, trace attacks, and make real decisions under guided conditions.",
      Icon: AnimatedClipboardSearchIcon,
    },
    {
      title: parseBoldText("**Instructor-Led, Online & Live**"),
      body: "Operational mentors explain why actions are taken - not just how.",
      Icon: AnimatedUserScreenIcon,
    },
  ];

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFeaturesInView(true);
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={timelineRef}
      className="relative overflow-hidden bg-white px-4 pb-12 pt-20 sm:px-5 sm:pb-16 sm:pt-24 md:pb-24 md:pt-32"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 80%)",
            maskImage: "linear-gradient(to bottom, #000 0%, transparent 80%)",
            backgroundImage: "linear-gradient(90deg, var(--hero-scale-line) 1px, transparent 1px)",
            backgroundSize: "8px 100%",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <article className="mx-auto flex w-full flex-col items-center space-y-5 text-center sm:space-y-6">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
              <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
              <GradientText
                className="text-xs font-bold! uppercase tracking-[0.14em]"
                colors={[...LANDING_GRADIENT_COLORS]}
                animationSpeed={4}
                direction="horizontal"
                showBorder={false}
                pauseOnHover={false}
              >
                Learning Environment
              </GradientText>
              <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
            </span>
          </TimelineContent>

          <TimelineContent as="h1" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="max-w-4xl">
            <ShinyText
              text="Learn Cybersecurity by Operating Inside It"
              className="text-balance text-[1.7rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl sm:leading-[1.08] md:text-5xl xl:text-6xl"
              color="#3f3f46"
              shineColor="#18181b"
              speed={3}
              spread={120}
            />
          </TimelineContent>

          <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <LandingTagPill>Not Slides</LandingTagPill>
            <LandingTagPill>Not Demos</LandingTagPill>
            <LandingTagPill>Real Cyber Environments</LandingTagPill>
          </TimelineContent>

          <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mx-auto max-w-3xl space-y-3 px-1 sm:px-0">
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              {parseBoldText(
                "CYBERLABS delivers a simulation-driven learning environment where cybersecurity is learned by **executing, investigating, and responding** inside realistic virtual systems - guided by live instructors.",
              )}
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 sm:text-base md:text-lg">
              {parseBoldText(
                "This is operational training built for **real-world readiness**, not passive learning.",
              )}
            </p>
          </TimelineContent>

          <TimelineContent as="div" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="w-full border-t border-dashed border-zinc-200 pt-8 md:pt-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {items.map((item, index) => {
                const IconComponent = item.Icon;
                return (
                  <FeatureCard
                    key={index}
                    feature={{
                      title: item.title,
                      description: item.body,
                      icon: <IconComponent isInView={featuresInView} />,
                    }}
                    className="h-full text-left shadow-sm"
                  />
                );
              })}
            </div>
          </TimelineContent>
        </article>
      </div>
    </section>
  );
};

export default SimulatorHero;
