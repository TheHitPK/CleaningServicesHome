// Textos de cada sección. Hoy son lorem ipsum: se reemplazan cuando llegue el copy final.
// Todo lo marcado `placeholder: true` se renderiza con data-placeholder.
import type { ImageMetadata } from 'astro';
import type { IconName } from '../components/icons/icons';
import type { ServiceId } from './site';
import residential from '../assets/images/residential.jpg';
import deepClean from '../assets/images/deep-clean.jpg';
import moveOut from '../assets/images/move-out.jpg';
import postConstruction from '../assets/images/post-construction.jpg';
import commercial from '../assets/images/commercial.jpg';
import windows from '../assets/images/windows.jpg';
import kitchen from '../assets/images/kitchen.jpg';
import office from '../assets/images/office.jpg';

const LOREM_S = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const LOREM_M = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const LOREM_L = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const hero = {
  eyebrow: 'Introducing Cleaning 4 You',
  // [texto normal, texto en negrita, ...] — alterna pesos 300/800 (estilo Moppers)
  title: ['Lorem ipsum ', 'dolor', ' & ', 'sit amet', ' cleaning?'],
  lead: LOREM_M,
  cta: 'Request a quote',
};

export const booking = {
  title: 'Book a Service',
  cta: 'Book now',
  note: 'Mockup: opens an SMS draft. Nothing is sent to a server.',
};

export const about = {
  eyebrow: 'About company',
  title: 'Lorem ipsum dolor sit amet cleaning.',
  body: [LOREM_L, LOREM_M],
  link: 'Learn more about us',
  highlights: [
    { icon: 'sparkle', title: '14 Years of Experience', text: LOREM_S },
    { icon: 'heart', title: 'Lorem ipsum dolor', text: LOREM_S },
    { icon: 'check', title: 'Lorem ipsum sit', text: LOREM_S },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

export const process = {
  eyebrow: 'How it works',
  title: 'Lorem ipsum in 3 simple steps.',
  lead: LOREM_S,
  steps: [
    { title: 'Call or text', text: LOREM_M },
    { title: 'Discuss your needs', text: LOREM_M },
    { title: 'Schedule & confirm', text: LOREM_M },
  ],
};

export const servicesSection = {
  eyebrow: 'Our services',
  title: 'Lorem ipsum for every new chapter.',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
  cta: 'Request a quote',
  descriptions: {
    'move-out': LOREM_M,
    'post-construction': LOREM_M,
    residential: LOREM_M,
    commercial: LOREM_M,
    windows: LOREM_M,
  } satisfies Record<ServiceId, string>,
};

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

export const founder = {
  eyebrow: "Founder's message",
  quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation.',
  name: 'Founder name',
  role: 'Founder, Cleaning 4 You',
  placeholder: true,
};

export const counters = [
  { value: '14', label: 'Years of experience', placeholder: false },
  { value: '00+', label: 'Lorem projects', placeholder: true },
  { value: '00+', label: 'Lorem clients', placeholder: true },
  { value: '11', label: 'Arizona cities', placeholder: false },
];

export const whyUs = {
  eyebrow: 'Why choose us',
  title: 'Lorem ipsum you can feel confident about.',
  lead: LOREM_L,
  cta: 'Book a service now',
  features: [
    { icon: 'users', title: 'Experienced Team', text: LOREM_S },
    { icon: 'search', title: 'Detail-Oriented', text: LOREM_S },
    { icon: 'heart', title: 'Personalized Service', text: LOREM_S },
    { icon: 'message', title: 'Clear Communication', text: LOREM_S },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

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

export type ProjectType = 'move' | 'post' | 'residential' | 'commercial';

export const portfolio = {
  eyebrow: 'Our portfolio',
  title: 'See the difference in every detail.',
  lead: 'Lorem ipsum dolor sit amet. This concept uses illustrative images; actual project photography will replace them when supplied.',
  filters: [
    { id: 'all', label: 'All projects' },
    { id: 'move', label: 'Move Out' },
    { id: 'post', label: 'Post Construction' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
  ] as const,
  items: [
    { type: 'move', title: 'Move Out Cleaning', image: moveOut },
    { type: 'post', title: 'Post Construction Details', image: postConstruction },
    { type: 'residential', title: 'Residential Cleaning', image: residential },
    { type: 'move', title: 'Move Out — Kitchen', image: kitchen },
    { type: 'post', title: 'Post Construction — Living', image: windows },
    { type: 'commercial', title: 'Commercial Cleaning', image: office },
  ] satisfies { type: ProjectType; title: string; image: ImageMetadata }[],
  caption: 'Sample visual · replace with actual completed work',
  note: 'Portfolio images shown here are references only, not verified Cleaning 4 You projects. Before/after comparisons will be added only when corresponding real photos are available.',
};

export const areas = {
  eyebrow: 'Where we work',
  title: 'Proudly serving Arizona communities',
  lead: 'Ask us about cleaning services in your city.',
};

export const contact = {
  eyebrow: 'Get in touch',
  title: 'Ready for a fresh start?',
  lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our team will help you with service information and scheduling.',
  submit: 'Prepare text message',
  note: 'This mockup opens an SMS draft on supported devices. It does not submit your details to a server.',
};

export const footer = {
  about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Professional cleaning services in Arizona.',
  bottomNote: 'Website concept · Not a live business website',
};
