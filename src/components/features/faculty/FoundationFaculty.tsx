import { useRef } from "react";
import { parseBoldText } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import { Terminal } from "@/components/ui/terminal";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingBorderedIconList,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const AlertSquareIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const SearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </svg>
);

const ShieldLockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
    <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M12 12l0 2.5" />
  </svg>
);

const TargetIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  </svg>
);

const facultyListItems = [
  { text: "Operate under uncertainty.", icon: AlertSquareIcon },
  { text: "Investigate complex, multi-layered incidents.", icon: SearchIcon },
  { text: "Design defenses that survive real attackers.", icon: ShieldLockIcon },
  { text: "Be accountable for outcomes, not theory.", icon: TargetIcon },
];

const foundationTerminalCommands = [
  "cyberlabs soc --init --region il",
  "threat-hunt --ioc $ALERT_ID --depth 3",
  "incident-response --case IR-2847 --status active",
  "cyberlabs certify --operator readiness-check",
];

const foundationTerminalOutputs: Record<number, string[]> = {
  0: [
    "✔ SOC environment loaded. Live telemetry connected.",
    "✔ Israeli operational playbook applied.",
  ],
  1: [
    "✔ Hunt completed. 2 lateral movement paths identified.",
    "→ Escalated to investigation workflow.",
  ],
  2: [
    "✔ Case IR-2847: containment actions verified.",
    "✔ Attribution indicators logged.",
  ],
  3: [
    "✔ Operator readiness verified.",
    "✔ CYBERLABS standard met.",
  ],
};

const FoundationFaculty = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <ShinyText
            text="Israel-Founded Cybersecurity DNA"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <LandingBento className="mt-8">
          <LandingBentoRow>
            <LandingBentoCell className="md:px-0 md:pr-8">
              <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="text-sm font-semibold leading-relaxed text-zinc-800 md:text-base lg:text-lg">
                {parseBoldText(
                  "**CYBERLABS** was founded in Israel, one of the world's most advanced cybersecurity ecosystems, where cyber defense is inseparable from national security, intelligence operations, and real adversarial pressure.",
                )}
              </TimelineContent>

              <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-zinc-900 md:text-base">
                This environment produces professionals trained to:
              </TimelineContent>

              <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
                <LandingBorderedIconList items={facultyListItems} />
              </TimelineContent>

              <TimelineContent as="p" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
                This DNA defines how <span className="font-bold text-blue-600">CYBERLABS</span> trains, evaluates, and certifies cybersecurity professionals globally, under the governance of <span className="font-semibold text-zinc-900">CYBERLABS USA</span>.
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
              <TimelineContent as="div" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="w-full">
                <div className="sticky top-24 mx-auto w-full max-w-xl">
                  <Terminal
                    username="CYBERLABS-OPS"
                    title="CYBERLABS-OPS — soc-console"
                    commands={foundationTerminalCommands}
                    outputs={foundationTerminalOutputs}
                    typingSpeed={42}
                    delayBetweenCommands={900}
                  />
                </div>
              </TimelineContent>
            </LandingBentoCell>
          </LandingBentoRow>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default FoundationFaculty;
