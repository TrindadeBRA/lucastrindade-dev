import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

const CACHE_DIR = path.join(process.cwd(), 'public/images-cache');

// Função para garantir que o diretório de cache e suas subpastas existam
async function ensureCacheDirExists(folder: string) {
  const dirPath = path.join(CACHE_DIR, folder);
  try {
    await fsPromises.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error('Erro ao criar diretório de cache:', error);
  }
}

export async function cacheImage(url: string, folder: string): Promise<string> {
  await ensureCacheDirExists(folder); // Garantindo que o diretório e subpasta existam

  try {
    const filename = path.basename(new URL(url).pathname);
    const filePath = path.join(CACHE_DIR, folder, filename); // Incluindo a pasta no caminho
    const localUrl = `/images-cache/${folder}/${filename}`;

    // Verificando se a imagem já está no cache
    if (!fs.existsSync(filePath)) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar a imagem: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      await fsPromises.writeFile(filePath, Buffer.from(buffer)); // Usando fs.promises
      console.log('Imagem salva no cache:', filePath);
    }

    return localUrl;
  } catch (error) {
    console.error('Erro ao salvar a imagem:', error);
    return '';
  }
}