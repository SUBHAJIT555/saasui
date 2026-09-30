import type { Metadata } from "next";
import { checkoutPaymentMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = checkoutPaymentMetadata;

export default function CheckoutPaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
