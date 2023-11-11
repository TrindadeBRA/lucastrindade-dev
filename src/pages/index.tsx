import Certificates from "@/components/Certificates";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import Presentation from "@/components/Presentation";
import Skills from "@/components/Skills";
import { GetStaticProps } from "next";
import { Profile, getSectionProfile } from "./api/sectionprofile";
import { Skill, getSectionSkills } from "./api/sectionskills";
import { Certificate , getSectionCertificates } from "./api/sectioncertificates";


export default function Home({profileData, skillsData, certificateData}:
  { profileData: Profile[], skillsData: Skill[], certificateData: Certificate[]} ) {
  return (
    <>
      <Header></Header>
      <HeroSection {...profileData} />
      <Presentation {...profileData} />
      <Skills {...skillsData} />
      <Certificates {...certificateData} />
      <Experiences />
      <Footer></Footer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const profileData = await getSectionProfile();
  const skillsData = await getSectionSkills();
  const certificateData = await getSectionCertificates();
  return {
    props: {
      profileData,
      skillsData,
      certificateData
    },
    revalidate: 60 * 24,
  };
};