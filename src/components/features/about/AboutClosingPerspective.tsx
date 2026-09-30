import { assetSrc } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import enterpriseImage from "@/assets/img/whoThis/enterprise.webp";
import { AnimatedList } from "@/components/ui/animated-list";
import type { AnimatedListItem } from "@/components/ui/animated-list";

const bulletIcon = (
  <span className="text-primary text-sm sm:text-base mt-0.5 shrink-0">•</span>
);

const cardStyle = {
  background:
    "repeating-linear-gradient(135deg, #f9fafb 0px, #f9fafb 1px, transparent 1px, transparent 4px), white",
};

const AboutClosingPerspective = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const listItems: AnimatedListItem[] = [
    { text: "Real-world relevance", icon: bulletIcon },
    { text: "Operational rigor", icon: bulletIcon },
    { text: "Accountability", icon: bulletIcon },
    { text: "Long-term professional credibility", icon: bulletIcon },
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
            className="border border-neutral-300 border-dashed rounded-lg overflow-hidden relative group"
            style={cardStyle}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {/* Hover gradient overlay for entire card */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/2 via-transparent to-primary/1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

            <div className="grid md:grid-cols-3 gap-0 relative">
              <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden order-2 md:order-1">
                <img
                  src={assetSrc(enterpriseImage)}
                  alt="Enterprise"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent)",
                  }}
                />
              </div>
              <div className="p-6 md:p-8 md:col-span-2 flex flex-col justify-center order-1 md:order-2 relative z-20">

                <div className="space-y-6">
                  <motion.p
                    className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-relaxed font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    CYBERLABS represents a different standard in cybersecurity education.
                  </motion.p>
                  <motion.p
                    className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-tight font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    A standard defined by:
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
                    CYBERLABS was built by people who have carried responsibility, not just credentials.
                  </motion.p>
                  {/* <p className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-relaxed font-medium">
                    With Israel-founded roots, a global framework led by CYBERLABS USA, and practitioner-driven instruction delivered in India through Cyveritas Technologies LLP, CYBERLABS represents a different standard in cybersecurity education.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-relaxed font-medium">
                    {parseBoldText(
                      "CYBERLABS was built by people who have **carried responsibility**, not just credentials — and it trains professionals to do the same."
                    )}
                  </p> */}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutClosingPerspective;
