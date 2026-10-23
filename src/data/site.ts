// Datos REALES del negocio. Única fuente: ningún componente los escribe a mano.
import type { ImageMetadata } from 'astro';
import residential from '../assets/images/residential.jpg';
import commercial from '../assets/images/commercial.jpg';
import windows from '../assets/images/windows.jpg';
import moveOut from '../assets/images/move-out.jpg';
import postConstruction from '../assets/images/post-construction.jpg';

export const site = {
  name: 'Cleaning 4 You',
  legalName: 'Cleaning 4 You LLC',
  tagline: 'A cleaner, brighter tomorrow',
  region: 'Arizona',
  phone: {
    display: '(602) 396-3955',
    e164: '+16023963955',
  },
  email: 'Cleaning4youllc@gmail.com',
  yearsOfExperience: 14,
} as const;

export const tel = `tel:${site.phone.e164}`;
export const sms = (body?: string) =>
  body ? `sms:${site.phone.e164}?body=${encodeURIComponent(body)}` : `sms:${site.phone.e164}`;

/** Páginas que contienen las secciones (home y /propuesta): ahí las anclas quedan locales. */
const onePagePaths = new Set(['/', '/propuesta', '/propuesta/']);

/** Anclas de secciones: `#x` en la home y en /propuesta; en otras páginas (p. ej. 404) apuntan a `/#x`. */
export const anchor = (hash: `#${string}`, pathname: string): string =>
  onePagePaths.has(pathname) ? hash : `/${hash}`;

// Menú de las capturas aprobadas (ref. 01-hero.jpg): sin "Service Areas"
export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#our-work' },
  { label: 'Contact', href: '#contact' },
] as const;

/** Ancla del formulario grande de cotización (CTA "Get a free quote") */
export const QUOTE_ANCHOR = '#quote' as const;

export type ServiceId = 'move-out' | 'post-construction' | 'residential' | 'commercial' | 'windows';

export interface Service {
  id: ServiceId;
  name: string;
  /** Nombre corto para el footer (ref. 11-cta-y-footer.jpg) */
  short: string;
  image: ImageMetadata;
  featured?: boolean;
}

// Orden de las cards (ref. 03-servicios.jpg)
export const services: Service[] = [
  { id: 'residential', name: 'Residential Cleaning', short: 'Residential Cleaning', image: residential },
  { id: 'commercial', name: 'Commercial Cleaning', short: 'Commercial Cleaning', image: commercial },
  { id: 'windows', name: 'Window Cleaning', short: 'Window Cleaning', image: windows },
  { id: 'move-out', name: 'Move In / Move Out Cleaning', short: 'Move In / Move Out', image: moveOut, featured: true },
  { id: 'post-construction', name: 'Post Construction Cleaning', short: 'Post Construction', image: postConstruction, featured: true },
];

// Orden de los <select> de los formularios (igual que el demo: primero los servicios destacados)
export const serviceOptions: readonly string[] = [
  'Move In / Move Out Cleaning', 'Post Construction Cleaning', 'Residential Cleaning', 'Commercial Cleaning', 'Window Cleaning',
];

export const serviceAreas = [
  'Phoenix', 'Scottsdale', 'Tempe', 'Chandler', 'Gilbert', 'Fountain Hills',
  'Cave Creek', 'Carefree', 'Payson', 'Maricopa', 'Casa Grande',
] as const;
