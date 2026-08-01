import { getSectionProfile } from "@/pages/api/sectionProfile";
import { getSectionSkills } from "@/pages/api/sectionSkills";
import { getSectionCertificates } from "@/pages/api/sectionCertificates";
import { getSectionExperiences } from "@/pages/api/sectionsExperiences";
import { getSectionPersonalProjects } from "@/pages/api/sectionsPersonalProjects";
import { withMockHomeData, type HomeData } from "@/data/mockHome";

async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(`[notion] falha em ${label}:`, error);
    return fallback;
  }
}

/** Busca seções do Notion e completa com mock o que vier vazio/erro. */
export async function fetchHomeData(): Promise<HomeData> {
  const [profileData, skillsData, certificateData, experienceData, personalProjectsData] =
    await Promise.all([
      safe("profile", getSectionProfile, null),
      safe("skills", getSectionSkills, []),
      safe("certificates", getSectionCertificates, []),
      safe("experiences", getSectionExperiences, []),
      safe("projects", getSectionPersonalProjects, []),
    ]);

  return withMockHomeData({
    profileData,
    skillsData,
    certificateData,
    experienceData,
    personalProjectsData,
  });
}
