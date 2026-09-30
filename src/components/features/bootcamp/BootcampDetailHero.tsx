"use client";

import { useRef } from "react";
import { assetSrc } from "@/lib/utils";
import { useParams } from "@/lib/react-router";
import { useBootcamps } from "@/hooks/useBootcamps";
import { CandyButton } from "@/components/ui/candy-button";
import GradientText from "@/components/ui/GradientText";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  SectionEyebrow,
  LandingFramedTwoCol,
  LandingBentoCell,
  LandingTagPill,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

type BootcampDetailHeroProps = {
  onEnroll: () => void;
};

const BootcampDetailHero = ({ onEnroll }: BootcampDetailHeroProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams();
  const { getBootcampBySlug, getBootcampDetailBySlug } = useBootcamps();
  const bootcamp = getBootcampBySlug(slug as string);
  const detail = getBootcampDetailBySlug(slug as string);

  if (!bootcamp) return null;

  const formattedOriginal = bootcamp.originalPrice.toLocaleString("en-IN");
  const formattedLaunch = bootcamp.launchPrice.toLocaleString("en-IN");
  const showOriginal = bootcamp.originalPrice > bootcamp.launchPrice;

  const introParagraphs =
    detail?.hero.introParagraphs?.length
      ? detail.hero.introParagraphs
      : [bootcamp.description];

  const scrollToDeepDive = () => {
    const element = document.getElementById("bootcamp-deep-dive");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const metaChips = [
    { label: "Duration", value: bootcamp.duration, highlight: true },
    { value: bootcamp.date, valueOnly: true },
    { label: "Language", value: bootcamp.language },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 pb-12 pt-20 sm:px-5 sm:pb-16 sm:pt-24 md:pb-20 md:pt-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div ref={timelineRef}>
          <LandingFramedTwoCol>
            <LandingBentoCell className="order-2 px-0 md:order-1 md:px-0 md:pr-8">
              <div className="flex flex-col gap-5 md:gap-6">
                <TimelineContent
                  as="div"
                  animationNum={0}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                >
                  <SectionEyebrow>Elite Boot Camp</SectionEyebrow>
                </TimelineContent>

                <TimelineContent
                  as="h1"
                  animationNum={1}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className={`font-inter-display font-bold tracking-tight text-zinc-900 ${landingSectionHeadingClass}`}
                >
                  {bootcamp.title}
                </TimelineContent>

                {detail?.hero.tagLine && (
                  <TimelineContent
                    as="p"
                    animationNum={2}
                    timelineRef={timelineRef}
                    customVariants={landingRevealVariants}
                    className="text-base font-semibold leading-snug text-blue-600 md:text-lg"
                  >
                    {detail.hero.tagLine}
                  </TimelineContent>
                )}
                {detail?.hero.phase2Label && (
                  <TimelineContent
                    as="p"
                    animationNum={3}
                    timelineRef={timelineRef}
                    customVariants={landingRevealVariants}
                    className="text-base font-semibold text-blue-600 md:text-lg"
                  >
                    {detail.hero.phase2Label}
                  </TimelineContent>
                )}
                {detail?.hero.launchAnnouncement && (
                  <TimelineContent
                    as="p"
                    animationNum={4}
                    timelineRef={timelineRef}
                    customVariants={landingRevealVariants}
                    className="text-base font-medium text-blue-600 md:text-lg"
                  >
                    {detail.hero.launchAnnouncement}
                  </TimelineContent>
                )}
                {!detail?.hero.phase2Label && bootcamp.launchNote && (
                  <TimelineContent
                    as="p"
                    animationNum={4}
                    timelineRef={timelineRef}
                    customVariants={landingRevealVariants}
                    className="text-base font-semibold text-blue-600 md:text-lg"
                  >
                    {bootcamp.launchNote}
                  </TimelineContent>
                )}

                <TimelineContent
                  as="div"
                  animationNum={5}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className="space-y-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
                >
                  {introParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </TimelineContent>
              </div>
            </LandingBentoCell>

            <LandingBentoCell className="order-1 px-0 md:order-2 md:px-0 md:pl-8 lg:sticky lg:top-24 lg:self-start">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="relative mx-auto w-full max-w-md lg:max-w-none"
              >
                <div className="overflow-hidden  shadow-sm">
                  <div className="relative aspect-4/3">
                    <img
                      src={assetSrc(bootcamp.image)}
                      alt={bootcamp.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 md:mt-8">
                  <p className="font-inter-display text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    Elite Boot Camp
                  </p>
                  <p className="mt-1 font-inter-display text-lg font-semibold leading-snug text-zinc-900 sm:text-xl md:text-2xl">
                    {bootcamp.title}
                  </p>
             
                </div>
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>

          <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10">
            <TimelineContent
              as="div"
              animationNum={7}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {metaChips.map((chip) => (
                <LandingTagPill key={chip.label ?? chip.value}>
                  {chip.valueOnly ? (
                    <span className="font-semibold">{chip.value}</span>
                  ) : (
                    <>
                      {chip.label}:{" "}
                      <span className={chip.highlight ? "font-semibold text-blue-600" : "font-semibold"}>
                        {chip.value}
                      </span>
                    </>
                  )}
                </LandingTagPill>
              ))}
            </TimelineContent>

            <TimelineContent
              as="div"
              animationNum={8}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="flex w-full max-w-lg flex-col items-center gap-2 text-center font-inter-display"
            >
              {showOriginal && (
                <p className="text-base text-zinc-500 sm:text-lg">
                  <span className="font-medium">Original Price: </span>
                  <span className="tabular-nums line-through decoration-red-500/50 decoration-2 text-red-500">
                    ₹{formattedOriginal}
                  </span>{" "}
                  <span className="text-sm font-medium sm:text-base text-red-500">{bootcamp.currency}</span>
                </p>
           
              )}
              <GradientText
                className="text-base uppercase tracking-wide sm:text-lg font-bold!"
                colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
                animationSpeed={4}
                direction="horizontal"
                showBorder={false}
                pauseOnHover={false}
              >
                Launch Price:
              </GradientText>
         
              <p className="text-3xl font-bold tabular-nums text-zinc-900 sm:text-4xl md:text-5xl">
                ₹{formattedLaunch}{" "}
                <span className="text-lg font-semibold text-zinc-500 sm:text-xl md:text-2xl">
                  {bootcamp.currency}
                </span>
              </p>
            </TimelineContent>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <CandyButton
                type="button"
                onClick={onEnroll}
                className="rounded-lg! border-zinc-800 bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)] px-8 py-2.5 font-montserrat! text-xs font-semibold sm:text-sm"
              >
                Enroll Now
              </CandyButton>
              {detail && (
                <CandyButton
                  type="button"
                  onClick={scrollToDeepDive}
                  className="rounded-lg! border-zinc-400 bg-[radial-gradient(95%_60%_at_50%_75%,#52525b_0%,#71717a_100%)] px-8 py-2.5 font-inter-display! text-xs font-medium sm:text-sm"
                >
                  View Module
                </CandyButton>
              )}
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BootcampDetailHero;
