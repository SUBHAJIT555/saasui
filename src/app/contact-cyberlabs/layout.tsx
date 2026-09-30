import type { Metadata } from "next";
import { contactCyberlabsMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = contactCyberlabsMetadata;

export default function ContactCyberlabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
