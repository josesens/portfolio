"use client";

import { useLang } from "./lang";
import { Parallax, Reveal } from "./motion";
import { sections } from "@/lib/content";

export function Work() {
  const { t, lang } = useLang();
  return (
    <section className="sec wrap" id="trabalho">
      <Reveal>
        <div className="eyebrow">
          <b>02</b>
          <span>{sections[1].label[lang]}</span>
        </div>
        <h2 className="big">{t.work.title}</h2>
      </Reveal>

      {t.work.projects.map((p) => (
        <article className="proj" key={p.name}>
          <div className="proj-pin">
            <Reveal>
              <div className="proj-num">{p.num}</div>
              <h3 className="proj-name">{p.name}</h3>
              <p className="proj-one">{p.one}</p>
              {p.tags.length > 0 && (
                <div className="tags">
                  {p.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              )}
              {p.links && (
                <div className="proj-links">
                  {p.links.map((l) => (
                    <a className="btn btn-ghost" href={l.href} key={l.label}>{l.label}</a>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          <div className="proj-body">
            <Reveal>
              <p className="lead">{p.lead}</p>
              {p.body && <p>{p.body}</p>}
            </Reveal>
            {p.shot && (
              <Parallax speed={0.04} className="shot-wrap">
                <div className="shot">{p.shot}</div>
              </Parallax>
            )}
            {p.bullets && (
              <ul className="bullets">
                {p.bullets.map((b, i) => (
                  <Reveal as="li" key={b} delay={i * 0.06}>
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <span>{b}</span>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
