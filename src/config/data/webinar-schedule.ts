/**
 * Webinar schedule configuration — edit this file to update sessions anytime.
 * Each session needs a unique `id` and an ISO `scheduledAt` datetime (IST).
 * Registration auto-closes once `scheduledAt` has passed.
 */

export type WebinarSpeaker = {
  name: string;
  title: string;
};

export type WebinarSession = {
  id: string;
  /** ISO 8601 datetime, e.g. "2026-07-07T19:30:00+05:30" for 7:30 PM IST */
  scheduledAt: string;
  topic: string;
  speakers: WebinarSpeaker[];
  /** Set to false to manually close registration before the session date */
  registrationOpen?: boolean;
  /** Live session link (e.g. Microsoft Teams) — shown when registration is open */
  joinUrl?: string;
};

/** Webinar WhatsApp — international format without + or spaces */
export { WHATSAPP_NUMBER as webinarWhatsappNumber } from "@/config/data/site-contact";

export const defaultWebinarSpeakers: WebinarSpeaker[] = [
  {
    name: "Guy Klisman",
    title: "Founder & Chief Executive Officer, CYBERLABS",
  },
  {
    name: "Najeeb Ibrahim",
    title: "Chief Information Security Officer & Senior Instructor",
  },
];

export const webinarScheduleContent = {
  eyebrow: "Upcoming Webinar Schedule",
  title: "Join Our Live Webinars",
  description:
    "CYBERLABS conducts two live webinars every week, providing ongoing industry insight, career guidance, and cybersecurity awareness.",
  tableHeading: "Upcoming Sessions",
  tableColumns: {
    date: "Date",
    time: "Time",
    details: "Webinar Details",
    action: "Registration",
  },
  topicsLabel: "Topic:",
  speakersLabel: "Speakers:",
  registerLabel: "Register Now",
  whatsappLabel: "WhatsApp",
  joinWebinarLabel: "Join Webinar",
  joinNoticeNoLinkBody1: "The webinar link is not available now.",
  joinNoticeNoLinkBody2: "It's too early to join the webinar.",
  joinNoticeNoLinkBody3:
    "Please join 15 minutes before the scheduled time.",
  joinNoticeBeforeStartLead: "Starting in",
  joinNoticeBeforeStartBody1: "You can still join the webinar.",
  joinNoticeBeforeStartBody2:
    "Please join the webinar and wait in the lobby. The webinar will start at its originally scheduled time.",
  joinNoticeAfterStartTitle: "The webinar has already started.",
  joinNoticeAfterStartBody: "Please join as soon as possible.",
  joinNoticeCloseButton: "Close",
  detailsModalEyebrow: "Webinar Session",
  sessionEndedLabel: "Session Ended",
  upcomingLabel: "Upcoming",
  completedLabel: "Completed",
} as const;

export const backgroundOptions = [
  "Student",
  "IT Professional",
  "Security Professional",
  "Other",
] as const;

export type BackgroundOption = (typeof backgroundOptions)[number];

export const upcomingWebinars: WebinarSession[] = [
  {
    id: "future-skills-mncs-2026",
    scheduledAt: "2026-07-07T19:30:00+05:30",
    topic:
      "The Future of Cybersecurity Careers: Skills MNCs Will Actually Pay For in 2026 (Focus: General Career Guidance & The Practitioner Blueprint)",
    speakers: defaultWebinarSpeakers,
    joinUrl:
      "https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZmEwMzU1NTYtN2MzNC00NGE4LThmMjctODJhZmJjMGZhMWFk%40thread.v2/0?context=%7b%22Tid%22%3a%229b493966-90e5-4819-a9d0-930fe394daa6%22%2c%22Oid%22%3a%221a2bee5e-6684-4528-8fb6-c182be062d97%22%7d",
  },
  {
    id: "modern-cyber-attacks",
    scheduledAt: "2026-07-09T19:30:00+05:30",
    topic:
      "How Modern Cyber Attacks Actually Work: Lessons from Real-World Investigations (Focus: Threat Hunting & Enterprise Reality)",
    speakers: defaultWebinarSpeakers,
  },
  {
    id: "ai-vs-cybersecurity",
    scheduledAt: "2026-07-14T19:30:00+05:30",
    topic:
      "AI vs Cybersecurity: Will Artificial Intelligence Replace Security Professionals? (Focus: AI Security & Future-proofing careers)",
    speakers: defaultWebinarSpeakers,
  },
  {
    id: "inside-dark-web",
    scheduledAt: "2026-07-16T19:30:00+05:30",
    topic:
      "Inside the Dark Web: What Really Happens Beyond the Surface Internet (Focus: Dark Web Intelligence & Cybercrime)",
    speakers: defaultWebinarSpeakers,
  },
  {
    id: "why-companies-still-hacked",
    scheduledAt: "2026-07-21T19:30:00+05:30",
    topic:
      "Why Companies Still Get Hacked Despite Spending Millions on Cybersecurity (Focus: Detection Engineering & Operational Defense)",
    speakers: defaultWebinarSpeakers,
  },
  {
    id: "social-media-dark-side",
    scheduledAt: "2026-07-23T19:30:00+05:30",
    topic:
      "The Dark Side of Social Media & Platforms: How Hackers Exploit Digital Identities (Focus: Platform, Identity & Abuse Defense)",
    speakers: defaultWebinarSpeakers,
  },
  {
    id: "digital-fraud-crypto-scams",
    scheduledAt: "2026-07-28T19:30:00+05:30",
    topic:
      "Digital Fraud & Cryptocurrency Scams: Following the Modern Money Trail (Focus: Crypto Investigations & Cybercrime)",
    speakers: defaultWebinarSpeakers,
  },
  {
    id: "ethical-hacking-threat-hunting",
    scheduledAt: "2026-08-04T19:30:00+05:30",
    topic:
      "From Ethical Hacking to Threat Hunting: Understanding Modern Cyber Roles (Focus: Closing the gap between outdated certs and real operations)",
    speakers: defaultWebinarSpeakers,
  },
];
