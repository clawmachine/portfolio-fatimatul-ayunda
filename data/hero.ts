// Konten section Hero (sumber: design/mockup-source/index.html, bagian .hero).
import type { Link, TitlePart } from './types';
import { site } from './site';

type Glass = { icon: string; iconBg: string; iconColor?: string; label: string; sub: string };
type Avatar = { text: string; bg: string };

export const hero = {
  /** satu array per baris headline */
  headline: [
    [{ text: 'Crafting clean interfaces,' }],
    [{ text: 'solving real problems.', italic: true }],
  ] satisfies TitlePart[][],

  /** satu string per baris (pemisah baris hanya di desktop) */
  sub: [
    'Hello, I’m Fatimatul Ayunda, a Frontend Developer. I build web and mobile',
    'interfaces that are dependable, tidy, and easy to use.',
  ],

  primary: { label: 'View My Work  →', href: '#work' } satisfies Link,
  secondary: { label: 'Download CV', href: site.cvUrl } satisfies Link,

  photoAlt: 'Portrait of Fatimatul Ayunda',

  glass: {
    web: { icon: '⚛', iconBg: '#b9e86b', iconColor: '#2c3a10', label: 'Web', sub: 'React · Next.js · Tailwind' },
    qa: { icon: '✓', iconBg: '#b8a6ff', label: 'QA & Testing', sub: 'UAT, bug fixing, docs' },
    mobile: { icon: '▢', iconBg: '#ffa36b', label: 'Mobile', sub: 'React Native apps' },
  } satisfies Record<string, Glass>,

  /** panel kode gelap; k = kata kunci putih, s = komentar abu */
  code: [
    [{ t: '// budget.tsx', c: 's' }],
    [{ t: 'const', c: 'k' }, { t: ' res = ' }, { t: 'await', c: 'k' }],
    [{ t: ' api.get(url)' }],
    [{ t: 'setBudget(res)' }],
    [{ t: '// UAT ✓', c: 's' }],
  ] as { t: string; c?: 'k' | 's' }[][],

  sideLeft: {
    title: ['UI design', 'to code.'],
    text: 'Mockups in Figma, turned into faithful, reusable components.',
  },
  sideRight: {
    avatars: [
      { text: '2+', bg: '#111' },
      { text: '8', bg: '#5b8def' },
      { text: '6', bg: '#8b6cf0' },
    ] satisfies Avatar[],
    titleItalic: 'Dependable,',
    title: 'tidy & easy to use.',
    text: '2+ years · 8 apps · 6 core tools.',
  },

  badge: '• FRONTEND DEVELOPER • WEB & MOBILE ',

  clients: {
    text: ['Built products for', 'Bank BRI, Bank Papua,', 'Garuda Eleven, Ajari, Holivy.'],
    avatars: [
      { text: 'B', bg: '#0b4ea2' },
      { text: 'P', bg: '#c94b3b' },
      { text: 'G', bg: '#111' },
      { text: 'A', bg: '#1c8c5e' },
      { text: 'H', bg: '#8b6cf0' },
    ] satisfies Avatar[],
  },

  stats: ['2+ years of experience.', '8 apps delivered.'],
};
