import { GgwButton } from "@/components/ui/ggw-button";
import { siteRoutes } from "@/config/routes";

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto max-w-content border-x border-dashed border-hairline">
      <section className="px-4 pb-20 pt-32 text-center md:px-8 md:pb-28 md:pt-40">
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-muted">404</p>
        <h1 className="mx-auto mt-4 max-w-[18ch] text-balance text-hero text-ink">
          This page is <span className="bg-brand-accent px-1.5 text-on-primary">not here</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[46ch] text-copy text-body">
          The address does not match a page. Go back home, or open the services.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GgwButton href={siteRoutes.home} variant="accent" className="h-11 px-5">
            Back home
          </GgwButton>
          <GgwButton href={siteRoutes.services} variant="secondary" className="h-11 px-5">
            View services
          </GgwButton>
        </div>
      </section>
    </div>
  );
}
