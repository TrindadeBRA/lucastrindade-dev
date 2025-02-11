import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { cacheImage } from './utils/CacheImage';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export interface Certificate {
  certificate_name: string;
  certificate_instructors: string;
  certificate_file: string;
  certificate_file_sync: string | undefined;
  certificate_date: string;
  certificate_category: string;
  certificate_id: string;
}

export async function getSectionCertificates(): Promise<Certificate[]> {
  const response = await notion.databases.query({
    database_id: "c2703532b4c04badb1a75838223f0cf3",
  });

  const certificateResponse = await Promise.all(response.results.map(async (certificate: any) => {
    const certificateName = certificate.properties['certificate_name'].title[0]?.text.content;
    const certificateInstructors = certificate.properties['certificate_instructors'].rich_text[0]?.text.content || '';
    const certificateFileUrl = certificate.properties['certificate_file'].files[0]?.file?.url;

    let certificateFileSyncResponse = '';
    if (certificateFileUrl) {
      try {
        certificateFileSyncResponse = await cacheImage(certificateFileUrl, 'certificates');
      } catch (error) {
        console.error('Erro ao sincronizar certificado:', error);
      }
    }

    return {
      certificate_name: certificateName,
      certificate_instructors: certificateInstructors,
      certificate_file: certificateFileUrl,
      certificate_file_sync: certificateFileSyncResponse,
      certificate_date: certificate.properties['certificate_date'].date.start,
      certificate_category: certificate.properties['certificate_category'].select.name,
      certificate_id: certificate.properties['certificate_id'].unique_id.number,
    };
  }));

  certificateResponse.sort((a, b) => {
    if (a.certificate_category === b.certificate_category) {
      return new Date(b.certificate_date).getTime() - new Date(a.certificate_date).getTime();
    } else {
      return a.certificate_category === 'Tecnólogo' ? -1 : 1;
    }
  });

  return certificateResponse;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const certificates = await getSectionCertificates();
  res.status(200).json(certificates);
}