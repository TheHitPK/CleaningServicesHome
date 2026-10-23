// Links hacia el formulario de cotización (#quote-form):
// 1. Links a "#quote" con data-service / data-prefill → preseleccionan el servicio o precargan detalles.
// 2. En escritorio los links `sms:` no abren nada (no hay app de mensajes) → llevan al formulario.
// Si la página no tiene formulario (404, /secciones-extra), navegan a "/#quote".
const desktop = matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function fillForm(form: HTMLFormElement, service?: string, prefill?: string): void {
  const select = form.elements.namedItem('service') as HTMLSelectElement | null;
  const details = form.elements.namedItem('details') as HTMLTextAreaElement | null;
  const match = service && select ? [...select.options].find((o) => o.value === service) : undefined;

  if (match && select) select.value = match.value;
  const note = prefill ?? (service && !match ? `Interested in: ${service}` : undefined);
  if (note && details && !details.value.trim()) details.value = note;
}

function goToForm(form: HTMLFormElement): void {
  form.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
  form.querySelector<HTMLElement>('input, select, textarea')?.focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="sms:"], a[href$="#quote"]');
  if (!link) return;

  const isSms = link.protocol === 'sms:';
  if (isSms && !desktop.matches) return; // mobile: abrir la app de mensajes normalmente

  const form = document.querySelector<HTMLFormElement>('#quote-form');
  if (!form) {
    if (isSms) {
      event.preventDefault();
      window.location.href = '/#quote';
    }
    return; // los links "/#quote" navegan solos
  }

  event.preventDefault();
  // Cerrar el diálogo antes de enfocar: al cerrarse devuelve el foco a su botón y le ganaría al formulario
  link.closest('dialog')?.close();
  fillForm(form, link.dataset.service, link.dataset.prefill);
  history.replaceState(null, '', '#quote');
  goToForm(form);
});
