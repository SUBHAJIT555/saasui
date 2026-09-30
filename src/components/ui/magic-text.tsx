import * as React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export interface MagicTextProps {
  text: string;
  className?: string;
  renderWord?: (word: string, index: number, words: string[]) => React.ReactNode;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: number[];
  renderWord?: (word: string, index: number, words: string[]) => React.ReactNode;
  index: number;
  words: string[];
}

const Word: React.FC<WordProps> = ({ children, progress, range, renderWord, index, words }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  const content = renderWord ? renderWord(children, index, words) : children;

  return (
    <span className="relative inline-block mr-1">
      <span className="opacity-20">{content}</span>
      <motion.span className="absolute top-0 left-0" style={{ opacity: opacity }}>
        {content}
      </motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text, className = "", renderWord }) => {
  const container = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p ref={container} className={`relative flex flex-wrap leading-relaxed m-0 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            renderWord={renderWord}
            index={i}
            words={words}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};
