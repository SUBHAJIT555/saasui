import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/features/service-detail/ServiceDetailPage";
import { getService, services } from "@/config/data/services";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getService(slug)) notFound();
  return <ServiceDetailPage slug={slug} />;
}
