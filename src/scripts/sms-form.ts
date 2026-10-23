// Formularios maqueta: validan con errores en línea y arman un mensaje.
// Mobile: abren un borrador SMS. Escritorio (sin app de SMS): muestran el mensaje listo para copiar.
// No envían nada a un servidor.
import { site, sms } from '../data/site';

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const isDesktop = (): boolean => matchMedia('(hover: hover) and (pointer: fine)').matches;

function validate(control: Control): boolean {
  const valid = control.checkValidity();
  const error = document.getElementById(`${control.id}-error`);
  if (valid) control.removeAttribute('aria-invalid');
  else control.setAttribute('aria-invalid', 'true');
  if (error) error.hidden = valid;
  return valid;
}

function buildMessage(form: HTMLFormElement, controls: Control[]): string {
  const lines = ['Hi Cleaning 4 You! I would like a quote.'];
  for (const control of controls) {
    const value = control.value.trim();
    if (!value) continue;
    const label = form.querySelector(`label[for="${control.id}"]`)?.firstChild?.textContent?.trim() ?? control.name;
    lines.push(`${label}: ${value}`);
  }
  return lines.join('\n');
}

for (const form of document.querySelectorAll<HTMLFormElement>('[data-sms-form]')) {
  const controls = [...form.querySelectorAll<Control>('input, select, textarea')];
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const result = form.querySelector<HTMLElement>('[data-form-result]');

  const setStatus = (text: string, tone: 'error' | 'info'): void => {
    if (!status) return;
    status.dataset.tone = tone;
    status.textContent = text;
  };

  for (const control of controls) {
    // Validar al salir del campo (no mientras se escribe), salvo para limpiar un error ya mostrado
    control.addEventListener('blur', () => {
      if (control.value.trim() || control.hasAttribute('aria-invalid')) validate(control);
    });
    control.addEventListener('input', () => {
      if (control.hasAttribute('aria-invalid')) validate(control);
      if (result) result.hidden = true;
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const invalid = controls.filter((c) => !validate(c));
    if (invalid.length) {
      setStatus(`Please fix ${invalid.length} field${invalid.length > 1 ? 's' : ''} highlighted above.`, 'error');
      invalid[0].focus();
      return;
    }

    const message = buildMessage(form, controls);

    if (isDesktop() && result) {
      setStatus('', 'info');
      result.querySelector('[data-form-message]')!.textContent = message;
      result.hidden = false;
      result.querySelector<HTMLElement>('[data-form-result-title]')?.focus();
      return;
    }

    setStatus(`Opening your messages app… If nothing happens, text us at ${site.phone.display}.`, 'info');
    window.location.href = sms(message);
  });

  // Copiar el mensaje (escritorio)
  const copy = result?.querySelector<HTMLButtonElement>('[data-copy]');
  copy?.addEventListener('click', async () => {
    const label = copy.querySelector('[data-copy-label]')!;
    try {
      await navigator.clipboard.writeText(result!.querySelector('[data-form-message]')!.textContent ?? '');
      label.textContent = 'Copied!';
    } catch {
      label.textContent = 'Select and copy the text above';
    }
    setTimeout(() => { label.textContent = 'Copy message'; }, 2500);
  });
}
