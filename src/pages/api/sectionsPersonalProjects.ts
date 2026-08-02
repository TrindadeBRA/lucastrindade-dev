import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { syncNotionMedia } from './utils/NotionMediaSync';
import { env } from '@/lib/env';

const notion = new Client({ auth: env.notionToken });

export interface PersonalProject {
  project_name: string;
  project_title: string;
  project_description: string;
  project_url: string;
  project_image: string;
  project_image_sync: string;
  project_order: number;
}

export async function getSectionPersonalProjects(): Promise<PersonalProject[]> {
  try {
    const response = await notion.databases.query({
      database_id: env.notionDb.projects,
    });

    const personalProjects = await Promise.all(response.results.map(async (project: any) => {
      const projectImageUrl = project.properties?.['personal_project_image']?.files?.[0]?.file?.url;

      let projectImageSyncResponse = projectImageUrl;
      if (projectImageUrl) {
        try {
          projectImageSyncResponse = await syncNotionMedia(projectImageUrl, 'personal_projects');
        } catch (error) {
          console.warn('Aviso ao sincronizar imagem do projeto:', error);
        }
      }

      return {
        project_name: project.properties?.["personal_project_name"]?.title?.[0]?.plain_text || '',
        project_title: project.properties?.["personal_project_title"]?.rich_text?.[0]?.plain_text || '',
        project_description: project.properties?.["personal_project_description"]?.rich_text?.[0]?.plain_text || '',
        project_url: project.properties?.['personal_project_url']?.url || '',
        project_image: projectImageUrl || '',
        project_image_sync: projectImageSyncResponse || projectImageUrl || '',
        project_order: project.properties?.["personal_project_order"]?.number || 999999,
      };
    }));

    const compareProjects = (a: PersonalProject, b: PersonalProject): number => {
      return (a.project_order || 999999) - (b.project_order || 999999);
    };

    personalProjects.sort(compareProjects);

    return personalProjects;
  } catch (error) {
    console.error('[getSectionPersonalProjects] Erro ao buscar projetos:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projects = await getSectionPersonalProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error('[API /sectionsPersonalProjects] Erro:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar projetos pessoais',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
