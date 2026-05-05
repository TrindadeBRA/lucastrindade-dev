import { GetStaticProps } from "next";
import { Profile, getSectionProfile } from "@/pages/api/sectionProfile";
import { Experience, getSectionExperiences } from "@/pages/api/sectionsExperiences";
import Head from "next/head";
import dynamic from "next/dynamic";

// Load the interactive panel only on the client — avoids all hydration mismatches
// from localStorage, Date, and interactive state.
const InterviewClient = dynamic(() => import("@/components/InterviewClient"), { ssr: false });

export default function Interview({
  profileData,
  experienceData,
}: {
  profileData: Profile;
  experienceData: Experience[];
}) {
  return (
    <>
      <Head>
        <title>Entrevista — Lucas Trindade</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <InterviewClient profileData={profileData} experienceData={experienceData} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const profileData = await getSectionProfile();
    const experienceData = await getSectionExperiences();
    return {
      props: { profileData, experienceData },
      revalidate: 60 * 30,
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return {
      props: { profileData: {}, experienceData: [] },
      revalidate: 60 * 30,
    };
  }
};
