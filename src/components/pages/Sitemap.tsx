"use client";

import { Link } from "@/lib/react-router";
import { sitemapBlocks } from "@/config/data/sitemap";

function SitemapLinkItem({
    label,
    path,
    external,
}: {
    label: string;
    path: string;
    external?: boolean;
}) {
    const className =
        "text-sm leading-snug text-blue-600 transition hover:underline md:text-[15px]";

    if (external || path.startsWith("http") || path.startsWith("mailto:")) {
        return (
            <a
                href={path}
                target={path.startsWith("http") ? "_blank" : undefined}
                rel={path.startsWith("http") ? "noreferrer" : undefined}
                className={className}
            >
                {label}
            </a>
        );
    }

    return (
        <Link to={path} className={className}>
            {label}
        </Link>
    );
}

function SitemapColumn({ title, links }: { title: string; links: { label: string; path: string; external?: boolean }[] }) {
    return (
        <div>
            <h3 className="text-sm font-semibold text-zinc-900 md:text-[15px]">{title}</h3>
            <ul className="mt-3 space-y-2">
                {links.map((link) => (
                    <li key={`${title}-${link.path}`}>
                        <SitemapLinkItem
                            label={link.label}
                            path={link.path}
                            external={link.external}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const Sitemap = () => {
    return (
        <div className="relative z-10 bg-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8 mt-8">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
                    CYBERLABS Site Map
                </h1>
                <div className="mt-6 border-t border-zinc-200" aria-hidden />

                {sitemapBlocks.map((block, blockIndex) => (
                    <section
                        key={block.title ?? `block-${blockIndex}`}
                        className={blockIndex === 0 ? "pt-8 md:pt-10" : "pt-10 md:pt-12"}
                    >
                        {block.title ? (
                            <>
                                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
                                    {block.title}
                                </h2>
                                <div className="mt-4 border-t border-zinc-200" aria-hidden />
                            </>
                        ) : null}

                        <div
                            className={`grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 ${
                                block.title ? "mt-8" : ""
                            }`}
                        >
                            {block.columns.map((column) => (
                                <SitemapColumn
                                    key={`${block.title ?? "overview"}-${column.title}`}
                                    title={column.title}
                                    links={column.links}
                                />
                            ))}
                        </div>

                        {blockIndex < sitemapBlocks.length - 1 ? (
                            <div className="mt-10 border-t border-zinc-200 md:mt-12" aria-hidden />
                        ) : null}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Sitemap;
