// Fungsi API DummyJSON + penyimpanan token (CLAUDE.md bagian 7).
// Tidak ada token/rahasia yang di-hardcode; akun demo hanya ditampilkan di modal.

const API = 'https://dummyjson.com';
const EXPIRES_IN_MINS = 30;
const KEYS = { access: 'accessToken', refresh: 'refreshToken' } as const;

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
};

type Tokens = { accessToken: string; refreshToken: string };
export type LoginResponse = User & Tokens;

/** Error yang dilempar request(): network (server tak terjangkau) atau http (status ≠ 2xx). */
export class AuthError extends Error {
  constructor(
    message: string,
    readonly kind: 'network' | 'http',
    readonly status?: number,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(API + path, init);
  } catch {
    throw new AuthError('Couldn’t reach the server. Check your connection and try again.', 'network');
  }
  let body: { message?: string } = {};
  try {
    body = await res.json();
  } catch {
    /* respons kosong / bukan JSON */
  }
  if (!res.ok) throw new AuthError(body.message || `Request failed (${res.status}).`, 'http', res.status);
  return body as T;
}

const json = (data: unknown): RequestInit => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

export const login = (username: string, password: string) =>
  request<LoginResponse>('/auth/login', json({ username, password, expiresInMins: EXPIRES_IN_MINS }));

export const getMe = (accessToken: string) =>
  request<User>('/auth/me', { headers: { Authorization: `Bearer ${accessToken}` } });

export const refreshTokens = (refreshToken: string) =>
  request<Tokens>('/auth/refresh', json({ refreshToken, expiresInMins: EXPIRES_IN_MINS }));

/* ---------- sessionStorage (dibungkus try/catch: bisa diblokir di mode privat) ---------- */
export function saveTokens(t: Partial<Tokens>) {
  try {
    if (t.accessToken) sessionStorage.setItem(KEYS.access, t.accessToken);
    if (t.refreshToken) sessionStorage.setItem(KEYS.refresh, t.refreshToken);
  } catch {}
}

export function readTokens(): { access: string | null; refresh: string | null } {
  try {
    return { access: sessionStorage.getItem(KEYS.access), refresh: sessionStorage.getItem(KEYS.refresh) };
  } catch {
    return { access: null, refresh: null };
  }
}

export function clearTokens() {
  try {
    sessionStorage.removeItem(KEYS.access);
    sessionStorage.removeItem(KEYS.refresh);
  } catch {}
}

/** Ambil data user dari respons login tanpa token. */
export function toUser({ id, username, email, firstName, lastName, gender, image }: LoginResponse): User {
  return { id, username, email, firstName, lastName, gender, image };
}

/**
 * Pulihkan sesi saat halaman dibuka:
 * /auth/me → jika 401/403: /auth/refresh lalu /auth/me lagi → jika gagal: hapus token.
 * Mengembalikan user, null (tidak ada sesi), atau 'expired' (sesi ada tapi tidak bisa dipulihkan).
 */
export async function restoreSession(): Promise<User | null | 'expired'> {
  const { access, refresh } = readTokens();
  if (!access && !refresh) return null;
  try {
    if (!access) throw new AuthError('No access token', 'http', 401);
    return await getMe(access);
  } catch (e) {
    const err = e as AuthError;
    if (err.kind === 'http' && (err.status === 401 || err.status === 403) && refresh) {
      try {
        const t = await refreshTokens(refresh);
        saveTokens(t);
        return await getMe(t.accessToken);
      } catch {
        /* lanjut ke pembersihan */
      }
    }
    clearTokens();
    return err.kind === 'http' ? 'expired' : null;
  }
}

/** Avatar cadangan: lingkaran gelap dengan inisial (dipakai jika gambar gagal dimuat). */
export function avatarFallback(name: string) {
  const initial = (name || '?')[0].toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="32" fill="#141414"/><text x="32" y="41" font-family="Georgia,serif" font-style="italic" font-size="28" fill="#fff" text-anchor="middle">${initial}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
