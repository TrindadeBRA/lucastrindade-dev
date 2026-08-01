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
import { Profile, getSectionProfile } from "./api/sectionProfile";
import { Skill, getSectionSkills } from "./api/sectionSkills";
import { Certificate, getSectionCertificates } from "./api/sectionCertificates";
import { Experience, getSectionExperiences } from "./api/sectionsExperiences";
import { getSectionPersonalProjects, PersonalProject } from "./api/sectionsPersonalProjects";

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
        <PersonalProjects {...(personalProjectsData || [])} />
        <Presentation {...(profileData || ({} as Profile))} />
        <Experiences {...(experienceData || [])} />
        <Skills {...(skillsData || [])} />
        <Certificates {...(certificateData || [])} />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    console.log("Revalidating cache at:", new Date().toISOString());
    const [profileData, skillsData, certificateData, experienceData, personalProjectsData] =
      await Promise.all([
        getSectionProfile(),
        getSectionSkills(),
        getSectionCertificates(),
        getSectionExperiences(),
        getSectionPersonalProjects(),
      ]);

    return {
      props: {
        profileData,
        skillsData,
        certificateData,
        experienceData,
        personalProjectsData,
      },
      revalidate: 60 * 30,
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return {
      props: {
        profileData: null,
        skillsData: [],
        certificateData: [],
        experienceData: [],
        personalProjectsData: [],
      },
      revalidate: 60,
    };
  }
};
