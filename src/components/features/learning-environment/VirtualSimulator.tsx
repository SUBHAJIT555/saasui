import { assetSrc } from "@/lib/utils";
import { motion, useInView, useAnimationControls } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaPython,
  FaLinux,
  FaWindows,
  FaDocker,
  FaAws,
  FaTerminal,
  FaMicrosoft,
} from "react-icons/fa";
import {
  SiKubernetes,
  SiMetasploit,
  SiWireshark,
  SiBurpsuite,
  SiJavascript,
  SiCplusplus,
  SiC,
  SiMysql,
} from "react-icons/si";

import { IoBugOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import { TbRobot } from "react-icons/tb";
import { LiaSkullCrossbonesSolid } from "react-icons/lia";
import { MdLockOutline } from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { BsShieldLock } from "react-icons/bs";

import { AnimatedList } from "@/components/ui/animated-list";
import type { AnimatedListItem } from "@/components/ui/animated-list";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingFramedTwoCol,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
  landingListRowHoverClass,
  landingListTextHoverClass,
} from "@/components/ui/landing-section";









const AiDriven = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const TechItem = ({
    tech,
    boxSize,
    iconSize,
    index,
    isInView
  }: {
    tech: { name: string; icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; imageUrl?: string; category: string; description?: string };
    boxSize: number;
    iconSize: number;
    index: number;
    isInView: boolean;
  }) => {
    return (
      <motion.div
        className="flex items-center justify-center relative"
        style={{
          width: boxSize,
          height: boxSize,
          flexShrink: 0,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{
          delay: index * 0.01,
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        {/* Grid box container - no gap, boxes touch each other */}
        <div
          className="flex items-center justify-center bg-white border-l border-b border-t border-neutral-300 border-dashed relative"
          style={{
            background:
              "repeating-linear-gradient(135deg, #f9fafb 0px, #f9fafb 1px, transparent 1px, transparent 4px), white",
            width: boxSize,
            height: boxSize,
          }}
        >
          {/* Logo/Icon */}
          {tech.imageUrl ? (
            <img
              src={assetSrc(tech.imageUrl)}
              alt={tech.name}
              className="object-contain"
              style={{ width: iconSize, height: iconSize, minWidth: iconSize, minHeight: iconSize }}
            />
          ) : tech.icon ? (
            <div style={{ width: iconSize, height: iconSize }}>
              {(() => {
                const IconComponent = tech.icon;
                return <IconComponent className="text-primary" style={{ width: iconSize, height: iconSize }} />;
              })()}
            </div>
          ) : null}
        </div>
      </motion.div>
    );
  };

  const MarqueeRow = ({
    techItems,
    direction,
    speed,
    iconSize,
    isInView
  }: {
    techItems: Array<{ name: string; icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; imageUrl?: string; category: string; description?: string }>;
    direction: "left" | "right";
    speed: number;
    iconSize: number;
    isInView: boolean;
  }) => {
    const controls = useAnimationControls();

    // Duplicate items enough times for seamless infinite loop
    // Need at least 2 full sets to ensure seamless transition
    const duplicatedItems = [...techItems, ...techItems, ...techItems, ...techItems];
    const boxSize = iconSize + 40;
    const totalWidth = techItems.length * boxSize;

    useEffect(() => {
      const startX = direction === "left" ? 0 : -totalWidth;
      const endX = direction === "left" ? -totalWidth : 0;

      controls.start({
        x: [startX, endX],
        transition: {
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        },
      });
    }, [controls, direction, speed, totalWidth]);

    return (
      <div
        className="relative overflow-hidden w-full"
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--background, #f5f5f5), transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--background, #f5f5f5), transparent)",
          }}
        />

        <motion.div
          className="flex"
          animate={controls}
          style={{
            width: "fit-content",
          }}
        >
          {duplicatedItems.map((tech, index) => (
            <TechItem
              key={`${tech.name}-${index}`}
              tech={tech}
              boxSize={boxSize}
              iconSize={iconSize}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    );
  };

  const techStack = [
    { name: "Python", icon: FaPython, category: "Programming", description: "Scripting & automation for security tasks." },
    { name: "C", icon: SiC, category: "Programming", description: "Low-level programming for security research." },
    { name: "C++", icon: SiCplusplus, category: "Programming", description: "System-level programming & exploit development." },
    { name: "JavaScript", icon: SiJavascript, category: "Programming", description: "Web security & client-side exploits." },
    { name: "Bash", icon: FaTerminal, category: "Programming", description: "Shell scripting for automation & penetration testing." },
    { name: "PowerShell", icon: FaMicrosoft, category: "Programming", description: "Windows automation & security administration." },
    { name: "Linux (Kali / Ubuntu)", icon: FaLinux, category: "Operating System", description: "Primary OS for penetration testing." },
    { name: "Windows Internals", icon: FaWindows, category: "Operating System", description: "Enterprise environment simulation." },
    { name: "SQL", icon: SiMysql, category: "Database", description: "Database security & SQL injection testing." },
    { name: "Docker", icon: FaDocker, category: "Containerization", description: "Container-based environments." },
    { name: "Kubernetes", icon: SiKubernetes, category: "Containerization", description: "Container orchestration platform." },
    { name: "AWS Cloud", icon: FaAws, category: "Cloud Platform", description: "Cloud infrastructure & services." },
    { name: "Wireshark", icon: SiWireshark, category: "Security Tool", description: "Network protocol analyzer." },
    { name: "Metasploit", icon: SiMetasploit, category: "Security Tool", description: "Exploitation framework for testing." },
    { name: "Burp Suite", icon: SiBurpsuite, category: "Security Tool", description: "Web application security testing." },
    { name: "Cryptography & Data Protection", icon: MdLockOutline, category: "Security Domain", description: "Encryption & data security." },
    { name: "Identity & Access Management (IAM)", icon: IoKeyOutline, category: "Security Domain", description: "Access control & authentication." },
    { name: "Malware Analysis & Reverse Engineering", icon: LiaSkullCrossbonesSolid, category: "Security Domain", description: "Threat analysis & code reverse engineering." },
    { name: "Threat Intelligence & SOAR Automation", icon: TbRobot, category: "Security Domain", description: "Automated threat response & intelligence." },
    { name: "Vulnerability Assessment & Scanning", icon: IoBugOutline, category: "Security Domain", description: "Security scanning & vulnerability detection." },
    { name: "SIEM & Log Monitoring", icon: GrLineChart, category: "Security Domain", description: "Security information & event management." },
    { name: "EDR / XDR Security", icon: BsShieldLock, category: "Security Domain", description: "Endpoint detection & response." },

  ];

  const features = [
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7l5 5l-5 5" /><path d="M12 19l7 0" /></svg>`,
      text: "Practical hands-on exercises",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /><path d="M9 14l2 2l4 -4" /></svg>`,
      text: "Assessment-based lab scenarios",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /><path d="M15 19l2 2l4 -4" /></svg>`,
      text: "Guided instructor-led exercises",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" /><path d="M20 21l2 -2l-2 -2" /><path d="M17 17l-2 2l2 2" /></svg>`,
      text: "Independent self-practice sessions",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" /><path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" /></svg>`,
      text: "End-to-end investigation workflows",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 9v-1a3 3 0 0 1 6 0v1" /><path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" /><path d="M3 13l4 0" /><path d="M17 13l4 0" /><path d="M12 20l0 -6" /><path d="M4 19l3.35 -2" /><path d="M20 19l-3.35 -2" /><path d="M4 7l3.75 2.4" /><path d="M20 7l-3.75 2.4" /></svg>`,
      text: "Controlled real-world attack simulations (in progressive development)",
    },
  ];

  const featuresListItems: AnimatedListItem[] = features.map((f) => ({
    text: f.text,
    icon: (
      <span
        className="mt-1 flex shrink-0 items-center justify-center text-blue-600 [&_svg]:h-6 [&_svg]:w-6"
        dangerouslySetInnerHTML={{ __html: f.svg }}
      />
    ),
  }));

  const MarqueePanel = ({ iconSize, numRows }: { iconSize: number; numRows: number }) => (
    size.width > 0 ? (() => {
      const rowHeight = iconSize + (iconSize >= 40 ? 32 : 38);
      const itemsPerRow = Math.ceil(techStack.length / numRows);
      const rows: typeof techStack[] = [];
      for (let i = 0; i < numRows; i++) {
        rows.push(techStack.slice(i * itemsPerRow, (i + 1) * itemsPerRow));
      }
      return (
        <div className="relative w-full space-y-0 overflow-visible">
          {rows.map((row, index) => (
            <div key={index} className="relative overflow-visible" style={{ height: rowHeight }}>
              <MarqueeRow
                techItems={row}
                direction={index % 2 === 0 ? "left" : "right"}
                speed={iconSize >= 40 ? 20 + index * 2 : 18 + index * 3}
                iconSize={iconSize}
                isInView={isInView}
              />
            </div>
          ))}
        </div>
      );
    })() : null
  );

  const ContentPanel = ({ showMobileIntro = false }: { showMobileIntro?: boolean }) => (
    <>
      {showMobileIntro && (
        <p className="mb-6 text-sm leading-relaxed text-zinc-700 sm:text-base lg:hidden">
          Our proprietary simulator-developed and maintained by{" "}
          <span className="font-semibold text-zinc-900 uppercase">CYBERLABS USA</span>
          -brings the most realistic form of cybersecurity training to{" "}
          <span className="font-semibold text-blue-600 uppercase">India</span>.
        </p>
      )}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-zinc-900 sm:text-lg lg:text-xl">
          Students use the simulator throughout the course for:
        </h3>
      </div>
      <AnimatedList
        items={featuresListItems}
        viewportOnce={false}
        viewportAmount={0.5}
        duration={0.6}
        staggerDelay={0.1}
        xOffset={50}
        containerClassName={showMobileIntro ? "space-y-3" : "space-y-4"}
        contentClassName={`text-sm text-zinc-700 sm:text-base ${showMobileIntro ? "" : "lg:text-lg"} ${landingListTextHoverClass}`}
        itemClassName={`flex items-start gap-3 ${showMobileIntro ? "" : "gap-4"} ${landingListRowHoverClass}`}
        iconClassName="shrink-0 flex items-center pt-0.5 text-blue-600"
        boldText={false}
      />
      <motion.p
        variants={itemVariants}
        className="mt-6 text-sm leading-relaxed text-zinc-700 sm:text-base lg:text-lg"
      >
        The virtual simulator is designed to replicate{" "}
        <span className="font-semibold text-zinc-900">real enterprise environments</span>, allowing learners to
        safely explore, test, investigate, and respond to realistic cybersecurity scenarios.
      </motion.p>
    </>
  );

  return (
    <LandingSectionShell>
    <motion.section
      ref={ref}
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div ref={timelineRef}>
        <LandingBento>
          <div className="py-6 md:py-8">
            <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
              <ShinyText
                text="Virtual Cyber Simulator (Core Platform)"
                className={landingSectionHeadingClass}
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
            </TimelineContent>

            <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              At the center of the CYBERLABS learning environment is a{" "}
              <span className="font-semibold text-zinc-900">comprehensive virtual cyber simulator with advanced lab infrastructure.</span>{" "}
              This simulator serves as the{" "}
              <span className="font-semibold text-blue-600">primary platform for all practical learning</span> across programs.
            </TimelineContent>
          </div>

          <LandingFramedTwoCol className="hidden lg:block">
            <LandingBentoCell className="flex min-h-[450px] flex-col justify-center overflow-visible py-6 md:py-8">
              <motion.div variants={imageVariants} className="relative flex w-full flex-col justify-center overflow-visible">
                <MarqueePanel iconSize={48} numRows={6} />
              </motion.div>
            </LandingBentoCell>
            <LandingBentoCell className="flex flex-col justify-center py-6 md:py-8">
              <motion.div variants={itemVariants}>
                <ContentPanel />
              </motion.div>
            </LandingBentoCell>
          </LandingFramedTwoCol>

          <div className="border-t border-zinc-200 lg:hidden">
            <div className="py-6">
              <motion.div variants={imageVariants} className="relative flex w-full flex-col justify-center overflow-visible">
                <MarqueePanel iconSize={20} numRows={4} />
              </motion.div>
            </div>
            <div className="border-t border-zinc-200 py-6">
              <motion.div variants={itemVariants}>
                <ContentPanel showMobileIntro />
              </motion.div>
            </div>
          </div>
        </LandingBento>
      </div>
    </motion.section>
    </LandingSectionShell>
  );
};

export default AiDriven;
