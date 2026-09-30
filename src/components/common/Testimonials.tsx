"use client";

import { useRef, type RefObject } from "react";
import { Quote } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utils";
import { LandingSectionShell, homeSectionSpacingClass } from "@/components/ui/landing-section";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

type Tone = "light" | "blue" | "ink";

const quotes: { quote: string; name: string; tone: Tone; className: string }[] = [
  {
    name: "Anika Shah",
    tone: "light",
    className: "lg:flex-[7]",
    quote:
      "Planning and the weekly administration finally sit in one place. We know what was agreed before any work starts.",
  },
  {
    name: "Rohan Mehta",
    tone: "blue",
    className: "lg:flex-[3]",
    quote: "The scope is written down, and so is the progress.",
  },
  {
    name: "Priya Nair",
    tone: "ink",
    className: "",
    quote: "Customer questions and the billing records are easier to follow. We pick the service that matches the work.",
  },
  {
    name: "Daniel Okonkwo",
    tone: "ink",
    className: "",
    quote: "Invoices and payment records stay with the work they belong to, instead of being rebuilt at the end of the month.",
  },
  {
    name: "Lena Vogt",
    tone: "ink",
    className: "",
    quote: "Milestones are reported as the work moves. The update is part of the engagement, not a separate chase.",
  },
  {
    name: "Marcus Hale",
    tone: "blue",
    className: "lg:flex-[3]",
    quote: "The month of administration has a clear owner.",
  },
  {
    name: "Sofia Alvarez",
    tone: "light",
    className: "lg:flex-[7]",
    quote:
      "We start with one service and add another only when the scope is separate. Each payment purpose stays attached to that work.",
  },
];

function QuoteMark({ tone }: { tone: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
        tone === "light" && "bg-surface-soft text-brand-accent",
        tone === "blue" && "bg-white/15 text-on-primary",
        tone === "ink" && "bg-white/10 text-on-primary",
      )}
    >
      <Quote className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}

function QuoteCard({
  quote,
  name,
  tone,
  className,
  animationNum,
  timelineRef,
}: {
  quote: string;
  name: string;
  tone: Tone;
  className?: string;
  animationNum: number;
  timelineRef: RefObject<HTMLDivElement | null>;
}) {
  const light = tone === "light";

  return (
    <TimelineContent
      as="blockquote"
      animationNum={animationNum}
      timelineRef={timelineRef}
      customVariants={revealVariants}
      className={cn(
        "relative flex flex-col justify-end overflow-hidden rounded-lg border border-hairline p-5",
        light && "bg-canvas text-ink",
        tone === "blue" && "bg-brand-accent text-on-primary",
        tone === "ink" && "bg-ink text-on-primary",
        className,
      )}
    >
      {light ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          aria-hidden
        />
      ) : null}
      <p className={cn("relative text-copy leading-relaxed", light ? "text-body" : "text-on-primary")}>&ldquo;{quote}&rdquo;</p>
      <footer className="relative mt-5 flex items-end justify-between gap-4">
        <p className={cn("text-title-sm font-semibold", light ? "text-ink" : "text-on-primary")}>{name}</p>
        <QuoteMark tone={tone} />
      </footer>
    </TimelineContent>
  );
}

export default function Testimonials() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [first, second, third, fourth, fifth, sixth, seventh] = quotes;

  return (
    <LandingSectionShell id="testimonials" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <div className="mx-auto max-w-2xl text-center">
          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="text-section text-ink"
          >
            What teams say about the work
          </TimelineContent>
          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="mt-3 text-copy text-body"
          >
            Planning, records, documents, projects, billing, and customer communication, each kept to the service that was agreed.
          </TimelineContent>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2 lg:h-full">
            <QuoteCard {...first} animationNum={2} timelineRef={timelineRef} />
            <QuoteCard {...second} animationNum={3} timelineRef={timelineRef} />
          </div>
          <div className="flex flex-col gap-2">
            <QuoteCard {...third} animationNum={4} timelineRef={timelineRef} />
            <QuoteCard {...fourth} animationNum={5} timelineRef={timelineRef} />
            <QuoteCard {...fifth} animationNum={6} timelineRef={timelineRef} />
          </div>
          <div className="flex flex-col gap-2 lg:h-full">
            <QuoteCard {...sixth} animationNum={7} timelineRef={timelineRef} />
            <QuoteCard {...seventh} animationNum={8} timelineRef={timelineRef} />
          </div>
        </div>

        
      </div>
    </LandingSectionShell>
  );
}
