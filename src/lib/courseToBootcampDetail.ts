import type { BootcampDetail, BootcampDeepDiveSection } from "@/types/bootcampDetail";
import type { Bus, Course } from "@/types/program";

const stripBold = (text: string) => text.replace(/\*\*/g, "");

const syllabusToSections = (syllabus: Bus[]): BootcampDeepDiveSection[] =>
    syllabus.map((bus) => {
        const paragraphs: string[] = [];
        const points: string[] = [];
        const closingParagraphs: string[] = [];
        let seenPoints = false;

        for (const block of bus.content) {
            if (block.points?.length) {
                if (block.paragraphs?.length) {
                    paragraphs.push(...block.paragraphs.map(stripBold));
                }
                points.push(...block.points.map(stripBold));
                seenPoints = true;
            } else if (block.paragraphs?.length) {
                const stripped = block.paragraphs.map(stripBold);
                if (seenPoints) {
                    closingParagraphs.push(...stripped);
                } else {
                    paragraphs.push(...stripped);
                }
            }
        }

        const section: BootcampDeepDiveSection = { title: bus.title };
        if (paragraphs.length) section.paragraphs = paragraphs;
        if (points.length) section.points = points;
        if (closingParagraphs.length) section.closingParagraphs = closingParagraphs;
        return section;
    });

export function courseToBootcampDetail(course: Course): BootcampDetail | undefined {
    if (
        !course.moduleChart?.length ||
        !course.syllabus?.length ||
        !course.programTeaches ||
        !course.laymanExplanation ||
        !course.programDeepDive ||
        !course.careerChart?.length
    ) {
        return undefined;
    }

    const introParagraphs = course.descriptionParagraphs?.length
        ? course.descriptionParagraphs.map(stripBold)
        : [course.description];

    const whatsNew = course.programWhatsNew ?? {
        heading: course.whatsNew.heading.title,
        items: (course.whatsNew.cards[0]?.features ?? []).map((feature) => ({
            title: feature.title ?? "",
            text: stripBold(feature.text),
        })),
        closingParagraph: "",
    };

    return {
        slug: course.slug,
        hero: {
            tagLine: course.programTagLine,
            introParagraphs,
        },
        moduleChart: course.moduleChart,
        deepDive: {
            title: course.programDeepDive.title,
            subtitle: stripBold(course.programDeepDive.subtitle),
            introParagraphs: course.programDeepDive.paragraphs.map(stripBold),
            sections: syllabusToSections(course.syllabus),
        },
        programTeaches: course.programTeaches,
        laymanExplanation: course.laymanExplanation,
        careerIntro: course.careerIntro ?? "",
        careerChart: course.careerChart,
        careerClosing: course.careerClosing ?? "",
        whatsNew: {
            heading: whatsNew.heading,
            items: whatsNew.items,
            closingParagraph: whatsNew.closingParagraph ?? "",
        },
    };
}

export function getCourseDetailBySlug(
    courses: Course[],
    slug: string,
): BootcampDetail | undefined {
    const course = courses.find((item) => item.slug === slug);
    if (!course) return undefined;
    return courseToBootcampDetail(course);
}
