import { checkoutPath, servicePath, services } from "@/config/data/services";
import { siteRoutes } from "@/config/routes";
import RouteShell, { RouteTextLink } from "@/components/pages/setup/RouteShell";

export default function ServicesRoute() {
  return (
    <RouteShell
      kicker="Services"
      title="Services"
      description="Six business services. Each one has its own page and a payment purpose used at checkout."
    >
      <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
        {services.map((service) => (
          <li key={service.slug} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <RouteTextLink to={servicePath(service.slug)}>{service.name}</RouteTextLink>
              <p className="mt-1 max-w-xl text-sm text-zinc-600">{service.summary}</p>
            </div>
            <p className="shrink-0 text-sm text-zinc-500">{service.paymentPurpose}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-zinc-500">
        <RouteTextLink to={siteRoutes.contact}>Contact</RouteTextLink>
        {" · "}
        <RouteTextLink to={checkoutPath()}>Checkout</RouteTextLink>
      </p>
    </RouteShell>
  );
}
