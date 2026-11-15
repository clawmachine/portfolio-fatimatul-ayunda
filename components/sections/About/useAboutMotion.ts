'use client';

import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** elips orbit mini di kotak 200×140 (sama dengan svg di About.tsx) */
const MINI = { cx: 100, cy: 70, rx: 82, ry: 52, duration: 40 };

/**
 * Animasi About (CLAUDE.md bagian 6, prioritas 2):
 * 1. Kalimat besar terungkap per kata mengikuti scroll (opacity, scrub)
 * 2. Foto & paragraf masuk halus
 * 3. Kartu statistik: count-up 2+ / 8 / 6, garis tahun terisi + titik muncul,
 *    kotak project muncul satu per satu
 * 4. Orbit mini "6 core tools" berputar terus (hanya saat terlihat)
 * Semua hanya jalan bila prefers-reduced-motion: no-preference.
 */
export function useAboutMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(section);

        /* 1. kalimat besar per kata */
        gsap.fromTo(
          q('[data-statement] [data-word]'),
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: q('[data-statement]')[0], start: 'top 85%', end: 'bottom 50%', scrub: true },
          },
        );

        /* 2. foto + paragraf */
        gsap.from(q('[data-portrait]'), {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: q('[data-portrait]')[0], start: 'top 85%', once: true },
        });
        gsap.from(q('[data-intro-text]'), {
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: q('[data-statement]')[0], start: 'top 75%', once: true },
        });

        /* 3. kartu statistik */
        const cards = q('[data-stat]');
        const counters = q<HTMLElement>('[data-count]');
        const stats = gsap.timeline({ scrollTrigger: { trigger: q('[data-stats]')[0], start: 'top 80%', once: true } });
        stats
          .from(cards, { y: 50, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, 0)
          .from(
            counters,
            {
              textContent: 0,
              duration: 1.4,
              ease: 'power2.out',
              snap: { textContent: 1 },
              stagger: 0.12,
            },
            0.2,
          )
          .from(q('[data-fill]'), { width: 0, duration: 1.4, ease: 'power2.inOut' }, 0.35)
          .from(q('[data-ydot]'), { scale: 0, duration: 0.4, ease: 'back.out(3)', stagger: 0.25 }, 0.35)
          .from(q('[data-ylabel]'), { autoAlpha: 0, y: 6, duration: 0.4, stagger: 0.25 }, 0.4)
          .from(q('[data-ptile]'), { scale: 0.5, autoAlpha: 0, duration: 0.5, ease: 'back.out(2)', stagger: 0.07 }, 0.45)
          .from(q('[data-morb-center]'), { scale: 0, duration: 0.6, ease: 'back.out(2)' }, 0.5)
          .from(q('[data-orb]'), { scale: 0, autoAlpha: 0, duration: 0.5, ease: 'back.out(2)', stagger: 0.07 }, 0.6);

        /* 4. orbit mini: ikon bergerak di sepanjang elips, tetap tegak */
        const orbs = q<HTMLElement>('[data-orb]');
        gsap.set(orbs, { xPercent: -50, yPercent: -50 });
        const angle = { a: 0 };
        const items = orbs.map((el) => {
          const x0 = Number(el.dataset.x);
          const y0 = Number(el.dataset.y);
          const u = (x0 - MINI.cx) / MINI.rx;
          const v = (y0 - MINI.cy) / MINI.ry;
          return {
            x0,
            y0,
            r: Math.hypot(u, v),
            theta: Math.atan2(v, u),
            setX: gsap.quickSetter(el, 'x', 'px') as (v: number) => void,
            setY: gsap.quickSetter(el, 'y', 'px') as (v: number) => void,
          };
        });
        const render = () => {
          for (const it of items) {
            const a = it.theta + angle.a;
            it.setX(MINI.cx + MINI.rx * it.r * Math.cos(a) - it.x0);
            it.setY(MINI.cy + MINI.ry * it.r * Math.sin(a) - it.y0);
          }
        };
        const loop = gsap.to(angle, { a: Math.PI * 2, duration: MINI.duration, ease: 'none', repeat: -1, paused: true, onUpdate: render });
        const morb = q('[data-morb]')[0];
        const visible = ScrollTrigger.create({
          trigger: morb,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
        });
        if (visible.isActive) loop.resume();
      });
    },
    { scope },
  );
}
