import BootcampDetails from "@/components/pages/BootcampDetails";
import { bootcamps } from "@/config/constants/bootcampData";

export function generateStaticParams() {
  return bootcamps.map((bootcamp) => ({
    slug: bootcamp.slug,
  }));
}

export default function Page() {
  return <BootcampDetails />;
}
