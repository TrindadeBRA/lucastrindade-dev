import Certificates from "@/components/Certificates";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import Presentation from "@/components/Presentation";
import Skills from "@/components/Skills";
import { GetStaticProps } from "next";
import { getSectionProfile } from "./api/sectionprofile";
import { getSectionSkills } from "./api/sectionskills";


export default function Home({profileData, skillsData}:any) {
  // console.log(skillsData)
  return (
    <>
      <Header></Header>
      <HeroSection {...profileData} />
      <Presentation {...profileData} />
      <Skills {...skillsData} />
      <Certificates />
      <Experiences />
      <Footer></Footer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const profileData = await getSectionProfile();
  const skillsData = await getSectionSkills();
  return {
    props: {
      profileData,
      skillsData
    },
    revalidate: 60 * 24,
  };
};