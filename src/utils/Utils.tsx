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
    return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function downloadImage(imageUrl: string, filename: string, folderPath: string): Promise<string> {
    const res = await fetch(imageUrl);

    if (!res.ok) {
        throw new Error(`Failed to fetch image: ${res.statusText}`);
    }

    const buffer: Buffer = await res.buffer();

    const imagesFolder = path.resolve(folderPath);

    if (!fs.existsSync(imagesFolder)) {
        fs.mkdirSync(imagesFolder, { recursive: true });
    }

    const filePath = path.resolve(imagesFolder, filename);

    fs.writeFileSync(filePath, new Uint8Array(buffer));

    return path.relative(process.cwd(), filePath);
}
