import Certificates from "@/components/Certificates";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import Presentation from "@/components/Presentation";
import Skills from "@/components/Skills";
import { GetStaticProps } from "next";
import { getSectionProfile } from "./api/sectionprofile";


export default function Home(profileData: any) {
  return (
    <>
      <Header></Header>
      <HeroSection profileData={profileData}></HeroSection>
      <Presentation></Presentation>
      <Skills></Skills>
      <Certificates></Certificates>
      <Experiences></Experiences>
      <Footer></Footer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const profileData = await getSectionProfile();
  return {
    props: {
      profileData,
    },
  };
};