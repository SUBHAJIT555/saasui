"use client";

import { useRef, type ReactNode } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import {
  LandingSectionShell,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";

const faqItems: { question: string; answer: ReactNode }[] = [
  {
    question: "What exactly is CYBERLABS INDIA and what kind of training do you provide?",
    answer: (
      <>
        <p><strong>CYBERLABS INDIA</strong> is a <strong>practitioner-led</strong> cybersecurity training organization focused on building <strong>real operational capability</strong>, <strong>not just theoretical knowledge or exam preparation</strong>.</p>
        <p>Delivered in India by <strong>Cyveritas Technologies LLP</strong>, in collaboration with <strong>CYBERLABS USA</strong> (Israeli-founded), <strong>CYBERLABS INDIA</strong> provides structured, instructor-led cybersecurity programs built around investigation, system architecture, and real-world decision-making.</p>
        <p><strong>Our training combines:</strong></p>
        <ul>
          <li>Simulation-driven labs</li>
          <li>Scenario-based investigations</li>
          <li>Architecture and failure analysis</li>
          <li>Continuous assessment of practical capability</li>
        </ul>
        <p>Programs are designed for learners who want to operate in real cyber environments — including cyber defense, investigations, platform security, and full-stack cybersecurity roles.</p>
        <p><strong>CYBERLABS INDIA</strong> does not focus on passive learning or tool-only training. We train professionals to think, investigate, and act in real-world cyber situations.</p>
      </>
    ),
  },
  {
    question: "Do I need to have prior IT or technical knowledge to start learning with CYBERLABS INDIA?",
    answer: (
      <>
        <p>Prior IT or cybersecurity experience is <strong>not mandatory</strong> for all programs, but a basic level of computer literacy and analytical ability is expected.</p>
        <p><strong>CYBERLABS INDIA</strong> offers programs designed for different entry points:</p>
        <ul>
          <li>Foundational and full-stack programs are structured to build capability from first principles, making them suitable for motivated beginners.</li>
          <li>Advanced investigation and platform security programs assume a stronger technical foundation and are best suited for learners with prior IT, engineering, or related academic backgrounds.</li>
        </ul>
        <p>Regardless of entry level, <strong>CYBERLABS</strong> programs are rigorous and structured. Learners are expected to engage seriously, follow the training schedule, complete labs, and develop technical depth over time.</p>
        <p><strong>CYBERLABS INDIA</strong> is <strong>not designed for casual exploration</strong>. It is built for individuals prepared to commit to disciplined, capability-focused learning.</p>
      </>
    ),
  },
  {
    question: "Is the learning schedule flexible and can I complete the courses at my own comfortable pace?",
    answer: (
      <>
        <p>Our programs are <strong>not fully self-paced</strong>.</p>
        <p><strong>CYBERLABS</strong> courses are delivered through a structured, instructor-led schedule to ensure discipline, continuity, and real capability development. Learners are expected to follow the weekly learning plan, complete labs, and participate in assessments as scheduled.</p>
        <p><strong>That said</strong>, we do support practical flexibility:</p>
        <ul>
          <li>Sessions may be supported with recordings or catch-up options (where applicable)</li>
          <li>Labs and practice work can typically be completed within defined windows</li>
          <li>If a learner misses a session, we provide guidance to get back on track</li>
        </ul>
        <p>This approach balances flexibility with what matters most in cybersecurity training: consistency, accountability, and operational readiness.</p>
      </>
    ),
  },
  {
    question: "Will I receive any certification after completing the courses, and are they recognized in the industry?",
    answer: (
      <>
        <p>Yes. Upon successful completion of a <strong>CYBERLABS</strong> program, learners are awarded an official internal certificate issued under the <strong>CYBERLABS USA</strong> training framework.</p>
        <p><strong>CYBERLABS</strong> certifications are <strong>capability-based</strong>, meaning they are issued only after learners demonstrate assessed practical competence through labs, simulations, and evaluations — not simply attendance or theory exams.</p>
        <p><strong>CYBERLABS USA</strong> programs are mapped and aligned to globally recognized cybersecurity knowledge domains and role competencies defined by organizations such as ISC², CompTIA, and EC-Council. This alignment ensures that the skills developed are relevant, transferable, and compatible with international cybersecurity career pathways.</p>
        <p><strong>It is important to note:</strong></p>
        <ul>
          <li><strong>CYBERLABS</strong> certifications emphasize operational readiness, not exam-only credentialing</li>
          <li>They are designed to complement, not replace, third-party certification exams</li>
          <li>Recognition is based on demonstrated skills and role alignment, which is how serious cybersecurity employers evaluate talent</li>
        </ul>
        <p><strong>CYBERLABS INDIA</strong> focuses on producing professionals who can operate effectively in real cyber environments, with certification serving as formal validation of that capability.</p>
      </>
    ),
  },
  {
    question: "Is the entire learning process online or do I need to install specific software on my computer?",
    answer: (
      <>
        <p><strong>CYBERLABS INDIA</strong> programs are delivered online through a secure, browser-accessible learning environment.</p>
        <p>Most hands-on training, labs, and simulations are conducted within controlled virtual environments, allowing learners to work inside realistic cyber systems without installing complex toolchains locally.</p>
        <p><strong>That said</strong>, depending on the program and module:</p>
        <ul>
          <li>Learners may be guided to install basic supporting tools (such as browsers, utilities, or analysis tools) when required for learning purposes</li>
          <li>Any required setup is clearly communicated and supported by instructors</li>
          <li>No advanced or unmanaged local environments are expected from learners</li>
        </ul>
        <p>This approach ensures training remains secure, standardized, and accessible, while still reflecting how cybersecurity work is performed in real operational settings.</p>
      </>
    ),
  },
  {
    question: "What kind of practical experience can I gain through your hands-on lab environments and simulations?",
    answer: (
      <>
        <p><strong>CYBERLABS INDIA</strong> provides structured, simulation-driven lab environments designed to mirror how cybersecurity work is performed in real organizations.</p>
        <p>Rather than isolated tool exercises, learners engage in end-to-end scenarios that require them to:</p>
        <ul>
          <li>Analyze system architecture and trust boundaries</li>
          <li>Investigate abnormal or malicious activity</li>
          <li>Trace attack paths and understand adversary behavior</li>
          <li>Make decisions based on incomplete or evolving information</li>
          <li>Produce professional-grade findings and outputs</li>
        </ul>
        <p><strong>Practical experience is gained through:</strong></p>
        <ul>
          <li>Guided investigation scenarios and instructor-led walkthroughs</li>
          <li>Assessment-based labs that evaluate execution and reasoning</li>
          <li>Progressive simulations that increase in complexity across the program</li>
          <li>Independent practice windows for reinforcement and skill development</li>
        </ul>
        <p>The objective of <strong>CYBERLABS</strong> labs is not exposure to tools, but development of operational thinking and execution capability — the skills required to perform effectively in real cyber defense and investigation roles.</p>
      </>
    ),
  },
  {
    question: "What kind of support and career guidance services do you offer to students during and after the course?",
    answer: (
      <>
        <p><strong>CYBERLABS INDIA</strong> provides structured academic support and professional guidance throughout the learning journey, with a focus on capability development and role readiness.</p>
        <p><strong>During the program</strong>, learners receive:</p>
        <ul>
          <li>Instructor-led guidance on labs, simulations, and assessments</li>
          <li>Technical clarification and mentoring aligned with program objectives</li>
          <li>Feedback on practical performance and investigative outputs</li>
        </ul>
        <p><strong>From a career perspective</strong>, <strong>CYBERLABS</strong> supports learners by:</p>
        <ul>
          <li>Helping them understand which cybersecurity roles align with their skills and strengths</li>
          <li>Guiding them on how to position their capabilities professionally (roles, expectations, learning paths)</li>
          <li>Offering exposure to real-world role requirements and industry expectations</li>
        </ul>
        <p><strong>CYBERLABS</strong> does not offer guaranteed job placement or recruitment promises. Our focus is on ensuring learners graduate with demonstrable skills, operational confidence, and realistic role alignment — which is how serious cybersecurity careers are built.</p>
        <p>Career progression ultimately depends on individual performance, consistency, and continued skill development, all of which <strong>CYBERLABS</strong> programs are designed to support.</p>
      </>
    ),
  },
  {
    question: "What are the minimum requirements for student PC/Laptop?",
    answer: (
      <>
        <p>To ensure a smooth and effective learning experience, learners are expected to have access to a reliable personal computer or laptop that meets the following <strong>minimum requirements</strong>:</p>
        <p><strong>Operating System</strong></p>
        <ul>
          <li>Windows 10 or later</li>
          <li>macOS 10.15 or later</li>
          <li>Linux (Ubuntu 18.04 LTS, Fedora 30, or equivalent modern distributions)</li>
        </ul>
        <p><strong>Hardware</strong></p>
        <ul>
          <li>Minimum 8 GB RAM</li>
          <li>256 GB SSD storage</li>
          <li>Stable broadband internet connection</li>
        </ul>
        <p>These requirements are sufficient to access <strong>CYBERLABS</strong> browser-based learning environments, participate in live sessions, and complete hands-on labs and simulations.</p>
        <p>Learners should ensure their system is stable, regularly updated, and free from usage restrictions, as cybersecurity training requires consistent access and uninterrupted participation.</p>
      </>
    ),
  },
  {
    question: "How are learners evaluated, and what does \"successful completion\" mean?",
    answer: (
      <>
        <p>Learners are evaluated through a structured assessment framework that includes hands-on labs, scenario-based exercises, and practical evaluations aligned with each program&apos;s objectives.</p>
        <p><strong>&quot;Successful completion&quot;</strong> means a learner has demonstrated practical capability and decision-making ability, not just attended sessions. Certifications are issued only after required assessments are completed to the expected standard.</p>
        <p><strong>CYBERLABS</strong> evaluates what learners can actually do in realistic cyber environments.</p>
      </>
    ),
  },
  {
    question: "What is the expected time commitment per week?",
    answer: (
      <>
        <p><strong>CYBERLABS</strong> programs require a consistent and disciplined time commitment. While the exact requirement varies by program, learners should typically expect to dedicate multiple hours per week to live sessions, labs, practice work, and assessments.</p>
        <p><strong>Cybersecurity capability cannot be developed casually.</strong> These programs are designed for individuals prepared to prioritize learning and maintain regular engagement.</p>
      </>
    ),
  },
  {
    question: "Can I switch programs after enrollment?",
    answer: (
      <>
        <p>Program changes are not automatic and are evaluated on a case-by-case basis. Switching programs may depend on:</p>
        <ul>
          <li>Learner readiness and performance</li>
          <li>Program progression stage</li>
          <li>Academic and scheduling considerations</li>
        </ul>
        <p>Our goal is to ensure learners are placed in programs where they can succeed and build real capability, rather than making lateral moves that dilute learning outcomes.</p>
      </>
    ),
  },
  {
    question: "Are these programs suitable for working professionals?",
    answer: (
      <>
        <p>Yes. <strong>CYBERLABS</strong> programs are designed to accommodate working professionals, while maintaining academic rigor and operational depth.</p>
        <p>Training is delivered online with a structured schedule, and learners are expected to plan their time responsibly. Flexibility exists within defined boundaries, but consistency and participation remain essential.</p>
        <p>These programs are best suited for professionals who are serious about advancing into complex cybersecurity roles.</p>
      </>
    ),
  },
  {
    question: "What makes CYBERLABS different from other cybersecurity institutes in India?",
    answer: (
      <>
        <p><strong>CYBERLABS</strong> is built on an operational training philosophy, not a classroom or certification-driven model.</p>
        <p><strong>Key differences include:</strong></p>
        <ul>
          <li>Practitioner-led instruction, not classroom-only trainers</li>
          <li>Investigation- and architecture-first learning, before tools</li>
          <li>Simulation-driven environments that mirror real cyber work</li>
          <li>Capability-based evaluation, not attendance or exam shortcuts</li>
        </ul>
        <p><strong>CYBERLABS</strong> trains professionals to operate in real cyber environments, which is fundamentally different from learning tools or passing exams.</p>
      </>
    ),
  },
];

const faqAnswerClassName =
  "space-y-3 leading-relaxed [&>p]:mb-2 [&>ul]:my-3 [&>ul]:list-disc [&>ul]:space-y-1 [&>ul]:pl-6 [&_strong]:font-bold [&_strong]:text-zinc-900";

const Faq = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <div id="frequently-asked-questions" ref={timelineRef}>
      <section className="relative overflow-hidden bg-white px-4 pb-10 pt-20 sm:px-5 sm:pb-12 sm:pt-24 md:pb-16 md:pt-32">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, transparent 80%)",
              maskImage: "linear-gradient(to bottom, #000 0%, transparent 80%)",
              backgroundImage:
                "linear-gradient(90deg, var(--hero-scale-line) 1px, transparent 1px)",
              backgroundSize: "8px 100%",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto text-center w-full max-w-5xl">
          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
          >
            <ShinyText
              text="Frequently Asked Questions."
              className={landingSectionHeadingClass}
              color="#3f3f46"
              shineColor="#18181b"
              speed={3}
              spread={120}
            />
          </TimelineContent>

          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={landingRevealVariants}
            className="mt-6  text-lg font-medium leading-snug text-zinc-700 sm:mt-8 sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto"
          >
            We offer comprehensive cybersecurity education to help you{" "}
            <span className="font-semibold text-blue-600 tracking-tighter">
              achieve your career goals
            </span>{" "}
            in the digital security industry.
          </TimelineContent>
        </div>
      </section>

      <div
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-t border-dashed border-zinc-200"
        aria-hidden
      />

      <LandingSectionShell className="pt-8 md:pt-10">
        <TimelineContent
          as="div"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <FaqAccordion
            items={faqItems}
            answerClassName={faqAnswerClassName}
          />
        </TimelineContent>
      </LandingSectionShell>
    </div>
  );
};

export default Faq;
