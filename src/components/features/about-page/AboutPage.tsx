"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { assetSrc } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel, GgwButton } from "@/components/ui/ggw-button";
import CallToAction from "@/components/common/CallToAction";
import Testimonials from "@/components/common/Testimonials";
import {
  LandingSectionShell,
  landingRevealVariants,
  homeSectionSpacingClass,
} from "@/components/ui/landing-section";
import { siteRoutes } from "@/config/routes";
import aboutImage from "@/assets/img/Home/undraw/getting-organized_lyqo.svg";
import faqImage from "@/assets/img/Home/undraw/shared-goals_ijlg.svg";

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

const HERO_SCENE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=80";

function AboutHero() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={timelineRef} className="relative isolate overflow-hidden bg-canvas pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-120 w-[calc(100%-6px)] overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 50%)",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 50%)",
        }}
      >
        <img src={HERO_SCENE} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <TimelineContent
          as="h1"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="max-w-[22ch] text-balance text-hero text-ink md:max-w-[28ch]"
        >
          Support that stays{" "}
          <span className="bg-brand-accent px-1.5 text-on-primary">tied to the work</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-[56ch] text-pretty text-copy text-body"
        >
          We help with the operational work behind a business: planning, records, documents, projects, invoices, and customer communication.
        </TimelineContent>
        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <GgwButton href={siteRoutes.services} variant="accent" className="h-11 px-5">
            View services
            <ArrowRight className="h-4 w-4" />
          </GgwButton>
          <GgwButton href={siteRoutes.contact} variant="secondary" className="h-11 px-5">
            Contact
          </GgwButton>
        </TimelineContent>
      </div>
    </section>
  );
}

function AboutIntro() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="about" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-0">
        <div className="lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>About</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 max-w-md text-section text-ink"
          >
            The work behind the business, handled with a clear scope.
          </TimelineContent>
          <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-8">
            <img
              src={assetSrc(aboutImage)}
              alt="A person organizing work on a planning board"
              className="h-auto w-full max-w-[340px] object-contain"
            />
          </TimelineContent>
        </div>
        <div className="space-y-4 lg:border-l lg:border-dashed lg:border-hairline lg:pl-12">
          <TimelineContent
            as="p"
            animationNum={3}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="text-copy font-medium text-brand-accent"
          >
            Businesses need more than advice on a slide.
          </TimelineContent>
          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="space-y-4 text-copy leading-relaxed text-body"
          >
            <p>
              They need planning written down, records kept current, documents prepared, projects coordinated, invoices tracked, and customer questions answered.
            </p>
            <p>
              Each service is a defined piece of that work. You choose what you need, agree the deliverables, and the payment purpose stays attached to it — from a consultation fee to a contracted support fee.
            </p>
          </TimelineContent>
          <TimelineContent as="div" animationNum={5} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <GgwButton href={siteRoutes.services} variant="accent" className="mt-2 h-11 px-5">
              View the six services
              <ArrowRight className="h-4 w-4" />
            </GgwButton>
          </TimelineContent>
        </div>
      </div>
    </LandingSectionShell>
  );
}

const missionPoints = [
  "Six services, each with a defined kind of work",
  "A payment purpose agreed before delivery starts",
  "Records, documents, and files kept in order",
  "Progress you can review as the work moves",
  "Scope that stays clear from the first conversation",
];

const visionPoints = [
  "Planning and advice when a decision needs structure",
  "Administration that stays current week to week",
  "Documents and invoices that are easy to find",
  "Projects that report progress on time",
  "Customer enquiries that are tracked and answered",
];

function CheckItem({ children, onBlue }: { children: string; onBlue?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={
          onBlue
            ? "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/70 text-on-primary"
            : "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-accent text-brand-accent"
        }
      >
        <Check className="h-3 w-3" strokeWidth={2.5} />
      </span>
      <span className={onBlue ? "text-sm leading-relaxed text-on-primary" : "text-sm leading-relaxed text-body"}>
        {children}
      </span>
    </li>
  );
}

function AboutWhy() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="why-choose-us" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <AccentLabel>Why choose us</AccentLabel>
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 max-w-3xl text-section text-ink"
        >
          A clear way to work, and a clear result
        </TimelineContent>

        <div className="mt-10 grid grid-cols-1 gap-4  md:grid-cols-2">
          <TimelineContent
            as="article"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="border-b border-r border border-hairline bg-canvas p-6 md:p-8 rounded-lg shadow-sm"
          >
            <h3 className="text-title-sm text-ink md:text-xl">Mission</h3>
            <p className="mt-3 text-copy text-body">
              Keep the operational work organized, and agreed, before it starts.
            </p>
            <ul className="mt-6 space-y-4">
              {missionPoints.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </TimelineContent>
          <TimelineContent
            as="article"
            animationNum={3}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="border-b border-r border border-hairline bg-brand-accent p-6 text-on-primary md:p-8 rounded-lg shadow-sm"
          >
            <h3 className="text-title-sm md:text-xl">Vision</h3>
            <p className="mt-3 text-copy text-white/90">
              Make day-to-day operations easier to run without losing the record of the work.
            </p>
            <ul className="mt-6 space-y-4">
              {visionPoints.map((item) => (
                <CheckItem key={item} onBlue>
                  {item}
                </CheckItem>
              ))}
            </ul>
          </TimelineContent>
        </div>
      </div>
    </LandingSectionShell>
  );
}

const faqItems: { question: string; answer: ReactNode }[] = [
  {
    question: "What services are available?",
    answer: (
      <p>
        Business consultancy, administrative support, documentation, project and operational support, billing and invoice management, and customer and business support. Each service has its own page.
      </p>
    ),
  },
  {
    question: "How is payment described?",
    answer: (
      <p>
        Every service has a payment purpose: a consultation fee, a monthly service fee, a document processing fee, a project milestone payment, an invoice management fee, or a contracted support fee. That purpose is what you see at checkout.
      </p>
    ),
  },
  {
    question: "Can we start with one service?",
    answer: (
      <p>
        Yes. Choose the service that matches the work, agree the scope, and continue to checkout with that payment purpose already selected.
      </p>
    ),
  },
  {
    question: "When does the work start?",
    answer: (
      <p>
        After the scope and the payment purpose are agreed. Nothing is treated as started from a browse of the service list alone.
      </p>
    ),
  },
  {
    question: "What do we receive at the end of an engagement?",
    answer: (
      <p>
        The deliverables that were agreed: plans, organized records, prepared documents, project updates, billing records, or a handled set of customer enquiries, plus a clear note of what was completed.
      </p>
    ),
  },
  {
    question: "How do we get in touch?",
    answer: (
      <p>
        Use the contact page to describe the service you need. You can also open a service and continue to checkout when the scope is already clear.
      </p>
    ),
  },
];

function AboutFaq() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <LandingSectionShell id="faq" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-0">
        <div className="lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>FAQ</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 max-w-sm text-section text-ink"
          >
            Questions about the work
          </TimelineContent>
          <TimelineContent as="div" animationNum={2} timelineRef={timelineRef} customVariants={landingRevealVariants} className="mt-8">
            <img src={assetSrc(faqImage)} alt="" className="h-auto w-full max-w-sm object-contain object-left" />
          </TimelineContent>
        </div>
        <TimelineContent
          as="div"
          animationNum={3}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="border-t border-dashed border-hairline lg:border-l lg:border-t-0 lg:pl-12"
        >
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            const last = index === faqItems.length - 1;
            return (
              <div key={item.question} className={last ? "" : "border-b border-dashed border-hairline"}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className={open ? "text-title-sm text-ink" : "text-title-sm font-medium text-body"}>
                    {item.question}
                  </span>
                  <span
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-lg leading-none text-ink"
                    aria-hidden
                  >
                    {open ? "–" : "+"}
                  </span>
                </button>
                <div className={open ? "grid grid-rows-[1fr] transition-all duration-300" : "grid grid-rows-[0fr] transition-all duration-300"}>
                  <div className="overflow-hidden">
                    <div className="pb-4 pr-10 text-copy leading-relaxed text-body">{item.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
}

export default function AboutPage() {
  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <AboutHero />
      <AboutIntro />
      <AboutWhy />
      <Testimonials />
      <AboutFaq />
      <CallToAction />
    </div>
  );
}
