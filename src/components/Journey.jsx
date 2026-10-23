import React, { useState } from 'react'
import './Journey.css'

const semesterData = {
  semester1: [
    {
      number: '01',
      title: 'Filosofi Pendidikan dan Pendidikan Nilai',
      summary: 'Mengkaji dasar filosofis pendidikan serta pembentukan karakter peserta didik dalam proses belajar.',
      learnings: [
        'Pola Pikir Bertumbuh & Komitmen Pendidik',
        'Internalisasi & Pendidikan Nilai (Pancasila)',
        'Landasan Pemikiran Pendidikan & Aksi Nyata'
      ],
      competencies: [
        'Reflektif',
        'Landasan Pedagogis & Desain Kurikulum',
        'Penyusunan Aksi Nyata'
      ],
      reflection: 'Pembelajaran menjadi jauh lebih bermakna ketika pendidik tidak hanya bertindak sebagai pengajar pengetahuan (transfer of knowledge), tetapi sebagai fasilitator, penjaga nilai, dan penuntun yang memahami landasan filosofis serta esensi nilai pendidikan dalam setiap tindakan dan keputusannya.'
    },
    {
      number: '02',
      title: 'Peserta Didik dan Pemahamannya',
      summary: 'Memahami keberagaman karakteristik dan tahap perkembangan peserta didik sebagai dasar perancangan pembelajaran berdiferensiasi yang inklusif, adaptif, dan berpusat pada murid.',
      learnings: [
        'Teori Perkembangan sebagai Dasar Pedagogis',
        'Penerapan Teori Belajar & Lingkungan Aman',
        'Pembelajaran Berdiferensiasi & Mastery Climate'
      ],
      competencies: [
        'Reflektif & Kolaboratif',
        'Diferensiasi & Analisis Profiling',
        'Penyusunan Modul & Aksi Nyata'
      ],
      reflection: 'Pembelajaran menjadi jauh lebih bermakna ketika pendidik mampu melihat perbedaan dan kompleksitas peserta didik bukan sebagai hambatan, melainkan sebagai fondasi utama untuk merancang strategi pembelajaran yang inklusif, kontekstual, dan berpihak pada tumbuh kembang seluruh murid secara utuh.'
    },
    {
      number: '03',
      title: 'Pembelajaran Mendalam dan Asesmen Dasar',
      summary: 'Merancang pembelajaran yang memberikan makna mendalam serta instrumen asesmen yang mampu mengevaluasi perkembangan peserta didik secara komprehensif.',
      learnings: [
        'Konsep & Prinsip Pembelajaran Mendalam (Deep Learning)',
        'Perancangan Instrumen Asesmen Formatik & Sumatif',
        'Integrasi Asesmen berbasis Pengalaman Nyata'
      ],
      competencies: [
        'Desain Pembelajaran Inklusif',
        'Penyusunan Instrumen Evaluasi',
        'Analisis & Evaluasi Hasil Belajar'
      ],
      reflection: 'Pembelajaran dan asesmen menjadi bernilai tinggi ketika tidak direduksi sekadar pengujian angka/teori di akhir bab, melainkan difungsikan sebagai sarana inklusif berbasis pengalaman nyata yang membentuk kesadaran profesional, kemandirian memecahkan masalah, serta kesiapan kerja murid secara utuh.'
    },
    {
      number: '04',
      title: 'Pengalaman Lapangan (PPL) Terbimbing',
      summary: 'Menganalisis integrasi perancangan modul ajar berbasis kurikulum terbaru, eksekusi pembelajaran interaktif Informatika (jaringan komputer), pengelolaan alokasi waktu, hingga evaluasi reflektif bersama Guru Pamong dan Dosen Pembimbing Lapangan.',
      learnings: [
        'Implementasi Media & Simulasi Interaktif (Cisco Packet Tracer)',
        'Penerapan Pembelajaran Berbasis Masalah (Problem-Based Learning / PBL)',
        'Efektivitas Apersepsi Kontekstual & Pengelolaan Alokasi Waktu'
      ],
      competencies: [
        'Penguasaan Media & Simulasi Digital (Informatika)',
        'Pengelolaan Kelas & Manajemen Waktu Proporsional',
        'Pembelajaran Adaptif & Diferensiasi Karakteristik Murid'
      ],
      reflection: 'Praktik pembelajaran terbimbing menjadi efektif ketika pendidik mampu menyederhanakan materi teknis (seperti IP Address dan konsep jaringan) dengan analogi kehidupan sehari-hari, memadukan teori dengan praktikum langsung (learning by doing), serta secara dinamis mengelola alokasi waktu dan respon murid agar seluruh kelompok terlibat aktif tanpa terkendala keterbatasan durasi.'
    },
    {
      number: '05',
      title: 'Pola Pikir Bertumbuh (Growth Mindset)',
      summary: 'Menganalisis konsep dasar neuroplastisitas, kerangka kognitif MAR (Mindset-Action-Result), instrumen cognitive framing, hingga perancangan strategi pedagogis berbasis resiliensi dan perbaikan pembelajaran berkelanjutan.',
      learnings: [
        'Transisi dari Fixed ke Growth Mindset Pendidik & Murid',
        'Penerapan Neurosains (Neuroplasticity) & Productive Failure',
        'Strategi Pedagogis (Process Praise & Scaffolding)'
      ],
      competencies: [
        'Reflektif & Resilien (Growth Oriented)',
        'Desain Evaluasi & Process Praise',
        'Penataan Ekosistem Pembelajaran Inklusif'
      ],
      reflection: 'Pembelajaran menjadi efektif ketika pendidik tidak hanya berfokus pada hasil akhir atau bakat bawaan semata, melainkan mampu membangun keyakinan bahwa kecerdasan dapat berkembang melalui usaha, ketekunan, dan strategi yang tepat, serta menumbuhkan ruang kelas yang aman bagi murid untuk berani mengambil risiko belajar, menerima umpan balik, dan menjadikan kegagalan sebagai sarana tumbuh.'
    },
    {
      number: '06',
      title: 'Pembelajaran Kreatif dan Inovatif',
      summary: 'Menganalisis konsep dasar, objek pembelajaran, instrumen analisis situasi, hingga perancangan aksi nyata dan evaluasi Penelitian Tindakan Kelas (PTK) berbasis teknologi.',
      learnings: [
        'Transisi Konseptual ke Praktik Lapangan',
        'Identifikasi Masalah & PTK',
        'Perancangan Rencana Aksi Terukur'
      ],
      competencies: [
        'Reflektif & Adaptif (Reflective Practitioner)',
        'Desain Pembelajaran & Media Inovatif',
        'Penyusunan Instrumen & Eksekusi PTK'
      ],
      reflection: 'Pembelajaran menjadi efektif ketika pendidik tidak hanya berfokus pada penyelesaian materi atau penggunaan intuisi semata, melainkan secara ilmiah mampu mentransformasi masalah pembelajaran menjadi ide-ide kreatif dan aksi nyata yang terukur, inklusif, serta adaptif terhadap keterbatasan fasilitas dan waktu di sekolah.'
    }
  ],
  semester2: [
    {
      number: '01',
      title: 'Pembelajaran Sosial Emosional',
      summary: 'Pengembangan kesiapan mental, regulasi emosi (CASEL), dan iklim interaksi positif peserta didik dalam laboratorium komputer.',
      learnings: [
        'Implementasi 5 Kompetensi Sosial Emosional (CASEL)',
        'Latihan Berkesadaran Penuh (Mindfulness) & Teknik S-T-O-P 2 Menit',
        'Regulasi Frustrasi Murid Saat Kendala Teknis & Resiliensi Guru'
      ],
      competencies: [
        'Penyusunan RPP/Modul Ajar Responsif Emosi',
        'Pendampingan Regulasi Emosi Belajar Siswa',
        'Pencegahan Burnout & Resiliensi Pendidik'
      ],
      reflection: 'Penguasaan konsep teknis Informatika tidak dapat dipisahkan dari kesiapan emosi siswa. Melalui PSE, guru hadir menuntun ketahanan emosional (resilience), kolaborasi tim yang sehat, serta etika digital saat memecahkan masalah komputasional.'
    },
    {
      number: '02',
      title: 'Pengembangan Keprofesian Berkelanjutan',
      summary: 'Dokumentasi pembelajaran dan pengembangan kompetensi profesional secara berkelanjutan melalui filsafat ilmu, Best Practice, dan Karya Tulis Ilmiah (KTI).',
      learnings: [
        'Struktur Filosofis Best Practice (Ontologi, Epistemologi, Aksiologi)',
        'Model Penalaran Deduktif-Nomologikal & Induktif-Statistik',
        'Triad Sarana Berpikir Ilmiah & Etika Publikasi Penelitian'
      ],
      competencies: [
        'Praktisi Reflektif & Ilmuwan Pendidik',
        'Penyusunan Best Practice Berbasis Bukti',
        'Integritas & Etika Riset Ilmiah'
      ],
      reflection: 'Pengembangan keprofesian menjadi bermakna ketika pendidik bertransformasi menjadi praktisi reflektif dan peneliti yang menguji setiap tindakan pembelajaran berbasis data empiris terukur, instrumen yang valid, serta menjunjung tinggi etika akademik.'
    },
    {
      number: '03',
      title: 'Praktik Pengalaman Lapangan (PPL) Mandiri',
      summary: 'Dokumentasi pelaksanaan praktik mengajar mandiri di SMA Negeri 11 Yogyakarta pada materi logika algoritma sorting dan searching.',
      learnings: [
        'Penggunaan Analogi Nyata Kontekstual Algoritma Sorting & Searching',
        'Penyelarasan Modul Ajar Berbasis Masukan Pamong dan DPL',
        'Pengelolaan Manajemen Waktu & Strategi Mengaktifkan Murid Pasif'
      ],
      competencies: [
        'Pengajaran Konsep Komputasional Abstrak (Computational Thinking)',
        'Manajemen Waktu & Pengelolaan Kelas Laboratorium',
        'Evaluasi Tindakan Mengajar Berkelanjutan (Action-Reflection)'
      ],
      reflection: 'PPL Mandiri mempertegas peran guru bukan sekadar penyampai sintaks, melainkan pembimbing ketangkasan berpikir kritis yang mampu menjembatani materi abstrak dengan analogi nyata sehari-hari serta sigap menata manajemen waktu kelas.'
    },
    {
      number: '04',
      title: 'Pembelajaran Mendalam dan Asesmen Lanjut SMK',
      summary: 'Perancangan pembelajaran mendalam (deep learning) dan asesmen autentik berorientasi dunia usaha dan dunia industri (DUDI) pada konteks SMK.',
      learnings: [
        'Integrasi Deep Learning pada 4 Model Vokasi (TeFa, Kelas Industri, PKL)',
        'Kontekstualisasi Lintas Disiplin (Cross-Curricular Informatics)',
        'Perancangan Asesmen Autentik Berstandar SOP Industri'
      ],
      competencies: [
        'Desain Pembelajaran Vokasi Berjenjang (Fase X–XII)',
        'Pengembangan Asesmen Kepatuhan SOP & Unjuk Kerja',
        'Kolaborasi Teaching Factory & Mitra Industri'
      ],
      reflection: 'Pembelajaran Informatika di SMK menjadi sangat bernilai ketika dikontekstualisasikan secara nyata dengan keahlian kejuruan siswa (seperti inventaris bengkel TKR atau e-commerce Tata Busana) dan diukur melalui asesmen autentik standar DUDI.'
    },
    {
      number: '05',
      title: 'Seminar Pendidikan Profesi Guru',
      summary: 'Refleksi pengalaman belajar berbasis data, kurasi portofolio digital komprehensif, dan diseminasi karya inovasi calon guru profesional.',
      learnings: [
        'Konstruksi Identifikasi Diri & Visi Pendidikan Ki Hadjar Dewantara (LK 1)',
        'Sintesis Refleksi 4C & Kurasi Artefak Fisik Lintas Mata Kuliah',
        'Strategi Komunikasi Ilmiah & Presentasi Karya Inovasi Pendidikan'
      ],
      competencies: [
        'Refleksi Berbasis Bukti Nyata (Evidence-Based Practitioner)',
        'Pengelolaan Portofolio Digital Berkelanjutan',
        'Advokasi & Komunikasi Gagasan Inovasi Pendidikan'
      ],
      reflection: 'Seminar PPG menguatkan jati diri calon pendidik sebagai pamong, fasilitator, dan agen perubahan yang memiliki visi inklusif-humanis serta membiasakan refleksi berbasis data yang dapat dipertanggungjawabkan.'
    },
    {
      number: '06',
      title: 'Projek Kepemimpinan',
      summary: 'Dokumentasi perancangan sistem presensi digital berbasis QR Code di SMAN 11 Yogyakarta berbasis personal leadership, growth mindset, dan kerja tim.',
      learnings: [
        'Penerapan Personal Leadership & Growth Mindset dalam Tim Kolaboratif',
        'Tujuh Elemen Perancangan Projek & Eksekusi Bertahap (Agile)',
        'Komunikasi Efektif, Manajemen Konflik, & Transformasi Digital Sekolah'
      ],
      competencies: [
        'Kepemimpinan Personal & Pemecahan Masalah Kolaboratif',
        'Inovasi Tata Kelola Digital Lingkungan Sekolah',
        'Resiliensi Menghadapi Hambatan Teknis & Adaptasi Pengguna'
      ],
      reflection: 'Kepemimpinan sejati dibuktikan melalui inisiatif nyata menjawab kebutuhan sekolah, mengubah perbedaan pendapat menjadi kekuatan sinergis, serta menghadirkan solusi teknologi kontekstual yang memberdayakan ekosistem pendidikan.'
    }
  ]
}

function Journey() {
  const [activeSemester, setActiveSemester] = useState('semester1')
  const [expandedCourse, setExpandedCourse] = useState(null)

  const toggleCourse = (index) => {
    setExpandedCourse(expandedCourse === index ? null : index)
  }

  return (
    <section id="perjalanan" className="section journey-section">
      <div className="section-heading journey-heading">
        <span className="section-eyebrow">02 · PERJALANAN</span>
        <h2>Perjalanan akademik menuju pertumbuhan profesional.</h2>
        <p>Setiap pengalaman menjadi ruang untuk mempelajari konsep, mencoba praktik, lalu merefleksikan perbaikan.</p>
      </div>

      <div className="semester-tabs">
        <button
          className={`semester-tab ${activeSemester === 'semester1' ? 'active' : ''}`}
          onClick={() => setActiveSemester('semester1')}
        >
          Semester 1
        </button>
        <button
          className={`semester-tab ${activeSemester === 'semester2' ? 'active' : ''}`}
          onClick={() => setActiveSemester('semester2')}
        >
          Semester 2
        </button>
      </div>

      <div className="course-timeline">
        {semesterData[activeSemester].map((course, index) => (
          <article key={index} className="course-card">
            <div className="course-header">
              <span className="course-number">{course.number}</span>
              <h3 className="course-title">{course.title}</h3>
            </div>
            <div className="course-info">
              <p className="course-summary">{course.summary}</p>
              {(course.learnings || course.competencies || course.reflection) && (
                <button
                  className="course-expand-btn"
                  onClick={() => toggleCourse(index)}
                  aria-expanded={expandedCourse === index}
                >
                  {expandedCourse === index ? 'Tutup Detail ↑' : 'Lihat Detail ↓'}
                </button>
              )}
            </div>
            {expandedCourse === index && (course.learnings || course.competencies || course.reflection) && (
              <div className="course-detail-wrapper">
                <div className="course-detail-grid">
                  {course.learnings && (
                    <div>
                      <h4>Pembelajaran Utama</h4>
                      <ul>
                        {course.learnings.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {course.competencies && (
                    <div>
                      <h4>Kompetensi</h4>
                      <div className="competency-tags">
                        {course.competencies.map((item, i) => (
                          <span key={i}>{item}</span>
                        ))}
                      </div>
                      {course.reflection && (
                        <>
                          <h4 className="reflection-label">Refleksi</h4>
                          <p>{course.reflection}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Journey
