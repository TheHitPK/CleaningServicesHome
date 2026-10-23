// ⚠️ CONTENIDO DE SECCIONES EXTRA — NO APROBADAS
// Estas secciones NO están en las capturas de contenido aprobado (docs/referencias/contenido-aprobado/)
// y NO se muestran en la home. Solo las usan los componentes de src/components/extras/
// y la página de revisión /secciones-extra. Todo es lorem ipsum / placeholder.
import type { ImageMetadata } from 'astro';
import residential from '../assets/images/residential.jpg';
import deepClean from '../assets/images/deep-clean.jpg';
import moveOut from '../assets/images/move-out.jpg';
import postConstruction from '../assets/images/post-construction.jpg';
import commercial from '../assets/images/commercial.jpg';
import windows from '../assets/images/windows.jpg';

const LOREM_M = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const LOREM_L = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export interface ServiceTab {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  text: string;
  items: string[];
  image: ImageMetadata;
}

const tabItems = ['Lorem ipsum dolor sit', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Ut labore et dolore magna'];

/** EXTRA: tabs de detalle de servicios */
export const serviceTabs = {
  eyebrow: 'The details that matter',
  title: 'Find the right clean for your space.',
  lead: LOREM_M,
  noteTitle: 'Service details available upon request.',
  noteText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A full room-by-room checklist for this service has not yet been supplied.',
  footerTitle: 'Ready to talk about your project?',
  tabs: [
    { id: 'regular', label: 'Regular Cleaning', eyebrow: 'Recurring care', title: 'Regular Cleaning', text: LOREM_L, items: tabItems, image: residential },
    { id: 'deep', label: 'Deep Cleaning', eyebrow: 'Top to bottom', title: 'Deep Cleaning', text: LOREM_L, items: tabItems, image: deepClean },
    { id: 'move', label: 'Move In / Out', eyebrow: 'Next chapter', title: 'Move In / Move Out Cleaning', text: LOREM_L, items: tabItems, image: moveOut },
    { id: 'post', label: 'Post Construction', eyebrow: 'Finishing touches', title: 'Post Construction Cleaning', text: LOREM_L, items: tabItems, image: postConstruction },
    { id: 'commercial', label: 'Commercial', eyebrow: 'Workspaces', title: 'Commercial Cleaning', text: LOREM_L, items: tabItems, image: commercial },
    { id: 'windows', label: 'Windows', eyebrow: 'Let the light in', title: 'Window Cleaning', text: LOREM_L, items: tabItems, image: windows },
  ] satisfies ServiceTab[],
};

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

/** EXTRA: banda de ciudades */
export const areas = {
  eyebrow: 'Where we work',
  title: 'Proudly serving Arizona communities',
  lead: 'Ask us about cleaning services in your city.',
};

/** EXTRA: formulario de contacto en 2 columnas (reemplazado por QuoteSection) */
export const contact = {
  eyebrow: 'Get in touch',
  title: 'Ready for a fresh start?',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our team will help you with service information and scheduling.',
  submit: 'Text my request',
  note: 'Opens a text message to our team on your phone. Nothing is sent to a server.',
};
