'use client';

import { useEffect, useRef, useState } from 'react';
import { authCopy } from '@/data/auth';
import { useAuth } from '@/components/auth/AuthProvider/AuthProvider';
import Avatar from '@/components/auth/Avatar/Avatar';
import s from './UserMenu.module.css';

/** Chip avatar + nama di nav; menu berisi nama lengkap, email, dan Log out. */
export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Tutup saat klik di luar atau tekan Esc.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) return null;
  const name = user.firstName || user.username;
  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.username;

  const onLogout = () => {
    setOpen(false);
    logout();
    // Fokus pindah ke tombol Log in yang muncul lagi di nav.
    requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-nav-login]')?.focus());
  };

  return (
    <div ref={boxRef} className={s.user}>
      <button
        className={s.chip}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar user={user} size={32} />
        <span>{name}</span>
      </button>
      {open && (
        <div className={s.menu} role="menu">
          <div className={s.who}>
            <b>{fullName}</b>
            <small>{user.email}</small>
          </div>
          <button type="button" role="menuitem" onClick={onLogout}>
            {authCopy.logout}
          </button>
        </div>
      )}
    </div>
  );
}
