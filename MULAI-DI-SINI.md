# Mulai di sini

Paket ini berisi semua hasil perencanaan portofolio untuk challenge intern Cretivox,
supaya bisa dilanjutkan di Claude Code tanpa menjelaskan ulang.

## Langkah

1. **Buat project Next.js baru** di terminal:

   ```
   npx create-next-app@latest portfolio-fatimatul
   ```

   Pilih: TypeScript **Yes**, ESLint **Yes**, Tailwind **No**, `src/` directory **No**,
   App Router **Yes**, import alias **Yes** (`@/*`).

2. **Ekstrak isi zip ini ke dalam folder `portfolio-fatimatul`**, sehingga `CLAUDE.md`,
   `components/`, `data/`, `public/`, `design/`, dan `reference/` berada langsung di folder itu.
   Kalau ditanya untuk menimpa folder `public/`, pilih gabungkan (merge).

3. **Pasang GSAP**:

   ```
   cd portfolio-fatimatul
   npm i gsap @gsap/react
   ```

4. **Taruh logo resmi tools** (opsional, bisa nanti) di `public/logos/`. Lihat `public/logos/README.md`.

5. **Buka Claude Code** di folder itu:

   ```
   claude
   ```

   Lalu ketik misalnya:

   > Baca CLAUDE.md dan file di folder design/ dan reference/. Mulai dari langkah 1 dan 2 di bagian "Urutan kerja yang disarankan".

Claude Code akan membaca `CLAUDE.md` secara otomatis setiap sesi, jadi semua keputusan desain,
konten, animasi, dan alur login sudah ada di sana.

## Isi paket

- `CLAUDE.md` — brief lengkap untuk Claude Code
- `design/mockup-final.png` — desain final (gambar)
- `design/mockup-source/index.html` — sumber HTML/CSS desain (buka di browser)
- `reference/challenge-brief.png` — brief challenge Cretivox
- `reference/selected-work-horizontal-demo.html` — demo efek horizontal scroll
- `reference/login-demo.html` — demo alur login DummyJSON
- `components/SelectedWork/`, `data/projects.ts` — komponen Selected Work yang sudah jadi
- `public/images/` — foto kamu tanpa background (hitam putih dan berwarna)
- `public/logos/` — tempat logo resmi tools

Deadline: **17 November 2026, 23:59**. Semangat!
