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
            'Mahasiswa mampu mengelaborasi konsep ragam teori belajar yang mendasari pembelajaran berpusat pada peserta didik dan menjadikannya dasar dalam merancang pembelajaran yang memuliakan peserta didik.'
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
            'Mahasiswa mampu mengelaborasi ragam jenis hambatan dalam belajar, baik untuk peserta didik normal maupun peserta didik berkebutuhan khusus.'
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
          name: 'Evaluasi, Refleksi dan Memaknai Rencana Tindak Lanjut Pelaksanaan Pembelajaran Mendalam dan Asesmen',
          learningObjectives: [
            'Mahasiswa mampu mengevaluasi pelaksanaan pembelajaran dan asesmen, melakukan refleksi kritis, dan merumuskan tindak lanjut perbaikan berbasis temuan dan data hasil belajar.'
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
  { number: '07', semester: 2, category: 'Pedagogik', title: 'Pengembangan Keprofesian Berkelanjutan', description: 'Dokumentasi pembelajaran dan pengembangan kompetensi profesional secara berkelanjutan.' },
  { number: '08', semester: 2, category: 'Pedagogik', title: 'Pembelajaran Mendalam dan Asesmen Lanjut SMK', description: 'Ruang dokumentasi perancangan pembelajaran mendalam dan asesmen lanjut pada konteks SMK.' },
  { number: '09', semester: 2, category: 'Pedagogik', title: 'Pembelajaran Sosial Emosional', description: 'Dokumentasi pengembangan pembelajaran yang memperhatikan aspek sosial dan emosional peserta didik.' },
  { number: '10', semester: 2, category: 'PPL', title: 'Yogyakarta_Praktik Pengalaman Lapangan (PPL) Mandiri', description: 'Dokumentasi pelaksanaan praktik pengalaman lapangan mandiri di Yogyakarta.' },
  { number: '11', semester: 2, category: 'Seminar', title: 'Seminar Pendidikan Profesi Guru', description: 'Ruang dokumentasi kegiatan seminar, presentasi, dan diseminasi hasil pembelajaran PPG.' },
  { number: '12', semester: 2, category: 'Kepemimpinan', title: 'Projek Kepemimpinan', description: 'Dokumentasi projek kepemimpinan sebagai bagian dari penguatan peran profesional calon guru.' }
]

const reflectionData = {
  '01': {
    topic: 'Topik 1: Peran Guru dalam Pendidikan Nilai',
    connection: 'Materi ini menghubungkan filosofi pendidikan nasional dengan pendidikan nilai sebagai fondasi pembentukan karakter bangsa. Pendidikan nilai merupakan tanggung jawab moral seluruh guru mata pelajaran.',
    challenge: 'Membongkar pola pikir bahwa penanaman nilai hanya menjadi porsi guru tertentu serta menerapkan strategi internalisasi nilai secara konsisten di kelas.',
    concept: 'Peran guru sebagai teladan dan penuntun karakter, kerangka pendidikan nasional yang mengintegrasikan nilai luhur budaya bangsa, serta strategi internalisasi nilai melalui Connect-Extend-Challenge.',
    change: 'Mengintegrasikan penanaman nilai karakter dalam setiap materi ajar, menjadi teladan, dan merancang pembelajaran yang memuat strategi internalisasi nilai secara eksplisit.',
    artifacts: [
      'Dokumen Aktivitas Identifikasi Peran Guru dalam Pendidikan Nilai (Modul 3.4.1).',
      'Artefak ini merekam pemetaan konseptual alur Connect-Extend-Challenge serta rumusan komitmen nyata calon guru dalam menjalankan pendidikan nilai di sekolah.',
      'Bagian formulasi rumusan peran guru pada lembar kerja Extend serta lembar komitmen tanggung jawab pendidikan nilai bagi semua guru.'
    ]
  },
  '02': {
    topic: 'Topik 2: Dilema di Kelas yang Pasif',
    connection: 'Studi kasus ini mengaitkan pemahaman karakteristik dan psikologi murid dengan pemilihan metode mengajar. Penguasaan materi dan ceramah konvensional saja tidak cukup untuk memberdayakan siswa abad ke-21.',
    challenge: 'Menghadapi kepasifan siswa, ketergantungan pada instruksi guru, kecanggungan saat dipanggil acak, serta kebiasaan copy-paste ketika memulai tugas analisis atau proyek mandiri.',
    concept: 'Transisi dari teacher-centered ke student-centered, penerapan teori konstruktivisme dan humanisme, serta penciptaan iklim kelas yang aman secara psikologis.',
    change: 'Mengubah peran mengajar menjadi fasilitator yang membangun keaktifan, melatih berpikir kritis, dan mendorong siswa menjadi pembelajar mandiri serta proaktif.',
    artifacts: [
      "Lembar Penelaahan Studi Kasus 'Dilema Kelas yang Pasif' (Kasus Bu Sinta - XI IPS 2).",
      'Artefak ini memuat analisis kritis mengenai akar penyebab kepasifan siswa dan identifikasi teori belajar yang relevan untuk merancang pembelajaran berpusat pada murid.',
      'Bagian analisis pertanyaan panduan kasus nomor 1-4 serta catatan diskusi interaktif berbasis Think-Pair-Share bersama rekan sejawat.'
    ]
  },
  '05': {
    topic: 'Topik 3: Guru yang Menumbuhkan Growth Mindset',
    connection: 'Guru dengan growth mindset percaya bahwa potensi murid terus berkembang dan memandang ketidakpahaman sebagai petunjuk untuk memperbaiki strategi mengajar.',
    challenge: "Mengikis fixed mindset seperti memberi label negatif permanen kepada siswa, menghakimi kemampuan secara absolut, atau terjebak dalam metode mengajar lama.",
    concept: 'Identifikasi sikap fixed dan growth mindset, adaptabilitas strategi belajar, keterbukaan belajar dari rekan sejawat, dan orientasi pada penilaian proses.',
    change: 'Menjadi pendidik yang fleksibel, mencari solusi pembelajaran baru saat murid mengalami kesulitan, dan aktif mempelajari praktik baik dari guru lain.',
    artifacts: [
      'Lembar Kerja 4.1 Identifikasi Pola Pikir Guru (Tetap vs Bertumbuh).',
      'Artefak ini membuktikan kemampuan evaluasi diri dalam menganalisis 10 pernyataan sikap guru berbasis fixed dan growth mindset beserta alasan rasionalnya.',
      'Tabel analisis identifikasi pola pikir pada poin perubahan strategi pembelajaran (nomor 2, 4, 6, 8, dan 10).'
    ]
  },
  '06': {
    topic: 'Topik 4: Tugas Kelompok 4 - Pembelajaran Kreatif dan Inovatif',
    connection: 'Materi ini menghubungkan mutu sekolah modern dengan keterampilan abad ke-21: critical thinking, communication, collaboration, dan creativity.',
    challenge: 'Mengatasi rendahnya keterlibatan belajar akibat metode monoton serta membangun keberanian siswa untuk bereksperimen dan berpendapat tanpa takut salah.',
    concept: 'Ciri kelas kreatif-inovatif, tugas otentik, kolaborasi, teknologi, penilaian formatif, guru sebagai fasilitator, media interaktif, dan apresiasi proses.',
    change: 'Mengimplementasikan PBL, blended learning, design thinking, serta membiasakan umpan balik yang menghargai usaha dan proses tugas murid.',
    artifacts: [
      'Matriks Debat Pro-Kontra dan Instrumen Analisis Video Pembelajaran (Tugas Kelompok 4).',
      'Artefak ini menyajikan bukti analisis teoritis mengenai urgensi pembelajaran kreatif serta evaluasi nyata penerapannya dalam cuplikan video pembelajaran.',
      'Daftar ciri kelas kreatif-inovatif, argumentasi keterampilan 4C (Trilling & Fadel), serta lembar centang indikator kelas inovatif pada video.'
    ]
  },
  '03': {
    topic: 'Topik 5: Pembelajaran Mendalam dan Asesmen',
    connection: 'Materi ini menghubungkan pembelajaran kontekstual dengan tuntutan dunia kerja melalui deep learning yang bermakna, berkesadaran, dan menggembirakan.',
    challenge: 'Mengatasi kesenjangan antara ceramah konvensional dengan kebutuhan industri yang memerlukan lulusan mandiri, kreatif, dan terampil memecahkan masalah nyata.',
    concept: 'PBL/PjBL, kolaborasi interaktif, penyelarasan materi dengan kasus industri otentik, dan refleksi proses belajar.',
    change: 'Berperan sebagai fasilitator, merancang tugas pemecahan masalah kontekstual, memfasilitasi kerja kelompok, dan menyelenggarakan refleksi berkala.',
    artifacts: [
      'Lembar Jawaban Aktivitas 1.1 Analisis Kasus Kesenjangan Pembelajaran (SMK Multi Karya & SMK Karya Nyata).',
      'Artefak ini memuat solusi konkret terhadap dominasi ceramah dan perancangan strategi pembelajaran berbasis masalah serta refleksi otentik murid.',
      'Jawaban pertanyaan pemantik Kasus 1 & 2 mengenai strategi pembelajaran berbasis proyek, manfaat kolaborasi, dan desain refleksi murid.'
    ]
  },
  '04': {
    topic: 'Topik 6: PPL Terbimbing di SMA N 11 Yogyakarta',
    connection: 'Pengalaman ini menghubungkan rancangan modul ajar dan teori pembelajaran dengan praktik mengajar nyata di kelas Informatika di bawah bimbingan Guru Pamong dan DPL.',
    challenge: 'Mengelola keterbatasan waktu agar seluruh kelompok dapat presentasi maksimal serta mendorong siswa yang masih pasif atau kurang percaya diri untuk berpendapat.',
    concept: 'Apersepsi kontekstual, diskusi kelompok menggunakan LKPD, tanya jawab, pengelolaan waktu terstruktur, dan penyelarasan modul sesuai pedoman pamong.',
    change: 'Memvariasikan metode melalui permainan edukatif dan media interaktif, mematangkan manajemen waktu, serta mendorong partisipasi aktif siswa yang pasif.',
    artifacts: [
      'Lembar Kerja 3 (LK 3) Refleksi Praktik Asistensi PPL Terbimbing (SMA N 11 Yogyakarta).',
      'Artefak ini merekam bukti otentik pelaksanaan mengajar di sekolah mitra, identifikasi kendala nyata kelas, serta rencana tindakan perbaikan berorientasi umpan balik pamong.',
      'Bagian uraian kendala waktu/keaktifan siswa (poin A.2-3) dan lembar refleksi perubahan rancangan pembelajaran berbasis umpan balik pamong (poin B.1-2).'
    ]
  }
}

const categories = ['Pedagogik', 'PPL', 'Kepemimpinan', 'Seminar', 'Refleksi']

function Courses({ onViewCourse, onViewReflection }) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const filteredCourses = useMemo(() => {
    if (activeCategory === 'Semua') return coursesData
    if (activeCategory === 'Refleksi') return coursesData.filter(course => course.semester === 1)
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
                <button className="course-item-link" onClick={() => onViewCourse && onViewCourse(detailCourse)}>Detail mata kuliah <span>↗</span></button>
                {reflection && (
                  <button className="course-item-link" onClick={() => onViewReflection && onViewReflection({ course, reflection })}>Lihat refleksi <span>↗</span></button>
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
