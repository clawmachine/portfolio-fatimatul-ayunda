// Konten section About (sumber: design/mockup-source/index.html, section "About Me" + .sbento).
import type { Link, TitlePart } from './types';

/** kotak singkatan project; dark = kotak gelap */
type Tile = { abbr: string; name: string; dark?: boolean };
/** monogram di orbit mini; posisi dalam kotak 200×140 (mockup .morb) */
type OrbitTool = { abbr: string; name: string; x: number; y: number; dark?: boolean };

export const about = {
  label: 'About Me',
  title: [{ text: 'Hello, I’m ' }, { text: 'Fatimatul Ayunda.', italic: true }] satisfies TitlePart[],

  photoAlt: 'Black and white portrait of Fatimatul Ayunda',
  location: { icon: '⌖', iconBg: '#141414', label: 'Location', sub: 'Indonesia' },

  statement: [{ text: 'Crafting clean interfaces, ' }, { text: 'solving real problems.', italic: true }] satisfies TitlePart[],
  paragraphs: [
    'I’m a frontend developer with over two years of programming experience, building interfaces for banking tools, an e-learning platform, an employee-benefits app and a card-game platform.',
    'I enjoy exploring new technologies and keep sharpening my skills. I’m creative in problem-solving and work well in project teams. I’m currently studying Information Systems at Binus Online University.',
  ],
  link: { label: 'See My Experience →', href: '#experience' } satisfies Link,

  years: {
    tag: 'Since 2021',
    value: '2+',
    unit: 'years',
    caption: ['building interfaces for banking,', 'e-learning, benefits and gaming.'],
    /** titik timeline; pos dalam persen lebar garis, garis terang terisi sampai `filled` */
    timeline: [
      { label: '2021', pos: 0 },
      { label: '2022', pos: 26 },
      { label: '2023', pos: 52 },
      { label: '2024', pos: 78 },
      { label: 'next', pos: 100, next: true },
    ],
    filled: 78,
  },

  projects: {
    value: '8',
    label: 'projects delivered',
    sub: 'Banking to gaming',
    tiles: [
      { abbr: 'BRI', name: 'WorkBench Bank BRI', dark: true },
      { abbr: 'BP', name: 'Bank Papua' },
      { abbr: 'AJ', name: 'Ajari E-Learning' },
      { abbr: 'HV', name: 'Holivy NWP VM' },
      { abbr: 'GE', name: 'Garuda Eleven Landing Page' },
      { abbr: 'CMS', name: 'Garuda Eleven CMS', dark: true },
      { abbr: 'AF', name: 'Affitto' },
      { abbr: 'ER', name: 'E-Rapor' },
    ] satisfies Tile[],
  },

  tools: {
    value: '6',
    label: 'core tools',
    sub: 'Daily stack',
    center: '✦',
    orbit: [
      { abbr: 'Re', name: 'React', x: 100, y: 18 },
      { abbr: 'Nx', name: 'Next.js', x: 171, y: 44, dark: true },
      { abbr: 'RN', name: 'React Native', x: 171, y: 96 },
      { abbr: 'Tw', name: 'Tailwind CSS', x: 100, y: 122 },
      { abbr: 'Fg', name: 'Figma', x: 29, y: 96, dark: true },
      { abbr: 'Gt', name: 'Git', x: 29, y: 44 },
    ] satisfies OrbitTool[],
  },
};
