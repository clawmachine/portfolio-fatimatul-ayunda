'use client';

import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * Animasi Services (CLAUDE.md bagian 6, prioritas 2):
 * - Bento: kartu naik bergantian (kartu kanan di baris yang sama sedikit terlambat).
 * - Isi kartu bergerak setelah kartunya masuk:
 *   Web    → jendela browser naik, HP menggeser masuk dari kanan, label muncul
 *   Design → frame & handle muncul, panah putus-putus "tergambar", lalu chip kode muncul
 *   Mobile → dua HP naik dari bawah
 *   QA     → baris checklist masuk satu per satu, centangnya muncul berurutan
 * Semua hanya jalan bila prefers-reduced-motion: no-preference.
 */
export function useServicesMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-service]', section);

        cards.forEach((card, i) => {
          const q = gsap.utils.selector(card);
          const tl = gsap.timeline({
            delay: i % 2 ? 0.12 : 0, // efek stagger antar kartu di baris yang sama
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: card, start: 'top 82%', once: true },
          });

          tl.from(card, { y: 60, autoAlpha: 0, duration: 0.9 });

          switch (card.dataset.service) {
            case 'web':
              tl.from(q('[data-sv="mini"]'), { y: 40, autoAlpha: 0, duration: 0.8 }, 0.25)
                .from(q('[data-sv="phone"]'), { x: 120, rotate: 8, autoAlpha: 0, duration: 1 }, 0.45)
                .from(q('[data-sv="tag"]'), { scale: 0.8, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, 0.8);
              break;
            case 'design':
              tl.from(q('[data-sv="frame"]'), { scale: 0.92, autoAlpha: 0, duration: 0.7 }, 0.25)
                .from(q('[data-sv="handle"]'), { scale: 0, duration: 0.35, stagger: 0.06, ease: 'back.out(3)' }, 0.55)
                // panah putus-putus: dibuka dari kiri ke kanan seolah tergambar
                .fromTo(
                  q('[data-sv="arrow"]'),
                  { clipPath: 'inset(0% 100% 0% 0%)' },
                  { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power2.inOut' },
                  0.85,
                )
                .from(q('[data-sv="code"]'), { y: 24, autoAlpha: 0, duration: 0.6 }, 1.4)
                .from(q('[data-sv="tag"]'), { scale: 0.8, autoAlpha: 0, duration: 0.5, ease: 'back.out(2)' }, 0.5);
              break;
            case 'mobile':
              // HP kedua punya rotate(7deg) dari CSS; GSAP membacanya dan hanya menggeser y
              tl.from(q('[data-sv="phone"]'), { y: 160, autoAlpha: 0, duration: 1, stagger: 0.15 }, 0.25)
                .from(q('[data-sv="tag"]'), { scale: 0.8, autoAlpha: 0, duration: 0.5, ease: 'back.out(2)' }, 0.7);
              break;
            case 'qa':
              tl.from(q('[data-sv="row"]'), { x: -24, autoAlpha: 0, duration: 0.6, stagger: 0.15 }, 0.3)
                .from(q('[data-sv="ck"]'), { scale: 0, rotate: -30, duration: 0.45, stagger: 0.15, ease: 'back.out(3)' }, 0.5)
                .from(q('[data-sv="status"]'), { autoAlpha: 0, x: 8, duration: 0.4, stagger: 0.15 }, 0.6);
              break;
          }
        });
      });
    },
    { scope },
  );
}
