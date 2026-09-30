import { assetSrc } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { AnimatedList } from "@/components/ui/animated-list";
import type { AnimatedListItem } from "@/components/ui/animated-list";
import enterpriseSvg from "@/assets/img/Learning-Enviorment/enterprise.svg";
import howpracticalSvg from "@/assets/img/Learning-Enviorment/howpractical.svg";
import assesmentevaluationSvg from "@/assets/img/Learning-Enviorment/assesmentevaluation.svg";
import roadmapSvg from "@/assets/img/Learning-Enviorment/roadmap.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingSplitNumberedList,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";
import { cn } from "@/lib/utils";

function MergedBentoBlock({ children }: { children: ReactNode }) {
  return <div className="max-md:divide-y max-md:divide-zinc-200">{children}</div>;
}

function SectionImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <img
      src={assetSrc(src)}
      alt={alt}
      className="mx-auto h-auto w-full max-w-[420px] sm:max-w-[480px] md:max-w-none lg:max-w-md"
    />
  );
}

const EnterpriseLab = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const card1ListRef = useRef<HTMLDivElement>(null);
  const card3ListRef = useRef<HTMLDivElement>(null);
  const card4ListRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Animated SVG Icon Components for List Items
  // Icon 1: Enterprise network architectures
  const AnimatedAffiliateIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M5.931 6.936l1.275 4.249m5.607 5.609l4.251 1.275"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M11.683 12.317l5.759 -5.759"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M4 5.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M17 5.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M17 18.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M4 15.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.7, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  // Icon 2: Servers, endpoints, and operating systems
  const AnimatedServerIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M15 20h-9a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3h12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M7 8v.01"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M7 16v.01"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M20 15l-2 3h3l-2 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );







  // Icon 3: Identity and access control systems
  const AnimatedFaceIdIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M4 8v-2a2 2 0 0 1 2 -2h2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M4 16v2a2 2 0 0 0 2 2h2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M16 4h2a2 2 0 0 1 2 2v2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M16 20h2a2 2 0 0 0 2 -2v-2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M9 10l.01 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M15 10l.01 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.6, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M9.5 15a3.5 3.5 0 0 0 5 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  // Icon 4: Security monitoring and logging pipelines
  const AnimatedTimelineIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M10 20a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M10 20h-6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M14 20h6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 15l-2 -2h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-3l-2 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 6v2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.6, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 11v.01"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.8, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  // Icon 5: Misconfigurations and vulnerabilities for analysis
  const AnimatedLockCogIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 21h-5a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h10c.564 0 1.074 .234 1.437 .61"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M8 11v-4a4 4 0 1 1 8 0v4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M17.001 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M19.001 15.5v1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M19.001 21v1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.7, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M22.032 17.25l-1.299 .75"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.9, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M17.27 20l-1.3 .75"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.1, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M15.97 17.25l1.3 .75"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.3, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M20.733 20l1.3 .75"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.5, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  // Animated Icons for Assessment Section
  const AnimatedClipboardCheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M9 14l2 2l4 -4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  const AnimatedTerminal2Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M8 9l3 3l-3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M13 15l3 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  const AnimatedAnalyzeIcon2 = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M20 11a8.1 8.1 0 0 0 -6.986 -6.918a8.095 8.095 0 0 0 -8.019 3.918"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M4 13a8.1 8.1 0 0 0 15 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M18 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M4 8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  const AnimatedTargetArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 7a5 5 0 1 0 5 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M13 3.055a9 9 0 1 0 7.941 7.945"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M15 6v3h3l3 -3h-3v-3l-3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M15 9l-3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  // Animated Icons for Simulator Roadmap Section
  const AnimatedWorldBoltIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M20.985 12.52a9 9 0 1 0 -7.52 8.36"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M3.6 9h16.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M3.6 15h10.9"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M11.5 3a17 17 0 0 0 0 18"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12.5 3c2.313 3.706 3.07 7.856 2.27 12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M19 16l-2 3h4l-2 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  const AnimatedSitemapIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M3 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M15 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M6 15v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 9l0 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.4, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  const AnimatedTerminal2Icon2 = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M8 9l3 3l-3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M13 15l3 0"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  const AnimatedCloudUpIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 18.004h-5.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.38 0 2.57 .811 3.128 1.986"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M19 22v-6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M22 19l-3 -3l-3 3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );

  const enterpriseListItems: AnimatedListItem[] = [
    { text: "Enterprise network architectures", icon: <AnimatedAffiliateIcon /> },
    { text: "Servers, endpoints, and operating systems", icon: <AnimatedServerIcon /> },
    { text: "Identity and access control systems", icon: <AnimatedFaceIdIcon /> },
    { text: "Security monitoring and logging pipelines", icon: <AnimatedTimelineIcon /> },
    { text: "Misconfigurations and vulnerabilities for analysis", icon: <AnimatedLockCogIcon /> },
  ];

  const fiveStepsListItems: AnimatedListItem[] = [
    { text: "Understand the Environment", rest: "Architecture, assets, and trust assumptions", icon: <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600/10 flex items-center justify-center mt-0.5"><span className="text-xs sm:text-sm font-bold text-blue-600">1</span></div> },
    { text: "Execute the Scenario", rest: "Hands-on labs, guided exercises, and simulations", icon: <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600/10 flex items-center justify-center mt-0.5"><span className="text-xs sm:text-sm font-bold text-blue-600">2</span></div> },
    { text: "Investigate and Analyze", rest: "Logs, behavior, evidence, and indicators", icon: <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600/10 flex items-center justify-center mt-0.5"><span className="text-xs sm:text-sm font-bold text-blue-600">3</span></div> },
    { text: "Respond and Improve", rest: "Detection logic, mitigation steps, and remediation", icon: <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600/10 flex items-center justify-center mt-0.5"><span className="text-xs sm:text-sm font-bold text-blue-600">4</span></div> },
    { text: "Reinforce Through Self-Practice", rest: "Independent practice to build confidence and mastery", icon: <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600/10 flex items-center justify-center mt-0.5"><span className="text-xs sm:text-sm font-bold text-blue-600">5</span></div> },
  ];

  const assessmentListItems: AnimatedListItem[] = [
    { text: "Scenario-based practical assessments", icon: <AnimatedClipboardCheckIcon /> },
    { text: "Simulator-driven lab evaluations", icon: <AnimatedTerminal2Icon /> },
    { text: "Investigation and analysis tasks", icon: <AnimatedAnalyzeIcon2 /> },
    { text: "Knowledge checks mapped to operational outcomes", icon: <AnimatedTargetArrowIcon /> },
  ];

  const roadmapListItems: AnimatedListItem[] = [
    { text: "Real-world attack realism", icon: <AnimatedWorldBoltIcon /> },
    { text: "Scenario depth and complexity", icon: <AnimatedSitemapIcon /> },
    { text: "Advanced simulation capabilities", icon: <AnimatedTerminal2Icon2 /> },
    { text: "Continuously updated enterprise environments", icon: <AnimatedCloudUpIcon /> },
  ];

  const instructorFocusItems = [
    "Explaining system architecture and trust boundaries",
    "Breaking down attack paths, abuse scenarios, and failure points",
    "Guiding investigation methodology and response strategy",
    "Preparing learners for hands-on execution inside the simulator",
  ];

  const practicalWorkItems = [
    "Structured Laboratories",
    "Real-world Scenarios",
    "Simulator Investigations",
    "Assessment & Exercises",
  ];

  const deliveryModelItems = [
    "Live Instructor-Led Online Training",
    "Simulation-Driven Practical Learning",
    "Guided and Independent Virtual Labs",
  ];

  const BentoSection = ({
    children,
    className = "",
  }: {
    children: ReactNode;
    className?: string;
  }) => <div className={cn("py-6 md:py-8", className)}>{children}</div>;

  return (
    <LandingSectionShell>
    <section ref={containerRef}>
      <div ref={timelineRef}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full"
      >
        <LandingBento>
        {/* 1. Enterprise style Lab Environment */}
        <MergedBentoBlock>
          <LandingBentoRow>
            <LandingBentoCell className="order-2 md:order-1 md:px-0 md:pr-8">
              <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <ShinyText
                  text="Enterprise style Lab Environments."
                  className={landingSectionHeadingClass}
                  color="#3f3f46"
                  shineColor="#18181b"
                  speed={3}
                  spread={120}
                />
              </TimelineContent>
              <div className="hidden md:block">
                <p className="mb-6 mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                  The virtual learning environment replicates key components found in modern organizations, including:
                </p>
                <div ref={card1ListRef}>
                  <AnimatedList
                    items={enterpriseListItems}
                    viewportOnce={false}
                    viewportAmount={0.5}
                    duration={0.6}
                    staggerDelay={0.1}
                    xOffset={50}
                    containerClassName="space-y-3"
                    contentClassName="text-sm font-medium text-zinc-700 md:text-base leading-relaxed"
                    itemClassName="flex items-start gap-3"
                    iconClassName="mt-0.5 shrink-0 flex items-center pt-0.5 text-blue-600"
                    boldText={false}
                  />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg">
                  Learners work with live systems, not static demonstrations, enabling meaningful hands-on experience under guided supervision.
                </p>
              </div>
            </LandingBentoCell>
            <LandingBentoCell className="order-1 flex items-center justify-center md:order-2 md:px-0 md:pl-8">
              <SectionImage src={enterpriseSvg} />
            </LandingBentoCell>
          </LandingBentoRow>
          <div className="px-0 py-6 md:hidden">
            <p className="mb-6 text-sm leading-relaxed text-zinc-700">
              The virtual learning environment replicates key components found in modern organizations, including:
            </p>
            <AnimatedList
              items={enterpriseListItems}
              viewportOnce={false}
              viewportAmount={0.5}
              duration={0.6}
              staggerDelay={0.1}
              xOffset={50}
              containerClassName="space-y-3"
              contentClassName="text-sm font-medium text-zinc-700 leading-relaxed"
              itemClassName="flex items-start gap-3"
              iconClassName="mt-0.5 shrink-0 flex items-center pt-0.5 text-blue-600"
              boldText={false}
            />
            <p className="mt-6 text-sm leading-relaxed text-zinc-700">
              Learners work with live systems, not static demonstrations, enabling meaningful hands-on experience under guided supervision.
            </p>
          </div>
        </MergedBentoBlock>

        {/* 2. Instructors-Led Online Sessions */}
        <BentoSection>
          <TimelineContent as="h2" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <ShinyText
              text="Instructors-Led Online Sessions."
              className={landingSectionHeadingClass}
              color="#3f3f46"
              shineColor="#18181b"
              speed={3}
              spread={120}
            />
          </TimelineContent>
          <p className="mb-6 mt-4 text-sm font-semibold text-zinc-900 md:text-base lg:text-lg">
            All programs are delivered through live, instructor-led online sessions. These sessions focus on:
          </p>
          <LandingSplitNumberedList items={instructorFocusItems} />
          <p className="mt-6 text-sm leading-relaxed text-zinc-700 md:text-base">
            Instructors act as operational mentors, ensuring learners understand why actions are taken—not just how.{" "}
            <span className="font-semibold text-blue-600">This ensures learners develop real operational capability, not just academic understanding.</span>
          </p>
        </BentoSection>

        {/* 3. How Practical Learning Flows */}
        <MergedBentoBlock>
          <LandingBentoRow>
            <LandingBentoCell className="order-2 md:order-1 md:px-0 md:pr-8">
              <TimelineContent as="h2" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <ShinyText
                  text="How Practical Learning Flows."
                  className={landingSectionHeadingClass}
                  color="#3f3f46"
                  shineColor="#18181b"
                  speed={3}
                  spread={120}
                />
              </TimelineContent>
              <div className="hidden md:block">
                <p className="mb-6 mt-4 text-sm text-zinc-700 md:text-base">
                  Practical learning at CYBERLABS India follows a structured, real-world workflow:
                </p>
                <AnimatedList
                  items={fiveStepsListItems}
                  viewportOnce={false}
                  viewportAmount={0.5}
                  duration={0.6}
                  staggerDelay={0.1}
                  xOffset={50}
                  containerClassName="space-y-3"
                  contentClassName="text-sm font-semibold text-zinc-900 md:text-base leading-tight"
                  itemClassName="flex items-start gap-3"
                  iconClassName="shrink-0 flex items-center pt-0.5 text-blue-600"
                  boldText={true}
                />
                <p className="mt-6 text-sm text-zinc-700 md:text-base">
                  This mirrors how cybersecurity teams operate in real organizations.
                </p>
              </div>
            </LandingBentoCell>
            <LandingBentoCell className="order-1 flex items-center justify-center md:order-2 md:px-0 md:pl-8">
              <SectionImage src={howpracticalSvg} />
            </LandingBentoCell>
          </LandingBentoRow>
          <div className="px-0 py-6 md:hidden">
            <p className="mb-6 text-sm text-zinc-700">
              Practical learning at CYBERLABS India follows a structured, real-world workflow:
            </p>
            <AnimatedList
              items={fiveStepsListItems}
              viewportOnce={false}
              viewportAmount={0.5}
              duration={0.6}
              staggerDelay={0.1}
              xOffset={50}
              containerClassName="space-y-3"
              contentClassName="text-sm font-semibold text-zinc-900 leading-tight"
              itemClassName="flex items-start gap-3"
              iconClassName="shrink-0 flex items-center pt-0.5 text-blue-600"
              boldText={true}
            />
            <p className="mt-6 text-sm text-zinc-700">
              This mirrors how cybersecurity teams operate in real organizations.
            </p>
          </div>
        </MergedBentoBlock>

        {/* 4. Practical Work & Operational Output */}
        <BentoSection>
          <TimelineContent as="h2" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <ShinyText
              text="Practical Work & Operational Output."
              className={landingSectionHeadingClass}
              color="#3f3f46"
              shineColor="#18181b"
              speed={3}
              spread={120}
            />
          </TimelineContent>
          <p className="mb-4 mt-4 text-sm text-zinc-700 md:text-base">
            All CYBERLABS INDIA programs include extensive <span className="font-semibold text-blue-600">hands-on practice embedded throughout the curriculum.</span>
          </p>
          <p className="mb-6 text-sm font-semibold text-zinc-900 md:text-base">
            Rather than isolating learning into a single end-stage project, practical work is continuously integrated through:
          </p>
          <div className="grid grid-cols-1 divide-y border-y border-zinc-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {practicalWorkItems.map((label) => (
              <div key={label} className="flex items-center px-4 py-5 text-sm font-semibold text-zinc-900 md:text-base">
                {label}
              </div>
            ))}
          </div>
          <p className="mb-2 mt-6 text-sm text-zinc-700 md:text-base">
            By the end of each program, learners will have completed <span className="font-semibold text-blue-600">multiple practical outputs comparable to capstone-level work</span>, demonstrating real operational capability.
          </p>
          <p className="text-sm text-zinc-700 md:text-base">
            Where required for specific markets or partners, this practical work can be <span className="font-semibold text-blue-600">formally consolidated into a single structured project</span> without altering the core learning model.
          </p>
        </BentoSection>

        {/* 5. Assessments & Evaluation */}
        <MergedBentoBlock>
          <LandingBentoRow>
            <LandingBentoCell className="order-2 md:order-1 md:px-0 md:pr-8">
              <TimelineContent as="h2" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <ShinyText
                  text="Assessments & Evaluation"
                  className={landingSectionHeadingClass}
                  color="#3f3f46"
                  shineColor="#18181b"
                  speed={3}
                  spread={120}
                />
              </TimelineContent>
              <div className="hidden md:block">
                <p className="mb-2 mt-4 text-sm font-semibold text-zinc-900 md:text-base">
                  Each CYBERLABS INDIA program formally concludes with a <span className="font-semibold text-blue-600">structured assessment or final evaluation.</span>
                </p>
                <p className="mb-6 text-sm font-semibold text-zinc-900 md:text-base">
                  Assessments are designed to measure practical readiness, not rote memorization, and may include:
                </p>
                <div ref={card3ListRef}>
                  <AnimatedList
                    items={assessmentListItems}
                    viewportOnce={false}
                    viewportAmount={0.5}
                    duration={0.6}
                    staggerDelay={0.1}
                    xOffset={50}
                    containerClassName="space-y-3"
                    contentClassName="text-sm text-zinc-700 md:text-base leading-relaxed"
                    itemClassName="flex items-start gap-3"
                    iconClassName="mt-0.5 shrink-0 flex items-center pt-0.5 text-blue-600"
                    boldText={false}
                  />
                </div>
                <p className="mt-6 text-sm text-zinc-700 md:text-base">
                  This ensures learners demonstrate real capability and readiness, not just course completion.
                </p>
              </div>
            </LandingBentoCell>
            <LandingBentoCell className="order-1 flex items-center justify-center md:order-2 md:px-0 md:pl-8">
              <SectionImage src={assesmentevaluationSvg} />
            </LandingBentoCell>
          </LandingBentoRow>
          <div className="px-0 py-6 md:hidden">
            <p className="mb-2 text-sm font-semibold text-zinc-900">
              Each CYBERLABS INDIA program formally concludes with a <span className="font-semibold text-blue-600">structured assessment or final evaluation.</span>
            </p>
            <p className="mb-6 text-sm font-semibold text-zinc-900">
              Assessments are designed to measure practical readiness, not rote memorization, and may include:
            </p>
            <AnimatedList
              items={assessmentListItems}
              viewportOnce={false}
              viewportAmount={0.5}
              duration={0.6}
              staggerDelay={0.1}
              xOffset={50}
              containerClassName="space-y-3"
              contentClassName="text-sm text-zinc-700 leading-relaxed"
              itemClassName="flex items-start gap-3"
              iconClassName="mt-0.5 shrink-0 flex items-center pt-0.5 text-blue-600"
              boldText={false}
            />
            <p className="mt-6 text-sm text-zinc-700">
              This ensures learners demonstrate real capability and readiness, not just course completion.
            </p>
          </div>
        </MergedBentoBlock>

        {/* 6. Certification Alignment */}
        <BentoSection>
          <TimelineContent as="h2" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <ShinyText
              text="Certification Alignment"
              className={landingSectionHeadingClass}
              color="#3f3f46"
              shineColor="#18181b"
              speed={3}
              spread={120}
            />
          </TimelineContent>
          <p className="mb-4 mt-4 text-sm text-zinc-700 md:text-base">
            All programs delivered through the CYBERLABS learning environment follow the CYBERLABS USA training and evaluation framework.
          </p>
          <p className="mb-4 text-sm text-zinc-700 md:text-base">
            Successful completion of assessments and practical requirements leads to formal certification, issued in alignment with CYBERLABS USA standards.
          </p>
          <p className="text-sm italic text-blue-600 md:text-base">
            (Detailed certification structure and grading methodology are outlined within individual program pages.)
          </p>
        </BentoSection>

        {/* 7. Current & Next-Generation Simulator Roadmap */}
        <MergedBentoBlock>
          <LandingBentoRow>
            <LandingBentoCell className="order-2 md:order-1 md:px-0 md:pr-8">
              <TimelineContent as="h2" animationNum={6} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                <ShinyText
                  text="Current & Next-Generation Simulator Roadmap"
                  className={landingSectionHeadingClass}
                  color="#3f3f46"
                  shineColor="#18181b"
                  speed={3}
                  spread={120}
                />
              </TimelineContent>
              <div className="hidden md:block">
                <p className="mb-4 mt-4 text-sm text-zinc-700 md:text-base">
                  CYBERLABS INDIA currently delivers training using a robust virtual simulator that supports comprehensive hands-on learning and investigation-based labs.
                </p>
                <p className="mb-6 text-sm text-zinc-700 md:text-base">
                  In parallel, development is underway for a next-generation advanced cyber simulator, designed to further enhance:
                </p>
                <div ref={card4ListRef}>
                  <AnimatedList
                    items={roadmapListItems}
                    viewportOnce={false}
                    viewportAmount={0.5}
                    duration={0.6}
                    staggerDelay={0.1}
                    xOffset={50}
                    containerClassName="space-y-3"
                    contentClassName="text-sm text-zinc-700 md:text-base leading-relaxed"
                    itemClassName="flex items-start gap-3"
                    iconClassName="mt-0.5 shrink-0 flex items-center pt-0.5 text-blue-600"
                    boldText={false}
                  />
                </div>
                <p className="mt-6 text-sm text-zinc-700 md:text-base">
                  This ensures the CYBERLABS learning environment evolves in step with modern threats and industry requirements.
                </p>
              </div>
            </LandingBentoCell>
            <LandingBentoCell className="order-1 flex items-center justify-center md:order-2 md:px-0 md:pl-8">
              <SectionImage src={roadmapSvg} />
            </LandingBentoCell>
          </LandingBentoRow>
          <div className="px-0 py-6 md:hidden">
            <p className="mb-4 text-sm text-zinc-700">
              CYBERLABS INDIA currently delivers training using a robust virtual simulator that supports comprehensive hands-on learning and investigation-based labs.
            </p>
            <p className="mb-6 text-sm text-zinc-700">
              In parallel, development is underway for a next-generation advanced cyber simulator, designed to further enhance:
            </p>
            <AnimatedList
              items={roadmapListItems}
              viewportOnce={false}
              viewportAmount={0.5}
              duration={0.6}
              staggerDelay={0.1}
              xOffset={50}
              containerClassName="space-y-3"
              contentClassName="text-sm text-zinc-700 leading-relaxed"
              itemClassName="flex items-start gap-3"
              iconClassName="mt-0.5 shrink-0 flex items-center pt-0.5 text-blue-600"
              boldText={false}
            />
            <p className="mt-6 text-sm text-zinc-700">
              This ensures the CYBERLABS learning environment evolves in step with modern threats and industry requirements.
            </p>
          </div>
        </MergedBentoBlock>

        {/* 8. Delivery Model */}
        <BentoSection>
          <TimelineContent as="h2" animationNum={7} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <ShinyText
              text="Delivery Model"
              className={landingSectionHeadingClass}
              color="#3f3f46"
              shineColor="#18181b"
              speed={3}
              spread={120}
            />
          </TimelineContent>
          <p className="mb-6 mt-4 text-sm font-semibold text-zinc-900 md:text-base">
            The CYBERLABS learning environment is delivered through:
          </p>
          <div className="grid grid-cols-1 divide-y border-y border-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {deliveryModelItems.map((label) => (
              <div key={label} className="flex items-center justify-center px-4 py-6 text-center text-sm font-semibold text-zinc-900 md:text-base">
                {label}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold italic text-blue-600 md:text-base">
            All programs maintain a strong emphasis on hands-on execution and investigation, regardless of format.
          </p>
        </BentoSection>
        </LandingBento>
      </motion.div>
      </div>
    </section>
    </LandingSectionShell>
  );
};

export default EnterpriseLab;
