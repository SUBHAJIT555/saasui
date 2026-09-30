import type { Metadata } from "next";
import { payMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = payMetadata;

export default function PayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
