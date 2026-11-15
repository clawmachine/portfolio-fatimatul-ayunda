'use client';

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { AuthError } from '@/lib/auth';
import { authCopy } from '@/data/auth';
import { useAuth } from '@/components/auth/AuthProvider/AuthProvider';
import RichTitle from '@/components/ui/RichTitle/RichTitle';
import s from './LoginModal.module.css';

const copy = authCopy.modal;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Modal kaca login DummyJSON (acuan: reference/login-demo.html). Hanya dirender saat terbuka. */
export default function LoginModal({ reason }: { reason?: string }) {
  const { signIn, closeLogin } = useAuth();
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Masuk: naik + membesar sedikit. Fokus ke field username.
  useGSAP(
    () => {
      const modal = modalRef.current;
      if (!reduceMotion()) {
        gsap.fromTo(modal, { y: 30, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
      }
      const t = setTimeout(() => userRef.current?.focus(), 60);
      return () => {
        clearTimeout(t);
        gsap.killTweensOf(modal); // termasuk goyangan yang dibuat di luar konteks ini
      };
    },
    { scope: overlayRef },
  );

  // Gagal: modal bergoyang ke samping.
  const shake = () => {
    if (reduceMotion()) return;
    gsap.fromTo(modalRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  // Esc menutup modal.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && closeLogin();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeLogin]);

  // Fokus terkunci di dalam modal (Tab / Shift+Tab berputar).
  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const items = modalRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input');
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const u = username.trim();
    if (!u || !password) {
      setError(copy.empty);
      shake();
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signIn(u, password); // sukses: provider menutup modal
    } catch (ex) {
      const err = ex as AuthError;
      setError(err.kind === 'http' && err.status === 400 ? copy.badCredentials(err.message) : err.message);
      setLoading(false);
      shake();
    }
  };

  const fillDemo = () => {
    setUsername(copy.demo.username);
    setPassword(copy.demo.password);
    submitRef.current?.focus();
  };

  return (
    <div
      ref={overlayRef}
      className={s.overlay}
      onKeyDown={trapFocus}
    >
      {/* Latar blur dibuat terpisah: backdrop-filter di induk akan mematikan blur kaca modal. */}
      <div className={s.backdrop} onMouseDown={closeLogin} aria-hidden="true" />
      <div ref={modalRef} className={s.modal} role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className={s.x} type="button" onClick={closeLogin} aria-label={copy.close}>
          ✕
        </button>
        <h2 id="login-title">
          <RichTitle parts={copy.title} />
        </h2>
        <p className={s.lead}>{copy.lead}</p>
        {reason && <div className={s.reason}>{reason}</div>}

        <form className={s.form} onSubmit={onSubmit} noValidate>
          <label>
            {copy.username}
            <div className={s.field}>
              <input
                ref={userRef}
                name="username"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </label>
          <label>
            {copy.password}
            <div className={s.field}>
              <input
                name="password"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={s.eye} type="button" onClick={() => setShowPw((v) => !v)} aria-pressed={showPw}>
                {showPw ? copy.hide : copy.show}
              </button>
            </div>
          </label>
          <div className={`${s.err} ${error ? s.show : ''}`} role="alert">
            {error}
          </div>
          <button ref={submitRef} className={`${s.submit} ${loading ? s.loading : ''}`} type="submit" disabled={loading}>
            <span className={s.spin} aria-hidden="true" />
            <span>{loading ? copy.submitting : copy.submit}</span>
          </button>
        </form>

        <div className={s.demo}>
          <span>
            {copy.demoLabel} <code>{copy.demo.username}</code> / <code>{copy.demo.password}</code>
          </span>
          <button type="button" onClick={fillDemo}>
            {copy.demoButton}
          </button>
        </div>
      </div>
    </div>
  );
}
