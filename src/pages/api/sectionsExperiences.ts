import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export interface Experience {
  experience_company_name: string;
  experience_id: string;
}

export async function getSectionExperiences(): Promise<Experience[]> {
  const response = await notion.databases.query({
    database_id: "88d34a6ac72a49f6a1ba4c14f73b63b4",
  });

  //TODO Acabar de buscar os dados da tabela e tipar

  return response.results.map((experience: any) => ({
    experience_company_name: experience.properties["experience_company_name"].title[0].plain_text,
    experience_id: experience.properties['experience_id'].unique_id.number

  }));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = await getSectionExperiences();
  res.status(200).json(profile);
}