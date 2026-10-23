// CONTENIDO APROBADO — copiado literal de las capturas en docs/referencias/contenido-aprobado/
// (mismo texto que Cleaning_4_You_Landing_Demo.html + folleto de Misión/Visión).
// Los textos de las secciones NO aprobadas están aparte, en content-extras.ts.
import type { ImageMetadata } from 'astro';
import type { IconName } from '../components/icons/icons';
import type { ServiceId } from './site';
import residential from '../assets/images/residential.jpg';
import deepClean from '../assets/images/deep-clean.jpg';
import moveOut from '../assets/images/move-out.jpg';
import postConstruction from '../assets/images/post-construction.jpg';
import windows from '../assets/images/windows.jpg';
import kitchen from '../assets/images/kitchen.jpg';
import office from '../assets/images/office.jpg';
import heroImg from '../assets/images/hero.jpg';

type Feature = { icon: IconName; title: string; text: string };

// ① Hero — ref. 01-hero.jpg
export const hero = {
  eyebrow: 'Professional Cleaning Services in Arizona',
  // [texto normal, texto en negrita, ...] — alterna pesos 300/800 (estilo Moppers)
  title: ['A Cleaner Space. ', 'A Fresh Start.'],
  lead: [
    "From move-out cleaning to post-construction projects, we help you prepare your space for what's next.",
    'Professional cleaning for homes, businesses, and properties across Arizona.',
  ],
  ctaPrimary: 'Get a free quote',
  ctaSecondary: 'Explore services',
};

export const booking = {
  title: 'Request a Free Quote',
  cta: 'Text my request',
  note: 'Demo only. Opens a text message to our team on your phone; nothing is sent to a server.',
};

// ② About — ref. 02-about.jpg
export const about = {
  eyebrow: 'About our company',
  title: 'More Than Clean. A Space You Can Feel Good About.',
  body: [
    'At Cleaning 4 You, we believe a clean space makes a difference in how you live, work, and feel.',
    "With 14 years of experience, we've built our business around personalized attention, quality service, and a commitment to the details that matter.",
    "Whether you're moving into a new home, preparing a property after construction, or keeping your space clean and comfortable, we're here to make the process easier.",
  ],
  link: 'Explore our services',
  highlights: [
    { icon: 'sparkle', title: '14 Years of Experience', text: 'Hands-on dedication to professional cleaning.' },
    { icon: 'heart', title: 'Personalized Care', text: "Attention to each property's needs." },
    { icon: 'check-small', title: 'Attention to Detail', text: 'Quality-minded service, from start to finish.' },
  ] satisfies Feature[],
};

// ③ How it works — ref. 04-how-it-works.jpg
export const process = {
  eyebrow: 'How it works',
  title: 'A Cleaner Space in 3 Simple Steps',
  steps: [
    { icon: 'phone', title: '01. Contact Us', text: 'Call, text, or request a quote online. Tell us which service you need.' },
    { icon: 'check', title: '02. Get Your Quote', text: "We'll discuss your space and provide a personalized quote. Some jobs may require a visit." },
    { icon: 'calendar', title: '03. Schedule', text: 'Choose an available date and confirm your cleaning with our team.' },
  ] satisfies Feature[],
};

// ④ Services — ref. 03-servicios.jpg
export const servicesSection = {
  eyebrow: 'Our services',
  title: 'Professional Cleaning for Every Space.',
  lead: 'From everyday cleaning to moving and construction projects, find the right service for your space.',
  link: 'Learn more',
  linkFeatured: 'Explore service',
  descriptions: {
    residential: 'Regular and deep cleaning to keep your home fresh and comfortable.',
    commercial: 'Professional cleaning solutions for commercial spaces.',
    windows: 'Cleaner windows for brighter, more welcoming spaces.',
    'move-out': 'Get your property ready for its next chapter, from kitchens and bathrooms to living areas.',
    'post-construction': 'From construction dust to finishing details, get your newly completed space ready.',
  } satisfies Record<ServiceId, string>,
  // Diálogo de "Learn more": todavía no hay páginas por servicio (igual que el demo)
  dialogEyebrow: 'Service page · coming next',
  dialogText: 'This is a preview of the Home Page. The detailed page for this service will be designed separately, including its description and room-by-room checklist where available.',
  dialogCta: 'Request a quote',
  disclaimer: 'Photography is illustrative and does not represent verified Cleaning 4 You client projects. Individual service pages are planned for the final website.',
};

// ⑤ Our Story — ref. 05-our-story.jpg
export const story = {
  eyebrow: 'Our story',
  title: ['Built on Experience.', 'Driven by Care.'],
  body: [
    'What began with a passion for transforming homes has grown into a cleaning company built on dedication, trust, and personal attention.',
    'For 14 years, Cleaning 4 You has worked to bring care and quality to the spaces we serve.',
    "We believe the difference is in the details — and in treating every client's property with respect.",
  ],
  cta: "Let's work together",
  photoNote: 'Replace this sample photo with an approved image of the owner or team.',
};

// ⑥ Misión / Visión / Filosofía — ref. 12-folleto-mision-vision.jpg
export const mission = {
  eyebrow: 'Who we are',
  blocks: [
    {
      title: 'Who are we?',
      text: "We are an energetic cleaning company, capable of overseeing each area to transform it into a tidy and clean place. Our job helps our customers save time and energy! Clients' only task will be to enjoy their home, in an environment of tranquility and harmony, as well as their businesses by adding value to their spaces and allowing us to serve them with our always guaranteed results.",
    },
    {
      title: 'Mission',
      text: 'Our team contributes to transform each space with the most comprehensive cleaning and thorough orderliness, with the goal of impacting the homes and businesses of our customers in a positive manner.',
    },
    {
      title: 'Vision',
      text: 'To position ourselves as a solid cleaning company in the Valley of the Sun, offering high quality working standards and the guarantee of excellence in the work we do in homes and businesses.',
    },
    {
      title: 'Philosophy',
      text: 'Excellence in cleanliness and order is our focus and passion to keep our customers satisfied.',
    },
  ],
  tagline: 'We are cleaning experts in residential, commercial, and construction.',
};

// ⑦ Why choose us — ref. 06-why-choose-us.jpg
export const whyUs = {
  eyebrow: 'Why choose us',
  title: 'Cleaning You Can Feel Confident About.',
  lead: "Choosing a cleaning service means trusting someone with your space. That's why we focus on clear communication, personalized attention, and quality work from start to finish.",
  features: [
    { icon: 'sparkle', title: 'Experienced Team', text: 'Years of practical cleaning experience.' },
    { icon: 'check-small', title: 'Detail-Oriented', text: 'Careful attention to the areas that matter.' },
    { icon: 'heart', title: 'Personalized Service', text: "Cleaning tailored to your property's needs." },
    { icon: 'phone', title: 'Clear Communication', text: 'Direct information and easy scheduling.' },
  ] satisfies Feature[],
};

// ⑧ Our Work — ref. 07-our-work-videos.jpg + 08-our-work-galeria.jpg
export type ProjectType = 'move' | 'post' | 'residential' | 'commercial';

export const portfolio = {
  eyebrow: 'Our work',
  title: 'See the Difference.',
  lead: 'A glimpse into the kind of transformations a detailed clean can make. This preview uses sample imagery until real project videos and photos are provided.',
  reels: [
    { id: 'reel-move', title: ['Move Out', 'Transformation'], image: residential },
    { id: 'reel-post', title: ['Post Construction', 'Cleaning'], image: postConstruction },
    { id: 'reel-deep', title: ['Deep Cleaning', 'Results'], image: deepClean },
  ] satisfies { id: string; title: [string, string]; image: ImageMetadata }[],
  reelCaption: 'Vertical video placement · 9:16',
  reelDialogEyebrow: 'Our work · video placeholder',
  reelDialogText: 'Vertical before & after video will appear here once the real footage is supplied.',
  reelDialogNote: 'Planned format: portrait video with a before, cleaning process, and after reveal. No sample footage has been represented as a real project.',
  galleryEyebrow: 'Photo gallery',
  galleryTitle: 'A Closer Look at Our Work',
  filters: [
    { id: 'all', label: 'All Projects' },
    { id: 'move', label: 'Move Out' },
    { id: 'post', label: 'Post Construction' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
  ] as const,
  items: [
    { type: 'move', title: 'Move Out Cleaning', image: moveOut },
    { type: 'post', title: 'Post Construction Cleaning', image: windows },
    { type: 'residential', title: 'Residential Cleaning', image: heroImg },
    { type: 'post', title: 'Post Construction Details', image: postConstruction },
    { type: 'move', title: 'Move Out — Kitchen', image: kitchen },
    { type: 'commercial', title: 'Commercial Cleaning', image: office },
  ] satisfies { type: ProjectType; title: string; image: ImageMetadata }[],
  note: 'Sample visuals only. Before/after videos will be added when the client supplies authorized original footage. No fictitious project claims or video playback.',
};

// ⑨ Our Commitment — ref. 09-our-commitment.jpg
export const commitment = {
  eyebrow: 'Our commitment',
  title: 'Your Space Matters to Us.',
  lead: 'We know that choosing a cleaning service is about more than finding someone to clean.',
  cards: [
    { icon: 'sparkle', title: 'Care in Every Detail', text: 'We believe every space deserves thoughtful attention and respect.' },
    { icon: 'heart', title: 'Trust Through Our Work', text: 'Our commitment is to build confidence through communication, dedication, and quality service.' },
  ] satisfies Feature[],
};

// ⑩ Get a quote — ref. 10-get-a-quote.jpg
export const quote = {
  eyebrow: "Let's get started",
  title: 'Your Cleaner Space Starts Here.',
  lead: "Tell us what your property needs, and we'll help you find the right cleaning service.",
  submit: 'Text my request',
  note: 'Free, personalized quotes. Some projects may require an on-site visit. This preview does not collect or transmit form responses.',
};

// ⑪ CTA — ref. 11-cta-y-footer.jpg
export const cta = {
  eyebrow: 'Cleaning 4 You · Arizona',
  title: 'Ready for a Cleaner, Fresher Space?',
  lead: 'Your next clean is just a call or text away.',
};

// ⑫ Footer — ref. 11-cta-y-footer.jpg
export const footer = {
  about: 'Professional cleaning services in Arizona, built on experience, personalized attention, and quality.',
  quickLinksTitle: 'Quick Links',
  servicesTitle: 'Our Services',
  areasTitle: 'Service Areas',
  areasText: 'Phoenix, Scottsdale, Tempe, Chandler, Gilbert, Fountain Hills, Cave Creek, Carefree, Payson, Maricopa & Casa Grande, Arizona.',
  bottomNote: 'Website design concept · Not a published business site',
};

// Aviso fijo de vista previa (aparece en todas las capturas aprobadas). Quitar al publicar.
export const previewFlag = 'Design preview · not a live website';

/** Errores en línea: causa + cómo corregirlo (ui-ux-pro-max: error-clarity) */
export const formErrors = {
  name: 'Please enter your name.',
  phone: 'Enter your phone number, including area code.',
  zip: 'Enter a 5-digit ZIP code.',
  city: 'Enter your Arizona city or ZIP code.',
  email: 'Enter a valid email, like name@example.com.',
};

export const notFound = {
  eyebrow: 'Error 404',
  title: ['This page got ', 'swept away', '.'],
  lead: "The page you're looking for doesn't exist or has moved. Let's get you back to a cleaner place.",
  home: 'Back to home',
  linksTitle: 'Maybe you were looking for',
};
