import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { parseBoldText } from "@/lib/utils";

const AboutWhatIs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
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
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 md:text-center text-left">
            <AnimatedHeading
              ref={headingRef as React.RefObject<HTMLDivElement>}
              inView={headingInView}
              lines={[
                {
                  text: "What is CYBERLABS",
                  className:
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat text-text-primary font-semibold tracking-tight leading-tight md:leading-normal mb-6",
                },
              ]}
            />
            <div className="space-y-6 max-w-4xl mx-auto">
              <motion.p
                className="text-lg sm:text-xl md:text-2xl font-inter-display text-text-primary leading-relaxed font-medium"
                initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                CYBERLABS is a global cybersecurity training and capability-building
                organization founded in Israel and built by professionals with
                real-world experience in cyber defense, investigations, and platform
                security.
              </motion.p>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl font-inter-display text-text-primary leading-relaxed font-medium"
                initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
              >
                {parseBoldText(
                  "CYBERLABS exists to prepare individuals and organizations to **operate inside real cyber environments**, where incidents are complex, information is incomplete, and decisions carry real consequences."
                )}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWhatIs;
