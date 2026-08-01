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
        <title>Lucas Trindade — Full Stack Tech Lead</title>
        <meta
          name="description"
          content="Full Stack Tech Lead em SP, Brasil, aberto a remoto. Fundador da TrinityWeb. Experiência com Next.js, React, Node.js e liderança técnica."
        />
        <meta property="og:title" content="Lucas Trindade — Full Stack Tech Lead" />
        <meta
          property="og:description"
          content="Full Stack Tech Lead em SP, Brasil, aberto a remoto. Fundador da TrinityWeb. Experiência com Next.js, React, Node.js e liderança técnica."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || "https://lucastrindade.dev"}/api/og`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || "https://lucastrindade.dev"}/api/og`}
        />
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
