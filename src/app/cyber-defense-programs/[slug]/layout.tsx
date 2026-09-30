import type { Metadata } from "next";
import { getCoursePageMetadata } from "@/lib/programMetadata";

type CourseLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Pick<CourseLayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  return getCoursePageMetadata(slug);
}

export default function CourseDetailsLayout({ children }: CourseLayoutProps) {
  return children;
}
