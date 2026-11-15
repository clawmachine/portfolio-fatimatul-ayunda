'use client';

import { useEffect, useState } from 'react';
import { nav, site } from '@/data/site';
import { authCopy } from '@/data/auth';
import Button from '@/components/ui/Button/Button';
import { useAuth } from '@/components/auth/AuthProvider/AuthProvider';
import UserMenu from '@/components/auth/UserMenu/UserMenu';
import ThemeToggle from '@/components/layout/ThemeToggle/ThemeToggle';
import s from './Nav.module.css';

/** Nav di atas hero (mockup: nav). Link aktif mengikuti section yang sedang terlihat. */
export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const { status, openLogin } = useAuth();

  useEffect(() => {
    const sections = nav.links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className={s.nav}>
      <a href="#top" className={s.logo} aria-label={`${site.name}, back to top`}>
        {site.name}
        <sup>®</sup>
      </a>

      <nav aria-label="Main" className={s.links}>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} className={active === l.href ? s.on : undefined} aria-current={active === l.href ? 'true' : undefined}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className={s.actions}>
        <div className={s.login}>
          <ThemeToggle />
          {status === 'authed' ? (
            <UserMenu />
          ) : (
            <Button variant="light" size="sm" onClick={() => openLogin()} data-nav-login>
              {authCopy.navLogin}
            </Button>
          )}
        </div>
        <Button href={nav.cta.href} size="sm">
          {nav.cta.label}
        </Button>
      </div>
    </header>
  );
}
