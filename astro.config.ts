import { rm } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import type { AstroIntegration } from 'astro';
import tailwindcss from '@tailwindcss/vite';

/**
 * Páginas internas de revisión: existen en `npm run dev` pero NUNCA salen en el build.
 * Se borran de dist/ al terminar, así no llegan a ningún deploy (producción ni previews).
 */
const INTERNAL_PAGES = ['propuesta'];

const internalPagesDevOnly = (): AstroIntegration => ({
  name: 'internal-pages-dev-only',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      for (const page of INTERNAL_PAGES) {
        await rm(new URL(`${page}/`, dir), { recursive: true, force: true });
        await rm(new URL(`${page}.html`, dir), { force: true });
      }
      logger.info(`Excluidas del build (solo dev): ${INTERNAL_PAGES.map((p) => `/${p}`).join(', ')}`);
    },
  },
});

export default defineConfig({
  site: 'https://cleaning4you-llc.com',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  prefetch: false,
  integrations: [internalPagesDevOnly()],
  vite: { plugins: [tailwindcss()] },
});
