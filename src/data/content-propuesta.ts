// ⚠️ PROPUESTA DE ESTRUCTURA — NO APROBADA. Solo la usa /propuesta.
// Textos propios de la página de propuesta. Las secciones que pasaron a la home tienen su copy en content.ts.

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
