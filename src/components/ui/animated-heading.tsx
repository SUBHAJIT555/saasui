import { motion } from "framer-motion";

export interface AnimatedHeadingLine {
  /** Text for this line (each character will animate in) */
  text: string;
  /** Tailwind/className for this line (e.g. font, color, gradient) */
  className?: string;
  /** Delay in seconds before this line's characters start animating (e.g. 0.3 for second line) */
  startDelay?: number;
  /** Optional: use a different tag for this line (default "h2") */
  as?: "h1" | "h2" | "h3" | "h4" | "p";
}

export interface AnimatedHeadingProps {
  ref?: React.RefObject<HTMLDivElement>;
  /** One or more lines; each line can have its own style and startDelay */
  lines: AnimatedHeadingLine[];
  /** ClassName for the wrapper div */
  containerClassName?: string;
  /** When true, characters animate in; when false, they stay hidden. Pass from useInView(ref) or similar. */
  inView?: boolean;
  /** Delay between each character in seconds (default 0.03) */
  characterDelay?: number;
  /** Duration of each character's animation in seconds (default 0.4) */
  duration?: number;
  /** Y offset in px for hidden state (default 40) */
  yOffset?: number;
  /** Easing array for the character animation (default [0.215, 0.61, 0.355, 1]) */
  ease?: number[];
}

const defaultEase: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const motionHeadingTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
};

export function AnimatedHeading({
  ref,
  lines,
  containerClassName = "",
  inView = true,
  characterDelay = 0.03,
  duration = 0.4,
  yOffset = 40,
  ease = defaultEase,
}: AnimatedHeadingProps) {
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={containerClassName}
    >
      {lines.map((line, lineIndex) => {
        const startDelay = line.startDelay ?? 0;
        const Tag = line.as ?? "h2";
        const MotionLine = motionHeadingTags[Tag];

        let charIndex = 0;

        return (
          <MotionLine
            key={lineIndex}
            className={line.className}
            style={{ lineHeight: 1.2 }}
          >
            {line.text.split(" ").map((word, wordIndex) => (
              <span
                key={`${lineIndex}-word-${wordIndex}`}
                className="inline-block whitespace-nowrap"
              >
                {word.split("").map((char) => {
                  const delay = startDelay + charIndex * characterDelay;
                  charIndex++;

                  return (
                    <motion.span
                      key={`${lineIndex}-char-${charIndex}`}
                      variants={{
                        hidden: { opacity: 0, y: yOffset },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration,
                            delay,
                            ease: ease as [number, number, number, number],
                          },
                        },
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {/* restore space between words */}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </MotionLine>
        );
      })}
    </motion.div>
  );
}
