// Konten section Tools & Skills (sumber: design/mockup-source/index.html, .orbit).
import type { TitlePart } from './types';

/**
 * Satu tool di orbit. x/y = titik tengah dalam kanvas orbit 1200×720 (mockup).
 * logo = file di public/logos/; jika file belum ada, monogram yang tampil.
 */
export type Tool = { name: string; mono: string; logo: string; x: number; y: number; dark?: boolean };

export const tools = {
  label: 'Tools & Skills',
  title: [{ text: 'Technologies ' }, { text: 'I use.', italic: true }] satisfies TitlePart[],
  lead: 'Six tools I reach for every day, plus the stack I’ve shipped with across full-stack projects.',

  core: { value: '6', label: 'core tools', note: '+ 6 more in my stack' },

  /** label kecil di atas ring */
  ringLabels: {
    inner: { text: 'Daily', x: 600, y: 170 },
    outer: { text: 'Also shipped with', x: 740, y: 46 },
  },

  /** ring dalam: 6 tools inti */
  inner: [
    { name: 'React JS', mono: 'Re', logo: '/logos/react.svg', x: 450, y: 195 },
    { name: 'Next.js', mono: 'Nx', logo: '/logos/nextjs.svg', x: 750, y: 195, dark: true },
    { name: 'React Native', mono: 'RN', logo: '/logos/react-native.svg', x: 900, y: 360 },
    { name: 'Tailwind', mono: 'Tw', logo: '/logos/tailwind.svg', x: 750, y: 525 },
    { name: 'Figma', mono: 'Fg', logo: '/logos/figma.svg', x: 450, y: 525, dark: true },
    { name: 'Git', mono: 'Gt', logo: '/logos/git.svg', x: 300, y: 360 },
  ] satisfies Tool[],

  /** ring luar: stack lain yang pernah dipakai */
  outer: [
    { name: 'PHP', mono: 'Php', logo: '/logos/php.svg', x: 506, y: 45 },
    { name: 'CodeIgniter', mono: 'CI', logo: '/logos/codeigniter.svg', x: 1014, y: 154 },
    { name: 'Golang', mono: 'Go', logo: '/logos/golang.svg', x: 1107, y: 469 },
    { name: 'Node.js', mono: 'Nd', logo: '/logos/nodejs.svg', x: 694, y: 675 },
    { name: 'NestJS', mono: 'Ns', logo: '/logos/nestjs.svg', x: 186, y: 566 },
    { name: 'MySQL', mono: 'Sq', logo: '/logos/mysql.svg', x: 93, y: 251 },
  ] satisfies Tool[],
};
