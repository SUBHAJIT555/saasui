export type Service = {
  slug: string;
  name: string;
  summary: string;
  paymentPurpose: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "business-consultancy",
    name: "Business Consultancy",
    summary:
      "Business planning, operational guidance, process improvement and business advisory support.",
    paymentPurpose: "Consultation fee",
    highlights: [
      "Business planning",
      "Operational guidance",
      "Process improvement",
      "Business advisory support",
    ],
  },
  {
    slug: "administrative-support",
    name: "Administrative Support",
    summary:
      "Back-office assistance, record management, data entry and day-to-day business administration.",
    paymentPurpose: "Monthly service fee",
    highlights: [
      "Back-office assistance",
      "Record management",
      "Data entry",
      "Day-to-day business administration",
    ],
  },
  {
    slug: "documentation-services",
    name: "Documentation Services",
    summary:
      "Business document preparation, document digitization, record organization and reporting assistance.",
    paymentPurpose: "Document processing fee",
    highlights: [
      "Business document preparation",
      "Document digitization",
      "Record organization",
      "Reporting assistance",
    ],
  },
  {
    slug: "project-operational-support",
    name: "Project & Operational Support",
    summary:
      "Project coordination, task management, operational assistance and progress reporting.",
    paymentPurpose: "Project milestone payment",
    highlights: [
      "Project coordination",
      "Task management",
      "Operational assistance",
      "Progress reporting",
    ],
  },
  {
    slug: "billing-invoice-management",
    name: "Billing & Invoice Management",
    summary:
      "Invoice preparation, payment tracking, billing administration and financial record organization.",
    paymentPurpose: "Invoice management fee",
    highlights: [
      "Invoice preparation",
      "Payment tracking",
      "Billing administration",
      "Financial record organization",
    ],
  },
  {
    slug: "customer-business-support",
    name: "Customer & Business Support",
    summary:
      "Customer enquiry management, client coordination, service requests and business communication.",
    paymentPurpose: "Contracted support fee",
    highlights: [
      "Customer enquiry management",
      "Client coordination",
      "Service requests",
      "Business communication",
    ],
  },
];

export function getService(slug: string | null | undefined) {
  if (!slug) return null;
  return services.find((service) => service.slug === slug) ?? null;
}

export function isServiceSlug(value: string): boolean {
  return services.some((service) => service.slug === value);
}

export function servicePath(slug: string) {
  return `/services/${slug}`;
}

export function checkoutPath(slug?: string) {
  if (!slug) return "/checkout";
  return `/checkout?service=${slug}`;
}
