"use client";

import { useLang } from "./lang";
import { Reveal } from "./motion";
import { sections } from "@/lib/content";

export function About() {
  const { t, lang } = useLang();
  return (
    <section className="sec wrap" id="sobre">
      <Reveal>
        <div className="eyebrow">
          <b>03</b>
          <span>{sections[2].label[lang]}</span>
        </div>
        <h2 className="big">{t.about.title}</h2>
      </Reveal>
      <div className="about">
        <div className="about-pin">
          <Reveal>
            <p>{t.about.intro}</p>
          </Reveal>
        </div>
        <div>
          {t.about.cards.map((c) => (
            <Reveal className="about-card" key={c.num}>
              <div className="proj-num">
                {c.num} · <span>{c.kicker}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
