import type { Metadata } from "next";

export const SITE_NAME = "CYBERLABS INDIA";
export const DEFAULT_DESCRIPTION =
  "Israeli-led cyber defense training in India. Simulation-driven programs taught by real operators.";
export const SITE_AUTHOR = "Subhajit Dhali";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cyberlabsindia.com";

export function getSiteUrl(): string {
  return SITE_URL;
}

export function truncateDescription(text: string, maxLength = 160): string {
  const cleaned = text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.slice(0, maxLength - 1).trimEnd()}…`;
}

export function createPageMetadata(
  title: string,
  description: string,
  options?: { absoluteTitle?: boolean; path?: string },
): Metadata {
  const pageTitle = options?.absoluteTitle
    ? title
    : `${title} | ${SITE_NAME}`;
  const pageUrl = options?.path ? `${SITE_URL}${options.path}` : SITE_URL;

  return {
    title: options?.absoluteTitle ? { absolute: pageTitle } : title,
    description,
    authors: [{ name: SITE_AUTHOR }],
    creator: SITE_AUTHOR,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Israeli-Led Cyber Defense Training`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};
