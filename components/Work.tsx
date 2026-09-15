"use client";

import { useLang } from "./lang";
import { Reveal } from "./motion";
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
              {p.logo && (
                <div className="proj-mark">
                  <div
                    className="proj-logo"
                    data-brand={p.logo.brand}
                    aria-hidden="true"
                    style={{
                      // Inline não passa pelo Lightning CSS, então o prefixo
                      // do Safari precisa vir escrito à mão.
                      WebkitMaskImage: `url(${p.logo.src})`,
                      maskImage: `url(${p.logo.src})`,
                      aspectRatio: p.logo.ratio,
                    }}
                  />
                  {/* O ® não cabe na máscara (o PNG é só recorte), então vem
                      como texto sobrescrito, do jeito que a marca se escreve. */}
                  {p.registered && <span className="proj-r">®</span>}
                </div>
              )}
              {/* Com logo, o nome fica só para leitor de tela e SEO:
                  a arte já escreve a palavra. */}
              <h3 className={p.logo ? "proj-name sr-only" : "proj-name"}>
                {p.name}
              </h3>
              <p className="proj-one">{p.one}</p>
              {p.links && (
                <div className="proj-links">
                  {p.links.map((l) => (
                    <a
                      className="btn btn-ghost"
                      href={l.href}
                      key={l.label}
                      target="_blank"
                      rel="noopener"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          <div className="proj-body">
            <Reveal>
              {p.body && <p>{p.body}</p>}
            </Reveal>
          </div>
        </article>
      ))}
    </section>
  );
}
