// Semua project dari portofolio dan CV Fatimatul Ayunda.
// Teks yang dibungkus { italic: true } tampil dengan serif italic.

import type { TitlePart } from './types';

export type { TitlePart };

export type MockKind =
  | 'workbench'
  | 'inventory'
  | 'quiz'
  | 'mobile'
  | 'game'
  | 'cms'
  | 'venue'
  | 'report';

export type Badge = {
  icon: string;
  color: string;
  iconColor?: string;
  label: string;
  sub: string;
  side: 'left' | 'right';
};

export type Project = {
  id: string;
  short: TitlePart[]; // judul pendek di penghitung kanan atas
  title: TitlePart[]; // judul lengkap di kartu
  org: string;
  year: string;
  description: string;
  contributions: string[];
  stack: string[];
  mock: MockKind;
  badge: Badge;
  /** isi panel case study (terbuka setelah login) */
  caseStudy: { built: string[]; apis: string[] };
  dark?: boolean;
  image?: string; // opsional: path screenshot asli di /public, menggantikan mock
};

const ADYATMA = 'PT Adyatma Cendekia Sinergi Abadi';

export const projects: Project[] = [
  {
    id: 'workbench-bri',
    short: [{ text: 'WorkBench ' }, { text: 'BRI', italic: true }],
    title: [{ text: 'WorkBench ' }, { text: 'Bank BRI', italic: true }],
    org: ADYATMA,
    year: '2021–2024',
    description: 'An internal application for client management at Bank BRI.',
    contributions: [
      'Built pages to create, edit, delete, and list Account Planning, Customer Tagging, and Approval Monitoring modules.',
      'Integrated APIs for Account Planning details, Customer Tagging, and Approval Monitoring.',
    ],
    stack: ['PHP CodeIgniter', 'JavaScript'],
    caseStudy: {
      built: [
        'Pages to create, edit, delete, and list Account Planning, Customer Tagging, and Approval Monitoring.',
      ],
      apis: [
        'Account Planning details, Customer Tagging, and Approval Monitoring.',
      ],
    },
    mock: 'workbench',
    badge: { icon: '✓', color: '#141414', label: 'CRUD', sub: 'List, create, edit, delete', side: 'right' },
  },
  {
    id: 'bank-papua',
    short: [{ text: 'Bank ' }, { text: 'Papua', italic: true }],
    title: [{ text: 'Bank ' }, { text: 'Papua', italic: true }],
    org: ADYATMA,
    year: '2021–2024',
    description: 'An internal application to manage the bank’s inventory and supplies.',
    contributions: [
      'Built pages to list and perform CRUD operations for Master Items, Storage, and Inventory modules.',
      'Integrated APIs for Master Items, Storage, and Inventory management.',
    ],
    stack: ['Next.js'],
    caseStudy: {
      built: [
        'List and CRUD pages for the Master Items, Storage, and Inventory modules.',
      ],
      apis: [
        'Master Items, Storage, and Inventory management.',
      ],
    },
    mock: 'inventory',
    badge: { icon: '▤', color: '#5b8def', label: 'API', sub: 'Items, storage, stock', side: 'right' },
  },
  {
    id: 'ajari',
    short: [{ text: 'Ajari', italic: true }],
    title: [{ text: 'Ajari', italic: true }, { text: ' E-Learning' }],
    org: ADYATMA,
    year: '2021–2024',
    description: 'An e-learning app that supports students’ education.',
    contributions: [
      'Developed Dashboard, Quiz, and Group List pages with API integration.',
      'Reported and fixed bugs to improve app functionality.',
    ],
    stack: ['Next.js', 'Golang'],
    caseStudy: {
      built: [
        'Dashboard, Quiz, and Group List pages.',
        'Bug reports and fixes to improve app functionality.',
      ],
      apis: [
        'Dashboard, Quiz, and Group List data.',
      ],
    },
    mock: 'quiz',
    badge: { icon: '✦', color: '#b8a6ff', label: 'Dashboard', sub: 'Quiz and group list', side: 'left' },
  },
  {
    id: 'holivy',
    short: [{ text: 'Holivy ' }, { text: 'NWP VM', italic: true }],
    title: [{ text: 'Holivy ' }, { text: 'NWP VM', italic: true }],
    org: ADYATMA,
    year: '2021–2024',
    description: 'A personal growth and employee benefits management app.',
    contributions: [
      'Developed and implemented the Budget feature, including API integration.',
      'Built and integrated APIs for Register and Forgot Password flows.',
      'Conducted UAT, reported and fixed bugs to improve stability and user experience.',
    ],
    stack: ['React Native'],
    caseStudy: {
      built: [
        'The Budget feature.',
        'Register and Forgot Password flows.',
        'UAT, bug reports and fixes to improve stability and user experience.',
      ],
      apis: [
        'Budget feature.',
        'Register and Forgot Password.',
      ],
    },
    mock: 'mobile',
    badge: { icon: '✓', color: '#141414', label: 'UAT', sub: 'Features validated', side: 'left' },
  },
  {
    id: 'garuda-landing',
    short: [{ text: 'Garuda ' }, { text: 'Landing', italic: true }],
    title: [{ text: 'Garuda Eleven ' }, { text: 'Landing Page', italic: true }],
    org: ADYATMA,
    year: '2021–2024',
    description: 'A card game platform where users can buy cards and view ownership.',
    contributions: [
      'Created sections in the Dashboard page.',
      'Reported and fixed bugs, and ran User Acceptance Testing.',
    ],
    stack: ['Next.js', 'NestJS'],
    caseStudy: {
      built: [
        'Sections in the Dashboard page.',
        'Bug fixes and User Acceptance Testing.',
      ],
      apis: [],
    },
    mock: 'game',
    dark: true,
    badge: { icon: '♦', color: '#ffa36b', label: 'Dashboard', sub: 'Sections and UAT', side: 'right' },
  },
  {
    id: 'garuda-cms',
    short: [{ text: 'Garuda ' }, { text: 'CMS', italic: true }],
    title: [{ text: 'Garuda Eleven ' }, { text: 'CMS', italic: true }],
    org: ADYATMA,
    year: '2021–2024',
    description: 'Content management system for the Garuda Eleven landing page and game.',
    contributions: [
      'Built the Character Management page with API integration.',
      'Developed the Quest feature and Item Management API.',
      'Ran UAT for content workflows and wrote technical documentation.',
    ],
    stack: ['Next.js', 'NestJS'],
    caseStudy: {
      built: [
        'Character Management page.',
        'Quest feature.',
        'UAT for content workflows and technical documentation.',
      ],
      apis: [
        'Character Management.',
        'Item Management API, which I also built.',
      ],
    },
    mock: 'cms',
    badge: { icon: '⚙', color: '#141414', label: 'Quest & Item API', sub: 'Docs for the team', side: 'left' },
  },
  {
    id: 'affitto',
    short: [{ text: 'Affitto', italic: true }],
    title: [{ text: 'Affitto', italic: true }],
    org: 'Dignitas Academy Bootcamp',
    year: '2022',
    description: 'A venue rental app enabling users to book venues by location and category.',
    contributions: [
      'Designed the database schema and created initial mockups.',
      'Designed UI/UX for core features, developed pages and integrated APIs.',
    ],
    stack: ['Next.js', 'NestJS'],
    caseStudy: {
      built: [
        'Database schema and initial mockups.',
        'UI/UX for core features, and the pages for them.',
      ],
      apis: [
        'APIs for the core features.',
      ],
    },
    mock: 'venue',
    badge: { icon: '⌖', color: '#1c8c5e', label: 'Location', sub: 'By location and category', side: 'right' },
  },
  {
    id: 'e-rapor',
    short: [{ text: 'E-Rapor', italic: true }],
    title: [{ text: 'E-Rapor ' }, { text: 'Our Achievement', italic: true }],
    org: 'PT Bangun Kreatif Abadi, internship',
    year: '2021',
    description: 'A web platform to summarize and manage student achievements.',
    contributions: [
      'Created and designed the database.',
      'Created mockups and designed UI/UX, built pages and wired the API.',
    ],
    stack: ['React JS'],
    caseStudy: {
      built: [
        'Database design.',
        'Mockups, UI/UX, and pages.',
      ],
      apis: [
        'The API behind the achievement pages.',
      ],
    },
    mock: 'report',
    badge: { icon: '★', color: '#d18a1c', label: 'Report', sub: 'Achievement summary', side: 'left' },
  },
];
