"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { useLang } from "./lang";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/content";
import { Row } from "./Row";
import { ThemeToggle } from "./ThemeToggle";
import { LinkedInMark } from "./icons";

/** Rótulo do botão de idioma: descreve para onde ele leva. */
const switchTo: Record<Lang, string> = {
  pt: "Ver em inglês",
  en: "Ver em português",
};

/** Trecho de scroll em que a faixa se desmonta e vira pílula. */
const lift: [number, number] = [12, 132];

export function Header() {
  const { lang, setLang, t } = useLang();
  const next: Lang = lang === "pt" ? "en" : "pt";
  const reduce = useReducedMotion();

  /* A barra não tem dois estados: --p vai de 0 (faixa encaixada na grade) a 1
     (pílula solta) junto com o scroll, e o CSS interpola largura, altura, raio,
     fundo e sombra a partir desse mesmo número — nada "pula" num limiar. */
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, lift, [0, 1], { clamp: true });
  /* mola leve: tira o tranco da roda do mouse sem atrasar o dedo no trackpad */
  const damped = useSpring(raw, { stiffness: 320, damping: 42, mass: 0.6 });
  /* a mola pode passar do fim do curso; o CSS precisa de 0–1 fechado */
  const p = useTransform(reduce ? raw : damped, (v) => Math.min(1, Math.max(0, v)));

  /* o blur do vidro só entra depois que a pílula começa a se soltar */
  const [lifted, setLifted] = useState(false);
  useMotionValueEvent(p, "change", (v) => setLifted(v > 0.01));

  return (
    <>
      <a className="skip" href="#conteudo">{t.skip}</a>
      <motion.header
        className={lifted ? "bar bar-lift" : "bar"}
        style={{ "--p": p } as unknown as MotionStyle}
      >
        <Row hatch top>
          <div className="bar-inner">
            <a className="mark" href="#inicio">José Sens</a>
            <div className="bar-right">
              <button
                type="button"
                className="lang"
                onClick={() => setLang(next)}
                aria-label={switchTo[lang]}
                title={switchTo[lang]}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={next}
                    initial={{ y: 9, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -9, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 0.8, 0.24, 1] }}
                  >
                    {next.toUpperCase()}
                  </motion.span>
                </AnimatePresence>
              </button>
              <ThemeToggle />
              {/* só ícone: o nome acessível vem do aria-label */}
              <a
                className="ico-link"
                href={site.linkedin}
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInMark />
              </a>
              <a className="talk" href={`mailto:${site.email}`}>{t.talk}</a>
            </div>
          </div>
        </Row>
      </motion.header>
    </>
  );
}
