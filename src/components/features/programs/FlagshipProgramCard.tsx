import { assetSrc } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "@/lib/react-router";
import type { FlagshipProgramCard as FlagshipProgramCardData } from "@/config/constants/flagshipProgramData";
import { crosshatchBgStyle } from "@/config/constants/bootcampStyles";
import { CandyButton } from "@/components/ui/candy-button";
import GradientText from "@/components/ui/GradientText";
import BootcampPriceBlock from "@/components/ui/BootcampPriceBlock";
import BootcampDiscountRibbon from "@/components/ui/BootcampDiscountRibbon";

type FlagshipProgramCardProps = {
    program: FlagshipProgramCardData;
    image: string;
    index: number;
    onEnroll: (slug: string) => void;
};

const AnimatedClockIcon = ({ isInView }: { isInView: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary shrink-0"
    >
        <motion.path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.path
            d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1 -10 10 10 10 0 0 1 -10 -10 10 10 0 0 1 10 -10z"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.path
            d="M12 6v6l4 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.6, repeat: Infinity, repeatDelay: 3 }}
        />
    </svg>
);

const FlagshipProgramCard = ({ program, image, index, onEnroll }: FlagshipProgramCardProps) => {
    const cardRef = useRef(null);
    const navigate = useNavigate();
    const isInView = useInView(cardRef, { once: false, margin: "-50px" });
    const detailsPath = `/cyber-defense-programs/${program.slug}`;

    const goToDetails = () => navigate(detailsPath);
    const goToEnroll = (e: MouseEvent) => {
        e.stopPropagation();
        onEnroll(program.slug);
    };
    const handleViewDetails = (e: MouseEvent) => {
        e.stopPropagation();
        goToDetails();
    };

    return (
        <motion.article
            ref={cardRef}
            id={`flagship-${program.slug}`}
            role="link"
            tabIndex={0}
            onClick={goToDetails}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToDetails();
                }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.06,
            }}
            className="group relative flex h-full cursor-pointer flex-col overflow-hidden  border border-neutral-200 bg-white transition-all duration-300 hover:border-primary/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
            <div className="relative h-46 sm:h-50 w-full shrink-0 overflow-hidden bg-neutral-100">
                <img
                    src={assetSrc(image)}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <BootcampDiscountRibbon
                    originalPrice={program.originalPrice}
                    launchPrice={program.launchPrice}
                />
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <GradientText
                        showBorder
                        colors={["#0a0a0f", "#0f172a", "#1e3a8a", "#2563eb", "#0ea5e9"]}
                        animationSpeed={8}
                        className="rounded-md! font-inter-display text-[10px] sm:text-[11px] font-semibold! uppercase tracking-[0.12em]"
                    >
                        Flagship Program
                    </GradientText>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="relative flex flex-1 flex-col">
                <div className="absolute inset-0 z-0 pointer-events-none" style={crosshatchBgStyle} />

                <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-inter-display font-semibold text-text-primary leading-snug mb-3 line-clamp-2 min-h-11">
                        {program.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white/90 ring ring-neutral-200 ring-offset-1 px-2.5 py-1 shadow-sm">
                            <AnimatedClockIcon isInView={isInView} />
                            <span className="text-[11px] sm:text-xs font-inter-display font-medium text-text-primary">
                                Duration:{" "}
                                <span className="font-semibold text-primary">{program.duration}</span>
                            </span>
                        </div>

                        <span className="inline-flex items-center rounded-lg border border-neutral-200 bg-white/90 px-2.5 py-1 text-[11px] sm:text-xs font-inter-display font-medium text-text-primary/80 ring ring-neutral-200 ring-offset-1 shadow-sm">
                            {program.category}
                        </span>
                    </div>

                    <BootcampPriceBlock
                        originalPrice={program.originalPrice}
                        launchPrice={program.launchPrice}
                        currency={program.currency}
                        className="mb-3"
                    />

                    <p className="text-xs sm:text-sm font-inter-display text-text-primary font-medium leading-relaxed flex-1">
                        {program.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-neutral-200/80 flex flex-row gap-2">
                        <CandyButton
                            type="button"
                            onClick={goToEnroll}
                            className="flex-1 min-w-0 rounded-lg! border-zinc-800 bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)] px-4 py-2.5 font-montserrat! text-xs font-semibold sm:text-sm"
                        >
                            Enroll Now
                        </CandyButton>

                        <CandyButton
                            type="button"
                            onClick={handleViewDetails}
                            className="group/details flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-lg! border-zinc-400 bg-[radial-gradient(95%_60%_at_50%_75%,#52525b_0%,#71717a_100%)] px-4 py-2.5 font-inter-display! text-xs font-medium sm:text-sm"
                        >
                            <span className="truncate">View Details</span>
                            <FiArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/details:rotate-45" />
                        </CandyButton>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default FlagshipProgramCard;
