import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { syncNotionMedia } from './utils/NotionMediaSync';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export interface PersonalProject {
  project_name: string;
  project_title: string;
  project_description: string;
  project_url: string;
  project_image: string;
  project_image_sync: string;
}

export async function getSectionPersonalProjects(): Promise<PersonalProject[]> {
  const response = await notion.databases.query({
    database_id: "198d45aa6ccd809a8221fc6e7c0aab56",
  });

  const personalProjects = await Promise.all(response.results.map(async (project: any) => {
    const projectImageUrl = project.properties['personal_project_image'].files?.[0]?.file?.url;

    let projectImageSyncResponse;
    if (projectImageUrl) {
      try {
        projectImageSyncResponse = await syncNotionMedia(projectImageUrl, 'personal_projects');
      } catch (error) {
        console.error('Erro ao sincronizar certificado:', error);
      }
    }

    return {
      project_name: project.properties["personal_project_name"].title?.[0]?.plain_text,
      project_title: project.properties["personal_project_title"].rich_text?.[0]?.plain_text,
      project_description: project.properties["personal_project_description"].rich_text?.[0]?.plain_text,
      project_url: project.properties['personal_project_url']?.url,
      project_image: projectImageUrl,
      project_image_sync: projectImageSyncResponse,
    };
  }));

  // console.log(personalProjects);
  return personalProjects;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const projects = await getSectionPersonalProjects();
  res.status(200).json(projects);
}
