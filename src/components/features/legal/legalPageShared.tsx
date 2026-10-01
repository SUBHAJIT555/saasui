"use client";

import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { Link } from "@/lib/react-router";
import { CONTACT } from "@/config/constants/contactInfo";
import { legalNav } from "@/config/routes";
import { assetSrc, cn } from "@/lib/utils";

export const LEGAL_UPDATED = "1 October 2026";

type LegalPageProps = {
  label: string;
  title: string;
  highlight: string;
  summary: string;
  currentPath: string;
  image?: string | StaticImageData;
  children: ReactNode;
};

export function LegalPage({
  label,
  title,
  highlight,
  summary,
  currentPath,
  image,
  children,
}: LegalPageProps) {
  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <section className="relative isolate overflow-hidden border-b border-dashed border-hairline px-4 pb-12 pt-32 text-center md:px-8 md:pb-16 md:pt-40">
        {image ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-96 overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 70%)",
              maskImage: "linear-gradient(to bottom, #000 0%, transparent 70%)",
            }}
            aria-hidden
          >
            {/* Source photos are near-black, so they are lightened to stay behind dark heading text */}
            <img
              src={assetSrc(image)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center opacity-15 grayscale"
            />
          </div>
        ) : null}

        <div className="relative z-10">
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
          <h1 className="mx-auto mt-4 max-w-[16ch] text-balance text-hero text-ink">
            {title} <span className="bg-brand-accent px-1.5 text-on-primary">{highlight}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[52ch] text-copy text-body">{summary}</p>
          <p className="mt-4 text-caption text-muted">Updated {LEGAL_UPDATED}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <nav aria-label="Legal pages" className="mb-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-dashed border-hairline pb-6">
          {legalNav.map((item) => {
            const active = item.path === currentPath;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-caption",
                  active ? "font-semibold text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        {children}
        <LegalContact />
      </div>
    </div>
  );
}

export function LegalSection({
  number,
  title,
  children,
  last = false,
}: {
  number: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section className={cn(!last && "mb-8 border-b border-dashed border-hairline pb-8 md:mb-10 md:pb-10")}>
      <h2 className="text-title-sm font-semibold text-ink">
        <span className="mr-2 text-brand-accent">{number}</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-copy text-body">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalContact() {
  return (
    <div className="mt-10 rounded-lg border border-hairline bg-surface-soft p-5 md:p-6">
      <h2 className="text-title-sm font-semibold text-ink">Write to us</h2>
      <p className="mt-2 text-copy text-body">
        Questions about these pages go to {CONTACT.registeredEntity}.
      </p>
      <p className="mt-3 text-copy text-ink">
        <a href={`mailto:${CONTACT.supportEmail}`} className="text-brand-accent hover:underline">
          {CONTACT.supportEmail}
        </a>
      </p>
      <p className="mt-2 text-copy text-body">
        {CONTACT.officeAddressIndia[0]}
        <br />
        {CONTACT.officeAddressIndia[1]}
        <br />
        {CONTACT.officeAddressIndia[2]}
      </p>
    </div>
  );
}
