'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Project } from '@/data/projects';
import { projects } from '@/data/projects';
import { authCopy } from '@/data/auth';
import { useAuth } from '@/components/auth/AuthProvider/AuthProvider';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import s from './CaseStudyDrawer.module.css';

const copy = authCopy.drawer;

/** Panel samping berisi detail project (hanya bisa dibuka setelah login). */
export default function CaseStudyDrawer({ project }: { project: Project | null }) {
  const { closeCaseStudy } = useAuth();
  const ref = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Simpan project terakhir supaya isi tetap terlihat saat panel bergeser keluar.
  const [shown, setShown] = useState<Project | null>(project);
  if (project && project !== shown) setShown(project);
  const open = project !== null;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && closeCaseStudy();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeCaseStudy]);

  const trapFocus = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Tab') return;
    // Panel hanya punya satu elemen fokus (tombol tutup): tahan fokus di sana.
    e.preventDefault();
    closeRef.current?.focus();
  };

  const no = shown ? String(projects.indexOf(shown) + 1).padStart(2, '0') : '';

  return (
    <aside
      ref={ref}
      className={`${s.drawer} ${open ? s.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby="cs-title"
      inert={!open}
      onKeyDown={trapFocus}
    >
      <button ref={closeRef} className={s.x} type="button" onClick={closeCaseStudy} aria-label={copy.close}>
        ✕
      </button>
      {shown && (
        <>
          <span className={s.tag}>
            {no} · {shown.org}
          </span>
          <h3 id="cs-title">
            <RichTitle parts={shown.title} />
          </h3>
          <p>{shown.description}</p>
          <h4>{copy.built}</h4>
          <ul>
            {shown.caseStudy.built.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {shown.caseStudy.apis.length > 0 && (
            <>
              <h4>{copy.apis}</h4>
              <ul>
                {shown.caseStudy.apis.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </>
          )}
          <h4>{copy.stack}</h4>
          <div className={s.pills}>
            {shown.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
