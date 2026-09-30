import type { Metadata } from "next";
import { checkoutMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = checkoutMetadata;

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
