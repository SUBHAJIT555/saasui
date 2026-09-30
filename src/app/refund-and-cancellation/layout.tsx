import type { Metadata } from "next";
import { refundPolicyMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = refundPolicyMetadata;

export default function RefundPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
