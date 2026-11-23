// Worker de Cloudflare: sirve el sitio estático (dist/) y recibe los formularios en POST /api/quote.
// Cada solicitud se envía por email a la dirección verificada en Email Routing (binding QUOTE_EMAIL,
// configurado en wrangler.jsonc). No se guarda nada: el email es el único registro.
import { EmailMessage } from 'cloudflare:email';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  QUOTE_EMAIL: { send(message: EmailMessage): Promise<void> };
  MAIL_FROM: string;
  MAIL_TO: string;
}

/** Campos que aceptamos y su etiqueta en el email (en este orden). */
const FIELDS = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  zip: 'ZIP code',
  city: 'City / ZIP',
  service: 'Service',
  size: 'Property size',
  date: 'Preferred date',
  details: 'Details',
} as const;
type FieldName = keyof typeof FIELDS;

const MAX_LENGTH: Record<FieldName, number> = {
  name: 100, phone: 25, email: 254, zip: 5, city: 100, service: 80, size: 60, date: 20, details: 1000,
};

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

/** Quita saltos de línea para que ningún valor pueda inyectar cabeceras en el email. */
const oneLine = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

function utf8Base64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** Arma un email MIME de texto plano (UTF-8, base64) sin dependencias. */
function buildRawEmail(opts: { from: string; to: string; replyTo?: string; subject: string; body: string; domain: string }): string {
  const encodedBody = utf8Base64(opts.body).replace(/.{1,76}/g, '$&\r\n');
  const headers = [
    `From: Cleaning 4 You Website <${opts.from}>`,
    `To: <${opts.to}>`,
    ...(opts.replyTo ? [`Reply-To: <${opts.replyTo}>`] : []),
    `Subject: =?UTF-8?B?${utf8Base64(opts.subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@${opts.domain}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ];
  return `${headers.join('\r\n')}\r\n\r\n${encodedBody}`;
}

async function handleQuote(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);

  // Solo aceptamos envíos desde el propio sitio
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ ok: false, error: 'Forbidden' }, 403);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'Invalid form data' }, 400);
  }

  // Trampa para bots: campo oculto que una persona nunca llena. Respondemos "ok" sin enviar nada.
  if (String(form.get('website') ?? '').trim()) return json({ ok: true });

  const data: Partial<Record<FieldName, string>> = {};
  for (const key of Object.keys(FIELDS) as FieldName[]) {
    const raw = form.get(key);
    if (typeof raw !== 'string') continue;
    const value = key === 'details' ? raw.trim() : oneLine(raw);
    if (!value) continue;
    if (value.length > MAX_LENGTH[key]) return json({ ok: false, error: `${FIELDS[key]} is too long` }, 400);
    data[key] = value;
  }

  const phoneDigits = (data.phone ?? '').replace(/\D/g, '');
  if (!data.name) return json({ ok: false, error: 'Name is required' }, 400);
  if (phoneDigits.length < 10) return json({ ok: false, error: 'A valid phone number is required' }, 400);
  if (data.zip && !/^[0-9]{5}$/.test(data.zip)) return json({ ok: false, error: 'Invalid ZIP code' }, 400);
  if (data.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) {
    return json({ ok: false, error: 'Invalid email' }, 400);
  }

  const source = oneLine(String(form.get('source') ?? 'Website form')).slice(0, 60);
  const submittedAt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Phoenix', dateStyle: 'medium', timeStyle: 'short',
  }).format(new Date());

  const lines = [
    'New quote request from cleaning4you-llc.com',
    '',
    ...(Object.keys(FIELDS) as FieldName[])
      .filter((key) => data[key] && key !== 'details')
      .map((key) => `${FIELDS[key]}: ${data[key]}`),
    ...(data.details ? ['', 'Details:', data.details] : []),
    '',
    `Form: ${source}`,
    `Sent: ${submittedAt} (Arizona time)`,
    '',
    data.email
      ? 'Reply to this email to answer the customer directly.'
      : 'The customer did not leave an email. Call or text them at the number above.',
  ];

  const domain = env.MAIL_FROM.split('@')[1] ?? 'localhost';
  const raw = buildRawEmail({
    from: env.MAIL_FROM,
    to: env.MAIL_TO,
    replyTo: data.email,
    subject: `New quote request: ${data.service ?? 'Cleaning'} – ${data.name}`,
    body: lines.join('\n'),
    domain,
  });

  try {
    await env.QUOTE_EMAIL.send(new EmailMessage(env.MAIL_FROM, env.MAIL_TO, raw));
  } catch (error) {
    console.error('Quote email failed', error);
    return json({ ok: false, error: 'Email could not be sent' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/quote') return handleQuote(request, env);
    return env.ASSETS.fetch(request);
  },
};
