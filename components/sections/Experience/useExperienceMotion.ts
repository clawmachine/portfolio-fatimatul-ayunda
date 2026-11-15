'use client';

import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/**
 * Animasi Experience & Education (CLAUDE.md bagian 6):
 * 1. Garis timeline tumbuh mengikuti scroll (scaleY, scrub)                       — prioritas 1
 * 2. Titik terisi saat ujung garis melewatinya (dan kosong lagi saat scroll balik) — prioritas 1
 * 3. Tahun masuk dari kiri, kartu dari kanan (HP: naik dari bawah)                — prioritas 1
 * 4. Kartu tiket pendidikan masuk miring lalu tegak                               — prioritas 3
 * Semua hanya jalan bila prefers-reduced-motion: no-preference.
 */
export function useExperienceMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as Record<string, boolean>;
          if (!motion) return;

          const q = gsap.utils.selector(section);
          const timeline = q<HTMLElement>('[data-timeline]')[0];
          const rail = q('[data-rail]');
          const rows = q<HTMLElement>('[data-row]');

          // Titik mulai kosong; CSS mengisinya lewat [data-passed].
          timeline.setAttribute('data-anim', '');

          /* 1. garis tumbuh: ujungnya mengikuti garis 70% tinggi layar */
          gsap.fromTo(
            rail,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: { trigger: timeline, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
            },
          );

          rows.forEach((row) => {
            const year = row.querySelector('[data-year]');
            const card = row.querySelector('[data-card]');
            const dot = row.querySelector<HTMLElement>('[data-dot]')!;

            /* 2. titik terisi saat dilewati */
            ScrollTrigger.create({
              trigger: dot,
              start: 'center 70%',
              onEnter: () => {
                dot.setAttribute('data-passed', '');
                gsap.fromTo(dot, { scale: 0.5 }, { scale: 1, duration: 0.5, ease: 'back.out(3)', overwrite: true });
              },
              onLeaveBack: () => dot.removeAttribute('data-passed'),
            });

            /* 3. tahun dan kartu masuk dari arah berlawanan */
            const enter = { trigger: row, start: 'top 82%', once: true };
            gsap.from(year, {
              x: desktop ? -60 : 0,
              y: desktop ? 0 : 20,
              autoAlpha: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: enter,
            });
            gsap.from(card, {
              x: desktop ? 60 : 0,
              y: desktop ? 0 : 40,
              autoAlpha: 0,
              duration: 0.9,
              delay: 0.08,
              ease: 'power3.out',
              scrollTrigger: enter,
            });
          });

          /* 4. tiket pendidikan: miring lalu tegak, bergantian */
          gsap.from(q('[data-ticket]'), {
            y: 70,
            rotate: (i: number) => (i % 2 ? 5 : -5),
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: q('[data-edu]')[0], start: 'top 82%', once: true },
          });
          gsap.from(q('[data-langs]'), {
            y: 20,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: q('[data-langs]')[0], start: 'top 92%', once: true },
          });

          return () => {
            timeline.removeAttribute('data-anim');
            q('[data-dot]').forEach((d) => d.removeAttribute('data-passed'));
          };
        },
      );
    },
    { scope },
  );
}
