import { Profile } from "@/pages/api/sectionProfile";
import { Experience } from "@/pages/api/sectionsExperiences";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaWhatsapp, FaCheckCircle, FaRegCircle, FaRedo } from "react-icons/fa";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMyAge(): number {
  const birth = new Date(1996, 6, 28); // 28/julho/1996
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const notYetBirthday =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
  if (notYetBirthday) age--;
  return age;
}

function getLunaAge(): string {
  const birth = new Date(2024, 8, 3); // 03/setembro/2024 (mês 0-indexado)
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} ${months === 1 ? "mês" : "meses"}`;
  if (months === 0) return `${years} ${years === 1 ? "ano" : "anos"}`;
  return `${years} ${years === 1 ? "ano" : "anos"} e ${months} ${months === 1 ? "mês" : "meses"}`;
}

// ─── Tópicos de entrevista para Tech Lead ────────────────────────────────────

const INTERVIEW_TOPICS = [
  {
    id: "apresentacao",
    label: "Apresentação pessoal",
    category: "intro",
    content: {
      title: "Quem sou eu",
      points: [
        "Me chamo Lucas Trindade, tenho " + getMyAge() + " anos, sou pai da Luna — que hoje tem " + getLunaAge() + " — e isso mudou bastante a forma como eu penso sobre o que construo e para quem.",
        "Sou desenvolvedor full-stack e atuo como Tech Lead na UDS Soluções Digitais, liderando um time completo dentro de uma fábrica de software.",
        "Comecei em 2017 como estagiário, passei por agências e empresas de produto, e fui crescendo até assumir a liderança técnica. Além da UDS, sou proprietário da Trinity Web, onde toco projetos com autonomia total.",
        "Fora do trabalho, tenho dois hobbies: gosto de codar produtos que funcionam sem mim — o Protagonizei.com nasceu assim, uma plataforma de livros infantis personalizados que vende enquanto eu durmo. E mexo nos meus carros: rodas, suspensão, interior — não por necessidade, mas porque gosto de pegar algo e transformar até ficar exatamente do jeito que eu quero. No fundo, os dois hobbies são a mesma coisa.",
      ],
    },
  },
  {
    id: "lideranca-time",
    label: "Liderança do time atual",
    category: "leadership",
    content: {
      title: "Como gerencio meu time hoje",
      points: [
        "Na UDS lidero um time completo de 6 pessoas: 1 dev back-end, 1 dev front-end, 1 dev mobile, 2 analistas e 1 Scrum Master.",
        "Sou o ponto de referência técnica do time — as decisões de arquitetura, integrações e estratégia de dados passam por mim.",
        "Trabalho lado a lado com os analistas para entender os problemas do cliente antes de propor qualquer solução técnica.",
        "Meu papel é garantir que o time entregue com qualidade, sem gargalos, e que cada pessoa saiba exatamente o que precisa fazer e por quê.",
      ],
    },
  },
  {
    id: "arquitetura-integracao",
    label: "Arquitetura de integrações",
    category: "tech",
    content: {
      title: "Como monto arquiteturas de integração",
      points: [
        "Mapeio todos os sistemas envolvidos, seus contratos de API e os pontos de falha antes de escrever uma linha de código.",
        "Defino o fluxo de dados entre sistemas, escolho os padrões de comunicação (REST, webhooks, filas) e documento tudo antes da implementação.",
        "Já arquitetei integrações com sistemas legados, ERPs e plataformas de terceiros, sempre priorizando resiliência e rastreabilidade.",
        "Uso ferramentas como N8N para automações e orquestração de fluxos quando faz sentido reduzir complexidade de código.",
      ],
    },
  },
  {
    id: "migracao-etl",
    label: "Migração de dados e ETL",
    category: "tech",
    content: {
      title: "Planejamento de migração e ETL",
      points: [
        "Monto planos de migração de dados com etapas claras: mapeamento da origem, transformação, validação e carga no destino.",
        "Identifico inconsistências e problemas de qualidade nos dados antes da migração para evitar retrabalho em produção.",
        "Defino estratégias de rollback e validação pós-migração para garantir que nada se perca no processo.",
        "Já conduzi migrações em projetos de fábrica de software onde o risco de parada era alto — o planejamento detalhado foi o que garantiu a entrega.",
      ],
    },
  },
  {
    id: "resolucao-problemas",
    label: "Entender problemas e sugerir soluções",
    category: "leadership",
    content: {
      title: "Como resolvo problemas técnicos",
      points: [
        "Antes de sugerir qualquer solução, invisto tempo entendendo o problema real — muitas vezes o que o cliente pede não é o que ele precisa.",
        "Trabalho junto com os analistas para traduzir necessidades de negócio em requisitos técnicos claros e viáveis.",
        "Apresento as opções com trade-offs explícitos: custo, prazo, complexidade e risco. A decisão final é informada, não imposta.",
        "Tenho histórico de simplificar soluções que chegaram super complexas — às vezes o melhor código é o que não precisa ser escrito.",
      ],
    },
  },
  {
    id: "stack",
    label: "Stack e ferramentas",
    category: "tech",
    content: {
      title: "Tecnologias que domino",
      points: [
        "Frontend: React, Next.js, TypeScript e Tailwind CSS. Backend: Node.js, PHP/Laravel.",
        "Banco de dados: MySQL, modelagem relacional, NoSQL. Experiência com design de schemas para sistemas de integração.",
        "DevOps: Docker, CI/CD com GitHub Actions e GitLab CI, deploy na Vercel e Azure.",
        "Ferramentas de gestão: Jira, Trello, Runrun.it. Documentação técnica com Swagger/OpenAPI.",
      ],
    },
  },
  {
    id: "soft-skills",
    label: "Como trabalho com pessoas",
    category: "intro",
    content: {
      title: "Soft skills que fazem diferença",
      points: [
        "Comunicação clara é prioridade — alinho expectativas antes de começar, não depois de errar.",
        "Sei transitar entre o técnico e o estratégico: consigo falar com o time de dev e com o cliente no mesmo dia sobre o mesmo projeto.",
        "Dou e recebo feedback direto, sempre com foco em solução. Não deixo problema acumular.",
        "Acredito que um tech lead que só cobra entrega sem desenvolver o time está fazendo metade do trabalho.",
      ],
    },
  },
  {
    id: "evolucao",
    label: "Evolução contínua",
    category: "intro",
    content: {
      title: "Como me mantenho atualizado",
      points: [
        "Tenho mais de 30 certificações — de Docker e DevOps a IA, Blockchain e arquitetura de sistemas.",
        "Experimento novas ferramentas em projetos pessoais antes de propor para o time. Não adoto hype sem validação.",
        "Acompanho tendências do ecossistema JavaScript e de integração de sistemas de perto.",
        "Aprender faz parte do trabalho — não é algo separado dele.",
      ],
    },
  },
  {
    id: "expectativas",
    label: "O que busco na vaga",
    category: "leadership",
    content: {
      title: "Por que quero essa posição",
      points: [
        "Quero um ambiente onde eu possa contribuir tecnicamente e também desenvolver o time ao redor.",
        "Busco desafios reais de arquitetura e integração — não só execução de tarefas.",
        "Valorizo autonomia com responsabilidade: quero ter voz nas decisões técnicas e ser cobrado pelos resultados.",
        "Já faço o trabalho de tech lead na prática. Agora quero uma posição que reconheça isso formalmente e me dê mais escala para impactar.",
      ],
    },
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  intro: "bg-indigo-600",
  tech: "bg-violet-600",
  leadership: "bg-emerald-600",
};

const CATEGORY_LABELS: Record<string, string> = {
  intro: "Perfil",
  tech: "Técnico",
  leadership: "Liderança",
};

const STORAGE_KEY = "interview_topics_done";

// ─── Component ───────────────────────────────────────────────────────────────

export default function InterviewClient({
  profileData,
  experienceData,
}: {
  profileData: Profile;
  experienceData: Experience[];
}) {
  const [doneTopics, setDoneTopics] = useState<string[]>([]);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDoneTopics(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  const toggleDone = (id: string) => {
    setDoneTopics((prev) => {
      const next = prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetAll = () => {
    setDoneTopics([]);
    setActiveTopic(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const activeTData = INTERVIEW_TOPICS.find((t) => t.id === activeTopic);
  const progress = Math.round((doneTopics.length / INTERVIEW_TOPICS.length) * 100);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  }

  return (
    <>
      {/* ── Header ── */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/">
            <Image src="/images/logo/LucasTrindade.png" alt="Logo" width={140} height={60} priority />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="https://www.linkedin.com/in/trindadebra/" target="_blank">
              <FaLinkedin className="text-gray-400 hover:text-indigo-400 transition-colors" size={20} />
            </Link>
            <Link href="https://github.com/TrindadeBRA/" target="_blank">
              <FaGithub className="text-gray-400 hover:text-indigo-400 transition-colors" size={20} />
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=5511952498126" target="_blank">
              <FaWhatsapp className="text-gray-400 hover:text-green-400 transition-colors" size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-gray-900 py-12 sm:py-16 border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {profileData?.user_avatar_sync && (
              <Image
                src={profileData.user_avatar_sync}
                alt={profileData.user_name}
                width={120}
                height={120}
                className="rounded-full ring-4 ring-indigo-600 object-cover w-28 h-28 flex-shrink-0"
              />
            )}
            <div>
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-1">
                Modo entrevista
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {profileData?.user_name ?? "Lucas Trindade"}
              </h1>
              <p className="text-gray-400 mt-2 text-base">
                Tech Lead · Fábrica de Software · JS / Next.js / Node.js / Arquitetura de Integrações
              </p>
              <p className="text-gray-500 text-sm mt-1">Mogi-Mirim, SP · trindadebra@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main layout ── */}
      <main className="bg-gray-950 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 sticky top-6">

              {/* Progress */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Progresso</span>
                  <span className="text-xs text-indigo-400 font-bold">
                    {doneTopics.length}/{INTERVIEW_TOPICS.length}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Topic list */}
              <ul className="space-y-2">
                {INTERVIEW_TOPICS.map((topic) => {
                  const isDone = doneTopics.includes(topic.id);
                  const isActive = activeTopic === topic.id;
                  return (
                    <li key={topic.id}>
                      <button
                        onClick={() => setActiveTopic(isActive ? null : topic.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                          isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-800 text-gray-300 hover:text-white"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${CATEGORY_COLORS[topic.category]}`} />
                        <span className="flex-1 text-sm font-medium leading-tight">{topic.label}</span>
                        <span
                          role="button"
                          onClick={(e) => { e.stopPropagation(); toggleDone(topic.id); }}
                          className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title={isDone ? "Marcar como pendente" : "Marcar como falado"}
                        >
                          {isDone
                            ? <FaCheckCircle className="text-emerald-400" size={16} />
                            : <FaRegCircle className="text-gray-500" size={16} />
                          }
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Legend */}
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Categorias</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <span key={key} className={`text-xs px-2 py-0.5 rounded-full text-white ${CATEGORY_COLORS[key]}`}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {doneTopics.length > 0 && (
                <button
                  onClick={resetAll}
                  className="mt-4 w-full flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-red-400 transition-colors py-2"
                >
                  <FaRedo size={11} />
                  Resetar progresso
                </button>
              )}
            </div>
          </aside>

          {/* ── Content ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Active topic card */}
            {activeTData ? (
              <div className="bg-gray-900 rounded-2xl border border-indigo-600/40 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full text-white ${CATEGORY_COLORS[activeTData.category]} mb-3 inline-block`}>
                      {CATEGORY_LABELS[activeTData.category]}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{activeTData.content.title}</h2>
                  </div>
                  <button
                    onClick={() => toggleDone(activeTData.id)}
                    className="flex-shrink-0 flex items-center gap-2 text-sm px-4 py-2 rounded-xl border transition-all duration-200 border-gray-700 text-gray-400 hover:border-emerald-500 hover:text-emerald-400"
                  >
                    {doneTopics.includes(activeTData.id)
                      ? <><FaCheckCircle className="text-emerald-400" size={14} /> Falado</>
                      : <><FaRegCircle size={14} /> Marcar</>
                    }
                  </button>
                </div>
                <ul className="space-y-4">
                  {activeTData.content.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      <p className="text-gray-300 leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                <p className="text-gray-500 text-sm">Selecione um tópico ao lado para ver os pontos de fala.</p>
              </div>
            )}

            {/* Experiences timeline */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 sm:p-8">
              <h3 className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-1">Linha do tempo</h3>
              <p className="text-xl font-bold text-white mb-6">Experiências Profissionais</p>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800" />
                <div className="space-y-6 pl-10">
                  {experienceData.map((exp) => (
                    <div key={exp.experience_id} className="relative">
                      <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-gray-900" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <span className="text-white font-semibold">{exp.experience_company_name}</span>
                        <span className="hidden sm:inline text-gray-600">·</span>
                        <span className="text-gray-400 text-sm">{exp.experience_position}</span>
                        {exp.experience_date_end === null && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                            Atual
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {formatDate(exp.experience_date_start)} —{" "}
                        {exp.experience_date_end ? formatDate(exp.experience_date_end) : "Presente"}
                      </p>
                      {exp.experience_about && (
                        <p className="text-gray-400 text-sm leading-relaxed">{exp.experience_about}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider font-medium">Links rápidos</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Portfolio", href: "/" },
                  { label: "Currículo PDF", href: "/resume" },
                  { label: "GitHub", href: "https://github.com/TrindadeBRA/" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/trindadebra/" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className="text-sm px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 border-t border-gray-800 py-6">
        <p className="text-center text-xs text-gray-600">
          Página privada · Lucas Trindade · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
