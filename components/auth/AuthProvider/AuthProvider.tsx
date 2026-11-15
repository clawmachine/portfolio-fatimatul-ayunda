'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { clearTokens, login, restoreSession, saveTokens, toUser, type User } from '@/lib/auth';
import { authCopy } from '@/data/auth';
import type { Project } from '@/data/projects';
import LoginModal from '@/components/auth/LoginModal/LoginModal';
import CaseStudyDrawer from '@/components/auth/CaseStudyDrawer/CaseStudyDrawer';
import Toast from '@/components/ui/Toast/Toast';

type Status = 'checking' | 'authed' | 'guest';

type AuthContextValue = {
  user: User | null;
  status: Status;
  /** login ke DummyJSON; melempar AuthError bila gagal */
  signIn: (username: string, password: string) => Promise<void>;
  logout: () => void;
  /** buka modal login, opsional dengan alasan (mis. dari tombol case study) */
  openLogin: (reason?: string) => void;
  closeLogin: () => void;
  /** buka panel case study; jika belum login, buka modal login dengan alasan */
  openCaseStudy: (project: Project, title: string) => void;
  closeCaseStudy: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>');
  return ctx;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>('checking');
  const [login_, setLogin] = useState<{ open: boolean; reason?: string }>({ open: false });
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastFocus = useRef<HTMLElement | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  // Pulihkan sesi saat halaman dibuka: /auth/me → /auth/refresh → /auth/me.
  useEffect(() => {
    let alive = true;
    restoreSession().then((res) => {
      if (!alive) return;
      if (res && res !== 'expired') {
        setUser(res);
        setStatus('authed');
      } else {
        setStatus('guest');
        if (res === 'expired') showToast(authCopy.toast.expired);
      }
    });
    return () => {
      alive = false;
      clearTimeout(toastTimer.current);
    };
  }, [showToast]);

  const signIn = useCallback(
    async (username: string, password: string) => {
      const data = await login(username, password);
      saveTokens(data);
      const u = toUser(data);
      setUser(u);
      setStatus('authed');
      setLogin({ open: false });
      showToast(authCopy.toast.loggedIn(u.firstName || u.username));
    },
    [showToast],
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    setStatus('guest');
    setCaseStudy(null);
    showToast(authCopy.toast.loggedOut);
  }, [showToast]);

  const openLogin = useCallback((reason?: string) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setLogin({ open: true, reason });
  }, []);

  const closeLogin = useCallback(() => {
    setLogin({ open: false });
    // Kembalikan fokus ke tombol yang membuka modal.
    requestAnimationFrame(() => lastFocus.current?.focus?.());
  }, []);

  const openCaseStudy = useCallback(
    (project: Project, title: string) => {
      if (status !== 'authed') {
        openLogin(authCopy.reason(title));
        return;
      }
      lastFocus.current = document.activeElement as HTMLElement | null;
      setCaseStudy(project);
    },
    [status, openLogin],
  );

  const closeCaseStudy = useCallback(() => {
    setCaseStudy(null);
    requestAnimationFrame(() => lastFocus.current?.focus?.());
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, signIn, logout, openLogin, closeLogin, openCaseStudy, closeCaseStudy }),
    [user, status, signIn, logout, openLogin, closeLogin, openCaseStudy, closeCaseStudy],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {login_.open && <LoginModal reason={login_.reason} />}
      <CaseStudyDrawer project={caseStudy} />
      <Toast toast={toast} />
    </AuthContext.Provider>
  );
}
