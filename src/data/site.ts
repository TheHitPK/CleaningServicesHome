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

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#our-work' },
  { label: 'Service Areas', href: '#service-areas' },
  { label: 'Contact', href: '#contact' },
] as const;

export type ServiceId = 'move-out' | 'post-construction' | 'residential' | 'commercial' | 'windows';

export interface Service {
  id: ServiceId;
  name: string;
  image: ImageMetadata;
  featured?: boolean;
}

export const services: Service[] = [
  { id: 'move-out', name: 'Move In / Move Out Cleaning', image: moveOut, featured: true },
  { id: 'post-construction', name: 'Post Construction Cleaning', image: postConstruction, featured: true },
  { id: 'residential', name: 'Residential Cleaning', image: residential },
  { id: 'commercial', name: 'Commercial Cleaning', image: commercial },
  { id: 'windows', name: 'Window Cleaning', image: windows },
];

export const serviceAreas = [
  'Phoenix', 'Scottsdale', 'Tempe', 'Chandler', 'Gilbert', 'Fountain Hills',
  'Cave Creek', 'Carefree', 'Payson', 'Maricopa', 'Casa Grande',
] as const;
