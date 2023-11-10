import Certificates from "@/components/Certificates";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import Presentation from "@/components/Presentation";
import Skills from "@/components/Skills";
import { GetStaticProps } from "next";
import { getSectionProfile } from "./api/sectionprofile";


export default function Home(profile: any) {
  return (
    <>
      <Header></Header>
      <HeroSection profile={profile}></HeroSection>
      <Presentation></Presentation>
      <Skills></Skills>
      <Certificates></Certificates>
      <Experiences></Experiences>
      <Footer></Footer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSectionProfile();
  return {
    props: {
      posts,
    },
  };
};