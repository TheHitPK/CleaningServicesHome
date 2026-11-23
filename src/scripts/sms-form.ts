// Formularios de cotización: validan con errores en línea y envían la solicitud por email
// (POST /api/quote → Worker de Cloudflare → site.email; ver worker/index.ts).
// - Computadora (pointer: fine): solo email. Si falla, se pide llamar al teléfono.
// - Celular/tablet (pointer: coarse): email Y, además, abre un borrador SMS con la misma solicitud.
//   El email sale con `keepalive`, así no se corta aunque el navegador pase a la app de Mensajes.
// En `npm run dev` no hay Worker: el email falla (en mobile igual se abre el SMS).
import { site, sms } from '../data/site';

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const ENDPOINT = '/api/quote';
/** Mismo criterio que las variantes `pointer-coarse:` / `pointer-fine:` de Tailwind */
const isTouch = (): boolean => matchMedia('(pointer: coarse)').matches;

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

async function sendEmail(form: HTMLFormElement): Promise<boolean> {
  const body = new FormData(form);
  body.set('source', `${form.dataset.formSource ?? 'Website form'} (${isTouch() ? 'mobile' : 'desktop'})`);
  try {
    const response = await fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { Accept: 'application/json' } });
    if (!response.ok) return false;
    const result = (await response.json()) as { ok?: boolean };
    return result.ok === true;
  } catch {
    return false;
  }
}

for (const form of document.querySelectorAll<HTMLFormElement>('[data-sms-form]')) {
  // El campo trampa (Honeypot) no se valida ni entra en el mensaje
  const controls = [...form.querySelectorAll<Control>('input, select, textarea')].filter((c) => !c.hasAttribute('data-honeypot'));
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');

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
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.hasAttribute('aria-busy')) return;

    const invalid = controls.filter((c) => !validate(c));
    if (invalid.length) {
      setStatus(`Please fix ${invalid.length} field${invalid.length > 1 ? 's' : ''} highlighted above.`, 'error');
      invalid[0].focus();
      return;
    }

    const touch = isTouch();
    const message = buildMessage(form, controls);
    form.setAttribute('aria-busy', 'true');
    if (submit) submit.disabled = true;

    // Se arma antes de resetear el formulario; el envío por email arranca ya
    const emailSent = sendEmail(form);

    if (touch) {
      // Mobile: también el SMS. Se abre dentro del mismo gesto del usuario (iOS bloquea sms: tras un await).
      setStatus('Opening your messages app… Just tap send to text us your request.', 'info');
      window.location.href = sms(message);
    } else {
      setStatus('Sending your request…', 'info');
    }

    const sent = await emailSent;
    form.removeAttribute('aria-busy');
    if (submit) submit.disabled = false;

    if (sent) {
      form.reset();
      setStatus(
        touch
          ? `Thank you! Your request was also sent by email. We'll contact you soon.`
          : `Thank you! Your request was sent. We'll contact you soon. For urgent requests call ${site.phone.display}.`,
        'info',
      );
    } else if (touch) {
      setStatus(`Please send the text message that just opened. If it didn't open, text or call us at ${site.phone.display}.`, 'info');
    } else {
      setStatus(`We couldn't send your request. Please try again in a moment or call us at ${site.phone.display}.`, 'error');
    }
    status?.focus();
  });
}
