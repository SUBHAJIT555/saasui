import type { Metadata } from "next";
import { aboutMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = aboutMetadata;

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
