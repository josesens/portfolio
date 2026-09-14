"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

export const ease = [0.16, 0.8, 0.24, 1] as const;

/** Fade + rise when the element scrolls into view (once). */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Staggered entrance for a group of children, used by the hero on mount. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
export const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

/**
 * Scroll-linked drift. `speed` is a fraction of the element's travel
 * through the viewport; positive lags behind the page, negative runs ahead.
 * The outer div is what gets measured so the transform never skews the math.
 */
export function Parallax({
  speed,
  className,
  innerClassName,
  children,
}: {
  speed: number;
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = speed * 700;
  const raw = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.6 });

  return (
    <div ref={ref} className={className}>
      <motion.div className={innerClassName} style={{ y: reduce ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  );
}
