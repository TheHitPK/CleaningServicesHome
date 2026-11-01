// ⚠️ CONTENIDO DE SECCIONES EXTRA — NO APROBADAS
// Estas secciones NO se muestran en la home. Solo las usan los componentes de src/components/extras/
// y la página de revisión /secciones-extra. Todo es lorem ipsum / placeholder.
const LOREM_M = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

/** EXTRA: mensaje del fundador */
export const founder = {
  eyebrow: "Founder's message",
  quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation.',
  name: 'Founder name',
  role: 'Founder, Cleaning 4 You',
  placeholder: true,
};

/** EXTRA: contadores */
export const counters = [
  { value: '14', label: 'Years of experience', placeholder: false },
  { value: '00+', label: 'Lorem projects', placeholder: true },
  { value: '00+', label: 'Lorem clients', placeholder: true },
  { value: '11', label: 'Arizona cities', placeholder: false },
];

/** EXTRA: testimonios */
export const testimonials = {
  eyebrow: 'Testimonials',
  title: 'Lorem ipsum trusted by people & companies.',
  items: [
    { quote: LOREM_M, name: 'Client name', place: 'Phoenix, AZ', initials: 'CN' },
    { quote: LOREM_M, name: 'Client name', place: 'Scottsdale, AZ', initials: 'CN' },
    { quote: LOREM_M, name: 'Client name', place: 'Tempe, AZ', initials: 'CN' },
  ],
  note: 'Placeholder testimonials. They will be replaced with real, authorized client reviews.',
};
