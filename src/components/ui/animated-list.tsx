import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface AnimatedListItem {
  /** Primary text (rendered bold by default) */
  text: string;
  /** Optional secondary text after the bold part */
  rest?: string;
  /** Icon or element shown before the text */
  icon: ReactNode;
  /** Optional unique key (defaults to index) */
  key?: string;
}

export interface AnimatedListProps {
  /** List items: each with icon, text, optional rest */
  items: AnimatedListItem[];
  /** Wrapper className (e.g. space-y-2 sm:space-y-3) */
  containerClassName?: string;
  /** Each row className (e.g. flex items-start gap-3) */
  itemClassName?: string;
  /** Paragraph/content className */
  contentClassName?: string;
  /** Icon wrapper className */
  iconClassName?: string;
  /** Animation: initial x offset in px (positive = from right). Default 50 */
  xOffset?: number;
  /** Animation duration in seconds. Default 0.6 */
  duration?: number;
  /** Delay per item in seconds (index * staggerDelay). Default 0.1 */
  staggerDelay?: number;
  /** viewport once. Default false */
  viewportOnce?: boolean;
  /** viewport amount (0–1). Default 0.5 */
  viewportAmount?: number;
  /** Render text as bold (wrap in span). Default true */
  boldText?: boolean;
}

export function AnimatedList({
  items,
  containerClassName = "space-y-2 sm:space-y-3",
  itemClassName = "flex items-start gap-3 group",
  contentClassName = "text-base sm:text-lg md:text-xl font-inter-display text-text-primary leading-tight",
  iconClassName = "text-blue-600 shrink-0 flex items-center h-full pt-0.5 [&_svg]:h-5 [&_svg]:w-5",
  xOffset = 50,
  duration = 0.6,
  staggerDelay = 0.1,
  viewportOnce = false,
  viewportAmount = 0.5,
  boldText = true,
}: AnimatedListProps) {
  return (
    <div className={containerClassName}>
      {items.map((item, index) => (
        <motion.div
          key={item.key ?? index}
          initial={{ opacity: 0, x: xOffset }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: viewportOnce, amount: viewportAmount }}
          transition={{ duration, delay: index * staggerDelay }}
          className={itemClassName}
        >
          <span className={iconClassName}>{item.icon}</span>
          <p className={`${contentClassName} min-w-0 flex-1 wrap-break-words`}>
            {boldText ? <span className="font-bold">{item.text}</span> : item.text}
            {item.rest != null && item.rest !== "" && <>{" "}{item.rest}</>}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
