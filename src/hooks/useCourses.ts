/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from "react";
import { courses } from "@/config/constants/programData";
import { getCourseDetailBySlug as resolveCourseDetailBySlug } from "@/lib/courseToBootcampDetail";
import type { BootcampDetail } from "@/types/bootcampDetail";
import type {
  Bus,
  Course,
  Hero,
  WhatsNew,
  ModuleChartItem,
  CareerChartItem,
  ProgramTeaches,
  ProgramDeepDive,
} from "@/types/program";

type CleanedCourse = Omit<
  Course,
  "hero" | "whatsNew" | "syllabus" | "syllabusLink"
>;

const stripCourse = (course: Course): CleanedCourse => {
  const { hero, whatsNew, syllabus, syllabusLink, ...rest } = course;
  return rest;
};

type UseCoursesReturn = {
  getCourses: () => CleanedCourse[];
  getCourseBySlug: (slug: string) => Course | undefined;
  getCourseHeroBySlug: (slug: string) => Hero | undefined;
  getCourseWhatsNewBySlug: (slug: string) => WhatsNew | undefined;
  getCourseSyllabusBySlug: (slug: string) => Bus[] | undefined;
  getCourseSyllabusLinkBySlug: (slug: string) => string | undefined;
  getCourseModuleChartBySlug: (slug: string) => ModuleChartItem[] | undefined;
  getCourseCareerChartBySlug: (slug: string) => CareerChartItem[] | undefined;
  getCourseProgramTeachesBySlug: (slug: string) => ProgramTeaches | undefined;
  getCourseProgramDeepDiveBySlug: (slug: string) => ProgramDeepDive | undefined;
  getCourseDetailBySlug: (slug: string) => BootcampDetail | undefined;
};

export const useCourses = (): UseCoursesReturn => {
  const getCourses = () => courses.map(stripCourse);

  const getCourseBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug);

  const getCourseHeroBySlug = (slug: string) => {
    const course = getCourseBySlug(slug);
    if (!course) return undefined;
    return {
      ...course.hero,
      subheading: course.subheading,
    };
  };

  const getCourseDetailBySlug = (slug: string) =>
    resolveCourseDetailBySlug(courses, slug);

  const getCourseWhatsNewBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)?.whatsNew;

  const getCourseSyllabusBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)?.syllabus;

  const getCourseSyllabusLinkBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)?.syllabusLink;

  const getCourseModuleChartBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)?.moduleChart;

  const getCourseCareerChartBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)?.careerChart;

  const getCourseProgramTeachesBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)?.programTeaches;

  const getCourseProgramDeepDiveBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)?.programDeepDive;

  return useMemo<UseCoursesReturn>(
    () => ({
      getCourses,
      getCourseBySlug,
      getCourseHeroBySlug,
      getCourseWhatsNewBySlug,
      getCourseSyllabusBySlug,
      getCourseSyllabusLinkBySlug,
      getCourseModuleChartBySlug,
      getCourseCareerChartBySlug,
      getCourseProgramTeachesBySlug,
      getCourseProgramDeepDiveBySlug,
      getCourseDetailBySlug,
    }),
    []
  );
};
