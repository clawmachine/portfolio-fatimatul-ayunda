'use client';

import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * Semua animasi Hero (CLAUDE.md bagian 6):
 * 1. Intro timeline saat halaman dibuka
 * 2. Kartu melayang naik-turun (loop) + badge berputar (loop)
 * 3. Scroll-out (scrub): kartu menyebar, foto mengecil       — desktop ≥ 900px
 * 4. Parallax mengikuti mouse                                 — desktop + pointer halus
 * Semua hanya jalan bila prefers-reduced-motion: no-preference.
 */
export function useHeroMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      const reveal = () => section.removeAttribute('data-intro');
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 900px)',
          finePointer: '(hover: hover) and (pointer: fine)',
        },
        (ctx) => {
          const { motion, desktop, finePointer } = ctx.conditions as Record<string, boolean>;

          // Reduced motion: tampilkan semuanya tanpa animasi.
          if (!motion) {
            reveal();
            return;
          }

          const q = gsap.utils.selector(section);
          const lines = q('[data-line]');
          const sub = q('[data-sub]');
          const btns = q('[data-btn]');
          const photo = q<HTMLElement>('[data-photo]')[0];
          const layers = q<HTMLElement>('[data-layer]').filter((el) => el.offsetParent !== null);
          const motions = layers.map((l) => l.querySelector<HTMLElement>('[data-motion]')!);
          const ringPath = q<SVGPathElement>('[data-ring] path')[0];
          const badge = q('[data-badge]');
          const spin = q('[data-spin]');
          const corners = q('[data-corner]');

          // Arah tiap kartu relatif ke tengah foto → dipakai untuk "masuk dari luar" dan "menyebar".
          const pr = photo.getBoundingClientRect();
          const cx = pr.left + pr.width / 2;
          const cy = pr.top + pr.height * 0.4;
          const dirs = layers.map((l) => {
            const r = l.getBoundingClientRect();
            const dx = r.left + r.width / 2 - cx;
            const dy = r.top + r.height / 2 - cy;
            const len = Math.hypot(dx, dy) || 1;
            return { x: dx / len, y: dy / len };
          });

          // Foto dipusatkan oleh CSS (translateX(-50%)); GSAP mengambil alih dengan nilai yang sama.
          gsap.set(photo, { xPercent: -50, x: 0 });

          /* ---------- 1. INTRO ---------- */
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          tl.from(lines, { yPercent: 140, duration: 1.1, ease: 'power4.out', stagger: 0.12 })
            .from(sub, { y: 24, autoAlpha: 0, duration: 0.9 }, 0.45)
            .from(btns, { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.6)
            .from(photo, { y: 80, autoAlpha: 0, duration: 1.2 }, 0.7)
            .from(
              motions,
              {
                x: (i) => dirs[i].x * 160,
                y: (i) => dirs[i].y * 120 + 40,
                scale: 0.9,
                autoAlpha: 0,
                duration: 1.1,
                stagger: 0.08,
              },
              0.95,
            )
            .from(corners, { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 1.3)
            .from(badge, { scale: 0.6, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.7)' }, 1.3);

          // Garis lengkung "tergambar": dash sepanjang path digeser dari penuh ke 0.
          if (ringPath && desktop) {
            const len = ringPath.getTotalLength();
            tl.fromTo(
              ringPath,
              { strokeDasharray: len, strokeDashoffset: len },
              { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' },
              1,
            );
          }

          // Sembunyikan-sementara via CSS dilepas: GSAP sekarang memegang keadaan awal elemen.
          reveal();

          /* ---------- 2. LOOP: kartu melayang + badge berputar ---------- */
          tl.to(
            motions,
            {
              y: (i) => -(6 + (i % 3) * 2),
              duration: 2.4,
              ease: 'sine.inOut',
              stagger: { each: 0.3, from: 'random', repeat: -1, yoyo: true },
            },
            '>-0.1',
          );
          gsap.to(spin, { rotation: 360, svgOrigin: '65 65', duration: 18, ease: 'none', repeat: -1 });

          if (!desktop) return;

          /* ---------- 3. SCROLL-OUT ---------- */
          const out = gsap.timeline({
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 },
          });
          out
            .fromTo(
              layers,
              { xPercent: 0, yPercent: 0 },
              { xPercent: (i) => dirs[i].x * 45, yPercent: (i) => dirs[i].y * 45 - 20, ease: 'none' },
              0,
            )
            .to(photo, { scale: 0.9, transformOrigin: '50% 100%', ease: 'none' }, 0);

          /* ---------- 4. PARALLAX MOUSE ---------- */
          if (!finePointer) return;
          const movers = layers.map((el) => {
            const depth = Number(el.dataset.depth ?? 1);
            return {
              depth,
              x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
              y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' }),
            };
          });
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            movers.forEach((m) => {
              m.x(nx * 28 * m.depth);
              m.y(ny * 20 * m.depth);
            });
          };
          const onLeave = () => movers.forEach((m) => (m.x(0), m.y(0)));
          section.addEventListener('pointermove', onMove);
          section.addEventListener('pointerleave', onLeave);
          return () => {
            section.removeEventListener('pointermove', onMove);
            section.removeEventListener('pointerleave', onLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope },
  );
}
