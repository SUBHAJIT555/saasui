import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";

const DrawerRoot = DialogPrimitive.Root;
DrawerRoot.displayName = "Drawer";

const DrawerTrigger = DialogPrimitive.Trigger;
DrawerTrigger.displayName = "DrawerTrigger";

const DrawerClose = DialogPrimitive.Close;
DrawerClose.displayName = "DrawerClose";

const DrawerPortal = DialogPrimitive.Portal;
DrawerPortal.displayName = "DrawerPortal";

const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <DialogPrimitive.Overlay
      ref={forwardedRef}
      className={cn(
            "fixed inset-0 z-50 bg-white/50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      {...rest}
    />
  );
});
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "left" | "right";
    title?: string;
  }
>(({ className, children, side = "right", title = "Navigation menu", ...rest }, forwardedRef) => {
  const isLeft = side === "left";

  return (
    <DrawerPortal>
      <DrawerOverlay>
        <DialogPrimitive.Content
          ref={forwardedRef}
          className={cn(
            "fixed top-0 z-50 h-full w-full max-w-100 md:max-w-[420px] lg:max-w-[480px]",
            isLeft ? "left-0" : "right-0",
            "border-hairline border-dashed bg-canvas",
            isLeft ? "border-r" : "border-l",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            isLeft
              ? "data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full"
              : "data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
            "data-[state=open]:duration-200 data-[state=closed]:duration-200",
            "overflow-hidden",
            className
          )}
          {...rest}
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <div className="relative flex size-full flex-col bg-canvas">
            <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
          </div>
        </DialogPrimitive.Content>
      </DrawerOverlay>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

function DrawerHeader({
  className,
  children,
  showCloseButton = true,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-between border-b border-dashed border-hairline px-4 py-3",
        className
      )}
      {...rest}
    >
      {children}
      {showCloseButton && (
        <DrawerClose asChild>
          <button
            type="button"
            aria-label="Close menu"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-dashed border-hairline text-ink"
          >
            <IoClose className="h-5 w-5" aria-hidden />
          </button>
        </DrawerClose>
      )}
    </div>
  );
}
DrawerHeader.displayName = "DrawerHeader";

const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <DialogPrimitive.Title
      ref={forwardedRef}
      className={cn(
        "flex-1 text-lg sm:text-xl font-montserrat text-text-primary",
        className
      )}
      {...rest}
    />
  );
});
DrawerTitle.displayName = "DrawerTitle";

function DrawerBody({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-lenis-prevent className={cn("flex-1 min-h-0 overflow-y-auto", className)} {...rest}>
      {children}
    </div>
  );
}
DrawerBody.displayName = "DrawerBody";

function DrawerFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 border-t border-dashed border-hairline p-4 sm:p-6",
        className
      )}
      {...rest}
    />
  );
}
DrawerFooter.displayName = "DrawerFooter";

export {
  DrawerRoot as Root,
  DrawerTrigger as Trigger,
  DrawerClose as Close,
  DrawerContent as Content,
  DrawerHeader as Header,
  DrawerTitle as Title,
  DrawerBody as Body,
  DrawerFooter as Footer,
};
