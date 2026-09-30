"use client";

import type { ReactNode } from "react";
import { Link } from "@/lib/react-router";

type RouteShellProps = {
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function RouteShell({
  kicker,
  title,
  description,
  children,
}: RouteShellProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-28 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {kicker}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">
        {description}
      </p>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}

export function RouteTextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="font-medium text-zinc-900 underline underline-offset-4 transition hover:text-zinc-600"
    >
      {children}
    </Link>
  );
}
