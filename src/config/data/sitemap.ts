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
                        label: CONTACT.educationEmail,
                        path: `mailto:${CONTACT.educationEmail}`,
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
                        label: CONTACT.educationEmail,
                        path: `mailto:${CONTACT.educationEmail}`,
                        external: true,
                    },
                    { label: "Contact", path: "/contact" },
                ],
            },
            {
                title: "Follow",
                links: [
                    {
                        label: "Instagram",
                        path: "https://www.instagram.com/cyberlabsindia",
                        external: true,
                    },
                    {
                        label: "Facebook",
                        path: "https://www.facebook.com/profile.php?id=61587196465882",
                        external: true,
                    },
                    {
                        label: "YouTube",
                        path: "https://www.youtube.com/@cyberlabsindiabycyveritas-y7h",
                        external: true,
                    },
                    {
                        label: "LinkedIn",
                        path: "https://www.linkedin.com/company/cyberlabs-india/",
                        external: true,
                    },
                    { label: "WhatsApp", path: "https://wa.me/971504602632", external: true },
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
