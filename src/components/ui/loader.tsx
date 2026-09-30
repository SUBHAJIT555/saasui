"use client";

import { motion } from "motion/react";

const loaderDotClass =
  "h-4 w-4 rounded-full border border-blue-200 bg-gradient-to-b from-blue-600 to-blue-400";

export const LoaderOne = () => {
  const transition = (x: number) => ({
    duration: 1,
    repeat: Infinity,
    repeatType: "loop" as const,
    delay: x * 0.2,
    ease: "easeInOut" as const,
  });

  return (
    <div
      className="flex items-center gap-2"
      role="status"
      aria-label="Loading application"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={transition(0)}
        className={loaderDotClass}
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={transition(1)}
        className={loaderDotClass}
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={transition(2)}
        className={loaderDotClass}
      />
    </div>
  );
};
