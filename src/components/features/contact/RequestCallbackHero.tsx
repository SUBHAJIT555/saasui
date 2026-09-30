import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { parseBoldText } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { FeatureCard } from "@/components/ui/FeatureCard";
import GradientText from "@/components/ui/GradientText";
import {
  landingRevealVariants,
  LANDING_GRADIENT_COLORS,
} from "@/components/ui/landing-section";

const AnimatedRouteIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 0.6, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedListDetailsIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M13 5h8" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M13 9h5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0.4, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M13 15h8" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0.6, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M13 19h5" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0.8, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 1.6, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedInfoCircleIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12 9h.01" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.2, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M11 12h1v4h1" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1.2, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const RequestCallbackHero = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [featuresInView, setFeaturesInView] = useState(false);

  const items = [
    {
      title: parseBoldText("**Program Fit & Direction**"),
      body: "Understand which program aligns with your background and goals.",
      Icon: AnimatedRouteIcon,
    },
    {
      title: parseBoldText("**Readiness & Expectations**"),
      body: "Clarity on time commitment, learning depth, and effort required.",
      Icon: AnimatedListDetailsIcon,
    },
    {
      title: parseBoldText("**Transparent Guidance**"),
      body: "Clear answers on structure, assessments, and outcomes - upfront.",
      Icon: AnimatedInfoCircleIcon,
    },
  ];

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFeaturesInView(true); },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={timelineRef} className="relative overflow-hidden bg-white px-4 pb-12 pt-20 sm:px-5 sm:pb-16 sm:pt-24 md:pb-24 md:pt-32">
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
              <GradientText className="text-xs font-bold! uppercase tracking-[0.14em]" colors={[...LANDING_GRADIENT_COLORS]} animationSpeed={4} direction="horizontal" showBorder={false} pauseOnHover={false}>
                Request a Call Back
              </GradientText>
              <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
            </span>
          </TimelineContent>

          <TimelineContent as="h1" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="max-w-4xl">
            <p className="text-balance text-[1.7rem] font-semibold leading-[1.12] tracking-tight text-zinc-900 sm:text-4xl sm:leading-[1.08] md:text-5xl xl:text-6xl">
              Make an Informed Cybersecurity Decision
            </p>
          </TimelineContent>

          <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-sm font-semibold text-zinc-900 sm:text-base md:text-lg">
            Clarity Before Commitment. Fit Before Enrollment.
          </TimelineContent>

          <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mx-auto max-w-3xl space-y-3 px-1 sm:px-0">
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              Choosing a cybersecurity program is a serious decision.
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              {parseBoldText("This conversation is designed to help you assess **readiness, alignment, and long-term direction** - not to sell a course.")}
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              At CYBERLABS, we believe the right decision is an informed one.
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

export default RequestCallbackHero;
