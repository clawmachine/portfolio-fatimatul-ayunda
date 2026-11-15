'use client';

import { useRef, useSyncExternalStore } from 'react';
import { nav } from '@/data/site';
import { gsap } from '@/lib/gsap';
import { applyTheme, currentTheme, subscribeTheme, type Theme } from '@/lib/theme';
import s from './ThemeToggle.module.css';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Tombol bulat ganti tema terang/gelap di Nav.
 * - Ikon (matahari/bulan) dipilih lewat CSS dari data-theme, jadi tidak ada beda render server/klien.
 * - Saat diklik: tema baru menyebar melingkar dari tombol (View Transition API), ikon berputar masuk.
 *   Browser tanpa View Transition atau reduced motion: tema langsung berganti.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  // Tema yang tampil (pilihan tersimpan atau sistem); null di server.
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => null);

  // Ikon tema baru berputar masuk.
  const spinIcon = (next: Theme) => {
    const icon = btnRef.current?.querySelector(`.${next === 'dark' ? s.moon : s.sun}`);
    if (icon) gsap.fromTo(icon, { rotate: -90, scale: 0.4, autoAlpha: 0 }, { rotate: 0, scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)' });
  };

  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    const set = () => applyTheme(next);

    if (reduceMotion()) {
      set();
      return;
    }
    if (!document.startViewTransition) {
      set();
      spinIcon(next);
      return;
    }

    // Lingkaran tema baru membesar dari tengah tombol sampai menutup layar.
    const r = btnRef.current!.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(set);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
        );
        spinIcon(next);
      })
      .catch(() => {});
  };

  const label = theme === 'dark' ? nav.theme.toLight : nav.theme.toDark;

  return (
    <button
      ref={btnRef}
      type="button"
      className={className ? `${s.toggle} ${className}` : s.toggle}
      onClick={toggle}
      aria-label={label}
      title={label}
      data-theme-toggle
    >
      {/* matahari: tampil di tema terang */}
      <svg className={s.sun} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </svg>
      {/* bulan: tampil di tema gelap */}
      <svg className={s.moon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
