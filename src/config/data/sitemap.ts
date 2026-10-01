import { CONTACT } from "@/config/constants/contactInfo";
import { servicePath, services } from "@/config/data/services";
import { legalNav, primaryNav } from "@/config/routes";

export type SitemapLink = {
    label: string;
    path: string;
    external?: boolean;
};

export type SitemapColumn = {
    title: string;
    links: SitemapLink[];
};

export type SitemapBlock = {
    title?: string;
    columns: SitemapColumn[];
};

const serviceLinks: SitemapLink[] = services.map((service) => ({
    label: service.name,
    path: servicePath(service.slug),
}));

export const sitemapBlocks: SitemapBlock[] = [
    {
        columns: [
            {
                title: "Pages",
                links: primaryNav.map((item) => ({
                    label: item.name,
                    path: item.path,
                })),
            },
            {
                title: "Services",
                links: [
                    { label: "All services", path: "/services" },
                    ...serviceLinks,
                ],
            },
            {
                title: "Support",
                links: [
                    { label: "Contact", path: "/contact" },
                    {
                        label: CONTACT.supportEmail,
                        path: `mailto:${CONTACT.supportEmail}`,
                        external: true,
                    },
                ],
            },
            {
                title: "Legal & Policies",
                links: legalNav.map((item) => ({
                    label: item.name,
                    path: item.path,
                })),
            },
        ],
    },
    {
        title: "Connect",
        columns: [
            {
                title: "Get in Touch",
                links: [
                    {
                        label: CONTACT.supportEmail,
                        path: `mailto:${CONTACT.supportEmail}`,
                        external: true,
                    },
                    { label: "Contact", path: "/contact" },
                ],
            },
        ],
    },
];

export function getInternalSitemapPaths(): string[] {
    const paths = new Set<string>(["/sitemap"]);

    for (const block of sitemapBlocks) {
        for (const column of block.columns) {
            for (const link of column.links) {
                if (link.external || link.path.startsWith("mailto:")) {
                    continue;
                }
                paths.add(link.path);
            }
        }
    }

    return Array.from(paths).sort();
}

export function getSitemapLinkCount(): number {
    return sitemapBlocks.reduce(
        (count, block) =>
            count + block.columns.reduce((columnCount, column) => columnCount + column.links.length, 0),
        0,
    );
}
