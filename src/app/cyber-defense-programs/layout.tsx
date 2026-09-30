import type { Metadata } from "next";
import { programsMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = programsMetadata;

export default function CyberDefenseProgramsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
