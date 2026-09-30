import type { Bootcamp } from "@/types/bootcamp";
import type { Hero } from "@/types/program";

export const bootcampToHero = (bootcamp: Bootcamp): Hero => ({
    title: bootcamp.title,
    subheading: `${bootcamp.duration} · ${bootcamp.language}`,
    tags: [],
    pricing: {
        currentPrice: bootcamp.launchPrice.toLocaleString("en-IN"),
        originalPrice: bootcamp.originalPrice.toLocaleString("en-IN"),
        currency: bootcamp.currency === "INR" ? "₹" : bootcamp.currency,
        taxNote: "",
        discountText: "",
    },
    buttons: [],
    enrollmentMessage: { text: "", highlightedText: "" },
    image: { src: bootcamp.image, alt: bootcamp.title },
    details: [],
});
