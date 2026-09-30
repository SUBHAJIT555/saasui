import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

import type { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assetSrc(source: string | StaticImageData): string {
  return typeof source === "string" ? source : source.src;
}

/** Removes leading section numbers like "3. " from headings */
export function stripLeadingNumber(text: string) {
  return text.replace(/^\d+\.\s*/, "");
}

/** Parses text with **bold** markers and returns React nodes (string + <strong>) */
export function parseBoldText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) {
      parts.push(remaining);
      break;
    }
    if (boldStart > 0) parts.push(remaining.slice(0, boldStart));
    const afterFirst = remaining.slice(boldStart + 2);
    const boldEnd = afterFirst.indexOf("**");
    if (boldEnd === -1) {
      parts.push("**" + afterFirst);
      break;
    }
    parts.push(
      React.createElement("strong", { key: key++ }, afterFirst.slice(0, boldEnd))
    );
    remaining = afterFirst.slice(boldEnd + 2);
  }
  return React.createElement(React.Fragment, null, ...parts);
}
