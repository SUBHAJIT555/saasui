"use client";

import { useRef, type ComponentType } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  FileText,
  FolderOpen,
  Headset,
  Kanban,
  MessagesSquare,
  Receipt,
} from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel } from "@/components/ui/ggw-button";
import {
  LandingSectionShell,
  homeSectionSpacingClass,
  landingRevealVariants,
} from "@/components/ui/landing-section";
import { cn } from "@/lib/utils";

const letterEase = [0.33, 1, 0.68, 1] as const;

const serviceMarks: {
  label: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { label: "Plan", Icon: Briefcase },
  { label: "Records", Icon: ClipboardList },
  { label: "Docs", Icon: FileText },
  { label: "Projects", Icon: Kanban },
  { label: "Invoices", Icon: Receipt },
  { label: "Clients", Icon: MessagesSquare },
];

const pipelineSteps: {
  id: string;
  label: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { id: "01", label: "TALK", Icon: Headset },
  { id: "02", label: "AGREE", Icon: ClipboardCheck },
  { id: "03", label: "PREPARE", Icon: FolderOpen },
  { id: "04", label: "REPORT", Icon: BarChart3 },
  { id: "05", label: "CLOSE", Icon: CircleCheck },
];

const cardClass =
  "group relative flex flex-col overflow-hidden  shadow-sm  bg-canvas p-5 sm:p-6 md:p-7";

function HoverTitle({ text, className }: { text: string; className?: string }) {
  const letters = text.split("");

  return (
    <h3 className={cn("relative mb-2 overflow-hidden font-semibold text-ink", className)}>
      <span className="flex flex-wrap">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block"
            variants={{ initial: { y: 0 }, hover: { y: "-100%" } }}
            transition={{ duration: 0.3, delay: index * 0.02, ease: letterEase }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
      <span className="pointer-events-none absolute inset-0 flex flex-wrap text-brand-accent" aria-hidden>
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-hover-${index}`}
            className="inline-block"
            variants={{ initial: { y: "100%" }, hover: { y: 0 } }}
            transition={{ duration: 0.3, delay: index * 0.02, ease: letterEase }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
    </h3>
  );
}

function OverviewBoxes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 170" className={className} aria-hidden>
      <g transform="translate(18,28)">
        <polygon points="70,8 140,42 70,76 0,42" fill="#dbeafe" />
        <polygon points="0,42 70,76 70,128 0,94" fill="#2563eb" />
        <polygon points="70,76 140,42 140,94 70,128" fill="#1d4ed8" />
      </g>
      <g transform="translate(108,8)">
        <polygon points="62,10 124,40 62,70 0,40" fill="#eff6ff" />
        <polygon points="0,40 62,70 62,112 0,82" fill="#60a5fa" />
        <polygon points="62,70 124,40 124,82 62,112" fill="#2563eb" />
      </g>
    </svg>
  );
}

function OverviewLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 150" className={className} aria-hidden>
      <g transform="translate(24,18)">
        <polygon points="80,0 160,36 80,72 0,36" fill="#dbeafe" />
        <polygon points="0,36 80,72 80,96 0,60" fill="#93c5fd" />
        <polygon points="80,72 160,36 160,60 80,96" fill="#60a5fa" />
      </g>
      <g transform="translate(48,46)">
        <polygon points="80,0 160,36 80,72 0,36" fill="#eff6ff" />
        <polygon points="0,36 80,72 80,100 0,64" fill="#2563eb" />
        <polygon points="80,72 160,36 160,64 80,100" fill="#1d4ed8" />
      </g>
    </svg>
  );
}

const HomeCompany = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="company" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <AccentLabel>Company overview</AccentLabel>
        </TimelineContent>
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 max-w-3xl"
        >
          <h2 className="text-section text-ink">The operational work, kept in one place.</h2>
        </TimelineContent>

        <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-8">
          <div className="grid auto-rows-auto grid-cols-1 gap-3 md:grid-cols-3 md:gap-3.5">
            <motion.div initial="initial" whileHover="hover" className={cn(cardClass, "min-h-[170px] justify-center md:col-span-2")}>
              <div className="pointer-events-none absolute right-2 top-1/2 z-10 hidden w-52 -translate-y-1/2 sm:block md:w-60 lg:right-6 lg:w-72">
                <OverviewBoxes className="h-auto w-full" />
              </div>
              <div className="relative z-20 w-full sm:w-3/5">
                <HoverTitle text="Operational work" className="text-xl md:text-2xl" />
                <p className="text-sm leading-relaxed text-body md:text-base">
                  Planning, administration, documents, projects, invoices, and customer communication. Six services, each a defined piece of work.
                </p>
              </div>
            </motion.div>

            <div className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden bg-brand-accent p-5 text-on-primary sm:min-h-[360px] sm:p-6 md:col-span-1 md:row-span-2 md:p-7">
              <div className="relative z-10 mb-4 flex min-h-[150px] items-center justify-center">
                <div className="relative aspect-4/3 w-full max-w-[200px] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                  <div className="absolute inset-0 translate-x-3 translate-y-3 -rotate-12 rounded-xl border border-white/20 bg-blue-900/40 shadow-xl transition-transform duration-300 group-hover:-translate-x-5 group-hover:translate-y-5 group-hover:-rotate-20" />
                  <div className="absolute inset-0 translate-x-2 translate-y-2 -rotate-6 rounded-xl border border-white/25 bg-blue-800/50 shadow-xl transition-transform duration-300 group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-12" />
                  <div className="absolute inset-0 translate-x-1 translate-y-1 -rotate-3 rounded-xl border border-white/30 bg-blue-300/80 shadow-xl transition-transform duration-300 group-hover:-rotate-6" />
                  <div className="absolute inset-0 flex flex-col justify-between rounded-xl border border-white/60 bg-white p-4 text-ink shadow-2xl">
                    <div className="flex gap-0.5">
                      <span className="h-3 w-2 rounded-sm bg-blue-600" />
                      <span className="h-3 w-1 rounded-sm bg-blue-600" />
                      <span className="h-3 w-2 rounded-sm bg-blue-200" />
                    </div>
                    <p className="mt-auto mb-2 font-mono text-lg font-bold leading-tight tracking-tight sm:text-xl">
                      Scope.
                      <br />
                      Records.
                      <br />
                      Delivery.
                    </p>
                    <p className="flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider text-muted">
                      <span>&gt; AGREED BEFORE WORK</span>
                      <span className="animate-pulse">_</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="mb-1.5 text-lg font-semibold sm:text-xl">From the first conversation</h3>
                <p className="text-sm leading-relaxed text-white/85">
                  The scope and the payment purpose are agreed before anything starts, and the result stays written down.
                </p>
              </div>
              <div className="pointer-events-none absolute -bottom-12 -right-6 select-none text-[9rem] font-bold leading-none text-white/10 transition-transform duration-700 group-hover:scale-105 sm:text-[11rem]">
                02
              </div>
            </div>

            <motion.div initial="initial" whileHover="hover" className={cn(cardClass, "min-h-[170px] justify-between")}>
              <div className="relative z-10 mb-4 flex h-11 items-center">
                {serviceMarks.map(({ label, Icon }, index) => (
                  <motion.div
                    key={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-brand-accent ring-2 ring-white shadow-sm"
                    style={{ marginLeft: index === 0 ? 0 : -10, zIndex: serviceMarks.length - index }}
                    variants={{
                      initial: { x: 0, y: 0, rotate: 0, scale: 1 },
                      hover: {
                        x: index * 14,
                        y: index % 2 === 0 ? -4 : 4,
                        rotate: (index - 2) * 6,
                        scale: 1.08,
                      },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    title={label}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </motion.div>
                ))}
              </div>
              <div className="relative z-10">
                <h3 className="mb-1.5 text-lg font-semibold text-ink sm:text-xl">Six services, one way of working</h3>
                <p className="text-sm leading-relaxed text-body">
                  Consultancy, administration, documentation, project support, billing, and customer communication. Each one keeps its own scope.
                </p>
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-3 select-none text-[6rem] font-bold leading-none text-zinc-100 transition-transform duration-700 group-hover:scale-105 sm:text-[8rem]">
                03
              </div>
            </motion.div>

            <motion.div initial="initial" whileHover="hover" className={cn(cardClass, "min-h-[170px] justify-between")}>
              <div className="relative z-10 mb-4 w-full">
                <div className="flex items-start justify-between gap-1">
                  {pipelineSteps.map(({ id, label, Icon }, index) => (
                    <div key={id} className="flex items-start gap-1">
                      <div className="flex flex-col items-center gap-1">
                        <span className="relative text-ink">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                          {index === pipelineSteps.length - 1 ? <span className="absolute -inset-1 animate-ping rounded-full bg-blue-600/20" /> : null}
                        </span>
                        <span className="font-mono text-[7px] font-bold tracking-widest text-body sm:text-[8px]">{label}</span>
                      </div>
                      {index < pipelineSteps.length - 1 ? (
                        <ChevronRight className="mt-0.5 h-3 w-3 text-zinc-300 transition-colors duration-300 group-hover:text-brand-accent" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="mb-1.5 text-lg font-semibold text-ink sm:text-xl">Nothing starts early</h3>
                <p className="text-sm leading-relaxed text-body">
                  Talk through the work, agree the scope, prepare what was promised, share progress, and close with a record of what was completed.
                </p>
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-3 select-none text-[6rem] font-bold leading-none text-zinc-100 transition-transform duration-700 group-hover:scale-105 sm:text-[8rem]">
                04
              </div>
            </motion.div>

            <motion.div initial="initial" whileHover="hover" className={cn(cardClass, "min-h-[170px] justify-center md:col-span-3")}>
              <div className="pointer-events-none absolute bottom-0 right-2 z-10 hidden w-56 sm:block md:right-10 md:w-72 lg:w-80">
                <OverviewLayers className="h-auto w-full" />
              </div>
              <div className="relative z-20 w-full sm:w-3/5">
                <h3 className="mb-2 text-xl font-semibold text-ink md:text-2xl">Payment stays with the work</h3>
                <p className="max-w-xl text-sm leading-relaxed text-body md:text-base">
                  A consultation fee, a monthly service fee, a document processing fee, a project milestone payment, an invoice management fee, or a contracted support fee.
                </p>
              </div>
              <div className="pointer-events-none absolute -bottom-12 -right-4 z-0 select-none text-[8rem] font-bold leading-none text-zinc-100 transition-transform duration-700 group-hover:scale-105 sm:text-[10rem]">
                05
              </div>
            </motion.div>
          </div>
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
};

export default HomeCompany;
