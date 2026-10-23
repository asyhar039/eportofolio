import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Seminar.css'
import { seminarWorksheets, karyaInovasiList } from '../data/seminarData'

// Modern Minimalist SVG Icons
const IconDoc = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const IconSparkles = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
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

const IconExternal = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
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

const IconDownload = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const inovasiCategories = [
  'Semua Inovasi',
  'Inovasi Manajerial & Teknologi Sekolah',
  'Inovasi Media Pembelajaran Interaktif',
  'Inovasi Perangkat & Pendekatan Pedagogik',
  'Inovasi Asesmen & Evaluasi Pembelajaran',
  'Inovasi Bahan Ajar & Aktivitas Kelas',
  'Inovasi Diseminasi & Portofolio Digital'
]

function Seminar() {
  const [activeTab, setActiveTab] = useState('lembar-kerja') // 'lembar-kerja' or 'karya-inovasi'
  const [searchQuery, setSearchQuery] = useState('')
  const [activeInovasiCat, setActiveInovasiCat] = useState('Semua Inovasi')
  const [selectedLk, setSelectedLk] = useState(null)
  const [selectedInovasi, setSelectedInovasi] = useState(null)
  const [activeTopicIndex, setActiveTopicIndex] = useState(0)
  const [showPdfEmbed, setShowPdfEmbed] = useState(false)
  const [copiedState, setCopiedState] = useState(false)

  // Manage body scroll lock when modal is open
  useEffect(() => {
    if (selectedLk || selectedInovasi) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedLk, selectedInovasi])

  // Filter Lembar Kerja
  const filteredWorksheets = useMemo(() => {
    if (!searchQuery.trim()) return seminarWorksheets
    const q = searchQuery.toLowerCase()
    return seminarWorksheets.filter((lk) => {
      const inTitle = lk.title.toLowerCase().includes(q)
      const inNumber = lk.number.toLowerCase().includes(q)
      const inSummary = lk.summary.toLowerCase().includes(q)
      const inHighlights = lk.highlights?.some((h) => h.toLowerCase().includes(q))
      return inTitle || inNumber || inSummary || inHighlights
    })
  }, [searchQuery])

  // Filter Karya Inovasi
  const filteredInovasi = useMemo(() => {
    return karyaInovasiList.filter((item) => {
      const matchCat = activeInovasiCat === 'Semua Inovasi' || item.category === activeInovasiCat
      if (!matchCat) return false
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      const inTitle = item.title.toLowerCase().includes(q)
      const inSummary = item.summary.toLowerCase().includes(q)
      const inProblem = item.problem?.toLowerCase().includes(q)
      const inSolution = item.solution?.toLowerCase().includes(q)
      const inTag = item.tag?.toLowerCase().includes(q)
      return inTitle || inSummary || inProblem || inSolution || inTag
    })
  }, [activeInovasiCat, searchQuery])

  const handleOpenLk = (lk) => {
    setActiveTopicIndex(0)
    setShowPdfEmbed(false)
    setSelectedLk(lk)
  }

  const handleCopyLkText = () => {
    if (!selectedLk) return
    let textToCopy = `${selectedLk.title}\n${selectedLk.subtitle || ''}\nProgram: ${selectedLk.program} (${selectedLk.semester})\nOleh: ${selectedLk.author}\n\nRingkasan:\n${selectedLk.summary}\n\n`

    if (selectedLk.lk1Sections) {
      const lk1 = selectedLk.lk1Sections
      textToCopy += `=== VISI PENDIDIKAN INDONESIA ===\n${lk1.visiPendidikan.content}\n\n`
      textToCopy += `=== VISI CALON GURU ===\n${lk1.visiCalonGuru.content}\n\n`
      textToCopy += `=== 5 LANGKAH STRATEGIS KONKRET ===\n`
      lk1.langkahStrategis.forEach((ls) => {
        textToCopy += `${ls.no}. ${ls.judul}: ${ls.uraian}\n\n`
      })
    } else if (selectedLk.topics && selectedLk.topics.length > 0) {
      const activeTopic = selectedLk.topics[activeTopicIndex]
      textToCopy += `=== ${activeTopic.topicNumber}: ${activeTopic.title} ===\n\n`
      textToCopy += `A. Refleksi 4C:\n`
      textToCopy += `1. Connection: ${activeTopic.reflection4C?.connection?.answer}\n\n`
      textToCopy += `2. Challenge: ${activeTopic.reflection4C?.challenge?.answer}\n\n`
      textToCopy += `3. Concept: ${activeTopic.reflection4C?.concept?.answer}\n\n`
      textToCopy += `4. Change: ${activeTopic.reflection4C?.change?.answer}\n\n`
    } else if (selectedLk.lk3Sections) {
      const s = selectedLk.lk3Sections
      textToCopy += `=== 1. Pandangan Pendidikan Indonesia ===\n`
      textToCopy += s.section1.paragraphs.join('\n\n') + '\n\n'
      textToCopy += `=== 2. Upaya & Langkah Strategis ===\n`
      s.section2.steps.forEach((st, idx) => {
        textToCopy += `${idx + 1}. ${st.title}: ${st.description}\n`
      })
      textToCopy += `\n=== 3. Rencana Aksi Karier Guru ===\n`
      s.section3.actionTable.forEach((row) => {
        textToCopy += `${row.no}. ${row.program}\n   Aksi: ${row.description}\n   Indikator: ${row.indicator}\n\n`
      })
    }

    navigator.clipboard?.writeText(textToCopy).then(() => {
      setCopiedState(true)
      setTimeout(() => setCopiedState(false), 2500)
    })
  }

  return (
    <section id="seminar" className="seminar-section">
      {/* Hero Banner */}
      <div className="seminar-hero-banner">
        <div className="seminar-badge-top">
          <span className="pulse-dot"></span>
          Mata Kuliah Inti Seminar PPG Informatika
        </div>
        <h1>Seminar Pendidikan Profesi Guru</h1>
        <p>
          Ruang diseminasi refleksi diri berbasis bukti data (evidence-based reflection), kurasi artefak pembelajaran unggulan, dokumen lembar kerja seminar resmi (LK 1, LK 2 Semester I & II, LK 3), serta portofolio karya inovasi pendidikan yang siap diadvokasikan ke dalam ekosistem persekolahan.
        </p>

        <div className="seminar-stats-row">
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">4 Dokumen</span>
            <span className="seminar-stat-lbl">Lembar Kerja Resmi (LK 1, LK 2, LK 3)</span>
          </div>
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">3 Berkas PDF</span>
            <span className="seminar-stat-lbl">Tersedia Berkas Asli di Direktori Assets</span>
          </div>
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">6 Karya Inovasi</span>
            <span className="seminar-stat-lbl">Teknologi, Media, Asesmen & Pedagogik</span>
          </div>
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">12 Topik 4C</span>
            <span className="seminar-stat-lbl">Sintesis Refleksi Mendalam Mata Kuliah</span>
          </div>
        </div>
      </div>

      {/* Main Sub-Menu Nav Tabs */}
      <div className="seminar-tabs-nav" role="tablist">
        <button
          className={`seminar-tab-btn ${activeTab === 'lembar-kerja' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('lembar-kerja')
            setSearchQuery('')
          }}
          role="tab"
          aria-selected={activeTab === 'lembar-kerja'}
        >
          <IconDoc size={20} />
          <span>Lembar Kerja Seminar</span>
          <span className="tab-count-badge">4 Dokumen LK</span>
        </button>

        <button
          className={`seminar-tab-btn ${activeTab === 'karya-inovasi' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('karya-inovasi')
            setSearchQuery('')
          }}
          role="tab"
          aria-selected={activeTab === 'karya-inovasi'}
        >
          <IconSparkles size={20} />
          <span>Karya Inovasi</span>
          <span className="tab-count-badge">6 Inovasi Pilihan</span>
        </button>
      </div>

      {/* TAB 1: LEMBAR KERJA SEMINAR */}
      {activeTab === 'lembar-kerja' && (
        <div>
          {/* Controls Bar */}
          <div className="seminar-sub-controls">
            <div className="seminar-filter-chips">
              <span className="seminar-chip-btn active">Semua Lembar Kerja ({filteredWorksheets.length})</span>
            </div>

            <div className="seminar-search-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Cari LK 1, LK 2, LK 3, topik 4C..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Grid of Lembar Kerja */}
          <div className="lk-grid">
            {filteredWorksheets.map((lk) => (
              <article key={lk.id} className="lk-card">
                <div className="lk-card-top">
                  <span className="lk-badge-num">{lk.number}</span>
                  {lk.pdfUrl && (
                    <span className="lk-pdf-tag">
                      <IconPdf size={13} />
                      <span>PDF ({lk.pdfSize})</span>
                    </span>
                  )}
                </div>

                <h3 className="lk-title">{lk.title}</h3>
                <p className="lk-desc">{lk.summary}</p>

                {lk.highlights && (
                  <ul className="lk-highlights-list">
                    {lk.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx}>
                        <span className="lk-check-icon"><IconCheck size={13} /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="lk-action-footer">
                  <button className="lk-btn-open" onClick={() => handleOpenLk(lk)}>
                    <span>Buka Lembar Kerja</span>
                    <IconExternal size={14} />
                  </button>

                  {lk.pdfUrl && (
                    <a
                      href={lk.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lk-btn-pdf"
                      title="Buka Berkas PDF Resmi"
                    >
                      <IconPdf size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KARYA INOVASI */}
      {activeTab === 'karya-inovasi' && (
        <div>
          {/* Categories & Search */}
          <div className="seminar-sub-controls">
            <div className="seminar-filter-chips">
              {inovasiCategories.map((cat) => (
                <button
                  key={cat}
                  className={`seminar-chip-btn ${activeInovasiCat === cat ? 'active' : ''}`}
                  onClick={() => setActiveInovasiCat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="seminar-search-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Cari inovasi QR, Cisco, PSE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Grid of Karya Inovasi */}
          <div className="inovasi-grid">
            {filteredInovasi.map((item) => (
              <article key={item.id} className="inovasi-card">
                <div className="inovasi-top-meta">
                  <span className="inovasi-tag">{item.tag}</span>
                  <span className="inovasi-cat-pill">{item.number}</span>
                </div>

                <h3 className="inovasi-title">{item.title}</h3>
                <p className="inovasi-subtitle">{item.subtitle}</p>

                <div className="inovasi-metrics-strip">
                  {item.impactMetrics?.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="inovasi-metric-box">
                      <span className="inovasi-metric-val">{m.value}</span>
                      <span className="inovasi-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>

                <p className="inovasi-summary">{item.summary}</p>

                <div className="inovasi-tech-chips">
                  {item.techStack?.map((tech, idx) => (
                    <span key={idx} className="inovasi-chip">{tech}</span>
                  ))}
                </div>

                <button
                  className="inovasi-action-btn"
                  onClick={() => setSelectedInovasi(item)}
                >
                  <span>Lihat Selengkapnya & Rekam Bukti</span>
                  <IconExternal size={14} />
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* MODAL VIEW: Lembar Kerja Seminar Detail */}
      {selectedLk &&
        createPortal(
          <div className="seminar-modal-backdrop" onClick={() => setSelectedLk(null)} role="dialog">
            <div className="seminar-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="seminar-modal-head">
                <div className="seminar-modal-title-wrap">
                  <h2>{selectedLk.title}</h2>
                  <p>{selectedLk.subtitle || selectedLk.program}</p>
                </div>
                <button className="seminar-modal-close-btn" onClick={() => setSelectedLk(null)}>
                  <IconClose size={16} />
                  <span>Tutup</span>
                </button>
              </div>

              <div className="seminar-modal-body">
                {/* PDF Panel if PDF exists */}
                {selectedLk.pdfUrl && (
                  <div className="modal-pdf-bar">
                    <div className="modal-pdf-bar-left">
                      <IconPdf size={24} style={{ color: '#e11d48' }} />
                      <div>
                        <strong>{selectedLk.pdfFileName}</strong>
                        <span>Ukuran: {selectedLk.pdfSize} • Berkas resmi dari assets</span>
                      </div>
                    </div>
                    <div className="modal-pdf-btns">
                      <button
                        className="modal-pdf-btn-embed"
                        onClick={() => setShowPdfEmbed(!showPdfEmbed)}
                      >
                        <IconEye size={15} />
                        <span>{showPdfEmbed ? 'Tutup Pratinjau' : 'Pratinjau PDF'}</span>
                      </button>
                      <a
                        href={selectedLk.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-pdf-btn-open"
                      >
                        <IconExternal size={14} />
                        <span>Buka PDF di Tab Baru</span>
                      </a>
                      <a
                        href={selectedLk.pdfUrl}
                        download={selectedLk.pdfFileName}
                        className="modal-pdf-btn-open"
                        style={{ background: '#0f2240' }}
                      >
                        <IconDownload size={14} />
                        <span>Unduh</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Embedded PDF iframe */}
                {selectedLk.pdfUrl && showPdfEmbed && (
                  <iframe
                    src={selectedLk.pdfUrl}
                    className="modal-embed-frame"
                    title={`Pratinjau ${selectedLk.title}`}
                  />
                )}

                {/* Summary box */}
                <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                  <h4 style={{ margin: '0 0 6px', color: '#0f2240', fontSize: '0.95rem' }}>Deskripsi Ringkas</h4>
                  <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>{selectedLk.summary}</p>
                </div>

                {/* CASE 1: LK 1 Identifikasi Diri */}
                {selectedLk.lk1Sections && (
                  <div>
                    {/* Profil */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                      <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Nama Mahasiswa</span>
                        <strong style={{ color: '#0f2240' }}>{selectedLk.lk1Sections.identitasDiri.nama}</strong>
                      </div>
                      <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Nomor Induk Mahasiswa (NIM)</span>
                        <strong style={{ color: '#0f2240' }}>{selectedLk.lk1Sections.identitasDiri.nim}</strong>
                      </div>
                      <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Program Studi & Perguruan Tinggi</span>
                        <strong style={{ color: '#0f2240' }}>{selectedLk.lk1Sections.identitasDiri.bidangStudi} ({selectedLk.lk1Sections.identitasDiri.perguruanTinggi})</strong>
                      </div>
                    </div>

                    {/* Visi Pendidikan */}
                    <div style={{ marginBottom: '20px', borderLeft: '4px solid #1d6fa5', paddingLeft: '16px' }}>
                      <h4 style={{ color: '#0f2240', margin: '0 0 6px' }}>{selectedLk.lk1Sections.visiPendidikan.title}</h4>
                      <p style={{ color: '#334155', lineHeight: '1.65', margin: 0 }}>{selectedLk.lk1Sections.visiPendidikan.content}</p>
                    </div>

                    {/* Visi Calon Guru */}
                    <div style={{ marginBottom: '24px', borderLeft: '4px solid #00b4d8', paddingLeft: '16px' }}>
                      <h4 style={{ color: '#0f2240', margin: '0 0 6px' }}>{selectedLk.lk1Sections.visiCalonGuru.title}</h4>
                      <p style={{ color: '#334155', lineHeight: '1.65', margin: 0 }}>{selectedLk.lk1Sections.visiCalonGuru.content}</p>
                    </div>

                    {/* 5 Langkah Strategis */}
                    <h4 style={{ color: '#0f2240', margin: '0 0 14px' }}>5 Langkah Strategis Konkret Menjadi Guru Profesional</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedLk.lk1Sections.langkahStrategis.map((ls) => (
                        <div key={ls.no} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px' }}>
                          <strong style={{ color: '#1d6fa5', display: 'block', marginBottom: '4px' }}>
                            {ls.no}. {ls.judul}
                          </strong>
                          <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: '1.55' }}>{ls.uraian}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CASE 2: LK 2 Topics (Semester 1 & 2) */}
                {selectedLk.topics && (
                  <div>
                    {/* Topic selector tabs */}
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
                      {selectedLk.topics.map((t, idx) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTopicIndex(idx)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '10px',
                            border: '1px solid',
                            borderColor: activeTopicIndex === idx ? '#1d6fa5' : '#cbd5e1',
                            background: activeTopicIndex === idx ? '#1d6fa5' : '#ffffff',
                            color: activeTopicIndex === idx ? '#ffffff' : '#334155',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {t.topicNumber}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const topic = selectedLk.topics[activeTopicIndex]
                      if (!topic) return null

                      return (
                        <div>
                          <div style={{ background: '#f1f5f9', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px' }}>
                            <span style={{ background: '#0f2240', color: '#ffffff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
                              {topic.topicNumber}
                            </span>
                            <h3 style={{ margin: '8px 0 4px', color: '#0f2240', fontSize: '1.2rem' }}>{topic.title}</h3>
                            {topic.descriptionMeta && (
                              <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{topic.descriptionMeta}</p>
                            )}
                          </div>

                          {/* 4C Cards */}
                          {topic.reflection4C && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                              {/* Connection */}
                              <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '16px' }}>
                                <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
                                  CONNECTION (Keterkaitan)
                                </span>
                                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '8px 0 6px', fontStyle: 'italic' }}>
                                  {topic.reflection4C.connection?.question}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: '1.6', margin: 0 }}>
                                  {topic.reflection4C.connection?.answer}
                                </p>
                              </div>

                              {/* Challenge */}
                              <div style={{ background: '#ffffff', border: '1px solid #fecdd3', borderRadius: '14px', padding: '16px' }}>
                                <span style={{ background: '#ffe4e6', color: '#9f1239', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
                                  CHALLENGE (Tantangan)
                                </span>
                                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '8px 0 6px', fontStyle: 'italic' }}>
                                  {topic.reflection4C.challenge?.question}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: '1.6', margin: 0 }}>
                                  {topic.reflection4C.challenge?.answer}
                                </p>
                              </div>

                              {/* Concept */}
                              <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '16px' }}>
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
                                  CONCEPT (Konsep Utama)
                                </span>
                                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '8px 0 6px', fontStyle: 'italic' }}>
                                  {topic.reflection4C.concept?.question}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                                  {topic.reflection4C.concept?.answer}
                                </p>
                              </div>

                              {/* Change */}
                              <div style={{ background: '#ffffff', border: '1px solid #fed7aa', borderRadius: '14px', padding: '16px' }}>
                                <span style={{ background: '#ffedd5', color: '#9a3412', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
                                  CHANGE (Perubahan & Tindakan)
                                </span>
                                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '8px 0 6px', fontStyle: 'italic' }}>
                                  {topic.reflection4C.change?.question}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                                  {topic.reflection4C.change?.answer}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Artifact Analysis */}
                          {topic.artifactAnalysis && (
                            <div style={{ marginTop: '20px' }}>
                              <h4 style={{ color: '#0f2240', marginBottom: '12px' }}>Analisis Artefak Pembelajaran (Bukti Dukung Refleksi)</h4>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                                {topic.artifactAnalysis.map((art, aIdx) => (
                                  <div key={aIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                                    <span style={{ background: '#1d6fa5', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700' }}>
                                      {art.label}
                                    </span>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '6px 0 4px', fontStyle: 'italic' }}>{art.question}</p>
                                    <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-line' }}>{art.answer}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                )}

                {/* CASE 3: LK 3 Sections */}
                {selectedLk.lk3Sections && (
                  <div>
                    {/* Section 1 */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ color: '#0f2240', fontSize: '1.1rem', marginBottom: '12px' }}>
                        {selectedLk.lk3Sections.section1.title}
                      </h4>
                      {selectedLk.lk3Sections.section1.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} style={{ fontSize: '0.92rem', color: '#334155', lineHeight: '1.65', marginBottom: '12px' }}>{p}</p>
                      ))}
                    </div>

                    {/* Section 2 */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ color: '#0f2240', fontSize: '1.1rem', marginBottom: '6px' }}>
                        {selectedLk.lk3Sections.section2.title}
                      </h4>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '14px' }}>{selectedLk.lk3Sections.section2.lead}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {selectedLk.lk3Sections.section2.steps.map((st, stIdx) => (
                          <div key={stIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px' }}>
                            <strong style={{ color: '#1d6fa5', display: 'block', marginBottom: '4px' }}>
                              {stIdx + 1}. {st.title}
                            </strong>
                            <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: '1.55' }}>{st.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Action Table */}
                    <div>
                      <h4 style={{ color: '#0f2240', fontSize: '1.1rem', marginBottom: '6px' }}>
                        {selectedLk.lk3Sections.section3.title}
                      </h4>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '14px' }}>{selectedLk.lk3Sections.section3.lead}</p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                          <thead>
                            <tr style={{ background: '#0f2240', color: '#ffffff' }}>
                              <th style={{ padding: '10px 12px', textAlign: 'center', width: '40px' }}>No</th>
                              <th style={{ padding: '10px 12px', textAlign: 'left', width: '35%' }}>Program Aksi Karier</th>
                              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Deskripsi & Indikator</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedLk.lk3Sections.section3.actionTable.map((row) => (
                              <tr key={row.no} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{row.no}</td>
                                <td style={{ padding: '12px', fontWeight: '700', color: '#0f2240' }}>{row.program}</td>
                                <td style={{ padding: '12px' }}>
                                  <p style={{ margin: '0 0 6px 0', color: '#475569' }}>{row.description}</p>
                                  <span style={{ color: '#059669', fontWeight: '700' }}>Indikator: {row.indicator}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="seminar-modal-foot">
                <button
                  onClick={handleCopyLkText}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: '#0f2240'
                  }}
                >
                  <IconCopy size={15} />
                  <span>{copiedState ? 'Tersalin ke Clipboard!' : 'Salin Teks Lembar Kerja'}</span>
                </button>

                <button
                  onClick={() => setSelectedLk(null)}
                  style={{
                    padding: '8px 20px',
                    background: '#0f2240',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.85rem'
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* MODAL VIEW: Karya Inovasi Detail */}
      {selectedInovasi &&
        createPortal(
          <div className="seminar-modal-backdrop" onClick={() => setSelectedInovasi(null)} role="dialog">
            <div className="seminar-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="seminar-modal-head">
                <div className="seminar-modal-title-wrap">
                  <h2>{selectedInovasi.title}</h2>
                  <p>{selectedInovasi.category} • {selectedInovasi.year}</p>
                </div>
                <button className="seminar-modal-close-btn" onClick={() => setSelectedInovasi(null)}>
                  <IconClose size={16} />
                  <span>Tutup</span>
                </button>
              </div>

              <div className="seminar-modal-body">
                {/* Meta info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Pengembang / Tim</span>
                    <strong style={{ color: '#0f2240' }}>{selectedInovasi.collaborators}</strong>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>LPTK / Instansi</span>
                    <strong style={{ color: '#0f2240' }}>{selectedInovasi.institution}</strong>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Status Implementasi</span>
                    <strong style={{ color: '#059669' }}>{selectedInovasi.status}</strong>
                  </div>
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {selectedInovasi.impactMetrics?.map((m, idx) => (
                    <div key={idx} style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid #bbf7d0', padding: '14px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#166534', display: 'block' }}>{m.value}</span>
                      <span style={{ fontSize: '0.78rem', color: '#15803d' }}>{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Problem & Solution */}
                <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '16px', borderRadius: '12px' }}>
                    <strong style={{ color: '#9f1239', display: 'block', marginBottom: '6px' }}>Latar Belakang Permasalahan</strong>
                    <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: '1.55' }}>{selectedInovasi.problem}</p>
                  </div>
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '16px', borderRadius: '12px' }}>
                    <strong style={{ color: '#1e40af', display: 'block', marginBottom: '6px' }}>Solusi Inovasi yang Dihasilkan</strong>
                    <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: '1.55' }}>{selectedInovasi.solution}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#0f2240', marginBottom: '10px' }}>Fitur & Keunggulan Utama Inovasi</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedInovasi.keyFeatures?.map((f, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: '#334155' }}>
                        <span style={{ color: '#059669', marginTop: '2px' }}><IconCheck size={14} /></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Evidence links */}
                {selectedInovasi.evidenceLinks && (
                  <div>
                    <h4 style={{ color: '#0f2240', marginBottom: '10px' }}>Tautan Bukti & Dokumen Pendukung</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedInovasi.evidenceLinks.map((ev, idx) => (
                        <div key={idx} style={{ background: '#f1f5f9', padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem' }}>
                          <strong style={{ color: '#0f2240' }}>{ev.label}</strong>
                          <span style={{ color: '#64748b', marginLeft: '6px' }}>({ev.note})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="seminar-modal-foot">
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Karya Inovasi Seminar PPG Informatika • Universitas Negeri Yogyakarta
                </span>
                <button
                  onClick={() => setSelectedInovasi(null)}
                  style={{
                    padding: '8px 20px',
                    background: '#0f2240',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.85rem'
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}

export default Seminar
