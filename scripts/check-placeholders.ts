// Avisa (sin fallar el build) si quedan placeholders o lorem ipsum en el HTML generado.
// Node ≥ 22.18 ejecuta TypeScript nativamente (type stripping), sin dependencias.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';

async function htmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(p);
    return p.endsWith('.html') ? [p] : [];
  }));
  return files.flat();
}

let total = 0;
for (const file of await htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  const placeholders = (html.match(/data-placeholder/g) ?? []).length;
  const lorem = (html.match(/lorem ipsum/gi) ?? []).length;
  if (placeholders || lorem) {
    console.warn(`\x1b[33m⚠ ${file}: ${placeholders} data-placeholder · ${lorem} "lorem ipsum"\x1b[0m`);
    total += placeholders + lorem;
  }
}
console.log(total
  ? '\x1b[33m⚠ Contenido placeholder pendiente: no publicar como sitio final.\x1b[0m'
  : '\x1b[32m✓ Sin placeholders.\x1b[0m');
