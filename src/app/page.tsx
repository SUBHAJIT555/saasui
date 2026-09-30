import type { Metadata } from "next";
import { homeMetadata } from "@/config/constants/pageMetadata";
import HomePage from "./HomePage";

export const metadata: Metadata = homeMetadata;

export default function Page() {
  return <HomePage />;
}
