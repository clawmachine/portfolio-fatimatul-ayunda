// Konten section Experience & Education (sumber: design/mockup-source/index.html, .tl + .edu + .langs).
import type { TitlePart } from './types';

export type Job = {
  /** tahun besar di kiri + baris italic di bawahnya + pill kecil */
  year: string;
  range: string;
  badge: string;
  /** monogram perusahaan; dark = kotak gelap */
  mono: string;
  monoDark?: boolean;
  company: string;
  place: string;
  stack: string[];
  role: TitlePart[];
  text: string;
  bullets?: string[];
  shipped?: { label: string; clients: string[] };
  /** titik timeline terisi (posisi terlama / utama) */
  highlight?: boolean;
};

export type School = {
  year: string;
  range: string;
  tag: string;
  dark?: boolean;
  school: string;
  degree: string;
  text?: string;
};

export const experience = {
  label: 'Career Journey',
  title: [{ text: 'Experience ' }, { text: '& education.', italic: true }] satisfies TitlePart[],

  jobs: [
    {
      year: '2021',
      range: 'Apr – Sep',
      badge: 'Internship',
      mono: 'bk',
      company: 'PT Bangun Kreatif Abadi',
      place: 'Indonesia',
      stack: ['React JS'],
      role: [{ text: 'Frontend Developer ' }, { text: 'Intern', italic: true }],
      text: 'Built E-Rapor Our Achievement, a platform to summarize student achievements: mockups, UI/UX, pages and API wiring.',
    },
    {
      year: '2021',
      range: '– 2024',
      badge: 'Sep 2021 – May 2024',
      mono: 'ac',
      monoDark: true,
      company: 'PT Adyatma Cendekia Sinergi Abadi',
      place: 'Indonesia',
      stack: ['Next.js', 'React Native', 'JavaScript'],
      role: [{ text: 'Frontend Developer ' }, { text: '& QA', italic: true }],
      text: 'Delivered six projects across banking, e-learning, employee benefits and gaming: CRUD pages, API integration on the client side, UAT, bug fixing and technical documentation.',
      shipped: { label: 'Shipped for', clients: ['Bank BRI', 'Bank Papua', 'Ajari', 'Holivy', 'Garuda Eleven'] },
      highlight: true,
    },
    {
      year: '2024',
      range: '– 2025',
      badge: 'Jun 2024 – Nov 2025',
      mono: 'ls',
      company: 'PT Lima Sekawan Indonesia',
      place: 'Hifefive Legal Division',
      stack: ['Excel', 'Google Workspace'],
      role: [{ text: 'Legal & Client ' }, { text: 'Consultant', italic: true }],
      text: 'Digital documentation and data management for corporate legality.',
      bullets: [
        'Created NIB (Nomor Induk Berusaha) and registered NPWP Badan for business entities.',
        'Managed client data and legal documents with Excel, Google Workspace and internal systems.',
        'Consulted clients on business legality requirements.',
      ],
    },
  ] satisfies Job[],

  educationLabel: 'Education',
  education: [
    {
      year: '2024',
      range: '– 2028',
      tag: '● Ongoing',
      dark: true,
      school: 'Binus Online University',
      degree: 'Bachelor of Information Systems',
    },
    {
      year: '2022',
      range: 'Jun – Sep',
      tag: 'Bootcamp',
      school: 'Dignitas Academy',
      degree: 'Web Developer Bootcamp',
      text: 'Built Affitto, a venue rental app: mockups, UI/UX for core features, pages and API integration. Stack: Next.js.',
    },
    {
      year: '2019',
      range: '– 2022',
      tag: 'Vocational',
      school: 'SMK Negeri 1 Kota Bekasi',
      degree: 'Software Engineering',
    },
  ] satisfies School[],

  languagesLabel: 'Languages',
  languages: [
    { code: 'id', name: 'Bahasa Indonesia', level: 'Native' },
    { code: 'en', name: 'English', level: 'Passive' },
  ],
};
