import type { MetadataRoute } from "next";
import { getSitemapXmlEntries } from "@/lib/sitemapXml";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    return getSitemapXmlEntries();
}
