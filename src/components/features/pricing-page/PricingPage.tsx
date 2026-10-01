"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ClipboardList,
  FileText,
  Headset,
  Lightbulb,
  Pencil,
  Receipt,
  ShoppingCart,
  Star,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { assetSrc, cn } from "@/lib/utils";
import { Link } from "@/lib/react-router";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { AccentLabel, GgwButton } from "@/components/ui/ggw-button";
import CallToAction from "@/components/common/CallToAction";
import {
  LandingSectionShell,
  landingRevealVariants,
  homeSectionSpacingClass,
} from "@/components/ui/landing-section";
import {
  pricedServices,
  pricingAmountOptions,
  engagementIncludes,
  purchasePath,
  formatInr,
  type PricedService,
} from "@/config/data/pricing";
import { siteRoutes } from "@/config/routes";
import faqImage from "@/assets/img/Home/undraw/idea-process_2at3.svg";
import heroScene from "@/assets/img/HeroImage/PricingHero.webp";

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

const serviceIcons: Record<string, LucideIcon> = {
  "business-consultancy": Lightbulb,
  "administrative-support": ClipboardList,
  "documentation-services": FileText,
  "project-operational-support": Workflow,
  "billing-invoice-management": Receipt,
  "customer-business-support": Headset,
};

const priceRules = [
  {
    title: "The amount buys a defined piece of work",
    body: "A month of administration, one document set, one milestone, one consultation. The unit is named on every card.",
  },
  {
    title: "Corrections inside that scope cost nothing extra",
    body: "If something we prepared is wrong or incomplete, fixing it is part of the amount you already paid.",
  },
  {
    title: "A separate scope is a separate amount",
    body: "Work that falls outside the unit you paid for is quoted in writing first. We do not add it to an invoice afterwards.",
  },
  {
    title: "The figure is agreed before anything starts",
    body: "We confirm the scope against the amount you chose, then the work begins and the payment purpose stays attached to that service.",
  },
];

const faqItems = [
  {
    question: "Which amount should I choose?",
    answer:
      "The one marked Most chosen matches the scope described on that card. If your work is larger or smaller, choose Custom and we confirm the scope against your figure before anything starts.",
  },
  {
    question: "What happens when I press Purchase?",
    answer:
      "Checkout opens with that service and the amount you picked already selected. You can still change the figure there, and nothing is charged until you complete the payment step.",
  },
  {
    question: "Can I pay a figure that is not listed?",
    answer:
      "Yes. Choose Custom and enter it at checkout, or describe the scope to us first and we will tell you what the figure should be.",
  },
  {
    question: "Does the amount include tax?",
    answer:
      "Amounts are in Indian rupees. Any tax that applies to an engagement is confirmed in writing along with the scope before you pay.",
  },
  {
    question: "How is the payment collected?",
    answer:
      "By UPI at checkout. Card and net-banking checkout are not offered. You will not be asked for a UPI PIN by us.",
  },
  {
    question: "What if the work is stopped?",
    answer: "That is covered by the refund and cancellation policy, including work that has already started.",
  },
];

function PricingHero() {
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
        <img src={assetSrc(heroScene)} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <TimelineContent
          as="h1"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="max-w-[24ch] text-balance text-hero text-ink md:max-w-[30ch]"
        >
          Settle the amount with us,{" "}
          <span className="bg-brand-accent px-1.5 text-on-primary">not after the fact</span>
        </TimelineContent>
        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-[58ch] text-pretty text-copy text-body"
        >
          Every service takes one of three common amounts, or a figure you name yourself. Choose it on the card and checkout opens with that service and that amount already selected.
        </TimelineContent>
        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <GgwButton href="#price-list" variant="accent" className="h-11 px-5">
            See the six services
            <ArrowRight className="h-4 w-4" />
          </GgwButton>
          <GgwButton href={siteRoutes.contact} variant="secondary" className="h-11 px-5">
            Describe your scope
          </GgwButton>
        </TimelineContent>
      </div>
    </section>
  );
}

function PricingCard({ service, index }: { service: PricedService; index: number }) {
  const [choiceId, setChoiceId] = useState<string>(service.recommendedAmountId);
  const selected = pricingAmountOptions.find((option) => option.id === choiceId) ?? pricingAmountOptions[0];
  const isCustom = selected.amount === null;

  const ServiceIcon = serviceIcons[service.slug] ?? Lightbulb;

  return (
    <article className="group relative flex h-full flex-col rounded-md border border-hairline bg-linear-to-b from-canvas to-brand-accent/5 p-2 transition-all duration-200  hover:shadow-[0_28px_56px_-34px_rgba(38,103,255,0.45)] sm:p-3">
      {/* <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-caption font-bold text-brand-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-caption font-semibold uppercase tracking-[0.14em] text-brand-accent">
            {service.paymentPurpose}
          </span>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center text-brand-accent">
          <ServiceIcon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div> */}

      <h3 className="text-title-sm font-semibold text-white bg-brand-accent px-1.5 w-fit">{service.name}</h3>
      <p className="mt-2 text-copy text-body">{service.scope}</p>

      <ul className="mt-4 flex flex-col gap-2.5 rounded-md bg-brand-accent/6 p-4 border border-brand-accent/30 border-dotted">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-body">
            <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-accent text-on-primary">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <fieldset className="mt-auto pt-6">
        <legend className="sr-only">Amount for {service.name}</legend>
        <div className="flex items-center gap-3">
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-muted">Choose the amount</p>
          <span className="h-px flex-1 bg-hairline" aria-hidden />
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          {pricingAmountOptions.map((option) => {
            const active = option.id === choiceId;
            const recommended = option.id === service.recommendedAmountId;
            return (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-md border px-3.5 py-3 transition-all duration-150",
                  active
                    ? "border-brand-accent/50 bg-brand-accent/8 shadow-[0_0_0_3px_rgba(38,103,255,0.1)]"
                    : "border-hairline bg-canvas hover:border-brand-accent/40",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                      active ? "border-brand-accent" : "border-hairline",
                    )}
                  >
                    {active ? <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" /> : null}
                  </span>
                  <span className="text-copy font-semibold text-ink">{option.label}</span>
                </span>
                {recommended ? (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-sm bg-brand-accent/10 px-2.5 py-1 text-caption font-semibold text-brand-accent">
                    <Star className="h-3 w-3 fill-current" strokeWidth={0} />
                    Most chosen
                  </span>
                ) : option.amount === null ? (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                    <Pencil className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                ) : null}
                <input
                  type="radio"
                  name={`amount-${service.slug}`}
                  value={option.id}
                  checked={active}
                  onChange={() => setChoiceId(option.id)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5 rounded-md bg-brand-accent/6 p-4 border border-brand-accent/30 border-dotted">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-canvas text-brand-accent ring-1 ring-brand-accent/15">
            {isCustom ? <Pencil className="h-4 w-4" strokeWidth={2.25} /> : <ShoppingCart className="h-4 w-4" strokeWidth={2} />}
          </span>
          <div>
            <p className={cn("font-semibold text-ink", isCustom ? "text-copy" : "text-title-sm")}>
              {isCustom ? "Custom amount" : formatInr(selected.amount!)}
            </p>
            <p className={cn("text-caption", isCustom ? "font-semibold text-brand-accent" : "text-muted")}>
              {isCustom ? "you enter it at checkout" : service.unit}
            </p>
          </div>
        </div>

        <GgwButton
          href={purchasePath(service.slug, selected.amount)}
          variant="accent"
          className="mt-4 h-11 w-full px-4"
        >
          Purchase
          <ArrowRight className="h-4 w-4" />
        </GgwButton>
      </div>
    </article>
  );
}

function PriceList() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="price-list" className={`${homeSectionSpacingClass} screen-line-top bg-surface-soft`}>
      <div ref={timelineRef}>
        <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <AccentLabel>Price list</AccentLabel>
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 max-w-3xl text-section text-ink"
        >
          Choose an amount on any service,{" "}
          <span className="bg-brand-accent px-1.5 text-on-primary">or enter your own at checkout</span>
        </TimelineContent>
   
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-3 max-w-2xl text-copy text-muted"
        >
          Pick an amount on the card and press Purchase. Checkout opens pre-filled, and nothing is charged until you complete the payment step.
        </TimelineContent>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {pricedServices.map((service, index) => (
            <TimelineContent
              key={service.slug}
              as="div"
              animationNum={3 + index}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="h-full"
            >
              <PricingCard service={service} index={index} />
            </TimelineContent>
          ))}
        </div>

        <TimelineContent
          as="p"
          animationNum={9}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-8 max-w-3xl text-copy text-muted"
        >
          Amounts are in Indian rupees and are collected by UPI. If work is stopped, the{" "}
          <Link to="/refund-and-cancellation" className="text-brand-accent hover:underline">
            refund and cancellation policy
          </Link>{" "}
          sets out what happens next.
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
}

function EveryEngagement() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="included" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef}>
        <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
          <AccentLabel>Included at every amount</AccentLabel>
        </TimelineContent>
        <TimelineContent
          as="h2"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-4 max-w-3xl text-section text-ink"
        >
          Four things you get whichever figure you pay
        </TimelineContent>

        <div className="mt-8 grid grid-cols-1 border-t border-dashed border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {engagementIncludes.map((item, index) => (
            <TimelineContent
              key={item.title}
              as="div"
              animationNum={2 + index}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className={cn(
                "border-b border-dashed border-hairline py-6 lg:py-7",
                "sm:odd:pr-8 sm:even:border-l sm:even:border-dashed sm:even:border-hairline sm:even:pl-8",
                "lg:not-first:border-l lg:not-first:border-dashed lg:not-first:border-hairline lg:not-first:pl-7 lg:not-last:pr-7",
              )}
            >
              <span className="text-caption font-semibold text-brand-accent">0{index + 1}</span>
              <h3 className="mt-2 text-title-sm text-ink">{item.title}</h3>
              <p className="mt-1.5 text-copy text-body">{item.body}</p>
            </TimelineContent>
          ))}
        </div>
      </div>
    </LandingSectionShell>
  );
}

function PriceRules() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="what-the-price-covers" className={`${homeSectionSpacingClass} screen-line-top bg-surface-soft`}>
      <div ref={timelineRef} className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(15rem,22rem)_minmax(0,1fr)] lg:gap-0">
        <div className="lg:border-r lg:border-dashed lg:border-hairline lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>Where the figure stops</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 text-section text-ink"
          >
            What the amount covers, and what it does not
          </TimelineContent>
          <TimelineContent
            as="p"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 text-copy font-medium text-brand-accent"
          >
            An invoice should never be the first place you learn what something cost.
          </TimelineContent>
        </div>
        <ol className="border-t border-dashed border-hairline lg:border-t-0 lg:pl-12">
          {priceRules.map((item, index) => (
            <TimelineContent
              key={item.title}
              as="li"
              animationNum={3 + index}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-dashed border-hairline py-5"
            >
              <span className="text-caption font-semibold text-brand-accent">0{index + 1}</span>
              <div>
                <h3 className="text-title-sm text-ink">{item.title}</h3>
                <p className="mt-1 text-copy text-body">{item.body}</p>
              </div>
            </TimelineContent>
          ))}
        </ol>
      </div>
    </LandingSectionShell>
  );
}

function PricingFaq() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <LandingSectionShell id="faq" className={`${homeSectionSpacingClass} screen-line-top`}>
      <div ref={timelineRef} className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-0">
        <div className="lg:pr-12">
          <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
            <AccentLabel>Before you pay</AccentLabel>
          </TimelineContent>
          <TimelineContent
            as="h2"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-4 max-w-sm text-section text-ink"
          >
            The things people ask at checkout
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
                  <span className="text-copy font-medium text-ink">{item.question}</span>
                  <span
                    aria-hidden
                    className="text-lg leading-none text-brand-accent transition-transform duration-200"
                    style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                {open ? <p className="pb-4 text-copy text-body">{item.answer}</p> : null}
              </div>
            );
          })}
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
}

const PricingPage = () => {
  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <PricingHero />
      <PriceList />
      <EveryEngagement />
      <PriceRules />
      <PricingFaq />
      <CallToAction />
    </div>
  );
};

export default PricingPage;
