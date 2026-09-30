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

const AnimatedShieldCheckIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 19l2 2l4 -4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedSettingsIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1.2, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedWorldIcon = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3.6 9h16.8" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3.6 15h16.8" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M11.5 3a17 17 0 0 0 0 18" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 1.4, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12.5 3a17 17 0 0 1 0 18" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 1.6, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const CertificationHero = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [featuresInView, setFeaturesInView] = useState(false);

  const items = [
    {
      title: parseBoldText("**Capability-Based Certification**"),
      body: "Credentials issued only after verified practical competence.",
      Icon: AnimatedShieldCheckIcon,
    },
    {
      title: parseBoldText("**Assessment-Driven Evaluation**"),
      body: "Hands-on labs, scenarios, and real execution - not memory-based exams.",
      Icon: AnimatedSettingsIcon,
    },
    {
      title: parseBoldText("**Industry-Aligned & Role-Relevant**"),
      body: "Mapped to global cybersecurity role expectations, not exam shortcuts.",
      Icon: AnimatedWorldIcon,
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
                Certification & Evaluation
              </GradientText>
              <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
            </span>
          </TimelineContent>

          <TimelineContent as="h1" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="max-w-4xl">
            <p className="text-balance text-[1.7rem] font-semibold leading-[1.12] tracking-tight text-zinc-900 sm:text-4xl sm:leading-[1.08] md:text-5xl xl:text-6xl">
              Credibility Through Capability. Not Just Completion.
            </p>
          </TimelineContent>

          <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-sm font-semibold text-zinc-900 sm:text-base md:text-lg">
            Assessed. Verified. Operationally Proven.
          </TimelineContent>

          <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mx-auto max-w-3xl space-y-3 px-1 sm:px-0">
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              At CYBERLABS, certification is not a formality.
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              {parseBoldText("Every credential reflects **demonstrated skill, assessed performance, and real operational readiness** - not attendance or theory.")}
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              {parseBoldText("We certify **what professionals can actually do** in real cyber environments.")}
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

export default CertificationHero;
