import type { Metadata } from "next";
import { getService, servicePath } from "@/config/data/services";
import { createPageMetadata } from "@/lib/siteMetadata";

export const homeMetadata = createPageMetadata(
  "Business support services",
  "Business consultancy, administrative support, documentation, project coordination, billing, and customer communication, each with a clear payment purpose.",
  { absoluteTitle: true, path: "/" },
);

export const termsAndConditionsMetadata = createPageMetadata(
  "Terms & Conditions",
  "Terms for using the website and for business consultancy, administration, documentation, projects, billing, and customer support.",
  { path: "/terms-and-conditions" },
);

export const privacyPolicyMetadata = createPageMetadata(
  "Privacy Policy",
  "How contact, checkout, and newsletter details are collected and used for the business services on this website.",
  { path: "/privacy-policy" },
);

export const cookiePolicyMetadata = createPageMetadata(
  "Cookie Policy",
  "This website does not use advertising cookies. Checkout drafts are stored in the browser.",
  { path: "/cookie-policy" },
);

export const refundPolicyMetadata = createPageMetadata(
  "Refund & Cancellation Policy",
  "When a payment for a business service can be cancelled or refunded, including work that has already started.",
  { path: "/refund-and-cancellation" },
);

export const aboutMetadata = createPageMetadata(
  "About",
  "Learn about the business services, how engagements are structured, and the support available for day-to-day operations.",
  { path: "/about" },
);

export const contactMetadata = createPageMetadata(
  "Contact",
  "Contact the team about business consultancy, administration, documentation, projects, billing, and customer support.",
  { path: "/contact" },
);

export const servicesMetadata = createPageMetadata(
  "Services",
  "Business consultancy, administrative support, documentation, project support, billing management, and customer support.",
  { path: "/services" },
);

export const pricingMetadata = createPageMetadata(
  "Pricing",
  "Indicative starting amounts for business consultancy, administration, documentation, project support, billing, and customer support.",
  { path: "/pricing" },
);

function privatePageMetadata(title: string, description: string, path: string): Metadata {
  return {
    ...createPageMetadata(title, description, { path }),
    robots: { index: false, follow: false },
  };
}

export const checkoutMetadata = privatePageMetadata(
  "Checkout",
  "Review the selected service and continue to payment.",
  "/checkout",
);

export const checkoutPaymentMetadata = privatePageMetadata(
  "Payment",
  "Choose a payment method and continue to pay.",
  "/checkout/payment",
);

export const checkoutSuccessMetadata = privatePageMetadata(
  "Payment received",
  "Your payment was received.",
  "/checkout/success",
);

export const checkoutCancelMetadata = privatePageMetadata(
  "Payment cancelled",
  "The payment was cancelled.",
  "/checkout/cancel",
);

export const payMetadata = privatePageMetadata(
  "Pay",
  "Complete payment for the selected service.",
  "/pay",
);

export const orderStatusMetadata = privatePageMetadata(
  "Order status",
  "Check the status of your order.",
  "/order-status",
);

export function getServicePageMetadata(slug: string): Metadata {
  const service = getService(slug);
  if (!service) {
    return servicesMetadata;
  }

  return createPageMetadata(service.name, service.summary, {
    path: servicePath(slug),
  });
}

export const sitemapMetadata = createPageMetadata(
  "Sitemap",
  "Browse every page on this website, including services, pricing, legal policies, and contact links.",
  { path: "/sitemap" },
);
