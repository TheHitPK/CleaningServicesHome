# Cleaning 4 You — Sistema de diseño

> Fuente de verdad visual del sitio. Todo componente tiene que poder justificarse con algo de este documento.
> Layout de referencia: tema *Moppers v2*. Identidad: Cleaning 4 You.
> Implementación: **Tailwind CSS v4**. Los tokens viven en `@theme` dentro de `src/styles/global.css` y generan utilidades (ver §8). Los componentes están en `src/components/ui/*`.
> Los snippets CSS de este documento son la **especificación de valores**. En el código se expresan como utilidades de Tailwind.

---

## 0. Principios

1. **Limpio como el servicio.** Mucho aire, pocos elementos por pantalla y un solo CTA dominante por sección.
2. **Amarillo = acción.** `--c-accent` se usa solo en CTA primarios, eyebrows y numeración, nunca como fondo de un bloque grande.
3. **Navy = confianza.** Títulos, bandas oscuras y footer.
4. **Rápido por diseño.** Cada adorno (ondas, puntos, sombras) es CSS o SVG inline, nunca una imagen.
5. **Honesto.** Lo que es placeholder se nota en el código (`data-placeholder`) y nunca se presenta como real.

---

## 1. Tokens

### 1.1 Color

Las tres capas: **primitivos** (hex de la marca) → **semánticos** (qué significan) → **componente** (dónde se usan).

```css
/* Especificación de valores. En código: @theme en src/styles/global.css (ver §8) */
:root {
  /* — Primitivos de marca (guía oficial Cleaning 4 You) — */
  --c-primary: #173A5A;   /* Primary Blue */
  --c-accent:  #D8B903;   /* Accent Yellow */
  --c-sky:     #7AAEDB;   /* Light Blue */
  --c-deep:    #225078;   /* Deep Blue */
  --c-soft:    #F4FAFF;   /* Soft White */
  --c-pale:    #D8EDFF;   /* Pale Blue */
  --c-gray:    #E7EEF4;   /* Cool Gray */
  --c-text:    #4E6478;   /* Text Gray */
  --c-white:   #FFFFFF;

  /* — Derivados — */
  --c-primary-900: #0F2A44;  /* footer, fondo del overlay */
  --c-accent-600:  #BFA302;  /* hover del CTA amarillo */
  --c-accent-100:  #FBF3C4;  /* fondo de icon badges */
  --c-border:      #DDE7EE;
  --c-muted:       #5F7385;  /* captions, notas legales — 4.9:1 sobre blanco */

  /* — Semánticos — */
  --color-heading:      var(--c-primary);
  --color-body:         var(--c-text);
  --color-link:         var(--c-deep);
  --color-bg:           var(--c-white);
  --color-bg-alt:       var(--c-soft);
  --color-bg-dark:      var(--c-primary);
  --color-cta:          var(--c-accent);
  --color-cta-text:     var(--c-primary);
  --color-cta-2:        var(--c-deep);
  --color-focus:        var(--c-sky);
  --color-input-bg:     #F5F7F9;
  --color-input-border: var(--c-gray);
  --color-error:        #C0392B;
  --color-success:      #2E7D5B;

  /* — Overlay del hero (estilo Moppers con la paleta propia) — */
  --hero-overlay: linear-gradient(90deg,
      rgb(15 42 68 / .94) 0%,
      rgb(23 58 90 / .78) 45%,
      rgb(34 80 120 / .35) 100%);
}
```

**Contraste verificado (WCAG AA):**

| Texto / Fondo | Ratio | Uso |
|---|---|---|
| `--c-primary` sobre blanco | 11.9 : 1 | ✅ Títulos |
| `--c-text` sobre blanco | 6.1 : 1 | ✅ Párrafos |
| `--c-primary` sobre `--c-accent` | 5.9 : 1 | ✅ Texto de botón amarillo |
| Blanco sobre `--c-deep` | 8.6 : 1 | ✅ Botón secundario |
| Blanco sobre `--c-primary` | 11.9 : 1 | ✅ Bandas oscuras |
| `--c-accent` sobre `--c-primary` | 5.9 : 1 | ✅ Eyebrow sobre fondo oscuro |
| Blanco sobre `--c-accent` | 2.0 : 1 | ❌ **Prohibido** |
| `--c-accent` sobre blanco | 2.0 : 1 | ❌ Solo para decoración (íconos ≥ 24 px, líneas), nunca texto. **Excepción documentada:** los números 01/02/03 de How it works (ref. `05_process.jpg`) son decorativos: se pintan con `::before` y el paso se anuncia en el `h3` con texto `sr-only` |
| `--c-accent-ink` (`#7A6800`) sobre blanco | 5.6 : 1 | ✅ Cuando se necesita texto "amarillo" (tag "Popular service") |
| `--c-muted` (`#5F7385`) sobre blanco / `--c-soft` | 4.9 / 4.7 : 1 | ✅ Captions y notas |

> En fondo blanco, el eyebrow va en `--c-deep` con la línea decorativa en `--c-accent`. Sobre fondo oscuro (hero, bandas), el eyebrow va en `--c-accent`.

### 1.2 Tipografía

| Rol | Familia | Fallback |
|---|---|---|
| Títulos (`--font-display`) | **Manrope Variable** (200–800) | `system-ui, sans-serif` |
| Cuerpo (`--font-body`) | **DM Sans Variable** (400–700) | `system-ui, sans-serif` |

Escala fluida (mobile → desktop):

```css
:root {
  --font-display: 'Manrope Variable', system-ui, sans-serif;
  --font-body:    'DM Sans Variable', system-ui, sans-serif;

  --fs-hero:    clamp(2.5rem, 1.6rem + 3.6vw, 4.25rem);   /* 40 → 68 px */
  --fs-h2:      clamp(1.875rem, 1.4rem + 1.9vw, 2.875rem); /* 30 → 46 px */
  --fs-h3:      clamp(1.125rem, 1rem + .4vw, 1.375rem);    /* 18 → 22 px */
  --fs-h4:      1.0625rem;                                 /* 17 px */
  --fs-lead:    clamp(1rem, .95rem + .25vw, 1.125rem);     /* 16 → 18 px */
  --fs-body:    1rem;                                      /* 16 px */
  --fs-small:   .875rem;                                   /* 14 px */
  --fs-label:   .8125rem;                                  /* 13 px */
  --fs-eyebrow: .75rem;                                    /* 12 px */
  --fs-btn:     .8125rem;                                  /* 13 px */

  --lh-tight: 1.1;   --lh-heading: 1.2;   --lh-body: 1.7;
  --ls-tight: -0.03em;   --ls-eyebrow: 0.22em;   --ls-btn: 0.06em;
}
```

| Elemento | Tamaño | Peso | Line-height | Tracking | Color |
|---|---|---|---|---|---|
| H1 hero | `--fs-hero` | **300** con palabras clave en **800** | `--lh-tight` | `--ls-tight` | blanco |
| H2 sección | `--fs-h2` | 700 | `--lh-heading` | `--ls-tight` | `--color-heading` |
| H3 card | `--fs-h3` | 700 | 1.3 | -0.01em | `--color-heading` |
| Lead | `--fs-lead` | 400 | `--lh-body` | 0 | `--color-body` |
| Body | `--fs-body` | 400 | `--lh-body` | 0 | `--color-body` |
| Eyebrow | `--fs-eyebrow` | 700 | 1 | `--ls-eyebrow`, UPPERCASE | ver §1.1 |
| Label | `--fs-label` | 600 | 1.3 | 0 | `--color-heading` |
| Botón | `--fs-btn` | 700 | 1 | `--ls-btn`, UPPERCASE | según variante |

**H1 estilo Moppers.** El H1 alterna peso ligero y bold para destacar palabras:

```html
<h1 class="hero__title">
  Lorem ipsum <strong>dolor</strong> &amp; <strong>sit amet</strong> cleaning?
</h1>
```
```css
.hero__title        { font-weight: 300; }
.hero__title strong { font-weight: 800; }
```

Largo de línea máximo: párrafos `65ch`, H2 `18ch`, H1 `14ch`.

### 1.3 Espaciado (base 4 px)

```css
:root {
  --sp-1: .25rem;  --sp-2: .5rem;   --sp-3: .75rem;  --sp-4: 1rem;
  --sp-5: 1.25rem; --sp-6: 1.5rem;  --sp-8: 2rem;    --sp-10: 2.5rem;
  --sp-12: 3rem;   --sp-16: 4rem;   --sp-20: 5rem;   --sp-24: 6rem;

  --section-y: clamp(3.5rem, 2.25rem + 4vw, 6rem);   /* 56 → 96 px */
  --gutter:    clamp(1rem, .5rem + 2.5vw, 1.75rem);  /* 16 → 28 px */
  --container: 1200px;
  --container-narrow: 760px;
  --header-h:  84px;   /* 70px en mobile */
}
```

### 1.4 Radios, sombras, bordes

```css
:root {
  --r-sm: 4px;     /* botones, inputs */
  --r-md: 8px;     /* cards pequeñas, panel de tabs */
  --r-lg: 12px;    /* cards grandes, booking card */
  --r-pill: 999px; /* pills, chips */

  --shadow-sm: 0 2px 10px rgb(23 58 90 / .06);
  --shadow-md: 0 8px 30px rgb(23 58 90 / .08);
  --shadow-lg: 0 20px 55px rgb(23 58 90 / .14);   /* booking card, hover de cards */

  --border: 1px solid var(--c-border);
}
```

### 1.5 Movimiento

```css
:root {
  --ease: cubic-bezier(.2, .7, .2, 1);
  --dur-fast: 150ms;  --dur: 220ms;  --dur-slow: 400ms;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```

Solo se animan `transform` y `opacity`. Las elevaciones de hover son de `translateY(-2px)` en botones y `-4px` en cards.

### 1.6 Breakpoints (mobile-first)

| Nombre | Min-width | Cambios principales |
|---|---|---|
| `sm` | 540px | Grids de 2 columnas |
| `md` | 768px | Contacto en 2 columnas |
| `lg` | 960px | Nav desktop, hero en 2 columnas, booking card montada sobre la onda, grids de 3 |
| `xl` | 1200px | Container al máximo |

```css
@media (min-width: 960px) { /* lg */ }
```

---

## 2. Componentes base (`src/components/ui/`)

### 2.1 Button — `Button.astro`

Renderiza `<a>` si recibe `href` y `<button>` si no.

```ts
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'light' | 'link';
  size?: 'md' | 'lg' | 'sm';
  href?: string;
  type?: 'button' | 'submit';
  icon?: 'arrow' | 'arrow-up-right' | 'phone' | 'message' | null;
  block?: boolean;  // ancho 100 %
}
```

| Variante | Fondo | Texto | Borde | Uso |
|---|---|---|---|---|
| `primary` | `--c-accent` | `--c-primary` | `--c-accent` | **CTA principal** ("Text for a quote", "Book now") |
| `secondary` | `--c-deep` | blanco | `--c-deep` | CTA secundario ("Call now", "Request a quote" en el panel) |
| `outline` | transparente | blanco | blanco 60 % | Sobre fondos oscuros (hero, bandas) |
| `light` | blanco | `--c-primary` | blanco | CTA sobre banda oscura |
| `link` | — | `--c-deep` | — | "Learn more →" dentro de cards |

| Tamaño | Padding | Alto mín. |
|---|---|---|
| `sm` | 10 px 16 px | 40 px |
| `md` | 16 px 26 px | 48 px |
| `lg` | 19 px 32 px | 56 px |

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--sp-2);
  min-height: 48px; padding: 16px 26px;
  font: 700 var(--fs-btn)/1 var(--font-body);
  letter-spacing: var(--ls-btn); text-transform: uppercase;
  border: 1px solid transparent; border-radius: var(--r-sm);
  text-decoration: none; cursor: pointer;
  transition: transform var(--dur) var(--ease), background-color var(--dur) var(--ease),
              box-shadow var(--dur) var(--ease);
}
.btn:hover        { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.btn:active       { transform: translateY(0); box-shadow: none; }
.btn:focus-visible{ outline: 3px solid var(--color-focus); outline-offset: 3px; }
.btn[disabled], .btn[aria-disabled="true"] { opacity: .5; pointer-events: none; }

.btn--primary   { background: var(--c-accent); color: var(--c-primary); }
.btn--primary:hover { background: var(--c-accent-600); }
.btn--secondary { background: var(--c-deep); color: #fff; }
.btn--secondary:hover { background: var(--c-primary); }
.btn--outline   { background: transparent; color: #fff; border-color: rgb(255 255 255 / .6); }
.btn--outline:hover { background: #fff; color: var(--c-primary); }
.btn--light     { background: #fff; color: var(--c-primary); }
.btn--link      { min-height: auto; padding: 0; background: none; color: var(--c-deep); }
.btn--link:hover { transform: none; box-shadow: none; text-decoration: underline; text-underline-offset: 4px; }
.btn--block     { width: 100%; }

.btn__icon { width: 1em; height: 1em; transition: transform var(--dur) var(--ease); }
.btn:hover .btn__icon { transform: translateX(3px); }
```

Reglas:
- Una sola `primary` por bloque visual. Si hay dos CTA, el segundo es `outline` (fondo oscuro) o `secondary` (fondo claro).
- El texto del botón es un verbo de acción, en 1 a 4 palabras.
- Con flecha: `↗` en acciones que salen del sitio (SMS, llamada) y `→` en navegación interna.
- En mobile, los botones de un `button-row` ocupan el 100 % del ancho cuando no caben lado a lado.

### 2.2 Eyebrow — `Eyebrow.astro`

Patrón Moppers: una línea horizontal antes del texto.

```html
<span class="eyebrow">About company</span>
```
```css
.eyebrow {
  display: inline-flex; align-items: center; gap: var(--sp-3);
  font: 700 var(--fs-eyebrow)/1 var(--font-body);
  letter-spacing: var(--ls-eyebrow); text-transform: uppercase;
  color: var(--c-deep);
}
.eyebrow::before { content: ""; width: 40px; height: 2px; background: var(--c-accent); }
.on-dark .eyebrow { color: var(--c-accent); }
.on-dark .eyebrow::before { background: rgb(255 255 255 / .5); }
.eyebrow--center::after { content: ""; width: 40px; height: 2px; background: var(--c-accent); } /* línea a ambos lados */
```

### 2.3 SectionHeading — `SectionHeading.astro`

Eyebrow, H2 y lead opcional. Tiene dos layouts:

| Layout | Uso | Estructura |
|---|---|---|
| `stacked` (default) | About, Why us | Eyebrow → H2 → lead, alineados a la izquierda |
| `centered` | How it works, Testimonials, Our Work | Todo centrado, máx. 640 px |
| `split` | Services, Blog | H2 a la izquierda y lead + botón a la derecha (`align-items: end`) |

Espaciado: eyebrow → H2 `--sp-4`, H2 → lead `--sp-5`, bloque → contenido `--sp-12`.

### 2.4 Campos de formulario — `Field.astro`

Un mismo componente para `input`, `select` y `textarea`.

```ts
interface Props {
  name: string; label: string;
  as?: 'input' | 'select' | 'textarea';
  type?: 'text' | 'tel' | 'email' | 'date';
  placeholder?: string; required?: boolean;
  options?: string[];      // select
  hint?: string;           // texto de ayuda debajo
  autocomplete?: string;   // name, tel, postal-code, email
  inputmode?: 'numeric' | 'tel' | 'email';
}
```

```html
<div class="field">
  <label class="field__label" for="bk-name">Your name <span aria-hidden="true">*</span></label>
  <input class="field__control" id="bk-name" name="name" required autocomplete="name" placeholder="Lorem ipsum">
  <p class="field__hint" id="bk-name-hint">Lorem ipsum dolor sit.</p>
</div>
```

```css
.field          { display: grid; gap: var(--sp-2); }
.field__label   { font: 600 var(--fs-label)/1.3 var(--font-body); color: var(--color-heading); }
.field__control {
  width: 100%; min-height: 50px; padding: 13px 15px;
  font: 400 var(--fs-body)/1.4 var(--font-body);   /* 16px evita el zoom en iOS */
  color: var(--color-heading);
  background: var(--color-input-bg);
  border: 1px solid var(--color-input-border); border-radius: var(--r-sm);
  transition: border-color var(--dur-fast), background-color var(--dur-fast), box-shadow var(--dur-fast);
}
.field__control::placeholder { color: var(--c-muted); }
.field__control:hover  { border-color: var(--c-sky); }
.field__control:focus  { outline: none; background: #fff; border-color: var(--c-deep);
                         box-shadow: 0 0 0 3px rgb(122 174 219 / .35); }
.field__control[aria-invalid="true"] { border-color: var(--color-error); }
textarea.field__control { min-height: 120px; resize: vertical; }
select.field__control  { appearance: none; padding-right: 42px;
  background: var(--color-input-bg) url("data:image/svg+xml,…chevron…") no-repeat right 15px center / 12px; }
.field__hint  { font-size: var(--fs-small); color: var(--c-muted); }
.field__error { font-size: var(--fs-small); color: var(--color-error); }
```

| Estado | Visual |
|---|---|
| Default | Fondo `#F5F7F9`, borde `--c-gray` |
| Hover | Borde `--c-sky` |
| Focus | Fondo blanco, borde `--c-deep` y halo de 3 px sky al 35 % |
| Error | Borde rojo y mensaje debajo con `aria-describedby` y `aria-invalid="true"` |
| Disabled | Opacidad 0.6, `cursor: not-allowed` |

Reglas:
- El label siempre está visible. El placeholder es solo un ejemplo, nunca la instrucción.
- `font-size` mínimo de 16 px en controles para evitar el zoom en iOS.
- Teléfono con `type="tel" inputmode="tel" autocomplete="tel"`. ZIP con `inputmode="numeric" pattern="\d{5}" autocomplete="postal-code"`.
- La validación es nativa (`required`, `pattern`) y los mensajes se muestran en `blur`, no mientras se escribe.

### 2.5 Cards

Todas comparten: fondo blanco, `border: var(--border)`, `--r-lg`, `--shadow-sm` y, en hover, `translateY(-4px)` + `--shadow-lg`.

| Card | Anatomía | Detalle |
|---|---|---|
| **ServiceCard** | Imagen 16:10 → (tag) → H3 → descripción → `btn--link` | Línea superior de 4 px en `--c-accent` que se anima de `scaleX(0)` a `1` **solo en hover o foco de teclado** (`:focus-within`), en todas las cards. Las `featured` se distinguen solo por el tag "Popular service" |
| **StepCard** | Número (`01`) → H3 → texto | Número en `--fs-h2`, peso 800, `--c-accent`; en desktop, conector punteado entre cards |
| **FeatureCard** | Icon badge 56 px → H3 → texto de 1 línea | Badge circular `--c-accent-100` con ícono `--c-primary` |
| **TestimonialCard** | Comillas → texto → avatar 48 px + nombre + ciudad | Lleva `data-placeholder` hasta que haya reseñas reales |
| **CounterCard** | Cifra → label | Cifra en `--fs-h2`, 800, `--c-primary`; label uppercase de 12 px |
| **ProjectCard** | Imagen 4:3 → título → caption | Caption "Sample visual · replace with actual completed work" |
| **BookingCard** | Ver §3.3 | |

```css
.card { background: #fff; border: var(--border); border-radius: var(--r-lg);
        box-shadow: var(--shadow-sm); overflow: hidden;
        transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.card--service { position: relative; }
.card--service::before { content: ""; position: absolute; inset: 0 0 auto; height: 4px;
  background: var(--c-accent); transform: scaleX(0); transform-origin: left;
  transition: transform var(--dur-slow) var(--ease); }
.card--service:hover::before, .card--service:focus-within::before { transform: scaleX(1); }
```

Si la card entera es clickeable, el `<a>` va en el H3 y usa `::after { position:absolute; inset:0 }`. No se envuelve la card completa en `<a>`.

### 2.6 Pills (tabs), filtros y chips

| Componente | Forma | Inactivo | Activo | Uso |
|---|---|---|---|---|
| **Pill / Tab** | `--r-pill`, 44 px de alto | Blanco con borde `--c-border` y texto `--c-primary` | Fondo `--c-primary` y texto blanco | Service details |
| **Filter** | `--r-sm`, 40 px | Blanco con borde y texto `--c-deep` | Fondo `--c-deep` y texto blanco | Our Work |
| **Chip** | `--r-pill`, 38 px | Borde blanco al 35 %, fondo blanco al 6 % y texto blanco | — (no interactivo) | Service Areas |

En mobile, las filas de pills y filtros hacen **scroll horizontal** (`overflow-x: auto; scroll-snap-type: x proximity`) con fade en los bordes. No hacen wrap en varias líneas.

### 2.7 Iconos

- SVG inline con `stroke="currentColor"`, `stroke-width="1.75"`, `fill="none"` y viewBox 24×24 (estilo outline consistente).
- Tamaños: 16 (en botones), 24 (en línea) y 28–32 (dentro de badges).
- Decorativos: `aria-hidden="true"`. Con significado: `role="img"` + `<title>`.
- Nunca se usan emojis ni caracteres unicode (☎ ✦ ♡) como íconos. Eso era del demo anterior y hay que reemplazarlo.

---

## 3. Hero (estructura Moppers) — `sections/Hero.astro`

### 3.1 Anatomía

```
┌──────────────────────────────────────────────────────────────────────┐
│ TOP BAR (36px)  phone · email                 Professional Cleaning AZ │
├──────────────────────────────────────────────────────────────────────┤
│ HEADER sticky (84px)  [logo]   Home About Services Work Areas Contact [TEXT FOR A QUOTE ↗] │
├──────────────────────────────────────────────────────────────────────┤
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓ ── INTRODUCING CLEANING 4 YOU         (foto + overlay navy →       ▓│
│▓ Lorem ipsum **dolor**                  transparente a la derecha)   ▓│
│▓ & **sit amet** cleaning?                                            ▓│
│▓ Lorem ipsum dolor sit amet, consectetur                             ▓│
│▓ adipiscing elit sed do eiusmod.                                     ▓│
│▓ [ REQUEST A QUOTE → ]                    ┌───────────────────┐     ▓│
│▓                                          │  Book a Service   │     ▓│
│▓  ~~~~ onda trasera (blanco 35%) ~~~~~~~  │  Your Name [____] │     ▓│
│ ~~~~~~~~~ onda frontal (blanco) ~~~~~~~~  │  Phone     [____] │      │
├───────────────────────────────────────────│  ZIP Code  [____] │──────┤
│ ── ABOUT COMPANY                          │  Service   [▼___] │      │
│ Lorem ipsum dolor                         │ [ BOOK NOW ↗ ]    │      │
│ sit amet cleaning.                        └───────────────────┘      │
└──────────────────────────────────────────────────────────────────────┘
```

Claves:
1. La foto ocupa todo el ancho. El overlay va en degradado horizontal (`--hero-overlay`): oscuro a la izquierda para que el texto se lea y casi transparente a la derecha para que se vea la foto.
2. **Dos ondas SVG** superpuestas en el borde inferior. La trasera es blanca al 35 % y queda desfasada; la frontal es blanca sólida.
3. La **booking card** está en la columna derecha del grid del hero, alineada abajo. Se sale del hero (`margin-bottom` negativo) y queda encima de la onda y del inicio de About.
4. **About** usa el mismo grid (`1fr var(--booking-w)`) con la columna derecha vacía, para que el texto no quede debajo de la card.

### 3.2 Código de referencia

```astro
---
import { Picture } from 'astro:assets';
import heroImg from '../../assets/images/hero.jpg';
import BookingCard from './BookingCard.astro';
---
<section class="hero on-dark" id="home" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true">
    <Picture src={heroImg} formats={['avif','webp']} widths={[640, 1024, 1600, 2000]}
             sizes="100vw" alt="" loading="eager" fetchpriority="high" class="hero__img" />
    <div class="hero__overlay"></div>
    <svg class="hero__wave" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
      <path class="hero__wave--back"  d="M0,64 C220,140 420,10 720,52 C1000,92 1220,150 1440,80 L1440,160 L0,160 Z"/>
      <path class="hero__wave--front" d="M0,104 C260,160 500,58 760,86 C1010,112 1230,150 1440,112 L1440,160 L0,160 Z"/>
    </svg>
  </div>

  <div class="container hero__grid">
    <div class="hero__copy">
      <span class="eyebrow">Introducing Cleaning 4 You</span>
      <h1 class="hero__title" id="hero-title">Lorem ipsum <strong>dolor</strong> &amp; <strong>sit amet</strong> cleaning?</h1>
      <p class="hero__lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      <Button variant="primary" href="#contact" icon="arrow">Request a quote</Button>
    </div>
    <BookingCard class="hero__booking" />
  </div>
</section>
```

```css
.hero { --booking-w: 400px; --overlap: 180px;
        position: relative; isolation: isolate; color: #fff; }
.hero__bg      { position: absolute; inset: 0; z-index: -1; overflow: hidden; }
.hero__img     { width: 100%; height: 100%; object-fit: cover; object-position: center 35%; }
.hero__overlay { position: absolute; inset: 0; background: var(--hero-overlay); }
.hero__wave    { position: absolute; left: 0; bottom: -1px; width: 100%; height: clamp(60px, 9vw, 150px); }
.hero__wave--back  { fill: #fff; opacity: .35; }
.hero__wave--front { fill: #fff; }

.hero__grid  { display: grid; gap: var(--sp-10); }
.hero__copy  { padding-block: var(--sp-20) var(--sp-8); max-width: 640px; }
.hero__title { font: 300 var(--fs-hero)/var(--lh-tight) var(--font-display);
               letter-spacing: var(--ls-tight); margin: var(--sp-5) 0 var(--sp-6); max-width: 14ch; }
.hero__title strong { font-weight: 800; }
.hero__lead  { color: rgb(255 255 255 / .85); font-size: var(--fs-lead); max-width: 46ch; margin-bottom: var(--sp-8); }
.hero__booking { position: relative; z-index: 2; margin-bottom: calc(var(--sp-8) * -1); } /* mobile */

@media (min-width: 960px) {
  .hero__grid    { grid-template-columns: 1fr var(--booking-w); align-items: end; min-height: 640px; }
  .hero__copy    { align-self: center; padding-block: var(--sp-24) calc(var(--sp-24) + 40px); }
  .hero__booking { margin-bottom: calc(var(--overlap) * -1); }
}

/* About comparte el grid para dejar el hueco de la card */
@media (min-width: 960px) {
  .about__grid { display: grid; grid-template-columns: 1fr var(--booking-w, 400px); gap: var(--sp-10); }
}
```

### 3.3 Booking card

| Propiedad | Valor |
|---|---|
| Ancho | 400 px en desktop y 100 % en mobile |
| Padding | `--sp-8` (32 px) |
| Fondo | blanco, `--r-lg`, `--shadow-lg` |
| Título | "Book a Service", H3 centrado, `--fs-h3`, 700 |
| Campos | Your Name · Phone Number · ZIP Code · Choose a Service (select con los 5 servicios de `site.ts`) |
| CTA | `btn--primary btn--block` "Book now ↗" |
| Nota | `--fs-small`, `--c-muted`: "Lorem ipsum: opens an SMS draft, nothing is sent to a server." |
| Envío | `sms:+16023963955?body=` + campos con `encodeURIComponent` |

### 3.4 Responsive del hero

| < 960 px | ≥ 960 px |
|---|---|
| Una columna; la card va debajo del copy, a todo el ancho | Dos columnas; la card se monta sobre la onda |
| H1 en 40–44 px | H1 hasta 68 px |
| Ondas de 60 px de alto | Ondas de hasta 150 px |
| Overlay más opaco y uniforme (`rgb(15 42 68 / .82)`) | Degradado horizontal |
| `padding-top: 64px` | `padding-top: 96px` |

---

## 4. Patrones de sección

### 4.1 Ritmo de fondos

Las secciones alternan fondos para separar sin usar líneas:

| # | Sección | Fondo | Layout |
|---|---|---|---|
| 1 | Hero | Foto + overlay | Grid de 2 columnas con ondas |
| 2 | About | Blanco | `1fr / booking-w` (hueco para la card) |
| 3 | How it works | `--c-soft` | Encabezado centrado + 3 StepCards |
| 4 | Services | Blanco | Encabezado `split` + grid de 3 (5 cards: 3 + 2 centradas) |
| 5 | Service details | `--c-soft` | Pills + panel 2 columnas (texto / imagen) |
| 6 | Founder | `--c-primary` (oscuro) | Cita grande centrada |
| 7 | Counters | Blanco, solapado sobre la sección 6 | 4 CounterCards en una card blanca |
| 8 | Why choose us | Blanco | Texto a la izquierda + grid 2×2 de FeatureCards |
| 9 | Testimonials | `--c-soft` | Grid de 3 (sin carrusel; en mobile, scroll-snap horizontal) |
| 10 | Our Work | Blanco | Filtros + grid de 3 ProjectCards |
| 11 | Service Areas | `--c-primary` | Encabezado centrado + chips |
| 12 | Contact | Blanco | 2 columnas: copy + CTAs / formulario en card `--c-soft` |
| 13 | Footer | `--c-primary-900` | 4 columnas + barra inferior |

### 4.2 Contenedor y sección base

```css
.container { width: min(100% - 2 * var(--gutter), var(--container)); margin-inline: auto; }
.section   { padding-block: var(--section-y); scroll-margin-top: var(--header-h); }
.section--alt  { background: var(--color-bg-alt); }
.section--dark { background: var(--color-bg-dark); color: #fff; }
.section--dark h2, .section--dark h3 { color: #fff; }
.section--dark p { color: rgb(255 255 255 / .78); }
```

### 4.3 Grids

```css
.grid    { display: grid; gap: var(--sp-6); }
@media (min-width: 540px) { .grid--2, .grid--3, .grid--4 { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 960px) { .grid--3 { grid-template-columns: repeat(3, 1fr); }
                            .grid--4 { grid-template-columns: repeat(4, 1fr); } }
/* 5 cards en grid de 3: la fila incompleta se centra */
.grid--center-last { display: flex; flex-wrap: wrap; justify-content: center; }
.grid--center-last > * { flex: 1 1 320px; max-width: calc((100% - 2 * var(--sp-6)) / 3); }
```

### 4.4 Header

- Sticky, fondo blanco y `--shadow-sm` cuando `scrollY > 0` (clase `.is-scrolled` con IntersectionObserver sobre un sentinel, sin listener de scroll).
- Alto de 84 px (70 px en mobile). El logo mide 52 px de alto.
- Links: 14 px, 600, `--c-primary`. En hover y activo van en `--c-deep`, con subrayado de 2 px `--c-accent` (`scaleX` animado).
- **Mobile (< 960 px):** botón hamburguesa de 44×44 y panel desplegable con los links a 18 px. El CTA "Text for a quote" queda visible como barra fija abajo (`position: fixed; bottom: 0`, 56 px, `--c-accent`) que aparece al pasar el hero.

### 4.5 Footer

4 columnas en desktop (marca + contacto · Pages · Services · Service Areas), 2 en tablet y 1 en mobile. Los links van en blanco al 70 % y en hover `--c-accent`. La barra inferior lleva borde superior blanco al 12 %, el copyright y la nota "Website concept".

---

## 5. Accesibilidad (checklist por componente)

- [ ] Contraste AA (§1.1). Ningún texto en amarillo sobre blanco.
- [ ] Focus visible: `outline: 3px solid var(--color-focus); outline-offset: 3px`.
- [ ] Targets táctiles ≥ 44×44 px.
- [ ] Tabs: `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, `aria-controls`, flechas ← → e `Inicio`/`Fin`.
- [ ] Filtros: `aria-pressed` en cada botón y `aria-live="polite"` con "Showing N projects".
- [ ] Imágenes decorativas con `alt=""`. Las ilustrativas lo dicen en el alt ("Illustrative photo of…").
- [ ] Formularios con `<label for>`, `autocomplete` y errores vinculados con `aria-describedby`.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Todo el sitio se puede usar sin JS.

---

## 6. Referencias visuales (`docs/referencias/`)

Capturas del demo anterior (`cleaning4you_demo_actualizada.html` / `cleaning4you_web_propuesta.html`). Muestran el **look aprobado** de cada sección. El **hero** es la excepción: ese sigue la estructura de Moppers (§3).

| Captura | Sección | Qué se conserva | Qué cambia o se corrige |
|---|---|---|---|
| `01_hero.jpg` | Header + Hero | Header blanco cálido con logo horizontal (ícono + "CLEANING / 4 YOU" en dos líneas), nav centrado, CTA amarillo "TEXT FOR A QUOTE ↗"; eyebrow amarillo espaciado; H1 blanco muy grande; foto de interior moderno con overlay oscuro a la izquierda; 2 CTA (amarillo sólido + outline blanco) | Se agregan las **ondas SVG** y la **booking card** de Moppers; el H1 pasa a la mezcla de pesos 300/800; el contenido va en lorem |
| `02_services.jpg` | Services | H2 navy enorme alineado a la izquierda + sub gris; cards con imagen arriba y **borde superior amarillo de 4 px** (decisión: solo en hover, no fijo en las destacadas); título navy y descripción gris | Se agrega el eyebrow; las 5 cards en grid 3 + 2 |
| `03_tabs_bug.jpg` | Service details (tabs) | Pills redondeadas (la activa en navy con texto blanco y las inactivas blancas con borde); panel blanco grande con botón `secondary` "Request a Quote ↗" | **Bug:** `{EYEBROW}`, `{title}` y `{desc}` sin interpolar, imagen rota y hueco vacío enorme. Se resuelve con paneles pre-renderizados en build e imagen con `aspect-ratio` fijo |
| `04_portfolio.jpg` | Our Work | Grid de 3 con imagen alta (~220 px), título navy y caption gris "Sample visual · replace with actual completed work"; nota legal pequeña al pie | Se agregan filtros con `aria-pressed` y conteo con `aria-live` |
| `05_process.jpg` | How it works | Cards blancas con borde sutil y **número grande amarillo** (01/02/03), título navy y texto gris | Fondo `--c-soft` para separarla de Services. En amarillo solo el número, que es grande (≥ 48 px) |
| `06_areas_contact.jpg` | Service Areas + Contact | Banda navy con chips outline redondeados en una fila con wrap; contacto en 2 columnas (copy a la izquierda, card `--c-soft` con formulario a la derecha); labels uppercase pequeños en navy | En desktop, la columna izquierda se centra verticalmente con el formulario |
| `07_footer.jpg` | Contact (CTAs) + Footer | Botones "CALL NOW" (`secondary`) + "SEND A TEXT" (`primary`); botón de formulario amarillo a todo el ancho; nota de demo pequeña; footer navy de una fila (marca ✦ · teléfono en amarillo · "Website concept") | El footer crece a 4 columnas estilo Moppers y esa fila pasa a ser la **barra inferior**. El ✦ se reemplaza por un SVG |

Diferencias con el demo que se mantienen a propósito:
- **Tipografía:** el demo usa Arial/Helvetica. Aquí usamos Manrope y DM Sans, que tienen el mismo carácter grotesco pero con pesos variables para el H1 mixto.
- **Colores:** el demo usa un amarillo mostaza y un steel `#3C5A7E` aproximados. Aquí manda la guía oficial (`--c-accent #D8B903`, `--c-deep #225078`).

---

## 7. Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Un CTA amarillo por bloque | Dos botones amarillos lado a lado |
| Texto navy sobre amarillo | Texto blanco sobre amarillo |
| Íconos SVG outline de un solo set | Emojis o símbolos unicode como íconos |
| Ondas y puntos decorativos en SVG/CSS | Imágenes PNG para decoración |
| Renderizar todos los paneles de tabs y alternar `hidden` | Inyectar HTML con strings `{title}` desde JS |
| Placeholders marcados con `data-placeholder` | Inventar reseñas, precios o premios |
| `scroll-margin-top` en cada sección con ancla | Links del nav a secciones que no existen |
| Tokens (`var(--…)`) | Hex o px sueltos en componentes |

---

## 8. Implementación en Tailwind v4

Los tokens de §1 se declaran en `@theme` (`src/styles/global.css`). Tailwind genera una utilidad por cada uno.

### 8.1 Tokens → clases

| Token (spec) | Variable `@theme` | Clases |
|---|---|---|
| `--c-primary` | `--color-primary` | `bg-primary` `text-primary` `border-primary` `fill-primary` |
| `--c-primary-900` | `--color-primary-900` | `bg-primary-900` (footer, top bar) |
| `--c-accent` / `-600` / `-100` | `--color-accent`, `-600`, `-100` | `bg-accent` `hover:bg-accent-600` `bg-accent-100` |
| — | `--color-accent-ink` | `text-accent-ink` (texto amarillo legible) |
| `--c-deep` | `--color-deep` | `bg-deep` `text-deep` |
| `--c-sky` | `--color-sky` | `border-sky` `outline-sky` `ring-sky/35` |
| `--c-soft` / `--c-pale` / `--c-gray` | `--color-soft` / `--color-pale` / `--color-cool` | `bg-soft` `bg-pale` `bg-cool` |
| `--c-text` / `--c-muted` | `--color-body` / `--color-muted` | `text-body` `text-muted` |
| `--c-border` | `--color-line` | `border-line` |
| Fondo de inputs | `--color-input` | `bg-input` |
| Header / banda Areas | `--color-cream` / `--color-band` | `bg-cream` `bg-band` |
| `--fs-hero` … `--fs-eyebrow` | `--text-hero`, `--text-h2`, `--text-h3`, `--text-h4`, `--text-lead`, `--text-btn`, `--text-eyebrow` | `text-hero` `text-h2` … (incluyen line-height y tracking) |
| `--font-display` / `--font-body` | `--font-display` / `--font-sans` | `font-display` / `font-sans` (default) |
| `--ls-eyebrow` / `--ls-btn` | `--tracking-eyebrow` / `--tracking-btn` | `tracking-eyebrow` `tracking-btn` |
| `--r-sm/md/lg` | `--radius-sm/md/lg` (4/8/12 px) | `rounded-sm` `rounded-md` `rounded-lg` `rounded-full` |
| `--shadow-sm/md/lg` | `--shadow-sm/md/lg` | `shadow-sm` `shadow-md` `shadow-lg` |
| Breakpoints §1.6 | `--breakpoint-sm/md/lg/xl` (540/768/960/1200) | `sm:` `md:` `lg:` `xl:` / `max-lg:` |
| `--sp-*` | escala default de Tailwind (`--spacing: .25rem`) | `p-4` = 16 px, `gap-6` = 24 px, `mb-12` = 48 px |

Las variables de layout que no generan utilidades viven en `:root`: `--section-y`, `--gutter`, `--header-h`, `--booking-w`, `--hero-overlay(-mobile)`. Se usan con la sintaxis de variables de v4: `h-(--header-h)`, `pt-(--section-y)`, `bg-(image:--hero-overlay)`, `lg:grid-cols-[1fr_var(--booking-w)]`.

### 8.2 Utilidades propias (`@utility`)

| Utilidad | Qué hace |
|---|---|
| `container-site` | `width: min(100% - 2·gutter, 1200px)` centrado |
| `section` | `padding-block: var(--section-y)` + `scroll-margin-top: var(--header-h)`. Si la sección anterior tiene el mismo fondo, se agrega `pt-[calc(var(--section-y)/2)]` para no sumar dos rellenos completos |
| `no-scrollbar` | Oculta la barra en filas con scroll horizontal (tabs, filtros, testimonios) |
| `select-chevron` | Flecha SVG de los `<select>` |

### 8.3 Recetas por componente

| Componente | Dónde | Clave |
|---|---|---|
| Button | `ui/Button.astro` | `Record<Variant, string>` + `Record<Size, string>`; flecha animada con `group/btn` |
| Eyebrow | `ui/Eyebrow.astro` | Línea con `before:`/`after:` + `content-['']`; prop `dark` |
| Field | `ui/Field.astro` | Estados con `hover:` `focus:` `user-invalid:`; prop `onSoft` para inputs blancos |
| Card de servicio | `sections/Services.astro` | Línea amarilla `before:h-1 before:scale-x-0 hover:before:scale-x-100` |
| Tabs | `sections/ServiceTabs.astro` | `aria-selected:bg-primary`; los paneles alternan `hidden` |
| Filtros | `sections/OurWork.astro` | `aria-pressed:bg-deep` |
| Menú mobile | `sections/Header.astro` | `max-lg:hidden max-lg:data-[open]:block`; íconos con `group-aria-expanded/toggle:` |
| Hero | `sections/Hero.astro` | Ondas con `fill-white opacity-35` / `fill-white`; card con `lg:-mb-[200px]` |
| Ondas animadas | `sections/Hero.astro` + `@theme` | Un `<svg>` por onda, `w-[120%] -left-[10%] origin-bottom`. `animate-wave-back` (19 s) y `animate-wave-front` (13 s), `ease-in-out alternate` en direcciones opuestas: vaivén de ±3.5 % / ±2.5 % en X y una leve respiración en Y. Solo `transform` (GPU). `motion-reduce:animate-none` |
| Gota del logo | `ui/Logo.astro` + `@theme` | En hover/foco del logo (`group/logo`): `animate-drip` (900 ms, la gota sube, cae, se aplasta y rebota con `origin-bottom`) y `animate-twinkle` (la estrella crece y gira 90°). `[transform-box:fill-box]` para que el origen sea la propia figura. Una sola vez por hover, `motion-reduce:animate-none!` |

### 8.4 Reglas

1. **Clases literales siempre.** Tailwind escanea el código: `` `before:${c}` `` no genera nada.
2. **Nada de colores de la paleta default** (`blue-500`, `gray-200`). Solo tokens de marca.
3. **Valores arbitrarios** (`text-[.8125rem]`, `max-w-[640px]`) solo para medidas puntuales de layout. Si un valor se repite 3 veces, se vuelve token.
4. **`@apply` solo en `@layer base`.** Para reutilizar, crea un componente.
5. **El estado se maneja con atributos y no con clases.** El JS cambia `aria-*`, `data-*` o `hidden`, y Tailwind los estiliza con variantes.

---

## 9. Auditoría UI/UX (ui-ux-pro-max) — decisiones aplicadas

Auditoría del 2026-10-20 contra la referencia rápida de la skill (prioridades 1–9). Se verifica con pruebas de interacción por el protocolo de DevTools (29/29) y con Lighthouse (A11y 100).

| # | Regla | Decisión |
|---|---|---|
| 1 | Primer clic sin feedback | En **escritorio** (`hover: hover` + `pointer: fine`) los links `sms:` no abren nada: `src/scripts/sms-links.ts` los redirige al formulario de contacto, preselecciona el servicio (`data-service`) o precarga detalles (`data-prefill`). Al enviar un formulario en escritorio se muestra `FormResult` con el mensaje listo para copiar. En mobile se abre el SMS y se avisa "Opening your messages app…". |
| 2 | `focus-appearance` (3:1) | Foco `outline-deep` sobre fondos claros y `outline-sky` dentro de `.on-dark` (top bar, hero, founder, areas, footer, barra mobile). `.on-light` lo restablece dentro de cards blancas en zonas oscuras. |
| 3 | `primary-action` | Un solo CTA amarillo por bloque. En el hero, el amarillo es el de la booking card; el CTA del copy es **outline** "Call (602) 396-3955". |
| 4 | `error-placement`, `error-clarity`, `focus-management` | Error debajo de cada campo (prop `error` de `Field`), vinculado con `aria-describedby` y `aria-invalid`. Se valida al salir del campo y el error se limpia al corregir. Al enviar: resumen en `role="status"` y foco en el primer campo inválido. |
| 5 | `nav-state-active` | `aria-current="location"` en el link de la sección visible (IntersectionObserver), con estilo `aria-[current=location]:`. |
| 6 | `focus-not-obscured` | En mobile, `scroll-padding-bottom` deja libre el espacio de la barra CTA fija. |
| 7 | Honestidad | Los testimonios de relleno no muestran estrellas (sería una calificación inventada). |
| 8 | Expectativa del botón | "Book now" pasa a ser **"Text my request"**: no hay reserva, se arma un SMS. |
| 9 | Contraste de los controles (1.4.11) | El borde de los inputs usa el token `--color-field` `#7F93A6` (3.2:1 sobre blanco). El hover y el foco van en `deep`. |
| 10 | `cursor-pointer` | Regla base `button:not(:disabled), [role=tab] { cursor: pointer }`, porque el preflight de Tailwind v4 lo quita. |
| 11 | Tamaño de los targets | Links del footer con `min-h-10` en mobile. |
| 12 | Afordancia de los chips | Los chips de ciudades **son links**: piden servicio en esa ciudad (SMS en mobile; en escritorio precargan "City: X" en el formulario). |


---

## 10. Contenido aprobado (2026-10-22)

Las 12 capturas de `docs/referencias/contenido-aprobado/` definen **qué secciones van y con qué textos** (copy literal en `src/data/content.ts`). Orden de la home: Hero → About → How it works → Services → Our Story → Mission/Vision (folleto) → Why choose us → Our Work → Our Commitment → Get a quote → CTA → Footer.

| Sección | Patrón visual |
|---|---|
| How it works | Banda navy con foto de fondo (overlay al 94 %), 3 pasos centrados con ícono en círculo `bg-accent` |
| Services | 5 cards. "Learn more" / "Explore service" abren un `<dialog>` ("Service page · coming next") con un CTA que preselecciona el servicio en `#quote` |
| Our Story | Split 50/50: foto a sangre + panel navy con degradado y CTA outline |
| Mission (folleto) | Esquina con franjas diagonales gold/navy + "techo" (`clip-path` triangular gold con un triángulo navy adentro) con el lema. Todo en CSS. En mobile el lema se angosta para quedar dentro del triángulo |
| Our Work | Videos 9:14 con botón play (abren un `<dialog>` placeholder) + galería con filtros `aria-pressed` |
| Get a quote | Banner con foto + overlay; formulario de 4 columnas montado encima (`-mt-28`), con `Field dense` en desktop. En mobile, el botón va después de "Additional Details" |
| CTA | Degradado navy → deep → `#3973A2`; botones `light` + `outline` |
| Aviso de vista previa | Pill fija abajo a la derecha (solo desktop), con `data-placeholder`. Se quita al publicar |

**Secciones extra (no aprobadas):** `src/components/extras/`, marcadas con `ExtraMarker` (franja rayada `accent`/`primary` + etiqueta). Solo se ven en `/secciones-extra`.

**Desvío del audit (§9 #3):** las capturas aprobadas muestran 2 CTA en el hero ("Get a free quote" amarillo + "Explore services" outline). Se respetó el contenido aprobado, así que en el primer viewport hay 2 botones amarillos (header y hero) más el de la card.
