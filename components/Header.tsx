"use client";

import { motion } from "motion/react";
import { useLang } from "./lang";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/content";

const langs: Lang[] = ["pt", "en"];

export function Header() {
  const { lang, setLang, t } = useLang();
  return (
    <>
      <a className="skip" href="#conteudo">{t.skip}</a>
      <header className="bar">
        <a className="mark" href="#inicio">JZ.</a>
        <div className="bar-right">
          <nav className="lang" aria-label="Idioma">
            {langs.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
              >
                {lang === l && (
                  <motion.span
                    layoutId="lang-pill"
                    className="lang-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{l.toUpperCase()}</span>
              </button>
            ))}
          </nav>
          <a className="talk" href={`mailto:${site.email}`}>{t.talk}</a>
        </div>
      </header>
    </>
  );
}
