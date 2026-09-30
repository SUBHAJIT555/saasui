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

const AnimatedShieldLockIcon = ({ isInView }: { isInView: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 shrink-0 p-1 text-blue-600"
  >
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 12l0 2.5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1.4, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedToolsIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M14.5 5.5l4 4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 8l-5 -5l-4 4l5 5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 1.4, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M7 8l-1.5 1.5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M16 12l5 5l-4 4l-5 -5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 2.3, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M16 17l-1.5 1.5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 2.9, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedTargetArrowIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 7a5 5 0 1 0 5 5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 0.5, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M13 3.055a9 9 0 1 0 7.941 7.945" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 1.1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 6v3h3l3 -3h-3v-3l-3 3" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 1.9, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 9l-3 3" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 2.5, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const FacultyHero = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [featuresInView, setFeaturesInView] = useState(false);

  const items = [
    {
      title: parseBoldText("**Operational, Not Academic**"),
      body: "Instructors actively involved in cyber defense, investigations, and enterprise security operations.",
      Icon: AnimatedShieldLockIcon,
    },
    {
      title: parseBoldText("**Builders of Real Cyber Capability**"),
      body: "Leaders who have designed training frameworks, cyber units, SOCs, and national-level programs.",
      Icon: AnimatedToolsIcon,
    },
    {
      title: parseBoldText("**Accountable for Outcomes**"),
      body: "Focused on decision-making, execution, and real-world readiness - not slide-based instruction.",
      Icon: AnimatedTargetArrowIcon,
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
                Leadership & Faculty
              </GradientText>
              <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
            </span>
          </TimelineContent>

          <TimelineContent as="h1" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="max-w-4xl">
            <ShinyText
              text="Built by Those Who Defend the Digital World"
              className="text-balance text-[1.7rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl sm:leading-[1.08] md:text-5xl xl:text-6xl"
              color="#3f3f46"
              shineColor="#18181b"
              speed={3}
              spread={120}
            />
          </TimelineContent>

          <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <LandingTagPill>Not Trainers</LandingTagPill>
            <LandingTagPill>Not Theorists</LandingTagPill>
            <LandingTagPill>Practitioners</LandingTagPill>
          </TimelineContent>

          <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mx-auto max-w-3xl space-y-3 px-1 sm:px-0">
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              {parseBoldText(
                "CYBERLABS is led and taught by professionals who have **defended real systems**, **handled live incidents**, and **led cyber operations** - not classroom-only instructors.",
              )}
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 sm:text-base md:text-lg">
              {parseBoldText(
                "We teach cybersecurity the way it is practiced: with **accountability**, **judgment**, and **real-world pressure**.",
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

export default FacultyHero;
