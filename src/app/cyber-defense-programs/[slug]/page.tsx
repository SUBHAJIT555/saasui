import CourseDetails from "@/components/pages/CourseDetails";
import { courses } from "@/config/constants/programData";

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function Page() {
  return <CourseDetails />;
}
