// robots.txt generado en build a partir de `site` (astro.config.ts).
// Las páginas internas (/propuesta) no salen en el build (astro.config.ts),
// así que no se nombran aquí: listarlas en robots.txt revelaría que existen.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap.xml', site).href;
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
