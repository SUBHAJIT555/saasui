import type { Metadata } from "next";
import { learningEnvironmentMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = learningEnvironmentMetadata;

export default function LearningEnvironmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
