import type { Metadata } from "next";
import { cookiePolicyMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = cookiePolicyMetadata;

export default function CookiePolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
