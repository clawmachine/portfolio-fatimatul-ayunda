// Data yang dipakai di beberapa tempat: nav, footer, kontak.
import type { Link } from './types';

export const site = {
  name: 'Fatimatul Ayunda',
  email: 'fatimatulayunda@gmail.com',
  linkedin: { label: 'in/fatimatul-ayunda', href: 'https://www.linkedin.com/in/fatimatul-ayunda' },
  phone: { label: '+62 896-7121-0471', href: 'https://wa.me/6289671210471' },
  location: 'Indonesia',
  // Sementara menunjuk ke website lama; pindahkan ke /public jika pemilik setuju.
  cvUrl: 'https://portofolio-fatimatul-ayunda.netlify.app/CV_FatimatulAyunda.pdf',
};

export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Process', href: '#process' },
  ] satisfies Link[],
  cta: { label: 'Let’s Talk ↗', href: '#contact' } satisfies Link,
  theme: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
};

export const footer = {
  copyright: '© 2026 Fatimatul Ayunda',
  built: 'Built with Next.js & GSAP',
  links: [
    { label: 'Email', href: `mailto:${site.email}` },
    { label: 'LinkedIn', href: site.linkedin.href },
    { label: 'CV (PDF)', href: site.cvUrl },
  ] satisfies Link[],
};
