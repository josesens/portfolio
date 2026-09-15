"use client";

import { useLang } from "./lang";
import { Reveal } from "./motion";
import { sections } from "@/lib/content";

export function Background() {
  const { t, lang } = useLang();
  return (
    <section className="sec wrap" id="trajetoria">
      <Reveal>
        <div className="eyebrow">
          <b>03</b>
          <span>{sections[2].label[lang]}</span>
        </div>
        <h2 className="big">{t.cv.title}</h2>
      </Reveal>
      <ul className="cv">
        {t.cv.items.map((item, i) => (
          <Reveal as="li" key={item.what} delay={i * 0.05}>
            <span className="cv-when">{item.when}</span>
            <span className="cv-what">{item.what}</span>
            <span className="cv-note">{item.note}</span>
            <span className="cv-tech">
              {item.tech?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
