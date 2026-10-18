import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Artifacts.css'
import { seminarWorksheets, generalArtifacts } from '../data/artifactsData'

const allArtifactsList = [...seminarWorksheets, ...generalArtifacts]

const categories = [
  'Semua Artefak',
  'Lembar Kerja Seminar PPG',
  'Perangkat & Modul Ajar',
  'Media Pembelajaran & Asesmen',
  'Praktik & Kepemimpinan'
]

// Modern Minimalist SVG Icons
const IconDoc = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const IconPdf = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15h1.5a1.5 1.5 0 0 0 0-3H9v6" />
  </svg>
)

const IconCheck = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconCopy = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const IconClose = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconEye = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconEyeOff = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const IconExternal = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const IconDownload = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const IconPrinter = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
)

const IconArrowUp = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
)

const IconArrowRight = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconLayers = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const IconCompass = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
)

const IconEvidence = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <polyline points="9 15 11 17 15 13" />
  </svg>
)

const IconBook = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const IconTarget = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const IconTable = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
)

function Artifacts() {
  const [activeCategory, setActiveCategory] = useState('Semua Artefak')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArtifact, setSelectedArtifact] = useState(null)
  const [activeTopicIndex, setActiveTopicIndex] = useState(0)
  const [showPdfEmbed, setShowPdfEmbed] = useState(false)
  const [copiedState, setCopiedState] = useState(false)

  // Reset states when opening a new artifact
  const handleOpenArtifact = (artifact) => {
    setActiveTopicIndex(0)
    setShowPdfEmbed(false)
    setSelectedArtifact(artifact)
  }

  // Handle ESC key to close modal and manage body lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedArtifact(null)
      }
    }
    if (selectedArtifact) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.classList.add('modal-open')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
    }
  }, [selectedArtifact])

  const handleSelectTopic = (idx) => {
    setActiveTopicIndex(idx)
    setTimeout(() => {
      const topicEl = document.getElementById('active-topic-section')
      if (topicEl) {
        topicEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 40)
  }

  const handleScrollToTop = () => {
    const backdropEl = document.querySelector('.artifact-modal-backdrop')
    if (backdropEl) {
      backdropEl.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const filteredArtifacts = useMemo(() => {
    return allArtifactsList.filter((item) => {
      const matchCategory =
        activeCategory === 'Semua Artefak' || item.category === activeCategory

      if (!matchCategory) return false

      if (!searchQuery.trim()) return true

      const query = searchQuery.toLowerCase()
      const inTitle = item.title.toLowerCase().includes(query)
      const inCode = item.code ? item.code.toLowerCase().includes(query) : false
      const inSummary = item.summary.toLowerCase().includes(query)
      const inNumber = item.number.toLowerCase().includes(query)
      const inHighlights = item.highlights?.some((h) =>
        h.toLowerCase().includes(query)
      )

      return inTitle || inCode || inSummary || inNumber || inHighlights
    })
  }, [activeCategory, searchQuery])

  const handleCopyText = () => {
    if (!selectedArtifact) return

    let textToCopy = `${selectedArtifact.title}
Program: ${selectedArtifact.program || selectedArtifact.course || 'Pendidikan Profesi Guru (Prajabatan)'} (${selectedArtifact.semester})
Penyusun: ${selectedArtifact.author || 'Asyhar Qowiim'}

Ringkasan:
${selectedArtifact.summary}\n\n`

    if (selectedArtifact.topics && selectedArtifact.topics.length > 0) {
      const activeTopic = selectedArtifact.topics[activeTopicIndex]
      textToCopy += `=== ${activeTopic.topicNumber}: ${activeTopic.title} ===\n\n`
      textToCopy += `A. Refleksi Pengalaman Belajar (4C):\n`
      textToCopy += `1. Connection: ${activeTopic.reflection4C?.connection?.answer}\n\n`
      textToCopy += `2. Challenge: ${activeTopic.reflection4C?.challenge?.answer}\n\n`
      textToCopy += `3. Concept: ${activeTopic.reflection4C?.concept?.answer}\n\n`
      textToCopy += `4. Change: ${activeTopic.reflection4C?.change?.answer}\n\n`
      if (activeTopic.artifactAnalysis) {
        textToCopy += `B. Analisis Artefak Pembelajaran:\n`
        activeTopic.artifactAnalysis.forEach((art) => {
          textToCopy += `${art.label}: ${art.answer}\n`
        })
      }
    } else if (selectedArtifact.lk3Sections) {
      const s = selectedArtifact.lk3Sections
      textToCopy += `=== 1. Pandangan Pendidikan Indonesia ===\n`
      textToCopy += s.section1.paragraphs.join('\n\n') + '\n\n'
      textToCopy += `=== 2. Upaya & Langkah Strategis Menjadi Guru Profesional ===\n`
      s.section2.steps.forEach((step, idx) => {
        textToCopy += `${idx + 1}. ${step.title}: ${step.description}\n`
      })
      textToCopy += `\n=== 3. Rencana Aksi Memulai Karier Sebagai Guru ===\n`
      s.section3.actionTable.forEach((row) => {
        textToCopy += `${row.no}. ${row.program}\n   Aksi: ${row.description}\n   Indikator: ${row.indicator}\n\n`
      })
    } else if (selectedArtifact.components) {
      textToCopy += selectedArtifact.components
        .map((c) => `--- ${c.title} ---\n${c.content}`)
        .join('\n\n')
    }

    navigator.clipboard?.writeText(textToCopy).then(() => {
      setCopiedState(true)
      setTimeout(() => setCopiedState(false), 2500)
    })
  }

  return (
    <section id="artifak" className="section artifacts-section">
      {/* Section Heading */}
      <div className="section-heading">
        <span className="section-eyebrow">05 · ARTIFAK DAN BUKTI BELAJAR</span>
        <h2>Arsip Dokumen, Karya, & Bukti Pembelajaran PPG</h2>
        <p>
          Dokumentasi komprehensif seluruh artefak perkuliahan dan praktik, berfokus utama pada{' '}
          <strong>Lembar Kerja Seminar Pendidikan Profesi Guru (LK 2 Semester I, LK 2 Semester II, dan LK 3)</strong>{' '}
          lengkap dengan berkas PDF resmi dari folder assets sebagai bukti sintesis refleksi 4C, kurasi kompetensi, dan komitmen karier guru profesional.
        </p>
      </div>

      {/* Featured Seminar PPG Spotlight Banner */}
      <div className="seminar-spotlight-banner">
        <div className="banner-top-badge">
          <span className="dot-pulse"></span>
          Fokus Utama Seminar PPG • Berkas PDF Tersedia
        </div>
        <h3>Artefak Bukti Lembar Kerja Seminar Pendidikan Profesi Guru</h3>
        <p>
          Tiga dokumen utama refleksi pengalaman belajar PPG Informatika: LK 2 Semester I (6 Topik 4C), LK 2 Semester II (6 Topik 4C PSE hingga Projek Kepemimpinan), dan LK 3 (Refleksi Diri Pengalaman Belajar Selama Mengikuti Program PPG). Setiap dokumen dilengkapi berkas PDF asli yang siap dibuka atau diunduh langsung.
        </p>
        <div className="banner-lk-shortcuts">
          {seminarWorksheets.map((lk) => (
            <button
              key={lk.id}
              className="lk-shortcut-btn"
              onClick={() => handleOpenArtifact(lk)}
              title={`Buka ${lk.number}: ${lk.title}`}
            >
              <span className="badge-num">{lk.number}</span>
              <span>{lk.title.split(':')[1]?.trim() || lk.title}</span>
              <IconExternal size={12} style={{ opacity: 0.8 }} />
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar: Filters & Search */}
      <div className="artifacts-controls-bar">
        <div className="artifacts-filter-group" role="tablist" aria-label="Filter kategori artefak">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''} ${
                cat === 'Lembar Kerja Seminar PPG' && activeCategory === cat ? 'active-seminar' : ''
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="artifacts-search-box">
          <svg
            className="search-icon-svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Cari LK 2, LK 3, modul, topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Cari artefak"
          />
        </div>
      </div>

      {/* Artifacts Grid */}
      {filteredArtifacts.length > 0 ? (
        <div className="artifacts-grid">
          {filteredArtifacts.map((artifact) => {
            const isSeminar = artifact.category === 'Lembar Kerja Seminar PPG'
            return (
              <article
                key={artifact.id}
                className={`artifact-card ${isSeminar ? 'is-seminar' : ''}`}
              >
                <div className="card-topline">
                  <span className="card-category-badge">{artifact.number}</span>
                </div>

                <div className={`card-icon-wrap ${isSeminar ? 'seminar-icon' : ''}`}>
                  <IconDoc size={22} />
                </div>

                {artifact.pdfUrl && (
                  <div className="card-pdf-indicator">
                    <IconPdf size={13} />
                    <span>PDF Terlampir ({artifact.pdfSize})</span>
                  </div>
                )}

                <h3 className="card-title">{artifact.title}</h3>
                <p className="card-desc">{artifact.summary}</p>

                {artifact.highlights && artifact.highlights.length > 0 && (
                  <ul className="card-highlights-preview">
                    {artifact.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx}>
                        <span className="bullet-check">
                          <IconCheck size={11} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="card-footer-action">
                  <button
                    className="card-open-btn"
                    onClick={() => handleOpenArtifact(artifact)}
                    aria-label={`Buka ${artifact.title}`}
                  >
                    <span>{isSeminar ? 'Buka Lembar Kerja & PDF' : 'Buka Detail Dokumen'}</span>
                    <span className="arrow-move">
                      <IconArrowRight size={14} />
                    </span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="artifacts-empty-state">
          <div className="empty-state-icon">
            <IconDoc size={32} />
          </div>
          <h4>Tidak ada artefak yang cocok</h4>
          <p>Coba kata kunci pencarian lain atau pilih kategori "Semua Artefak".</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setActiveCategory('Semua Artefak')
              setSearchQuery('')
            }}
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Modal / Detailed Document Viewer */}
      {selectedArtifact &&
        createPortal(
          <div
            className="artifact-modal-backdrop"
            onClick={() => setSelectedArtifact(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="artifact-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="modal-header-bar">
                <div className="modal-header-title-block">
                  <div className="modal-meta-tags">
                    <span className="modal-category-tag">{selectedArtifact.category}</span>
                    {selectedArtifact.number && (
                      <span className="modal-category-tag modal-number-tag">{selectedArtifact.number}</span>
                    )}
                  </div>
                  <h2>{selectedArtifact.title}</h2>
                  {selectedArtifact.subtitle && (
                    <p className="modal-subtitle">{selectedArtifact.subtitle}</p>
                  )}
                </div>

                <div className="modal-header-actions">
                  <button
                    className="modal-header-copy-btn"
                    onClick={handleCopyText}
                    title="Salin isi lembar kerja"
                  >
                    <IconCopy size={15} />
                    <span>Salin</span>
                  </button>
                  <button
                    className="modal-close-btn"
                    onClick={() => setSelectedArtifact(null)}
                    aria-label="Tutup jendela dokumen"
                    title="Tutup jendela dokumen (ESC)"
                  >
                    <IconClose size={18} />
                    <span className="close-label">Tutup</span>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="modal-scrollable-body">
                {/* PDF Download & Embed Panel (for artifacts with PDF in assets) */}
                {selectedArtifact.pdfUrl && (
                  <div className="modal-pdf-download-panel">
                    <div className="pdf-panel-info">
                      <div className="pdf-panel-icon">
                        <IconPdf size={20} />
                      </div>
                      <div className="pdf-panel-text">
                        <strong>{selectedArtifact.pdfFileName}</strong>
                        <span>Ukuran berkas: {selectedArtifact.pdfSize} • Berkas resmi dari assets</span>
                      </div>
                    </div>

                    <div className="pdf-panel-actions">
                      <button
                        className={`pdf-btn-toggle ${showPdfEmbed ? 'active' : ''}`}
                        onClick={() => setShowPdfEmbed(!showPdfEmbed)}
                      >
                        {showPdfEmbed ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                        <span>{showPdfEmbed ? 'Tutup Pratinjau' : 'Pratinjau PDF'}</span>
                      </button>
                      <a
                        href={selectedArtifact.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-btn-open"
                      >
                        <IconExternal size={14} />
                        <span>Buka Tab Baru</span>
                      </a>
                      <a
                        href={selectedArtifact.pdfUrl}
                        download={selectedArtifact.pdfFileName}
                        className="pdf-btn-download"
                      >
                        <IconDownload size={15} />
                        <span>Unduh PDF</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Embedded PDF Viewer (toggled via button) */}
                {selectedArtifact.pdfUrl && showPdfEmbed && (
                  <div className="embedded-pdf-container">
                    <iframe
                      src={selectedArtifact.pdfUrl}
                      className="embedded-pdf-frame"
                      title={`Pratinjau PDF ${selectedArtifact.title}`}
                    />
                  </div>
                )}

                {/* Meta Grid */}
                <div className="modal-info-grid">
                  <div className="info-box">
                    <span className="info-label">Program</span>
                    <strong>Pendidikan Profesi Guru (Prajabatan)</strong>
                  </div>
                  <div className="info-box">
                    <span className="info-label">Semester / Periode</span>
                    <strong>{selectedArtifact.semester} • {selectedArtifact.date}</strong>
                  </div>
                  <div className="info-box">
                    <span className="info-label">Nama Mahasiswa</span>
                    <strong>{selectedArtifact.author || 'Asyhar Qowiim'}</strong>
                  </div>
                  {selectedArtifact.institution && (
                    <div className="info-box">
                      <span className="info-label">Bidang Keahlian</span>
                      <strong>{selectedArtifact.institution}</strong>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="modal-summary-box">
                  <h4>Deskripsi & Ruang Lingkup Dokumen</h4>
                  <p>{selectedArtifact.summary}</p>
                </div>

                {/* CASE 1: Render LK 2 (Semester 1 & 2) with Interactive Topics */}
                {selectedArtifact.topics && selectedArtifact.topics.length > 0 && (
                  <div>
                    {/* Topic Selector Tabs */}
                    <div className="topic-nav-container">
                      <span className="topic-nav-label">
                        <IconLayers size={15} />
                        <span>Pilih Topik Refleksi ({selectedArtifact.topics.length} Topik Tersedia):</span>
                      </span>
                      <div className="topic-nav-tabs">
                        {selectedArtifact.topics.map((t, idx) => (
                          <button
                            key={t.id}
                            className={`topic-nav-btn ${activeTopicIndex === idx ? 'active' : ''}`}
                            onClick={() => handleSelectTopic(idx)}
                          >
                            <span>{t.topicNumber}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Topic Content */}
                    {(() => {
                      const activeTopic = selectedArtifact.topics[activeTopicIndex]
                      if (!activeTopic) return null

                      return (
                        <div id="active-topic-section">
                          {/* Topic Header Card */}
                          <div className="active-topic-header-card">
                            <span className="topic-num-badge">{activeTopic.topicNumber}</span>
                            <h3>{activeTopic.title}</h3>
                            {activeTopic.descriptionMeta && (
                              <p className="meta-desc">{activeTopic.descriptionMeta}</p>
                            )}
                          </div>

                          {/* Section A: 4C Reflection */}
                          {activeTopic.reflection4C && (
                            <div className="c4-section-wrapper">
                              <h4 className="section-subheading-badge">
                                <IconCompass size={18} />
                                <span>A. Refleksi Pengalaman Belajar Dalam Konteks Peran Pendidik (4C)</span>
                              </h4>

                              <div className="c4-grid">
                                {/* Connection */}
                                <div className="c4-card">
                                  <span className="c4-badge connection">Connection (Keterkaitan)</span>
                                  <p className="c4-question">{activeTopic.reflection4C.connection?.question}</p>
                                  <p className="c4-answer">{activeTopic.reflection4C.connection?.answer}</p>
                                </div>

                                {/* Challenge */}
                                <div className="c4-card">
                                  <span className="c4-badge challenge">Challenge (Tantangan)</span>
                                  <p className="c4-question">{activeTopic.reflection4C.challenge?.question}</p>
                                  <p className="c4-answer">{activeTopic.reflection4C.challenge?.answer}</p>
                                </div>

                                {/* Concept */}
                                <div className="c4-card">
                                  <span className="c4-badge concept">Concept (Konsep Utama)</span>
                                  <p className="c4-question">{activeTopic.reflection4C.concept?.question}</p>
                                  <p className="c4-answer">{activeTopic.reflection4C.concept?.answer}</p>
                                </div>

                                {/* Change */}
                                <div className="c4-card">
                                  <span className="c4-badge change">Change (Perubahan)</span>
                                  <p className="c4-question">{activeTopic.reflection4C.change?.question}</p>
                                  <p className="c4-answer">{activeTopic.reflection4C.change?.answer}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Section B: Artifact Analysis */}
                          {activeTopic.artifactAnalysis && activeTopic.artifactAnalysis.length > 0 && (
                            <div>
                              <h4 className="section-subheading-badge">
                                <IconEvidence size={18} />
                                <span>B. Analisis Artefak Pembelajaran (Bukti Dukung Hasil Refleksi)</span>
                              </h4>

                              <div className="artifact-analysis-container">
                                {activeTopic.artifactAnalysis.map((art, aIdx) => (
                                  <div key={aIdx} className="artifact-analysis-card">
                                    <span className="artifact-badge-pill">{art.label}</span>
                                    <p className="analysis-q">{art.question}</p>
                                    <p className="analysis-a">{art.answer}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })()}

                    {/* Official Signoff Box (if exists) */}
                    {selectedArtifact.officialSignoff && (
                      <div className="official-signoff-card">
                        <div className="signoff-col">
                          <span className="signoff-label">Mengetahui / Memverifikasi:</span>
                          <strong className="signoff-name">( ..................................................... )</strong>
                          <span className="signoff-sub">{selectedArtifact.officialSignoff.supervisorTitle}</span>
                        </div>
                        <div className="signoff-col" style={{ textAlign: 'right' }}>
                          <span className="signoff-label">{selectedArtifact.officialSignoff.locationDate}</span>
                          <strong className="signoff-name">{selectedArtifact.officialSignoff.studentName}</strong>
                          <span className="signoff-sub">{selectedArtifact.officialSignoff.studentNIM}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* CASE 2: Render LK 3 (Refleksi Pengalaman Belajar PPG) */}
                {selectedArtifact.lk3Sections && (
                  <div>
                    {/* Section 1: Pandangan Pendidikan */}
                    <div className="lk3-section-block">
                      <h4 className="lk3-section-title">
                        <IconBook size={18} />
                        <span>{selectedArtifact.lk3Sections.section1.title}</span>
                      </h4>
                      {selectedArtifact.lk3Sections.section1.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="lk3-paragraph">{p}</p>
                      ))}
                    </div>

                    {/* Section 2: 5 Langkah Strategis */}
                    <div className="lk3-section-block">
                      <h4 className="lk3-section-title">
                        <IconTarget size={18} />
                        <span>{selectedArtifact.lk3Sections.section2.title}</span>
                      </h4>
                      <p className="lk3-lead">{selectedArtifact.lk3Sections.section2.lead}</p>
                      <div className="lk3-steps-list">
                        {selectedArtifact.lk3Sections.section2.steps.map((st, stIdx) => (
                          <div key={stIdx} className="lk3-step-item">
                            <div className="lk3-step-num">{stIdx + 1}</div>
                            <div className="lk3-step-content">
                              <h5>{st.title}</h5>
                              <p>{st.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Tabel Program Aksi Karier Guru */}
                    <div className="lk3-section-block">
                      <h4 className="lk3-section-title">
                        <IconTable size={18} />
                        <span>{selectedArtifact.lk3Sections.section3.title}</span>
                      </h4>
                      <p className="lk3-lead">{selectedArtifact.lk3Sections.section3.lead}</p>
                      <div className="action-table-wrapper">
                        <table className="action-table">
                          <thead>
                            <tr>
                              <th style={{ width: '48px', textAlign: 'center' }}>No</th>
                              <th style={{ width: '32%' }}>Program Aksi Karier Guru</th>
                              <th>Deskripsi Aksi & Indikator Keberhasilan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedArtifact.lk3Sections.section3.actionTable.map((row) => (
                              <tr key={row.no}>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.no}</td>
                                <td>
                                  <strong>{row.program}</strong>
                                </td>
                                <td>
                                  <p style={{ margin: '0 0 6px 0' }}>{row.description}</p>
                                  <span className="indicator-highlight">
                                    <strong>Indikator:</strong> {row.indicator}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* CASE 3: General Components (for general artifacts) */}
                {selectedArtifact.components && selectedArtifact.components.length > 0 && !selectedArtifact.topics && (
                  <div>
                    <h4 className="section-subheading-badge">
                      <IconDoc size={18} />
                      <span>Uraian Komponen Dokumen</span>
                    </h4>
                    {selectedArtifact.components.map((comp, idx) => (
                      <div key={idx} className="component-card">
                        <h5>
                          <span>▫</span>
                          <span>{comp.title}</span>
                        </h5>
                        <p>{comp.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Actions Footer */}
              <div className="modal-actions-bar">
                <div className="modal-action-btn-group">
                  <button className="modal-copy-btn" onClick={handleCopyText}>
                    <IconCopy size={15} />
                    <span>Salin Teks Dokumen</span>
                  </button>
                  <button
                    className="modal-print-btn"
                    onClick={() => window.print()}
                  >
                    <IconPrinter size={15} />
                    <span>Cetak / PDF</span>
                  </button>
                  {copiedState && (
                    <span className="copy-toast">
                      <IconCheck size={14} />
                      <span>Tersalin ke clipboard!</span>
                    </span>
                  )}
                </div>

                <div className="modal-footer-right-group">
                  <button
                    className="modal-scrolltop-btn"
                    onClick={handleScrollToTop}
                    title="Kembali ke bagian atas dokumen"
                  >
                    <IconArrowUp size={15} />
                    <span>Ke Atas</span>
                  </button>
                  <button
                    className="modal-done-btn"
                    onClick={() => setSelectedArtifact(null)}
                  >
                    Tutup Dokumen
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}

export default Artifacts
