// Data komprehensif Praktik Pengalaman Lapangan (PPL) Mandiri
// Sekolah Mitra: SMA Negeri 11 Yogyakarta (SMA Kebangsaan)
// Mahasiswa Praktikan: Asyhar Qowiim (NIM: 25105260081)
// Guru Pamong: Dian C.R., S.Si. | DPL: Ir. Bekti Wulandari, S.Pd.T., M.Pd.

export const pplSchoolProfile = {
  name: 'SMA Negeri 11 Yogyakarta',
  nickname: 'SMA Kebangsaan',
  address: 'Jl. AM Sangaji No. 50, Cokrodiningratan, Kec. Jetis, Kota Yogyakarta, D.I. Yogyakarta 55233',
  accreditation: 'Akreditasi A',
  subjects: 'Informatika (Fase E Kelas X & Fase F Kelas XI)',
  studentPraktikan: 'Asyhar Qowiim',
  nim: '25105260081',
  studyProgram: 'Pendidikan Profesi Guru (PPG) Calon Guru — Bidang Informatika',
  university: 'Universitas Negeri Yogyakarta (UNY)',
  guruPamong: 'Dian C.R., S.Si.',
  pamongRole: 'Guru Pamong Mata Pelajaran Informatika SMAN 11 Yogyakarta',
  dpl: 'Ir. Bekti Wulandari, S.Pd.T., M.Pd.',
  dplRole: 'Dosen Pembimbing Lapangan (DPL) PPG UNY',
  period: 'Semester Ganjil & Genap Tahun Ajaran 2025/2026',
  badge: 'PPL Terbimbing & Mandiri',
  motto: 'Mewujudkan Pendidik Pembelajar, Humanis, Berkarakter Kebangsaan, dan Tanggap Teknologi Abad 21',
  keyStats: [
    { label: 'Kelas Sasaran Praktik', value: 'Kelas X Fase E & XI Fase F' },
    { label: 'Siklus Mengajar Mandiri', value: 'Terbimbing & Mandiri Penuh' },
    { label: 'Siswa Terfasilitasi', value: '180+ Peserta Didik' },
    { label: 'Inovasi Manajerial', value: 'Presensi Digital QR Code' }
  ]
}

export const pplPhases = [
  {
    phase: 'Fase 01',
    title: 'Orientasi & Observasi Lingkungan Sekolah Mitra',
    period: 'Awal Masa PPL',
    description: 'Pengenalan kultur sekolah kebangsaan, fasilitas laboratorium komputer, perangkat lunak penunjang pembelajaran, wawancara kurikulum bersama Kepala Sekolah dan Guru Pamong Dian C.R., S.Si., serta observasi profiling kesiapan belajar siswa.',
    outcomes: [
      'Pemetaan profil gaya belajar dan keragaman kognitif siswa Kelas X',
      'Analisis inventaris perangkat keras & konektivitas jaringan Laboratorium Informatika',
      'Penyelarasan Capaian Pembelajaran (CP) dan Alur Tujuan Pembelajaran (ATP) Kurikulum Merdeka'
    ]
  },
  {
    phase: 'Fase 02',
    title: 'Praktik Asistensi Mengajar Terbimbing',
    period: 'Pertengahan Semester I',
    description: 'Mendampingi Guru Pamong di dalam kelas, bertindak sebagai co-teacher dalam membimbing siswa saat sesi praktikum algoritma dasar, membantu pengelolaan kelas, dan merancang perangkat ajar perdana.',
    outcomes: [
      'Penyusunan Modul Ajar perdana materi Logika & Algoritma Informatika',
      'Penerapan scaffolding terarah bagi siswa yang mengalami kesulitan coding awal',
      'Dokumentasi Lembar Kerja 3 (LK 3) Refleksi Asistensi Terbimbing'
    ]
  },
  {
    phase: 'Fase 03',
    title: 'Praktik Mengajar Mandiri (PPLM) Siklus I & II',
    period: 'Semester II',
    description: 'Mengambil alih peran pengajaran secara mandiri di kelas Informatika SMA Negeri 11 Yogyakarta: memimpin apersepsi, simulasi kinestetik algoritma sorting/searching, pendampingan coding di laboratorium, dan asesmen autentik.',
    outcomes: [
      'Eksekusi Modul Ajar Berdiferensiasi & Pembelajaran Sosial Emosional (PSE)',
      'Penggunaan analogi kontekstual (mengurutkan tumpukan buku & kartu logika)',
      'Peningkatan ketuntasan capaian belajar siswa kelas Informatika hingga 91%'
    ]
  },
  {
    phase: 'Fase 04',
    title: 'Implementasi Projek Kepemimpinan di Sekolah Mitra',
    period: 'Semester II',
    description: 'Inisiasi dan rancang bangun Sistem Presensi Digital Berbasis QR Code bersama Tim Mahasiswa PPG Kelompok A2 untuk mengatasi kendala keterlambatan presensi manual dan titip absen di SMAN 11 Yogyakarta.',
    outcomes: [
      'Aplikasi web presensi QR Code berhasil diujicobakan pada 6 kelas',
      'Efisiensi waktu rekap kehadiran siswa meningkat 60% lebih cepat',
      'Pelatihan operasional untuk guru piket dan staf tata usaha sekolah'
    ]
  },
  {
    phase: 'Fase 05',
    title: 'Refleksi Pengalaman, Penilaian Pamong/DPL, & Berbagi Praktik Baik',
    period: 'Akhir Masa PPL',
    description: 'Penyusunan dokumen LK 3 Refleksi Praktik Mengajar Terbimbing/Mandiri, penelaahan catatan Guru Pamong & DPL, penyusunan laporan Best Practice, serta penyerahan kembali mahasiswa ke kampus UNY.',
    outcomes: [
      'Pengesahan Dokumen LK 3 PPLM oleh Dian C.R., S.Si. & Ir. Bekti Wulandari, S.Pd.T., M.Pd.',
      'Penyusunan Portofolio Digital berdasarkan pengalaman nyata di sekolah',
      'Rekomendasi tindak lanjut pengembangan profesi guru berkelanjutan'
    ]
  }
]

export const pplTeachingArtifacts = [
  {
    id: 'ppl-art-01',
    code: 'MODUL-SORT-SEARCH-SMAN11',
    title: 'Modul Ajar Informatika: Algoritma Sorting & Searching Fase E',
    category: 'Perangkat Modul Ajar',
    targetClass: 'Kelas X SMA Negeri 11 Yogyakarta',
    allocation: '3 JP (3 x 45 Menit)',
    summary: 'Rancangan modul ajar berbasis Understanding by Design (UbD) yang menjembatani konsep komputasional abstrak ke dalam analogi nyata kehidupan siswa (mengurutkan buku di perpustakaan sekolah dan kartu remi).',
    highlights: [
      'Model Pembelajaran: Problem Based Learning (PBL) dipadukan Kinesthetic Computing',
      'Diferensiasi Proses: Scaffolding visual bagi pemula dan tantangan analisis bagi kelompok mahir',
      'Integrasi PSE CASEL: Latihan pernapasan STOP saat menghadapi syntax error python',
      'Telah Diujicobakan dan Diverifikasi oleh Guru Pamong Dian C.R., S.Si.'
    ],
    sections: [
      {
        heading: 'Tujuan Pembelajaran Spesifik',
        content: 'Peserta didik mampu memahami logika kerja Bubble Sort dan Selection Sort, membandingkan efisiensi langkah pengurutan, serta menerapkan algoritma Linear Search dan Binary Search dalam pemecahan masalah data komputasional.'
      },
      {
        heading: 'Skenario Apersepsi Kontekstual',
        content: 'Guru memanggil 5 relawan siswa ke depan kelas dengan tinggi badan acak, lalu meminta siswa di tempat duduk memandu langkah pertukaran posisi berpasangan (Bubble Sort) hingga berurutan rapi. Hal ini menumbuhkan rasa ingin tahu dan pemahaman intuitif.'
      }
    ]
  },
  {
    id: 'ppl-art-02',
    code: 'LKPD-GAME-INFORMATIKA-11',
    title: 'LKPD Eksploratif: Detektif Algoritma & Tantangan Pengurutan Data',
    category: 'Bahan Ajar & Lembar Kerja',
    targetClass: 'Kelas X Informatika SMAN 11 Yogyakarta',
    allocation: 'Kegiatan Inti Berkelompok (4-5 Siswa)',
    summary: 'Lembar kerja kelompok yang menyajikan studi kasus detektif pengurutan data arsip perpustakaan sekolah, memandu siswa menuliskan trace table langkah demi langkah sebelum menulis kode program.',
    highlights: [
      'Alur Tantangan Bertingkat (Level 1: Konsep Kartu, Level 2: Pseudocode, Level 3: Implementasi)',
      'Menanamkan Keterampilan 4C: Kolaborasi, Komunikasi, Kritis, dan Kreatif',
      'Lembar Pengamatan Keaktifan Siswa Berbantuan Rubrik Kinerja'
    ],
    sections: [
      {
        heading: 'Petunjuk Aktivitas Kolaboratif',
        content: 'Setiap kelompok membagi peran: 1 orang pembaca algoritma (driver), 2 orang pelaksana simulasi kartu (operators), dan 1 orang pencatat tabel penelusuran (recorder). Semua anggota bertanggung jawab atas hasil kesimpulan kelompok.'
      }
    ]
  },
  {
    id: 'ppl-art-03',
    code: 'ASESMEN-AUTENTIK-PPLM-11',
    title: 'Instrumen Asesmen Autentik, Observasi Diskusi, & Rubrik Koding',
    category: 'Instrumen Evaluasi Pembelajaran',
    targetClass: 'Kelas X & XI Informatika',
    allocation: 'Formatif & Sumatif',
    summary: 'Paket instrumen evaluasi komprehensif mencakup tes diagnostik non-kognitif, lembar observasi partisipasi murid, rubrik analitis performa pemrograman, dan lembar peer assessment.',
    highlights: [
      'Rubrik Analitis 4 Skala untuk Mengukur 4 Pilar Computational Thinking',
      'Lembar Observasi Sikap Sosial Emosional (Regulasi Diri & Resiliensi)',
      'Kriteria Umpan Balik Santun: Apresiasi, Saran Konstruktif, dan Pertanyaan'
    ],
    sections: [
      {
        heading: 'Komponen Pengukuran Kinerja',
        content: 'Menilai ketepatan pseudocode (30%), keberhasilan eksekusi kode bebas bug (30%), kerja sama tim & etika interaksi (20%), serta kemampuan presentasi dan argumentasi ilmiah (20%).'
      }
    ]
  },
  {
    id: 'ppl-art-04',
    code: 'PROJEK-QR-SMAN11-A2',
    title: 'Projek Presensi Digital Berbasis QR Code di SMAN 11 Yogyakarta',
    category: 'Inovasi Manajerial Sekolah',
    targetClass: 'Implementasi 6 Kelas SMAN 11 Yogyakarta',
    allocation: 'Projek Kepemimpinan PPG Kelompok A2',
    summary: 'Rancang bangun sistem presensi digital berbasis QR Code untuk mengatasi antrean absensi pagi hari dan memudahkan rekapitulasi data kehadiran siswa oleh pihak sekolah secara otomatis.',
    highlights: [
      'Kolaborasi Mahasiswa PPG Tim A2 dengan Tim IT SMAN 11 Yogyakarta',
      'Pemindaian Menggunakan Kamera Ponsel / Laptop Guru Piket (<2 Detik per Siswa)',
      'Data Kehadiran Terkoneksi Langsung ke Spreadsheet Monitoring Sekolah',
      'Mendapat Sambutan Positif dari Kepala Sekolah dan Seluruh Guru Pamong'
    ],
    sections: [
      {
        heading: 'Dampak Nyata di Sekolah Mitra',
        content: 'Mengeliminasi penggunaan lembar presensi kertas yang tercecer, meminimalisir keterlambatan pelaporan ke wali kelas, serta meningkatkan kesadaran disiplin waktu bagi siswa SMAN 11 Yogyakarta.'
      }
    ]
  }
]

export const pplReflectionLK3 = {
  documentTitle: 'LK 3: Refleksi Praktik Mengajar Terbimbing & Mandiri PPLM',
  school: 'SMA Negeri 11 Yogyakarta',
  student: 'Asyhar Qowiim (NIM: 25105260081)',
  pamong: 'Dian C.R., S.Si.',
  dpl: 'Ir. Bekti Wulandari, S.Pd.T., M.Pd.',
  signDate: '8 Oktober 2026',
  sections: [
    {
      badge: 'Bagian A.1',
      title: 'Kegiatan Pembelajaran yang Berhasil Terlaksana dengan Baik',
      content: 'Penggunaan analogi kontekstual di dunia nyata—seperti mengurutkan tumpukan buku berdasarkan abjad atau mengurutkan kartu remi—terbukti sangat efektif membangun pemahaman awal siswa pada sesi apersepsi. Siswa yang awalnya menganggap algoritma sulit menjadi antusias dan aktif mencoba. Diskusi kelompok menggunakan LKPD kontekstual berhasil memicu interaksi sebaya yang suportif di laboratorium komputer.'
    },
    {
      badge: 'Bagian A.2',
      title: 'Kegiatan Pembelajaran yang Belum Maksimal & Kendala Nyata',
      content: 'Alokasi manajemen waktu pada jam pelajaran menjadi kendala utama; kegiatan diskusi kelompok yang sangat dinamis memakan waktu lebih panjang dari estimasi awal sehingga tidak seluruh perwakilan kelompok sempat mempresentasikan hasil kerjanya di depan kelas secara tuntas. Selain itu, terdapat 2-3 siswa di tiap kelompok yang masih cenderung pasif atau cemas ketika menghadapi pesan kesalahan (error) pada kode program.'
    },
    {
      badge: 'Bagian B.1',
      title: 'Umpan Balik Konstruktif dari Guru Pamong & DPL',
      content: 'Guru Pamong Dian C.R., S.Si. dan DPL Ir. Bekti Wulandari, S.Pd.T., M.Pd. mengapresiasi penguasaan materi dan kedekatan humanis dengan siswa, namun memberikan arahan strategis: 1) Perlunya pembatasan waktu (time-boxing) yang ketat dengan bantuan timer visual di layar proyektor, 2) Pembagian peran spesifik di tiap kelompok agar siswa pasif memiliki tanggung jawab wajib, dan 3) Penyelarasan rubrik asesmen agar lebih operasional.'
    },
    {
      badge: 'Bagian B.2',
      title: 'Rencana Tindakan Perbaikan Pembelajaran (Action Plan)',
      content: '1) Memasang timer digital visual di layar proyektor laboratorium agar siswa memiliki kesadaran manajemen waktu selama diskusi;\n2) Menerapkan teknik Think-Pair-Share dan rotasi peran kelompok sehingga semua siswa wajib mengutarakan pendapat;\n3) Membuka sesi praktikum dengan latihan berkesadaran penuh teknik S-T-O-P (2 menit) untuk mereduksi kepanikan siswa saat menghadapi syntax error coding;\n4) Menyediakan lembar panduan petunjuk cepat (cheat-sheet troubleshooting) di samping monitor laboratorium.'
    }
  ]
}

export const pplGalleryActivities = [
  {
    title: 'Apel Pagi & Pengenalan Lingkungan SMA Kebangsaan 11',
    category: 'Orientasi Sekolah',
    description: 'Mengikuti upacara bendera hari Senin dan pengenalan mahasiswa PPL PPG Calon Guru di hadapan civitas akademika SMA Negeri 11 Yogyakarta.'
  },
  {
    title: 'Observasi & Inventarisasi Laboratorium Komputer',
    category: 'Sarana & Prasarana',
    description: 'Pemeriksaan kesiapan perangkat keras PC, konfigurasi jaringan lokal LAN, serta instalasi aplikasi compiler Python dan Cisco Packet Tracer di lab komputer.'
  },
  {
    title: 'Konsultasi Perangkat Ajar bersama Guru Pamong Dian C.R., S.Si.',
    category: 'Bimbingan Pedagogik',
    description: 'Diskusi intensif penelaahan Modul Ajar Informatika Fase E, sinkronisasi alur tujuan pembelajaran, dan penyelarasan rubrik asesmen formatif.'
  },
  {
    title: 'Praktik Mengajar Mandiri: Apersepsi Kinestetik Algoritma',
    category: 'Praktik Kelas',
    description: 'Pelaksanaan simulasi pertukaran posisi siswa di depan kelas untuk mengenalkan prinsip Bubble Sort secara menyenangkan dan kontekstual.'
  },
  {
    title: 'Pendampingan Praktikum Laboratorium & Mindfulness S-T-O-P',
    category: 'Praktik Laboratorium',
    description: 'Membimbing siswa melakukan debugging kode program Python dan mempraktikkan regulasi emosi saat program mengalami galat komputasi.'
  },
  {
    title: 'Uji Coba Lapangan Sistem Presensi QR Code Tim A2',
    category: 'Inovasi Manajerial',
    description: 'Implementasi langsung pemindaian kartu QR Code siswa di depan pintu masuk kelas bersama guru piket dan staf kesiswaan SMAN 11 Yogyakarta.'
  }
]
