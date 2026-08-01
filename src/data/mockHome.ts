import type { Profile } from "@/pages/api/sectionProfile";
import type { Skill } from "@/pages/api/sectionSkills";
import type { Certificate } from "@/pages/api/sectionCertificates";
import type { Experience } from "@/pages/api/sectionsExperiences";
import type { PersonalProject } from "@/pages/api/sectionsPersonalProjects";

export type HomeData = {
  profileData: Profile | null;
  skillsData: Skill[];
  certificateData: Certificate[];
  experienceData: Experience[];
  personalProjectsData: PersonalProject[];
};

const AVATAR = "https://avatars.githubusercontent.com/u/108242598?v=4";
const PROJECT_IMG = "/images/ogimage.png";
const CERT_IMG = "/images/ogimage.png";
const COMPANY_IMG = "/images/bg-profile.webp";

export const mockProfile: Profile = {
  user_name: "Lucas Trindade",
  user_title: "Tech Lead · Full Stack",
  user_role: "Tech Lead · Full Stack",
  user_bio:
    "Tech Lead e Full Stack com foco em produto, performance e liderança técnica. Fundador da TrinityWeb.",
  user_avatar: AVATAR,
  user_avatar_sync: AVATAR,
  user_presentation: [
    {
      plain_text:
        "Sou um desenvolvedor full-stack apaixonado por criar soluções digitais que unem funcionalidade e inovação. Com domínio em JavaScript, WordPress, Node.js e Next.js, desenvolvo projetos web que vão desde aplicações práticas até experimentos criativos!\n\nMinha trajetória profissional começou em 2017, trabalhando com tecnologia e colaborando em projetos que demandam criatividade, estratégia e habilidades técnicas sólidas. Gosto de transformar ideias em soluções reais, entregando código limpo e eficiente que resolve problemas e atende às necessidades dos usuários.\n\nBusco sempre evoluir, acompanhando as tendências do desenvolvimento web e aplicando o que há de melhor em cada projeto. Quer discutir tecnologia ou explorar uma ideia? Estou aberto a conversar!",
    },
  ],
};

export const mockSkills: Skill[] = [
  {
    skill_name: "JavaScript",
    skill_category: "Linguagem",
    skill_level: "Avançado",
    skill_description: "Base do meu dia a dia em front e back.",
  },
  {
    skill_name: "TypeScript",
    skill_category: "Linguagem",
    skill_level: "Avançado",
  },
  { skill_name: "React", skill_category: "Frontend", skill_level: "Avançado" },
  { skill_name: "Next.js", skill_category: "Frontend", skill_level: "Avançado" },
  { skill_name: "Node.js", skill_category: "Backend", skill_level: "Intermediário" },
  { skill_name: "WordPress", skill_category: "CMS", skill_level: "Avançado" },
  { skill_name: "Tailwind CSS", skill_category: "Frontend", skill_level: "Avançado" },
  { skill_name: "GSAP", skill_category: "Frontend", skill_level: "Intermediário" },
  { skill_name: "PostgreSQL", skill_category: "Database", skill_level: "Intermediário" },
  { skill_name: "Git", skill_category: "Ferramenta", skill_level: "Avançado" },
];

export const mockCertificates: Certificate[] = [
  {
    certificate_id: "1",
    certificate_name: "Pós-Graduação em Desenvolvimento Full Stack",
    certificate_instructors: "Instituição Mock",
    certificate_file: CERT_IMG,
    certificate_file_sync: CERT_IMG,
    certificate_date: "2024-03-15",
    certificate_category: "Pós-Graduação",
  },
  {
    certificate_id: "2",
    certificate_name: "React Avançado e Performance",
    certificate_instructors: "Alura",
    certificate_file: CERT_IMG,
    certificate_file_sync: CERT_IMG,
    certificate_date: "2023-11-02",
    certificate_category: "Horas",
  },
  {
    certificate_id: "3",
    certificate_name: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    certificate_instructors: "Fatec",
    certificate_file: CERT_IMG,
    certificate_file_sync: CERT_IMG,
    certificate_date: "2022-12-20",
    certificate_category: "Tecnólogo",
  },
  {
    certificate_id: "4",
    certificate_name: "Workshop de UX para Devs",
    certificate_instructors: "Evento Mock",
    certificate_file: CERT_IMG,
    certificate_file_sync: CERT_IMG,
    certificate_date: "2024-06-10",
    certificate_category: "Eventos",
  },
  {
    certificate_id: "5",
    certificate_name: "Node.js e APIs REST",
    certificate_instructors: "Rocketseat",
    certificate_file: CERT_IMG,
    certificate_file_sync: CERT_IMG,
    certificate_date: "2023-08-18",
    certificate_category: "Horas",
  },
  {
    certificate_id: "6",
    certificate_name: "Design Systems na prática",
    certificate_instructors: "Curso Mock",
    certificate_file: CERT_IMG,
    certificate_file_sync: CERT_IMG,
    certificate_date: "2024-01-09",
    certificate_category: "Horas",
  },
  {
    certificate_id: "7",
    certificate_name: "Extra para testar “Ver todos”",
    certificate_instructors: "Mock",
    certificate_file: CERT_IMG,
    certificate_file_sync: CERT_IMG,
    certificate_date: "2025-02-01",
    certificate_category: "Horas",
  },
];

export const mockExperiences: Experience[] = [
  {
    experience_id: "1",
    experience_company_name: "Trinity Web",
    experience_company_avatar: COMPANY_IMG,
    experience_company_avatar_sync: COMPANY_IMG,
    experience_company_website: "https://thetrinityweb.com.br",
    experience_position: "Desenvolvedor Full Stack",
    experience_date_start: "2022-01-01",
    experience_date_end: "",
    experience_about:
      "Desenvolvimento de produtos web, sites institucionais e experiências interativas com foco em performance e conversão.",
    experience_location: "Remoto / SP",
    experience_operating_model: "Híbrido",
  },
  {
    experience_id: "2",
    experience_company_name: "Estúdio Mock",
    experience_company_avatar: COMPANY_IMG,
    experience_company_avatar_sync: COMPANY_IMG,
    experience_company_website: "https://lucastrindade.dev",
    experience_position: "Frontend Developer",
    experience_date_start: "2020-03-01",
    experience_date_end: "2021-12-01",
    experience_about:
      "Criação de interfaces, landing pages e manutenção de sistemas em React e WordPress.",
    experience_location: "Mogi-Mirim, SP",
    experience_operating_model: "Presencial",
  },
];

export const mockPersonalProjects: PersonalProject[] = [
  {
    project_name: "lucastrindade.dev",
    project_title: "Portfolio pessoal",
    project_description:
      "Site portfolio com CMS Notion, animações GSAP e foco em recrutadores. Descrição longa de mock para testar truncamento com reticências no layout ultrawide dos prints.",
    project_url: "https://lucastrindade.dev",
    project_image: PROJECT_IMG,
    project_image_sync: PROJECT_IMG,
    project_order: 1,
  },
  {
    project_name: "trinityweb-front",
    project_title: "Trinity Web Front",
    project_description:
      "Frontend institucional com tipografia forte, motion e componentes reutilizáveis. Outro texto mock bem longo para validar line-clamp na seção de projetos pessoais.",
    project_url: "https://thetrinityweb.com.br",
    project_image: PROJECT_IMG,
    project_image_sync: PROJECT_IMG,
    project_order: 2,
  },
  {
    project_name: "side-project",
    project_title: "Side project mock",
    project_description: "Projeto curto de teste.",
    project_url: "https://github.com/TrindadeBRA",
    project_image: PROJECT_IMG,
    project_image_sync: PROJECT_IMG,
    project_order: 3,
  },
];

export const mockHomeData: HomeData = {
  profileData: mockProfile,
  skillsData: mockSkills,
  certificateData: mockCertificates,
  experienceData: mockExperiences,
  personalProjectsData: mockPersonalProjects,
};

function isEmptyProfile(profile: Profile | null | undefined) {
  if (!profile) return true;
  return !profile.user_name && !profile.user_bio && !profile.user_avatar_sync && !profile.user_avatar;
}

/**
 * Usa mock quando Notion falha / vem vazio.
 * Force com USE_MOCK_DATA=true no .env
 */
export function withMockHomeData(data: Partial<HomeData>): HomeData {
  const forceMock = process.env.USE_MOCK_DATA === "true";

  if (forceMock) {
    console.info("[mock] USE_MOCK_DATA=true — usando dados mock");
    return mockHomeData;
  }

  const profileData = isEmptyProfile(data.profileData) ? mockProfile : (data.profileData as Profile);
  const skillsData = data.skillsData?.length ? data.skillsData : mockSkills;
  const certificateData = data.certificateData?.length ? data.certificateData : mockCertificates;
  const experienceData = data.experienceData?.length ? data.experienceData : mockExperiences;
  const personalProjectsData = data.personalProjectsData?.length
    ? data.personalProjectsData
    : mockPersonalProjects;

  if (isEmptyProfile(data.profileData)) console.info("[mock] profile → mock");
  if (!data.skillsData?.length) console.info("[mock] skills → mock");
  if (!data.certificateData?.length) console.info("[mock] certificates → mock");
  if (!data.experienceData?.length) console.info("[mock] experiences → mock");
  if (!data.personalProjectsData?.length) console.info("[mock] projects → mock");

  return {
    profileData,
    skillsData,
    certificateData,
    experienceData,
    personalProjectsData,
  };
}
