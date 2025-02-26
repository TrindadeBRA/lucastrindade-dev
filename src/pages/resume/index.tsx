import { GetStaticProps } from "next";
import { Profile, getSectionProfile } from "@/pages/api/sectionProfile";
import { Skill, getSectionSkills } from "@/pages/api/sectionSkills";
import { Certificate, getSectionCertificates } from "@/pages/api/sectionCertificates";
import { Experience, getSectionExperiences } from "@/pages/api/sectionsExperiences";
import { getSectionPersonalProjects, PersonalProject } from "@/pages/api/sectionsPersonalProjects";
import Link from "next/link";
import { FaDownload, FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaWhatsapp } from "react-icons/fa";

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


  console.log(profileData?.user_presentation?.[0]?.plain_text);

  return (
    <>
      <div id="resume-content" className="bg-white text-black flex flex-col py-4 gap-y-8">

        {/* Header */}
        <div id="header" className="flex justify-between items-center container mx-auto">
          <div className="w-3/5 text-left flex flex-col">
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
          <div className="w-2/5 text-sm text-right flex flex-col">
            <p>Santo André, SP, Brasil</p>
            <Link href="https://api.whatsapp.com/send?phone=5511952498126" className="text-black hover:text-gray-600">+55 (11) 95249-8126</Link>
            <Link href="mailto:trindadebra@gmail.com" className="text-black hover:text-gray-600">trindadebra@gmail.com</Link>
          </div>
        </div>

        {/* Presentation */}
        <div id="presentation" className="flex justify-between items-center container mx-auto">
          <div className="text-left flex flex-col">
            <h2 className="text-xl font-bold mb-4">Apresentação</h2>
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
          <div className="text-left flex flex-col">
            <h2 className="text-xl font-bold mb-4">Experiências</h2>
            <div className="flex flex-col gap-y-6">
              {experienceData.map((experience) => (
                <div key={experience.experience_id}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold">{experience.experience_company_name}</h3>
                    -
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

      </div>

      <button
        onClick={handleDownload}
        className="no-print fixed bottom-8 right-8 group flex items-center gap-3 bg-black text-white px-6 py-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-xl"
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
                border-top: 5px solid black;
              }

              .no-print {
                display: none !important;
              }

              /* Mantém os links clicáveis e visíveis */
              a {
                pointer-events: auto !important;
                cursor: pointer !important;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
              }
              
              a[href]:after {
                content: none !important;
              }

              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                margin: 0;
              }

              .keep-together {
                break-inside: avoid;
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
