"use client";

import { assetSrc } from "@/lib/utils";
import { useRef } from "react";
import comptiaImage from "@/assets/img/CertificateTag/cyberlab_ceritificate_comptia.webp";
import iscImage from "@/assets/img/CertificateTag/cyberlab_ceritificate_isc.webp";
import ecCouncilImage from "@/assets/img/CertificateTag/cyberlab_ceritificate_ec-council.webp";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoCell,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const CERT_ORGS = [
  { name: "ISC²", src: iscImage, alt: "ISC² Certificate" },
  { name: "CompTIA", src: comptiaImage, alt: "CompTIA Certificate" },
  { name: "EC-Council", src: ecCouncilImage, alt: "EC-Council Certificate" },
] as const;

const IndustryRecognition = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell>
      <div ref={timelineRef}>
        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text="Industry Recognition & Professional Alignment"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <LandingBento className="mt-8 border-y border-zinc-200">
          <LandingBentoCell className="px-0 md:px-0">
            <TimelineContent
              as="p"
              animationNum={1}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
            >
              All certificates issued by <span className="font-semibold text-zinc-900">CYBERLABS USA</span> are <span className="font-semibold text-blue-600">industry-aligned</span> and <span className="font-semibold text-blue-600">professionally relevant</span> in the context of global cybersecurity role requirements.
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={2}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
            >
              <span className="font-semibold text-zinc-900">CYBERLABS USA</span> programs are <span className="font-semibold text-blue-600">mapped and aligned</span> to the knowledge domains, skill areas, and professional competencies defined by leading global cybersecurity bodies such as <span className="font-semibold text-blue-600">ISC²</span>, <span className="font-semibold text-blue-600">CompTIA</span>, and <span className="font-semibold text-blue-600">EC-Council</span>.
            </TimelineContent>
          </LandingBentoCell>

          <div className="grid grid-cols-1 border-t border-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-zinc-200">
            {CERT_ORGS.map((org, index) => (
              <LandingBentoCell
                key={org.name}
                className="flex flex-col items-center px-0 md:px-0"
              >
                <TimelineContent
                  as="div"
                  animationNum={3 + index}
                  timelineRef={timelineRef}
                  customVariants={landingRevealVariants}
                  className="flex w-full flex-col items-center"
                >
                  <p className="w-full border-b border-zinc-200 pb-3 text-center text-base font-semibold text-zinc-900 sm:text-lg">
                    {org.name}
                  </p>
                  <div className="flex min-h-[140px] w-full items-center justify-center p-4 sm:min-h-[160px]">
                    <img
                      src={assetSrc(org.src)}
                      alt={org.alt}
                      className="h-auto w-full max-w-[140px] object-contain sm:max-w-[160px]"
                    />
                  </div>
                </TimelineContent>
              </LandingBentoCell>
            ))}
          </div>

          <LandingBentoCell className="border-t border-zinc-200 px-0 md:px-0">
            <TimelineContent
              as="p"
              animationNum={6}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
            >
              This alignment ensures that learners develop capabilities that are <span className="font-semibold text-blue-600">relevant</span>, <span className="font-semibold text-blue-600">transferable</span>, and <span className="font-semibold text-blue-600">compatible</span> with internationally recognized cybersecurity career pathways, while maintaining <span className="font-semibold text-zinc-900">CYBERLABS&apos; investigation-driven and operational training standards</span>.
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={7}
              timelineRef={timelineRef}
              customVariants={landingRevealVariants}
              className="mt-6 border-t border-zinc-200 pt-6 text-sm font-semibold leading-relaxed text-zinc-800 md:text-base lg:text-lg"
            >
              <span className="font-semibold text-zinc-900">CYBERLABS</span> certifications emphasize <span className="font-semibold text-blue-600">practical capability and operational readiness</span>, rather than exam-only credentialing.
            </TimelineContent>
          </LandingBentoCell>
        </LandingBento>
      </div>
    </LandingSectionShell>
  );
};

export default IndustryRecognition;
