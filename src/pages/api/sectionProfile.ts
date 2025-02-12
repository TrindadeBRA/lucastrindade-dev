import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { cacheImage } from './utils/CacheImage';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export interface Profile {
  user_name: string;
  user_role: string;
  user_bio: string;
  user_avatar: string;
  user_avatar_sync: string;
  user_presentation: any;
}

export async function getSectionProfile(): Promise<Profile> {
  const response = await notion.databases.query({
    database_id: "18c52f2be7fa439c8049679e724ae7f3",
  });

  const mappedResult = await Promise.all(response.results.map(async (user: any) => {
    const userName = user.properties['user_name'].title[0]?.text.content;
    const userRole = user.properties['user_role'].rich_text[0]?.text.content;
    const userBio = user.properties['user_bio'].rich_text[0]?.text.content;
    const avatarUrl = user.properties['user_avatar'].files[0]?.file?.url;

    let avatarSyncResponse;
    if (avatarUrl) {
      try {
        avatarSyncResponse = await cacheImage(avatarUrl, 'profile');
      } catch (error) {
        console.error('Erro ao sincronizar avatar:', error);
      }
    }

    return {
      user_name: userName,
      user_role: userRole,
      user_bio: userBio,
      user_avatar: avatarUrl,
      user_avatar_sync: avatarSyncResponse ?? avatarUrl,
      user_presentation: user.properties['user_presentation'].rich_text,
    };
  }));

  return mappedResult[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = await getSectionProfile();
  res.status(200).json(profile);
}
