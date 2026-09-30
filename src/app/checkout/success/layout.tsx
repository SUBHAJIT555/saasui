import type { Metadata } from "next";
import { checkoutSuccessMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = checkoutSuccessMetadata;

export default function CheckoutSuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
