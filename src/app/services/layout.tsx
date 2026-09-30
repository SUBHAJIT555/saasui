import type { Metadata } from "next";
import { servicesMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = servicesMetadata;

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
