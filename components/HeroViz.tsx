"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const COLS = 9;
const ROWS = 9;
const CELLS = COLS * ROWS;
/** Alcance do cursor, em px. Fora disso a célula fica em repouso. */
const RADIUS = 170;
/** Fração da distância que a célula caminha na direção do cursor. */
const REACH = 0.3;
/** Constantes de tempo do amortecimento, em ms: pega rápido, solta devagar. */
const TAU_GRAB = 80;
const TAU_RELEASE = 420;
const DEG = 180 / Math.PI;

/**
 * Campo dos mesmos "+" que marcam os cruzamentos da grade da página.
 * Os próximos do cursor crescem, acendem e se inclinam na direção dele.
 *
 * Cada célula guarda um estado amortecido em vez de saltar para o alvo: o
 * campo se forma e se desfaz com inércia, e a constante de tempo é diferente
 * na ida e na volta, então o cursor "agarra" rápido e larga devagar.
 *
 * As células são escritas direto no DOM dentro de um rAF: 81 elementos
 * re-renderizando a cada mousemove seria caro demais para o React.
 */
export function HeroViz() {
  const box = useRef<HTMLDivElement>(null);
  const cells = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = box.current;
    if (!el) return;

    // Estado amortecido por célula: deslocamento em px e energia 0..1.
    const vx = new Float32Array(CELLS);
    const vy = new Float32Array(CELLS);
    const gg = new Float32Array(CELLS);
    const lastG = new Float32Array(CELLS).fill(-1);

    // O ponteiro é seguido na janela, não na caixa: as células da borda já
    // reagem enquanto o cursor se aproxima de fora, em vez de acender de uma
    // vez quando ele cruza a aresta.
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;
    let last = 0;
    let onScreen = false;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      // Passo real entre quadros, com teto: depois de uma aba em segundo
      // plano o dt volta enorme e a suavização daria um salto.
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;

      const rect = el.getBoundingClientRect();
      if (!rect.width) return;
      const px = pointer.x - rect.left;
      const py = pointer.y - rect.top;
      const cw = rect.width / COLS;
      const ch = rect.height / ROWS;
      const kGrab = 1 - Math.exp(-dt / TAU_GRAB);
      const kRelease = 1 - Math.exp(-dt / TAU_RELEASE);

      for (let i = 0; i < CELLS; i++) {
        const cell = cells.current[i];
        if (!cell) continue;

        const col = i % COLS;
        const row = (i - col) / COLS;
        const dx = px - (col * cw + cw / 2);
        const dy = py - (row * ch + ch / 2);
        const dist = Math.hypot(dx, dy);

        // Queda quadrática: o efeito é bem concentrado perto do cursor.
        const pull = dist < RADIUS ? (1 - dist / RADIUS) ** 2 : 0;
        const k = pull > gg[i] ? kGrab : kRelease;
        vx[i] += (dx * REACH * pull - vx[i]) * k;
        vy[i] += (dy * REACH * pull - vy[i]) * k;
        gg[i] += (pull - gg[i]) * k;
        const g = gg[i];

        // Respiração de fundo: onda lenta na diagonal, para o campo ter vida
        // antes de qualquer interação.
        const idle = 0.5 + 0.5 * Math.sin(now * 0.0011 - (col + row) * 0.44);

        // O ângulo vem do vetor já amortecido, não da posição crua: não há
        // salto quando o cursor cruza a célula, e a inclinação nasce junto
        // com a energia em vez de aparecer pronta.
        const rot = g > 0.001 ? Math.atan2(vy[i], vx[i]) * DEG * g : 0;
        cell.style.transform =
          `translate(${vx[i].toFixed(2)}px, ${vy[i].toFixed(2)}px) ` +
          `rotate(${rot.toFixed(1)}deg) scale(${1 + g * 1.35 + idle * 0.06})`;
        cell.style.opacity = `${0.16 + idle * 0.1 + g * 0.74}`;

        // A cor é a escrita cara: só vai ao CSS quando o valor anda de fato,
        // então a onda de respiração sozinha não mexe nela.
        if (Math.abs(g - lastG[i]) > 0.004) {
          cell.style.setProperty("--g", g.toFixed(3));
          lastG[i] = g;
        }
      }
    };

    const start = () => {
      if (frame || document.hidden || !onScreen) return;
      last = 0;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    // Fora da tela ou com a aba escondida o laço para: a respiração não
    // custa nada quando ninguém está olhando.
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [reduce]);

  return (
    <div className="hero-viz" ref={box} aria-hidden="true">
      {Array.from({ length: CELLS }, (_, i) => (
        <span
          key={i}
          ref={(node) => {
            cells.current[i] = node;
          }}
        />
      ))}
    </div>
  );
}
