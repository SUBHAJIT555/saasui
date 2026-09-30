import { useRef, type ReactNode } from "react";
import { parseBoldText, assetSrc } from "@/lib/utils";
import howSvg from "@/assets/img/AboutPageImages/how.svg";
import whoSvg from "@/assets/img/AboutPageImages/who.svg";
import whatnotdoSvg from "@/assets/img/AboutPageImages/whatnotdo.svg";
import whoCyberlabs from "@/assets/img/AboutPageImages/whoCyberlabs.svg";
import closingImage from "@/assets/img/AboutPageImages/closingImage.svg";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoRow,
  LandingBentoCell,
  LandingBorderedIconList,
  LandingBrickIconChips,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";
import { cn } from "@/lib/utils";

const CubePlusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cube-plus h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M21 12.5v-4.509a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.007c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0" />
      <path d="M12 22v-10" />
      <path d="M12 12l8.73 -5.04" />
      <path d="M3.27 6.96l8.73 5.04" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </svg>
);

const SitemapIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-sitemap h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" />
      <path d="M15 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" />
      <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -2" />
      <path d="M6 15v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" />
      <path d="M12 9l0 3" />
    </svg>
);

const GitBranchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-git-branch h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M5 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M15 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M7 8l0 8" />
      <path d="M9 18h6a2 2 0 0 0 2 -2v-5" />
      <path d="M14 14l3 -3l3 3" />
    </svg>
);

const ClockPlayIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-play h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 7v5l2 2" />
      <path d="M17 22l5 -3l-5 -3l0 6" />
      <path d="M13.017 20.943a9 9 0 1 1 7.831 -7.292" />
    </svg>
);

const Server2Icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-server-2 h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-2" />
      <path d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2" />
      <path d="M7 8l0 .01" />
      <path d="M7 16l0 .01" />
      <path d="M11 8h6" />
      <path d="M11 16h6" />
    </svg>
);

const BoltIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bolt h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
    </svg>
);

const UserStarIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-star h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
      <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138" />
    </svg>
);

const BuildingBankIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 21l18 0" />
      <path d="M3 10l18 0" />
      <path d="M5 6l7 -3l7 3" />
      <path d="M4 10l0 11" />
      <path d="M20 10l0 11" />
      <path d="M8 14l0 3" />
      <path d="M12 14l0 3" />
      <path d="M16 14l0 3" />
    </svg>
);

const FileTextIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-text h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
      <path d="M9 9l1 0" />
      <path d="M9 13l6 0" />
      <path d="M9 17l6 0" />
    </svg>
);

const IdBadgeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-id-badge h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 6a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3l0 -12" />
      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M10 6h4" />
      <path d="M9 18h6" />
    </svg>
);

const HourglassIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-hourglass h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6.5 7h11" />
      <path d="M6.5 17h11" />
      <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1" />
      <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1" />
    </svg>
);

const SpeakerphoneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-speakerphone h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 8a3 3 0 0 1 0 6" />
      <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
      <path d="M12 8l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
    </svg>
);

const UserPlusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
    </svg>
);

const RepeatIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-repeat h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
      <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" />
    </svg>
);

const StackFrontIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-stack-front h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 4l-8 4l8 4l8 -4l-8 -4" fill="currentColor" />
      <path d="M8 14l-4 2l8 4l8 -4l-4 -2" />
      <path d="M8 10l-4 2l8 4l8 -4l-4 -2" />
    </svg>
);

const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
);

const WorldIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-world h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
    </svg>
);

const SettingsCodeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-settings-code h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M11.482 20.924a1.666 1.666 0 0 1 -1.157 -1.241a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.312 .318 1.644 1.794 .995 2.697" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M20 21l2 -2l-2 -2" />
      <path d="M17 17l-2 2l2 2" />
    </svg>
);

const SquareRoundedCheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-check h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 12l2 2l4 -4" />
      <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
    </svg>
);

const AwardIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-award h-5 w-5 shrink-0 text-blue-600">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
      <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" />
      <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />
    </svg>
);

const howTrainsListItems = [
  { text: "Simulation-driven cyber environments.", icon: CubePlusIcon },
  { text: "Scenario-based exercises.", icon: SitemapIcon },
  { text: "Investigation-led workflows.", icon: GitBranchIcon },
  { text: "Instructor-guided, real-time sessions.", icon: ClockPlayIcon },
];

const whoLeadsListItems = [
  { text: "Defended real systems.", icon: Server2Icon },
  { text: "Handled live cyber incidents.", icon: BoltIcon },
  { text: "Led investigations and response teams.", icon: UserStarIcon },
  { text: "Built cybersecurity capabilities at enterprise and national levels.", icon: BuildingBankIcon },
];

const doesNotDoListItems = [
  { text: "Slide-based instruction.", icon: FileTextIcon },
  { text: "Exam-only credentialing.", icon: IdBadgeIcon },
  { text: "Short-term certification programs.", icon: HourglassIcon },
  { text: "Marketing-led education models.", icon: SpeakerphoneIcon },
];

const whoBuiltForListItems = [
  { text: "Aspiring cybersecurity professionals.", icon: UserPlusIcon },
  { text: "Career switchers seeking serious, structured entry.", icon: RepeatIcon },
  { text: "Working professionals advancing into complex cyber roles.", icon: StackFrontIcon },
  { text: "Organizations seeking operationally ready talent.", icon: UserIcon },
];

const closingListItems = [
  { text: "Real-world relevance.", icon: WorldIcon },
  { text: "Operational rigor.", icon: SettingsCodeIcon },
  { text: "Accountability.  ", icon: SquareRoundedCheckIcon },
  { text: "Long-term professional credibility.", icon: AwardIcon },
];

function MergedBentoBlock({ children }: { children: ReactNode }) {
  return <div className="max-md:divide-y max-md:divide-zinc-200">{children}</div>;
}

function SectionImage({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return (
    <img
      src={assetSrc(src)}
      alt={alt}
      className={cn(
        "mx-auto h-auto w-full max-w-[420px] sm:max-w-[480px] md:max-w-none lg:max-w-md",
        className,
      )}
    />
  );
}

const AboutTrainsWhoClosing = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const howTrainsBody = (
    <>
      <TimelineContent as="p" animationNum={1} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        {parseBoldText(
          "CYBERLABS training is built around **execution**, **investigation**, and **accountability**.",
        )}
      </TimelineContent>
      <TimelineContent as="p" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-blue-600 md:text-base">
        Learners train inside:
      </TimelineContent>
      <TimelineContent as="div" animationNum={3} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBorderedIconList items={howTrainsListItems} />
      </TimelineContent>
      <TimelineContent as="p" animationNum={4} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        {parseBoldText(
          "Learning is continuous, hands-on, and measured against **operational outcomes**, not attendance.",
        )}
      </TimelineContent>
    </>
  );

  const whoLeadsBody = (
    <>
      <TimelineContent as="p" animationNum={7} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-blue-600 md:text-base">
        CYBERLABS programs are led and delivered by professionals who have:
      </TimelineContent>
      <TimelineContent as="div" animationNum={8} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBorderedIconList items={whoLeadsListItems} />
      </TimelineContent>
      <TimelineContent as="p" animationNum={9} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        CYBERLABS does not rely on classroom-only trainers.
      </TimelineContent>
      <TimelineContent as="p" animationNum={10} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
        {parseBoldText("Instruction is grounded in **experience**, not theory.")}
      </TimelineContent>
    </>
  );

  const doesNotDoBody = (
    <>
      <TimelineContent as="p" animationNum={12} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm font-semibold text-blue-600 md:text-base">
        To be clear, CYBERLABS does not focus on:
      </TimelineContent>
      <TimelineContent as="div" animationNum={13} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBorderedIconList items={doesNotDoListItems} />
      </TimelineContent>
      <TimelineContent as="p" animationNum={14} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        {parseBoldText("Our focus is **operational readiness**.")}
      </TimelineContent>
    </>
  );

  const whoBuiltForBody = (
    <>
      <TimelineContent as="p" animationNum={17} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        {parseBoldText(
          "CYBERLABS is built for individuals and organizations that value **real capability** over **superficial credentials**, including:",
        )}
      </TimelineContent>
      <TimelineContent as="div" animationNum={18} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBorderedIconList items={whoBuiltForListItems} />
      </TimelineContent>
      <TimelineContent
        as="p"
        animationNum={19}
        timelineRef={timelineRef}
        customVariants={landingRevealVariants}
        className="mt-6 border-t border-dashed border-zinc-200 pt-4 text-sm font-semibold leading-relaxed text-zinc-900 md:text-base"
      >
        {parseBoldText(
          "If you are serious about building a **long-term career** in cybersecurity, CYBERLABS is built for you.",
        )}
      </TimelineContent>
    </>
  );

  const closingBody = (
    <>
      <TimelineContent as="p" animationNum={21} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-6 text-sm font-semibold text-blue-600 md:text-base">
        A standard defined by:
      </TimelineContent>
      <TimelineContent as="div" animationNum={22} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4">
        <LandingBrickIconChips items={closingListItems} />
      </TimelineContent>
      <TimelineContent as="p" animationNum={23} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
        <span className="font-bold text-blue-600">CYBERLABS</span> was built by people who have{" "}
        <span className="font-semibold text-zinc-900">carried responsibility</span>, not just credentials — and it trains professionals to do the same.
      </TimelineContent>
    </>
  );

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <LandingBento>
          {/* How CYBERLABS Trains — mobile: heading → image → content; desktop: text | image */}
          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="md:px-0 md:pr-8">
                <TimelineContent as="h2" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="How CYBERLABS Trains"
                    className={cn(landingSectionHeadingClass)}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{howTrainsBody}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
                <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={howSvg} />
                </TimelineContent>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{howTrainsBody}</div>
          </MergedBentoBlock>

          {/* Who Leads & Teaches — mobile: heading → image → content; desktop: image | text */}
          <MergedBentoBlock>
            <LandingBentoRow className="md:divide-x-0">
              <LandingBentoCell className="order-2 flex items-center justify-center md:order-0 md:px-0 md:pr-8">
                <TimelineContent as="div" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={whoSvg} />
                </TimelineContent>
              </LandingBentoCell>
              <LandingBentoCell className="order-1 md:order-0 md:px-0 md:pl-8">
                <TimelineContent as="h2" animationNum={6} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Who Leads & Teaches"
                    className={cn(landingSectionHeadingClass)}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{whoLeadsBody}</div>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{whoLeadsBody}</div>
          </MergedBentoBlock>

          {/* What CYBERLABS Does Not Do — mobile: heading → image → content; desktop: text | image */}
          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="md:px-0 md:pr-8">
                <TimelineContent as="h2" animationNum={11} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="What CYBERLABS Does Not Do"
                    className={cn(landingSectionHeadingClass)}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{doesNotDoBody}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
                <TimelineContent as="div" animationNum={11} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage src={whatnotdoSvg} />
                </TimelineContent>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{doesNotDoBody}</div>
          </MergedBentoBlock>

          {/* Who CYBERLABS Is Built For — mobile: heading → image → content; desktop: image | text */}
          <MergedBentoBlock>
            <LandingBentoRow className="md:divide-x-0">
              <LandingBentoCell className="order-2 flex items-center justify-center md:order-0 md:px-0 md:pr-8">
                <TimelineContent as="div" animationNum={15} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <SectionImage
                    src={whoCyberlabs}
                    alt="Aspiring professionals"
                    className="rounded-lg object-cover"
                  />
                </TimelineContent>
              </LandingBentoCell>
              <LandingBentoCell className="order-1 md:order-0 md:px-0 md:pl-8">
                <TimelineContent as="h2" animationNum={16} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="Who CYBERLABS Is Built For"
                    className={landingSectionHeadingClass}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{whoBuiltForBody}</div>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{whoBuiltForBody}</div>
          </MergedBentoBlock>

          {/* Closing Perspective — mobile: heading → image → content; desktop: text | image */}
          <MergedBentoBlock>
            <LandingBentoRow>
              <LandingBentoCell className="md:px-0 md:pr-8">
                <TimelineContent as="h2" animationNum={20} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <ShinyText
                    text="CYBERLABS represents a different standard in cybersecurity education."
                    className={cn(landingSectionHeadingClass, "capitalize")}
                    color="#3f3f46"
                    shineColor="#18181b"
                    speed={3}
                    spread={120}
                  />
                </TimelineContent>
                <div className="hidden md:block">{closingBody}</div>
              </LandingBentoCell>
              <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
                <TimelineContent as="div" animationNum={20} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                  <img
                    src={assetSrc(closingImage)}
                    alt="Closing Image"
                    className="mx-auto h-auto w-full max-w-[200px] rounded-lg object-cover sm:max-w-[240px] md:w-[200px] md:max-w-none lg:w-[260px]"
                  />
                </TimelineContent>
              </LandingBentoCell>
            </LandingBentoRow>
            <div className="px-0 py-6 md:hidden">{closingBody}</div>
          </MergedBentoBlock>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default AboutTrainsWhoClosing;
