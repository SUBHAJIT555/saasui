import type { Metadata } from "next";
import { privacyPolicyMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = privacyPolicyMetadata;

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
