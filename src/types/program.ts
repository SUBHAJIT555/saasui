export interface ProgramWhatsNew {
  heading: string;
  items: { title: string; text: string }[];
  closingParagraph?: string;
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  subheading?: string;
  category: string;
  language: string;
  instructor: string;
  image: string;
  duration: string;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  description: string;
  /** Optional: paragraphs with **bold** phrases for hero-style description block */
  descriptionParagraphs?: string[];
  certifications: string[];
  idealFor: string;
  whatYouLearn: string[];
  hero: Hero;
  whatsNew: WhatsNew;
  syllabusLink: string;
  syllabus: Bus[];
  programTagLine: string;
  moduleChart?: ModuleChartItem[];
  careerChart?: CareerChartItem[];
  careerIntro?: string;
  careerClosing?: string;
  laymanExplanation?: LaymanExplanation;
  programTeaches?: ProgramTeaches;
  programDeepDive?: ProgramDeepDive;
  /** Bootcamp-style detail page content for whatsNew section */
  programWhatsNew?: ProgramWhatsNew;
}

export interface Hero {
  title: string;
  subheading?: string;
  tags: Tag[];
  pricing: Pricing;
  buttons: Button[];
  enrollmentMessage: EnrollmentMessage;
  image: Image;
  details: Detail[];
}

export interface Tag {
  text: string;
}

export interface Pricing {
  currentPrice: string;
  originalPrice: string;
  currency: string;
  taxNote: string;
  discountText: string;
  image?: string;
}

export interface Button {
  text: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
}

export interface EnrollmentMessage {
  text: string;
  highlightedText: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Detail {
  label: string;
  value: string;
}

export interface WhatsNew {
  heading: Heading;
  differenceLabel: string;
  cards: Card[];
}

export interface Heading {
  title: string;
  subtitle: string;
  highlightedText: string;
}

export interface Card {
  title: string;
  price: string;
  titleColor: string;
  priceColor: string;
  features: Feature[];
  careerPreparation?: CareerPreparation;
}

export interface Feature {
  title?: string; // Bold title for numbered list format
  text: string;
  highlightedText?: string;
}

export interface CareerPreparation {
  title: string;
  items: string[];
}

import type { IconType } from "react-icons";

export interface Bus {
  id: number;
  title: string;
  icon: IconType;
  content: Content[];
}

export interface Content {
  heading?: string;
  paragraphs?: string[]; // Paragraphs with optional **bold** formatting
  points?: string[]; // Bullet points
}

export interface ModuleChartItem {
  module: string;
  focusArea: string;
  hours?: string;
  whatYouLearn: string;
}

export interface CareerChartItem {
  jobRole: string;
  whatYouDo: string;
  exampleEmployers: string;
}

export interface LaymanExplanation {
  heading: string;
  lines: string[];
}

export interface ProgramTeaches {
  whatYouLearn: string[];
  whatYouLearnNote?: string;
  readinessIntro: string;
  readinessSubheading: string;
  readinessPoints: string[];
  closingStatement: string;
}

export interface ProgramDeepDive {
  title: string;
  subtitle: string;
  paragraphs: string[];
}
