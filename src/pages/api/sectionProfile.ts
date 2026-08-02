import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { syncNotionMedia } from './utils/NotionMediaSync';
import { env } from '@/lib/env';

const notion = new Client({ auth: env.notionToken });

export interface Profile {
  user_name: string;
  user_title: string;
  user_role: string;
  user_bio: string;
  user_avatar: string;
  user_avatar_sync: string;
  user_presentation: any;
}

/**
 * Busca dados do perfil do Notion
 * @throws {Error} Se houver erro na comunicação com o Notion
 */
export async function getSectionProfile(): Promise<Profile> {
  try {
    const response = await notion.databases.query({
      database_id: env.notionDb.profile,
    });

    if (response.results.length === 0) {
      throw new Error('Nenhum perfil encontrado no Notion');
    }

    const mappedResult = await Promise.all(response.results.map(async (user: any) => {
      // Extrai dados com validação
      const userName = user.properties?.['user_name']?.title?.[0]?.text?.content || 'Nome não definido';
      const userRole = user.properties?.['user_role']?.rich_text?.[0]?.text?.content || '';
      const userBio = user.properties?.['user_bio']?.rich_text?.[0]?.text?.content || '';
      const userTitle = user.properties?.['user_title']?.rich_text?.[0]?.text?.content || '';
      const avatarUrl = user.properties?.['user_avatar']?.files?.[0]?.file?.url;

      let avatarSyncResponse = avatarUrl;
      if (avatarUrl) {
        try {
          avatarSyncResponse = await syncNotionMedia(avatarUrl, 'profile');
        } catch (error) {
          console.warn('Aviso ao sincronizar avatar:', error);
          // Mantém URL original se sync falhar
        }
      }

      return {
        user_name: userName,
        user_role: userRole,
        user_bio: userBio,
        user_avatar: avatarUrl || '',
        user_avatar_sync: avatarSyncResponse || avatarUrl || '',
        user_presentation: user.properties?.['user_presentation']?.rich_text || [],
        user_title: userTitle,
      };
    }));

    return mappedResult[0];
  } catch (error) {
    console.error('[getSectionProfile] Erro ao buscar perfil:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const profile = await getSectionProfile();
    res.status(200).json(profile);
  } catch (error) {
    console.error('[API /sectionProfile] Erro:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar dados do perfil',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
