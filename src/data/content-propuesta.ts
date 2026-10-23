// ⚠️ PROPUESTA DE ESTRUCTURA — NO APROBADA. Solo la usa /propuesta.
// Textos NUEVOS que la propuesta agrega. Todo lo demás reutiliza el copy aprobado de content.ts.
// Regla: nada inventado. Lo que sale de datos confirmados (site.ts / content.ts) se marca "confirmed";
// lo que el cliente tiene que responder queda como pendiente y lleva data-placeholder.
import type { IconName } from '../components/icons/icons';
import { site, services, serviceAreas } from './site';
import { process, quote, footer } from './content';

// ② Franja de confianza — solo datos confirmados
export const trust = {
  title: 'Why clients trust Cleaning 4 You',
  items: [
    { icon: 'sparkle', value: `${site.yearsOfExperience} Years`, label: 'of hands-on cleaning experience' },
    { icon: 'map-pin', value: `${serviceAreas.length} Arizona Cities`, label: 'from Phoenix to Casa Grande' },
    { icon: 'check', value: 'Free Quotes', label: 'personalized to your space' },
    { icon: 'phone', value: 'Call or Text', label: site.phone.display },
  ] satisfies { icon: IconName; value: string; label: string }[],
};

// ⑦ Reseñas — hueco reservado hasta tener reseñas reales y autorizadas (no se inventan)
export const reviews = {
  eyebrow: 'Client reviews',
  title: 'What Our Clients Say',
  lead: 'Real reviews from Cleaning 4 You clients will appear here, for example linked from Google Reviews.',
  slot: 'Verified client review · pending',
  slots: 3,
};

// ⑨ FAQ — las respuestas "confirmed" salen de textos ya aprobados; el resto espera al cliente
export const faq = {
  eyebrow: 'FAQ',
  title: 'Questions Before You Book?',
  pending: 'Answer pending confirmation from Cleaning 4 You.',
  items: [
    { q: 'How do I get a quote?', a: `${process.steps[0].text} ${process.steps[1].text}` },
    { q: 'Is the quote free?', a: quote.note.split('. ').slice(0, 2).join('. ') + '.' },
    { q: 'Which areas do you serve?', a: footer.areasText },
    { q: 'What types of cleaning do you offer?', a: services.map((s) => s.name).join(', ') + '.' },
    { q: 'Do you bring your own supplies and equipment?', a: null },
    { q: 'Are you licensed and insured?', a: null },
    { q: 'How far in advance should I book?', a: null },
  ] satisfies { q: string; a: string | null }[],
};

// Notas de la propuesta (en español: son para el cliente, no para el visitante del sitio)
export type ChangeKind = 'igual' | 'movida' | 'fusion' | 'nueva';

export const notes = {
  hero: { kind: 'igual', title: 'Hero + card de cotización', answers: '¿Qué es esto y cómo pido?', change: 'Sin cambios.' },
  trust: { kind: 'nueva', title: 'Franja de confianza', answers: '¿Son serios?', change: 'Nueva, pero solo con datos ya confirmados (14 años, 11 ciudades, cotización gratis, teléfono). Ocupa el lugar de About, que baja a la sección 8.' },
  services: { kind: 'movida', title: 'Services', answers: '¿Qué limpian?', change: 'Sube del 4.º al 3.er lugar: primero qué ofrecen, después cómo funciona.' },
  how: { kind: 'movida', title: 'How it works', answers: '¿Cómo funciona?', change: 'Va después de Services (antes estaba antes).' },
  work: { kind: 'movida', title: 'Our Work', answers: '¿Lo hacen bien?', change: 'Sube para mostrar prueba visual temprano. Los 3 videos placeholder se ocultan hasta tener material real: un botón que no reproduce nada resta confianza.' },
  why: { kind: 'fusion', title: 'Why choose us + Our Commitment', answers: '¿Por qué ellos y no otros?', change: 'Se fusionan: decían lo mismo en dos secciones. Se conservan los 4 atributos y las 2 promesas.' },
  reviews: { kind: 'nueva', title: 'Reseñas', answers: '¿Otros clientes quedaron contentos?', change: 'Hueco reservado. Es lo que más falta en la página; hay que conseguir reseñas reales (p. ej. Google). No se inventa ninguna.' },
  about: { kind: 'fusion', title: 'About + Our Story + Mission/Vision', answers: '¿Quiénes son?', change: 'Tres secciones se vuelven una: la historia con foto y Misión/Visión/Filosofía en formato compacto. Baja al final porque el visitante primero decide si le sirve el servicio.' },
  faq: { kind: 'nueva', title: 'Preguntas frecuentes', answers: 'Las últimas dudas antes de pedir', change: 'Nueva. 4 respuestas salen de textos ya aprobados; 3 esperan la confirmación del cliente.' },
  quote: { kind: 'fusion', title: 'Get a quote + CTA final', answers: 'Pedir la cotización', change: 'El CTA "Ready for a Cleaner, Fresher Space?" pasa a ser el título del formulario, con Call/Text al lado. Antes el CTA repetía el pedido justo después del formulario.' },
} satisfies Record<string, { kind: ChangeKind; title: string; answers: string; change: string }>;

export const intro = {
  badge: 'Propuesta de estructura · No aprobada',
  title: 'Propuesta: misma información, en el orden en que decide un cliente',
  text: 'Esta página reorganiza el contenido aprobado de la home: pasa de 12 secciones a 10, fusiona las que repetían el mensaje y agrega reseñas y preguntas frecuentes. Cada sección lleva una nota con qué duda del cliente responde y qué cambió.',
  current: 'Ver la versión actual',
  hide: 'Ocultar notas',
  show: 'Mostrar notas',
};
