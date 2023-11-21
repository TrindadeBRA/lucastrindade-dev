import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
export interface Experience {
  experience_company_name: string;
  experience_id: string;
  experience_company_avatar: string;
  experience_company_avatar_url: string;
  experience_company_website: string;
  experience_position: string;
  experience_date_start: string;
  experience_date_end: string;
  experience_about: string;
  experience_location: string;
  experience_operating_model: string;
}

export async function getSectionExperiences(): Promise<Experience[]> {
  const response = await notion.databases.query({
    database_id: "88d34a6ac72a49f6a1ba4c14f73b63b4",
  });

  const experiences: Experience[] = response.results.map((experience: any) => ({
    experience_id: experience.properties['experience_id'].unique_id.number,
    experience_company_name: experience.properties["experience_company_name"].title[0].plain_text,
    experience_company_avatar: experience.properties["experience_company_avatar"].files[0]?.file?.url,
    experience_company_avatar_url: experience.properties["experience_company_avatar_url"].url,
    experience_company_website: experience.properties["experience_company_website"].url,
    experience_position: experience.properties["experience_position"].rich_text[0].text.content,
    experience_date_start: experience.properties["experience_date"].date?.start,
    experience_date_end: experience.properties["experience_date"].date?.end,
    experience_about: experience.properties["experience_about"].rich_text[0].text.content,
    experience_location: experience.properties["experience_location"].rich_text[0].text.content,
    experience_operating_model: experience.properties["experience_operating_model"].select.name,
  }));

  const compareExperiences = (a: Experience, b: Experience): number => {
    // Coloca as empresas com experience_date_end como null no topo
    if (a.experience_date_end === null && b.experience_date_end !== null) {
      return -1;
    } else if (a.experience_date_end !== null && b.experience_date_end === null) {
      return 1;
    } else {
      // Ordena por data de forma decrescente
      const dateA = new Date(a.experience_date_end || a.experience_date_start).getTime();
      const dateB = new Date(b.experience_date_end || b.experience_date_start).getTime();
      return dateB - dateA;
    }
  };
  experiences.sort(compareExperiences);
  return experiences;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = await getSectionExperiences();
  res.status(200).json(profile);
}