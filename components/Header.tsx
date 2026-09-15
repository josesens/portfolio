"use client";

import { useEffect, useState } from "react";
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
import { sections, type Lang } from "@/lib/content";
import { Row } from "./Row";
import { ThemeToggle } from "./ThemeToggle";
import { LinkedInMark, MailMark } from "./icons";

/** Rótulo do botão de idioma: descreve para onde ele leva. */
const switchTo: Record<Lang, string> = {
  pt: "Ver em inglês",
  en: "Ver em português",
};

/** Trecho de scroll em que a faixa se desmonta e vira pílula. */
const lift: [number, number] = [12, 132];

/** Largura a partir da qual as seções cabem na barra. Espelha o @media do CSS. */
const WIDE = "(min-width: 901px)";

/**
 * Seção sob a leitura: a primeira que cruza uma faixa fina no alto da tela.
 * O menu precisa disso para dizer onde a pessoa está — sem o destaque ele
 * seria só uma lista de atalhos.
 */
function useActiveSection() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        // Em ordem de documento: com duas seções na faixa, vale a de cima.
        const first = sections.find((s) => inBand.has(s.id));
        if (first) setActive(first.id);
      },
      // A viewport encolhe a uma faixa logo abaixo da barra, então a seção só
      // troca quando o começo dela chega de fato à altura da leitura.
      { rootMargin: "-25% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}

export function Header() {
  const { lang, setLang, t } = useLang();
  const next: Lang = lang === "pt" ? "en" : "pt";
  const reduce = useReducedMotion();
  const active = useActiveSection();

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

  /* painel das seções nas telas estreitas, onde a lista não cabe na barra */
  const [open, setOpen] = useState(false);

  // Saída pelo teclado para quem entrou pelo teclado.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Alargou a janela: a lista volta para a barra e o painel perde a razão de
  // existir — sem isso ele ficaria aberto e invisível, preso no aria-expanded.
  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const sync = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

            {/* A mesma lista aparece duas vezes, em formas diferentes: aqui
                acima de 900px, e no painel abaixo disso. O CSS esconde a que
                não serve à largura, então só uma chega à árvore de acesso. */}
            <nav className="nav" aria-label={t.nav.label}>
              {sections.map((s) => {
                const on = s.id === active;
                return (
                  <a
                    key={s.id}
                    className={on ? "nav-a on" : "nav-a"}
                    href={`#${s.id}`}
                    aria-current={on ? "true" : undefined}
                  >
                    {s.label[lang]}
                    {/* um traço só, que muda de lugar, em vez de quatro que
                        acendem: o olho segue o movimento e entende a troca */}
                    {on && (
                      <motion.span
                        className="nav-mark"
                        layoutId="nav-mark"
                        transition={{ type: "spring", stiffness: 420, damping: 38 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

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
              {/* nas telas estreitas o rótulo sai e fica só o envelope: o nome
                  continua no aria-label, e a largura sobra para o menu */}
              <a
                className="talk"
                href={`mailto:${site.email}`}
                aria-label={t.talk}
                title={t.talk}
              >
                <MailMark />
                <span>{t.talk}</span>
              </a>
              {/* as duas barras nascem cruzadas como os "+" da grade e abrem
                  em × — o mesmo traço do site, em outro ângulo */}
              <button
                type="button"
                className="nav-btn"
                aria-expanded={open}
                aria-controls="nav-panel"
                aria-label={open ? t.nav.close : t.nav.open}
                title={open ? t.nav.close : t.nav.open}
                onClick={() => setOpen((v) => !v)}
              >
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }}
                  transition={{ duration: 0.28, ease: [0.16, 0.8, 0.24, 1] }}
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }}
                  transition={{ duration: 0.28, ease: [0.16, 0.8, 0.24, 1] }}
                />
              </button>
            </div>

            <AnimatePresence>
              {open && (
                <motion.nav
                  id="nav-panel"
                  className="nav-panel"
                  aria-label={t.nav.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 0.8, 0.24, 1] }}
                >
                  {sections.map((s) => {
                    const on = s.id === active;
                    return (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={on ? "on" : undefined}
                        aria-current={on ? "true" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <i>{s.num}</i>
                        {s.label[lang]}
                      </a>
                    );
                  })}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </Row>
      </motion.header>
    </>
  );
}
