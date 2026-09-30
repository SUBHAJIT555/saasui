import type { Metadata } from "next";
import { getServicePageMetadata } from "@/config/constants/pageMetadata";

type ServiceLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Pick<ServiceLayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  return getServicePageMetadata(slug);
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return children;
}
