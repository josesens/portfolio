"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/content";
import { useLang } from "./lang";

export function Rail() {
  const { lang } = useLang();
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="Seções">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? "on" : undefined}>
          <i />
          <span>
            {s.num} <em>{s.label[lang]}</em>
          </span>
        </a>
      ))}
    </nav>
  );
}
