"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { content, type Lang } from "@/lib/content";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof content)[Lang] };

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
