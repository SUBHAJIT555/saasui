import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./shiny-button.css";

export type ShinyButtonVariant = "default" | "light";
export type ShinyButtonSize = "default" | "compact";

type ShinyButtonClassOptions = {
  variant?: ShinyButtonVariant;
  size?: ShinyButtonSize;
  className?: string;
};

export function shinyButtonClasses({
  variant = "default",
  size = "default",
  className,
}: ShinyButtonClassOptions = {}) {
  return cn(
    "shiny-cta",
    variant === "light" && "shiny-cta--light",
    size === "compact" && "shiny-cta--compact",
    className,
  );
}

export interface ShinyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: ShinyButtonVariant;
  size?: ShinyButtonSize;
}

export function ShinyButton({
  children,
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ShinyButtonProps) {
  return (
    <button
      type={type}
      className={shinyButtonClasses({ variant, size, className })}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
