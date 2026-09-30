import type { Metadata } from "next";
import { getBootcampPageMetadata } from "@/lib/programMetadata";

type BootcampLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Pick<BootcampLayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  return getBootcampPageMetadata(slug);
}

export default function BootcampDetailsLayout({ children }: BootcampLayoutProps) {
  return children;
}
