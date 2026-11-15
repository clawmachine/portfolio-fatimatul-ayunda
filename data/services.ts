// Konten section Services (sumber: design/mockup-source/index.html, .bento).
import type { TitlePart } from './types';

/** label kaca kecil di area visual; dot = warna titik di depan label */
export type ServiceTag = { text: string; dot?: string };

type Card = { title: TitlePart[]; text: string };

export const services = {
  label: 'What I Do',
  title: [{ text: 'Services ' }, { text: 'I offer.', italic: true }] satisfies TitlePart[],

  web: {
    title: [{ text: 'Web ' }, { text: 'development', italic: true }],
    text: 'Responsive web apps and landing pages with React, Next.js and Tailwind.',
    stack: { text: 'React · Next.js · Tailwind', dot: '#b9e86b' } satisfies ServiceTag,
    badge: { text: 'Responsive' } satisfies ServiceTag,
  } satisfies Card & Record<string, unknown>,

  design: {
    title: [{ text: 'UI design ' }, { text: 'to code', italic: true }],
    text: 'Mockups and UI flows in Figma, turned into faithful, reusable components.',
    tool: { text: 'Figma', dot: '#ffa36b' } satisfies ServiceTag,
    frameLabel: 'Frame · Button / Primary',
    /** potongan kode; k = tag/atribut terang, c = komentar */
    code: [
      [{ t: '// reusable', c: 'c' }],
      [{ t: '<Button', c: 'k' }, { t: ' variant=' }, { t: '"primary"', c: 'k' }, { t: '>', c: 'k' }],
      [{ t: '  View My Work' }],
      [{ t: '</Button>', c: 'k' }],
    ] as { t: string; c?: 'k' | 'c' }[][],
  } satisfies Card & Record<string, unknown>,

  mobile: {
    title: [{ text: 'Mobile ' }, { text: 'apps', italic: true }],
    text: 'Cross-platform features with React Native, from sign-up flows to budgeting.',
    tool: { text: 'React Native', dot: '#5b8def' } satisfies ServiceTag,
    screens: ['Budget', 'Sign up'],
  } satisfies Card & Record<string, unknown>,

  qa: {
    title: [{ text: 'QA ' }, { text: '& testing', italic: true }],
    text: 'User acceptance testing, bug reporting and fixing, and technical documentation.',
    checks: [
      { task: 'Register flow', project: 'Holivy', status: 'Passed' },
      { task: 'Forgot password', project: 'Holivy', status: 'Passed' },
      { task: 'Quest workflow', project: 'Garuda Eleven CMS', status: 'Fixed' },
      { task: 'Technical documentation', project: 'Garuda Eleven CMS', status: 'Done' },
    ],
  } satisfies Card & Record<string, unknown>,
};
