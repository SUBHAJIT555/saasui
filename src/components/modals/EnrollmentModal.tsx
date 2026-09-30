import { useState, useEffect } from "react";
import Portal from "@/components/ui/Portal";
import { motion, AnimatePresence } from "framer-motion";
import { useCourses } from "@/hooks/useCourses";
import CheckoutForm from "@/components/forms/CheckoutForm";
import { CandyButton } from "@/components/ui/candy-button";
import { SectionEyebrow } from "@/components/ui/landing-section";
import { CONTACT } from "@/config/constants/contactInfo";
import { crosshatchBgStyle } from "@/config/constants/bootcampStyles";
import BootcampPriceBlock from "@/components/ui/BootcampPriceBlock";

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    slug: string;
}

const includedItems: Array<{
    title: string;
    description: string;
    href?: string;
}> = [
    {
        title: "Lifetime Achievement",
        description: "Track Your Progress",
    },
    {
        title: "Support",
        description: CONTACT.supportEmail,
        href: `mailto:${CONTACT.supportEmail}`,
    },
    {
        title: "Certificate",
        description: "Digital Credential Provided",
    },
];

function CloseIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}

const EnrollmentModal = ({ isOpen, onClose, slug }: EnrollmentModalProps) => {
    const { getCourseHeroBySlug, getCourses } = useCourses();
    const heroData = getCourseHeroBySlug(slug);
    const courses = getCourses();
    const course = courses.find((c) => c.slug === slug);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setShowCheckoutForm(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!heroData) {
        return null;
    }

    const handleClose = () => {
        setShowCheckoutForm(false);
        onClose();
    };

    if (typeof document === "undefined") {
        return null;
    }

    const courseTitle = course?.title || heroData.title;

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close enrollment modal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-10049 cursor-default border-0 bg-white/70 backdrop-blur-sm"
                        />

                        <div className="pointer-events-none fixed inset-0 z-10050 flex items-center justify-center p-4 sm:p-6">
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="program-enrollment-title"
                                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                className="pointer-events-auto relative flex max-h-[min(92dvh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div
                                    className="pointer-events-none absolute inset-0 z-0"
                                    style={crosshatchBgStyle}
                                />

                                <div className="relative z-20 flex shrink-0 items-start justify-between gap-4 border-b border-dashed border-zinc-200 bg-white/95 px-5 py-4 backdrop-blur-sm sm:px-6 sm:py-5">
                                    <div className="min-w-0 flex-1 pr-2">
                                        {showCheckoutForm ? (
                                            <button
                                                type="button"
                                                onClick={() => setShowCheckoutForm(false)}
                                                className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                                Back to Overview
                                            </button>
                                        ) : (
                                            <SectionEyebrow>Flagship Program</SectionEyebrow>
                                        )}
                                        <h2
                                            id="program-enrollment-title"
                                            className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl"
                                        >
                                            {showCheckoutForm ? "Enrollment Details" : "Program Overview"}
                                        </h2>
                                    </div>

                                    <CandyButton
                                        type="button"
                                        variant="white"
                                        onClick={handleClose}
                                        aria-label="Close modal"
                                        className="h-9 w-9 shrink-0 rounded-lg! px-0! py-0! shadow-none!"
                                    >
                                        <CloseIcon />
                                    </CandyButton>
                                </div>

                                <div className="relative z-10 min-h-0 flex-1 overflow-y-auto">
                                    {!showCheckoutForm ? (
                                        <div className="space-y-6 p-5 sm:p-6 md:p-8">
                                            <div className="border border-dashed border-zinc-200 bg-white/90 p-4 sm:p-5">
                                                <h3 className="text-lg font-semibold leading-snug text-zinc-900 sm:text-xl">
                                                    {courseTitle}
                                                </h3>
                                                {heroData.subheading && (
                                                    <p className="mt-1.5 text-sm font-medium text-blue-600 sm:text-base">
                                                        {heroData.subheading}
                                                    </p>
                                                )}
                                                {course && course.originalPrice > 0 && course.currentPrice > 0 && (
                                                    <div className="mt-4">
                                                        <BootcampPriceBlock
                                                            originalPrice={course.originalPrice}
                                                            launchPrice={course.currentPrice}
                                                            currency="INR"
                                                            variant="strip"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">
                                                    What&apos;s Included
                                                </h3>
                                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                    {includedItems.map((item) => (
                                                        <div
                                                            key={item.title}
                                                            className="flex h-full flex-col gap-2 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/70 p-4"
                                                        >
                                                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="14"
                                                                    height="14"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    aria-hidden
                                                                >
                                                                    <path d="M20 6 9 17l-5-5" />
                                                                </svg>
                                                            </span>
                                                            <div>
                                                                <p className="text-sm font-semibold text-zinc-900">
                                                                    {item.title}
                                                                </p>
                                                                {item.href ? (
                                                                    <a
                                                                        href={item.href}
                                                                        className="mt-1 block text-xs leading-relaxed text-zinc-600 underline decoration-zinc-300 underline-offset-2 transition hover:text-blue-600 hover:decoration-blue-400 sm:text-sm"
                                                                    >
                                                                        {item.description}
                                                                    </a>
                                                                ) : (
                                                                    <p className="mt-1 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                                                                        {item.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <CandyButton
                                                type="button"
                                                onClick={() => setShowCheckoutForm(true)}
                                                className="w-full rounded-lg! border-zinc-800! bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)]! px-6! py-3! text-sm! text-white shadow-none! active:rotate-0 sm:text-base!"
                                            >
                                                Proceed to Enrollment
                                            </CandyButton>
                                        </div>
                                    ) : (
                                        <CheckoutForm
                                            courseData={heroData}
                                            courseTitle={courseTitle}
                                            onBack={() => setShowCheckoutForm(false)}
                                            courseSlug={slug}
                                            onSuccess={handleClose}
                                            embedded
                                        />
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default EnrollmentModal;
