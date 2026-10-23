# ⚠️ Secciones EXTRA — no aprobadas

Estas secciones **no están en el contenido aprobado** (`docs/referencias/contenido-aprobado/`) y **no se muestran en la home**.
Se construyeron antes de recibir las capturas finales y se conservan aquí, separadas, por si el cliente decide usar alguna.

| Componente | Qué es | Por qué no está aprobada | Textos |
|---|---|---|---|
| `ServiceTabs.astro` | Tabs con el detalle de cada servicio | No aparece en las capturas | `content-extras.ts` → `serviceTabs` |
| `Founder.astro` | Mensaje del fundador + 4 cifras | No aparece en las capturas | `founder`, `counters` |
| `Testimonials.astro` | 3 testimonios | No aparece; no hay reseñas reales | `testimonials` |
| `ServiceAreas.astro` | Banda navy con chips de ciudades | Las ciudades solo van en el footer | `areas` |
| `Contact.astro` | Formulario de contacto en 2 columnas | Reemplazado por `sections/QuoteSection.astro` | `contact` |

## Cómo identificarlas

- **En el código:** cada archivo empieza con el bloque `⚠️ SECCIÓN EXTRA — NO APROBADA` y sus textos están en `src/data/content-extras.ts`, separado de `content.ts`, que solo tiene contenido aprobado.
- **En el navegador:** la página interna **`/secciones-extra`** (noindex, fuera del menú) las muestra todas envueltas en `ExtraMarker`: franja rayada amarillo/navy y una etiqueta fija "⚠ Sección extra · No aprobada".

## Para aprobar una

1. Moverla a `src/components/sections/`.
2. Pasar sus textos de `content-extras.ts` a `content.ts`, con el copy real.
3. Importarla en `src/pages/index.astro` y quitarla de `src/pages/secciones-extra.astro`.
4. Quitar el bloque `⚠️ SECCIÓN EXTRA` del archivo.

## Para descartarlas

Borrar esta carpeta, `src/data/content-extras.ts` y `src/pages/secciones-extra.astro`. La home no depende de nada de aquí.
