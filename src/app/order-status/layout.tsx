import type { Metadata } from "next";
import { orderStatusMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = orderStatusMetadata;

export default function OrderStatusLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
