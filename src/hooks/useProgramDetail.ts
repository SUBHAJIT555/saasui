import { useParams } from "@/lib/react-router";
import { useBootcamps } from "@/hooks/useBootcamps";
import { useCourses } from "@/hooks/useCourses";
import type { BootcampDetail } from "@/types/bootcampDetail";

export function usePageDetail(): BootcampDetail | undefined {
    const { slug } = useParams();
    const { getBootcampDetailBySlug } = useBootcamps();
    const { getCourseDetailBySlug } = useCourses();

    if (!slug) return undefined;

    return getBootcampDetailBySlug(slug) ?? getCourseDetailBySlug(slug);
}
