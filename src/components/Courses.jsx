import React, { useMemo, useState } from 'react'
import './Courses.css'

// Helper: semester property digunakan untuk prefix MATKUL-S1/S2
const coursesData = [
  {
    number: '01', semester: 1,
    category: 'Refleksi',
    title: 'Filosofi Pendidikan dan Pendidikan Nilai',
    description: 'Pemahaman mendalam mengenai dasar filosofis pendidikan, pembentukan karakter, dan penanaman nilai dalam proses belajar.',
    detail: {
      fullTitle: 'detail mata kuliah Filosofi Pendidikan dan Pendidikan nilai',
      fullDescription: 'Mata kuliah Filosofi Pendidikan dan Pendidikan Nilai (FPPN) ini, membekali peserta PPG sebagai calon guru dengan kemampuan untuk memahami filosofi pendidikan Indonesia, menginternalisasi nilai-nilai ke-Indonesia-an dalam menjalankan tugas sebagai pendidik dan dalam kehidupan keseharian, serta berkomitmen pada nilai-nilai moral dan etika, dasar-dasar kepemimpinan, dan sebagai pembelajar sepanjang hayat.',
      topics: [
        {
          name: 'Landasan Filosofi Pendidikan Nasional',
          learningObjectives: [
            'Menjelaskan dan menganalisis filosofi pendidikan Indonesia berdasarkan pokok pemikiran Ki Hadjar Dewantara secara komprehensif dan kritis.',
            'Mahasiswa mampu menjelaskan dan mengaitkan Filsafat Pancasila sebagai landasan filosofi pendidikan Indonesia dengan tujuan pendidikan nasional secara tepat dan argumen yang kuat.',
            'Mahasiswa mampu merancang pembelajaran yang berpusat pada peserta didik secara efektif, kontekstual, dan relevan dengan karakteristik peserta didik.'
          ]
        },
        {
          name: 'Pola Pikir Bertumbuh Dalam Pendidikan Nasional',
          learningObjectives: [
            'Menjelaskan dan menguraikan pentingnya pola pikir bertumbuh dalam proses belajar dengan argumen yang jelas dan contoh yang relevan.',
            'Mengaitkan pola pikir bertumbuh dengan kerangka pendidikan nasional.'
          ]
        },
        {
          name: 'Pendidikan Nilai dalam Kerangka Pendidikan Nasional',
          learningObjectives: [
            'Menjelaskan dan menganalisis urgensi Pendidikan Nilai sebagai pondasi karakter bangsa secara komprehensif dan relevan dengan konteks kebangsaan.',
            'Menguasai berbagai strategi internalisasi dan pengembangan nilai, serta merancang pembelajaran dengan mengimplementasikan strategi tersebut secara efektif dan relevan dengan tujuan pembelajaran.',
            'Merancang strategi pengembangan diri melalui kajian teori, refleksi diri, dan diskusi kasus dengan menunjukkan strategi yang realistis dan relevan untuk mewujudkan peran guru sebagai role model dalam menghidupkan nilai.'
          ]
        },
        {
          name: 'Kode Etik Guru',
          learningObjectives: [
            'Menjelaskan pentingnya kode etik profesi sebagai panduan berperilaku guru secara komprehensif sebagai dasar perilaku profesional.',
            'Menunjukkan komitmen untuk menjalankan kode etik guru secara etis dan konsisten dalam setiap tindakan profesional.'
          ]
        }
      ]
    }
  },
  {
    number: '02',
    semester: 1,
    category: 'Pedagogik',
    title: 'Peserta Didik dan Pemahamannya',
    description: 'Dokumentasi proses memahami karakteristik, perkembangan, dan kebutuhan peserta didik sebagai dasar perencanaan.',
    detail: {
      fullTitle: 'Detail Mata Kuliah Pemahaman tentang Peserta Didik dan Pembelajaran',
      fullDescription: 'Mata kuliah ini bertujuan membekali peserta PPG Calon Guru dengan kompetensi dalam memahami karakteristik, kebutuhan, dan potensi peserta didik secara holistik sebagai dasar dalam merancang, melaksanakan dan evaluasi pembelajaran yang efektif dan berpusat pada peserta didik menggunakan pendekatan Pembelajaran Mendalam. Peserta PPG mempelajari berbagai teori perkembangan peserta didik (kognitif, sosial-emosional, moral, dan fisik), gaya belajar, perbedaan individu, serta konteks sosial dan budaya yang mempengaruhi proses belajar. Selain itu, mata kuliah ini juga mengkaji prinsip-prinsip pembelajaran yang konstruktif, humanistik, dan berdiferensiasi, serta bagaimana merancang pengalaman belajar yang adaptif dan inklusif. Mahasiswa akan dilatih untuk melakukan identifikasi kebutuhan belajar peserta didik melalui observasi, asesmen, dan refleksi, serta menerapkan hasil pemahaman tersebut dalam perencanaan, pelaksanaan, dan evaluasi pembelajaran melalui pembelajaran mikro. Mata kuliah ini terintegrasi dengan mata kuliah PPL terbimbing. Mahasiswa akan terlibat dalam studi kasus, diskusi kolaboratif, simulasi, dan refleksi untuk mengembangkan kemampuan dalam mengidentifikasi kebutuhan belajar, melakukan profiling peserta didik, serta merancang strategi pembelajaran yang responsif dan adaptif. Dengan demikian, lulusan diharapkan mampu menciptakan lingkungan belajar yang memuliakan keberagaman, mendorong kemandirian, dan mendukung perkembangan optimal setiap peserta didik.',
      topics: [
        {
          name: 'Memahami Peserta Didik Secara Holistik',
          learningObjectives: [
            'Mahasiswa mampu menggunakan berbagai teori perkembangan peserta didik (kognitif, sosial-emosional, moral, dan fisik) sebagai fondasi untuk merancang pembelajaran yang relevan dan kontekstual.'
          ],
          cpmk: [
            'CPMK 1: Menunjukkan sikap bertanggung jawab dan beretika profesi dengan merancang strategi pembelajaran inklusif yang menghargai keberagaman latar belakang, kemampuan, dan keyakinan peserta didik.',
            'CPMK 9a: Menguasai teori-teori perkembangan peserta didik (kognitif, sosial-emosional, moral, dan fisik) untuk memahami karakteristik, kebutuhan, dan potensi peserta didik secara holistik.',
            'CPMK 9b: Menerapkan hasil pemahaman tentang peserta didik dalam praktik perencanaan, pelaksanaan, dan evaluasi pembelajaran melalui kegiatan pembelajaran mikro.'
          ],
          subCpmk: [
            'Mahasiswa mampu menggunakan teori perkembangan kognitif sebagai fondasi untuk merancang pembelajaran yang relevan dan kontekstual.',
            'Mahasiswa mampu menggunakan teori perkembangan sosial-emosional sebagai fondasi untuk merancang pembelajaran yang relevan dan kontekstual.',
            'Mahasiswa mampu menerapkan kerangka teoritis perkembangan moral dan fisik individu sebagai fondasi untuk merancang pembelajaran yang relevan dan kontekstual.'
          ]
        },
        {
          name: 'Perbedaan Karakteristik Peserta Didik',
          learningObjectives: [
            'Mahasiswa mampu menggunakan berbagai teori perkembangan peserta didik (kognitif, sosial-emosional, moral, dan fisik) sebagai fondasi untuk merancang pembelajaran yang relevan dan kontekstual.'
          ],
          cpmk: [
            'CPMK 15: Memahami perbedaan karakteristik peserta didik (bakat, minat, fisik, kognitif, dan sosio-budaya) untuk menciptakan pengalaman belajar yang adaptif dan inklusif.'
          ],
          subCpmk: [
            'Mahasiswa mampu menganalisis keragaman keadaan fisik peserta didik di dalam kelas ditinjau dari konsep perbedaan fisik individu.',
            'Mahasiswa mampu menganalisis keragaman kemampuan berfikir peserta didik di dalam kelas ditinjau dari konsep kemampuan kognitif individu.',
            'Mahasiswa mampu menganalisis keragaman sosial emosional peserta didik di dalam kelas ditinjau dari latar belakang sosial emosional individu.',
            'Mahasiswa mampu menganalisis keragaman bakat dan minat peserta didik di dalam kelas ditinjau dari teori relevan.'
          ]
        },
        {
          name: 'Pembelajaran Berpusat Pada Peserta Didik',
          learningObjectives: [
            'Mahasiswa mampu memahami dan menerapkan konsep ragam teori belajar yang mendasari pembelajaran berpusat pada peserta didik dan menjadikannya dasar dalam merancang pembelajaran yang memuliakan peserta didik.'
          ],
          cpmk: [
            'CPMK 14: Menguasai konsep dan prinsip pembelajaran konstruktif, humanistik, dan berdiferensiasi serta penerapannya dalam merancang pengalaman belajar yang adaptif dan inklusif.'
          ],
          subCpmk: [
            'Mahasiswa mampu merencanakan pembelajaran yang berpusat pada peserta didik dengan berbasis teori belajar konstruktivisme dan humanisme.',
            'Mahasiswa mengidentifikasi karakteristik pembelajaran terdiferensiasi dan menerapkannya dalam merancang pembelajaran berpusat pada peserta didik.'
          ]
        },
        {
          name: 'Profiling Peserta Didik',
          learningObjectives: [
            'Mahasiswa mampu memanfaatkan hasil asesmen awal untuk mengidentifikasi kebutuhan belajar dan merancang strategi pembelajaran yang adaptif.'
          ],
          cpmk: [
            'CPMK 15: Memahami perbedaan karakteristik peserta didik (bakat, minat, fisik, kognitif, dan sosio-budaya) untuk menciptakan pengalaman belajar yang adaptif dan inklusif.'
          ],
          subCpmk: [
            'Mahasiswa mampu merancang asesmen awal untuk memetakan karakteristik dan kebutuhan belajar peserta didik.',
            'Mahasiswa mampu memahami dan menguraikan ragam jenis hambatan dalam belajar, baik untuk peserta didik pada umumnya maupun peserta didik berkebutuhan khusus.'
          ]
        }
      ]
    }
  },
  {
    number: '03',
    semester: 1,
    category: 'Pedagogik',
    title: 'Pembelajaran Mendalam dan Asesmen Dasar',
    description: 'Mata kuliah yang membekali prinsip perancangan pembelajaran mendalam dan asesmen dasar yang efektif.',
    detail: {
      fullTitle: 'Detail Mata Kuliah Pembelajaran Mendalam dan Asesmen (PMA) Dasar SMK',
      fullDescription: 'Mata kuliah ini membekali peserta PPG calon Guru dengan pemahaman konseptual multistruktural, mengaplikasikan keterampilan praktis relasional, dan merefleksi pemikiran abstrak mendalam mengenai pendekatan pembelajaran kejuruan mendalam di SMK dan keterampilan praktis mengenai pendekatan pembelajaran mendalam (deep learning) dalam konteks pembelajaran di SMK. Melalui pendekatan case method dan Project Based Learning pada mata kuliah ini peserta diharapkan mampu menelaah, merancang, melaksanakan, serta mengevaluasi pembelajaran dan asesmen yang mengimplementasikan pembelajaran mendalam di SMK. Mata kuliah ini terintegrasi dengan mata kuliah Praktik Pengalaman Lapangan (PPL) Terbimbing sesuai dengan kekhasan pembelajaran di SMK, dan menekankan evaluasi reflektif menggunakan asesmen yang menerapkan prinsip keadilan, keterbukaan, objektivitas, keberlanjutan, holistik, keanekaragaman, integritas, akuntabilitas, responsivitas, dan keterhubungan dengan tujuan pendidikan.',
      topics: [
        {
          name: 'Pendekatan Pembelajaran Mendalam di SMK',
          learningObjectives: [
            'Mahasiswa mampu memahami pendekatan pembelajaran mendalam dalam konteks pendidikan kejuruan.',
            'Mahasiswa mampu menganalisis pendekatan pembelajaran mendalam dalam konteks pendidikan kejuruan.'
          ]
        },
        {
          name: 'Rancangan Pembelajaran Mendalam dan Asesmen',
          learningObjectives: [
            'Mahasiswa mampu menelaah rancangan pembelajaran dan asesmen.'
          ]
        },
        {
          name: 'Perencanaan Pembelajaran Mendalam dan Asesmen',
          learningObjectives: [
            'Mahasiswa mampu merancang rencana pembelajaran dan asesmen yang mengintegrasikan pendekatan pembelajaran dengan menggunakan Pendekatan Understanding by Design (UbD).'
          ]
        },
        {
          name: 'Implementasi Pelaksanaan Pembelajaran Mendalam dan Asesmen Menggunakan Kerangka DUP',
          learningObjectives: [
            'Mahasiswa mampu menerapkan prinsip-prinsip DUP dalam pelaksanaan pembelajaran mendalam dan asesmen di SMK, dengan memperhatikan keberagaman kebutuhan belajar murid.'
          ]
        },
        {
          name: 'Evaluasi, Refleksi dan Memaknai Pelaksanaan Pembelajaran Mendalam dan Asesmen',
          learningObjectives: [
            'Mahasiswa mampu mengevaluasi pelaksanaan pembelajaran dan asesmen, melakukan refleksi kritis, dan merumuskan langkah perbaikan berbasis temuan dan data hasil belajar.'
          ]
        }
      ]
    }
  },
  { number: '04', semester: 1, category: 'PPL', title: 'Pengalaman Lapangan (PPL) Terbimbing', description: 'Praktik pembelajaran Informatika bersama Guru Pamong dan Dosen Pembimbing Lapangan.' },
  {
    number: '05',
    semester: 1,
    category: 'Pedagogik',
    title: 'Pola Pikir Bertumbuh (Growth Mindset)',
    description: 'Refleksi tentang neuroplastisitas, resiliensi, dan strategi membangun budaya belajar yang terus berkembang.'
  },
  {
    number: '06',
    semester: 1,
    category: 'Pedagogik',
    title: 'Pembelajaran Kreatif dan Inovatif',
    description: 'Eksplorasi strategi, metode, dan media pembelajaran berbasis teknologi yang memfasilitasi kreativitas.',
    detail: {
      fullTitle: 'Detail Mata Kuliah Pembelajaran Kreatif dan Inovatif',
      fullDescription: 'Mata kuliah Pembelajaran Kreatif dan Inovatif membekali peserta PPG dengan kemampuan untuk merancang, menganalisis, dan mengimplementasikan pembelajaran yang mendorong kreativitas serta inovasi dalam konteks pendidikan berbasis teknologi, dengan pendekatan Penelitian Tindakan Kelas (PTK) sebagai sarana refleksi dan perbaikan berkelanjutan.',
      topics: [
        {
          name: 'Konsep Dasar Pembelajaran Kreatif dan Inovatif',
          learningObjectives: [
            'Mahasiswa mampu mendeskripsikan pengertian pembelajaran kreatif.',
            'Mahasiswa mampu mendeskripsikan pengertian pembelajaran inovatif.',
            'Mahasiswa mampu menjelaskan urgensi pembelajaran kreatif dan inovatif.'
          ]
        },
        {
          name: 'Objek dan Persoalan dalam Pembelajaran Kreatif dan Inovatif',
          learningObjectives: [
            'Menjelaskan objek pembelajaran beserta perannya dalam pembelajaran kreatif dan inovatif.',
            'Menganalisis objek pembelajaran dalam konteks sistem pembelajaran.',
            'Menentukan langkah penentuan objek pembelajaran, khususnya dengan pendekatan TPACK.',
            'Mengidentifikasi dan menavigasi tantangan yang mungkin muncul dalam penerapan objek pembelajaran dalam konteks pendidikan kreatif dan inovatif.',
            'Menjelaskan tantangan dalam menggunakan objek pembelajaran untuk mendukung pembelajaran kreatif dan inovatif.',
            'Mendeskripsikan peran guru dalam merancang, memilih, dan mengintegrasikan objek pembelajaran.'
          ]
        },
        {
          name: 'Instrumen Analisis Situasi dalam Pembelajaran Kreatif dan Inovatif Melalui Tindakan Kelas',
          learningObjectives: [
            'Menjelaskan konsep analisis situasi dalam pembelajaran kreatif dan inovatif.',
            'Menentukan teknik dan instrumen analisis situasi dalam pembelajaran kreatif dan inovatif melalui tindakan kelas.',
            'Mengembangkan instrumen analisis situasi dalam pembelajaran kreatif dan inovatif melalui tindakan kelas.'
          ]
        },
        {
          name: 'Menemukan Masalah Pembelajaran untuk Merancang Pembelajaran Kreatif dan Inovatif',
          learningObjectives: [
            'Menentukan masalah pembelajaran untuk merancang pembelajaran kreatif dan inovatif berdasarkan data hasil observasi ditinjau dari perspektif mahasiswa.',
            'Melakukan identifikasi masalah pembelajaran untuk merancang pembelajaran kreatif dan inovatif melalui observasi pembelajaran dan wawancara.'
          ]
        },
        {
          name: 'Solusi dan Rencana Aksi Pembelajaran dalam PTK',
          learningObjectives: [
            'Mahasiswa dituntut untuk lebih banyak belajar mandiri dengan mencari sumber terkait Solusi dan Rencana Aksi Pembelajaran dalam PTK untuk kemudian mencatat hal penting yang ada didalamnya.'
          ]
        },
        {
          name: 'Instrumen Pengumpulan Data',
          learningObjectives: [
            'Mahasiswa dituntut untuk lebih banyak belajar mandiri dengan mencari sumber terkait Instrumen Pengumpulan Data untuk kemudian mencatat hal penting yang ada didalamnya.'
          ]
        }
      ]
    }
  },
  { number: '07', semester: 2, category: 'Pedagogik', title: 'Pembelajaran Sosial Emosional', description: 'Pengembangan pembelajaran yang memperhatikan aspek sosial dan emosional (CASEL) peserta didik dalam lingkungan belajar.' },
  { number: '08', semester: 2, category: 'Pedagogik', title: 'Pengembangan Keprofesian Berkelanjutan', description: 'Penguatan kompetensi pendidik sebagai praktisi reflektif dan ilmuwan melalui filsafat ilmu, Best Practice, dan KTI.' },
  { number: '09', semester: 2, category: 'PPL', title: 'Yogyakarta_Praktik Pengalaman Lapangan (PPL) Mandiri', description: 'Pelaksanaan praktik mengajar mandiri di SMAN 11 Yogyakarta pada materi logika algoritma sorting dan searching.' },
  { number: '10', semester: 2, category: 'Pedagogik', title: 'Pembelajaran Mendalam dan Asesmen Lanjut SMK', description: 'Perancangan pembelajaran mendalam dan asesmen autentik berorientasi DUDI lintas disiplin kejuruan di SMK.' },
  { number: '11', semester: 2, category: 'Seminar', title: 'Seminar Pendidikan Profesi Guru', description: 'Refleksi pengalaman belajar, penyusunan portofolio digital, dan berbagi hasil karya inovasi pembelajaran selama PPG.' },
  { number: '12', semester: 2, category: 'Kepemimpinan', title: 'Projek Kepemimpinan', description: 'Pengembangan kepemimpinan personal, growth mindset, dan inovasi sistem presensi digital QR Code di SMAN 11 Yogyakarta.' }
]

const reflectionData = {
  '01': {
    topic: 'MATKUL-S1-01: Peran Guru dalam Pendidikan Nilai (Filosofi & Pendidikan Nilai)',
    connection: 'Materi ini menghubungkan filosofi Ki Hadjar Dewantara dan pendidikan nilai sebagai fondasi karakter bangsa. Pendidikan nilai merupakan tanggung jawab moral seluruh guru mata pelajaran, bukan hanya guru Agama atau Pancasila.',
    challenge: 'Membongkar pola pikir bahwa penanaman karakter adalah porsi guru tertentu, serta menerapkan strategi internalisasi nilai secara konsisten di ruang kelas.',
    concept: '1. Guru sebagai teladan dan penuntun karakter murid.\n2. Kerangka pendidikan nasional berbasis nilai luhur Pancasila.\n3. Strategi internalisasi nilai melalui Connect-Extend-Challenge.',
    change: 'Mengintegrasikan penanaman nilai karakter secara eksplisit dalam setiap modul ajar dan menjadi role model keteladanan bagi peserta didik.',
    artifactPdfUrl: 'https://drive.google.com/file/d/1aVq9F-33Xc4xNg12H_Z_G50gOxIk_GA8/view?usp=sharing',
    artifacts: [
      'Artefak 1: Dokumen Aktivitas Identifikasi Peran Guru dalam Pendidikan Nilai (Modul 3.4.1).',
      'Artefak 2: Pemetaan alur Connect-Extend-Challenge dan komitmen menjalankan pendidikan nilai.',
      'Artefak 3: Formulasi rumusan peran guru pada lembar Extend dan lembar komitmen tanggung jawab nilai.'
    ]
  },
  '02': {
    topic: 'MATKUL-S1-02: Dilema di Kelas yang Pasif (Peserta Didik & Pemahamannya)',
    connection: 'Materi ini mengaitkan psikologi perkembangan peserta didik dengan metode mengajar; ceramah konvensional tidak lagi cukup untuk menggerakkan partisipasi siswa abad ke-21.',
    challenge: 'Menghadapi fenomena kepasifan siswa, ketergantungan pada instruksi detail guru, serta kebiasaan copy-paste saat mengerjakan tugas analisis mandiri.',
    concept: '1. Transisi dari teacher-centered ke student-centered.\n2. Teori konstruktivisme dan humanisme untuk kemandirian belajar.\n3. Penciptaan iklim kelas yang aman secara psikologis.',
    change: 'Bertransformasi menjadi fasilitator yang melatih keterampilan berpikir kritis dan membangun keaktifan siswa melalui interaksi kolaboratif.',
    artifactPdfUrl: 'https://drive.google.com/file/d/18MEm6sOsduEWuqpOckRoTg-j_nyHjNhh/view?usp=sharing',
    artifacts: [
      "Artefak 1: Lembar Penelaahan Studi Kasus 'Dilema Kelas yang Pasif' (Kasus Bu Sinta - XI IPS 2).",
      'Artefak 2: Analisis kritis akar penyebab kepasifan siswa dan teori belajar yang relevan.',
      'Artefak 3: Analisis pertanyaan panduan 1–4 serta catatan diskusi Think-Pair-Share bersama rekan sejawat.'
    ]
  },
  '03': {
    topic: 'MATKUL-S1-03: Pembelajaran Mendalam dan Asesmen (PMA Dasar)',
    connection: 'Menghubungkan pembelajaran kontekstual dengan tuntutan dunia kerja melalui deep learning yang bermakna, berkesadaran, dan menggembirakan.',
    challenge: 'Mengatasi kesenjangan antara dominasi ceramah guru dengan kebutuhan industri yang memerlukan lulusan mandiri, kreatif, dan adaptif memecahkan masalah.',
    concept: '1. Problem/Project Based Learning (PBL/PjBL).\n2. Kolaborasi interaktif dan kasus industri otentik.\n3. Refleksi berkala proses belajar siswa.',
    change: 'Merancang tugas pemecahan masalah kontekstual, memfasilitasi kerja kelompok terarah, dan menyelenggarakan refleksi manfaat materi ajar.',
    artifactPdfUrl: 'https://drive.google.com/file/d/19nWmU4wYa8OkUy3ZnThWTfI5acrLo6q5/view?usp=sharing',
    artifacts: [
      'Artefak 1: Lembar Jawaban Aktivitas 1.1 Kesenjangan Pembelajaran (SMK Multi Karya & SMK Karya Nyata).',
      'Artefak 2: Solusi konkret atas dominasi ceramah melalui perancangan tugas berbasis masalah otentik.',
      'Artefak 3: Jawaban pemantik strategi proyek, manfaat kerja sama tim, dan instrumen refleksi murid.'
    ]
  },
  '04': {
    topic: 'MATKUL-S1-04: Praktik Asistensi PPL Terbimbing (SMA N 11 Yogyakarta)',
    connection: 'Menghubungkan rancangan perangkat ajar dengan praktik mengajar nyata di laboratorium Informatika SMA N 11 Yogyakarta di bawah bimbingan Guru Pamong dan DPL.',
    challenge: 'Manajemen alokasi waktu jam pelajaran agar seluruh kelompok dapat presentasi, serta mendorong partisipasi siswa yang masih pasif berpendapat.',
    concept: '1. Apersepsi kontekstual dan studi kasus nyata.\n2. Diskusi kelompok berbantuan LKPD terstruktur.\n3. Penyelarasan modul sesuai masukan pamong.',
    change: 'Memvariasikan media permainan edukatif, mematangkan time management kegiatan, dan merangsang keaktifan siswa yang pendiam.',
    artifactPdfUrl: 'https://drive.google.com/file/d/1fyuT1TdNkPavfCno4XvPKcnz86WgTljE/view?usp=sharing',
    artifacts: [
      'Artefak 1: Lembar Kerja 3 (LK 3) Refleksi Praktik Asistensi Mengajar Terbimbing SMAN 11 Yogyakarta.',
      'Artefak 2: Bukti evaluasi kendala nyata kelas dan tindak lanjut perbaikan berbasis masukan pamong.',
      'Artefak 3: Uraian kendala waktu presentasi (A.2–3) dan lembar perbaikan modul ajar (B.1–2).'
    ]
  },
  '05': {
    topic: 'MATKUL-S1-05: Guru yang Menumbuhkan Growth Mindset (Pola Pikir Bertumbuh)',
    connection: 'Menekankan bahwa guru dengan growth mindset memandang kesulitan belajar murid sebagai petunjuk untuk memperbaiki strategi mengajar, bukan melabeli kemampuan siswa.',
    challenge: "Mengikis fixed mindset guru seperti memberi label negatif permanen kepada murid ('sulit diatur') atau terjebak dalam zona nyaman metode mengajar monoton.",
    concept: '1. Pembedaan sikap Fixed vs Growth Mindset guru.\n2. Adaptabilitas strategi belajar yang dinamis.\n3. Penilaian yang menghargai proses dan usaha.',
    change: 'Menjadi pendidik fleksibel yang berorientasi solusi, gigih mencoba pendekatan baru, dan terbuka belajar dari rekan sejawat.',
    artifactPdfUrl: 'https://drive.google.com/file/d/1fhn9zfktEXgOM3rtyjcuDBO4rbxY_y6Q/view?usp=sharing',
    artifacts: [
      'Artefak 1: Lembar Kerja 4.1 Identifikasi Pola Pikir Guru (Tetap vs Bertumbuh).',
      'Artefak 2: Evaluasi diri menganalisis 10 pernyataan sikap guru beserta alasan rasionalnya.',
      'Artefak 3: Tabel identifikasi pola pikir pada poin perubahan strategi pembelajaran (nomor 2, 4, 6, 8, 10).'
    ]
  },
  '06': {
    topic: 'MATKUL-S1-06: Pembelajaran Kreatif dan Inovatif (Tugas Kelompok 4)',
    connection: 'Menghubungkan mutu pendidikan dengan penguasaan keterampilan abad ke-21 (4C: Critical Thinking, Communication, Collaboration, Creativity) berbasis teknologi.',
    challenge: 'Mengatasi rasa takut salah murid saat mengemukakan ide serta merancang aktivitas yang menuntut eksplorasi mandiri.',
    concept: '1. Enam ciri kelas kreatif-inovatif (iklim aman, tugas otentik, kolaborasi, teknologi, formatif, fasilitator).\n2. Instrumen analisis situasi Penelitian Tindakan Kelas (PTK).',
    change: 'Menerapkan pembelajaran berbasis proyek, blended learning, design thinking, dan umpan balik yang mengapresiasi proses karya siswa.',
    artifactPdfUrl: 'https://drive.google.com/file/d/10cQzoYf_cJ3I8HEEKrhOLN545DLHLXNQ/view?usp=sharing',
    artifacts: [
      'Artefak 1: Matriks Debat Pro-Kontra & Instrumen Analisis Video Pembelajaran (Tugas Kelompok 4).',
      'Artefak 2: Bukti analisis teoritis urgensi pembelajaran kreatif serta evaluasi penerapannya dalam video.',
      'Artefak 3: Daftar indikator kelas inovatif, argumentasi 4C, dan lembar centang pengamatan video.'
    ]
  },
  '07': {
    topic: 'MATKUL-S2-01: Pembelajaran Sosial Emosional (PSE)',
    connection: 'Materi Pembelajaran Sosial Emosional (PSE) mengaitkan pemahaman psikologis, regulasi emosi, dan iklim interaksi peserta didik dengan peran strategis saya sebagai calon guru Informatika. Penguasaan aspek teknis maupun perancangan algoritma tidak dapat dipisahkan dari kesiapan mental peserta didik. Ketika siswa mengalami hambatan teknis atau pesan kesalahan (syntax error), murid rentan mengalami kecemasan atau frustrasi. Melalui PSE, saya menyadari peran guru tidak terbatas pada pengajaran kognitif, melainkan mencakup pembimbingan ketahanan emosional (resilience), kolaborasi tim yang sehat, serta keteladanan dalam bersikap tenang dan etis saat memecahkan masalah komputasional.',
    challenge: 'Tantangan terbesar adalah mengubah cara mengajar yang hanya berfokus pada materi dan kode python tanpa memperhatikan emosi siswa. Guru perlu membimbing siswa agar tetap tenang saat menghadapi kesalahan, sekaligus mampu mengendalikan emosi dan menjaga kesabaran ketika menghadapi kelas yang pasif atau siswa yang kurang semangat belajar.',
    concept: '1. Lima Kompetensi CASEL: Kesadaran Diri (Roda Emosi), Manajemen Diri (Teknik S-T-O-P 2 menit), Kesadaran Sosial, Keterampilan Berelasi (Apresiasi – Saran – Pertanyaan), dan Pengambilan Keputusan Bertanggung Jawab.\n2. Integrasi PSE dengan Asesmen: Mengintegrasikan PSE dengan hasil asesmen untuk memahami kebutuhan siswa secara menyeluruh dan objektif.',
    change: '1. Mengintegrasikan 5 kompetensi sosial emosional ke dalam Modul Ajar Informatika pada tahap pendahuluan, inti, dan penutup.\n2. Membuka sesi laboratorium dengan identifikasi emosi (Roda Emosi) dan latihan teknik S-T-O-P 2 menit.\n3. Mendampingi regulasi frustrasi murid saat menghadapi kendala teknis atau error kode python.\n4. Menerapkan jurnal refleksi berkala dan ruang resiliensi emosional guru untuk mencegah burnout.',
    artifactPdfUrl: 'https://drive.google.com/file/d/1qjTxLIVYVq_jU6mrCxuFMTpPC8ZRwDZd/view?usp=sharing',
    artifacts: [
      'Artefak 1: Dokumen Tugas LMS Ruang Kolaborasi 1.D (Kelompok 3) dan Dokumen Aksi Nyata Modul Ajar Informatika Kelas X Terintegrasi PSE.',
      'Artefak 2: Dipilih karena menyajikan kesinambungan antara pemahaman konseptual matriks CASEL dengan eksekusi nyata di kelas (latihan STOP, Roda Emosi, dan rubrik asesmen).',
      'Artefak 3: Tugas 1.D (Matriks Self-Management & Decision-Making) serta Modul Ajar (check-in emosi, regulasi saat error kode python, umpan balik santun, dan rubrik asesmen).'
    ]
  },
  '08': {
    topic: 'MATKUL-S2-02: Pengembangan Keprofesian Berkelanjutan (PKB)',
    connection: 'Materi PKB menuntut guru untuk tidak hanya bertindak sebagai pengajar di ruang kelas, tetapi juga memosisikan diri sebagai praktisi reflektif dan ilmuwan pendidik. Kemampuan menyusun dan menganalisis laporan Best Practice serta Karya Tulis Ilmiah (KTI) menjadi pilar utama peningkatan kompetensi profesional. Landasan filsafat ilmu (ontologi fakta masalah kelas, epistemologi metode ilmiah berbasis data, dan aksiologi kemanfaatan ilmu) memandu guru merancang perbaikan kelas yang teruji dan dapat dipertanggungjawabkan secara akademik.',
    challenge: 'Tantangan paling mendasar adalah mengubah orientasi penyusunan laporan pembelajaran yang selama ini cenderung deskriptif-administratif atau sekadar klaim subjektif menuju tradisi riset ilmiah yang ketat. Selain itu, menguasai penerapan logika penalaran Deduktif-Nomologikal (DN) dan Induktif-Statistik (IS) berbasis instrumen yang teruji validitas dan reliabilitasnya.',
    concept: '1. Struktur Fundamental Filosofis Best Practice: Ontologi (fakta masalah kelas), Epistemologi (metode ilmiah sistematis), dan Aksiologi (nilai guna ilmu bagi kebudayaan).\n2. Model Penalaran KTI: Deduktif-Nomologikal (DN) dan Induktif-Statistik (IS).\n3. Triad Sarana Berpikir Ilmiah: Bahasa, Matematika, dan Statistika.\n4. Triad Kebenaran Ilmiah: Rasional, Empirik, dan Transendental.\n5. Parameter Kualitas Instrumen & Tanggung Jawab Moral Ilmuwan.',
    change: '1. Membiasakan mengajar berdasarkan data dan kebutuhan nyata siswa di kelas.\n2. Mendokumentasikan inovasi ke dalam laporan Best Practice berstandar metodologi ilmiah secara berkala.\n3. Menyusun instrumen penilaian autentik yang objektif, teruji validitas dan reliabilitasnya.\n4. Melatih presisi logika serta kaidah bahasa penulisan ilmiah dan menjunjung integritas etika riset.',
    artifactPdfUrl: 'https://drive.google.com/file/d/1z7VSZb3Ctd_XYZ8dQ3TMNTkR91jT95cp/view?usp=sharing',
    artifacts: [
      'Artefak 1: Dokumen Tugas LMS "Analisis Best Practice dan Tes Formatif KTI" (Asyhar Qowiim) dan studi kasus Best Practice PBL berorientasi HOTS karya Moch. Basuni (SMKN 3 Tuban).',
      'Artefak 2: Dipilih karena memuat bukti penguasaan kerangka filsafat ilmu, logika penalaran KTI, parameter instrumen, dan kode etik moral ilmuwan.',
      'Artefak 3: Identifikasi unsur ontologi-epistemologi-aksiologi (1.a), evaluasi validitas-reliabilitas model penalaran induktif-statistik (1.b-c), dan etika tanggung jawab ilmuwan (2.d).'
    ]
  },
  '09': {
    topic: 'MATKUL-S2-03: Praktik Pengalaman Lapangan (PPL) Mandiri',
    connection: 'Praktik Pengalaman Lapangan (PPL) Mandiri mengintegrasikan seluruh pemahaman teoretis pedagogik dan materi keahlian Informatika dalam konteks nyata persekolahan di SMA Negeri 11 Yogyakarta. Pengalaman mengajar materi logika algoritma sorting dan searching menggunakan analogi nyata (mengurutkan tumpukan buku dan pencarian di perpustakaan) membuktikan pentingnya menjembatani konsep komputasional abstrak dengan kehidupan sehari-hari murid.',
    challenge: 'Tantangan utama selama pelaksanaan praktik mengajar adalah alokasi manajemen waktu yang ketat sehingga kegiatan diskusi kelompok dan presentasi siswa belum sepenuhnya terfasilitasi secara optimal, serta tingkat partisipasi murid yang belum merata (ada siswa pasif atau kurang percaya diri). Selain itu, perlunya menyelaraskan tingkat kesulitan tugas LKPD dengan kesiapan belajar siswa yang beragam.',
    concept: '1. Pembelajaran Kontekstual & Computational Thinking: Menerapkan konsep algoritma secara intuitif melalui LKPD studi kasus nyata sebelum coding.\n2. Pembelajaran Kolaboratif: Mendorong interaksi kelompok sebaya dan keberanian murid pasif.\n3. Penyelarasan Modul Ajar: Menyelaraskan tujuan pembelajaran terukur, materi esensial, dan asesmen berdasarkan masukan Guru Pamong.\n4. Manajemen Waktu & Strategi Pengelolaan Kelas: Pengorganisasian alokasi durasi jam pelajaran yang presisi.',
    change: '1. Menyusun modul ajar dengan estimasi alokasi waktu yang rinci dan terstruktur pada tiap tahapan kegiatan.\n2. Menerapkan media interaktif dan permainan edukatif untuk memicu keterlibatan aktif siswa yang masih pasif.\n3. Menindaklanjuti masukan Guru Pamong (Dian C.R., S.Si.) dan DPL (Ir. Bekti Wulandari, M.Pd.) secara konsisten.\n4. Menjalankan evaluasi mandiri (action-reflection) secara rutin seusai pembelajaran.',
    artifactPdfUrl: 'https://drive.google.com/file/d/107v_vtWpLEXBvqLe_hwe_7jGOAmPKKPo/view?usp=sharing',
    artifacts: [
      'Artefak 1: Dokumen Resmi LK 3 Refleksi Praktik Mengajar Terbimbing PPLM (disetujui Pamong & DPL, 8 Okt 2026) dan Modul Ajar Informatika Kelas X Algoritma Sorting-Searching beserta LKPD.',
      'Artefak 2: Dipilih karena menyajikan rekaman evaluasi kritis pembelajaran nyata di laboratorium SMAN 11 Yogyakarta beserta masukan konstruktif pamong.',
      'Artefak 3: Uraian pembelajaran yang berhasil (A.1), hambatan waktu presentasi (A.2), masukan pamong perbaikan modul (B.1), dan rencana perbaikan siklus berikutnya (B.2).'
    ]
  },
  '10': {
    topic: 'MATKUL-S2-04: Pembelajaran Mendalam dan Asesmen Lanjut SMK',
    connection: 'Mata kuliah ini menekankan pentingnya pendekatan konstruktivisme dan experiential learning di SMK agar lulusan tidak hanya menguasai konsep (mind-on), tetapi juga memiliki keterampilan vokasional terukur (hands-on) serta sikap kerja profesional (heart-on). Pembelajaran Informatika di SMK diselaraskan secara lintas disiplin (cross-curricular), seperti menghubungkan materi basis data dengan jurusan Teknik Kendaraan Ringan (TKR) untuk inventaris bengkel, atau jurusan Tata Busana untuk platform e-commerce.',
    challenge: 'Tantangan terbesar di SMK adalah meruntuhkan sekat pengajaran terisolasi (siloed teaching) di mana Informatika diajarkan terpisah tanpa relevansi langsung dengan keahlian kejuruan siswa, serta merancang asesmen autentik berorientasi real-world problem solving yang sesuai dengan kriteria DUDI (Dunia Usaha dan Dunia Industri) berbasis Standar Operasional Prosedur (SOP).',
    concept: '1. Keterkaitan Pembelajaran Mendalam & Model Vokasi: Integrasi deep learning pada 4 model keahlian SMK (Kewirausahaan, Teaching Factory/TeFa, Kelas Industri, dan PKL).\n2. Alur Pedagogis Berjenjang (Fase X–XII).\n3. Kontekstualisasi Lintas Disiplin (Cross-Curricular Informatics): Penerapan basis data dan pemrograman untuk kebutuhan spesifik jurusan vokasi.\n4. Asesmen Autentik Berorientasi DUDI: Penilaian unjuk kerja nyata berstandar SOP industri.',
    change: '1. Menyusun modul ajar Informatika yang kontekstual dan langsung terintegrasi dengan kebutuhan proyek keahlian siswa di SMK.\n2. Menerapkan rubrik unjuk kerja yang menilai aspek kepatuhan SOP industri, ketepatan solusi teknis, dan kualitas produk komputasi siswa.\n3. Berkolaborasi aktif dengan guru kejuruan dan instruktur industri dalam merancang proyek bersama di Teaching Factory dan Kelas Industri.',
    artifactPdfUrl: 'https://drive.google.com/file/d/1KuRS5x83kDrbK0Vxcsdaegwixubziavz/view?usp=sharing',
    artifacts: [
      'Artefak 1: Dokumen Tugas LMS Kolaboratif "2.C. Diskusi Pemecahan Kasus: Alternatif Solusi Pembelajaran Mendalam di SMK" (Kelompok 4).',
      'Artefak 2: Dipilih karena menyajikan rancangan alur berjenjang (Fase X–XII), kontekstualisasi lintas keahlian (TKR & Tata Busana), dan model asesmen autentik terintegrasi DUDI.',
      'Artefak 3: Pemetaan experiential learning model vokasi (A), perancangan proyek TKR & Tata Busana (B.1), dan instrumen asesmen unjuk kerja SOP industri (B.2).'
    ]
  },
  '11': {
    topic: 'MATKUL-S2-05: Seminar Pendidikan Profesi Guru (Seminar PPG)',
    connection: 'Seminar PPG membekali calon guru dengan kemampuan melakukan refleksi pengalaman belajar berdasarkan fakta di kelas serta menyampaikan ide secara jelas. Refleksi ini berakar pada LK 1 Identifikasi Diri dan filosofi Ki Hadjar Dewantara (menuntun sesuai kodrat alam dan zaman). Calon guru berlatih menjadi pendidik yang reflektif dan merangkum perjalanan belajarnya ke dalam portofolio digital yang rapi dan terstruktur.',
    challenge: 'Tantangan utama dalam Seminar PPG adalah membiasakan refleksi yang disertai bukti nyata hasil belajar siswa (seperti lembar kerja siswa, rubrik penilaian, dan catatan kelas), serta memilih karya terbaik dari setiap mata kuliah untuk ditampilkan dalam portofolio.',
    concept: '1. Pemikiran Ki Hadjar Dewantara: Menuntun potensi peserta didik dan menciptakan suasana belajar yang membahagiakan.\n2. Empat Bagian Utama Seminar PPG: Identifikasi Diri (LK 1), Refleksi 4C, Karya Inovasi Pembelajaran, dan Berbagi Karya lewat Portofolio Digital.\n3. Komunikasi Efektif & Penyampaian Inovasi: Menyampaikan gagasan pembelajaran secara jelas, runtut, dan mudah dipahami.\n4. Tiga Penilaian Utama: Portofolio Digital, Keaktifan di Kelas, dan Penampilan Saat Presentasi.',
    change: '1. Menjadikan portofolio digital sebagai wadah rekam jejak perkembangan diri yang diperbarui secara konsisten.\n2. Membiasakan refleksi pembelajaran yang jujur dan perbaikan kelas berkelanjutan pada setiap siklus pembelajaran.\n3. Menerapkan 5 langkah nyata LK 1 (pembelajaran berdiferensiasi, pembiasaan sosial emosional, perbaikan kelas mandiri, pemanfaatan teknologi, dan aktif di komunitas belajar).',
    artifactPdfUrl: 'https://drive.google.com/file/d/1lQH4cbI22ESDVfIy-8xsX7jAbIM3_ikn/view?usp=sharing',
    artifacts: [
      'Artefak 1: Dokumen Utama LK 1 Identifikasi Diri - Seminar Pendidikan Guru (Asyhar Qowiim) dan Produk Portofolio Digital Refleksi LK 2 Semester II.',
      'Artefak 2: Dipilih karena merupakan dokumen awal yang memuat arah pemikiran Ki Hadjar Dewantara dan memuat 5 rencana aksi nyata kesiapan guru profesional.',
      'Artefak 3: Bagian Visi Pendidikan Indonesia (inklusif dan berkeadilan), Visi Calon Guru, serta rincian 5 Langkah Nyata Menjadi Guru Profesional.'
    ]
  },
  '12': {
    topic: 'MATKUL-S2-06: Projek Kepemimpinan',
    connection: 'Materi Projek Kepemimpinan mengaitkan konsep personal leadership, growth mindset (pola pikir bertumbuh), dan pemberdayaan masyarakat sekolah dengan peran strategis calon guru Informatika di SMAN 11 Yogyakarta. Melalui eksekusi perancangan sistem presensi digital berbasis QR Code, kepemimpinan guru diwujudkan dalam inisiatif nyata pemecahan masalah sekolah (menggantikan presensi manual dan meminimalisir kecurangan presensi/titip absen).',
    challenge: 'Tantangan terbesar adalah mengubah anggapan bahwa kepemimpinan hanyalah bakat sejak lahir, melainkan kemampuan yang dapat dipelajari dan dilatih melalui kerja sama tim yang kompak. Dalam pelaksanaan proyek presensi QR Code di SMAN 11 Yogyakarta, tantangannya adalah menyelaraskan 8 anggota tim, menyelesaikan perbedaan pendapat secara bijaksana, mengatur jadwal uji coba sistem, dan pantang menyerah saat menghadapi kendala teknis.',
    concept: '1. Growth Mindset & Personal Leadership: Kapasitas memimpin berkembang melalui latihan, inisiatif, eksperimen solusi, dan belajar dari kesalahan.\n2. Tujuh Elemen Perancangan Projek: Riset pengguna, tujuan terukur, alokasi sumber daya, strategi agile, dan milestones sukses.\n3. Komunikasi Efektif & Pengelolaan Konflik Konstruktif.\n4. Transformasi Digital & Pemberdayaan Sekolah: Penerapan presensi digital QR Code untuk efisiensi, transparansi data, dan peningkatan kedisiplinan murid.',
    change: '1. Terus berani mengambil inisiatif dan menghadirkan solusi teknologi kontekstual bagi permasalahan ekosistem sekolah.\n2. Mengedepankan komunikasi terbuka, empati, dan manajemen konflik yang bijaksana dalam memimpin kelompok maupun Komunitas Belajar.\n3. Membiasakan evaluasi agile dan resiliensi menghadapi tantangan teknis atau perubahan dinamika lapangan.',
    artifactPdfUrl: 'https://drive.google.com/file/d/1KrjIy964mBnBo8qNCK9p--jlR_YIdEtT/view?usp=sharing',
    artifacts: [
      'Artefak 1: Dokumen Tugas LMS "2.3.a. Tugas 5.1. Mindmap Kelompok A2 Fix" (Sistem Presensi Digital QR Code SMAN 11 Yogyakarta) dan Panduan/Modul Projek Kepemimpinan PPG.',
      'Artefak 2: Dipilih karena menyajikan bukti autentik perancangan dan eksekusi projek kepemimpinan kolaboratif berbasis teknologi yang holistik menjawab tata kelola sekolah.',
      'Artefak 3: Mindmap 7 Elemen Perencanaan Projek (Tugas 5.1) dan Panduan Projek Kepemimpinan Sub-bab 1.1–1.3 mengenai personal leadership, resiliensi, komunikasi efektif, dan pengelolaan konflik.'
    ]
  }
}

const categories = ['Pedagogik', 'PPL', 'Kepemimpinan', 'Seminar', 'Refleksi']

function Courses({ onViewCourse, onViewReflection }) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const filteredCourses = useMemo(() => {
    if (activeCategory === 'Semua') return coursesData
    if (activeCategory === 'Refleksi') return coursesData.filter(course => reflectionData[course.number])
    return coursesData.filter(course => course.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="matkul" className="section courses-section">
      <div className="courses-heading-row">
        <div className="section-heading">
          <span className="section-eyebrow">03 · MATA KULIAH</span>
          <h2>Mata kuliah dan pengalaman belajar yang bermakna.</h2>
          <p>Kumpulan mata kuliah akademik yang menunjukkan perjalanan mengintegrasikan teori, praktik, dan refleksi dalam pengembangan kompetensi profesional.</p>
        </div>
        <div className="course-count"><strong>{coursesData.length}</strong><span>MATA KULIAH PILIHAN</span></div>
      </div>

      <div className="course-filters" role="tablist" aria-label="Filter mata kuliah">
        <button className={activeCategory === 'Semua' ? 'active' : ''} onClick={() => setActiveCategory('Semua')}>Semua</button>
        {categories.map(category => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => {
          const courseCode = course.semester === 2
            ? `MATKUL-S2-${(parseInt(course.number, 10) - 6).toString().padStart(2, '0')}`
            : `MATKUL-S1-${course.number.toString().padStart(2, '0')}`;
          const reflection = reflectionData[course.number]
          const detailCourse = course.detail ? course : {
            ...course,
            detail: {
              fullTitle: `Detail Mata Kuliah ${course.title}`,
              fullDescription: course.description,
              topics: []
            }
          }
          return (
            <article key={course.number + course.semester} className="course-item">
              <div className="course-card-top"><span className="course-category">{course.category}</span><span className="course-code">{courseCode}</span></div>
              <div className="course-icon">⌁</div>
              <h3 className="course-item-title">{course.title}</h3>
              <p className="course-item-description">{course.description}</p>
              <div className="course-actions">
                <button className="course-item-link" onClick={() => onViewCourse && onViewCourse(detailCourse)}>Detail Mata Kuliah <span>↗</span></button>
                {reflection && (
                  <button className="course-item-link" onClick={() => onViewReflection && onViewReflection({ course, reflection })}>Lihat Refleksi <span>↗</span></button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  )
}

export default Courses
