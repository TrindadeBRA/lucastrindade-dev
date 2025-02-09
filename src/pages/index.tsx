import Certificates from "@/components/Certificates";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import Presentation from "@/components/Presentation";
import Skills from "@/components/Skills";
import { GetStaticProps } from "next";
import { Profile, getSectionProfile } from "./api/sectionProfile";
import { Skill, getSectionSkills } from "./api/sectionSkills";
import { Certificate, getSectionCertificates } from "./api/sectionCertificates";
import { Experience, getSectionExperiences } from "./api/sectionsExperiences";

export default function Home({ profileData, skillsData, certificateData, experienceData }:
  { profileData: Profile, skillsData: Skill, certificateData: Certificate[], experienceData: Experience[]}) {
  return (
    <>
      <Header></Header>
      <HeroSection {...profileData} />
      <Presentation {...profileData} />
      <Skills {...skillsData} />
      <Certificates {...certificateData} />
      <Experiences {...experienceData}/>
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
    return {
      props: {
        profileData,
        skillsData,
        certificateData,
        experienceData
      },
      revalidate: 60 * 15,
    };
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return {
      props: {},
      revalidate: 60 * 15,
    };
  }
};