"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[];
  title?: string;
  answerClassName?: string;
  defaultOpenIndex?: number | null;
}

export function FaqAccordion({
  items,
  title,
  answerClassName,
  defaultOpenIndex = null,
  className,
  ...props
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultOpenIndex);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className={cn("relative mx-auto w-full max-w-4xl font-sans", className)}
      {...props}
    >
      {title ? (
        <h2 className="mb-10 text-center text-2xl font-bold text-zinc-500 md:text-3xl">
          {title}
        </h2>
      ) : null}

      <ul className="mx-auto flex w-full list-none flex-col p-0">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={index}
              className={cn(
                "relative w-full transition-all duration-300 ease-in",
                "border-b-2 border-zinc-100",
                "last:border-b-0",
                isActive ? "border-b border-zinc-200" : "",
              )}
            >
              <button
                type="button"
                className={cn(
                  "group relative m-0 flex min-h-[60px] w-full cursor-pointer flex-row items-center justify-start px-4 py-4 pl-14 text-left text-base outline-none md:text-lg",
                  "border-l-[6px] transition-colors duration-200 md:border-l-10",
                  isActive
                    ? "border-l-blue-600 bg-zinc-200 border-b-zinc-300 border-b-dashed font-semibold text-zinc-900"
                    : "border-l-blue-200 bg-transparent text-zinc-600 hover:border-l-blue-400 hover:bg-blue-50/60 hover:text-zinc-900",
                )}
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                <span
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 leading-none transition-all duration-200 md:left-5",
                    isActive
                      ? "text-[32px] font-normal text-blue-600 md:text-[40px]"
                      : "text-[24px] font-normal text-blue-300 group-hover:text-blue-400 md:text-[30px]",
                  )}
                >
                  {isActive ? "-" : "+"}
                </span>

                <span className="pr-8">{item.question}</span>

                <span
                  className={cn(
                    "absolute right-6 block h-2 w-2 border-r-[3px] border-t-[3px] transition-transform duration-200 ease-in-out",
                    isActive
                      ? "rotate-[-44deg] border-blue-600"
                      : "rotate-133 border-blue-300 group-hover:border-blue-400",
                  )}
                />
              </button>

              <div
                className={cn(
                  "grid w-full transition-all duration-300 ease-in-out",
                  "border-l-[6px] md:border-l-10",
                  isActive
                    ? "grid-rows-[1fr] border-l-blue-600 bg-zinc-100"
                    : "grid-rows-[0fr] border-l-blue-200 bg-transparent",
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "flex w-full flex-row items-start justify-start px-4 pb-6 pl-14 pt-2 text-base font-normal text-zinc-700 md:text-lg",
                      answerClassName,
                    )}
                  >
                    <div className="opacity-90">{item.answer}</div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
