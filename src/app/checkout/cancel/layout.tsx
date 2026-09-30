import type { Metadata } from "next";
import { checkoutCancelMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = checkoutCancelMetadata;

export default function CheckoutCancelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
