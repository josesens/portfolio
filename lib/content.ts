import { site } from "./site";

export type Lang = "pt" | "en";

export const sections = [
  { id: "inicio", num: "01", label: { pt: "Início", en: "Start" } },
  { id: "trabalho", num: "02", label: { pt: "Trabalho", en: "Work" } },
  { id: "trajetoria", num: "03", label: { pt: "Trajetória", en: "Background" } },
  { id: "contato", num: "04", label: { pt: "Contato", en: "Contact" } },
] as const;

export const stack = [
  "Go", "React", "React Native", "TypeScript", "PostgreSQL",
  "AWS", "Docker", "Stripe", "Angular", "Expo",
];

type Project = {
  name: string;
  one: string;
  links?: { label: string; href: string }[];
  body?: string;
  registered?: boolean;
  logo?: { src: string; ratio: number; brand: string };
};

type Content = {
  skip: string;
  talk: string;
  hero: {
    eyebrow: string;
    title: { text: string; strong?: boolean }[];
    text: string;
    ctaWork: string;
    ctaResume: string;
  };
  work: { title: string; projects: Project[] };
  cv: {
    title: string;
    items: { when: string; what: string; note: string; tech?: string[] }[];
  };
  contact: {
    title: [string, string];
    text: string;
    resume: string;
    foot: [string, string];
  };
};

export const content: Record<Lang, Content> = {
  pt: {
    skip: "Pular para o conteúdo",
    talk: "Falar comigo",
    hero: {
      eyebrow: "Full stack developer",
      title: [{ text: "Ideias" }, { text: "ganham" }, { text: "forma", strong: true }, { text: "com código." }],
      text: "Eu sou José, desenvolvedor full stack. Desenvolvo\nsoluções eficientes que resolvem problemas reais.",
      ctaWork: "Ver o trabalho",
      ctaResume: "Currículo (PDF)",
    },
    work: {
      title: "Trabalhos selecionados",
      projects: [
        {
          name: "Nutrin",
          one: "Gestão de consultório para nutricionistas.",
          links: [
            { label: "Abrir site", href: site.nutrin.site },
            { label: "App Store", href: site.nutrin.appStore },
          ],
          body: "SaaS para nutricionistas que centraliza a gestão completa do consultório. Inclui um app mobile para o paciente acompanhar o plano e um assistente de IA para resumos de anamnese dentre outras funcionalidades. Projetado, desenvolvido e mantido por mim, de ponta a ponta.",
          logo: { src: "/nutrin.png", ratio: 2000 / 384, brand: "nutrin" },
          registered: true,
        },
        {
          name: "Uliweb",
          one: "Desenvolvimento de sites, apps e branding.",
          logo: { src: "/uliweb.png", ratio: 1130 / 189, brand: "uliweb" },
          links: [{ label: "Abrir site", href: site.uliweb }],
          body: "Empresa que fundei para desenvolvimento de sites, aplicativos e identidade visual. Trabalho lado a lado com cada cliente do início ao fim, do onboarding ao planejamento, desenvolvimento e otimização contínua, entregando soluções sob medida para cada negócio.",
        },
        {
          name: "Vivax TV",
          one: "Site e app mobile para emissora regional",
          links: [{ label: "Abrir site", href: site.vivax }],
          body: "Site e App que leva a programação da emissora para o público, com streaming ao vivo, acesso ao portal de notícias e ao serviço de streaming da emissora. Inclui cadastro, login e configurações de usuário.",
          logo: { src: "/vivax.png", ratio: 2048 / 851, brand: "vivax" },
        },
      ],
    },
    cv: {
      title: "Onde eu estive.",
      items: [
        { when: "2024 →", what: "Blendus", note: "Desenvolvedor full stack.", tech: ["TypeScript", "Angular", "Go", "Oracle", "Apex", "SQL", "Airflow", "Elastic", "Docker"] },
        { when: "2022 → 2024", what: "Zedia", note: "Desenvolvedor full stack.", tech: ["TypeScript", "React", "Go", "PostgreSQL", "Redis", "Docker", "Prometheus", "Grafana"] },
        { when: "2024 →", what: "Nutrin", note: "Fundador e desenvolvedor do produto.", tech: ["JavaScript", "React", "React Native", "Expo", "AWS", "Cloudflare", "PostHog"] },
        { when: "2022 →", what: "Uliweb", note: "Sócio e desenvolvedor de sites, aplicativos e branding.", tech: ["HTML", "CSS", "JavaScript", "WordPress", "Elementor", "WooCommerce", "Figma"] },
      ],
    },
    contact: {
      title: ["Vamos", "conversar."],
      text: "Aberto a conversas sobre vagas, projetos e qualquer coisa que envolva produto e código. Me conta o contexto e o prazo.",
      resume: "Currículo (PDF)",
      foot: ["José - Full stack developer", "Florianópolis, Brasil"],
    },
  },
  en: {
    skip: "Skip to content",
    talk: "Get in touch",
    hero: {
      eyebrow: "Full stack developer",
      title: [{ text: "Ideas" }, { text: "take" }, { text: "shape", strong: true }, { text: "in code." }],
      text: "I build efficient web solutions that solve real problems for your business. From idea to live product, with you at every stage.",
      ctaWork: "See the work",
      ctaResume: "Résumé (PDF)",
    },
    work: {
      title: "Selected work",
      projects: [
        {
          name: "Nutrin",
          one: "Nutrition practice management.",
          links: [
            { label: "Open site", href: site.nutrin.site },
            { label: "App Store", href: site.nutrin.appStore },
          ],
          body: "Everything the nutritionist needs sits in one place, in a logical order: intake, measurements, lab results, meal plans, prescriptions, Google-synced scheduling and practice finances. On mobile, the patient sees the day's plan and logs meals with photos, so the professional follows progress without waiting for the next visit. Every screen came from the same question: how many clicks does this take?",
          logo: { src: "/nutrin.png", ratio: 2000 / 384, brand: "nutrin" },
          registered: true,
        },
        {
          name: "Uliweb",
          one: "The websites and brand identity studio I run, with real clients.",
          logo: { src: "/uliweb.png", ratio: 1130 / 189, brand: "uliweb" },
          links: [{ label: "Open site", href: site.uliweb }],
          body: "Every delivery runs on a client's budget and deadline, from first briefing to what goes live. This is the part of the work about hard conversations, cutting scope and maintenance after launch — no personal project teaches that.",
        },
        {
          name: "Vivax TV",
          one: "Website and mobile app for a regional broadcaster",
          links: [{ label: "Open site", href: site.vivax }],
          body: "A phone app that takes the station's programming to where its audience already is: the live stream on open, shortcuts to the newsroom's portal and its streaming service, and a direct channel for viewers to message the newsroom. Includes sign-up, login and user settings.",
          logo: { src: "/vivax.png", ratio: 2048 / 851, brand: "vivax" },
        },
      ],
    },
    cv: {
      title: "Where I've been.",
      items: [
        { when: "2024 →", what: "Blendus", note: "Full stack developer.", tech: ["TypeScript", "Angular", "Go", "Oracle", "Apex", "SQL", "Airflow", "Elastic", "Docker"] },
        { when: "2022 → 2024", what: "Zedia", note: "Full stack developer.", tech: ["TypeScript", "React", "Go", "PostgreSQL", "Redis", "Docker", "Prometheus", "Grafana"] },
        { when: "2024 →", what: "Nutrin", note: "Founder and developer of the product.", tech: ["JavaScript", "React", "React Native", "Expo", "AWS", "Cloudflare", "PostHog"] },
        { when: "2022 →", what: "Uliweb", note: "Partner and developer of websites, apps and branding.", tech: ["HTML", "CSS", "JavaScript", "WordPress", "Elementor", "WooCommerce", "Figma"] },
      ],
    },
    contact: {
      title: ["Let's", "talk."],
      text: "Open to conversations about roles, projects and anything involving product and code. Tell me the context and the timeline.",
      resume: "Résumé (PDF)",
      foot: ["José - Full stack developer", "Florianópolis, Brazil"],
    },
  },
};
