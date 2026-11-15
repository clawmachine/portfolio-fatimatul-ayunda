// Tema terang/gelap. Token warnanya ada di app/globals.css:
// tanpa data-theme → ikut sistem (prefers-color-scheme); data-theme="light" | "dark" → pilihan pengunjung.

export type Theme = 'light' | 'dark';

export const THEME_KEY = 'theme';

/**
 * Skrip kecil yang dijalankan di <head> sebelum halaman tampil, supaya tema pilihan
 * langsung terpasang tanpa kedipan tema yang salah.
 */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

/** Tema yang sedang tampil: pilihan pengunjung, atau tema sistem bila belum memilih. */
export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const CHANGE_EVENT = 'themechange';

/** Pasang tema, simpan pilihannya, dan beri tahu pelanggan (useSyncExternalStore). */
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // mode privat / storage diblokir: tema tetap berganti, hanya tidak diingat
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Langganan perubahan tema: pilihan pengunjung atau tema sistem (bila belum memilih). */
export function subscribeTheme(onChange: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    mq.removeEventListener('change', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}
