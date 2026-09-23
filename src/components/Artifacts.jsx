import React from 'react'
import './Artifacts.css'

const artifactsData = [
  {
    title: 'Modul Ajar',
    description: 'Tempat menyimpan modul ajar yang telah dikembangkan selama PPG.'
  },
  {
    title: 'Perangkat Pembelajaran',
    description: 'Kumpulan rancangan dan perlengkapan pembelajaran yang mudah diperbarui.'
  },
  {
    title: 'Media Pembelajaran',
    description: 'Dokumentasi media pendukung pembelajaran Informatika.'
  },
  {
    title: 'LKPD',
    description: 'Ruang untuk lembar kerja peserta didik dan aktivitas belajar.'
  },
  {
    title: 'Asesmen',
    description: 'Tempat mengarsipkan instrumen, rubrik, dan hasil evaluasi.'
  },
  {
    title: 'Jurnal Refleksi',
    description: 'Catatan refleksi berkala selama mengikuti proses PPG.'
  },
  {
    title: 'Dokumentasi Praktik',
    description: 'Arsip kegiatan praktik pembelajaran dan pengalaman lapangan.'
  },
  {
    title: 'Karya dan Proyek',
    description: 'Kumpulan karya pembelajaran, proyek, dan bukti pengembangan diri.'
  }
]

function Artifacts() {
  return (
    <section id="artifak" className="section artifacts-section">
      <div className="section-heading">
        <span className="section-eyebrow">05 · ARTIFAK</span>
        <h2>Kumpulan karya, dokumen, dan bukti pembelajaran selama perjalanan PPG Informatika.</h2>
      </div>

      <div className="artifacts-grid">
        {artifactsData.map((artifact, index) => (
          <article key={index} className="artifact-item">
            <div className="artifact-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span className="artifact-label">ARTIFACT</span>
            <h3 className="artifact-title">{artifact.title}</h3>
            <p className="artifact-description">{artifact.description}</p>
            <button className="artifact-link">
              View Artifact
              <span>→</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Artifacts
