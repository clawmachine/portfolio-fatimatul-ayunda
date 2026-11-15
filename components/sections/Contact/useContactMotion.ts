'use client';

import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * Animasi Contact (CLAUDE.md bagian 6, prioritas 3):
 * 1. Saat section terlihat: chip → headline naik per baris dari balik mask → form naik →
 *    kartu kontak masuk dari samping (kiri dari kiri, kanan dari kanan) → garis lengkung tergambar.
 *    HP: kartu cukup naik bergantian, garis disembunyikan CSS.
 * 2. Tombol "Send Message" magnetic: ikut bergeser sedikit ke arah kursor (desktop + pointer halus).
 * Semua hanya jalan bila prefers-reduced-motion: no-preference.
 */
export function useContactMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 900px)',
          finePointer: '(hover: hover) and (pointer: fine)',
        },
        (ctx) => {
          const { motion, desktop, finePointer } = ctx.conditions as Record<string, boolean>;
          if (!motion) return;

          const q = gsap.utils.selector(section);
          const cards = q<HTMLElement>('[data-card-motion]');

          /* ---------- 1. masuk ---------- */
          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: section, start: 'top 65%', once: true },
          });
          tl.from(q('[data-chip] > *'), { y: 20, autoAlpha: 0, duration: 0.7 }, 0)
            .from(q('[data-line]'), { yPercent: 120, duration: 1.1, ease: 'power4.out', stagger: 0.12 }, 0.1)
            .from(q('form'), { y: 60, autoAlpha: 0, duration: 1 }, 0.45);

          if (desktop) {
            tl.from(
              cards,
              {
                x: (_i: number, el: HTMLElement) => (el.dataset.side === 'left' ? -180 : 180),
                rotate: (_i: number, el: HTMLElement) => (el.dataset.side === 'left' ? -10 : 10),
                autoAlpha: 0,
                duration: 1.1,
                stagger: 0.1,
              },
              0.6,
            );
            // garis lengkung tergambar dari kiri ke kanan
            const path = q<SVGPathElement>('[data-ring] path')[0];
            const len = path.getTotalLength();
            tl.fromTo(
              path,
              { strokeDasharray: len, strokeDashoffset: len },
              { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' },
              0.5,
            );
          } else {
            tl.from(cards, { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.7);
          }

          /* ---------- 2. tombol magnetic ---------- */
          if (!desktop || !finePointer) return;
          const btn = q<HTMLElement>('[data-magnetic]')[0];
          const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
          const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
          const onMove = (e: PointerEvent) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.12);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
          };
          // kembali ke tengah lewat quickTo yang sama (tween lain dengan overwrite akan mematikan quickTo)
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          btn.addEventListener('pointermove', onMove);
          btn.addEventListener('pointerleave', onLeave);
          return () => {
            btn.removeEventListener('pointermove', onMove);
            btn.removeEventListener('pointerleave', onLeave);
          };
        },
      );
    },
    { scope },
  );
}
