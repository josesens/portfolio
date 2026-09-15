"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Theme = "dark" | "light";

const label: Record<Theme, string> = {
  dark: "Tema claro",
  light: "Tema escuro",
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // O tema já foi aplicado no <html> antes da hidratação; aqui só o lemos.
  useEffect(() => {
    if (document.documentElement.dataset.theme === "dark") setTheme("dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    // o claro não marca atributo, igual ao que o themeInit faz no carregamento
    if (next === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // modo privado / storage bloqueado: o tema vale só para esta sessão
    }
  };

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme"
      onClick={toggle}
      aria-label={label[theme]}
      title={label[theme]}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.svg
          key={next}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          initial={{ rotate: -70, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 70, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 0.8, 0.24, 1] }}
        >
          {next === "light" ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </>
          ) : (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}
