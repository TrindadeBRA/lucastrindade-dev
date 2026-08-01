/**
 * Gera favicon, Apple touch, Android/PWA e ICO a partir do template SVG.
 *
 * Uso: node scripts/generate-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const templatePath = path.join(root, "public/icons/icon-template.svg");
const outDir = path.join(root, "public");
const iconsDir = path.join(outDir, "icons");

const PNG_SIZES = [
  { file: "favicon-16x16.png", size: 16, dir: outDir },
  { file: "favicon-32x32.png", size: 32, dir: outDir },
  { file: "apple-touch-icon.png", size: 180, dir: outDir },
  { file: "android-chrome-192x192.png", size: 192, dir: outDir },
  { file: "android-chrome-512x512.png", size: 512, dir: outDir },
  { file: "icon-192.png", size: 192, dir: iconsDir },
  { file: "icon-512.png", size: 512, dir: iconsDir },
];

/** Empacota PNGs em .ico (PNG-in-ICO, compatível com browsers modernos). */
function encodeIco(pngEntries) {
  const count = pngEntries.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + dirEntrySize * count;

  let offset = dirSize;
  const directories = [];
  for (const entry of pngEntries) {
    const size = entry.size;
    directories.push({
      width: size >= 256 ? 0 : size,
      height: size >= 256 ? 0 : size,
      bytes: entry.data.length,
      offset,
    });
    offset += entry.data.length;
  }

  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0); // reserved
  buf.writeUInt16LE(1, 2); // type icon
  buf.writeUInt16LE(count, 4);

  let dirPos = 6;
  for (const d of directories) {
    buf.writeUInt8(d.width, dirPos);
    buf.writeUInt8(d.height, dirPos + 1);
    buf.writeUInt8(0, dirPos + 2); // colors
    buf.writeUInt8(0, dirPos + 3); // reserved
    buf.writeUInt16LE(1, dirPos + 4); // planes
    buf.writeUInt16LE(32, dirPos + 6); // bit count
    buf.writeUInt32LE(d.bytes, dirPos + 8);
    buf.writeUInt32LE(d.offset, dirPos + 12);
    dirPos += 16;
  }

  let dataPos = dirSize;
  for (const entry of pngEntries) {
    entry.data.copy(buf, dataPos);
    dataPos += entry.data.length;
  }
  return buf;
}

async function renderPng(svg, size, { padded = false } = {}) {
  if (!padded) {
    return sharp(svg).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
  }

  // Maskable: conteúdo ~80% (safe zone)
  const inner = Math.round(size * 0.72);
  const icon = await sharp(svg).resize(inner, inner).png().toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 10, g: 10, b: 10, alpha: 1 },
    },
  })
    .composite([{ input: icon, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template não encontrado: ${templatePath}`);
  }

  fs.mkdirSync(iconsDir, { recursive: true });
  const svg = fs.readFileSync(templatePath);

  // favicon.svg (cópia do template)
  fs.copyFileSync(templatePath, path.join(outDir, "favicon.svg"));

  const rendered = [];
  for (const item of PNG_SIZES) {
    const data = await renderPng(svg, item.size);
    const dest = path.join(item.dir, item.file);
    fs.writeFileSync(dest, data);
    rendered.push({ file: dest, size: item.size, bytes: data.length });
    console.log(`✓ ${path.relative(root, dest)} (${item.size}x${item.size})`);
  }

  // Maskable 512
  const maskable = await renderPng(svg, 512, { padded: true });
  const maskablePath = path.join(iconsDir, "icon-maskable-512.png");
  fs.writeFileSync(maskablePath, maskable);
  console.log(`✓ ${path.relative(root, maskablePath)} (maskable)`);

  // ICO: 16 + 32 + 48
  const icoPngs = [];
  for (const size of [16, 32, 48]) {
    icoPngs.push({ size, data: await renderPng(svg, size) });
  }
  const ico = encodeIco(icoPngs);
  const icoPath = path.join(outDir, "favicon.ico");
  fs.writeFileSync(icoPath, ico);
  console.log(`✓ ${path.relative(root, icoPath)} (16/32/48)`);

  console.log("\nPronto. Atualize o Head se necessário e rode o site.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
