"use client";

import { motion } from "motion/react";
import { useLang } from "./lang";
import { site } from "@/lib/site";
import { Parallax, rise, stagger } from "./motion";

export function Hero() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section className="hero wrap" id="inicio">
      <Parallax speed={0.09} className="hero-glow" innerClassName="hero-glow-paint" />

      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.div className="eyebrow" variants={rise}>
          <b>01</b>
          <span>{h.eyebrow}</span>
        </motion.div>
        <motion.h1 variants={rise}>
          {h.title.pre}
          <b>{h.title.strong}</b>
          {h.title.post}
        </motion.h1>
        <motion.p variants={rise}>{h.text}</motion.p>
        <motion.div className="hero-cta" variants={rise}>
          <a className="btn btn-solid" href="#trabalho">{h.ctaWork}</a>
          <a className="btn btn-ghost" href={site.resume}>{h.ctaResume}</a>
          <span className="live">
            <i />
            <span>{h.live}</span>
          </span>
        </motion.div>
      </motion.div>

      <Parallax speed={-0.03} className="stats" innerClassName="stats-row">
        {h.stats.map((s) => (
          <motion.div
            className="stat"
            key={s.label}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 0.8, 0.24, 1], delay: 0.6 }}
          >
            <b>{s.n}</b>
            <span>{s.label}</span>
          </motion.div>
        ))}
      </Parallax>
    </section>
  );
}
