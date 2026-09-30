import { assetSrc } from "@/lib/utils";
import type { Card, Course } from "@/types/program";
import { getFlagshipProgramPricing } from "@/config/constants/flagshipProgramData";

type RawCourseCard = Omit<Card, "price">;
type RawCourse = Omit<
  Course,
  "originalPrice" | "currentPrice" | "discount" | "hero" | "whatsNew"
> & {
  hero: Omit<Course["hero"], "pricing"> & {
    pricing: {
      taxNote: string;
      image?: string;
    };
  };
  whatsNew: Omit<Course["whatsNew"], "cards"> & {
    cards: RawCourseCard[];
  };
};

const applyFlagshipProgramPricing = (courseList: RawCourse[]): Course[] =>
  courseList.map((course) => {
    const pricing = getFlagshipProgramPricing(course.slug);
    if (!pricing) {
      throw new Error(`Missing flagship program pricing for slug: ${course.slug}`);
    }

    return {
      ...course,
      originalPrice: pricing.originalPrice,
      currentPrice: pricing.launchPrice,
      discount: pricing.discountPercent,
      hero: {
        ...course.hero,
        pricing: {
          ...pricing.heroPricing,
          taxNote: course.hero.pricing.taxNote,
          image: course.hero.pricing.image,
        },
      },
      whatsNew: {
        ...course.whatsNew,
        cards: course.whatsNew.cards.map((card) => ({
          ...card,
          price: pricing.formattedLaunchLabel,
        })),
      },
    };
  });
// Import images

import masterTheModernUnderworldImage from "@/assets/img/Program/MastertheModernUnderworld.webp";
import defendDigitalPlatformsAtScaleImage from "@/assets/img/Program/DefendDigitalPlatformsatScale.webp";
import fromFoundationsToOperationsImage from "@/assets/img/Program/FromFoundationstoOperations.webp";

// icons import
import {
  TbCompass,
  TbShieldLock,
  TbUserShield,
  TbCurrencyBitcoin,
  TbSword,
  TbTopologyStar,
  TbAlertTriangle,
  TbChartArrows,
  TbDeviceMobileExclamation,
  TbBracketsContain,
  TbRobot,
  TbWorldSearch,
  TbShieldCheck,
  TbTrophy,
  TbTopologyRing,
  TbEyeOff,
  TbFingerprint,
  TbMapSearch,
} from "react-icons/tb";

const rawCourses: RawCourse[] = [
  // Cybercrime, Dark Web & Financial Intelligence Operations - 1
  {
    id: 1,
    slug: "master-the-modern-underworld-cybercrime-dark-web-and-crypto-investigations",
    title:
      "Master the Modern Underworld: Cybercrime, Dark Web & Crypto Investigations",
    subheading: "Master The Modern Underworld",
    category: "Cybercrime Investigation",
    language: "English",
    instructor: "Cybercrime Investigation Expert",
    duration: "145 Hours",
    image: assetSrc(masterTheModernUnderworldImage),

    // program hero section data
    hero: {
      title: "Cybercrime, Dark Web & Financial Intelligence Operations",
      tags: [
        { text: "Cybercrime Investigation" },
        { text: "Dark Web Analysis" },
        { text: "Financial Intelligence" },
        { text: "10 Modules" },
        { text: "145 Hours" },
        { text: "Fully Remote" },
        { text: "Investigation Driven" },
        { text: "Capstone Project" },
      ],
      pricing: {
        taxNote: "",
        image: assetSrc(masterTheModernUnderworldImage),
      },
      buttons: [
        { text: "Enroll Now", variant: "primary" },
        { text: "Download Syllabus", variant: "secondary" },
      ],
      enrollmentMessage: {
        text: "Limited Time Offer -",
        highlightedText: "Launch Price!",
      },
      image: {
        src: assetSrc(masterTheModernUnderworldImage),
        alt: "Cybercrime, Dark Web & Financial Intelligence Operations",
      },
      details: [
        { label: "Language", value: "English" },
        { label: "Certificate", value: "YES" },
        { label: "Schedule", value: "Flexible" },
        { label: "Duration", value: "145 Hours" },
      ],
    },

    // program description data
    programTagLine:
      "Move Beyond Tools. Master the Mindset of a Digital Investigator.",
    description:
      "Most cybersecurity programs stop at prevention-firewalls, alerts, and controls. This 145-hour advanced investigation program is for people who want to understand what happens after the breach. Delivered under the global training framework of CYBERLABS USA, it trains you to operate inside the real business of cybercrime-from dark web marketplaces and scam ecosystems to cryptocurrency laundering, attribution, and intelligence reporting. This is not a hacking course; it is a professional cybercrime investigation program built for the modern digital threat landscape.",
    descriptionParagraphs: [
      "Most cybersecurity programs stop at prevention—firewalls, alerts, and controls.",
      "This **145-hour advanced investigation program** is designed for those who want to understand **what happens after the breach.**",
      "Delivered under the global training framework of **CYBERLABS USA**, this program trains you to operate inside the **real business of cybercrime**—from dark web marketplaces and scam ecosystems to cryptocurrency laundering, attribution, and intelligence reporting.",
      "This is not a hacking course. It is a **professional cybercrime investigation program** built for the modern digital threat landscape.",
    ],
    certifications: [
      "Cybercrime Investigation",
      "Financial Intelligence",
      "OSINT",
    ],
    idealFor:
      "Entry-level (0–3 years) cybersecurity professionals, but designed to progress quickly into real-world, operational thinking",
    whatYouLearn: [
      "Advanced OSINT - Finding intelligence that does not appear on Google.",
      "Blockchain Analysis - Visualizing and tracing illicit crypto flows in real time.",
      "Cybercrime Psychology - Understanding how and why criminals behave the way they do.",
      "Attribution Methodology - Separating correlation from proof.",
      "Legal & Evidence Handling - Ensuring investigations stand up to legal scrutiny.",
    ],

    // Program Module Chart data
    moduleChart: [
      {
        module: "Module 1",
        focusArea: "Cybercrime Ecosystems",
        whatYouLearn:
          "How modern cybercrime operates as an industry, including roles, monetization models, and criminal supply chains.",
      },
      {
        module: "Module 2",
        focusArea: "Dark Web Architecture & Markets",
        whatYouLearn:
          "TOR fundamentals, underground marketplaces, forums, OPSEC practices, and criminal behavior analysis.",
      },
      {
        module: "Module 3",
        focusArea: "Digital Identity & Attribution",
        whatYouLearn:
          "Linking aliases, personas, and digital footprints across platforms using intelligence correlation.",
      },
      {
        module: "Module 4",
        focusArea: "Cryptocurrency Fundamentals",
        whatYouLearn:
          "Blockchain mechanics, wallets, transactions, privacy models, and tracing concepts.",
      },
      {
        module: "Module 5",
        focusArea: "Crypto Forensics I",
        whatYouLearn:
          "Wallet analysis, transaction flows, clustering, and fund movement tracking.",
      },
      {
        module: "Module 6",
        focusArea: "Crypto Forensics II",
        whatYouLearn:
          "Scam analysis, rug pulls, DeFi abuse, and laundering techniques.",
      },
      {
        module: "Module 7",
        focusArea: "Financial Intelligence & AML",
        whatYouLearn:
          "Illicit finance patterns, compliance considerations, and financial crime workflows.",
      },
      {
        module: "Module 8",
        focusArea: "Investigation Methodology",
        whatYouLearn:
          "Structuring end-to-end cyber investigations and intelligence reporting.",
      },
      {
        module: "Module 9",
        focusArea: "Legal & Evidence Handling",
        whatYouLearn:
          "Evidence integrity, documentation, and investigation-grade reporting.",
      },
      {
        module: "Final Assessment",
        focusArea: "Capstone Investigation",
        whatYouLearn:
          "Full-scope cybercrime investigation with professional intelligence output.",
      },
    ],

    // why this program different data
    programWhatsNew: {
      heading: "5. Why This Program Stands Apart in the Indian Market",
      items: [
        {
          title: "Investigation Over Exploitation",
          text: "Most Indian courses teach how to break in. This program teaches how to find who broke in—a rarer and higher-value skill.",
        },
        {
          title: "Closing the Crypto Investigation Gap",
          text: "India has one of the world's highest crypto adoption and fraud rates, yet very few programs teach blockchain forensics at depth.",
        },
        {
          title: "Simulation-Driven, Remote-First Labs",
          text: "Training mirrors how global investigation teams actually work—distributed, remote, and evidence-driven.",
        },
        {
          title: "Evidence & Legal Focus",
          text: "",
        },
        {
          title: "",
          text: "Many investigations fail due to poor evidence handling. This program trains you to meet Indian IT Act requirements and global legal standards.",
        },
      ],
      closingParagraph: "",
    },
    whatsNew: {
      heading: {
        title: "Why This Program Stands Apart in the Indian Market",
        subtitle: "Investigation & Intelligence",
        highlightedText: "Driven Learning",
      },
      differenceLabel: "The Difference",
      cards: [
        {
          title: "CYBERLABS INDIA",
          titleColor: "text-blue-600",
          priceColor: "text-blue-600",
          features: [
            {
              title: "Investigation Over Exploitation",
              text: "Most Indian courses teach how to break in. This program teaches how to **find who broke in**-a rarer and higher-value skill.",
            },
            {
              title: "Closing the Crypto Investigation Gap",
              text: "India has one of the world's highest crypto adoption and fraud rates, yet very few programs teach blockchain forensics at depth.",
            },
            {
              title: "Simulation-Driven, Remote-First Labs",
              text: "Training mirrors how global investigation teams actually work-distributed, remote, and evidence-driven.",
            },
            {
              title: "Evidence & Legal Focus",
              text: "",
            },
            {
              title: "",
              text: "Many investigations fail due to poor evidence handling. This program trains you to meet Indian IT Act requirements and global legal standards.",
            },
          ],
          careerPreparation: {
            title: "What You Learn",
            items: [
              "Advanced OSINT - Finding intelligence that does not appear on Google.",
              "Blockchain Analysis - Visualizing and tracing illicit crypto flows in real time.",
              "Cybercrime Psychology - Understanding how and why criminals behave the way they do.",
              "Attribution Methodology - Separating correlation from proof.",
              "Legal & Evidence Handling - Ensuring investigations stand up to legal scrutiny.",
            ],
          },
        },
      ],
    },
    syllabusLink: "",

    // layman story data
    laymanExplanation: {
      heading: '3. The Layman\'s Explanation — The "Digital Detective" Story',
      lines: [
        "Imagine a bank robbery.",
        "Traditional cybersecurity is the guard at the door—trying to stop the thief from getting in.",
        "This program trains you to be the lead detective.",
        "If the thief gets inside and steals the money, your job begins.",
        "You learn how to follow the digital breadcrumbs they leave behind. If they hide behind anonymity (the Dark Web), you learn how to see through it.",
        "If they move the money into cryptocurrency, you learn how to follow the money trail across blockchains.",
        "You're not just protecting systems. You're solving crimes and removing hiding places.",
      ],
    },

    // program teaches data
    programTeaches: {
      whatYouLearn: [
        "Advanced OSINT – Finding intelligence that does not appear on Google",
        "Blockchain Analysis – Visualizing and tracing illicit crypto flows in real time",
        "Cybercrime Psychology – Understanding how and why criminals behave the way they do",
        "Attribution Methodology – Separating correlation from proof",
        "Legal & Evidence Handling – Ensuring investigations stand up to legal scrutiny",
      ],
      readinessIntro:
        "By the time you complete the final integrated investigation, you are deployment-ready.",
      readinessSubheading: "You will be able to:",
      readinessPoints: [
        "Take a raw cyber incident and trace it back to a specific threat actor or ecosystem",
        "Produce executive-level intelligence reports for enterprises or law-enforcement teams",
        "Act as a subject-matter expert (SME) on cryptocurrency fraud and cybercrime cases",
      ],
      closingStatement:
        'You are not trained for "entry-level observation." You are trained to contribute from day one.',
    },

    // New Component data
    programDeepDive: {
      title: "1. Deep Dive: Point-by-Point Program Breakdown",
      subtitle: "145 Total Academic Hours — A True Investigation Residency",
      paragraphs: [
        "This is not a short certification or overview course. The program is structured as a **deep-dive investigation residency**, where each module is designed to ensure **mastery, not surface familiarity**.",
        "You spend meaningful time inside each investigative domain, working through realistic scenarios, evidence, and intelligence workflows.",
      ],
    },

    // Program Module Discussion data
    syllabus: [
      {
        id: 1,
        title: "Cybercrime Ecosystems & Markets",
        icon: TbTopologyRing,
        content: [
          {
            paragraphs: [
              "You don’t just study malware or scams in isolation. You map the entire **cybercrime supply chain**-from data theft and access brokers to monetization, laundering, and cash-out actors.",
              "You learn how cybercrime functions as a **business**, not just a technical act.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "The Dark Web Lab",
        icon: TbEyeOff,
        content: [
          {
            paragraphs: [
              "You are guided through **controlled, safe access to TOR environments**, where you analyze:",
            ],
            points: [
              "Criminal forums and marketplaces",
              "Reputation systems and trust signals",
              "OPSEC behaviors and mistakes",
              "Law enforcement takedown patterns",
            ],
          },
          {
            paragraphs: [
              "This module focuses on **behavioral analysis**, not browsing curiosity.",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Crypto Forensics (4 Dedicated Modules)",
        icon: TbCurrencyBitcoin,
        content: [
          {
            paragraphs: [
              "A major focus of the program is the **money trail**.",
              "You move from:",
            ],
            points: [
              "Basic wallet tracing",
              "Scam and rug-pull investigations",
              "Token fraud and fake projects",
              "To advanced laundering techniques involving mixers, chain hopping, and DeFi abuse",
            ],
          },
          {
            paragraphs: [
              "You learn how criminals **move, hide, and clean money**-and how investigators follow it.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "The Attribution Engine",
        icon: TbFingerprint,
        content: [
          {
            paragraphs: [
              "Attribution is the hardest part of cyber investigations.",
              'This module teaches the "holy grail" of cybercrime work:',
            ],
          },
          {
            paragraphs: [
              "**Connecting a digital alias to a real-world actor**",
            ],
          },
          {
            paragraphs: ["You learn intelligence correlation across:"],
            points: [
              "Forums",
              "Wallets",
              "Infrastructure",
              "Behavioral fingerprints",
            ],
          },
          {
            paragraphs: [
              "This is where investigators separate speculation from evidence.",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Architecture & Investigation Strategy",
        icon: TbMapSearch,
        content: [
          {
            paragraphs: [
              "Rather than teaching you which buttons to click, the program trains you to:",
            ],
            points: [
              "Design an investigation from scratch",
              "Decide what evidence matters",
              "Build hypotheses and test them",
              "Avoid false attribution",
            ],
          },
          {
            paragraphs: [
              "You learn **how to think like an investigator**, **not a tool operator**.",
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Deliverable-Focused Learning",
        icon: TbTrophy,
        content: [
          {
            paragraphs: [
              "Every module ends with a **professional student output**, such as:",
            ],
            points: [
              "Ecosystem maps",
              "Intelligence reports",
              "Transaction tracing dossiers",
              "Attribution assessments",
            ],
          },
          {
            paragraphs: [
              "By the end of the program, you have a **portfolio of real investigative work**, **not just a certificate**.",
            ],
          },
        ],
      },
    ],

    // Career opportunities chart data
    careerIntro:
      "As organizations shift from pure prevention to active response and investigation, demand for cyber investigators is at an all-time high.",
    careerChart: [
      {
        jobRole: "Crypto Forensic Analyst",
        whatYouDo: "Investigate rug pulls, fake tokens, and stolen crypto.",
        exampleEmployers: "Chainalysis, Binance, WazirX, CoinDCX",
      },
      {
        jobRole: "Threat Intelligence Lead",
        whatYouDo: "Monitor dark web threats and criminal activity.",
        exampleEmployers: "Google, TCS, CrowdStrike, Recorded Future",
      },
      {
        jobRole: "Cybercrime Investigator",
        whatYouDo: "Support legal and compliance investigations.",
        exampleEmployers: "Deloitte, EY, KPMG, PwC",
      },
      {
        jobRole: "Digital Forensics Specialist",
        whatYouDo: "Collect and analyze admissible evidence.",
        exampleEmployers: "I4C (India), CBI, Enterprise IR teams",
      },
      {
        jobRole: "AML / Compliance Analyst",
        whatYouDo: "Prevent laundering through financial systems.",
        exampleEmployers: "HSBC, Standard Chartered, JPMorgan",
      },
    ],
  },

  // Platform, Identity & Abuse Defense Engineering - 2
  {
    id: 2,
    slug: "defend-digital-platforms-at-scale-platform-identity-and-abuse-defense-engineering",
    title:
      "Defend Digital Platforms at Scale: Platform, Identity & Abuse Defense Engineering",
    subheading: "Defend Digital Platforms at Scale",
    category: "Platform Security & Trust & Safety",
    language: "English",
    instructor: "Platform Security Expert",
    duration: "145 Hours",
    image: assetSrc(defendDigitalPlatformsAtScaleImage),

    // program hero section data
    hero: {
      title: "Platform, Identity & Abuse Defense Engineering",
      subheading: "Defend Digital Platforms at Scale",
      tags: [
        { text: "Platform Security" },
        { text: "Trust & Safety" },
        { text: "Abuse Defense" },
        { text: "10 Modules" },
        { text: "145 Hours" },
        { text: "SaaS & Mobile" },
        { text: "Investigation Driven" },
        { text: "Capstone Project" },
      ],
      pricing: {
        taxNote: "",
        image: assetSrc(defendDigitalPlatformsAtScaleImage),
      },
      buttons: [
        { text: "Enroll Now", variant: "primary" },
        { text: "Download Syllabus", variant: "secondary" },
      ],
      enrollmentMessage: {
        text: "Limited Time Offer -",
        highlightedText: "Launch Price!",
      },
      image: {
        src: assetSrc(defendDigitalPlatformsAtScaleImage),
        alt: "Platform, Identity & Abuse Defense Engineering",
      },
      details: [
        { label: "Language", value: "English" },
        { label: "Certificate", value: "YES" },
        { label: "Schedule", value: "Flexible" },
        { label: "Duration", value: "145 Hours" },
      ],
    },

    // program description data
    programTagLine:
      "Go Beyond Hacking. Learn How Real Platforms Fail — and How They Are Defended.",
    description:
      'Most cybersecurity courses teach you how to exploit vulnerabilities. Very few teach you how large digital platforms actually break in the real world. This 145-hour advanced program, delivered under the global training framework of CYBERLABS USA, is built for those who want to operate at the intersection of platform security, identity systems, abuse prevention, and Trust & Safety engineering. You will not learn how to "hack apps." You will learn how attackers abuse features, identities, APIs, and business logic at scale—and how real companies detect, prevent, and enforce against that abuse.',
    descriptionParagraphs: [
      "Most cybersecurity courses teach you how to exploit vulnerabilities. Very few teach you how **large digital platforms actually break in the real world.**",
      "This **145-hour advanced program**, delivered under the global training framework of **CYBERLABS USA**, is built for those who want to operate at the intersection of **platform security, identity systems, abuse prevention, and Trust & Safety engineering.**",
      'You will not learn how to "hack apps." You will learn how **attackers abuse features, identities, APIs, and business logic at scale**—and how real companies detect, prevent, and enforce against that abuse.',
    ],
    certifications: [
      "Platform Defense",
      "Trust & Safety Engineering",
      "Abuse Investigation",
    ],
    idealFor:
      "Security engineers, Trust & Safety practitioners, fraud and abuse analysts, and product/security engineers working on SaaS, marketplace, and fintech platforms",
    whatYouLearn: [
      "Platform architecture and trust modeling",
      "Identity and authentication abuse analysis",
      "Feature abuse and attacker economics",
      "API and business logic abuse",
      "Scam and automation detection",
      "Trust & Safety enforcement strategy",
      "Investigation-driven decision-making",
      "Platform Security & Trust Engineering roles at global tech companies.",
      "Specialist in identity, abuse, and fraud defenses for SaaS and fintech.",
      "Prepared for advanced interviews in product security and Trust & Safety.",
    ],

    // Program Module Chart data
    moduleChart: [
      {
        module: "Module 1",
        focusArea: "Platform Architecture",
        whatYouLearn:
          "SaaS, mobile, and cloud platform design, data flows, and trust boundaries",
      },
      {
        module: "Module 2",
        focusArea: "Security Failure Modes",
        whatYouLearn:
          "Why secure designs fail in production and how assumptions break at scale",
      },
      {
        module: "Module 3",
        focusArea: "Identity & Authentication Systems",
        whatYouLearn:
          "Sessions, tokens, OAuth flows, account recovery, and identity abuse",
      },
      {
        module: "Module 4",
        focusArea: "Feature & Business Logic Abuse",
        whatYouLearn:
          "Abuse vs exploitation, attacker economics, and misuse of legitimate features",
      },
      {
        module: "Module 5",
        focusArea: "Mobile Application Abuse",
        whatYouLearn:
          "Client-side trust issues, permissions abuse, and mobile threat vectors",
      },
      {
        module: "Module 6",
        focusArea: "API & Backend Abuse",
        whatYouLearn:
          "Authorization failures, logic flaws, and large-scale abuse scenarios",
      },
      {
        module: "Module 7",
        focusArea: "Automation, Bots & Scam Ops",
        whatYouLearn:
          "Fraud automation, fake accounts, and abuse-at-scale detection",
      },
      {
        module: "Module 8",
        focusArea: "OSINT & Intelligence Correlation",
        whatYouLearn:
          "Cross-platform identity analysis and confidence-based attribution",
      },
      {
        module: "Module 9",
        focusArea: "Detection & Enforcement Engineering",
        whatYouLearn:
          "Designing signals, enforcement logic, and Trust & Safety workflows",
      },
      {
        module: "Final Assessment",
        focusArea: "Platform Abuse Investigation",
        whatYouLearn:
          "End-to-end platform abuse case analysis and defense strategy",
      },
    ],

    programWhatsNew: {
      heading: "5. Why This Program Stands Apart in the Indian Market",
      items: [
        {
          title: "Abuse > Exploits",
          text: "Indian courses focus on hacking. Global platforms hire for abuse defense and Trust & Safety.",
        },
        {
          title: "Built for SaaS & Mobile Reality",
          text: "India is a SaaS and fintech hub—this program matches that reality.",
        },
        {
          title: "Architecture-First Thinking",
          text: "You learn why systems fail, not just how to test them.",
        },
        {
          title: "Investigation-Driven, Not Tool-Driven",
          text: "Tools change. Thinking doesn't.",
        },
        {
          title: "Direct Alignment with Global Platform Roles",
          text: "This is how Google, Meta, Stripe, and Uber actually defend platforms.",
        },
      ],
      closingParagraph: "",
    },
    // why this program is different
    whatsNew: {
      heading: {
        title: "Why This Program Stands Apart in the Indian Market",
        subtitle: "Platform & Trust",
        highlightedText: "Defense First",
      },
      differenceLabel: "The Difference",
      cards: [
        {
          title: "Our Program",
          titleColor: "text-blue-600",
          priceColor: "text-blue-600",
          features: [
            {
              title: "Abuse > Exploits",
              text: "Indian courses focus on hacking. Global platforms hire for abuse defense and Trust & Safety.",
            },
            {
              title: "Built for SaaS & Mobile Reality",
              text: "India is a SaaS and fintech hub-this program matches that reality.",
            },
            {
              title: "Architecture-First Thinking",
              text: "You learn why systems fail, not just how to test them.",
            },
            {
              title: "Investigation-Driven, Not Tool-Driven",
              text: "Tools change. Thinking doesn't.",
            },
            {
              title: "Direct Alignment with Global Platform Roles",
              text: "This is how Google, Meta, Stripe, and Uber actually defend platforms.",
            },
          ],
          careerPreparation: {
            title: "What You Learn",
            items: [
              "Platform architecture and trust modeling",
              "Identity and authentication abuse analysis",
              "Feature abuse and attacker economics",
              "API and business logic abuse",
              "Scam and automation detection",
              "Trust & Safety enforcement strategy",
              "Investigation-driven decision-making",
              "Platform Security & Trust Engineering roles at global tech companies.",
              "Specialist in identity, abuse, and fraud defenses for SaaS and fintech.",
              "Prepared for advanced interviews in product security and Trust & Safety.",
            ],
          },
        },
      ],
    },
    syllabusLink: "",

    // layman story data
    laymanExplanation: {
      heading: '3. The Layman\'s Explanation — The "Platform Guardian" Story',
      lines: [
        "Imagine a large online platform—payments, rides, social media, or e-commerce.",
        "Traditional security tries to keep hackers out.",
        "This program trains you to protect the platform after users are already inside.",
        "You learn how:",
        "• Fake users bypass onboarding",
        "• Scammers abuse features",
        "• Bots scale fraud",
        "• Identity systems are manipulated",
        "Your job is not to stop one attacker. Your job is to protect the entire ecosystem at scale.",
        "You become the guardian of trust.",
      ],
    },

    // program teaches data
    programTeaches: {
      whatYouLearn: [
        "Platform architecture and trust modeling",
        "Identity and authentication abuse analysis",
        "Feature abuse and attacker economics",
        "API and business logic abuse",
        "Scam and automation detection",
        "Trust & Safety enforcement strategy",
        "Investigation-driven decision-making",
      ],
      readinessIntro:
        "By the end of the capstone, you are platform-defense ready.",
      readinessSubheading: "You will be able to:",
      readinessPoints: [
        "Analyze why a real-world SaaS or mobile platform is being abused",
        "Identify identity, API, or logic failure points",
        "Design detection and enforcement strategies used by global platforms",
        "Operate effectively in Platform Security or Trust & Safety teams",
      ],
      closingStatement:
        "This is not junior-level knowledge. This is production-relevant capability.",
    },

    programDeepDive: {
      title: "1. Deep Dive: Point-by-Point Program Breakdown",
      subtitle: "145 Total Academic Hours — Platform Defense Residency",
      paragraphs: [
        "This is not a bug bounty or penetration testing course.",
        "It is a **deep**, **investigation-driven residency** designed to teach how modern SaaS platforms, mobile apps, and APIs fail under real-world conditions—and how defenders respond.",
        "Each module focuses on **architecture, assumptions, abuse paths, and enforcement logic**, not tools.",
      ],
    },

    // Program Module Discussion data
    syllabus: [
      {
        id: 1,
        title: "Platform Architecture & Trust Boundaries",
        icon: TbTopologyStar,
        content: [
          {
            paragraphs: [
              "You begin by learning how modern platforms are designed.",
              "You analyze:",
            ],
            points: [
              "Mobile and SaaS architectures",
              "Data flows and trust boundaries",
              "Implicit assumptions developers make",
              "Where trust breaks down in production",
            ],
          },
          {
            paragraphs: [
              "You learn to **see platforms the way attackers do.**",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Security Failure Modes",
        icon: TbAlertTriangle,
        content: [
          {
            paragraphs: [
              'Secure designs fail—not because they are "bad," but because assumptions don\'t hold at scale.',
              "This module teaches you how to:",
            ],
            points: [
              "Identify flawed assumptions",
              "Analyze why security controls fail in production",
              "Break down real-world platform incidents",
            ],
          },
          {
            paragraphs: [
              'You learn why "secure on paper" often means "broken in reality."',
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Identity & Authentication Abuse",
        icon: TbUserShield,
        content: [
          {
            paragraphs: [
              "Identity is the most abused layer in modern platforms.",
              "You analyze:",
            ],
            points: [
              "OAuth flows, tokens, and sessions",
              "Account recovery and takeover abuse",
              "Session lifecycle manipulation",
            ],
          },
          {
            paragraphs: [
              "This module builds a **deep understanding of identity abuse**, not just authentication theory.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Abuse vs Hacking — The Critical Shift",
        icon: TbChartArrows,
        content: [
          {
            paragraphs: [
              "Most real-world attacks are **feature abuse**, not exploits.",
              "You learn to differentiate:",
            ],
            points: [
              "Exploitation vs abuse",
              "Attacker economics and ROI",
              "Why abuse scales better than hacking",
            ],
          },
          {
            paragraphs: [
              "This mindset shift is essential for **Trust & Safety and platform security roles.**",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Mobile App Abuse",
        icon: TbDeviceMobileExclamation,
        content: [
          {
            paragraphs: [
              "Mobile ecosystems introduce unique risks.",
              "You investigate:",
            ],
            points: [
              "Client-side trust assumptions",
              "Permission misuse",
              "Business logic abuse on mobile platforms",
            ],
          },
          {
            paragraphs: [
              "This module explains why mobile apps are a primary abuse surface in 2026.",
            ],
          },
        ],
      },
      {
        id: 6,
        title: "API & Backend Abuse",
        icon: TbBracketsContain,
        content: [
          {
            paragraphs: [
              "APIs are the backbone—and the weakest link—of modern platforms.",
              "You learn to analyze:",
            ],
            points: [
              "Authorization flaws",
              "Business logic abuse",
              "Privilege escalation through APIs",
            ],
          },
          {
            paragraphs: [
              "The focus is on **logic and trust**, not scanner output.",
            ],
          },
        ],
      },
      {
        id: 7,
        title: "Scams, Automation & Abuse at Scale",
        icon: TbRobot,
        content: [
          {
            paragraphs: ["Modern abuse is automated.", "This module covers:"],
            points: [
              "Bot-driven abuse",
              "Fake users and scam funnels",
              "Scaling attacks across platforms",
            ],
          },
          {
            paragraphs: [
              "You model how **abuse operations grow**, and how defenders disrupt them.",
            ],
          },
        ],
      },
      {
        id: 8,
        title: "OSINT & Intelligence Correlation",
        icon: TbWorldSearch,
        content: [
          {
            paragraphs: ["Abuse rarely exists in isolation.", "You learn to:"],
            points: [
              "Correlate identities across platforms",
              "Assign confidence to intelligence",
              "Avoid false attribution",
            ],
          },
          {
            paragraphs: [
              "This builds **investigation-grade analytical discipline**.",
            ],
          },
        ],
      },
      {
        id: 9,
        title: "Detection & Enforcement Engineering",
        icon: TbShieldCheck,
        content: [
          {
            paragraphs: ["Prevention alone is not enough.", "You design:"],
            points: [
              "Detection signals",
              "Enforcement strategies",
              "Trust & Safety workflows",
            ],
          },
          {
            paragraphs: [
              "This module mirrors how **real platform security teams operate**.",
            ],
          },
        ],
      },
      {
        id: 10,
        title: "Capstone: End-to-End Platform Abuse Investigation",
        icon: TbTrophy,
        content: [
          {
            paragraphs: [
              "The program concludes with a **full-scale platform abuse investigation**, where you:",
            ],
            points: [
              "Analyze architecture",
              "Identify abuse paths",
              "Correlate intelligence",
              "Propose detection and enforcement",
            ],
          },
          {
            paragraphs: [
              "You finish with a **professional investigation report and presentation**.",
            ],
          },
        ],
      },
    ],

    // Career opportunities chart data
    careerIntro:
      "Platform abuse defense is one of the fastest-growing cybersecurity domains globally.",
    careerChart: [
      {
        jobRole: "Platform Security Engineer",
        whatYouDo: "Defend SaaS and cloud platforms",
        exampleEmployers: "Google, Meta, Amazon",
      },
      {
        jobRole: "Trust & Safety Analyst",
        whatYouDo: "Detect and prevent user abuse",
        exampleEmployers: "Uber, Airbnb, Stripe",
      },
      {
        jobRole: "Identity Security Engineer",
        whatYouDo: "Secure authentication systems",
        exampleEmployers: "Microsoft, Okta",
      },
      {
        jobRole: "Abuse Prevention Specialist",
        whatYouDo: "Stop fraud and automation",
        exampleEmployers: "Paytm, PhonePe, Razorpay",
      },
      {
        jobRole: "Product Security Analyst",
        whatYouDo: "Secure features, not just code",
        exampleEmployers: "Fintech & SaaS firms",
      },
    ],
  },

  // Cybersecurity Practitioner Program - 3
  {
    id: 3,
    slug: "build-complete-cyber-capability-full-stack-cyber-defense-and-offensive-security",
    title:
      "From Foundations to Operations: Cybersecurity Practitioner Program",
    subheading: "From Foundations to Operations",
    category: "Full-Stack Cybersecurity",
    language: "English",
    instructor: "Cyber Operations Expert",
    duration: "450 Hours",
    image: assetSrc(fromFoundationsToOperationsImage),

    hero: {
      title: "Cybersecurity Practitioner Program",
      subheading: "From Foundations to Operations",
      tags: [
        { text: "Full-Stack Cybersecurity" },
        { text: "Cyber Defense" },
        { text: "Security Operations" },
        { text: "10 Phases" },
        { text: "450 Hours" },
        { text: "Hands-on Labs" },
        { text: "Beginner to Operations" },
        { text: "Capstone Project" },
      ],
      pricing: {
        taxNote: "",
        image: assetSrc(fromFoundationsToOperationsImage),
      },
      buttons: [
        { text: "Enroll Now", variant: "primary" },
        { text: "Download Syllabus", variant: "secondary" },
      ],
      enrollmentMessage: {
        text: "Limited Time Offer -",
        highlightedText: "Launch Price!",
      },
      image: {
        src: assetSrc(fromFoundationsToOperationsImage),
        alt: "From Foundations to Operations: Cybersecurity Practitioner Program",
      },
      details: [
        { label: "Language", value: "English" },
        { label: "Certificate", value: "YES" },
        { label: "Schedule", value: "Flexible" },
        { label: "Duration", value: "450 Hours" },
      ],
    },

    programTagLine:
      "Build the Knowledge, Skills, and Operational Mindset Required to Thrive in Modern Cybersecurity.",
    description:
      "Cybersecurity is no longer a niche technical discipline. Organizations today require professionals who can understand systems, secure networks, analyze threats, investigate incidents, support security operations, and contribute to the protection of critical digital infrastructure. This 450-hour immersive program, delivered under the global training framework of CYBERLABS USA, is designed to take learners from foundational cybersecurity concepts to real-world operational readiness through a structured and comprehensive learning journey. Unlike fragmented programs that focus on isolated technologies, certifications, or tools, this program develops a complete understanding of how modern cybersecurity functions across systems, networks, security controls, monitoring, incident response, investigations, and cyber defense operations. This is not a certification preparation course. It is a professional cybersecurity development pathway designed to build the technical foundations, defensive mindset, investigative thinking, and operational awareness required for long-term success in cybersecurity.",
    descriptionParagraphs: [
      "Cybersecurity is no longer a niche technical discipline.",
      "Organizations today require professionals who can understand systems, secure networks, analyze threats, investigate incidents, support security operations, and contribute to the protection of critical digital infrastructure.",
      "This **450-hour immersive program**, delivered under the global training framework of **CYBERLABS USA**, is designed to take learners from foundational cybersecurity concepts to real-world operational readiness through a structured and comprehensive learning journey.",
      "Unlike fragmented programs that focus on isolated technologies, certifications, or tools, this program develops a complete understanding of how modern cybersecurity functions across systems, networks, security controls, monitoring, incident response, investigations, and cyber defense operations.",
      "This is not a certification preparation course. It is a **professional cybersecurity development pathway** designed to build the technical foundations, defensive mindset, investigative thinking, and operational awareness required for long-term success in cybersecurity.",
    ],
    certifications: [
      "Cyber Defense",
      "Security Operations",
      "Incident Response",
    ],
    idealFor:
      "Beginners and early-career professionals seeking a complete pathway into cybersecurity operations, as well as IT professionals transitioning into cyber defense and security analyst roles.",
    whatYouLearn: [
      "Information Security & Cyber Defense Fundamentals",
      "Systems Administration & Security Hardening",
      "Networking & Traffic Analysis",
      "Security Controls & Defensive Architecture",
      "Threat Detection & Monitoring",
      "SIEM & Security Operations Fundamentals",
      "Incident Response & Resilience Planning",
      "Introductory Offensive Security Methodologies",
      "Digital Forensics & Investigations",
      "Professional Reporting & Operational Discipline",
    ],

    moduleChart: [
      {
        module: "Phase 1",
        focusArea: "Foundations & Security Context (40 Hours)",
        whatYouLearn:
          "Information Security, Cyber Defense, Law & Ethics, Professional Responsibility, Physical Security Fundamentals, Threat Modeling & Foundational Labs",
      },
      {
        module: "Phase 2",
        focusArea: "Systems & Operating Systems (70 Hours)",
        whatYouLearn:
          "Computer Architecture, Windows & Linux Fundamentals, Access Control, Active Directory, Authentication, Authorization, Server Security & System Hardening",
      },
      {
        module: "Phase 3",
        focusArea: "Networking Fundamentals (55 Hours)",
        whatYouLearn:
          "OSI Model, TCP/IP, Routing, DNS, DHCP, VLANs, Packet Analysis, Wireshark, Network Troubleshooting & Practical Labs",
      },
      {
        module: "Phase 4",
        focusArea: "Core Security Controls (55 Hours)",
        whatYouLearn:
          "Firewalls, IDS/IPS, VPNs, Encryption, Authentication, Secure Communications, Network Segmentation & Zero Trust Concepts",
      },
      {
        module: "Phase 5",
        focusArea: "Threats & Security Domains (45 Hours)",
        whatYouLearn:
          "Malware Analysis Concepts, Anomaly Detection, Application Security, OWASP Top 10, Database Security, Data Protection & DLP Awareness",
      },
      {
        module: "Phase 6",
        focusArea: "Monitoring & Detection – Blue Team Core (55 Hours)",
        whatYouLearn:
          "Security Logging, Auditing, SIEM Platforms, Alert Triage, MITRE ATT&CK Mapping, Threat Detection & Advanced Traffic Analysis",
      },
      {
        module: "Phase 7",
        focusArea: "Incident Response & Resilience (45 Hours)",
        whatYouLearn:
          "Incident Response Lifecycle, SOC Operations, Business Continuity, Disaster Recovery, Cloud Security & Operational Resilience",
      },
      {
        module: "Phase 8",
        focusArea: "Introduction to Offensive Security (35 Hours)",
        whatYouLearn:
          "Penetration Testing Methodology, Reconnaissance, Enumeration, Nmap Scanning, OSINT & Reporting Fundamentals",
      },
      {
        module: "Phase 9",
        focusArea: "Digital Forensics & Investigations (20 Hours)",
        whatYouLearn:
          "Evidence Handling, Chain of Custody, Timeline Analysis, Investigation Methodologies & Reporting",
      },
      {
        module: "Final Phase",
        focusArea: "Integrated Cybersecurity Operations Capstone (30 Hours)",
        whatYouLearn:
          "Full Defensive Security Scenario, Investigation, Reporting, Presentation & Practical Evaluation",
      },
    ],

    programWhatsNew: {
      heading: "5. Why This Program Stands Apart in the Indian Market",
      items: [
        {
          title: "True End-to-End Cybersecurity Coverage",
          text: "Most programs teach isolated subjects. This program develops complete cybersecurity understanding.",
        },
        {
          title: "Built Around Operational Readiness",
          text: "The focus is on how cybersecurity functions inside modern organizations—not simply on passing examinations.",
        },
        {
          title: "Strong Technical Foundations",
          text: "Participants develop knowledge across systems, networking, security controls, monitoring, investigations, and operations.",
        },
        {
          title: "Defensive Security First",
          text: "The program emphasizes cyber defense, operational awareness, and responsible security practices.",
        },
        {
          title: "Designed for Long-Term Career Growth",
          text: "This pathway provides the foundation required for future specialization and sustained professional development.",
        },
      ],
      closingParagraph:
        "The strongest cybersecurity professionals are not defined by a single skill. They are defined by their ability to understand, defend, investigate, and operate across the complete cybersecurity ecosystem.",
    },
    whatsNew: {
      heading: {
        title: "Why This Program Stands Apart in the Indian Market",
        subtitle: "Complete Cybersecurity",
        highlightedText: "Professional Development",
      },
      differenceLabel: "The Difference",
      cards: [
        {
          title: "Our Program",
          titleColor: "text-blue-600",
          priceColor: "text-blue-600",
          features: [
            {
              title: "True End-to-End Cybersecurity Coverage",
              text: "Most programs teach isolated subjects. This program develops complete cybersecurity understanding.",
            },
            {
              title: "Built Around Operational Readiness",
              text: "The focus is on how cybersecurity functions inside modern organizations—not simply on passing examinations.",
            },
            {
              title: "Strong Technical Foundations",
              text: "Participants develop knowledge across systems, networking, security controls, monitoring, investigations, and operations.",
            },
            {
              title: "Defensive Security First",
              text: "The program emphasizes cyber defense, operational awareness, and responsible security practices.",
            },
            {
              title: "Designed for Long-Term Career Growth",
              text: "This pathway provides the foundation required for future specialization and sustained professional development.",
            },
          ],
          careerPreparation: {
            title: "What You Learn",
            items: [
              "Information Security & Cyber Defense Fundamentals",
              "Systems Administration & Security Hardening",
              "Networking & Traffic Analysis",
              "Security Controls & Defensive Architecture",
              "Threat Detection & Monitoring",
              "SIEM & Security Operations Fundamentals",
              "Incident Response & Resilience Planning",
              "Introductory Offensive Security Methodologies",
              "Digital Forensics & Investigations",
              "Professional Reporting & Operational Discipline",
            ],
          },
        },
      ],
    },
    syllabusLink: "",

    laymanExplanation: {
      heading: '3. The Layman\'s Explanation — The Cybersecurity Practitioner Story',
      lines: [
        "Imagine a modern city.",
        "It requires architects, engineers, law enforcement, emergency services, and infrastructure teams working together to keep everything operating safely.",
        "Cybersecurity works in much the same way.",
        "Before becoming a specialist in threat intelligence, digital forensics, cloud security, threat hunting, or incident response, professionals must first understand how the entire digital ecosystem functions.",
        "This program builds that understanding.",
        "You are not trained for one specific task.",
        "You are trained to understand the complete cybersecurity ecosystem.",
        "You learn how systems work, how networks communicate, how security controls protect environments, how threats emerge, how incidents are investigated, and how organizations respond.",
        "You are not trained for one moment in a cyber attack.",
        "You are trained for the entire cybersecurity lifecycle.",
      ],
    },

    programTeaches: {
      whatYouLearn: [
        "Information Security & Cyber Defense Fundamentals",
        "Systems Administration & Security Hardening",
        "Networking & Traffic Analysis",
        "Security Controls & Defensive Architecture",
        "Threat Detection & Monitoring",
        "SIEM & Security Operations Fundamentals",
        "Incident Response & Resilience Planning",
        "Introductory Offensive Security Methodologies",
        "Digital Forensics & Investigations",
        "Professional Reporting & Operational Discipline",
      ],
      whatYouLearnNote:
        "This is complete cybersecurity capability—not narrow specialization.",
      readinessIntro: "By the end of the program, you will be able to:",
      readinessSubheading: "",
      readinessPoints: [
        "Understand how modern organizations secure systems, networks, and digital assets.",
        "Analyze security events and support threat detection activities.",
        "Participate in incident response and investigation workflows.",
        "Contribute to Security Operations Center (SOC) and cyber defense teams.",
        "Progress confidently into advanced cybersecurity specialization pathways.",
      ],
      closingStatement:
        "You do not graduate as a tool user. You graduate with the mindset and operational awareness of a cybersecurity practitioner.",
    },

    programDeepDive: {
      title: "1. Deep Dive: Point-by-Point Program Breakdown",
      subtitle:
        "450 Total Academic Hours — A Complete Cybersecurity Professional Development Journey",
      paragraphs: [
        "Modern cybersecurity professionals are expected to understand far more than security products and technologies.",
        "They must understand how systems operate, how users interact with technology, how networks communicate, how security controls function, how threats emerge, how incidents are investigated, and how organizations respond when things go wrong.",
        "This program is intentionally designed to build that complete understanding.",
        "Rather than teaching disconnected topics, the learning journey follows the natural evolution of cybersecurity itself:",
        "Security Foundations → Infrastructure → Security Controls → Detection → Response → Investigation → Operations",
      ],
    },

    syllabus: [
      {
        id: 1,
        title: "Foundations & Security Context",
        icon: TbCompass,
        content: [
          {
            paragraphs: [
              "Every successful cybersecurity professional begins with a strong understanding of security itself.",
              "You begin by developing knowledge in:",
            ],
            points: [
              "Information Security & Cyber Defense Principles",
              "CIA Triad, DAD Triad & Parkerian Hexad",
              "Security Controls & Security Domains",
              "Threat Actors, Threat Landscapes & Risk Concepts",
              "Security Frameworks & Governance Principles",
              "Cybersecurity Laws & Regulatory Awareness",
              "Professional Ethics & Responsible Disclosure",
              "Physical Security & Facility Protection",
              "Threat Modeling Methodologies",
            ],
          },
          {
            paragraphs: [
              "Through practical exercises and mini-labs, learners begin developing the mindset required to think like cybersecurity professionals rather than technology users.",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Systems & Operating Systems",
        icon: TbShieldLock,
        content: [
          {
            paragraphs: [
              "Technology cannot be secured without understanding how it works.",
              "Participants develop practical knowledge of:",
            ],
            points: [
              "Computer Architecture & Operating System Fundamentals",
              "Windows & Linux Operating Systems",
              "Active Directory Fundamentals",
              "Authentication & Authorization Models",
              "Users, Groups & Permissions",
              "Access Control Methodologies",
              "System Hardening Principles",
              "Patch Management Strategies",
              "Windows & Linux Security Tools",
              "Server Security Best Practices",
            ],
          },
          {
            paragraphs: [
              "Extensive practical exercises help learners understand how modern systems are deployed, administered, and secured.",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Networking Fundamentals",
        icon: TbTopologyStar,
        content: [
          {
            paragraphs: [
              "Cyber attacks travel through networks.",
              "Defenders must understand those networks better than attackers.",
              "Participants learn:",
            ],
            points: [
              "OSI Model & TCP/IP Architecture",
              "IP Addressing, Subnetting & CIDR",
              "Routing & Switching Fundamentals",
              "DNS, DHCP, NAT & VLAN Concepts",
              "Packet Encapsulation & Traffic Flow",
              "Access Control Lists (ACLs)",
              "Network Troubleshooting Methodologies",
              "Wireshark Traffic Analysis",
              "Packet Capture & Investigation Techniques",
            ],
          },
          {
            paragraphs: [
              "Networking is one of the most important foundations of modern cybersecurity, and this phase ensures learners develop a strong understanding of how communication occurs across digital environments.",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Core Security Controls",
        icon: TbShieldCheck,
        content: [
          {
            paragraphs: [
              "Strong cybersecurity relies on layered security controls.",
              "Participants gain practical exposure to:",
            ],
            points: [
              "Secure Communications & Internet Security",
              "HTTPS, SSH & TLS Fundamentals",
              "Firewalls & Traffic Filtering Technologies",
              "IDS & IPS Concepts",
              "VPN Architecture & Secure Connectivity",
              "Encryption & Authentication Models",
              "Hashing, PKI & Digital Certificates",
              "Network Segmentation Strategies",
              "Zero Trust Security Concepts",
            ],
          },
          {
            paragraphs: [
              "This phase helps learners understand how modern organizations build defensive architecture to reduce risk and improve resilience.",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Threats & Security Domains",
        icon: TbAlertTriangle,
        content: [
          {
            paragraphs: [
              "To defend effectively, professionals must first understand what they are defending against.",
              "Participants explore:",
            ],
            points: [
              "Malware Types & Attack Lifecycles",
              "Indicators of Compromise (IOCs)",
              "Endpoint Detection & Response (EDR) Concepts",
              "Behavioral & Signature-Based Detection",
              "OWASP Top 10 Security Risks",
              "Application Security Fundamentals",
              "Database Security Concepts",
              "Data Leakage Prevention (DLP)",
              "Insider Threat Awareness",
            ],
          },
          {
            paragraphs: [
              "This phase introduces the most common threats facing modern organizations and how security teams identify them.",
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Monitoring & Detection – Blue Team Core",
        icon: TbEyeOff,
        content: [
          {
            paragraphs: [
              "Visibility is the foundation of modern cyber defense.",
              "Participants develop practical understanding of:",
            ],
            points: [
              "Security Event Logging & Auditing",
              "Windows & Linux Log Analysis",
              "SIEM Platforms & Correlation Rules",
              "Alert Triage Methodologies",
              "MITRE ATT&CK Mapping Concepts",
              "Threat Detection Fundamentals",
              "Network Traffic Analysis",
              "Beaconing Detection",
              "Lateral Movement Identification",
              "Security Investigation Workflows",
            ],
          },
          {
            paragraphs: [
              "This phase introduces learners to the operational realities of Security Operations Centers (SOC) and modern defensive security teams.",
            ],
          },
        ],
      },
      {
        id: 7,
        title: "Incident Response & Operational Resilience",
        icon: TbMapSearch,
        content: [
          {
            paragraphs: [
              "Cyber incidents are inevitable.",
              "The ability to respond effectively determines the outcome.",
              "Participants learn:",
            ],
            points: [
              "Incident Response Lifecycle (NIST-Based)",
              "Triage, Containment & Recovery Processes",
              "SOC Operations & Security Workflows",
              "Security Playbooks & Automation Concepts",
              "Business Continuity Planning (BCP)",
              "Disaster Recovery Planning (DRP)",
              "Cloud Computing Fundamentals",
              "Cloud Security Concepts",
              "Operational Resilience Strategies",
            ],
          },
          {
            paragraphs: [
              "The focus is on helping learners understand how organizations prepare for, manage, and recover from cyber incidents.",
            ],
          },
        ],
      },
      {
        id: 8,
        title: "Introduction to Offensive Security",
        icon: TbSword,
        content: [
          {
            paragraphs: [
              "Effective defenders understand how attackers operate.",
              "Participants are introduced to:",
            ],
            points: [
              "Penetration Testing Methodology",
              "Reconnaissance Techniques",
              "Passive & Active Information Gathering",
              "Enumeration Concepts",
              "Nmap Scanning Methodologies",
              "Vulnerability Discovery Fundamentals",
              "Reporting & Documentation Practices",
              "OSINT Fundamentals",
            ],
          },
          {
            paragraphs: [
              "The purpose of this phase is not exploitation.",
              "It is understanding attacker methodology to improve defensive capability.",
            ],
          },
        ],
      },
      {
        id: 9,
        title: "Digital Forensics & Investigations",
        icon: TbFingerprint,
        content: [
          {
            paragraphs: [
              "Cybersecurity does not end when an incident is detected.",
              "Professionals must understand how investigations are conducted and how evidence is preserved.",
              "Participants learn:",
            ],
            points: [
              "Digital Forensics Fundamentals",
              "Evidence Preservation Concepts",
              "Chain of Custody Principles",
              "File System Artifacts",
              "Timeline Analysis Techniques",
              "Investigation Methodologies",
              "Security Reporting Practices",
            ],
          },
          {
            paragraphs: [
              "This phase introduces learners to the investigative discipline that supports incident response, legal processes, and post-incident analysis.",
            ],
          },
        ],
      },
      {
        id: 10,
        title: "Final Phase: Integrated Cybersecurity Operations Capstone",
        icon: TbTrophy,
        content: [
          {
            paragraphs: [
              "The program concludes with a comprehensive practical capstone designed to bring together knowledge gained throughout the entire learning journey.",
              "Participants will:",
            ],
            points: [
              "Analyze security incidents using network and endpoint evidence",
              "Investigate suspicious activity across multiple systems",
              "Review logs, alerts, and indicators of compromise",
              "Produce professional incident reports and recommendations",
              "Present findings and defend investigative conclusions",
              "Demonstrate operational decision-making under realistic conditions",
            ],
          },
          {
            paragraphs: [
              "This final assessment simulates how cybersecurity professionals operate in real-world environments where detection, investigation, analysis, communication, and decision-making must work together.",
            ],
          },
        ],
      },
    ],

    careerIntro:
      "Graduates of this program are positioned for multiple cybersecurity career pathways.",
    careerClosing:
      "This program also provides a strong foundation for advanced specialization in Threat Hunting, Detection Engineering, Cyber Intelligence, Platform Security, Digital Investigations, AI Security, and Cybercrime Operations.",
    careerChart: [
      {
        jobRole: "Cybersecurity Analyst",
        whatYouDo: "Monitor, analyze, and support security operations",
        exampleEmployers: "SOCs, Enterprises",
      },
      {
        jobRole: "Security Operations Analyst",
        whatYouDo: "Investigate alerts and support incident response",
        exampleEmployers: "MSSPs, Financial Institutions",
      },
      {
        jobRole: "Cyber Defense Associate",
        whatYouDo: "Support defensive security operations",
        exampleEmployers: "Technology Firms",
      },
      {
        jobRole: "Incident Response Associate",
        whatYouDo: "Assist with investigations and containment activities",
        exampleEmployers: "Consulting Firms",
      },
      {
        jobRole: "Information Security Coordinator",
        whatYouDo: "Support governance, risk, and compliance initiatives",
        exampleEmployers: "Enterprise Organizations",
      },
    ],
  },
];

export const courses: Course[] = applyFlagshipProgramPricing(rawCourses);
