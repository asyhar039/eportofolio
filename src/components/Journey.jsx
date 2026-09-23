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
        'Penyusunan Modul & Aksi Nyata (RTL)'
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
      title: 'Pengembangan Keprofesian Berkelanjutan',
      summary: 'Dokumentasi pembelajaran dan pengembangan kompetensi profesional secara berkelanjutan.'
    },
    {
      number: '02',
      title: 'Pembelajaran Mendalam dan Asesmen Lanjut SMK',
      summary: 'Ruang dokumentasi perancangan pembelajaran mendalam dan asesmen lanjut pada konteks SMK.'
    },
    {
      number: '03',
      title: 'Pembelajaran Sosial Emosional',
      summary: 'Dokumentasi pengembangan pembelajaran yang memperhatikan aspek sosial dan emosional peserta didik.'
    },
    {
      number: '04',
      title: 'Yogyakarta_Praktik Pengalaman Lapangan (PPL) Mandiri',
      summary: 'Dokumentasi pelaksanaan praktik pengalaman lapangan mandiri di Yogyakarta.'
    },
    {
      number: '05',
      title: 'Seminar Pendidikan Profesi Guru',
      summary: 'Ruang dokumentasi kegiatan seminar, presentasi, dan diseminasi hasil pembelajaran PPG.'
    },
    {
      number: '06',
      title: 'Projek Kepemimpinan',
      summary: 'Dokumentasi projek kepemimpinan sebagai bagian dari penguatan peran profesional calon guru.'
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
