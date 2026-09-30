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

const AnimatedIcon1 = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M21 12a9 9 0 1 0 -9 9" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3.6 9h16.8" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3.6 15h7.9" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M11.5 3a17 17 0 0 0 0 18" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 1.4, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 1.6, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M20.2 20.2l1.8 1.8" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 2.5, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedIcon2 = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.6, delay: 0.7, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M16 3.13a4 4 0 0 1 0 7.75" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.5, delay: 1.3, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M16 19h6" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 1.8, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M19 16v6" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 2.1, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const AnimatedIcon3 = ({ isInView }: { isInView: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 shrink-0 p-1 text-blue-600">
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }} />
    <motion.path d="M15 19l2 2l4 -4" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.4, delay: 1, repeat: Infinity, repeatDelay: 3 }} />
  </svg>
);

const ContactHero = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [featuresInView, setFeaturesInView] = useState(false);

  const items = [
    {
      title: parseBoldText("**Global Reach**"),
      body: "Access CYBERLABS across regions under one unified global framework.",
      Icon: AnimatedIcon1,
    },
    {
      title: parseBoldText("**Right Team, Right Channel**"),
      body: "Get connected to admissions, partnerships, or advisory teams directly.",
      Icon: AnimatedIcon2,
    },
    {
      title: parseBoldText("**Professional & Transparent Engagement**"),
      body: "Clear communication, informed guidance, and respectful interaction.",
      Icon: AnimatedIcon3,
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
            backgroundImage:
              "linear-gradient(90deg, var(--hero-scale-line) 1px, transparent 1px)",
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
                Contact CYBERLABS
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
            <p className="text-balance text-[1.7rem] font-semibold leading-[1.12] tracking-tight text-zinc-900 sm:text-4xl sm:leading-[1.08] md:text-5xl xl:text-6xl">
              Global <span className="text-blue-600">Presence.</span> Direct{" "}
              <span className="text-blue-600">Access.</span>
            </p>
          </TimelineContent>

          <TimelineContent
            as="p"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="text-sm font-semibold text-zinc-900 sm:text-base md:text-lg"
          >
            One Organization. Multiple Locations. Clear Communication.
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
                "CYBERLABS operates as a globally connected cybersecurity education organization, with leadership, faculty, and operations across **India, the United States, and Israel.**",
              )}
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              {parseBoldText(
                "This page provides **direct, transparent access** to the teams responsible for programs, admissions, and partnerships - without intermediaries or generic inboxes.",
              )}
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

export default ContactHero;
