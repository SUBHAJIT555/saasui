import type { Metadata } from "next";
import { pricingMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = pricingMetadata;

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
