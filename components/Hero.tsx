"use client";

import { motion } from "motion/react";
import { useLang } from "./lang";
import { site } from "@/lib/site";
import { Parallax, rise, stagger } from "./motion";
import { HeroViz } from "./HeroViz";
import { DownloadMark } from "./icons";

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
          {h.title.map((line, i) =>
            line.strong ? <b key={i}>{line.text}</b> : <span key={i}>{line.text}</span>
          )}
        </motion.h1>
        <motion.p variants={rise}>{h.text}</motion.p>
        <motion.div className="hero-cta" variants={rise}>
          <a className="btn btn-solid" href="#trabalho">{h.ctaWork}</a>
          <a className="btn btn-ghost btn-ico" href={site.resume}>
            <DownloadMark />
            {h.ctaResume}
          </a>
        </motion.div>
      </motion.div>

      <HeroViz />
    </section>
  );
}
