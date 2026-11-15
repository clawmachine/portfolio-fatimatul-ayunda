'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** pusat dan jari-jari elips di kanvas 1200×720 (sama dengan svg di Tools.tsx) */
const CENTER = { x: 600, y: 360 };
const RINGS = {
  inner: { rx: 300, ry: 190, turn: Math.PI * 2, duration: 110 }, // searah jarum jam
  outer: { rx: 540, ry: 320, turn: -Math.PI * 2, duration: 160 }, // berlawanan arah
} as const;
type RingName = keyof typeof RINGS;

type Item = {
  el: HTMLElement;
  ring: RingName;
  x0: number;
  y0: number;
  /** jarak & sudut awal dalam ruang elips (ikon di mockup tidak persis di garis elips) */
  r: number;
  theta: number;
  /** 0 = di tengah, 1 = di orbit (dianimasikan saat intro) */
  k: number;
  setX: (v: number) => void;
  setY: (v: number) => void;
};

/**
 * Animasi orbit Tools (CLAUDE.md bagian 6, prioritas 1):
 * - Intro saat pertama terlihat: ring & inti membesar, ikon menyebar dari tengah ke posisinya.
 * - Loop: ring dalam dan luar berputar pelan berlawanan arah. Posisi ikon dihitung di sepanjang
 *   elips setiap frame, jadi ikon tetap tegak. Loop hanya jalan saat section terlihat.
 * - HP (< 900px): orbit diganti grid, jadi cukup muncul bergantian.
 * - prefers-reduced-motion: tidak ada animasi.
 */
export default function ToolsMotion({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const mm = gsap.matchMedia();

      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as Record<string, boolean>;
          if (!motion) return;

          const q = gsap.utils.selector(root);
          const tiles = q<HTMLElement>('[data-tile]');
          const core = q<HTMLElement>('[data-core]');
          const labels = q<HTMLElement>('[data-ring-label]');
          const rings = q<SVGEllipseElement>('[data-rings] ellipse');

          /* ---------- HP: muncul bergantian ---------- */
          if (!desktop) {
            gsap.from([...core, ...labels, ...tiles], {
              y: 24,
              scale: 0.9,
              autoAlpha: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.05,
              scrollTrigger: { trigger: root, start: 'top 80%', once: true },
            });
            return;
          }

          /* ---------- desktop: orbit ---------- */
          // Elemen ini dipusatkan CSS dengan translate(-50%, -50%); GSAP mengambil alih dengan nilai yang sama.
          gsap.set([...tiles, ...core, ...labels], { xPercent: -50, yPercent: -50 });

          const angle: Record<RingName, number> = { inner: 0, outer: 0 };
          const items: Item[] = tiles.map((el) => {
            const ring = el.dataset.ring as RingName;
            const x0 = Number(el.dataset.x);
            const y0 = Number(el.dataset.y);
            const u = (x0 - CENTER.x) / RINGS[ring].rx;
            const v = (y0 - CENTER.y) / RINGS[ring].ry;
            return {
              el,
              ring,
              x0,
              y0,
              r: Math.hypot(u, v),
              theta: Math.atan2(v, u),
              k: 0,
              setX: gsap.quickSetter(el, 'x', 'px') as (v: number) => void,
              setY: gsap.quickSetter(el, 'y', 'px') as (v: number) => void,
            };
          });

          const render = () => {
            for (const it of items) {
              const { rx, ry } = RINGS[it.ring];
              const a = it.theta + angle[it.ring];
              it.setX(CENTER.x + it.k * rx * it.r * Math.cos(a) - it.x0);
              it.setY(CENTER.y + it.k * ry * it.r * Math.sin(a) - it.y0);
            }
          };
          render(); // semua ikon mulai di tengah

          // Intro sekali saat orbit mulai terlihat.
          const intro = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 70%', once: true } });
          intro
            .from(rings, { scale: 0.7, autoAlpha: 0, transformOrigin: '50% 50%', duration: 1.2, ease: 'power3.out', stagger: 0.12 }, 0)
            .from(core, { scale: 0.6, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.6)' }, 0.1)
            .to(items, { k: 1, duration: 1.4, ease: 'power3.out', stagger: 0.06 }, 0.3)
            .fromTo(
              tiles,
              { scale: 0.4, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.06 },
              0.3,
            )
            .from(labels, { y: 10, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, 1)
            .eventCallback('onUpdate', render);

          // Putaran pelan; hanya berjalan selama section terlihat.
          const loops = (Object.keys(RINGS) as RingName[]).map((name) =>
            gsap.to(angle, { [name]: RINGS[name].turn, duration: RINGS[name].duration, ease: 'none', repeat: -1, paused: true }),
          );
          let ticking = false;
          const setRunning = (on: boolean) => {
            if (on === ticking) return;
            ticking = on;
            loops.forEach((l) => (on ? l.resume() : l.pause()));
            if (on) gsap.ticker.add(render);
            else gsap.ticker.remove(render);
          };
          const visible = ScrollTrigger.create({
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => setRunning(self.isActive),
          });
          setRunning(visible.isActive);

          return () => gsap.ticker.remove(render);
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
