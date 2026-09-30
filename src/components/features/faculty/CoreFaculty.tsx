import { assetSrc } from "@/lib/utils";
import { useState, useEffect, useRef, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "@/components/ui/Portal";
import { IoClose } from "react-icons/io5";
import { useLenis } from "@/hooks/useLenis";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { CandyButton } from "@/components/ui/candy-button";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";
import cyberlabsIcon from "@/assets/img/logo/Icon-01.svg";
import { crosshatchBgStyle } from "@/config/constants/bootcampStyles";

const RosetteDiscountCheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check h-5 w-5 shrink-0 text-blue-600" aria-hidden>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
        <path d="M9 12l2 2l4 -4" />
    </svg>
);

const CircleArrowUpRightIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-up-right h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" aria-hidden>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 4.66h-6l-.117 .007a1 1 0 0 0 -.883 .993l.007 .117a1 1 0 0 0 .993 .883h3.584l-4.291 4.293l-.083 .094a1 1 0 0 0 1.497 1.32l4.293 -4.293v3.586l.007 .117a1 1 0 0 0 1.993 -.117v-6l-.007 -.117l-.029 -.149l-.035 -.105l-.054 -.113l-.071 -.111a1.01 1.01 0 0 0 -.097 -.112l-.09 -.08l-.096 -.067l-.098 -.052l-.11 -.044l-.112 -.03l-.126 -.017l-.075 -.003z" />
    </svg>
);

// Team member images
import guyKlisman from "@/assets/img/TeamMemberImages/GuyKlisman.webp";
import ramiSimanTov from "@/assets/img/TeamMemberImages/Rami.webp";
import adamGarfinkel from "@/assets/img/TeamMemberImages/Adam.webp";
import lucienFransman from "@/assets/img/TeamMemberImages/Lucien.webp";
import shmulikYehezkel from "@/assets/img/TeamMemberImages/Shmulik.webp";
import najeebIbrahim from "@/assets/img/TeamMemberImages/NajeebIbrahim.webp";
// import groupImage from "@/assets/img/TeamMemberImages/teamImage.webp"

interface TeamMember {
    src: string;
    alt: string;
    name: string;
    designation: string;
    description: string;
}

// Team Member Card — social profile layout
const TeamMemberCard = ({
    member,
    onCardClick,
}: {
    member: TeamMember;
    onCardClick: (member: TeamMember) => void;
}) => {
    return (
        <motion.article
            onClick={() => onCardClick(member)}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-none border border-zinc-200/90 bg-white shadow-md shadow-zinc-900/5 transition-shadow duration-300 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/10"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, #e4e4e7 0, #e4e4e7 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #e4e4e7 0, #e4e4e7 1px, transparent 0, transparent 50%)",
                    backgroundSize: "5px 5px",
                    opacity: 0.55,
                }}
            />
            <div className="relative z-10 aspect-4/5 shrink-0 overflow-hidden sm:aspect-5/6">
                <img
                    src={assetSrc(member.src)}
                    alt={member.alt}
                    className="h-full w-full object-cover object-[center_15%] transition-all duration-500 group-hover:scale-[1.03] sm:object-top"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/30 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex min-h-38 flex-1 flex-col px-5 pb-5 sm:min-h-40 sm:px-6 sm:pb-6">
                <div className="absolute -top-10 left-5 z-10 flex size-18 shrink-0 items-center justify-center rounded-full border-4 border-white bg-zinc-900 shadow-lg sm:-top-11 sm:left-6 sm:size-20">
                    <img
                        src={assetSrc(cyberlabsIcon)}
                        alt="CYBERLABS"
                        className="size-8 object-contain sm:size-10"
                    />
                </div>

                <div className="flex-1 pt-12 pr-24 sm:pt-14 sm:pr-28">
                    <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-base font-bold tracking-tight text-zinc-900 sm:text-lg">
                            {member.name}
                        </h3>
                        {RosetteDiscountCheckIcon}
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 font-semibold">
                        {member.designation}
                    </p>
                </div>

                <CandyButton
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onCardClick(member);
                    }}
                    className="absolute bottom-5 right-5 rounded-lg! border-zinc-800 bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)] px-4 py-2 font-montserrat! text-xs font-semibold shadow-none! sm:bottom-6 sm:right-6 sm:px-5 sm:text-sm"
                >
                    <span className="inline-flex items-center gap-1.5">
                        View
                        {CircleArrowUpRightIcon}
                    </span>
                </CandyButton>
            </div>
        </motion.article>
    );
};

// Team member data
const teamMembers: TeamMember[] = [
    {
        src: assetSrc(guyKlisman),
        alt: "Guy Klisman",
        name: "Guy Klisman",
        designation: "Founder & Chief Executive Officer , CYBERLABS",
        description: `Guy Klisman is a former senior commander and officer in the Israeli security establishment, with 25+ years of experience across cyber operations, intelligence, and national security.
During his service, he:
• Commanded specialized cyber and intelligence units
• Led the establishment of cyber training frameworks for elite and special forces
• Served in advanced SIGINT and intelligence leadership roles
• Directed international cyber and intelligence cooperation programs
In the civilian domain, Guy has spearheaded multiple cyber and technology ventures and currently leads CYBERLABS USA, specializing in the development and operation of global cyber training and simulation centers.
Under his leadership, CYBERLABS has trained and certified hundreds of cyber professionals who have integrated into the international cybersecurity industry, working in collaboration with top academic institutions in the United States and globally.`,
    },
    {
        src: assetSrc(ramiSimanTov),
        alt: "Rami Siman-Tov",
        name: "Rami Siman-Tov",
        designation: "Co-Founder & Chief Operating Officer , CYBERLABS",
        description: `Rami Siman-Tov is a global cyber operations and program delivery leader with 25+ years of experience across Israel, the United States, Europe, Africa, and Asia.
Before founding CYBERLABS, Rami:
• Led large-scale technology and telecom programs for international clients
• Managed complex, multi-country deployments across China, West Africa, and Europe
• Held senior leadership roles at Comverse, including Regional Services Director and Program Manager for large-scale global projects
• Founded and led municipal and government technology initiatives end-to-end
At CYBERLABS, Rami is responsible for global operations, execution quality, and learner-to-professional transformation, ensuring programs meet real industry and enterprise readiness standards, not academic checklists.`,
    },
    {
        src: assetSrc(shmulikYehezkel),
        alt: "Shmulik Yehezkel",
        name: "Shmulik Yehezkel",
        designation: "Advisory Board , National Cyber Defense & Strategy",
        description: `Colonel (Res.) Shmulik Yehezkel is one of Israel's most senior cyber defense professionals, with 25+ years of experience across government, defense, and national cybersecurity leadership.
He has served in key roles within the Prime Minister's Office, including:
• Head of the Cyber & Operational Technology Academy, leading national-level cyber and OT training frameworks
• Architect of advanced training programs integrating exercises, simulations, and workforce readiness
• Leader of large-scale strategic and operational cyber simulations
• Builder of long-term national cyber capability and human capital pipelines
At CYBERLABS, Shmulik chairs the committee responsible for approving instructors, certifying training quality, and enforcing international-level standards, ensuring Israeli-grade rigor across all programs.`,
    },
    {
        src: assetSrc(adamGarfinkel),
        alt: "Adam Garfinkel",
        name: "Adam Garfinkel",
        designation: "Lead Instructor , Cybersecurity, Cloud & Infrastructure",
        description: `Adam Garfinkel is a graduate of the Technological Unit of the IDF's elite C4I Corps, with extensive experience across networking, cybersecurity, cloud systems, and AI-driven environments.
His background spans:
• Enterprise and cloud security architecture
• Product management for cybersecurity and communications solutions
• QA leadership for database security products
• DevOps support, tool development, and knowledge-center management
• Training and certifying cybersecurity professionals at scale
Adam is known for bridging advanced technology with human capability, translating complex systems into operational understanding, not just technical configuration.`,
    },
    {
        src: assetSrc(lucienFransman),
        alt: "Lucien Fransman",
        name: "Lucien Fransman",
        designation: "Head of Content & Lead Instructor , Asia Region",
        description: `Lucien Fransman is a globally respected cybersecurity leader with 25+ years of experience across incident response, digital forensics, SOC operations, and threat hunting.
Key highlights include:
• Over 20 years leading and delivering cybersecurity training to enterprises, universities, and government cyber offices worldwide
• Founder & Technical Director of IronBox, delivering managed SOC and forensic services internationally
• Architect of Suriname's National SOC, aligned with ISO 27001 standards
• Senior Risk Analyst at ABN AMRO Bank during major merger operations
• Security consultant for Delta Lloyd and Philips, leading APT response efforts
• Advisor to national crisis boards and government e-governance cyber initiatives
Lucien currently serves as Virtual CISO for an Israeli cybersecurity startup and is a member of the SANS Institute Advisory Board, bringing real operational depth into CYBERLABS curricula.`,
    },
    {
        src: assetSrc(najeebIbrahim),
        alt: "Najeeb Ibrahim",
        name: "Najeeb Ibrahim",
        designation: "Chief Information Security Officer & Senior Instructor",
        description: `Najeeb Ibrahim is a Senior Security Analyst and CISO with 8+ years of hands-on experience across offensive and defensive cybersecurity, SOC operations, detection engineering, and incident response.
He currently serves as Senior Security Analyst & CISO at CyberArk, where he:
• Builds and scales enterprise-grade security programs
• Operates within advanced monitoring and threat detection environments
• Actively participates in real-world incident response
Alongside his industry role, Najeeb is an experienced cybersecurity lecturer, delivering structured, practice-driven training focused on real attack and defense methodologies. He holds multiple globally recognized certifications across cloud, offensive, and defensive security domains.`,
    },
];

const CoreFaculty = () => {
    const containerRef = useRef(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const lenis = useLenis();

    const handleCardClick = (member: TeamMember) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 300);
    };

    useEffect(() => {
        if (!lenis) return;

        if (isModalOpen) {
            lenis.stop();
            document.body.style.overflow = 'hidden';
        } else {
            lenis.start();
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        };
    }, [isModalOpen, lenis]);

    return (
        <LandingSectionShell>
        <section className="w-full" ref={containerRef}>
            <div className="w-full" ref={timelineRef}>
                <TimelineContent as="div" animationNum={0} timelineRef={timelineRef} customVariants={landingRevealVariants}>
                    <ShinyText
                        text="Leadership & Core Faculty"
                        className={landingSectionHeadingClass}
                        color="#3f3f46"
                        shineColor="#18181b"
                        speed={3}
                        spread={120}
                    />
                </TimelineContent>

                {/* Team Grid - each card animates on scroll with stagger; items-stretch for equal height */}
                <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="flex h-full min-h-0"
                            initial={{ opacity: 0, y: 48, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            <TeamMemberCard
                                member={member}
                                onCardClick={handleCardClick}
                            />
                        </motion.div>
                    ))}
                </div>

               
            </div>

            {/* Team Member Modal */}
            {selectedMember && (
                <Portal>
                    <AnimatePresence>
                        {isModalOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    className="fixed inset-0 z-9998 bg-white/50 backdrop-blur-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onWheel={(e) => e.preventDefault()}
                                    onTouchMove={(e) => e.preventDefault()}
                                    onClick={handleCloseModal}
                                />

                                {/* Modal */}
                                <motion.div
                                    className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden border border-dashed border-zinc-200 bg-white shadow-xl shadow-zinc-900/10"
                                        initial={{ scale: 0.96, y: 24 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.96, y: 24 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div
                                            className="pointer-events-none absolute inset-0 z-0"
                                            style={crosshatchBgStyle}
                                            aria-hidden
                                        />

                                        <div className="relative z-10 flex h-full min-h-0 flex-col">
                                            <div className="shrink-0 border-b border-dashed border-zinc-200 bg-white/80 backdrop-blur-sm">
                                                <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
                                                    <p className="text-base font-semibold uppercase tracking-[0.14em] text-blue-600 sm:text-lg">
                                                        {selectedMember.name}
                                                    </p>
                                               
                                                    <CandyButton
                                                        type="button"
                                                        variant="white"
                                                        onClick={handleCloseModal}
                                                        aria-label="Close modal"
                                                        className="h-9 w-9 shrink-0 rounded-lg! px-0! py-0! shadow-none!"
                                                    >
                                                        <IoClose className="h-5 w-5" aria-hidden />
                                                    </CandyButton>
                                                </div>
                                            </div>

                                            <div className="flex-1 overflow-y-auto" data-lenis-prevent>
                                                <div className="px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
                                                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
                                                        <div className="md:col-span-4">
                                                            <div className="md:sticky md:top-6">
                                                                <div className="overflow-hidden  border border-dashed border-zinc-200 bg-white shadow-sm">
                                                                    <img
                                                                        src={assetSrc(selectedMember.src)}
                                                                        alt={selectedMember.alt}
                                                                        className="aspect-4/5 w-full object-cover object-top"
                                                                    />
                                                                </div>

                                                                <div className="mt-5 border border-dashed border-zinc-200 bg-white/90 p-4 ">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <h3 className="text-base font-bold tracking-tight text-zinc-900 sm:text-lg">
                                                                            {selectedMember.name}
                                                                        </h3>
                                                                        {RosetteDiscountCheckIcon}
                                                                    </div>
                                                                    <p className="mt-2 border-l-2 border-blue-500 pl-3 text-sm leading-relaxed text-zinc-600">
                                                                        {selectedMember.designation}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="md:col-span-8">
                                                            <div className=" border border-dashed border-zinc-200 bg-white/90 p-5 sm:p-6 md:p-8">
                                                                {(() => {
                                                                    const description = selectedMember.description;
                                                                    const lines = description.split('\n').filter(line => line.trim() !== '');
                                                                    const elements: ReactElement[] = [];
                                                                    let currentParagraph: string[] = [];
                                                                    let isFirstParagraph = true;
                                                                    let currentBulletList: string[] = [];

                                                                    const flushParagraph = () => {
                                                                        if (currentParagraph.length > 0) {
                                                                            const text = currentParagraph.join(' ');
                                                                            elements.push(
                                                                                <p
                                                                                    key={`para-${elements.length}`}
                                                                                    className={`text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg ${isFirstParagraph
                                                                                        ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-0.5 first-letter:font-bold first-letter:text-blue-600 first-letter:text-5xl sm:first-letter:mr-4 sm:first-letter:text-6xl md:first-letter:text-7xl'
                                                                                        : 'mb-4'
                                                                                        }`}
                                                                                >
                                                                                    {text}
                                                                                </p>
                                                                            );
                                                                            currentParagraph = [];
                                                                            isFirstParagraph = false;
                                                                        }
                                                                    };

                                                                    const flushBulletList = () => {
                                                                        if (currentBulletList.length > 0) {
                                                                            elements.push(
                                                                                <ul key={`bullet-${elements.length}`} className="mb-5 space-y-2.5 sm:space-y-3">
                                                                                    {currentBulletList.map((bullet, idx) => (
                                                                                        <li
                                                                                            key={idx}
                                                                                            className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg"
                                                                                        >
                                                                                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
                                                                                            <span>{bullet}</span>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            );
                                                                            currentBulletList = [];
                                                                        }
                                                                    };

                                                                    lines.forEach((line) => {
                                                                        const trimmed = line.trim();
                                                                        if (trimmed.startsWith('•')) {
                                                                            flushParagraph();
                                                                            currentBulletList.push(trimmed.substring(1).trim());
                                                                        } else {
                                                                            flushBulletList();
                                                                            currentParagraph.push(trimmed);
                                                                        }
                                                                    });

                                                                    flushParagraph();
                                                                    flushBulletList();

                                                                    return <div className="space-y-1">{elements}</div>;
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </Portal>
            )}
        </section>
        </LandingSectionShell>
    );
};

export default CoreFaculty;