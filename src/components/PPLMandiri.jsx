import React, { useState, useEffect } from 'react'
import './PPLMandiri.css'
import './Gallery.css'
import { pplSchoolProfile } from '../data/pplMandiriData'
import PdfReviewModal, { PdfCanvasViewer } from './PdfReviewModal'

const IconLayers = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const IconDoc = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const IconCamera = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const IconColab = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M7.5 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 3.18-1.32l2.64-2.64a4.5 4.5 0 1 1 3.18 1.32"
      stroke="#F9AB00"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0-3.18 1.32l-2.64 2.64A4.5 4.5 0 0 1 7.5 12.78"
      stroke="#E8710A"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconCodeNotebook = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <polyline points="9 9 6 12 9 15" />
    <polyline points="15 9 18 12 15 15" />
    <line x1="13" y1="8" x2="11" y2="16" />
  </svg>
)

const pplCycleTabs = {
  'siklus-1': {
    id: 'siklus-1',
    label: 'Siklus 1',
    fullTitle: 'Praktik Pembelajaran Mandiri Siklus 1',
    description: 'Perangkat rancangan pembelajaran dan materi ajar teori Data dan Informasi pada pelaksanaan Praktik Pembelajaran Mandiri Siklus 1 di SMA Negeri 11 Yogyakarta.',
    documents: [
      {
        id: 'siklus1-rancangan',
        code: 'SIKLUS 1 · RANCANGAN PEMBELAJARAN',
        title: 'Rancangan Pembelajaran (Siklus 1)',
        subtitle: 'Modul Ajar & Skenario Pembelajaran Mandiri Siklus 1 — SMAN 11 Yogyakarta',
        fileName: 'Rancangan Pembelajaran Siklus 1 - SMAN 11 Yogyakarta.pdf',
        gdriveUrl: 'https://drive.google.com/file/d/15tJ8kXOQN1sCIFSaOYluy-6eclef8F9G/view?usp=sharing',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=15tJ8kXOQN1sCIFSaOYluy-6eclef8F9G'
      },
      {
        id: 'siklus1-materi-teori',
        code: 'SIKLUS 1 · MATERI PEMBELAJARAN',
        title: 'Materi Teori Data dan Informasi',
        subtitle: 'Bahan Ajar & Materi Teori Analisis Data dan Informasi Kelas X — Siklus 1',
        fileName: 'Materi Teori Data dan Informasi - Siklus 1.pdf',
        gdriveUrl: 'https://drive.google.com/file/d/1Qo1a7ybYhIqUc_ZZWDTGCQ4uCVOHOXBX/view?usp=sharing',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1Qo1a7ybYhIqUc_ZZWDTGCQ4uCVOHOXBX'
      }
    ]
  },
  'siklus-2-4': {
    id: 'siklus-2-4',
    label: 'Siklus 2 - 4',
    fullTitle: 'Praktik Pembelajaran Mandiri Siklus 2 - 4',
    description: 'Perangkat rancangan pembelajaran, materi praktik Data dan Informasi, media pembelajaran Google Colab (Sorting, Searching, List, Stack, Queue), serta instrumen Ulangan Harian Informatika pada pelaksanaan Praktik Pembelajaran Mandiri Siklus 2 hingga Siklus 4 di SMA Negeri 11 Yogyakarta.',
    mediaLinks: [
      {
        id: 'colab-platform',
        code: 'MEDIA PEMBELAJARAN PRAKTIK · PLATFORM',
        title: 'Google Colaboratory (Google Colab)',
        subtitle: 'Platform pemrograman Python interaktif berbasis cloud untuk kegiatan praktikum siswa',
        url: 'https://colab.research.google.com/?hl=id',
        buttonLabel: 'Buka Google Colab'
      },
      {
        id: 'colab-materi-algoritma',
        code: 'MEDIA PEMBELAJARAN PRAKTIK · NOTEBOOK MATERI',
        title: 'Materi Sorting, Searching, List, Stack, Queue',
        subtitle: 'Notebook Google Colab materi dan latihan praktik algoritma Sorting, Searching, List, Stack, dan Queue',
        url: 'https://colab.research.google.com/drive/1X87pjBsIfjmCskdOEPqxLXMjSRvS0zw8?usp=sharing',
        buttonLabel: 'Buka Materi di Google Colab'
      }
    ],
    documents: [
      {
        id: 'siklus24-rancangan',
        code: 'SIKLUS 2 - 4 · RANCANGAN PEMBELAJARAN',
        title: 'Rancangan Pembelajaran (Siklus 2 - 4)',
        subtitle: 'Modul Ajar & Skenario Pembelajaran Mandiri Siklus 2 - 4 — SMAN 11 Yogyakarta',
        fileName: 'Rancangan Pembelajaran Siklus 2-4 - SMAN 11 Yogyakarta.pdf',
        gdriveUrl: 'https://drive.google.com/file/d/14Owjcna1J7LD-CHwBcofPOoYBOcqkDO8/view?usp=sharing',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=14Owjcna1J7LD-CHwBcofPOoYBOcqkDO8'
      },
      {
        id: 'siklus24-materi-praktik',
        code: 'SIKLUS 2 - 4 · MATERI PRAKTIK',
        title: 'Materi Praktik Data dan Informasi',
        subtitle: 'Bahan Ajar & Panduan Praktikum Data dan Informasi — Siklus 2 - 4',
        fileName: 'Materi Praktik Data dan Informasi - Siklus 2-4.pdf',
        gdriveUrl: 'https://drive.google.com/file/d/1_CmCGJ8ihZ_lhR8QGjVgGzCM3m6fmx_S/view?usp=sharing',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1_CmCGJ8ihZ_lhR8QGjVgGzCM3m6fmx_S'
      },
      {
        id: 'siklus24-ulangan-harian',
        code: 'EVALUASI · ULANGAN HARIAN',
        title: 'Ulangan Harian Informatika',
        subtitle: 'Instrumen Evaluasi & Ulangan Harian Mata Pelajaran Informatika — SMAN 11 Yogyakarta',
        fileName: 'Ulangan Harian Informatika - SMAN 11 Yogyakarta.pdf',
        gdriveUrl: 'https://drive.google.com/file/d/171lHu3jLSXeV3ONIfzJNqPCxuAERR8xO/view?usp=sharing',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=171lHu3jLSXeV3ONIfzJNqPCxuAERR8xO'
      }
    ]
  }
}

const pplMediaGallery = [
  {
    id: 'ppl-vid-1',
    type: 'video',
    title: 'Video Mengajar 1',
    category: 'Video Mengajar',
    src: '/assets/video-mengajar-1.mp4',
    thumbnail: '/assets/thumbnail-video-1.jpg'
  },
  {
    id: 'ppl-vid-2',
    type: 'video',
    title: 'Video Mengajar 2',
    category: 'Video Mengajar',
    src: '/assets/video-mengajar-2.mp4',
    thumbnail: '/assets/thumbnail-video-2.jpg'
  },
  {
    id: 'ppl-vid-3',
    type: 'video',
    title: 'Video Mengajar 3',
    category: 'Video Mengajar',
    src: '/assets/video-mengajar-3.mp4'
  },
  {
    id: 'ppl-img-1',
    type: 'photo',
    title: 'Foto Mengajar 1',
    category: 'Foto Mengajar',
    src: '/assets/mengajar-1.jpg'
  },
  {
    id: 'ppl-img-2',
    type: 'photo',
    title: 'Foto Mengajar 2',
    category: 'Foto Mengajar',
    src: '/assets/mengajar-2.jpg'
  },
  {
    id: 'ppl-eval-1',
    type: 'photo',
    title: 'Evaluasi Bersama Guru Pamong',
    category: 'Dokumentasi Evaluasi',
    src: '/assets/aistudio/evaluasi1_99a22767.jpeg'
  },
  {
    id: 'ppl-eval-2',
    type: 'photo',
    title: 'Evaluasi Bersama Guru Pamong',
    category: 'Dokumentasi Evaluasi',
    src: '/assets/aistudio/evaluasi2_fa35c4ed.jpeg'
  },
  {
    id: 'ppl-eval-3',
    type: 'photo',
    title: 'Evaluasi Bersama Guru Pamong',
    category: 'Dokumentasi Evaluasi',
    src: '/assets/aistudio/evaluasi3_7ac1632a.jpeg'
  },
  {
    id: 'ppl-eval-4',
    type: 'photo',
    title: 'Evaluasi Bersama Guru Pamong',
    category: 'Dokumentasi Evaluasi',
    src: '/assets/aistudio/evaluasi4_0fed61bd.jpeg'
  },
  {
    id: 'ppl-eval-5',
    type: 'photo',
    title: 'Evaluasi Bersama Guru Pamong',
    category: 'Dokumentasi Evaluasi',
    src: '/assets/aistudio/evaluasi5_46dda959.jpeg'
  },
  {
    id: 'ppl-eval-6',
    type: 'photo',
    title: 'Evaluasi Bersama Guru Pamong',
    category: 'Dokumentasi Evaluasi',
    src: '/assets/aistudio/evaluasi6_953abd8e.jpeg'
  }
]

function PPLMandiri() {
  const [activeTab, setActiveTab] = useState('siklus-1')
  const [previewDoc, setPreviewDoc] = useState(null)
  const [mediaFilter, setMediaFilter] = useState('Semua')
  const [previewPhoto, setPreviewPhoto] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPreviewPhoto(null)
      }
    }
    if (previewPhoto) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [previewPhoto])

  const currentCycle = pplCycleTabs[activeTab] || pplCycleTabs['siklus-1']
  const mediaCategories = ['Semua', 'Video Mengajar', 'Foto Mengajar', 'Dokumentasi Evaluasi']
  const filteredMedia = mediaFilter === 'Semua'
    ? pplMediaGallery
    : pplMediaGallery.filter((item) => item.category === mediaFilter)

  return (
    <section id="ppl-mandiri" className="ppl-section">
      <span className="ppl-section-eyebrow">06 · PPL MANDIRI SMAN 11 YOGYAKARTA</span>

      {/* Hero Banner */}
      <div className="ppl-hero-banner">
        <div className="ppl-badge-top">
          <span className="pulse-dot"></span>
          Praktik Pengalaman Lapangan (PPL) Mandiri
        </div>
        <h1>PPL Mandiri SMAN 11 Yogyakarta</h1>
        <p>
          Dokumentasi pelaksanaan praktik mengajar terbimbing dan mandiri pada mata pelajaran Informatika Kelas X (Fase E), penyusunan perangkat pembelajaran, serta refleksi bersama Guru Pamong dan Dosen Pembimbing Lapangan (DPL) di SMA Negeri 11 Yogyakarta.
        </p>

        <div className="ppl-stakeholders-grid">
          <div className="ppl-stakeholder-card">
            <span className="ppl-stakeholder-label">Sekolah Mitra PPL</span>
            <strong>{pplSchoolProfile.name}</strong>
            <span>{pplSchoolProfile.address}</span>
          </div>

          <div className="ppl-stakeholder-card">
            <span className="ppl-stakeholder-label">Guru Pamong Informatika</span>
            <strong>{pplSchoolProfile.guruPamong}</strong>
            <span>{pplSchoolProfile.pamongRole}</span>
          </div>

          <div className="ppl-stakeholder-card">
            <span className="ppl-stakeholder-label">Dosen Pembimbing Lapangan</span>
            <strong>{pplSchoolProfile.dpl}</strong>
            <span>{pplSchoolProfile.dplRole}</span>
          </div>

          <div className="ppl-stakeholder-card">
            <span className="ppl-stakeholder-label">Mahasiswa Praktikan</span>
            <strong>{pplSchoolProfile.studentPraktikan}</strong>
            <span>NIM: {pplSchoolProfile.nim} • PPG UNY</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Siklus 1, Siklus 2 - 4, & Dokumentasi Video dan Foto Mengajar serta Evaluasi */}
      <div className="ppl-tabs-nav" role="tablist" aria-label="Pilih Siklus atau Dokumentasi Praktik Pembelajaran Mandiri">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'siklus-1'}
          className={`ppl-tab-btn ${activeTab === 'siklus-1' ? 'active' : ''}`}
          onClick={() => setActiveTab('siklus-1')}
        >
          <IconLayers size={18} />
          <span>Praktik Pembelajaran Mandiri Siklus 1</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'siklus-2-4'}
          className={`ppl-tab-btn ${activeTab === 'siklus-2-4' ? 'active' : ''}`}
          onClick={() => setActiveTab('siklus-2-4')}
        >
          <IconDoc size={18} />
          <span>Praktik Pembelajaran Mandiri Siklus 2 - 4</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'dokumentasi'}
          className={`ppl-tab-btn ${activeTab === 'dokumentasi' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('dokumentasi')
            setMediaFilter('Semua')
          }}
        >
          <IconCamera size={18} />
          <span>Dokumentasi Video dan Foto Mengajar serta Evaluasi</span>
        </button>
      </div>

      {/* Active Cycle Content (Siklus 1 / Siklus 2 - 4) */}
      {activeTab !== 'dokumentasi' && (
        <div className="ppl-timeline-container">
          <div className="ppl-school-card" style={{ marginBottom: '10px', padding: '24px 28px' }}>
            <span className="ppl-art-code" style={{ display: 'inline-block', marginBottom: '10px' }}>
              DOKUMEN PERANGKAT AJAR & EVALUASI · {currentCycle.label.toUpperCase()}
            </span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', margin: '0 0 8px' }}>
              {currentCycle.fullTitle}
            </h2>
            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.94rem', lineHeight: '1.65' }}>
              {currentCycle.description}
            </p>
          </div>

          {currentCycle.mediaLinks && currentCycle.mediaLinks.length > 0 && (
            <div className="ppl-phase-card ppl-colab-section-card">
              <div className="ppl-colab-section-head">
                <span className="ppl-art-code" style={{ display: 'inline-block', marginBottom: '8px' }}>
                  SIKLUS 2 - 4 · MEDIA PEMBELAJARAN PRAKTIK
                </span>
                <h3 className="ppl-phase-title" style={{ margin: '0 0 4px', fontSize: '1.25rem' }}>
                  Media Pembelajaran Praktik (Google Colaboratory)
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.72)' }}>
                  Media pembelajaran interaktif Google Colab dan materi praktikum algoritma pemrograman pada Siklus 2 - 4.
                </p>
              </div>

              <div className="ppl-colab-grid">
                {currentCycle.mediaLinks.map((link) => (
                  <div key={link.id} className="ppl-colab-card">
                    <div className="ppl-colab-card-body">
                      <div className="ppl-colab-card-top">
                        <div
                          className={`ppl-colab-icon-box ${
                            link.id === 'colab-platform' ? 'is-platform' : 'is-notebook'
                          }`}
                        >
                          {link.id === 'colab-platform' ? (
                            <IconColab size={18} />
                          ) : (
                            <IconCodeNotebook size={17} />
                          )}
                        </div>

                        <span className="ppl-art-code ppl-colab-badge">
                          {link.code}
                        </span>
                      </div>

                      <h4 className="ppl-colab-title">{link.title}</h4>
                      <p className="ppl-colab-subtitle">{link.subtitle}</p>
                    </div>

                    <div className="ppl-colab-card-footer">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ppl-colab-btn"
                      >
                        <IconColab size={15} />
                        <span>{link.buttonLabel}</span>
                        <span aria-hidden="true" className="ppl-colab-btn-arrow">↗</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentCycle.documents.map((doc) => (
            <div key={doc.id} className="ppl-phase-card" style={{ padding: '26px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <div>
                  <span className="ppl-art-code" style={{ display: 'inline-block', marginBottom: '8px' }}>
                    {doc.code}
                  </span>
                  <h3 className="ppl-phase-title" style={{ margin: '0 0 4px', fontSize: '1.25rem' }}>
                    {doc.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    {doc.subtitle}
                  </p>
                </div>
              </div>

              <PdfCanvasViewer
                gdriveUrl={doc.gdriveUrl}
                pdfUrl={doc.downloadUrl}
                title={doc.title}
                fileName={doc.fileName}
                height="560px"
                onExpandFullscreen={() => setPreviewDoc(doc)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Dokumentasi Video dan Foto Mengajar serta Evaluasi */}
      {activeTab === 'dokumentasi' && (
        <div className="ppl-school-card" style={{ padding: '32px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <span className="ppl-art-code" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <IconCamera size={15} />
                <span>DOKUMENTASI VISUAL PPL MANDIRI</span>
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', margin: '0 0 6px' }}>
                Dokumentasi Video dan Foto Mengajar serta Evaluasi
              </h2>
            </div>

            <div className="gallery-filter-tabs" style={{ margin: 0 }}>
              {mediaCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`gallery-filter-btn ${mediaFilter === cat ? 'active' : ''}`}
                  onClick={() => setMediaFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid" style={{ maxWidth: '100%' }}>
            {filteredMedia.map((item) => (
              <article key={item.id} className={`gallery-card type-${item.type}`}>
                {item.type === 'video' ? (
                  <div className="gallery-video-wrapper">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={item.thumbnail}
                      className="gallery-player"
                    >
                      <source src={item.src} type="video/mp4" />
                      Peramban Anda tidak mendukung pemutar video HTML5.
                    </video>
                  </div>
                ) : (
                  <div
                    className="gallery-photo-wrapper"
                    onClick={() => setPreviewPhoto(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setPreviewPhoto(item)
                    }}
                    aria-label={`Buka ${item.title}`}
                  >
                    <img src={item.src} alt={item.title} className="gallery-photo-img" />
                    <div className="gallery-photo-overlay">
                      <span className="photo-zoom-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        Lihat Foto
                      </span>
                    </div>
                  </div>
                )}

                <div className="gallery-card-caption">
                  <span className="gallery-badge-simple">{item.category}</span>
                  <h3 className="gallery-simple-title">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal for Photos */}
      {previewPhoto && (
        <div className="gallery-modal-backdrop" onClick={() => setPreviewPhoto(null)}>
          <div className="gallery-photo-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-modal-close"
              onClick={() => setPreviewPhoto(null)}
              aria-label="Tutup pratinjau foto"
            >
              ✕
            </button>
            <div className="gallery-photo-modal-img-wrap">
              <img
                src={previewPhoto.src}
                alt={previewPhoto.title}
                className="gallery-modal-full-img"
              />
            </div>
            <div className="gallery-photo-modal-info">
              <span className="gallery-badge-simple">{previewPhoto.category}</span>
              <h3>{previewPhoto.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Document Modal */}
      <PdfReviewModal
        isOpen={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        gdriveUrl={previewDoc?.gdriveUrl || ''}
        pdfUrl={previewDoc?.downloadUrl || ''}
        title={previewDoc?.title || 'Dokumen PPL SMAN 11 Yogyakarta'}
        fileName={previewDoc?.fileName || 'dokumen-ppl.pdf'}
      />
    </section>
  )
}

export default PPLMandiri
