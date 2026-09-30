import { bootcamps } from "@/config/constants/bootcampData";
import { courses } from "@/config/constants/programData";
import { programsMetadata } from "@/config/constants/pageMetadata";
import { createPageMetadata, truncateDescription } from "@/lib/siteMetadata";

export function getCoursePageMetadata(slug: string) {
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return programsMetadata;
  }

  return createPageMetadata(
    course.title,
    truncateDescription(course.description),
    { path: `/cyber-defense-programs/${slug}` },
  );
}

export function getBootcampPageMetadata(slug: string) {
  const bootcamp = bootcamps.find((item) => item.slug === slug);

  if (!bootcamp) {
    return programsMetadata;
  }

  return createPageMetadata(
    bootcamp.title,
    truncateDescription(bootcamp.description),
    { path: `/cyber-defense-programs/bootcamp/${slug}` },
  );
}
