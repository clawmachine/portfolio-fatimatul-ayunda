'use client';

import type { Project } from '@/data/projects';
import { authCopy } from '@/data/auth';
import { useAuth } from '@/components/auth/AuthProvider/AuthProvider';
import s from './CaseStudy.module.css';

const copy = authCopy.lock;
const plain = (p: Project) => p.title.map((t) => t.text).join('');

/** Pill status di judul Selected Work: terkunci / terbuka. */
export function LockInfo() {
  const { status } = useAuth();
  const open = status === 'authed';
  return (
    <span className={`${s.lockinfo} ${open ? s.open : ''}`}>
      <b aria-hidden="true" />
      <span>{open ? copy.unlocked : copy.locked}</span>
    </span>
  );
}

/** Tombol case study di setiap kartu: 🔒 sebelum login, "Read case study →" sesudahnya. */
export function CaseStudyButton({ project }: { project: Project }) {
  const { status, openCaseStudy } = useAuth();
  const unlocked = status === 'authed';
  return (
    <button
      className={`${s.cs} ${unlocked ? s.unlocked : ''}`}
      type="button"
      onClick={() => openCaseStudy(project, plain(project))}
      aria-label={`${unlocked ? copy.readCaseStudy : copy.caseStudy}: ${plain(project)}${unlocked ? '' : ' (locked)'}`}
    >
      <span>{unlocked ? copy.readCaseStudy : copy.caseStudy}</span>
      <span className={s.ic} aria-hidden="true">
        {unlocked ? '→' : '🔒'}
      </span>
    </button>
  );
}
