import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export interface Skill {
  skill_name: string;
}

export async function getSectionSkills(): Promise<Skill[]> {
  const response = await notion.databases.query({
    database_id: "f956ac4be74a42f8a9171149c1c9bc5a",
  });

  const skills = response.results.map((skill: any) => ({
    skill_name: skill.properties['skill_name'].title[0]?.text.content,
  }));

  return skills.filter(skill => skill.skill_name);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = await getSectionSkills();
  res.status(200).json(profile);
}