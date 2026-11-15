# Portofolio Fatimatul Ayunda — Challenge Intern Front-end Cretivox

Dokumen ini merangkum semua keputusan dari sesi perencanaan di claude.ai. Baca seluruhnya sebelum menulis kode.
Pemilik project: Fatimatul Ayunda (komunikasi dalam Bahasa Indonesia; konten website dalam Bahasa Inggris).

## 1. Brief challenge (lihat `reference/challenge-brief.png`)

1. Satu halaman website yang memperkenalkan diri.
2. Framework bebas, **Next.js diutamakan**.
3. **Wajib GSAP**: animasi dan scroll-triggered supaya website terasa hidup.
4. **Harus interaktif**: bikin pengunjung betah dan penasaran untuk terus scroll.
5. **Wajib deploy** dan bisa diakses publik (Vercel atau GitHub Pages). Pakai Vercel.
6. **Poin bonus: API login** (DummyJSON, detail di bagian 7).

Deliverable akhir: Production Deck (PDF / Google Slides) bernama `DREAMON_CRETECH_FatimatulAyunda.pdf`.
**Deadline: 17 November 2026, 23:59.** Selesaikan website paling lambat 16 November supaya ada waktu untuk deck.

## 2. Status saat ini

Sudah jadi:
- Desain final semua section: `design/mockup-final.png` (gambar) dan `design/mockup-source/index.html` (HTML/CSS statis, sumber ukuran, warna, dan spacing yang akurat; buka di browser untuk inspect).
- Komponen **Selected Work** dengan horizontal scroll GSAP: `components/sections/SelectedWork/` + `data/projects.ts` (8 project). Sudah lolos type-check TypeScript strict. Belum diuji di project Next.js sungguhan.
- Demo alur login DummyJSON: `reference/login-demo.html` (vanilla JS, sudah diuji dengan respons tiruan).
- Demo efek horizontal scroll: `reference/selected-work-horizontal-demo.html`.
- Foto pemilik dengan background sudah dihapus: `public/images/me-bw.png` (hitam putih, dipakai di desain) dan `public/images/me-color.png`.

- Nav (`components/layout/Nav/`) dan Hero statis + animasi (`components/sections/Hero/`, animasi di `useHeroMotion.ts`). Elemen melayang Hero memakai 3 lapis (layer → motion → kartu) supaya transform GSAP tidak menimpa transform CSS mockup; ikuti pola ini untuk section lain yang kartunya punya `transform` CSS.

- Login DummyJSON (`lib/auth.ts`, `components/auth/`, teks di `data/auth.ts`, isi case study di `projects[].caseStudy`).

- About statis (`components/sections/About/`, teks di `data/about.ts`); animasinya belum.
- Services statis (`components/sections/Services/`, ilustrasi di `ServiceVisuals.tsx`, teks di `data/services.ts`); animasinya belum. Ilustrasi digambar di kanvas selebar kartu 1440px (`--dw`) lalu diskalakan dengan `100cqw`.
- Tools & Skills statis (`components/sections/Tools/`, teks dan posisi di `data/tools.ts`); animasi orbit belum. Logo otomatis dipakai jika file `public/logos/<nama>.svg` ada (dicek di server saat build), selain itu monogram.
- Process statis (`components/sections/Process/`, teks di `data/process.ts` sebagai `workProcess`); garis atas elemen sendiri (`.line`) untuk animasi nanti.
- Experience & Education statis (`components/sections/Experience/`, teks di `data/experience.ts`); garis timeline elemen sendiri (`.rail`). Label kaca kecil dipindah ke `components/ui/Tag` (dipakai Services dan kartu tiket).
- Contact statis (`components/sections/Contact/`, panggung 1440×1080 seperti Hero; teks di `data/contact.ts`). Form memakai `mailto:` (`ContactForm.tsx`, client) — keputusan default karena pemilik belum memilih layanan form. Kartu kontak 3 lapis (posisi → `.cardMotion` → SideCard).
- Footer (`components/layout/Footer/`, data `footer` di `data/site.ts`), di luar `<main>`. Link CV masih ke website lama.
- Animasi prioritas 1 selesai: orbit Tools (`Tools/ToolsMotion.tsx`; posisi ikon dihitung di sepanjang elips per frame, loop hanya jalan saat terlihat) dan timeline Experience (`Experience/useExperienceMotion.ts`; garis scaleY scrub, titik `[data-passed]`, tahun/kartu dari arah berlawanan, tiket miring→tegak).
- Animasi prioritas 2 selesai: About (`About/useAboutMotion.ts`: kata per kata via `RichTitle words`, count-up, garis tahun, tiles, orbit mini), Services (`Services/useServicesMotion.ts`, elemen ditandai `data-sv`), Process (di `Process.tsx`). Teruji 60 fps di build produksi (desktop dan HP CPU 4×).
- Animasi prioritas 3 Contact selesai (`Contact/useContactMotion.ts`): headline per baris (mask `.line` seperti Hero), form naik, kartu dari samping, garis lengkung tergambar, tombol kirim magnetic (desktop + pointer halus; efek tekan dipindah ke label span). Semua animasi di bagian 6 sudah dibuat.

Belum dikerjakan: deploy, deck.

## 3. Tech stack dan setup

- Next.js (App Router) + TypeScript, tanpa folder `src` (alias `@/*` → root). Komponen yang ada mengimpor `@/data/projects`.
- Styling: **CSS Modules** (ikuti pola `SelectedWork.module.css`). Jangan campur dengan Tailwind kecuali pemilik memintanya.
- Animasi: `gsap` + `@gsap/react` (`useGSAP`), plugin `ScrollTrigger`. Selalu daftarkan plugin sekali, pakai `gsap.matchMedia()` dan bersihkan dengan `mm.revert()`.
- Font via `next/font/google` di `app/layout.tsx`:
  - `Instrument_Serif` (weight 400, style normal + italic) → CSS variable `--font-serif`
  - `Inter` (400/500/600) → CSS variable `--font-sans`
- `next.config` → `images.remotePatterns` untuk `dummyjson.com` (avatar user setelah login).
- Komponen yang memakai GSAP atau state harus `'use client'`.

### 3a. Struktur folder dan aturan kode (wajib diikuti setiap sesi)

```
app/                 layout.tsx (font, metadata), page.tsx (hanya menyusun section), globals.css
components/
  layout/            Nav/, Footer/
  sections/          Hero/, About/, Services/, Tools/, Process/, SelectedWork/, Experience/, Contact/
  ui/                GlassCard/, SideCard/, Chip/, Button/, SectionHeading/, RichTitle/
  auth/              AuthProvider/, LoginModal/, UserMenu/, CaseStudyDrawer/
lib/                 gsap.ts (registrasi plugin sekali), auth.ts (fungsi API DummyJSON)
data/                types.ts, site.ts, hero.ts, about.ts, services.ts, tools.ts, process.ts,
                     experience.ts, contact.ts, projects.ts
```

- Satu folder per komponen: `Nama/Nama.tsx` + `Nama/Nama.module.css`. Sub-komponen yang hanya dipakai di situ tinggal di folder yang sama (mis. `SelectedWork/ProjectMock.tsx`). Impor langsung: `@/components/sections/Hero/Hero`.
- Setiap komponen punya `.module.css` sendiri. **Token warna, font, reset, dan mode gelap hanya di `app/globals.css`**; module CSS memakai `var(--…)`, jangan mendefinisikan ulang token.
- **Semua teks konten ada di `data/`**, bukan di JSX. Judul dengan bagian italic memakai tipe `TitlePart[]` (`data/types.ts`) dan dirender dengan `RichTitle`.
- Komponen kecil yang dipakai berulang masuk `components/ui/`; jangan menyalin gaya kartu kaca/kartu miring/chip/tombol di tiap section.
- GSAP selalu diimpor dari `@/lib/gsap` (`import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'`), jangan `registerPlugin` di komponen.
- **`design/mockup-source/index.html` adalah sumber kebenaran desain.** Salin nilai CSS-nya (ukuran, warna, radius, shadow, posisi) sedekat mungkin. Jangan mengubah desain tanpa bertanya ke pemilik.
- Hero dan Contact memakai koordinat absolut mockup di dalam "panggung" 1440px yang di-center dan diskalakan proporsional di 900–1440px; di bawah 900px susunan satu kolom.
- Alur kerja: tampilan statis dulu, animasi GSAP setelah tampilan disetujui pemilik.
- **Jangan tulis `-webkit-backdrop-filter`** di CSS. Turbopack (Lightning CSS) lalu membuang `backdrop-filter` biasa dan Chrome kehilangan blur. Tulis hanya `backdrop-filter`; prefix untuk Safari ditambahkan otomatis.
- Elemen `backdrop-filter` jangan diletakkan di dalam induk yang juga memakai `backdrop-filter`/`filter`/`opacity < 1` (blur anak jadi mati). Contoh: latar blur `LoginModal` adalah elemen saudara, bukan induk.

## 4. Design system

Gaya: editorial minimal, terinspirasi landing page "Mindly". Latar krem, tipografi serif besar dengan bagian italic, kartu putih melayang, kartu kaca (glassmorphism) kecil, foto hitam putih. Banyak ruang kosong.

Warna (light):
- `--bg #f6f5f1`, `--surface #ffffff`, `--ink #141414` (desain memakai #111/#0d0d0d di beberapa tempat, samakan ke #141414)
- `--muted #86847f`, `--line #dedcd6`, `--soft #eeede9`, `--soft2 #e3e1dc`
- Gradien area visual: `linear-gradient(160deg, #eeece7, #d9d6cf)`
- Kartu gelap: `radial-gradient(130% 90% at 80% 0%, #3a3a3c 0, #141415 62%)`
- Aksen ikon kecil: hijau `#b9e86b`, ungu `#b8a6ff`, oranye `#ffa36b`, biru `#5b8def`
- Mode gelap: default mengikuti `prefers-color-scheme`; tombol tema di Nav (`components/layout/ThemeToggle/`, logika di `lib/theme.ts`) memasang `data-theme` di `<html>` dan menyimpannya di localStorage. Skrip di `<head>` (`themeInitScript`) memasang tema sebelum halaman tampil. Token gelap di `app/globals.css`.

Tipografi:
- Heading: Instrument Serif 400, letter-spacing −0.02 s/d −0.035em, line-height 0.9–1. Pola khas: kata biasa + kata italic, mis. "Selected *work.*"
- Ukuran: hero 106px, h2 section 92px, judul kartu 38–58px; body Inter 15–18px, line-height 1.55–1.65.

Komponen visual:
- Kartu putih: radius 28–32px, `box-shadow: 0 24px 60px rgba(0,0,0,.06)`.
- Kartu kaca: `background: linear-gradient(135deg, rgba(255,255,255,.82), rgba(240,239,235,.55))`, `border: 1px solid rgba(255,255,255,.95)`, `backdrop-filter: blur(14px)`, radius 16–20px, shadow `0 18px 40px rgba(0,0,0,.14)`. Isi: ikon kotak 26–30px berwarna + label + subteks kecil.
- Kartu samping miring (hero, contact): putih, radius 24px, `rotate(±6deg)`.
- Chip section: pill putih dengan border dan ikon ✦ di depan (mis. "✦ About Me").
- Tombol: pill; utama hitam (`--ink`) teks putih, sekunder putih dengan shadow halus.
- Garis lengkung tipis `#d6d4ce` 1.2px sebagai dekorasi (hero, contact, orbit).

Responsif: desain dibuat untuk lebar 1440px. Di bawah 900px susun satu kolom, kecilkan heading, sembunyikan dekorasi yang menutupi konten.

## 5. Struktur halaman dan konten

Urutan: Nav → Hero → About → Services (+ Tools & Skills + Process) → Selected Work → Experience & Education → Contact → Footer.
Semua teks konten sudah ada di `design/mockup-source/index.html`; salin dari sana. Ringkasan:

**Nav**: logo "Fatimatul Ayunda®", link About, Services, Work, Experience, Process; tombol kanan "Let's Talk ↗" (dan tombol Log in, lihat bagian 7).

**Hero**: headline "Crafting clean interfaces, / *solving real problems.*"; subteks "Hello, I’m Fatimatul Ayunda, a Frontend Developer. I build web and mobile interfaces that are dependable, tidy, and easy to use."; tombol "View My Work →" dan "Download CV". Foto `me-bw.png` di tengah bawah dengan mask fade di bawah, dikelilingi kartu kaca (Web, Mobile, QA & Testing), panel kode gelap, panel bola gelap, kartu kaca hantu di belakang foto. Kartu samping kiri "UI design to code." dan kanan "Dependable, tidy & easy to use." Badge melingkar kanan atas "• FRONTEND DEVELOPER • WEB & MOBILE". Pojok kiri bawah: "Built products for Bank BRI, Bank Papua, Garuda Eleven, Ajari, Holivy." Pojok kanan bawah: "2+ years of experience. 8 apps delivered." **Kartu kaca tidak boleh menutupi wajah.**

**About**: "Hello, I’m *Fatimatul Ayunda.*", foto dalam kartu dengan tag kaca "Location · Indonesia", dua paragraf About, link "See My Experience →". Di bawahnya baris 3 kartu statistik: (1) kartu gelap "2+ years" + tag "Since 2021" + timeline 2021–2024 + titik "next"; (2) "8 projects delivered" + 8 kotak singkatan BRI, BP, AJ, HV, GE, CMS, AF, ER; (3) "6 core tools" + orbit mini 6 monogram.

**Services ("Services *I offer.*")**: bento grid 12 kolom: Web development (7), UI design to code (5), Mobile apps (5, kartu gelap), QA & testing (7, checklist UAT: Register flow, Forgot password, Quest workflow, Technical documentation).

**Tools & Skills ("Technologies *I use.*")**: orbit elips. Tengah lingkaran "6 core tools". Ring dalam: React JS, Next.js, React Native, Tailwind, Figma, Git. Ring luar: PHP, CodeIgniter, Golang, Node.js, NestJS, MySQL. Di mockup ikonnya monogram; **di website pakai logo resmi dari `public/logos/`** yang disediakan pemilik (lihat `public/logos/README.md`). Jika file logo belum ada, tampilkan monogram sebagai fallback.

**Process ("How I build *a feature.*")**: 01 Understand, 02 Design, 03 Build, 04 Test, 05 Document.

**Selected Work**: sudah jadi (komponen `SelectedWork`). Delapan project ada di `data/projects.ts`.

**Experience & Education**: timeline (tahun besar kiri, garis + titik, kartu kanan) urut kronologis: Frontend Developer Intern — PT Bangun Kreatif Abadi (Apr–Sep 2021); Frontend Developer & QA — PT Adyatma Cendekia Sinergi Abadi (Sep 2021–May 2024, baris "Shipped for" berisi klien); Legal & Client Consultant — PT Lima Sekawan Indonesia, Hifefive Legal Division (Jun 2024–Nov 2025). Pendidikan sebagai kartu tiket (atas tahun besar, garis sobek, bawah detail): Binus Online University, Bachelor of Information Systems 2024–2028 (Ongoing, kartu gelap); Dignitas Academy Web Developer Bootcamp, Jun–Sep 2022; SMK Negeri 1 Kota Bekasi, Software Engineering 2019–2022. Bahasa: Bahasa Indonesia (Native), English (Passive).

**Contact**: "Have a project or role in mind? / *Let’s build something useful together.*"; form kaca (Name, Email, Topic: Job opportunity / Freelance / Collaboration / Other, Message, Send Message); 4 kartu miring: Email fatimatulayunda@gmail.com, LinkedIn in/fatimatul-ayunda, Phone/WhatsApp +62 896-7121-0471, Location Indonesia. Form boleh berupa `mailto:` atau layanan form; tanyakan pemilik.

**Footer**: "© 2026 Fatimatul Ayunda", "Built with Next.js & GSAP", "Email · LinkedIn · CV (PDF)". CV ada di website lama: `https://portofolio-fatimatul-ayunda.netlify.app/CV_FatimatulAyunda.pdf` (salin ke `public/` jika pemilik setuju).

## 6. Rencana animasi GSAP

Prioritas 1 (wajib):
- **Hero intro** (timeline): headline per baris naik dari mask → subteks → tombol → foto → kartu kaca masuk dari luar dengan stagger → garis lengkung tergambar (strokeDashoffset). Kartu kaca lalu melayang naik-turun (yoyo, sine). Badge berputar terus (`rotation: 360, repeat: -1, ease: 'none'`).
- **Selected Work**: horizontal scroll (sudah jadi).
- **Tools orbit**: ring dalam dan luar berputar pelan berlawanan arah, ikon tetap tegak (counter-rotate). Saat pertama terlihat, ikon menyebar dari tengah.
- **Experience timeline**: garis tumbuh mengikuti scroll (`scaleY`, scrub), titik terisi saat dilewati, tahun dan kartu masuk dari arah berlawanan.

Prioritas 2:
- Hero scroll-out (scrub): kartu menyebar, foto mengecil sedikit. Parallax kartu mengikuti mouse (`gsap.quickTo`, desktop saja).
- About: reveal per kata pada kalimat besar; count-up angka 2+, 8, 6; timeline kartu tahun terisi; kotak project muncul satu per satu; orbit mini berputar.
- Services: bento stagger; isi kartu bergerak (HP menggeser masuk, panah putus-putus tergambar lalu chip kode muncul, centang checklist muncul berurutan).
- Process: garis tumbuh kiri→kanan, langkah 01–05 muncul bergantian.

Prioritas 3:
- Education: kartu tiket masuk miring lalu tegak. Contact: headline per baris, kartu kontak masuk dari samping, efek magnetic di tombol kirim.

Aturan animasi: hormati `prefers-reduced-motion` (matikan atau sederhanakan), mouse parallax hanya untuk pointer halus, cek performa di HP (batasi `backdrop-filter` besar). Selected Work tetap pakai pin + horizontal scroll juga di HP (keputusan pemilik).

## 7. Login (poin bonus) — DummyJSON

Endpoint:
- `POST https://dummyjson.com/auth/login` body `{ username, password, expiresInMins: 30 }` → data user (`id, username, email, firstName, lastName, gender, image`) + `accessToken` + `refreshToken`.
- `GET https://dummyjson.com/auth/me` header `Authorization: Bearer <accessToken>` → data user.
- `POST https://dummyjson.com/auth/refresh` body `{ refreshToken, expiresInMins: 30 }` → token baru.
- Akun uji publik: `emilys` / `emilyspass` (aman ditampilkan, ini akun demo DummyJSON).

UX yang sudah disepakati (acuan persis: `reference/login-demo.html`):
- Tombol "Log in" di nav dan "Log in to read case studies" di hero membuka **modal kaca** (masuk dengan GSAP). Field Username, Password (toggle Show/Hide), tombol "Use demo account" yang mengisi akun uji.
- Loading di tombol saat request; error dari API tampil di bawah form + modal bergoyang.
- Setelah berhasil: tombol Log in diganti chip avatar + nama (menu: nama lengkap, email, Log out); kartu kaca "Welcome back, {firstName}" muncul di baris tombol hero; tombol case study di Selected Work berubah dari terkunci (🔒) menjadi "Read case study →" yang membuka panel samping berisi detail project (What I built, APIs I integrated, Stack — dari `data/projects.ts`). Jika belum login, klik case study membuka modal login dengan alasan.
- Sesi: simpan token di `sessionStorage`. Saat load: `/auth/me` → jika 401/403, `/auth/refresh` lalu `/auth/me` lagi → jika gagal, hapus token dan kembali ke kondisi logout.
- Implementasi React yang disarankan: `AuthProvider` + hook `useAuth()` (context), komponen `LoginModal`, `UserMenu`, `CaseStudyDrawer`. `SelectedWork` perlu ditambah tombol case study yang membaca `useAuth()`.
- Jangan hardcode token atau rahasia apa pun. Avatar fallback ke inisial jika gambar gagal dimuat.

## 8. Catatan dan keputusan terbuka

- Website lama menyebut posisi di PT Adyatma sebagai "Frontend Developer & QA", CV menyebut "Full-stack Developer". Desain memakai versi website; minta pemilik menyamakan.
- "6 core tools" dipilih: React, Next.js, React Native, Tailwind, Figma, Git (asumsi; konfirmasi ke pemilik).
- Mockup project di kartu adalah UI tiruan. Field `image` di `data/projects.ts` bisa diisi screenshot asli; jangan pakai data rahasia klien.
- Aksesibilitas: kontras teks di atas kaca, `aria-live` untuk penghitung, fokus terkunci di modal, tutup dengan Esc.

## 9. Urutan kerja yang disarankan

1. Setup project, font, token warna global, layout dasar + Nav.
2. Pasang `SelectedWork`, jalankan `npm run dev`, perbaiki jika ada error.
3. Hero + animasi intro.
4. About, Services, Tools orbit, Process.
5. Experience & Education, Contact, Footer.
6. Login (AuthProvider, modal, menu, drawer case study).
7. Animasi prioritas 2–3 sesuai waktu, cek responsif dan reduced motion.
8. Push ke GitHub, deploy ke Vercel, uji di HP.
9. Bantu menyusun isi Production Deck (konsep, tech stack, highlight GSAP, alur login, link live, tantangan & solusi).

Setiap selesai satu langkah, jalankan dev server, cek tidak ada error di console, lalu minta pemilik melihat hasilnya sebelum lanjut.
