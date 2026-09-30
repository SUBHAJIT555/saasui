"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@/lib/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent";

const baseClass = cn(
  "relative inline-flex cursor-pointer items-center justify-center gap-2 select-none",
  "h-11 px-5 text-button font-semibold rounded-md transition-all duration-200",
  "active:scale-[0.98]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
);

const variantClass: Record<Variant, string> = {
  primary: cn(
    "bg-linear-to-b from-[#3f3f3f] to-[#111111] text-on-primary",
    "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset]",
    "hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]",
    "ring ring-white/20 ring-inset ring-offset-2 ring-offset-[#111111]",
    "hover:ring-white/40",
  ),
  secondary: cn(
    "bg-linear-to-b from-white to-[#e5e5e5] text-[#111111]",
    "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.9)_inset]",
    "hover:shadow-[0px_0px_16px_0px_rgba(255,255,255,1)_inset]",
    "ring ring-black/10 ring-inset ring-offset-2 ring-offset-white",
    "hover:ring-black/20",
  ),
  accent: cn(
    "bg-linear-to-b from-[#5B8AFF] to-[#2667FF] text-on-primary",
    "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.25)_inset]",
    "hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]",
    "ring ring-white/25 ring-inset ring-offset-2 ring-offset-[#2667FF]",
    "hover:ring-white/45",
  ),
};

type GgwButtonProps = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function GgwButton({
  variant = "accent",
  href,
  children,
  className,
  type = "button",
  ...rest
}: GgwButtonProps) {
  const classes = cn(baseClass, variantClass[variant], className);

  if (href) {
    if (/^(https?:|upi:|mailto:|tel:)/i.test(href)) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

export function AccentLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block w-fit bg-brand-accent px-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-on-primary">
      {children}
    </span>
  );
}
