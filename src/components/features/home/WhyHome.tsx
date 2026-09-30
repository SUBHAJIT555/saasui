import type { ReactNode, RefObject } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";
import { LandingSectionShell, homeSectionSpacingClass } from "@/components/ui/landing-section";

type ListItem = { text: string; icon: ReactNode };

const leftSectionItems: ListItem[] = [
  {
    text: "National cyber defense and intelligence operations",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 text-blue-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 10a2 2 0 0 1 1.678 .911l.053 .089h7.269l.117 .007a1 1 0 0 1 .883 .993c0 5.523 -4.477 10 -10 10a1 1 0 0 1 -1 -1v-7.269l-.089 -.053a2 2 0 0 1 -.906 -1.529l-.005 -.149a2 2 0 0 1 2 -2m9.428 -1.334a1 1 0 0 1 -1.884 .668a8 8 0 1 0 -10.207 10.218a1 1 0 0 1 -.666 1.886a10 10 0 1 1 12.757 -12.772m-4.628 -.266a1 1 0 0 1 -1.6 1.2a4 4 0 1 0 -5.6 5.6a1 1 0 0 1 -1.2 1.6a6 6 0 1 1 8.4 -8.4" />
      </svg>
    ),
  },
  {
    text: "Security Operations Centers (SOCs)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
        <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
        <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
        <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
      </svg>
    ),
  },
  {
    text: "Financial-sector and enterprise incident response",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21l18 0" /><path d="M3 10l18 0" /><path d="M5 6l7 -3l7 3" />
        <path d="M4 10l0 11" /><path d="M20 10l0 11" />
        <path d="M8 14l0 3" /><path d="M12 14l0 3" /><path d="M16 14l0 3" />
      </svg>
    ),
  },
  {
    text: "Government and critical infrastructure cyber programs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" />
        <path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" />
        <path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" />
        <path d="M6 9h12" /><path d="M3 20h7" /><path d="M14 20h7" />
        <path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12 15v3" />
      </svg>
    ),
  },
];

const rightSectionItems: ListItem[] = [
  {
    text: "Built and commanded cyber defense units",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M11.143 20.743a12 12 0 0 1 -7.643 -14.743a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3c.504 1.716 .614 3.505 .343 5.237" />
        <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138" />
      </svg>
    ),
  },
  {
    text: "Designed national-level cyber training and simulation programs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 19a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
        <path d="M18 5a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
        <path d="M10 5a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
        <path d="M6 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
        <path d="M18 19a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
        <path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
        <path d="M22 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
        <path d="M6 12h4" /><path d="M14 12h4" />
        <path d="M15 7l-2 3" /><path d="M9 7l2 3" />
        <path d="M11 14l-2 3" /><path d="M13 14l2 3" />
      </svg>
    ),
  },
  {
    text: "Responded to live cyber attacks affecting governments and enterprises",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15.04 19.745c-.942 .551 -1.964 .976 -3.04 1.255a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 .195 6.015" />
        <path d="M19 16v3" /><path d="M19 22v.01" />
      </svg>
    ),
  },
  {
    text: "Operated across Israel, the United States, and global cyber environments",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-blue-600">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M20.985 12.52a9 9 0 1 0 -7.52 8.36" />
        <path d="M3.6 9h16.8" /><path d="M3.6 15h10.9" />
        <path d="M11.5 3a17 17 0 0 0 0 18" />
        <path d="M12.5 3c2.313 3.706 3.07 7.856 2.27 12" />
        <path d="M19 16l-2 3h4l-2 3" />
      </svg>
    ),
  },
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

function CardGridBackground({ variant = "light" }: { variant?: "light" | "dark" }) {
  const lineColor = variant === "dark" ? "#52525b" : "#e5e5e5";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${lineColor} 0, ${lineColor} 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, ${lineColor} 0, ${lineColor} 1px, transparent 0, transparent 50%)`,
        backgroundSize: "6px 6px",
        opacity: variant === "dark" ? 0.35 : 0.4,
      }}
    />
  );
}

type TopicCardProps = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  items: ListItem[];
  footer?: ReactNode;
  featured?: boolean;
  animationNum: number;
  timelineRef: RefObject<HTMLDivElement | null>;
};

function TopicCard({
  eyebrow,
  title,
  intro,
  items,
  footer,
  featured = false,
  animationNum,
  timelineRef,
}: TopicCardProps) {
  return (
    <TimelineContent
      as="article"
      animationNum={animationNum}
      timelineRef={timelineRef}
      customVariants={revealVariants}
      className={cn(
        "relative flex h-full flex-col overflow-hidden border border-dashed p-7 md:p-8",
        featured
          ? "border-zinc-700 bg-zinc-900 text-white shadow-xl shadow-zinc-900/15"
          : "border-neutral-200 bg-neutral-50 shadow-sm",
      )}
    >
      <CardGridBackground variant={featured ? "dark" : "light"} />

      <div className="relative z-10">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
            featured
              ? "border-zinc-700 bg-zinc-800/80"
              : "border-dotted border-zinc-200 bg-zinc-50",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              featured ? "bg-blue-400" : "bg-blue-500",
            )}
          />
          <GradientText
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            colors={
              featured
                ? ["#a1a1aa", "#60a5fa", "#d4d4d8", "#3b82f6", "#a1a1aa"]
                : ["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]
            }
            animationSpeed={4}
            direction="horizontal"
            showBorder={false}
            pauseOnHover={false}
          >
            {eyebrow}
          </GradientText>
        </span>

        <h2 className="mt-5 text-pretty">
          <ShinyText
            text={title}
            className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl"
            color={featured ? "#e4e4e7" : "#3f3f46"}
            shineColor={featured ? "#ffffff" : "#18181b"}
            speed={3}
            spread={120}
          />
        </h2>

        <div
          className={cn(
            "mt-4 text-sm leading-relaxed md:text-base",
            featured ? "text-zinc-400" : "text-zinc-600",
          )}
        >
          {intro}
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 my-6 h-px w-full",
          featured ? "bg-zinc-800" : "bg-zinc-200",
        )}
      />

      <ul className="relative z-10 flex-1 space-y-3">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-6 sm:[&_svg]:w-6",
                featured ? "text-blue-400" : "text-blue-600",
              )}
            >
              {item.icon}
            </span>
            <span
              className={cn(
                "pt-1 text-sm font-medium leading-relaxed md:text-base",
                featured ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>

      {footer ? (
        <div
          className={cn(
            "relative z-10 mt-8 rounded-2xl border px-4 py-3.5 text-center text-sm font-medium leading-relaxed md:text-base",
            featured
              ? "border-zinc-700 bg-zinc-800/80 text-zinc-200"
              : "border-dashed border-zinc-200 bg-zinc-50 text-zinc-800",
          )}
        >
          {footer}
        </div>
      ) : null}
    </TimelineContent>
  );
}

const WhyHome = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell className={homeSectionSpacingClass}>
      <div ref={timelineRef}>
        <TimelineContent
          as="h3"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={revealVariants}
        >
          <ShinyText
            text="Why CYBERLABS INDIA is Different ?"
            className="text-2xl font-semibold  leading-tight sm:text-3xl md:text-4xl"
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <TopicCard
            eyebrow="Leadership"
            title="Led by Israeli Cyber Defense Leadership"
            intro={
              <>
                <p>
                  Cybersecurity cannot be mastered through theory or tools alone. It must be learned from those who
                  have{" "}
                  <span className="font-extrabold text-zinc-900">
                    defended real systems, under real attack, with real consequences.
                  </span>
                </p>
                <p className="mt-4">
                  Cyberlabs India is guided by an{" "}
                  <span className="font-extrabold text-zinc-900">Israeli leadership and faculty team</span> with
                  decades of experience across:
                </p>
              </>
            }
            items={leftSectionItems}
            footer={
              <>
                This is not academic cybersecurity. This is{" "}
                <span className="font-extrabold">
                  Israeli cyber defense methodology applied to global threats.
                </span>
              </>
            }
            animationNum={1}
            timelineRef={timelineRef}
          />

          <TopicCard
            eyebrow="Experience"
            title="Leadership Shaped by Real Cyber Battlefields."
            intro="The leadership behind Cyberlabs India includes professionals who have:"
            items={rightSectionItems}
            footer={
              <>
                &ldquo;This depth of experience defines how CYBERLABS INDIA trains - and why our graduates are
                different.&rdquo;
              </>
            }
            featured
            animationNum={2}
            timelineRef={timelineRef}
          />
        </div>
      </div>
    </LandingSectionShell>
  );
};

export default WhyHome;
