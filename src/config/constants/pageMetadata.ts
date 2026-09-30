import type { Metadata } from "next";
import { getService, servicePath } from "@/config/data/services";
import { createPageMetadata } from "@/lib/siteMetadata";

export const homeMetadata = createPageMetadata(
  "Business support services",
  "Business consultancy, administrative support, documentation, project coordination, billing, and customer communication, each with a clear payment purpose.",
  { absoluteTitle: true, path: "/" },
);

export const aboutCyberlabsMetadata = createPageMetadata(
  "About CYBERLABS INDIA",
  "Learn about CYBERLABS INDIA, our Israeli-led cyber defense training model, mission, and approach to building real-world security capability.",
  { path: "/about-cyberlabs" },
);

export const programsMetadata = createPageMetadata(
  "Cyber Security Programs",
  "Explore CYBERLABS INDIA cyber security programs and bootcamps built for hands-on learning, threat analysis, and practical job-ready skills.",
  { path: "/cyber-defense-programs" },
);

export const cyberlabsWebinarsMetadata = createPageMetadata(
  "Free Cyber Security Webinars",
  "Attend free CYBERLABS INDIA webinars for cyber security insights, career guidance, and practical learning from experienced industry professionals.",
  { path: "/cyberlabs-webinars" },
);

export const leadershipAndFacultyMetadata = createPageMetadata(
  "Leadership and Faculty",
  "Meet CYBERLABS INDIA leadership and faculty, including practitioners and operators with real cyber defense, investigation, and response experience.",
  { path: "/leadership-and-faculty" },
);

export const learningEnvironmentMetadata = createPageMetadata(
  "Cyber Security Learning Environment",
  "Discover CYBERLABS INDIA's simulation-first learning environment with hands-on labs, guided practice, and structured pathways for cyber readiness.",
  { path: "/learning-environment" },
);

export const certificationMetadata = createPageMetadata(
  "Certification and Evaluation Framework",
  "Understand CYBERLABS INDIA certification standards, evaluation methods, and outcomes designed to validate practical cyber security capability.",
  { path: "/certification-and-evaluation-framework" },
);

export const whoShouldApplyMetadata = createPageMetadata(
  "Who Should Apply",
  "See who should apply to CYBERLABS INDIA programs, including students, IT professionals, career switchers, and security-focused teams.",
  { path: "/who-should-apply" },
);

export const requestCallbackMetadata = createPageMetadata(
  "Request a Callback",
  "Request a callback from CYBERLABS INDIA to discuss course selection, eligibility, fees, schedules, and your next steps in cyber security.",
  { path: "/request-callback" },
);

export const contactCyberlabsMetadata = createPageMetadata(
  "Contact CYBERLABS INDIA",
  "Contact CYBERLABS INDIA for admissions, partnerships, and support via phone, email, or inquiry form. Our team will help you quickly.",
  { path: "/contact-cyberlabs" },
);

export const faqMetadata = createPageMetadata(
  "Frequently Asked Questions",
  "Get answers about CYBERLABS INDIA courses, eligibility, admissions, certification, learning format, payments, and career outcomes.",
  { path: "/frequently-asked-questions" },
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
  "Browse the CYBERLABS INDIA sitemap to access all key pages, programs, bootcamps, admissions information, legal policies, and contact links.",
  { path: "/sitemap" },
);
