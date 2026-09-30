import { useMemo } from "react";
import { bootcamps } from "@/config/constants/bootcampData";
import { bootcampDetails } from "@/config/constants/bootcampDetailData";
import type { Bootcamp } from "@/types/bootcamp";
import type { BootcampDetail } from "@/types/bootcampDetail";

type UseBootcampsReturn = {
    getBootcamps: () => Bootcamp[];
    getBootcampBySlug: (slug: string) => Bootcamp | undefined;
    getBootcampDetailBySlug: (slug: string) => BootcampDetail | undefined;
};

export const useBootcamps = (): UseBootcampsReturn => {
    const getBootcamps = () => bootcamps;

    const getBootcampBySlug = (slug: string) =>
        bootcamps.find((bootcamp) => bootcamp.slug === slug);

    const getBootcampDetailBySlug = (slug: string) =>
        bootcampDetails.find((detail) => detail.slug === slug);

    return useMemo<UseBootcampsReturn>(
        () => ({
            getBootcamps,
            getBootcampBySlug,
            getBootcampDetailBySlug,
        }),
        []
    );
};
