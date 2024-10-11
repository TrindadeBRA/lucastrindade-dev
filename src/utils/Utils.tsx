import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export function extractFileName(url: string): string {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const fileNameWithExtension = pathParts[pathParts.length - 1];

    return fileNameWithExtension.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export function sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, '_'); // Permite apenas letras, números, '.', '_', e '-'
}

export async function downloadImage(imageUrl: string, filename: string, folderPath: string): Promise<string> {
    const res = await fetch(imageUrl);

    // Verifica se a resposta foi bem-sucedida
    if (!res.ok) {
        throw new Error(`Failed to fetch image: ${res.statusText}`);
    }

    const buffer: Buffer = await res.buffer();

    // Resolve o caminho da pasta usando o parâmetro folderPath
    const imagesFolder = path.resolve(folderPath);

    // Cria a pasta se não existir
    if (!fs.existsSync(imagesFolder)) {
        fs.mkdirSync(imagesFolder, { recursive: true });
    }

    // Define o caminho do arquivo
    const filePath = path.resolve(imagesFolder, filename);

    // Escreve o arquivo no sistema
    fs.writeFileSync(filePath, new Uint8Array(buffer));

    // Retorna o caminho relativo da imagem
    return path.relative(process.cwd(), filePath);
}
