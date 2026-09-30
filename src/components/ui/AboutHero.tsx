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

const AnimatedSearchIcon = ({ isInView }: { isInView: boolean }) => (
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
    <motion.path
      stroke="none"
      d="M0 0h24v24H0z"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
    />
    <motion.path
      d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
    />
    <motion.path
      d="M21 21l-6 -6"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.7, repeat: Infinity, repeatDelay: 3 }}
    />
  </svg>
);

const AnimatedNetworkIcon = ({ isInView }: { isInView: boolean }) => (
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
    <motion.path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 0.7, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1.1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M6 9h12" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 20h7" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 1.7, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M14 20h7" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 1.9, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 2.1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 15v3" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 2.4, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedTargetArrowIcon = ({ isInView }: { isInView: boolean }) => (
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
    <motion.path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 7a5 5 0 1 0 5 5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 0.4, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M13 3.055a9 9 0 1 0 7.941 7.945" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 0.9, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 6v3h3l3 -3h-3v-3l-3 3" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1.5, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 9l-3 3" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 1.9, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AboutHero = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [featuresInView, setFeaturesInView] = useState(false);

  const items = [
    {
      title: parseBoldText("**Investigation Before Instruction**"),
      body: "We teach how cyber incidents unfold, not just how tools are used.",
      Icon: AnimatedSearchIcon,
    },
    {
      title: parseBoldText("**Architecture-First Thinking**"),
      body: "Learners understand systems, trust boundaries, and failure points before touching tools.",
      Icon: AnimatedNetworkIcon,
    },
    {
      title: parseBoldText("**Operational Accountability**"),
      body: "Training outcomes are measured by real execution and decision-making, not attendance.",
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
          <TimelineContent
            as="div"
            animationNum={0}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
          >
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
                About CYBERLABS
              </GradientText>
              <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
            </span>
          </TimelineContent>

          <TimelineContent
            as="h1"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="max-w-4xl"
          >
            <ShinyText
              text="Built Where Cybersecurity Is Real"
              className="text-balance text-[1.7rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl sm:leading-[1.08] md:text-5xl xl:text-6xl"
              color="#3f3f46"
              shineColor="#18181b"
              speed={3}
              spread={120}
            />
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            <LandingTagPill>ISRAEL-FOUNDED</LandingTagPill>
            <LandingTagPill>PRACTITIONER-LED</LandingTagPill>
            <LandingTagPill>GLOBALLY ALIGNED</LandingTagPill>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={3}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mx-auto max-w-3xl space-y-3 px-1 sm:px-0"
          >
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              {parseBoldText(
                "CYBERLABS was founded in Israel and built by professionals who have defended **real** systems, led investigations, and operated under **real cyber risk**.",
              )}
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 sm:text-base md:text-lg">
              We train cybersecurity professionals to think, investigate, and operate - not just learn tools.
            </p>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="w-full border-t border-dashed border-zinc-200 pt-8 md:pt-10"
          >
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

export default AboutHero;
