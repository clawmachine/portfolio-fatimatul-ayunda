// Konten section Process (sumber: design/mockup-source/index.html, .proc).
import type { TitlePart } from './types';

export const workProcess = {
  label: 'My Process',
  title: [{ text: 'How I build ' }, { text: 'a feature.', italic: true }] satisfies TitlePart[],
  steps: [
    { no: '01', title: 'Understand', text: 'Break down requirements and user flows with the team.' },
    { no: '02', title: 'Design', text: 'Turn requirements into mockups and UI flows in Figma.' },
    { no: '03', title: 'Build', text: 'Build responsive pages and connect them to the APIs.' },
    { no: '04', title: 'Test', text: 'Run UAT, report bugs and fix them before release.' },
    { no: '05', title: 'Document', text: 'Write technical docs that help the next developer.' },
  ],
};
