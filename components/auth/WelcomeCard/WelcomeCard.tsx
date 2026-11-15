'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import type { User } from '@/lib/auth';
import { authCopy } from '@/data/auth';
import Avatar from '@/components/auth/Avatar/Avatar';
import s from './WelcomeCard.module.css';

/** Kartu kaca "Welcome back, {firstName}" di baris tombol hero setelah login. */
export default function WelcomeCard({ user }: { user: User }) {
  const ref = useRef<HTMLDivElement>(null);

  // Muncul: naik + membesar dengan sedikit pantulan.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          ref.current,
          { y: 24, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)', delay: 0.15 },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={s.welcome} role="status">
      <Avatar user={user} size={44} />
      <div>
        <b>{authCopy.welcome.title(user.firstName || user.username)}</b>
        <small>{authCopy.welcome.sub}</small>
      </div>
    </div>
  );
}
