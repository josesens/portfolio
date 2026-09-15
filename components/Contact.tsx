"use client";

import { useLang } from "./lang";
import { Reveal } from "./motion";
import { sections } from "@/lib/content";
import { site } from "@/lib/site";
import { DownloadMark, GitHubMark, LinkedInMark, MailMark } from "./icons";

export function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  return (
    <section className="sec wrap end" id="contato">
      <Reveal>
        <div className="eyebrow">
          <b>04</b>
          <span>{sections[3].label[lang]}</span>
        </div>
        <h2>
          {c.title[0]}
          <br />
          {c.title[1]}
        </h2>
        <p>{c.text}</p>
      </Reveal>
      <Reveal className="end-links" delay={0.15}>
        <a className="btn btn-solid btn-ico" href={`mailto:${site.email}`}>
          <MailMark />
          {site.email}
        </a>
        <a
          className="btn btn-ghost btn-ico"
          href={site.linkedin}
          target="_blank"
          rel="noopener"
        >
          <LinkedInMark />
          LinkedIn
        </a>
        <a
          className="btn btn-ghost btn-ico"
          href={site.github}
          target="_blank"
          rel="noopener"
        >
          <GitHubMark />
          GitHub
        </a>
        <a className="btn btn-ghost btn-ico" href={site.resume}>
          <DownloadMark />
          {c.resume}
        </a>
      </Reveal>
      <div className="foot">
        <span>{c.foot[0]}</span>
        <span suppressHydrationWarning>
          {c.foot[1]} · {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
}
