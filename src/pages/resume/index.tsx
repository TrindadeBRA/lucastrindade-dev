import { GetStaticProps } from "next";
import { Profile, getSectionProfile } from "@/pages/api/sectionProfile";
import { Skill, getSectionSkills } from "@/pages/api/sectionSkills";
import { Certificate, getSectionCertificates } from "@/pages/api/sectionCertificates";
import { Experience, getSectionExperiences } from "@/pages/api/sectionsExperiences";
import { getSectionPersonalProjects, PersonalProject } from "@/pages/api/sectionsPersonalProjects";
import Link from "next/link";
import { FaDownload, FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Head from 'next/head';

export default function Resume({ profileData, skillsData, certificateData, experienceData, personalProjectsData }:
  { profileData: Profile, skillsData: Skill, certificateData: Certificate[], experienceData: Experience[], personalProjectsData: PersonalProject[] }) {

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleDownload = async () => {
    window.print();
  };

  return (
    <>
      <Head>
        <title>Currículo - Lucas Trindade</title>
      </Head>

      <div id="resume-content" className="bg-white text-black flex flex-col pt-4 pb-12 gap-y-8 px-4">
        {/* Header */}
        <div id="header" className="flex flex-col md:flex-row justify-between items-center container mx-auto">
          <div className="w-full md:w-3/5 text-left flex flex-col">
            <h1 className="text-3xl font-bold">{profileData?.user_name}</h1>
            <p className="text-sm">Desenvolvedor Full Stack | Js | WP | Next.js | React | Node</p>
            <div className="flex gap-2 mt-2">
              <Link href={"https://www.linkedin.com/in/trindadebra/"} target='_blank'>
                <FaLinkedin className="text-black hover:text-gray-600" size={20} />
              </Link>
              <Link href={"https://github.com/TrindadeBRA/"} target='_blank'>
                <FaGithub className="text-black hover:text-gray-600" size={20} />
              </Link>
              <Link href={"https://api.whatsapp.com/send?phone=5511952498126"} target='_blank'>
                <FaWhatsapp className="text-black hover:text-gray-600" size={20} />
              </Link>
              <Link href={"https://lucastrindade.dev"} target='_blank'>
                <FaGlobe className="text-black hover:text-gray-600" size={20} />
              </Link>
              <Link href={"mailto:trindadebra@gmail.com"} target='_blank'>
                <FaEnvelope className="text-black hover:text-gray-600" size={20} />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-2/5 text-sm text-left mt-4 md:mt-0 md:text-right flex flex-col">
            <p>Mogi-Mirim, SP, Brasil</p>
            <Link href="https://api.whatsapp.com/send?phone=5511952498126" className="text-black hover:text-gray-600">+55 (11) 95249-8126</Link>
            <Link href="mailto:trindadebra@gmail.com" className="text-black hover:text-gray-600">trindadebra@gmail.com</Link>
          </div>
        </div>

        {/* Presentation */}
        <div id="presentation" className="flex justify-between items-center container mx-auto">
          <div className="text-left flex flex-col">
            <Link href="/#apresentacao" target="_blank" className="text-xl font-bold mb-4">Apresentação</Link>
            <div className="flex flex-col gap-y-2">
              {
                profileData?.user_presentation?.[0]?.plain_text
                  ?.split('\n')
                  .filter((paragraph: string) => paragraph.trim() !== '')
                  .map((paragraph: string, index: number) => (
                    <p key={index} className="text-sm">
                      {paragraph}
                    </p>
                  ))
              }
            </div>
          </div>
        </div>

        {/* Experience */}
        <div id="experience" className="flex justify-between items-center container mx-auto">
          <div className="text-left flex flex-col w-full">
            <Link href="/#experiencias" target="_blank" className="text-xl font-bold mb-4">Experiências</Link>
            <div className="flex flex-col gap-y-6">
              {experienceData.map((experience) => (
                <div key={experience.experience_id}>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <h3 className="text-base font-bold">{experience.experience_company_name}</h3>
                    <span className="hidden md:inline">-</span>
                    <p className="text-base">{experience.experience_position}</p>
                  </div>
                  <p className="text-xs font-bold">
                    {formatDate(experience.experience_date_start)} - {experience.experience_date_end ? formatDate(experience.experience_date_end) : 'Atual'}
                  </p>
                  <p className="text-sm mt-2">{experience.experience_about}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Education */}
        <div id="education" className="flex justify-between items-center container mx-auto">
          <div className="text-left flex flex-col w-full">
            <Link href="/#certificados" target="_blank" className="text-xl font-bold mb-4">Formação Acadêmica</Link>
            <div className="flex flex-col">
              {certificateData
                .filter(cert => cert.certificate_category === "Tecnólogo")
                .map((certificate: Certificate) => (
                  <div key={certificate.certificate_id} className="flex flex-col mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold">{certificate.certificate_name}</h3>
                      {certificate.certificate_instructors && (
                        <>
                          <span>-</span>
                          <p className="text-sm">{certificate.certificate_instructors}</p>
                        </>
                      )}
                    </div>
                    <p className="text-xs">
                      {new Date(`${certificate.certificate_date}T00:00:00`).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Courses */}
        <div id="courses" className="flex justify-between items-center container mx-auto">
          <div className="text-left flex flex-col w-full">
            <Link href="/#certificados" target="_blank" className="text-xl font-bold mb-4">Cursos e Certificações</Link>
            <div className="columns-2 gap-6">
              {certificateData
                .filter(cert => cert.certificate_category !== "Tecnólogo")
                .map((certificate: Certificate) => (
                  <div key={certificate.certificate_id} className="break-inside-avoid-column mb-1 text-sm border-b border-gray-200 pb-1">
                    <span className="font-medium">{certificate.certificate_name}</span>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      {certificate.certificate_instructors && (
                        <span>{certificate.certificate_instructors}</span>
                      )}
                      <span>
                        {new Date(`${certificate.certificate_date}T00:00:00`).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div id="skills" className="flex justify-between items-center container mx-auto">
          <div className="text-left flex flex-col w-full">
            <Link href="/#skills" target="_blank" className="text-xl font-bold">Habilidades</Link>
            <p className="text-sm mb-4">Tecnologias, ferramentas e frameworks com os quais possuo experiência profissional ou conhecimento através de estudos e projetos</p>
            <div className="rounded-lg">
              <div className="flex flex-wrap gap-2 justify-around">
                {Object.values(skillsData)
                  .sort((a: any, b: any) => a.skill_name.localeCompare(b.skill_name))
                  .map((skill: any, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center justify-between bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm font-medium">{skill.skill_name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="no-print fixed bottom-8 mx-auto left-0 right-0 w-fit md:mx-0 md:left-auto md:right-4 group flex items-center gap-3 bg-black text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-xl shadow-2xl animate-bounce"
      >
        <FaDownload size={20} className="group-hover:scale-110 transition-transform duration-300" />
        <span className="font-medium">Baixar em PDF</span>
      </button>

      <style jsx global>
        {`
          @media print {
              @page {
                margin: 0;
                size: A4;
              }

              .no-print, 
              .no-print * {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                overflow: hidden !important;
                position: absolute !important;
                left: -9999px !important;
              }

              /* Mantém os links clicáveis e visíveis */
              a {
                pointer-events: auto !important;
                cursor: pointer !important;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                text-decoration: none !important;
                color: inherit !important;
              }
              
              a[href]:after,
              a[href^="javascript:"]:after,
              a[href^="#"]:after {
                content: "" !important;
              }

              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 100%;
              }

              .keep-together {
                break-inside: avoid;
                page-break-inside: avoid;
              }
            }
        `}
      </style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    console.log('Revalidating cache at:', new Date().toISOString());
    const profileData = await getSectionProfile();
    const skillsData = await getSectionSkills();
    const certificateData = await getSectionCertificates();
    const experienceData = await getSectionExperiences();
    const personalProjectsData = await getSectionPersonalProjects();
    return {
      props: {
        profileData,
        skillsData,
        certificateData,
        experienceData,
        personalProjectsData
      },
      // revalidate every 30 minutes
      revalidate: 60 * 30,
    };
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return {
      props: {},
      // revalidate every 30 minutes
      revalidate: 60 * 30,
    };
  }
};
