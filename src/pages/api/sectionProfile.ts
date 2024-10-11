import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

import { downloadImage, extractFileName } from '@/utils/Utils';

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

  const mappedResult = await Promise.all(response.results.map(async (user: any) => {
    const userName = user.properties['user_name'].title[0].text.content;
    const userRole = user.properties['user_role'].rich_text[0].text.content;
    const userBio = user.properties['user_bio'].rich_text[0].text.content;
    const avatarUrl = user.properties['user_avatar'].files[0]?.file?.url;

    let localAvatarPath = '';
    if (avatarUrl) {
      const sanitizedFileName = extractFileName(avatarUrl);
      const filename = `${userName.replace(/\s+/g, '_').toLowerCase()}_${sanitizedFileName}`;
      localAvatarPath = await downloadImage(avatarUrl, filename, './public/images/avatars');
    }

    return {
      user_name: userName,
      user_role: userRole,
      user_bio: userBio,
      user_avatar: localAvatarPath,
      user_avatar_url: avatarUrl,
      user_presentation: user.properties['user_presentation'].rich_text,
    };
  }));

  return mappedResult[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = await getSectionProfile();
  res.status(200).json(profile);
}
