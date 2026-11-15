import { Fragment, type ReactNode } from 'react';
import type { TitlePart } from '@/data/types';

/** Bungkus tiap kata dengan <span data-word> (untuk animasi per kata); spasi tetap teks biasa. */
function splitWords(text: string): ReactNode[] {
  return text.split(/(\s+)/).map((w, i) => (w.trim() ? <span key={i} data-word>{w}</span> : w));
}

/**
 * Menampilkan TitlePart[]; bagian italic dibungkus <em>. Tidak punya gaya sendiri.
 * words = true → setiap kata dibungkus span [data-word] untuk animasi GSAP.
 */
export default function RichTitle({ parts, words = false }: { parts: TitlePart[]; words?: boolean }) {
  return (
    <>
      {parts.map((p, i) => {
        const content = words ? splitWords(p.text) : p.text;
        return p.italic ? <em key={i}>{content}</em> : <Fragment key={i}>{content}</Fragment>;
      })}
    </>
  );
}
