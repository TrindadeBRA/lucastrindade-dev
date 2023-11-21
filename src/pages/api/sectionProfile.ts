import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export interface Profile {
  user_name: string;
  user_role: string;
  user_bio: string;
  user_avatar: string;
  user_avatar_url: string;
  user_presentation: any;
}

export async function getSectionProfile(): Promise<Profile> {
  const response = await notion.databases.query({
    database_id: "18c52f2be7fa439c8049679e724ae7f3",
  });
    
  const mappedResult = response.results.map((user: any) => ({
    user_name: user.properties['user_name'].title[0].text.content,
    user_role: user.properties['user_role'].rich_text[0].text.content,
    user_bio: user.properties['user_bio'].rich_text[0].text.content,
    user_avatar: user.properties['user_avatar'].files[0]?.file?.url,
    user_avatar_url: user.properties['user_avatar_url'].url,
    user_presentation: user.properties['user_presentation'].rich_text,
  }));

  return mappedResult[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = await getSectionProfile();
  res.status(200).json(profile);
}