# Cleaning 4 You — Website

Landing page para **Cleaning 4 You LLC**, servicio de limpieza profesional en Arizona.
Está hecha con **Astro 5 + Tailwind CSS v4 + TypeScript** como sitio 100 % estático, con casi nada de JavaScript y Lighthouse 100 como objetivo.

> **Estado:** concepto de diseño. La mayoría de los textos son *lorem ipsum* y las fotos son ilustrativas. No es el sitio publicado del negocio.

---

## Requisitos

- Node.js **22.18+** (el script post-build `scripts/check-placeholders.ts` usa el soporte nativo de TypeScript de Node)
- npm 10+

## Inicio rápido

```bash
npm install
npm run dev       # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build estático en `dist/` |
| `npm run preview` | Sirve `dist/` localmente (úsalo para medir Lighthouse) |
| `npm run check` | Chequeo de tipos y diagnósticos de Astro |

## Estructura de la página

En orden, siguiendo el layout de referencia (tema *Moppers v2*) con la identidad de Cleaning 4 You:

| # | Sección | Ancla | Notas |
|---|---|---|---|
| 1 | Top bar | — | Teléfono, email, "Professional Cleaning in Arizona" |
| 2 | Header sticky | — | Logo, nav, CTA "Text for a quote" |
| 3 | **Hero** | `#home` | Overlay navy, **ondas SVG** y card "Book a Service" sobre la onda |
| 4 | About | `#about` | Texto a la izquierda; la card del hero sigue a la derecha |
| 5 | How it works | — | 3 pasos numerados |
| 6 | Services | `#services` | 5 cards (Residential, Commercial, Windows, Move In/Out, Post Construction) |
| 7 | Service details (tabs) | — | Paneles pre-renderizados que se alternan con `hidden` |
| 8 | Founder's message | — | Cita (placeholder) |
| 9 | Counters | — | 4 cifras (placeholder salvo "14 años") |
| 10 | Why choose us | — | 4 beneficios |
| 11 | Testimonials | — | Se mantiene, con contenido lorem hasta tener reseñas reales |
| 12 | Our Work | `#our-work` | Grid filtrable por tipo de servicio |
| 13 | Service Areas | `#service-areas` | Banda navy con chips de ciudades |
| 14 | Contact / Quote | `#contact` | Formulario que abre un borrador SMS |
| 15 | Footer | — | Marca, links, servicios, áreas |

## Estructura del proyecto

```
src/
  assets/        imágenes y logo (los optimiza astro:assets)
  components/
    ui/          componentes base del sistema de diseño
    icons/       SVG inline
    sections/    una sección de la página por archivo
  data/          site.ts (datos reales) · content.ts (textos lorem)
  layouts/       BaseLayout.astro
  pages/         index.astro
  scripts/       JS vanilla: nav, tabs, filtros, formulario SMS
  styles/        global.css (Tailwind v4 + tokens en @theme)
docs/
  DESIGN_SYSTEM.md
```

## Sistema de diseño

Colores, tipografía, espaciado, botones, inputs, cards, secciones y la anatomía del hero están en **[docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)**.

Paleta oficial (resumen):

| Token | Hex | Uso |
|---|---|---|
| `--c-primary` | `#173A5A` | Títulos, texto fuerte, bandas oscuras |
| `--c-accent` | `#D8B903` | CTA principal, eyebrows, numeración |
| `--c-deep` | `#225078` | CTA secundario, links, estados activos |
| `--c-sky` | `#7AAEDB` | Acentos y focus ring |
| `--c-pale` | `#D8EDFF` | Fondos suaves |
| `--c-soft` | `#F4FAFF` | Fondo de secciones alternas |
| `--c-gray` | `#E7EEF4` | Bordes y fondo de inputs |
| `--c-text` | `#4E6478` | Texto secundario |

## Performance

| Métrica | Objetivo |
|---|---|
| Lighthouse mobile (las 4 categorías) | 100 |
| LCP | < 1.8 s |
| CLS | 0 |
| JS total | < 8 KB gzip |

Cómo se logra: HTML estático, CSS de Tailwind purgado e inlined (~9 KB gzip), imágenes AVIF/WebP con tamaños fijos, fuentes self-hosted (solo latin) y precargadas, la imagen del hero con `fetchpriority="high"`, sin frameworks de UI en el cliente y ondas en SVG inline.

**Última medición** (Lighthouse 12 mobile, build servido con compresión, 3 corridas): Performance 97–99 · Accessibility 100 · Best Practices 100 · SEO 100 · LCP 1.7 s · CLS 0 · TBT 40–120 ms · peso total 151 KB. Para medir: `npm run build && npx serve dist` y Lighthouse sobre ese servidor (`astro preview` no comprime).

## Contenido y datos

- **Datos reales** (teléfono, email, servicios, ciudades) en `src/data/site.ts`. Si cambian, se editan solo ahí.
- **Textos** en `src/data/content.ts`. Hoy son lorem ipsum y se reemplazan cuando el cliente entregue el copy final.
- Los **placeholders** (testimonios, contadores, fotos de proyectos) llevan `data-placeholder`. `npm run build` avisa si quedan.

## Formulario

**Decidido: los formularios son maqueta.** No hay backend ni se envía nada. Al enviar, el formulario arma un borrador `sms:+16023963955?body=...` en el dispositivo del usuario. Si más adelante se quieren recibir leads, se integra un servicio (Formspree, Netlify Forms o un endpoint propio).

## Deploy

Es un sitio estático: sube `dist/` a Netlify, Vercel, Cloudflare Pages o GitHub Pages.

```bash
npm run build
# publicar la carpeta dist/
```

Recomendado: servir con `Cache-Control: public, max-age=31536000, immutable` para `/_astro/*` y compresión Brotli.

## Contacto del negocio

**Cleaning 4 You LLC** · (602) 396-3955 · Cleaning4youllc@gmail.com
Phoenix, Scottsdale, Tempe, Chandler, Gilbert, Fountain Hills, Cave Creek, Carefree, Payson, Maricopa y Casa Grande, AZ.
