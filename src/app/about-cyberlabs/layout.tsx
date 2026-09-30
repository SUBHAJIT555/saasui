import type { Metadata } from "next";
import { aboutCyberlabsMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = aboutCyberlabsMetadata;

export default function AboutCyberlabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
