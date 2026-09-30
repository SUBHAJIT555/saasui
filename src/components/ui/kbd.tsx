import * as React from "react";
import { cn } from "@/lib/utils";

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-300 bg-white px-1.5 font-inter-display text-[10px] font-medium text-gray-600 opacity-100",
        
        className
      )}
      {...props}
    />
  );
});
Kbd.displayName = "Kbd";

export { Kbd };
