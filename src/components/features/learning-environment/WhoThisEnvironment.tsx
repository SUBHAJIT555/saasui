import { assetSrc } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingGoalBanner,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

import aspiringImage from "@/assets/img/Learning-Enviorment/aspiring.webp";
import workingImage from "@/assets/img/Learning-Enviorment/working-professionals.webp";
import advancedImage from "@/assets/img/Learning-Enviorment/advanced-learners.webp";
import enterpriseImage from "@/assets/img/Learning-Enviorment/enterprises-developing-internal.webp";
import academicImage from "@/assets/img/Learning-Enviorment/academic-institutions-seekings.webp";

interface TargetAudience {
  image: string;
  title: string;
  description: string;
}

const targetAudiences: TargetAudience[] = [
  {
    image: assetSrc(aspiringImage),
    title: "Aspiring cybersecurity professionals.",
    description: "Individuals starting their journey in cybersecurity, seeking structured learning and hands-on experience to build foundational skills.",
  },
  {
    image: assetSrc(workingImage),
    title: "Working professionals transitioning into cyber roles.",
    description: "Experienced professionals from other fields looking to pivot into cybersecurity, needing practical training and industry-relevant skills.",
  },
  {
    image: assetSrc(advancedImage),
    title: "Advanced learners building investigative capability.",
    description: "Cybersecurity practitioners aiming to enhance their investigation and analysis skills through advanced scenarios and real-world simulations.",
  },
  {
    image: assetSrc(enterpriseImage),
    title: "Enterprises developing internal cybersecurity skills.",
    description: "Organizations building internal cybersecurity capabilities through team training and skill development programs.",
  },
  {
    image: assetSrc(academicImage),
    title: "Academic institutions seeking industry-grade virtual labs.",
    description: "Educational institutions requiring enterprise-level virtual lab environments to provide students with practical, industry-aligned training.",
  },
];

const phrases = [
  "ONE ENVIRONMENT.",
  "MULTIPLE LEARNING JOURNEYS.",
  "REAL OUTCOMES.",
];

const TypewriterText = () => {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-50px" });
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let typingTimeoutId: ReturnType<typeof setTimeout>;
    let flipTimeoutId: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      setIsTyping(true);
      setIsFlipping(false);
      setCurrentText("");
      const phrase = phrases[currentPhraseIndex];
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex < phrase.length) {
          setCurrentText(phrase.substring(0, charIndex + 1));
          charIndex++;
          typingTimeoutId = setTimeout(typeChar, 50);
        } else {
          setIsTyping(false);
          timeoutId = setTimeout(() => {
            setIsFlipping(true);
            flipTimeoutId = setTimeout(() => {
              setCurrentPhraseIndex((prev) => (prev < phrases.length - 1 ? prev + 1 : 0));
              setIsFlipping(false);
            }, 300);
          }, 2000);
        }
      };

      typeChar();
    };

    timeoutId = setTimeout(startTyping, 300);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(typingTimeoutId);
      clearTimeout(flipTimeoutId);
    };
  }, [isInView, currentPhraseIndex]);

  return (
    <div ref={textRef} className="flex min-h-10 items-center justify-center">
      <motion.span
        key={currentPhraseIndex}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={isFlipping ? { rotateX: 90, opacity: 0 } : { rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="inline-block text-sm font-semibold tracking-wide text-zinc-900 sm:text-base md:text-lg"
        style={{ transformStyle: "preserve-3d" }}
      >
        {currentText}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1 inline-block"
          >
            |
          </motion.span>
        )}
      </motion.span>
    </div>
  );
};

const WhoThisEnvironment = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          <div className="py-6 md:py-8">
            <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
              <ShinyText
                text="Who This Environment Is Built For"
                className={landingSectionHeadingClass}
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
            </TimelineContent>

            <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-medium text-zinc-700 sm:text-base md:text-lg">
              The CYBERLABS cyber learning environment supports:
            </TimelineContent>
          </div>

          <div className="grid grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
            {targetAudiences.map((audience, index) => (
              <TimelineContent
                key={audience.title}
                as="article"
                animationNum={2 + index}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="group flex flex-col p-4 transition-colors duration-300 hover:bg-zinc-50/80 sm:p-5 md:p-6"
              >
                <div className="mb-3 overflow-hidden sm:mb-4">
                  <img
                    src={assetSrc(audience.image)}
                    alt={audience.title}
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="text-sm font-semibold leading-snug text-zinc-900 sm:text-base md:text-lg">
                  {audience.title}
                </h3>
              </TimelineContent>
            ))}
          </div>

          <LandingGoalBanner
            title={<TypewriterText />}
            className="py-10 md:py-14"
          />
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default WhoThisEnvironment;
