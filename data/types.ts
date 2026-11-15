// Tipe bersama untuk konten di folder data/.

/** Potongan judul; { italic: true } tampil sebagai serif italic, mis. "Selected *work.*" */
export type TitlePart = { text: string; italic?: boolean };

export type Link = { label: string; href: string };
