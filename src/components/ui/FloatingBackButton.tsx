import { useFloatingBottomBar } from "@/providers/FloatingBottomBarContext";
import { cn } from "@/lib/utils";
import { CandyButton } from "@/components/ui/candy-button";

type FloatingBackButtonProps = {
    isVisible: boolean;
    onClick: () => void;
};

const FloatingBackButton = ({ isVisible, onClick }: FloatingBackButtonProps) => {
    const { isActive: hasBottomBar } = useFloatingBottomBar();

    return (
        <div
            className={cn(
                "fixed bottom-4 left-4 z-1000 transition-[bottom,opacity] duration-300 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8",
                hasBottomBar && "max-sm:bottom-23",
                isVisible
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0",
            )}
        >
            <CandyButton
                type="button"
                variant="white"
                onClick={onClick}
                aria-label="Go back"
                className="h-11 w-11 rounded-full! px-0! py-0! text-zinc-700 shadow-lg! shadow-zinc-900/10! active:rotate-0 md:h-14 md:w-14"
            >
                <ArrowBackIcon className="h-4 w-4 md:h-5 md:w-5" />
            </CandyButton>
        </div>
    );
};

function ArrowBackIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12h14" />
            <path d="M5 12l4 4" />
            <path d="M5 12l4 -4" />
        </svg>
    );
}

export default FloatingBackButton;
