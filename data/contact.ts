// Konten section Contact (sumber: design/mockup-source/index.html, section .contact).
import type { TitlePart } from './types';
import { site } from './site';

/** kartu kontak miring; x/y/w = posisi di panggung 1440px, rotate dalam derajat */
export type ContactCard = {
  icon: string;
  title: string;
  text: string;
  href?: string;
  x: number;
  y: number;
  w: number;
  rotate: number;
};

export const contact = {
  label: 'Let’s Connect',
  /** satu array per baris judul */
  headline: [
    [{ text: 'Have a project or role in mind?' }],
    [{ text: 'Let’s build something useful together.', italic: true }],
  ] satisfies TitlePart[][],

  form: {
    name: 'Name',
    email: 'Email',
    topicLabel: 'Topic',
    topicPlaceholder: 'Topic — Choose a topic',
    topics: ['Job opportunity', 'Freelance', 'Collaboration', 'Other'],
    message: 'Message',
    submit: 'Send Message →',
    /** form memakai mailto: — membuka aplikasi email pengunjung dengan pesan yang sudah terisi */
    to: site.email,
    subject: (topic: string, name: string) => `${topic || 'Hello'} — from ${name}`,
    opened: 'Your email app should open with the message ready to send.',
  },

  cards: [
    { icon: '✉', title: 'Email', text: site.email, href: `mailto:${site.email}`, x: 130, y: 470, w: 270, rotate: -6 },
    { icon: '⌖', title: 'Location', text: site.location, x: 170, y: 720, w: 250, rotate: 4 },
    { icon: 'in', title: 'LinkedIn', text: site.linkedin.label, href: site.linkedin.href, x: 1040, y: 470, w: 270, rotate: 6 },
    { icon: '☏', title: 'Phone / WhatsApp', text: site.phone.label, href: site.phone.href, x: 1020, y: 720, w: 260, rotate: -4 },
  ] satisfies ContactCard[],
};
