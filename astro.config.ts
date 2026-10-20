import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cleaning4you.example',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  prefetch: false,
  vite: { plugins: [tailwindcss()] },
});
