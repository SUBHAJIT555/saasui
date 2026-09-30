import type { Metadata } from "next";
import { faqMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = faqMetadata;

export default function FaqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
