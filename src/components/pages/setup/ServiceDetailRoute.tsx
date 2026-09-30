import { notFound } from "next/navigation";
import { checkoutPath, getService } from "@/config/data/services";
import { siteRoutes } from "@/config/routes";
import RouteShell, { RouteTextLink } from "@/components/pages/setup/RouteShell";

export default function ServiceDetailRoute({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) {
    notFound();
  }

  return (
    <RouteShell
      kicker="Service"
      title={service.name}
      description={service.summary}
    >
      <p className="text-sm text-zinc-500">
        Example payment purpose: <span className="text-zinc-900">{service.paymentPurpose}</span>
      </p>
      <ul className="mt-6 space-y-2 text-sm text-zinc-700">
        {service.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-8 flex flex-wrap gap-4 text-sm">
        <RouteTextLink to={checkoutPath(service.slug)}>Continue to checkout</RouteTextLink>
        <RouteTextLink to={siteRoutes.services}>All services</RouteTextLink>
      </p>
    </RouteShell>
  );
}
