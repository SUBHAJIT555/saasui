"use client";

import { useRef } from "react";
import { CONTACT } from "@/config/constants/contactInfo";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingBentoCell,
  LandingSplitChecklist,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const offices = [
  {
    title: "India Office",
    lines: CONTACT.officeAddressIndia,
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.123456789!2d73.8067244!3d18.5598964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0b0c0c0c0c1%3A0x1234567890abcdef!2sVB%20Capital%2C%20Office%20No.%20702%20%26%20705%2C%20Aundh%2C%20Haveli%2C%20Pune%20411007%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1703837058988!5m2!1sen!2sin",
    animationNum: 1,
  },
  {
    title: "United States Office",
    lines: ["1430 Broadway", "Manhattan, New York", "United States"],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.123456789!2d-73.9876543!3d40.7501234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a123456789%3A0xabcdef1234567890!2s1430%20Broadway%2C%20Manhattan%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1703837058988!5m2!1sen!2sus",
    animationNum: 2,
  },
  {
    title: "Israel Operations Office",
    lines: ["Medinat Hayehudim 85", "Herzliya", "Israel"],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.123456789!2d34.8123456!3d32.1654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4a123456789%3A0xabcdef1234567890!2sMedinat%20Hayehudim%2085%2C%20Herzliya%2C%20Israel!5e0!3m2!1sen!2sil!4v1703837058988!5m2!1sen!2sil",
    animationNum: 3,
  },
] as const;

type Office = (typeof offices)[number];

function OfficeLocation({
  office,
  timelineRef,
  mapHeightClass = "h-[280px] md:h-[320px]",
}: {
  office: Office;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  mapHeightClass?: string;
}) {
  return (
    <TimelineContent
      as="div"
      animationNum={office.animationNum}
      timelineRef={timelineRef}
      customVariants={landingRevealVariants}
    >
      <h3 className="text-lg font-semibold text-zinc-900">{office.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
        {office.lines.map((line, index) => (
          <span key={line}>
            {line}
            {index < office.lines.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div
        className={`mt-4 overflow-hidden rounded-lg border border-zinc-200 ${mapHeightClass}`}
      >
        <iframe
          src={office.mapSrc}
          title={`${office.title} map`}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </TimelineContent>
  );
}

const ContactAddress = () => {
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
            text="Our Addresses :"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <LandingBento className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
          <LandingBentoCell className="px-0 md:px-6">
            <OfficeLocation
              office={offices[0]}
              timelineRef={timelineRef}
              mapHeightClass="h-[300px] md:h-[360px]"
            />
          </LandingBentoCell>

          <div className="grid grid-cols-1 divide-y divide-zinc-200 md:grid-cols-2 md:divide-x md:divide-y-0">
            {offices.slice(1).map((office) => (
              <LandingBentoCell key={office.title} className="px-0 md:px-6">
                <OfficeLocation office={office} timelineRef={timelineRef} />
              </LandingBentoCell>
            ))}
          </div>
        </LandingBento>

        <TimelineContent
          as="div"
          animationNum={4}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-8"
        >
          <LandingSplitChecklist
            timelineRef={timelineRef}
            animationStart={5}
            items={[
              "👉 CYBERLABS was founded in Israel, drawing from one of the world's most advanced cybersecurity ecosystems.",
              "👉 Our Israeli operations continue to play a key role in shaping our training philosophy, investigative depth, and operational standards.",
            ]}
          />
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
};

export default ContactAddress;
