# Portofolio PPG Informatika — Asyhar Qowiim

Website portofolio profesional Pendidikan Profesi Guru (PPG) Calon Guru Bidang Studi Informatika — Universitas Negeri Yogyakarta oleh **Asyhar Qowiim, S.Kom.** (NIM: 25105260081).

## Fitur Utama

- **Beranda & Identitas Pendidik**: Profil profesional, latar belakang, serta visi dan misi calon guru Informatika yang selaras dengan filosofi Ki Hadjar Dewantara.
- **Perjalanan Akademik**: Linimasa pembelajaran Semester 1 dan Semester 2 selama mengikuti program PPG.
- **Mata Kuliah & Refleksi 4C**: Dokumentasi 12 mata kuliah inti beserta capaian pembelajaran (CPMK), analisis refleksi alur 4C (*Connection, Challenge, Concept, Change*), dan bukti artefak.
- **Seminar PPG & Karya Inovasi**:
  - **Lembar Kerja (LK 1 – LK 4)**: Pratinjau dokumen interaktif dan ringkasan terstruktur untuk LK 1 (Identifikasi Diri), LK 2 (Refleksi Semester 1 & 2), LK 3 (Refleksi PPL), serta LK 4 (Desain Karya Inovatif).
  - **Karya Inovasi Pembelajaran**: Pengembangan simulator topologi jaringan berbasis web (**NetLab**), berkas konfigurasi `.json`, Modul Ajar Jaringan Komputer dan Internet (JKI) Fase E, serta Slide Presentasi Karya Inovasi.
- **PPL Mandiri SMAN 11 Yogyakarta**: Dokumentasi perangkat pembelajaran Siklus 1 dan Siklus 2–4, integrasi media praktik *Google Colaboratory*, instrumen evaluasi, serta dokumentasi video dan foto mengajar bersama Guru Pamong dan DPL.
- **Arsip Artefak & Galeri**: Pencarian cepat seluruh dokumen perangkat ajar, media interaktif, dan galeri dokumentasi kegiatan.

## Teknologi yang Digunakan

- **Frontend**: React 18, Vite 4
- **PDF Viewer**: PDF.js (`pdfjs-dist`) & Google Drive Embed Preview
- **Styling**: Modern CSS3 (Responsive Grid/Flexbox, Custom Properties)

## Menjalankan Proyek Secara Lokal

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan (port 3000):**
   ```bash
   npm run dev
   ```

3. **Build untuk produksi:**
   ```bash
   npm run build
   ```

4. **Pratinjau hasil build produksi:**
   ```bash
   npm run preview
   ```

## Struktur Proyek

```text
├── public/
│   └── assets/                  # Aset statis (foto, video mengajar, dokumen PDF & JSON seminar)
├── src/
│   ├── assets/                  # Aset bundel komponen (foto profil, latar belakang, logo)
│   ├── components/              # Komponen halaman & modal UI
│   │   ├── About.jsx / .css
│   │   ├── Artifacts.jsx / .css
│   │   ├── CourseDetail.jsx / .css
│   │   ├── Courses.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   ├── Gallery.jsx / .css
│   │   ├── Header.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── Journey.jsx / .css
│   │   ├── PdfReviewModal.jsx
│   │   ├── PPLMandiri.jsx / .css
│   │   ├── ReflectionDetail.jsx
│   │   └── Seminar.jsx / .css
│   ├── data/                    # Data terstruktur untuk Seminar, PPL Mandiri, dan Artefak
│   │   ├── artifactsData.js
│   │   ├── pplMandiriData.js
│   │   └── seminarData.js
│   ├── utils/                   # Utilitas pemrosesan tautan Google Drive
│   │   └── gdriveHelper.js
│   ├── App.jsx / .css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
└── vite.config.js
```
