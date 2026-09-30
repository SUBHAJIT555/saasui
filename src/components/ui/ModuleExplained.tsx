import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, useInView, useAnimation } from "framer-motion";

import { useCourses } from "@/hooks/useCourses";
import { useParams } from "@/lib/react-router";
import ProgramDeepDive from "@/components/features/programs/ProgramDeepDive";
import { parseBoldText, stripLeadingNumber } from "@/lib/utils";
import { AnimatedHeading } from "./animated-heading";
import { AnimatedList } from "./animated-list";
import type { AnimatedListItem } from "./animated-list";

const Syllabus = () => {
  const { slug } = useParams();
  const { getCourseSyllabusBySlug, getCourseProgramDeepDiveBySlug } = useCourses();
  const syllabusData = getCourseSyllabusBySlug(slug as string);
  const [openIndex, setOpenIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef(null);
  const accordionRef = useRef(null);

  const headerInView = useInView(headerRef, { once: false, margin: "-100px" });
  const subheadingInView = useInView(subheadingRef, { once: false, margin: "-80px" });
  const buttonInView = useInView(buttonRef, { once: false, margin: "-50px" });
  const accordionInView = useInView(accordionRef, {
    once: false,
    margin: "-100px",
  });



  const headerControls = useAnimation();
  const buttonControls = useAnimation();
  const accordionControls = useAnimation();

  const programDeepDive = getCourseProgramDeepDiveBySlug(slug as string);

  const title = stripLeadingNumber(
    programDeepDive?.title || "Module-Based Mastery (End-to-End)",
  );

  useEffect(() => {
    if (headerInView) {
      headerControls.start("visible");
    }
  }, [headerInView, headerControls]);

  useEffect(() => {
    if (buttonInView) {
      buttonControls.start("visible");
    }
  }, [buttonInView, buttonControls]);

  useEffect(() => {
    if (accordionInView) {
      accordionControls.start("visible");
    }
  }, [accordionInView, accordionControls]);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };


  // const buttonVariants = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //   },
  // };

  const accordionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <div
      className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-26 py-8 sm:py-10 md:py-14"
      id="explained-module"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-8">
        <AnimatedHeading
          inView={headerInView}
          lines={[
            { text: title, className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-medium text-text-primary leading-tight mb-8 sm:leading-none tracking-tight", as: "h3" },
          ]}
        />
        <ProgramDeepDive />
      </div>

      <div ref={subheadingRef} className="mb-8">
        <AnimatedHeading
          inView={subheadingInView}
          lines={[
            { text: "Module-Based Mastery (End-to-End)", className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-medium text-text-primary leading-tight tracking-tight", as: "h3" },
          ]}
        />
      </div>



      {/* Accordion */}
      <motion.div
        ref={accordionRef}
        variants={accordionVariants}
        initial="hidden"
        animate={accordionControls}
        transition={{
          duration: 0.6,
          staggerChildren: 0.1,
          delayChildren: 0.2,
        }}
        className="flex flex-col divide-y  divide-neutral-300 mb-8 sm:mb-10"
      >
        {syllabusData?.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="py-3 sm:py-4 group"
          >
            {/* Header */}
            <motion.button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center text-left focus:outline-none group cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 sm:gap-4 py-1 md:py-1">
                <motion.span
                  className={`text-xl sm:text-2xl text-blue-600 transition-all duration-300 ${openIndex === index ? "opacity-100" : "opacity-90"}`}
                  animate={{
                    scale: openIndex === index ? 1.1 : 1,
                    rotate: openIndex === index ? 15 : 0,
                  }}
                  whileHover={{
                    scale: openIndex === index ? 1.1 : 1.1,
                    rotate: openIndex === index ? 5 : 5,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {item.icon && <item.icon />}
                </motion.span>
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-montserrat font-medium text-text-primary leading-tight tracking-tighter">
                  {item.title}
                </h4>
              </div>
              <div className="text-gray-400 flex items-center gap-1 sm:gap-2 font-inter-display">
                <span className="text-xs sm:text-sm md:text-base lg:text-lg hidden sm:inline">
                  {openIndex === index ? "Collapse" : "Expand"}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {openIndex === index ? (
                    <FiChevronUp className="text-lg sm:text-xl" />
                  ) : (
                    <FiChevronDown className="text-lg sm:text-xl" />
                  )}
                </motion.div>
              </div>
            </motion.button>

            {/* Content */}
            <motion.div
              initial={false}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.3 },
              }}
              className="overflow-hidden"
            >
              {item.content && (
                <motion.div
                  className="pl-8 sm:pl-12 md:pl-16 pr-2 text-primary font-medium space-y-6 sm:space-y-8 md:space-y-10 font-inter-display mt-3 sm:mt-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: openIndex === index ? 1 : 0,
                    y: openIndex === index ? 0 : -20,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: openIndex === index ? 0.2 : 0,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {item.content?.map((section, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: openIndex === index ? 1 : 0,
                        x: openIndex === index ? 0 : -20,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: openIndex === index ? 0.3 + i * 0.1 : 0,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {section.heading && (
                        <h5 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-montserrat text-text-primary mb-3 sm:mb-4 underline decoration-neutral-300  underline-offset-4 decoration-1">
                          {section.heading}
                        </h5>
                      )}
                      {/* Render paragraphs if they exist */}
                      {section.paragraphs && section.paragraphs.length > 0 && (
                        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                          {section.paragraphs.map((para, paraIdx) => (
                            <p
                              key={paraIdx}
                              className="text-sm sm:text-base md:text-lg lg:text-xl font-inter-display font-medium text-text-primary leading-relaxed"
                            >
                              {parseBoldText(para)}
                            </p>
                          ))}
                        </div>
                      )}
                      {/* Render bullet points if they exist */}
                      {section.points && section.points.length > 0 && (
                        <AnimatedList
                          items={section.points.map((point): AnimatedListItem => ({ text: point, icon: <span className="text-primary text-xs sm:text-sm mt-1 sm:mt-2 shrink-0">•</span> }))}
                          viewportOnce={false}
                          boldText={false}
                          containerClassName="list-none space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6"
                          itemClassName="flex items-start gap-2 sm:gap-3"
                          contentClassName="text-sm sm:text-base md:text-lg lg:text-xl font-inter-display font-medium text-text-primary"
                          iconClassName="shrink-0 pt-0.5 text-blue-600"
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* <motion.div
        ref={buttonRef}
        variants={buttonVariants}
        initial="hidden"
        animate={buttonControls}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex justify-center mb-8 sm:mb-10"
      >
        <motion.button
          onClick={() =>
            window.open(getCourseSyllabusLinkBySlug(slug as string), "_blank")
          }
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary/90 text-background px-6 sm:px-8 py-2 sm:py-3 rounded-md font-montserrat font-medium tracking-tight text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-primary/25"
        >
          Download Complete Module
        </motion.button>
      </motion.div> */}
    </div>
  );
};

export default Syllabus;
