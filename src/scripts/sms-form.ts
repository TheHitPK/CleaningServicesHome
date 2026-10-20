// Formularios maqueta: validan en cliente y abren un borrador SMS. No envían nada a un servidor.
import { sms } from '../data/site';

for (const form of document.querySelectorAll<HTMLFormElement>('[data-sms-form]')) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const invalid = form.querySelector<HTMLInputElement>(':invalid');
    if (invalid) {
      if (status) status.textContent = 'Please complete the required fields.';
      invalid.focus();
      form.reportValidity();
      return;
    }
    if (status) status.textContent = '';

    const lines = ['Hi Cleaning 4 You! I would like a quote.'];
    for (const [key, raw] of new FormData(form)) {
      const value = String(raw).trim();
      if (!value) continue;
      const label = form.querySelector(`label[for="${form.querySelector(`[name="${key}"]`)?.id}"]`);
      const name = label?.firstChild?.textContent?.trim() ?? key;
      lines.push(`${name}: ${value}`);
    }
    window.location.href = sms(lines.join('\n'));
  });
}
