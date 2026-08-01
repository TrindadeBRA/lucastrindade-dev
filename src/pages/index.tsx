import Certificates from "@/components/Certificates";
import Experiences from "@/components/Experiences";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSectionAnimated from "@/components/HeroSectionAnimated";
import Presentation from "@/components/Presentation";
import Skills from "@/components/Skills";
import PersonalProjects from "@/components/PersonalProjects";
import GsapInit from "@/components/GsapInit";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Profile } from "./api/sectionProfile";
import { Skill } from "./api/sectionSkills";
import { Certificate } from "./api/sectionCertificates";
import { Experience } from "./api/sectionsExperiences";
import { PersonalProject } from "./api/sectionsPersonalProjects";
import { fetchHomeData } from "@/lib/fetchHomeData";

export default function Home({
  profileData,
  skillsData,
  certificateData,
  experienceData,
  personalProjectsData,
}: {
  profileData: Profile;
  skillsData: Skill[];
  certificateData: Certificate[];
  experienceData: Experience[];
  personalProjectsData: PersonalProject[];
}) {
  return (
    <>
      <Head>
        <title>Lucas Trindade — Desenvolvedor Full Stack</title>
        <meta
          name="description"
          content="Desenvolvedor Full Stack com experiência em JavaScript, WordPress, Next.js, React e Node.js. Localizado em Mogi-Mirim, SP. Crio soluções digitais modernas, performáticas e com foco em produto."
        />
        <meta property="og:image" content="/images/ogimage.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
      </Head>
      <GsapInit />
      <Header />
      <main>
        <HeroSectionAnimated {...(profileData || ({} as Profile))} />
        <Presentation {...(profileData || ({} as Profile))} />
        <Experiences {...(experienceData || [])} />
        <Skills {...(skillsData || [])} />
        <Certificates {...(certificateData || [])} />
        <PersonalProjects {...(personalProjectsData || [])} />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  console.log("Revalidating cache at:", new Date().toISOString());
  const homeData = await fetchHomeData();

  return {
    props: homeData,
    revalidate: 60 * 30,
  };
};
