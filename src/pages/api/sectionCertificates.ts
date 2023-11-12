import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export interface Certificate {
  certificate_name: string;
  certificate_instructors: string;
  certificate_file: string;
  certificate_date: string;
  certificate_category: string;
  certificate_id: string;
}

export async function getSectionCertificates(): Promise<Certificate[]> {
  const response = await notion.databases.query({
    database_id: "c2703532b4c04badb1a75838223f0cf3",
  });

  const certificateResponse = response.results.map((certificate: any) => ({
    certificate_name: certificate.properties['certificate_name'].title[0].text.content,
    certificate_instructors: certificate.properties['certificate_instructors'].rich_text[0].text.content,
    certificate_file: certificate.properties['certificate_file'].files[0]?.file?.url,
    certificate_date: certificate.properties['certificate_date'].date.start,
    certificate_category: certificate.properties['certificate_category'].select.name,
    certificate_id: certificate.properties['certificate_id'].unique_id.number
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
  const certificate = await getSectionCertificates();
  res.status(200).json(certificate);
}