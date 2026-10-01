import { services, checkoutPath, type Service } from "@/config/data/services";
import { amountChoices } from "@/lib/checkout";

/** The amount options offered on a pricing card, in the order they appear. */
const PRICING_AMOUNT_IDS = ["500", "1000", "2000", "custom"] as const;

export type PricingAmountId = (typeof PRICING_AMOUNT_IDS)[number];

/** Taken from the checkout presets so a card and the checkout step never disagree. */
export const pricingAmountOptions = amountChoices.filter((choice) =>
  (PRICING_AMOUNT_IDS as readonly string[]).includes(choice.id),
);

export type ServicePricing = {
  slug: Service["slug"];
  /** The option pre-selected on the card and marked as most chosen. */
  recommendedAmountId: PricingAmountId;
  unit: string;
  scope: string;
  includes: string[];
};

export const servicePricing: ServicePricing[] = [
  {
    slug: "business-consultancy",
    recommendedAmountId: "1000",
    unit: "per consultation",
    scope: "One advisory session on a single business question, with the outcome written down.",
    includes: ["Written notes and agreed next steps", "One follow-up question answered"],
  },
  {
    slug: "administrative-support",
    recommendedAmountId: "2000",
    unit: "per month",
    scope: "Day-to-day back-office administration for one calendar month.",
    includes: ["Records and data entry kept current", "A monthly summary of what was handled"],
  },
  {
    slug: "documentation-services",
    recommendedAmountId: "500",
    unit: "per document set",
    scope: "Preparation or digitization of one agreed set of documents.",
    includes: ["Organized, named files returned to you", "One round of corrections"],
  },
  {
    slug: "project-operational-support",
    recommendedAmountId: "2000",
    unit: "per milestone",
    scope: "Coordination of one agreed project milestone from start to sign-off.",
    includes: ["Task tracking across everyone involved", "Progress reported as the work moves"],
  },
  {
    slug: "billing-invoice-management",
    recommendedAmountId: "1000",
    unit: "per month",
    scope: "Invoice preparation and payment tracking for one calendar month.",
    includes: ["Invoices prepared and sent", "Financial records organized for the period"],
  },
  {
    slug: "customer-business-support",
    recommendedAmountId: "2000",
    unit: "per month",
    scope: "Customer enquiries and client coordination handled for one calendar month.",
    includes: ["Enquiries received and answered", "A record of what was raised and resolved"],
  },
];

export type PricedService = Service & Omit<ServicePricing, "slug">;

export const pricedServices: PricedService[] = servicePricing.flatMap((pricing) => {
  const service = services.find((item) => item.slug === pricing.slug);
  if (!service) return [];
  const { slug: _slug, ...rest } = pricing;
  return [{ ...service, ...rest }];
});

/** What holds true for every engagement, so it is stated once instead of per service. */
export const engagementIncludes = [
  {
    title: "A scope in writing",
    body: "What the amount covers is written down and confirmed before the work begins.",
  },
  {
    title: "A named payment purpose",
    body: "Every payment carries the purpose shown on its service, so the record states what it was for.",
  },
  {
    title: "A record at the end",
    body: "You receive the agreed output plus a note of what was completed.",
  },
  {
    title: "No charge to enquire",
    body: "Asking about a service, or saving a checkout draft, never creates a charge.",
  },
];

/**
 * Checkout link for a card. A chosen preset is carried across in the URL; the
 * custom option sends the customer to checkout to enter their own figure.
 */
export function purchasePath(slug: Service["slug"], amount: number | null): string {
  const base = checkoutPath(slug);
  return amount === null ? base : `${base}&amount=${amount}`;
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
