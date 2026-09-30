"use client";

import { Suspense, type ReactNode } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { LenisProvider } from "@/providers/LenisContext";
import { LoaderOne } from "@/components/ui/loader";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-bg">
          <LoaderOne />
        </div>
      }
    >
      <LenisProvider>
        <ParallaxProvider>{children}</ParallaxProvider>
      </LenisProvider>
    </Suspense>
  );
}
