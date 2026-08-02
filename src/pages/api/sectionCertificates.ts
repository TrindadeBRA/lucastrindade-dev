import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { syncNotionMedia } from './utils/NotionMediaSync';
import { env } from '@/lib/env';

const notion = new Client({ auth: env.notionToken });

export interface Certificate {
  certificate_name: string;
  certificate_instructors: string;
  certificate_file: string;
  certificate_file_sync: string;
  certificate_date: string;
  certificate_category: string;
  certificate_id: string;
}

export async function getSectionCertificates(): Promise<Certificate[]> {
  try {
    const response = await notion.databases.query({
      database_id: env.notionDb.certificates,
    });

    const certificateResponse = await Promise.all(response.results.map(async (certificate: any) => {
      const certificateName = certificate.properties?.['certificate_name']?.title?.[0]?.text?.content || '';
      const certificateInstructors = certificate.properties?.['certificate_instructors']?.rich_text?.[0]?.text?.content || '';
      const certificateFileUrl = certificate.properties?.['certificate_file']?.files?.[0]?.file?.url;
      const certificateDate = certificate.properties?.['certificate_date']?.date?.start;
      const certificateCategory = certificate.properties?.['certificate_category']?.select?.name || '';
      const certificateId = certificate.properties?.['certificate_id']?.unique_id?.number;

      let certificateFileSyncResponse = certificateFileUrl;
      if (certificateFileUrl) {
        try {
          certificateFileSyncResponse = await syncNotionMedia(certificateFileUrl, 'certificates');
        } catch (error) {
          console.warn('Aviso ao sincronizar certificado:', error);
        }
      }

      return {
        certificate_name: certificateName,
        certificate_instructors: certificateInstructors,
        certificate_file: certificateFileUrl || '',
        certificate_file_sync: certificateFileSyncResponse || certificateFileUrl || '',
        certificate_date: certificateDate || '',
        certificate_category: certificateCategory,
        certificate_id: certificateId?.toString() || '',
      };
    }));

  certificateResponse.sort((a, b) => {
    if (a.certificate_category === b.certificate_category) {
      return new Date(b.certificate_date).getTime() - new Date(a.certificate_date).getTime();
    } else {
      // Prioridade 0: Pós-Graduação
      if (a.certificate_category === 'Pós-Graduação') return -1;
      if (b.certificate_category === 'Pós-Graduação') return 1;
      
      // Prioridade 1: Tecnólogo
      if (a.certificate_category === 'Tecnólogo') return -1;
      if (b.certificate_category === 'Tecnólogo') return 1;
      
      // Para outras categorias (Horas e Eventos), ordenar por data
      return new Date(b.certificate_date).getTime() - new Date(a.certificate_date).getTime();
    }
  });

  return certificateResponse;
  } catch (error) {
    console.error('[getSectionCertificates] Erro ao buscar certificados:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const certificates = await getSectionCertificates();
    res.status(200).json(certificates);
  } catch (error) {
    console.error('[API /sectionCertificates] Erro:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar certificados',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}