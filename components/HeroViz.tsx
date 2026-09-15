"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const COLS = 9;
const ROWS = 9;
const CELLS = COLS * ROWS;
/** Alcance do cursor, em px. Fora disso a célula fica em repouso. */
const RADIUS = 150;

/**
 * Campo dos mesmos "+" que marcam os cruzamentos da grade da página.
 * Os próximos do cursor crescem, acendem e se inclinam na direção dele.
 *
 * As células são escritas direto no DOM dentro de um rAF: 81 elementos
 * re-renderizando a cada mousemove seria caro demais para o React.
 */
export function HeroViz() {
  const box = useRef<HTMLDivElement>(null);
  const cells = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = box.current;
    if (!el) return;

    let frame = 0;
    /** Conta os quadros já gastos relaxando depois que o ponteiro saiu. */
    let settling = 0;

    const draw = () => {
      const rect = el.getBoundingClientRect();
      const { x, y, active } = pointer.current;
      const px = x - rect.left;
      const py = y - rect.top;
      const cw = rect.width / COLS;
      const ch = rect.height / ROWS;

      for (let i = 0; i < CELLS; i++) {
        const cell = cells.current[i];
        if (!cell) continue;

        const cx = (i % COLS) * cw + cw / 2;
        const cy = Math.floor(i / COLS) * ch + ch / 2;
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy);

        // Queda quadrática: o efeito é bem concentrado perto do cursor.
        const pull = active ? Math.max(0, 1 - dist / RADIUS) ** 2 : 0;

        const tx = pull * dx * 0.3;
        const ty = pull * dy * 0.3;
        cell.style.transform = `translate(${tx}px, ${ty}px) scale(${1 + pull * 1.5})`;
        cell.style.opacity = `${0.22 + pull * 0.78}`;
        cell.style.color = pull > 0.08 ? "var(--accent)" : "var(--fg-dim)";
      }

      // Roda enquanto o ponteiro está dentro; ao sair, mais uns quadros
      // para as células voltarem ao lugar, e então para de vez.
      if (pointer.current.active) settling = 0;
      else settling++;
      if (settling < 40) frame = requestAnimationFrame(draw);
      else frame = 0;
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY, active: true };
      start();
    };
    const onLeave = () => {
      pointer.current.active = false;
      start();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
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
