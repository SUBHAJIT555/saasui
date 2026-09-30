type BootcampDiscountRibbonProps = {
    originalPrice: number;
    launchPrice: number;
    className?: string;
};

export function getBootcampDiscountPercent(originalPrice: number, launchPrice: number): number {
    if (originalPrice <= launchPrice || originalPrice <= 0) return 0;
    return Math.round(((originalPrice - launchPrice) / originalPrice) * 100);
}

const BootcampDiscountRibbon = ({
    originalPrice,
    launchPrice,
    className = "",
}: BootcampDiscountRibbonProps) => {
    const discountPercent = getBootcampDiscountPercent(originalPrice, launchPrice);
    if (discountPercent <= 0) return null;

    return (
        <div
            className={`pointer-events-none absolute right-0 top-0 z-20 h-[88px] w-[88px] overflow-hidden ${className}`}
            aria-hidden
        >
            <div className="absolute right-[-30px] top-[14px] w-[126px] rotate-45 bg-blue-600 py-1.5 text-center border-b border-neutral-200 border border-t ">
                <span className="block text-[11px] font-montserrat font-medium uppercase tracking-wider text-white whitespace-nowrap">
                    {discountPercent}% Off
                </span>
            </div>
        </div>
    );
};

export default BootcampDiscountRibbon;
