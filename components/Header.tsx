"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "./lang";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/content";
import { Row } from "./Row";
import { ThemeToggle } from "./ThemeToggle";

/** Rótulo do botão de idioma: descreve para onde ele leva. */
const switchTo: Record<Lang, string> = {
  pt: "Ver em inglês",
  en: "Ver em português",
};

export function Header() {
  const { lang, setLang, t } = useLang();
  const next: Lang = lang === "pt" ? "en" : "pt";
  /** Fora do topo, a faixa da grade vira uma pílula flutuante. */
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip" href="#conteudo">{t.skip}</a>
      <header className={floating ? "bar bar-float" : "bar"}>
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
              <a className="talk" href={`mailto:${site.email}`}>{t.talk}</a>
            </div>
          </div>
        </Row>
      </header>
    </>
  );
}
