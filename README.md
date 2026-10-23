# Cleaning 4 You — Website

Landing page para **Cleaning 4 You LLC**, servicio de limpieza profesional en Arizona.
Está hecha con **Astro 5 + Tailwind CSS v4 + TypeScript** como sitio 100 % estático, con casi nada de JavaScript y Lighthouse 100 como objetivo.

> **Estado:** concepto de diseño con el **contenido aprobado** (`docs/referencias/contenido-aprobado/`). Las fotos son ilustrativas y los videos están pendientes. No es el sitio publicado del negocio.

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

> En Windows, usa siempre los scripts de npm (pasan por `scripts/astro.ts`): con la carpeta abierta como `c:` en minúscula, Tailwind v4 genera el build sin CSS.

## Estructura de la página

Solo las secciones del **contenido aprobado**, en el orden de las capturas de `docs/referencias/contenido-aprobado/`:

| # | Sección | Ancla | Ref. |
|---|---|---|---|
| 1 | Top bar + header sticky | — | 01-hero |
| 2 | Hero "A Cleaner Space. A Fresh Start." + card "Request a Free Quote" (ondas animadas) | `#home` | 01-hero |
| 3 | About "More Than Clean…" + 3 atributos | `#about` | 02-about |
| 4 | How it works (banda navy, 3 pasos) | — | 04-how-it-works |
| 5 | Services (5 cards; "Learn more" abre un diálogo) | `#services` | 03-servicios |
| 6 | Our Story "Built on Experience. Driven by Care." | — | 05-our-story |
| 7 | Who are we? / Mission / Vision / Philosophy | — | 12-folleto |
| 8 | Why choose us | — | 06-why-choose-us |
| 9 | Our Work: 3 videos (placeholder) + galería con filtros | `#our-work` | 07 y 08 |
| 10 | Our Commitment | — | 09-our-commitment |
| 11 | Get a quote: banner + formulario completo | `#quote` | 10-get-a-quote |
| 12 | CTA "Ready for a Cleaner, Fresher Space?" | `#contact` | 11-cta-y-footer |
| 13 | Footer | — | 11-cta-y-footer |

Además:
- **`/404`** ([src/pages/404.astro](src/pages/404.astro)), con el estilo del hero y accesos rápidos. Lleva `noindex`.
- **`/secciones-extra`** ([src/pages/secciones-extra.astro](src/pages/secciones-extra.astro)): revisión interna (noindex) de las **secciones extra no aprobadas** (tabs de servicios, fundador + cifras, testimonios, banda de ciudades, contacto en 2 columnas). Cada una lleva una franja "⚠ Sección extra · No aprobada" y ninguna aparece en la home. Ver [src/components/extras/README.md](src/components/extras/README.md).
- **`/propuesta`** ([src/pages/propuesta.astro](src/pages/propuesta.astro)): **propuesta de estructura** (noindex) para presentar al cliente. Mismo contenido aprobado en el orden en que decide un cliente: Hero → franja de confianza → Services → How it works → Our Work → Why + Commitment → Reseñas (pendientes) → About compacto → FAQ → Get a quote con el CTA final. Cada sección lleva una nota (qué duda responde y qué cambió) que se oculta con "Ocultar notas".

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
