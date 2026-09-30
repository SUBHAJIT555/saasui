import { useCourses } from "@/hooks/useCourses";
import type { Card, Feature } from "@/types/program";
import { useParams } from "@/lib/react-router";
import { parseBoldText, assetSrc, stripLeadingNumber } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import buildingFutureImage from "@/assets/img/ProgramPageImage/buildingfuture.svg";
// import { FallingPattern } from "@/components/ui/falling-pattern";

const WhatsNew = () => {
  const { slug } = useParams();
  const { getCourseWhatsNewBySlug } = useCourses();
  const data = getCourseWhatsNewBySlug(slug as string);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const leftImageVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -150,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
      },
    },
  };

  const rightContentVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 150,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
      },
    },
  };
  const renderFeatureItem = (feature: Feature, index: number) => {
    if (feature.highlightedText) {
      // Split highlightedText into words
      const wordsToHighlight = feature.highlightedText
        .split(/\s+/)
        .filter((word) => word.length > 0);

      // Create a regex pattern that matches any of the words (case-insensitive, whole words only)
      const escapedWords = wordsToHighlight.map((word) =>
        word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      );
      const regex = new RegExp(`\\b(${escapedWords.join("|")})\\b`, "gi");

      // Split text by the regex while preserving the matches
      const parts = feature.text.split(regex).filter((part) => part.length > 0);

      return (
        <li key={index} className="mb-10">
          {parts.map((part, partIndex) => {
            // Check if this part matches any word from highlightedText (case-insensitive)
            const shouldHighlight = wordsToHighlight.some(
              (word) => part.toLowerCase() === word.toLowerCase()
            );

            if (shouldHighlight) {
              return (
                <span key={partIndex} className="text-primary">
                  {part}
                </span>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </li>
      );
    }
    return (
      <li key={index} className="mb-10">
        {feature.text}
      </li>
    );
  };

  const renderCard = (card: Card, index: number) => (
    <div
      key={index}
      className="relative border border-neutral-300 w-full lg:w-1/2 flex flex-col overflow-hidden"

    >



      <div className=" p-5 sm:p-8 md:p-10 flex flex-col relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2 sm:gap-0">
          <h4
            className={`text-2xl sm:text-3xl ${card.titleColor} font-montserrat font-semibold tracking-tight text-center sm:text-left`}
          >
            {card.title}
          </h4>
          {/* <p
            className={`text-2xl sm:text-3xl ${card.priceColor} font-inter-display font-medium text-center sm:text-right`}
          >
            {card.price}
          </p> */}
        </div>
        <div className="w-full h-px  mb-6"></div>

        <ul className="space-y-3 text-text-primary text-base sm:text-xl font-medium font-inter-display tracking-tight">
          {card.features.map((feature, featureIndex) =>
            renderFeatureItem(feature, featureIndex)
          )}
        </ul>

      </div>
    </div>
  );

  // Check if we should render as numbered list (first card has features with titles)
  const shouldRenderAsNumberedList = data?.cards[0]?.features?.some((f) => f.title);

  return (
    <motion.section
      ref={containerRef}
      className="w-full mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-6 sm:py-8 md:py-10 lg:py-14"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Heading */}
      <div className="md:px-6 lg:px-8 mb-8 sm:mb-10 lg:mb-12">
        <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-montserrat font-bold tracking-tight text-text-primary leading-tight">
          {data?.heading.title ? stripLeadingNumber(data.heading.title) : null}
        </h3>
      </div>

      {/* Grid Layout: Image left, Content right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
        {/* Left: Sticky Image */}
        <motion.div
          variants={leftImageVariants}
          className="lg:sticky lg:top-24 order-1 lg:order-1 relative"
        >
          <div className="flex items-center justify-center">
            <img
              src={assetSrc(buildingFutureImage)}
              alt="What's New"
              className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px] h-auto"
            />
          </div>
        </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={rightContentVariants}
            className="order-2 lg:order-2"
          >
            {/* Render as numbered list or cards */}
            {shouldRenderAsNumberedList ? (
              <div className=" rounded-md p-6 sm:p-8 md:p-10">
                <ol className="space-y-8 sm:space-y-10">
                  {data?.cards[0]?.features?.map((feature, index) => {
                    // Skip completely empty features
                    if (!feature.title && !feature.text) return null;

                    // Calculate actual item number (accounting for any skipped items)
                    const itemNumber = index + 1;

                    return (
                      <li
                        key={index}
                        className={
                          `relative pb-6 ${index !== data?.cards[0]?.features?.length - 1
                            ? "border-b border-neutral-300 "
                            : ""
                          }`
                        }
                      >
                        <div className="flex gap-3 sm:gap-4">
                          {/* Number */}
                          <span className="text-text-primary font-bold text-xl sm:text-2xl md:text-3xl font-montserrat shrink-0">
                            {itemNumber}.
                          </span>

                          {/* Content */}
                          <div className="flex-1">
                            {/* Title (if exists) */}
                            {feature.title && (
                              <h4 className="text-text-primary font-bold text-lg sm:text-xl md:text-2xl font-montserrat mb-2 sm:mb-3">
                                {feature.title}
                              </h4>
                            )}

                            {/* Description */}
                            {feature.text && (
                              <p className="text-text-primary text-base sm:text-lg md:text-xl font-inter-display leading-relaxed ">
                                {parseBoldText(feature.text)}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              /* Original card-based layout */
              <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 md:gap-12 xl:gap-16 font-inter-display text-lg md:text-xl">
                {data?.cards.map((card, index) => renderCard(card, index))}
              </div>
            )}
          </motion.div>
        </div>
    </motion.section>
  );
};

export default WhatsNew;
