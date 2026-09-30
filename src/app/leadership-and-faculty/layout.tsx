import type { Metadata } from "next";
import { leadershipAndFacultyMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = leadershipAndFacultyMetadata;

export default function LeadershipAndFacultyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
