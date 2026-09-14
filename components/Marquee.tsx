"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from "motion/react";
import { stack } from "@/lib/content";

/** Drifts on its own and speeds up with scroll velocity. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const [half, setHalf] = useState(0);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const boost = useSpring(velocity, { stiffness: 400, damping: 50 });

  useEffect(() => {
    const measure = () => setHalf(track.current ? track.current.scrollWidth / 2 : 0);
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !half) return;
    const speed = 24 + Math.abs(boost.get()) * 0.05; // px per second
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  const items = [...stack, ...stack];
  return (
    <div className="strip" aria-hidden="true">
      <motion.div className="strip-track" ref={track} style={{ x }}>
        {items.map((s, i) => <span key={i}>{s}</span>)}
      </motion.div>
    </div>
  );
}
