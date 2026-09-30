import type { Metadata } from "next";
import { contactMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = contactMetadata;

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
