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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lucastrindade.dev";
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData?.user_name || "Lucas Trindade",
    jobTitle: profileData?.user_title || "Desenvolvedor Fullstack Senior",
    description: profileData?.user_bio || "Desenvolvedor Fullstack Senior em SP, Brasil, aberto a remoto. Fundador da TrinityWeb. Experiência com Next.js, React, Node.js e liderança técnica.",
    url: baseUrl,
    image: profileData?.user_avatar_sync || `${baseUrl}/api/og`,
    sameAs: [
      "https://github.com/TrindadeBRA",
      "https://www.linkedin.com/in/trindadebra/",
      "https://api.whatsapp.com/send?phone=5511952498126"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR"
    },
    knowsAbout: skillsData?.map(skill => skill.skill_name).slice(0, 10) || [
      "Next.js", "React", "Node.js", "TypeScript", "JavaScript"
    ]
  };

  return (
    <>
      <Head>
        <title>Lucas Trindade — Desenvolvedor Fullstack Senior</title>
        <link rel="canonical" href={baseUrl} />
        <meta
          name="description"
          content="Desenvolvedor Fullstack Senior em SP, Brasil, aberto a remoto. Fundador da TrinityWeb. Experiência com Next.js, React, Node.js e liderança técnica."
        />
        <meta property="og:title" content="Lucas Trindade — Desenvolvedor Fullstack Senior" />
        <meta property="og:url" content={baseUrl} />
        <meta
          property="og:description"
          content="Desenvolvedor Fullstack Senior em SP, Brasil, aberto a remoto. Fundador da TrinityWeb. Experiência com Next.js, React, Node.js e liderança técnica."
        />
        <meta
          property="og:image"
          content={`${baseUrl}/api/og`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`${baseUrl}/api/og`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
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
  console.info('[ISR] Revalidando cache em:', new Date().toISOString());
  const homeData = await fetchHomeData();

  return {
    props: homeData,
    revalidate: 60 * 30,
  };
};
