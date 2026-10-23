# CLAUDE.md — Cleaning 4 You (landing en Astro)

Guía para cualquier agente o dev que trabaje en este repo. Léela completa antes de tocar código.

## Qué es

Landing de una sola página para **Cleaning 4 You LLC**, empresa de limpieza profesional en Arizona.
- **Referencia de layout y estructura:** el tema *Moppers v2* (slashcreative.co/themes/moppers-version-2).
  El **hero tiene que replicar su estructura**: overlay en degradado sobre la foto, ondas SVG en el borde inferior y la card "Book a Service" a la derecha, montada sobre la onda y metida en la sección siguiente.
- **Identidad:** la de Cleaning 4 You (logo de techo dorado con gota azul y la paleta oficial). **Nunca** uses colores, logos, fotos ni textos de Moppers. Solo tomamos de ahí el layout.
- **Contenido APROBADO:** las 12 capturas de [docs/referencias/contenido-aprobado/](docs/referencias/contenido-aprobado/) definen **qué secciones van y con qué textos**. El copy está literal en `src/data/content.ts` (sin lorem). Los datos del negocio (teléfono, email, servicios, ciudades) salen **solo** de `src/data/site.ts`.
- **Secciones EXTRA (no aprobadas):** las que no están en esas capturas viven aparte en `src/components/extras/` (textos en `src/data/content-extras.ts`), **no se importan en la home** y se revisan en `/secciones-extra`, marcadas con `ExtraMarker`. Ver `src/components/extras/README.md`. Nunca importes un componente de `extras/` en `index.astro` sin aprobación.
- **Propuesta de estructura (no aprobada):** `/propuesta` reordena el contenido aprobado según las dudas del cliente (12 → 10 secciones, con reseñas y FAQ) y marca cada sección con una nota (`ProposalNote`). Componentes nuevos en `src/components/propuesta/`, textos nuevos en `src/data/content-propuesta.ts`. **La home no cambia** hasta que el cliente apruebe la propuesta.
- **Sistema de diseño:** [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) es la fuente de verdad visual. Si algo no está ahí, primero se agrega al documento y después se implementa.
- **Look aprobado:** las capturas de [docs/referencias/](docs/referencias/) (demo anterior) y las de `contenido-aprobado/` definen el estilo de cada sección. Su tabla de lectura está en `DESIGN_SYSTEM.md` §6. El hero no sigue esas capturas: sigue la estructura de Moppers.
- **Decisiones cerradas:** los formularios son **maqueta**: sin backend, arman un borrador `sms:` (mobile) o muestran el mensaje para copiar (escritorio). Los testimonios pasaron a **extra** porque no aparecen en el contenido aprobado.

## Stack (no cambiar sin preguntar)

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Astro 5.18**, `output: 'static'` | HTML puro y 0 KB de JS por defecto |
| Estilos | **Tailwind CSS v4** (`@tailwindcss/vite`), con los tokens en `@theme` dentro de `src/styles/global.css` | Utilidades purgadas, sin runtime; el CSS final va inlined (~9 KB gzip) |
| Lenguaje | **TypeScript `strict` en todo**: componentes, scripts de cliente (`src/scripts/*.ts`), `astro.config.ts` y scripts de Node (`scripts/*.ts`) | Nada de `.js`/`.mjs` |
| JS en cliente | `<script>` de Astro en TS (se empaqueta y se difiere solo) | Sin React/Vue/Svelte: ninguna interacción lo justifica |
| Imágenes | `astro:assets` (`<Image>` / `<Picture>`) → AVIF/WebP con `width`/`height` | LCP rápido y CLS 0 |
| Fuentes | `@fontsource-variable/manrope` y `@fontsource-variable/dm-sans`, self-hosted, solo subset latin | Sin pedir nada a Google Fonts |
| Iconos | SVG inline: `src/components/icons/icons.ts` (paths) + `Icon.astro` | Sin icon fonts ni librerías |
| Paquetes | `npm` (scripts de instalación de `esbuild` y `sharp` aprobados en `allowScripts`) | |

**Prohibido sin aprobación explícita:** frameworks de UI, plugins de Tailwind, jQuery, librerías de sliders/carruseles, de animación (GSAP, AOS), Google Fonts por CDN, iframes de terceros, analytics pesados.

## Presupuesto de performance (es un requisito, no una meta)

| Métrica | Límite |
|---|---|
| Lighthouse (mobile): Performance / A11y / Best Practices / SEO | **100 / 100 / 100 / 100** |
| LCP (4G lenta, mobile) | < 1.8 s |
| CLS | 0 |
| TBT | < 50 ms |
| JS total enviado | < 8 KB gzip |
| CSS total | < 25 KB gzip, inlined (`build.inlineStylesheets: 'always'`) |
| Imagen del hero | < 120 KB AVIF a 1600 px |
| Fuentes | máx. 2 familias variables, `font-display: swap`, solo subset `latin` |

Reglas concretas:
1. La imagen del hero (LCP) va con `loading="eager"` y `fetchpriority="high"` y **no** es `background-image` de CSS. Es un `<Picture>` absoluto detrás del overlay.
2. El resto de imágenes van con `loading="lazy"` y `decoding="async"`, y siempre con `width`/`height` o `aspect-ratio`.
3. Precarga solo la fuente de títulos (`<link rel="preload" as="font" crossorigin>`).
4. Las animaciones se hacen solo con `transform`/`opacity` y se desactivan con `@media (prefers-reduced-motion: reduce)`.
5. Las ondas del hero son **SVG inline** y no imágenes.
6. Antes de dar algo por terminado: `npm run build` y Lighthouse mobile **sobre un servidor con compresión** (`npx serve dist`). `astro preview` no comprime y empeora FCP/TBT. En Windows, Chrome headless mete mucho ruido en Speed Index (el first paint observado varía entre ~0.5 y 2.5 s con el mismo build): corre al menos 3 veces y compara LCP, CLS y TBT, que son estables. La medición definitiva se hace con PageSpeed Insights sobre el deploy real.

## Estructura

```
src/
  assets/
    images/              # fotos (las procesa astro:assets). Hoy son placeholders.
    brand/               # logo-full.svg, logo-mark.svg
  components/
    ui/                  # Button, Eyebrow, SectionHeading, Field, Logo
    icons/               # Icon*.astro (SVG inline, stroke=currentColor)
    sections/            # APROBADAS (orden de la home): TopBar, Header, Hero (+BookingCard), About,
                         # HowItWorks, Services, OurStory, Mission, WhyUs, OurWork, Commitment,
                         # QuoteSection, CtaBand, Footer · utilidades: MobileCta
    extras/              # ⚠️ NO APROBADAS: ServiceTabs, Founder, Testimonials, ServiceAreas, Contact
                         # + ExtraMarker (franja de aviso) + README.md
    propuesta/           # ⚠️ PROPUESTA: ProposalNote, TrustStrip, WhyCommitment, ReviewsSlot,
                         # AboutCompact, Faq (solo los usa /propuesta)
  data/
    site.ts              # datos REALES: teléfono, email, ciudades, servicios, nav
    content.ts           # copy APROBADO, literal de las capturas (una const por sección, con su ref.)
    content-extras.ts    # ⚠️ textos lorem de las secciones extra (no aprobadas)
    content-propuesta.ts # ⚠️ textos nuevos de /propuesta (FAQ, franja de confianza, notas)
  layouts/
    BaseLayout.astro     # <head>, SEO, fuentes, skip-link, JSON-LD LocalBusiness
  pages/
    index.astro          # solo compone secciones, sin lógica ni estilos
    404.astro            # página 404 (noindex): franja navy con ondas + accesos rápidos
    secciones-extra.astro # revisión interna (noindex): secciones extra marcadas como NO APROBADAS
    propuesta.astro      # propuesta de estructura (noindex) con notas por sección
  scripts/
    sms-form.ts          # lógica compartida de los formularios maqueta
    quote-links.ts       # links a #quote (preseleccionan servicio) y sms: en escritorio → formulario
                         # (nav, tabs, filtros y barra mobile viven en el <script> de su componente)
  styles/
    global.css           # @import "tailwindcss" + @theme (tokens) + @utility propias + base
scripts/
  astro.ts               # wrapper del CLI de Astro: normaliza `c:` → `C:` en Windows (ver Comandos)
  check-placeholders.ts  # post-build: avisa si quedan lorem/placeholders y FALLA si una página salió sin CSS
docs/
  DESIGN_SYSTEM.md
  referencias/           # capturas del demo anterior (look aprobado)
```

## Convenciones de código

- **Componentes:** PascalCase, uno por archivo, `interface Props` tipada arriba del frontmatter.
- **Estilos = utilidades de Tailwind** en el markup. No hay bloques `<style>` en componentes. La única excepción es el `@font-face` inline del layout.
- **Tokens:** colores, tipografía, radios, sombras y breakpoints se definen en `@theme` (`global.css`) y se usan como utilidades: `bg-primary`, `text-accent`, `text-h2`, `shadow-lg`, `rounded-lg`. Nunca uses hex sueltos (`bg-[#173A5A]`) ni colores de la paleta default de Tailwind (`blue-500`). Si falta un token, agrégalo a `@theme` **y** a `DESIGN_SYSTEM.md`.
- **Clases literales:** Tailwind solo detecta clases escritas completas en el código. Nunca las armes con template strings (`` `before:${x}` ``). Para variantes usa un `Record<Variant, string>` con strings completos (ver `Button.astro`) y `class:list`.
- **Abstracción:** la repetición de clases se resuelve con **componentes** (`Button`, `Field`, `Eyebrow`, `SectionHeading`) y no con `@apply`. `@apply` solo se usa en `@layer base`.
- **Utilidades propias** (`@utility` en `global.css`): `container-site`, `section` (padding vertical + `scroll-margin-top`), `no-scrollbar` y `select-chevron`.
- **Barras invertidas en atributos .astro:** Astro las elimina. `pattern="\d{5}"` se renderiza como `d{5}` (este bug rompió la validación del ZIP). Usa clases de caracteres sin escapes: `pattern="[0-9]{5}"`.
- **Links al formulario:** el formulario de cotización es `#quote-form` (sección `#quote`). Los links a `#quote` con `data-service` preseleccionan el servicio. Los `sms:` en escritorio no abren nada, así que `src/scripts/quote-links.ts` los lleva al formulario.
- **Diálogos:** `ui/Dialog.astro` (`<dialog>` nativo). Se abren con `data-dialog-open="<id>"`; los links internos con `data-dialog-close` cierran el diálogo antes de navegar.
- **Páginas que no son la home:** los links a secciones usan `anchor("#x", Astro.url.pathname)` de `site.ts` (`#x` en la home, `/#x` en el resto). `BaseLayout` acepta `noindex`.
- **Foco:** las secciones oscuras llevan la clase `on-dark` (foco sky) y las cards blancas dentro de ellas, `on-light` (foco deep).
- **Formularios:** cada campo validable recibe `error="..."` (causa + cómo corregirlo, en `formErrors` de `content.ts`) y el formulario incluye `<FormResult />` para escritorio.
- **Estado desde JS:** el JS cambia atributos (`hidden`, `aria-selected`, `aria-pressed`, `aria-expanded`, `data-open`, `data-visible`) y Tailwind los estiliza con variantes (`aria-selected:bg-primary`, `data-[open]:block`). El JS no toca clases.
- **Datos:** ningún componente escribe a mano el teléfono, email o lista de servicios. Todo se importa de `src/data/site.ts`.
- **Templates:** nunca concatenes strings con placeholders tipo `{title}`. Usa interpolación de Astro en build. Para contenido que cambia en cliente (tabs), renderiza **todos los paneles en el HTML** y alterna `hidden`. Así no hay JS que pueda dejar `{EYEBROW}` en pantalla (fue un bug del demo anterior).
- **Progressive enhancement:** todo se tiene que poder usar sin JS. Los tabs muestran el primer panel; los filtros muestran todo; el formulario hace fallback a un `<a href="sms:">`.
- **Anclas:** cada sección con `id` lleva `scroll-margin-top: var(--header-h)`. Todo link del nav tiene que apuntar a una sección que exista.
- **Commits:** en español, imperativo y corto (`Agrega sección Service Areas`).

## Contenido: reglas de honestidad

Es un concepto para un negocio real. Para no publicar datos falsos:
- Testimonios, contadores, logos de clientes y fotos de "proyectos" son **placeholders**. Cada uno lleva `data-placeholder` en el HTML y un comentario `<!-- PLACEHOLDER: ... -->`.
- **No inventes** precios, premios, certificaciones, años de fundación, reseñas con nombre ni ratings. Los únicos datos confirmados son **14 años de experiencia**, el teléfono **(602) 396-3955**, el email **Cleaning4youllc@gmail.com** y las ciudades de `site.ts`.
- El formulario **no envía nada a un servidor**: arma un borrador `sms:+16023963955?body=...`.
- El build de producción (`npm run build`) avisa con un warning si quedan `data-placeholder` (script `scripts/check-placeholders.ts`).

## Accesibilidad (mínimos)

- Contraste AA. **Nunca uses texto blanco sobre amarillo** (`--c-accent`). Sobre amarillo el texto va en `--c-primary`.
- Un solo `<h1>` y jerarquía de headings sin saltos.
- Focus visible con `:focus-visible` y outline de 3 px `--c-sky`.
- Tabs con `role="tablist"`, `tab` y `tabpanel`, `aria-selected` y navegación con flechas.
- Menú mobile con `aria-expanded` y `aria-controls`; cierra con `Esc`.
- Labels reales en todos los inputs (nada de placeholder-as-label).
- Skip-link "Skip to content" como primer elemento del `<body>`.

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ para correr Lighthouse
npm run check      # astro check (tipos y diagnósticos)
```

**Windows:** los scripts de npm pasan por `scripts/astro.ts`. Si la terminal abre el proyecto como `c:...` (minúscula, típico de VS Code), Tailwind v4 genera el build **sin CSS**; el wrapper lo evita. No llames `npx astro build` directo. Si igual pasa, `check-placeholders.ts` hace fallar el build.

## Antes de cambiar algo grande

Pregunta antes de agregar una dependencia, una página nueva, un framework de UI, un backend para el formulario, o de cambiar la paleta, las fuentes o el layout del hero.
