import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedList } from "@/components/ui/animated-list";
import type { AnimatedListItem } from "@/components/ui/animated-list";
import { parseBoldText } from "@/lib/utils";

const bulletIcon = (
  <span className="text-primary text-sm sm:text-base mt-0.5 shrink-0">•</span>
);

const AboutHowTrains = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false, margin: "-100px" });

  const listItems: AnimatedListItem[] = [
    { text: "Simulation-driven cyber environments", icon: bulletIcon },
    { text: "Scenario-based exercises", icon: bulletIcon },
    { text: "Investigation-led workflows", icon: bulletIcon },
    { text: "Instructor-guided, real-time sessions", icon: bulletIcon },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-background py-8 md:py-12 lg:py-16" ref={containerRef}>
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="border border-neutral-300 border-dashed rounded-md p-6 md:p-8 relative overflow-hidden group"
            style={{
              background:
                "repeating-linear-gradient(135deg, #f9fafb 0px, #f9fafb 1px, transparent 1px, transparent 4px), white",
            }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/3 via-transparent to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              <AnimatedHeading
                ref={headingRef as React.RefObject<HTMLDivElement>}
                inView={headingInView}
                lines={[
                  {
                    text: "How CYBERLABS Trains",
                    className:
                      "text-2xl sm:text-3xl md:text-4xl font-montserrat text-text-primary font-semibold tracking-tight leading-tight mb-6 uppercase",
                  },
                ]}
              />
              <div className="space-y-6">
                <motion.p
                  className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {parseBoldText(
                    "CYBERLABS training is built around **execution**, **investigation**, and **accountability**."
                  )}
                </motion.p>
                <motion.p
                  className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-tight font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Learners train inside:
                </motion.p>
                <AnimatedList
                  items={listItems}
                  containerClassName="space-y-2 sm:space-y-3 pl-0 mb-6"
                  contentClassName="text-base sm:text-lg font-inter-display text-text-primary leading-tight"
                  itemClassName="flex items-start gap-3"
                  iconClassName="text-blue-600 shrink-0 flex items-center pt-0.5"
                  boldText={false}
                />
                <motion.p
                  className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {parseBoldText(
                    "Learning is continuous, hands-on, and measured against **operational outcomes**, not attendance."
                  )}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHowTrains;
