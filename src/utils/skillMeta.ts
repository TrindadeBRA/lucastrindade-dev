import { Skill } from "@/pages/api/sectionSkills";

export type SkillMeta = {
  category: string;
  blurb: string;
};

const DEFAULT_BLURB =
  "Tecnologia, ferramenta ou framework com experiência profissional ou conhecimento através de estudos e projetos.";

const CATALOG: Record<string, SkillMeta> = {
  react: { category: "Frontend", blurb: "Biblioteca para interfaces modernas, componentização e SPAs." },
  "react.js": { category: "Frontend", blurb: "Biblioteca para interfaces modernas, componentização e SPAs." },
  "next.js": { category: "Frontend", blurb: "Framework React para SSR/SSG, rotas e performance em produção." },
  nextjs: { category: "Frontend", blurb: "Framework React para SSR/SSG, rotas e performance em produção." },
  javascript: { category: "Linguagens", blurb: "Linguagem base do ecossistema web, do browser ao Node.js." },
  typescript: { category: "Linguagens", blurb: "JavaScript tipado para bases maiores, mais seguras e escaláveis." },
  "node.js": { category: "Backend", blurb: "Runtime JavaScript no servidor para APIs e serviços." },
  nodejs: { category: "Backend", blurb: "Runtime JavaScript no servidor para APIs e serviços." },
  wordpress: { category: "CMS", blurb: "CMS flexível para sites, blogs e soluções sob medida." },
  php: { category: "Backend", blurb: "Linguagem server-side amplamente usada em web e WordPress." },
  html: { category: "Frontend", blurb: "Estrutura semântica de páginas e aplicações web." },
  css: { category: "Frontend", blurb: "Estilização, layout e responsividade de interfaces." },
  tailwind: { category: "Frontend", blurb: "Utility-first CSS para UI rápida e consistente." },
  "tailwind css": { category: "Frontend", blurb: "Utility-first CSS para UI rápida e consistente." },
  git: { category: "Ferramentas", blurb: "Controle de versão e colaboração em código." },
  github: { category: "Ferramentas", blurb: "Hospedagem de repositórios, PRs e fluxos de CI." },
  docker: { category: "DevOps", blurb: "Containerização para ambientes reproduzíveis." },
  mysql: { category: "Dados", blurb: "Banco relacional para aplicações web." },
  postgresql: { category: "Dados", blurb: "Banco relacional robusto para dados estruturados." },
  postgres: { category: "Dados", blurb: "Banco relacional robusto para dados estruturados." },
  mongodb: { category: "Dados", blurb: "Banco NoSQL orientado a documentos." },
  figma: { category: "Design", blurb: "Design de interfaces e handoff com o time de produto." },
  vercel: { category: "DevOps", blurb: "Deploy e preview de aplicações front-end modernas." },
  aws: { category: "Cloud", blurb: "Serviços cloud para hospedagem, storage e infraestrutura." },
  graphql: { category: "Backend", blurb: "API tipada e flexível para consumo de dados." },
  rest: { category: "Backend", blurb: "APIs HTTP para integração entre sistemas." },
  "rest api": { category: "Backend", blurb: "APIs HTTP para integração entre sistemas." },
  redux: { category: "Frontend", blurb: "Gerenciamento de estado previsível em aplicações React." },
  vue: { category: "Frontend", blurb: "Framework progressivo para interfaces reativas." },
  "vue.js": { category: "Frontend", blurb: "Framework progressivo para interfaces reativas." },
  python: { category: "Linguagens", blurb: "Linguagem versátil para scripts, APIs e automações." },
  laravel: { category: "Backend", blurb: "Framework PHP para APIs e aplicações web." },
  express: { category: "Backend", blurb: "Framework minimalista para APIs em Node.js." },
  "express.js": { category: "Backend", blurb: "Framework minimalista para APIs em Node.js." },
  sass: { category: "Frontend", blurb: "Pré-processador CSS para estilos mais organizados." },
  scss: { category: "Frontend", blurb: "Pré-processador CSS para estilos mais organizados." },
  jest: { category: "Qualidade", blurb: "Testes unitários e de integração no ecossistema JS." },
  cypress: { category: "Qualidade", blurb: "Testes end-to-end para fluxos críticos." },
  playwright: { category: "Qualidade", blurb: "Automação e testes e2e multi-browser." },
  linux: { category: "Ferramentas", blurb: "Ambiente e servidores para desenvolvimento e deploy." },
  nginx: { category: "DevOps", blurb: "Servidor web e reverse proxy de alta performance." },
  redis: { category: "Dados", blurb: "Cache e estruturas em memória para performance." },
  firebase: { category: "Cloud", blurb: "Backend-as-a-service para auth, dados e hosting." },
  notion: { category: "Ferramentas", blurb: "Conteúdo e dados estruturados para produtos e docs." },
  gsap: { category: "Frontend", blurb: "Animações de alta performance para interfaces web." },
  "three.js": { category: "Frontend", blurb: "Gráficos 3D no browser com WebGL." },
  "react native": { category: "Mobile", blurb: "Apps mobile com o ecossistema React." },
};

export function resolveSkillMeta(skill: Skill): SkillMeta {
  const key = skill.skill_name.trim().toLowerCase();
  const fromCatalog = CATALOG[key];

  return {
    category: skill.skill_category || fromCatalog?.category || "Skill",
    blurb: skill.skill_description || fromCatalog?.blurb || DEFAULT_BLURB,
  };
}

export function skillInitials(name: string) {
  const parts = name.trim().split(/[\s./+-]+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
