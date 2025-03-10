import Certificates from "@/components/Certificates";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSectionAnimated from "@/components/HeroSectionAnimated";
import Presentation from "@/components/Presentation";
import Skills from "@/components/Skills";
import { GetStaticProps } from "next";
import { Profile, getSectionProfile } from "./api/sectionProfile";
import { Skill, getSectionSkills } from "./api/sectionSkills";
import { Certificate, getSectionCertificates } from "./api/sectionCertificates";
import { Experience, getSectionExperiences } from "./api/sectionsExperiences";
import PersonalProjects from "@/components/PersonalProjects";
import { getSectionPersonalProjects, PersonalProject } from "./api/sectionsPersonalProjects";
import AOS_Init from "@/components/AOS_Init";
import InfoBanner from "@/components/InfoBanner";


import Head from "next/head";

export default function Home({ profileData, skillsData, certificateData, experienceData, personalProjectsData }:
  { profileData: Profile, skillsData: Skill, certificateData: Certificate[], experienceData: Experience[], personalProjectsData: PersonalProject[]}) {
  return (
    <>
      <Head>
        <title>Lucas Trindade - Desenvolvedor Full Stack</title>
        <meta name="description" content="Desenvolvedor Full Stack com experiência em JavaScript, WordPress, Next.js, React e Node.js. Localizado em Santo André, SP, Brasil, sou apaixonado por criar soluções digitais inovadoras e funcionais. Desde 2017, tenho trabalhado em projetos que vão desde plataformas de cursos até websites personalizados, sempre buscando entregar código limpo e eficiente. Estou em constante evolução, acompanhando as tendências do desenvolvimento web e aplicando as melhores práticas em cada projeto. Entre em contato para discutir tecnologia ou explorar novas ideias!" />
        <meta property="og:image" content="/images/ogimage.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
      </Head>
      <AOS_Init />
      <InfoBanner />
      <Header></Header>
      <HeroSectionAnimated {...profileData} />
      <Presentation {...profileData} />
      <Skills {...skillsData} />
      <Certificates {...certificateData} />
      <Experiences {...experienceData}/>
      <PersonalProjects {...personalProjectsData}/>
      <Footer></Footer>
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