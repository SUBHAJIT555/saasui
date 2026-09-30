import type { Metadata } from "next";
import { sitemapMetadata } from "@/config/constants/pageMetadata";

export const metadata: Metadata = sitemapMetadata;

export default function SitemapLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
