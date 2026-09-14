import { site } from "./site";

export type Lang = "pt" | "en";

export const sections = [
  { id: "inicio", num: "01", label: { pt: "Início", en: "Start" } },
  { id: "trabalho", num: "02", label: { pt: "Trabalho", en: "Work" } },
  { id: "sobre", num: "03", label: { pt: "Sobre", en: "About" } },
  { id: "trajetoria", num: "04", label: { pt: "Trajetória", en: "Background" } },
  { id: "contato", num: "05", label: { pt: "Contato", en: "Contact" } },
] as const;

export const stack = [
  "Go", "React", "React Native", "TypeScript", "PostgreSQL",
  "AWS", "Docker", "Stripe", "Angular", "Expo",
];

type Project = {
  num: string;
  name: string;
  one: string;
  tags: string[];
  links?: { label: string; href: string }[];
  lead: string;
  body?: string;
  shot?: string;
  bullets?: string[];
};

type Content = {
  skip: string;
  talk: string;
  hero: {
    eyebrow: string;
    title: { pre: string; strong: string; post: string };
    text: string;
    ctaWork: string;
    ctaResume: string;
    live: string;
    stats: { n: string; label: string }[];
  };
  work: { title: string; projects: Project[] };
  about: {
    title: string;
    intro: string;
    cards: { num: string; kicker: string; title: string; text: string }[];
  };
  cv: { title: string; items: { when: string; what: string; note: string }[] };
  contact: { title: [string, string]; text: string; resume: string; foot: [string, string] };
};

export const content: Record<Lang, Content> = {
  pt: {
    skip: "Pular para o conteúdo",
    talk: "Falar comigo",
    hero: {
      eyebrow: "Full stack developer",
      title: { pre: "Construo produtos que ", strong: "chegam ao usuário", post: " — e continuam de pé depois." },
      text: "Sou o Zé. Criei o Nutrin, um software de nutrição usado por profissionais no Brasil, e publiquei o aplicativo dos pacientes na App Store. Do modelo de dados à tela, sem terceirizar decisão.",
      ctaWork: "Ver o trabalho",
      ctaResume: "Currículo (PDF)",
      live: "Aberto a oportunidades",
      stats: [
        { n: "2", label: "produtos no ar, com usuários pagantes" },
        { n: "1", label: "aplicativo publicado na App Store" },
        { n: "3", label: "anos entregando para clientes reais" },
      ],
    },
    work: {
      title: "Poucos projetos. Todos no ar.",
      projects: [
        {
          num: "01 · 2024 →",
          name: "Nutrin",
          one: "Plataforma de nutrição: web para o profissional, app para o paciente.",
          tags: ["Go", "React", "React Native", "PostgreSQL", "AWS", "Stripe"],
          links: [
            { label: "Abrir site", href: site.nutrin.site },
            { label: "App Store", href: site.nutrin.appStore },
          ],
          lead: "O nutricionista monta o plano alimentar, entrega em PDF e perde o paciente de vista por um mês. O Nutrin fecha esse intervalo.",
          body: "Na web, o profissional conduz o atendimento inteiro: anamnese, medidas, exames, plano alimentar, prescrição, agenda sincronizada com o Google e o financeiro do consultório. No celular, o paciente vê o plano do dia e registra as refeições com foto, e o profissional acompanha a evolução sem esperar a próxima consulta.",
          shot: "screenshot — plano alimentar",
          bullets: [
            "Produto próprio, do zero à loja: pesquisa com nutricionistas, escopo, desenvolvimento, publicação e suporte.",
            "Multi-tenant com quatro planos de assinatura e cobrança recorrente via Stripe.",
            "Tabelas oficiais de composição de alimentos (TACO, IBGE) integradas ao cálculo do plano.",
            "Marca registrada no INPI e app aprovado na revisão da Apple.",
          ],
        },
        {
          num: "02 · 2026",
          name: "Agente de pentest",
          one: "Trabalho de conclusão em Engenharia da Computação.",
          tags: ["LLM", "OpenAPI", "Segurança"],
          lead: "Um agente que lê a especificação OpenAPI de uma API REST e conduz sozinho os testes de invasão que hoje dependem de alguém fazendo à mão.",
          body: "A pergunta da pesquisa não é se o modelo acha falhas, e sim quanto ele cobre com autonomia e onde erra de forma previsível — que é o que decide se a ferramenta serve na prática.",
          bullets: [
            "Pesquisa e implementação do agente.",
            "Em escrita, defesa prevista para o fim de 2026.",
          ],
        },
        {
          num: "03 · 2023 →",
          name: "Uliweb",
          one: "Estúdio de web e aplicativos que toco, com clientes reais.",
          tags: [],
          lead: "Projetos entregues sob prazo e orçamento de cliente, do primeiro briefing ao que entra no ar.",
          body: "É a parte do trabalho que trata de conversa difícil, corte de escopo e manutenção depois da entrega. Nenhum projeto pessoal ensina isso.",
        },
      ],
    },
    about: {
      title: "Do primeiro commit até alguém pagando pelo produto.",
      intro: "Quatro coisas que explicam como eu trabalho melhor do que uma lista de tecnologias.",
      cards: [
        { num: "01", kicker: "Produto", title: "Antes da stack, quem sofre com o quê.", text: "O Nutrin existe porque nutricionista entrega PDF e torce para o paciente seguir. Escolher tecnologia é a parte fácil; entender o problema é o que decide se alguém vai pagar." },
        { num: "02", kicker: "Escopo", title: "Entregar é decidir o que fica de fora.", text: "Todo release meu é uma lista do que não entrou. Foi assim que o app saiu na App Store em vez de continuar melhorando para sempre." },
        { num: "03", kicker: "Código", title: "Eu mantenho o que escrevo, então escrevo para manter.", text: "Sou o único suporte do Nutrin. Decisão ruim de arquitetura volta para mim num domingo, com cliente esperando — isso ensina mais sobre qualidade do que qualquer code review." },
        { num: "04", kicker: "Full stack", title: "Do banco ao pixel, sem esperar por ninguém.", text: "Modelo a tabela, exponho a rota, consumo no front e coloco em produção. Não me faz especialista em tudo; me faz capaz de entregar o produto inteiro." },
      ],
    },
    cv: {
      title: "Onde eu estive.",
      items: [
        { when: "2024 →", what: "Blendus", note: "Desenvolvedor full stack. Go no backend, React e Angular no front. Promoção para pleno em andamento." },
        { when: "2023 →", what: "Uliweb", note: "Sócio e desenvolvedor. Web e aplicativos para clientes." },
        { when: "2024 →", what: "Nutrin", note: "Fundador e único desenvolvedor do produto." },
        { when: "→ 2026", what: "Engenharia da Computação", note: "Graduação, conclusão no fim deste ano." },
      ],
    },
    contact: {
      title: ["Vamos", "conversar."],
      text: "Aberto a conversas sobre vagas, projetos e qualquer coisa que envolva produto e código. Me conta o contexto e o prazo.",
      resume: "Currículo (PDF)",
      foot: ["Zé — Full stack developer", "Florianópolis, Brasil · 2026"],
    },
  },
  en: {
    skip: "Skip to content",
    talk: "Get in touch",
    hero: {
      eyebrow: "Full stack developer",
      title: { pre: "I build products that ", strong: "reach real users", post: " — and stay standing after launch." },
      text: "I'm Zé. I built Nutrin, nutrition software used by professionals in Brazil, and shipped its patient app on the App Store. From the data model to the screen, without outsourcing the decisions.",
      ctaWork: "See the work",
      ctaResume: "Résumé (PDF)",
      live: "Open to opportunities",
      stats: [
        { n: "2", label: "products live, with paying users" },
        { n: "1", label: "app published on the App Store" },
        { n: "3", label: "years shipping for real clients" },
      ],
    },
    work: {
      title: "A few projects. All of them live.",
      projects: [
        {
          num: "01 · 2024 →",
          name: "Nutrin",
          one: "Nutrition platform: web for the professional, app for the patient.",
          tags: ["Go", "React", "React Native", "PostgreSQL", "AWS", "Stripe"],
          links: [
            { label: "Open site", href: site.nutrin.site },
            { label: "App Store", href: site.nutrin.appStore },
          ],
          lead: "A nutritionist builds the meal plan, hands over a PDF, then loses sight of the patient for a month. Nutrin closes that gap.",
          body: "On the web, the professional runs the entire appointment: intake, measurements, lab results, meal plans, prescriptions, Google-synced scheduling and practice finances. On mobile, the patient sees the day's plan and logs meals with photos, so the professional follows progress without waiting for the next visit.",
          shot: "screenshot — meal plan",
          bullets: [
            "My own product, from zero to the store: research with nutritionists, scope, build, release and support.",
            "Multi-tenant, four subscription tiers, recurring billing through Stripe.",
            "Official Brazilian food composition tables (TACO, IBGE) wired into plan calculations.",
            "Trademark registered with the Brazilian INPI; app approved in Apple review.",
          ],
        },
        {
          num: "02 · 2026",
          name: "Pentest agent",
          one: "Final thesis, Computer Engineering.",
          tags: ["LLM", "OpenAPI", "Security"],
          lead: "An agent that reads a REST API's OpenAPI spec and runs, on its own, the penetration tests that today depend on someone doing them by hand.",
          body: "The research question isn't whether the model finds flaws, but how much it covers autonomously and where it fails predictably — which is what decides whether the tool is useful in practice.",
          bullets: [
            "Research and implementation of the agent.",
            "In progress, defense expected end of 2026.",
          ],
        },
        {
          num: "03 · 2023 →",
          name: "Uliweb",
          one: "The web and app studio I run, with real clients.",
          tags: [],
          lead: "Projects delivered on a client's budget and deadline, from first briefing to what goes live.",
          body: "This is the part of the work about hard conversations, cutting scope and maintenance after launch. No personal project teaches that.",
        },
      ],
    },
    about: {
      title: "From the first commit to someone paying for the product.",
      intro: "Four things that explain how I work better than a list of technologies.",
      cards: [
        { num: "01", kicker: "Product", title: "Before the stack: who is hurting, and how.", text: "Nutrin exists because nutritionists hand over a PDF and hope the patient follows it. Picking the technology is the easy part; understanding the problem is what decides whether anyone pays." },
        { num: "02", kicker: "Scope", title: "Shipping means deciding what gets left out.", text: "Every release of mine is a list of what didn't make it. That's how the app reached the App Store instead of improving forever." },
        { num: "03", kicker: "Code", title: "I maintain what I write, so I write to maintain.", text: "I'm Nutrin's only support. A bad architecture call comes back to me on a Sunday with a customer waiting — that teaches more about quality than any code review." },
        { num: "04", kicker: "Full stack", title: "From the database to the pixel, without waiting on anyone.", text: "I model the table, expose the route, consume it on the front end and put it in production. That doesn't make me an expert in everything; it makes me able to deliver the whole product." },
      ],
    },
    cv: {
      title: "Where I've been.",
      items: [
        { when: "2024 →", what: "Blendus", note: "Full stack developer. Go on the backend, React and Angular on the front. Currently being promoted to mid-level." },
        { when: "2023 →", what: "Uliweb", note: "Partner and developer. Web and apps for clients." },
        { when: "2024 →", what: "Nutrin", note: "Founder and sole developer of the product." },
        { when: "→ 2026", what: "Computer Engineering", note: "Bachelor's degree, finishing at the end of this year." },
      ],
    },
    contact: {
      title: ["Let's", "talk."],
      text: "Open to conversations about roles, projects and anything involving product and code. Tell me the context and the timeline.",
      resume: "Résumé (PDF)",
      foot: ["Zé — Full stack developer", "Florianópolis, Brazil · 2026"],
    },
  },
};
