# Penyederhanaan Halaman PPL Mandiri SMAN 11 Yogyakarta

Menghapus blok kartu ringkasan kemitraan sekolah mitra beserta deretan metrik di dalamnya, serta menonaktifkan tab dan konten Inovasi Presensi QR Code pada halaman PPL Mandiri agar tampilan lebih ringkas dan fokus pada kegiatan inti praktik mengajar.

## User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan konfirmasi Anda pada tahap klarifikasi, perubahan ini akan menghapus elemen-elemen berikut dari halaman PPL Mandiri tanpa mengubah struktur tema maupun halaman portofolio lainnya.

- **Keputusan Terkonfirmasi 1**: Menghapus seluruh kartu **Kemitraan Praktik Persekolahan Berkualitas** (judul, motto sekolah, badge periode semester, serta 4 kotak statistik di bagian bawahnya).
- **Keputusan Terkonfirmasi 2**: Menghapus tombol navigasi tab **Inovasi Presensi QR Code** beserta panel konten detailnya dari halaman PPL Mandiri.

## 1. Overview & Core Concept

- **What It Does**: Menyederhanakan tata letak halaman **PPL Mandiri SMAN 11 Yogyakarta** sehingga langsung mengalir dari *Hero Banner* (informasi sekolah mitra, Guru Pamong, DPL, dan mahasiswa praktikan) menuju navigasi 4 tab utama:
  1. *Alur & Tahapan Pelaksanaan*
  2. *Perangkat Ajar & Modul*
  3. *Refleksi Praktik (LK 3 PPLM)*
  4. *Catatan Lapangan & Dokumentasi*
- **Target Audience / Persona**: Dosen penguji PPG, Guru Pamong, dan pengunjung portofolio profesional Asyhar Qowiim yang meninjau bukti praktik mengajar lapangan.
- **Key Value**: Menghilangkan duplikasi informasi antara banner utama dan kartu kemitraan di bawahnya, sehingga perhatian pembaca langsung tertuju pada tahapan pelaksanaan, modul ajar, refleksi LK 3, dan dokumentasi lapangan.

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. Pengguna membuka menu **PPL Mandiri** dari bilah navigasi utama.
  2. Pengguna melihat *Hero Banner* utama yang menampilkan deskripsi singkat PPL Mandiri dan 4 kartu pemangku kepentingan (*Sekolah Mitra*, *Guru Pamong*, *DPL*, dan *Mahasiswa Praktikan*).
  3. Tepat di bawah *Hero Banner*, pengguna langsung mendapati bilah navigasi sub-tab yang kini terdiri dari 4 tab inti (tanpa diselingi kartu kemitraan/statistik dan tanpa tab Inovasi Presensi QR Code).
  4. Pengguna dapat berpindah antar-tab dan membuka modal rincian skenario perangkat ajar dengan transisi yang tetap mulus.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Mempertahankan identitas visual asli portofolio bertema *Deep Navy Glassmorphism* dengan latar belakang kustom pengguna.
  - *Color Palette & Mood*: Menggunakan variabel warna yang sudah ada (`--navy-deep: #0B1F33`, `--accent-blue: #1D6FA5`, `--accent-cyan: #00D9FF`, teks putih bersih `#FFFFFF`) dengan permukaan kartu semi-transparan (`backdrop-filter: blur(10px)`).
  - *Typography & Hierarchy*: Mempertahankan keluarga fon `Geist` dengan hierarki judul halaman yang tegas dan jarak antar-elemen yang proporsional setelah penghapusan kartu kemitraan.
  - *Component Styling & Layout*: Kontainer utama tetap selebar maksimum `1200px` dengan tata letak responsif yang rapi di layar desktop maupun perangkat seluler.
- **Interactive Feedback & Motion**: Efek *hover* pada tombol sub-tab, pembukaan modal detail perangkat ajar melalui portal, serta transisi pergantian konten tab tetap berfungsi penuh.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Penghapusan Penuh Kartu Kemitraan & Statistik**
  - *Chosen Approach*: Menghapus elemen kontainer kartu kemitraan beserta seluruh item statistik di dalamnya dari komponen tampilan PPL Mandiri.
  - *Why*: Informasi nama sekolah mitra, Guru Pamong, DPL, dan mahasiswa praktikan sudah tercantum lengkap pada *Hero Banner* tepat di atasnya, sehingga penghapusan kartu kedua membuat halaman lebih fokus dan tidak berulang.
  - *Alternatives Considered*: Menyembunyikan hanya bagian statistik bawah—tidak dipilih karena pengguna mengonfirmasi penghapusan seluruh kartu beserta isinya.
- **Decision 2: Penyederhanaan Sub-Tab Navigasi PPL Mandiri**
  - *Chosen Approach*: Menghapus tab *Inovasi Presensi QR Code* beserta blok tampilan kondisionalnya, menyisakan 4 tab akademik utama dengan *Alur & Tahapan Pelaksanaan* sebagai tab aktif bawaan.
  - *Why*: Menjaga fokus halaman PPL Mandiri khusus pada kegiatan asistensi, perangkat pembelajaran, refleksi LK 3, dan dokumentasi mengajar di kelas.

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌───────────────────────────────────────────────────────────────────┐
│                    Halaman PPL Mandiri (View)                     │
├───────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Hero Banner PPL Mandiri                                     │  │
│  │ • Judul & Deskripsi Praktik Mengajar SMAN 11 Yogyakarta     │  │
│  │ • Grid 4 Pemangku Kepentingan (Sekolah, Pamong, DPL, Mhs)   │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                 │                                 │
│                                 ▼                                 │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Navigasi Sub-Tab (State: activeTab)                         │  │
│  │ [ Alur & Tahapan ] [ Perangkat Ajar ] [ Refleksi ] [Galeri] │  │
│  └──────────────┬───────────────┬──────────────┬───────────┬───┘  │
│                 │               │              │           │      │
│                 ▼               ▼              ▼           ▼      │
│          ┌────────────┐  ┌────────────┐ ┌───────────┐ ┌─────────┐ │
│          │ Timeline   │  │ Grid Modul │ │ Blok LK 3 │ │ Galeri  │ │
│          │ 5 Fase PPL │  │ & Skenario │ │ 4 Bagian  │ │ Foto &  │ │
│          │            │  │ + Modal    │ │ Refleksi  │ │ Catatan │ │
│          └────────────┘  └────────────┘ └───────────┘ └─────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - State lokal `activeTab` mengelola 4 nilai tab aktif: `'alur'`, `'perangkat'`, `'refleksi'`, dan `'galeri'`.
  - State lokal `selectedArtifact` mengelola objek perangkat ajar yang sedang dibuka pada dialog modal detail.
- **Interactive Component & State Mapping**:
  - Klik pada salah satu dari 4 tombol sub-tab memperbarui `activeTab` dan merender bagian konten yang sesuai secara instan.
  - Klik tombol *Lihat Uraian Skenario Perangkat* pada tab *Perangkat Ajar & Modul* mengisi `selectedArtifact` dan menampilkan modal detail melalui React Portal; klik tombol *Tutup* atau area latar belakang mengembalikan `selectedArtifact` menjadi `null`.
