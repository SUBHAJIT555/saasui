import type { MetadataRoute } from "next";
import { getInternalSitemapPaths } from "@/config/data/sitemap";
import { getSiteUrl } from "@/lib/siteMetadata";

export function pathToSitemapUrl(path: string, siteUrl = getSiteUrl()): string {
    const base = siteUrl.replace(/\/$/, "");
    if (path === "/") {
        return `${base}/`;
    }
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

function getSitemapPriority(path: string): number {
    if (path === "/") {
        return 1;
    }
    if (path === "/services") {
        return 0.9;
    }
    if (path.startsWith("/services/")) {
        return 0.8;
    }
    if (path === "/sitemap") {
        return 0.4;
    }
    if (
        path === "/terms-and-conditions" ||
        path === "/privacy-policy" ||
        path === "/cookie-policy" ||
        path === "/refund-and-cancellation"
    ) {
        return 0.5;
    }
    return 0.7;
}

function getSitemapChangeFrequency(
    path: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
    if (path === "/") {
        return "weekly";
    }
    if (path.startsWith("/services")) {
        return "weekly";
    }
    return "monthly";
}

export function getSitemapXmlEntries(): MetadataRoute.Sitemap {
    const siteUrl = getSiteUrl();

    return getInternalSitemapPaths().map((path) => ({
        url: pathToSitemapUrl(path, siteUrl),
        lastModified: new Date(),
        changeFrequency: getSitemapChangeFrequency(path),
        priority: getSitemapPriority(path),
    }));
}
