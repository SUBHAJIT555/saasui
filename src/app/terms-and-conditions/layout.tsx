import type { Metadata } from "next";
import { termsAndConditionsMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = termsAndConditionsMetadata;

export default function TermsAndConditionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
