import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import aspiringImage from "@/assets/img/whoThis/aspiring.webp";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedList } from "@/components/ui/animated-list";
import type { AnimatedListItem } from "@/components/ui/animated-list";
import { parseBoldText, assetSrc } from "@/lib/utils";

const bulletIcon = (
  <span className="text-primary text-sm sm:text-base mt-0.5 shrink-0">•</span>
);

const cardStyle = {
  background:
    "repeating-linear-gradient(135deg, #f9fafb 0px, #f9fafb 1px, transparent 1px, transparent 4px), white",
};

const AboutWhoBuiltFor = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false, margin: "-100px" });
  const whoIconsRef = useRef(null);

  const whoListItems: AnimatedListItem[] = [
    { text: "Aspiring cybersecurity professionals", icon: bulletIcon },
    { text: "Career switchers seeking serious, structured entry", icon: bulletIcon },
    { text: "Working professionals advancing into complex cyber roles", icon: bulletIcon },
    { text: "Organizations seeking operationally ready talent", icon: bulletIcon },
  ];

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
      transition: { duration: 0.8, ease: "easeOut" },
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
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 text-center">
            <AnimatedHeading
              ref={headingRef as React.RefObject<HTMLDivElement>}
              inView={headingInView}
              lines={[
                {
                  text: "Who CYBERLABS Is Built For",
                  className:
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat text-text-primary font-semibold tracking-tight leading-tight md:leading-normal mb-6",
                },
              ]}
            />

          </motion.div>

          <div className="grid grid-cols-1  gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-2 border border-neutral-300 border-dashed rounded-lg overflow-hidden group relative"
              style={cardStyle}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Hover gradient overlay for entire card */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/2 via-transparent to-primary/1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <div className="grid md:grid-cols-2 gap-0 relative">
                <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">

                  <img
                    src={assetSrc(aspiringImage)}
                    alt="Aspiring professionals"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)",
                    }}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center relative z-20">
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl font-inter-display text-text-primary leading-relaxed font-medium max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {parseBoldText(
                      "CYBERLABS is built for individuals and organizations that value **real capability** over **superficial credentials**, including:"
                    )}
                  </motion.p>
                  <div ref={whoIconsRef}>
                    <AnimatedList
                      items={whoListItems}
                      viewportOnce={false}
                      viewportAmount={0.5}
                      duration={0.6}
                      staggerDelay={0.1}
                      xOffset={50}
                      containerClassName="space-y-4 mb-6"
                      contentClassName="text-base sm:text-lg md:text-xl font-inter-display text-text-primary font-medium leading-tight"
                      itemClassName="flex items-start gap-3"
                      iconClassName="text-blue-600 shrink-0 flex items-center pt-0.5"
                      boldText={false}
                    />
                  </div>
                  <motion.p
                    className="text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-relaxed font-semibold pt-4 border-t border-neutral-300 border-dashed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {parseBoldText(
                      "If you are serious about building a **long-term career** in cybersecurity, CYBERLABS is built for you."
                    )}
                  </motion.p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutWhoBuiltFor;
