export interface BootcampModuleChartItem {
    module: string;
    focusArea: string;
    whatYouLearn: string;
}

export interface BootcampDeepDiveSection {
    title: string;
    paragraphs?: string[];
    points?: string[];
    closingParagraphs?: string[];
}

export interface BootcampDeepDive {
    title: string;
    subtitle: string;
    introParagraphs: string[];
    sections: BootcampDeepDiveSection[];
}

export interface BootcampProgramTeaches {
    whatYouLearn: string[];
    whatYouLearnNote?: string;
    readinessIntro?: string;
    readinessSubheading?: string;
    readinessPoints: string[];
    closingStatement: string;
}

export interface BootcampLaymanExplanation {
    heading: string;
    lines: string[];
}

export interface BootcampCareerChartItem {
    jobRole: string;
    whatYouDo: string;
    exampleEmployers: string;
}

export interface BootcampWhatsNewItem {
    title: string;
    text: string;
}

export interface BootcampDetailHero {
    tagLine: string;
    introParagraphs: string[];
    phase2Label?: string;
    launchAnnouncement?: string;
}

export interface BootcampDetail {
    slug: string;
    hero: BootcampDetailHero;
    moduleChart: BootcampModuleChartItem[];
    deepDive: BootcampDeepDive;
    programTeaches: BootcampProgramTeaches;
    laymanExplanation: BootcampLaymanExplanation;
    careerIntro: string;
    careerChart: BootcampCareerChartItem[];
    careerClosing: string;
    whatsNew: {
        heading: string;
        items: BootcampWhatsNewItem[];
        closingParagraph: string;
    };
}
