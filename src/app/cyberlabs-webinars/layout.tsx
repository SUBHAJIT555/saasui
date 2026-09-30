import type { Metadata } from "next";
import { cyberlabsWebinarsMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = cyberlabsWebinarsMetadata;

export default function CyberlabsWebinarsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
