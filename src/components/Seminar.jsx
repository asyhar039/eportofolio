import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Seminar.css'
import { seminarWorksheets, karyaInovasiList } from '../data/seminarData'
import PdfReviewModal, { PdfCanvasViewer } from './PdfReviewModal'

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

const IconRouter = ({ size = 22, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="11" width="20" height="9" rx="2" />
    <path d="M6 11V5" />
    <path d="M18 11V5" />
    <line x1="6" y1="15" x2="6.01" y2="15" strokeWidth="2.5" />
    <line x1="10" y1="15" x2="10.01" y2="15" strokeWidth="2.5" />
    <line x1="14" y1="15" x2="14.01" y2="15" strokeWidth="2.5" />
    <line x1="18" y1="15" x2="18.01" y2="15" strokeWidth="2.5" />
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
  'Inovasi Media Pembelajaran Interaktif'
]

const netlabJsonPreview = `{
  "schemaVersion": "1.0",
  "metadata": {
    "name": "Studi Kasus Topologi Jaringan Minimarket Berkah",
    "version": "1.0",
    "description": "Topologi jaringan retail: Server Kasir (POS Database), PC Kasir front-end, PC Gudang, Cisco Catalyst 2960-24TT Switch",
    "author": "Asyhar Qowiim",
    "simulator": "NetLab (https://netlab.thecybersecguru.com)"
  },
  "topology": {
    "devices": [
      {
        "model": "2960-24TT",
        "fullName": "Cisco Catalyst 2960-24TT Switch",
        "hostname": "2960-24TT3",
        "stp": { "enabled": true, "mode": "pvst", "priority": 32768 },
        "ports": ["fa0/1 (Server Kasir)", "fa0/2 (PC Kasir)", "fa0/3 (PC Gudang)", "fa0/4-24", "gi0/1-2"]
      },
      {
        "model": "PC-PT",
        "fullName": "Server Kasir (POS Database)",
        "hostname": "server-kasir",
        "ip": "192.168.1.1",
        "subnet": "255.255.255.0 (/24)",
        "gateway": "192.168.1.254",
        "mac": "72:AA:27:9C:6B:49"
      },
      {
        "model": "PC",
        "fullName": "PC Kasir (Kasir Front-Office)",
        "hostname": "PC kasir",
        "ip": "192.168.1.10",
        "subnet": "255.255.255.0 (/24)",
        "gateway": "192.168.1.1",
        "mac": "6E:75:73:67:90:F5"
      },
      {
        "model": "PC",
        "fullName": "PC Gudang (Logistik & Inventaris)",
        "hostname": "PC Gudang",
        "ip": "192.168.1.50",
        "subnet": "255.255.255.224 (/27)",
        "gateway": "192.168.1.1",
        "mac": "C3:88:87:7E:05:45"
      }
    ],
    "connections": [
      { "type": "straight", "from": "Switch fa0/1", "to": "Server Kasir fa0", "speed": "100 Mbps", "latency": "0.18 ms" },
      { "type": "straight", "from": "Switch fa0/2", "to": "PC Kasir fa0", "speed": "100 Mbps", "latency": "0.18 ms" },
      { "type": "straight", "from": "Switch fa0/3", "to": "PC Gudang fa0", "speed": "100 Mbps", "latency": "0.18 ms" }
    ]
  }
}`

function Seminar() {
  const [activeTab, setActiveTab] = useState('lembar-kerja') // 'lembar-kerja' or 'karya-inovasi'
  const [searchQuery, setSearchQuery] = useState('')
  const [activeInovasiCat, setActiveInovasiCat] = useState('Semua Inovasi')
  const [selectedLk, setSelectedLk] = useState(null)
  const [selectedInovasi, setSelectedInovasi] = useState(null)
  const [activeTopicIndex, setActiveTopicIndex] = useState(0)
  const [showPdfEmbed, setShowPdfEmbed] = useState(false)
  const [showInovasiPdfEmbed, setShowInovasiPdfEmbed] = useState(false)
  const [copiedState, setCopiedState] = useState(false)
  const [showJsonPreview, setShowJsonPreview] = useState(false)
  const [jsonCopied, setJsonCopied] = useState(false)
  const [activeReviewPdf, setActiveReviewPdf] = useState(null)

  const openPdfReview = (url, title, fileName, fileSize, pages = []) => {
    setActiveReviewPdf({
      pdfUrl: url,
      title: title || 'Dokumen PDF',
      fileName: fileName || 'dokumen.pdf',
      fileSize: fileSize || '',
      pages: pages || []
    })
  }

  // Manage body scroll lock when modal is open
  useEffect(() => {
    if (selectedLk || selectedInovasi || activeReviewPdf) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedLk, selectedInovasi, activeReviewPdf])

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
      <span className="seminar-section-eyebrow">05 · SEMINAR PPG</span>

      {/* Hero Banner */}
      <div className="seminar-hero-banner">
        <div className="seminar-badge-top">
          <span className="pulse-dot"></span>
          Mata Kuliah Seminar PPG Informatika
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
            <span className="seminar-stat-val">4 Berkas PDF</span>
            <span className="seminar-stat-lbl">Tersedia Berkas Asli LK 1-3 & Slide Presentasi</span>
          </div>
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">Karya Inovasi</span>
            <span className="seminar-stat-lbl">Simulasi Topologi Jaringan NetLab</span>
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
          <IconRouter size={20} />
          <span>Karya Inovasi</span>
          <span className="tab-count-badge">Karya Inovasi Pembelajaran</span>
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
                    <button
                      type="button"
                      onClick={() => openPdfReview(lk.pdfUrl, lk.title, lk.pdfFileName, lk.pdfSize, lk.previewPages)}
                      className="lk-pdf-tag"
                      style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                      title="Klik untuk Review Dokumen PDF di Layar"
                    >
                      <IconPdf size={13} />
                      <span>Review PDF ({lk.pdfSize})</span>
                    </button>
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
                    <button
                      type="button"
                      onClick={() => openPdfReview(lk.pdfUrl, lk.title, lk.pdfFileName, lk.pdfSize, lk.previewPages)}
                      className="lk-btn-pdf"
                      title="Review Berkas PDF Resmi (Tanpa Mengunduh)"
                      style={{ cursor: 'pointer', border: 'none' }}
                    >
                      <IconPdf size={16} />
                    </button>
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
                placeholder="Cari inovasi NetLab, Minimarket, QR, PSE..."
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: item.pdfUrl ? 'repeat(3, 1fr)' : '1fr 1fr', gap: '8px' }}>
                    {item.jsonUrl && (
                      <a
                        href={item.jsonUrl}
                        download={item.jsonFileName}
                        className="netlab-btn-download"
                        style={{ padding: '8px 10px', fontSize: '0.78rem', justifyContent: 'center' }}
                        title="Unduh Berkas JSON untuk Simulator NetLab"
                      >
                        <IconDownload size={14} />
                        <span>Unduh JSON</span>
                      </a>
                    )}
                    {item.netlabUrl && (
                      <a
                        href={item.netlabUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="netlab-btn-open"
                        style={{ padding: '8px 10px', fontSize: '0.78rem', justifyContent: 'center' }}
                        title="Buka Website Simulator NetLab"
                      >
                        <IconExternal size={14} />
                        <span>Buka NetLab</span>
                      </a>
                    )}
                    {item.pdfUrl && (
                      <button
                        type="button"
                        onClick={() => openPdfReview(item.pdfUrl, item.pdfTitle || item.title, item.pdfFileName, item.pdfSize, item.previewPages)}
                        className="netlab-btn-open"
                        style={{ padding: '8px 10px', fontSize: '0.78rem', justifyContent: 'center', background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                        title="Review Berkas Slide Presentasi PDF (Tanpa Mengunduh)"
                      >
                        <IconPdf size={14} />
                        <span>Review Slide PDF</span>
                      </button>
                    )}
                  </div>

                  <button
                    className="inovasi-action-btn"
                    onClick={() => {
                      setShowJsonPreview(false)
                      setShowInovasiPdfEmbed(false)
                      setSelectedInovasi(item)
                    }}
                  >
                    <span>Buka Panduan Simulasi, Topologi & Slide</span>
                    <IconExternal size={14} />
                  </button>
                </div>
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
                      <IconPdf size={24} style={{ color: '#fca5a5' }} />
                      <div>
                        <strong>{selectedLk.pdfFileName}</strong>
                        <span>Ukuran: {selectedLk.pdfSize} • Berkas resmi dari assets/seminar</span>
                      </div>
                    </div>
                    <div className="modal-pdf-btns">
                      <button
                        type="button"
                        className="modal-pdf-btn-embed"
                        onClick={() => setShowPdfEmbed(!showPdfEmbed)}
                        title="Tampilkan / Sembunyikan Pratinjau Dokumen di Layar"
                      >
                        <IconEye size={15} />
                        <span>{showPdfEmbed ? 'Tutup Pratinjau' : 'Pratinjau / Review PDF'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openPdfReview(selectedLk.pdfUrl, selectedLk.title, selectedLk.pdfFileName, selectedLk.pdfSize, selectedLk.previewPages)}
                        className="modal-pdf-btn-open"
                        style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                        title="Review PDF di Jendela Layar Penuh (Tanpa Mengunduh)"
                      >
                        <IconExternal size={14} />
                        <span>Review Layar Penuh</span>
                      </button>
                      <a
                        href={selectedLk.pdfUrl}
                        download={selectedLk.pdfFileName}
                        className="modal-pdf-btn-open"
                        style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}
                        title="Unduh Berkas PDF Resmi ke Komputer"
                      >
                        <IconDownload size={14} />
                        <span>Unduh</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Embedded PDF Canvas Viewer (In-App Review, No Download) */}
                {selectedLk.pdfUrl && showPdfEmbed && (
                  <div style={{ marginBottom: '24px' }}>
                    <PdfCanvasViewer
                      pdfUrl={selectedLk.pdfUrl}
                      pages={selectedLk.previewPages}
                      title={selectedLk.title}
                      fileName={selectedLk.pdfFileName}
                      fileSize={selectedLk.pdfSize}
                      height="580px"
                      onExpandFullscreen={() => openPdfReview(selectedLk.pdfUrl, selectedLk.title, selectedLk.pdfFileName, selectedLk.pdfSize, selectedLk.previewPages)}
                    />
                  </div>
                )}

                {/* Summary box */}
                <div className="theme-panel-glass">
                  <h4>Deskripsi Ringkas</h4>
                  <p>{selectedLk.summary}</p>
                </div>

                {/* CASE 1: LK 1 Identifikasi Diri */}
                {selectedLk.lk1Sections && (
                  <div>
                    {/* Profil */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                      <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>Nama Mahasiswa</span>
                        <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{selectedLk.lk1Sections.identitasDiri.nama}</strong>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>Nomor Induk Mahasiswa (NIM)</span>
                        <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', fontFamily: 'Geist Mono, monospace' }}>{selectedLk.lk1Sections.identitasDiri.nim}</strong>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>Program Studi & Perguruan Tinggi</span>
                        <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{selectedLk.lk1Sections.identitasDiri.bidangStudi} ({selectedLk.lk1Sections.identitasDiri.perguruanTinggi})</strong>
                      </div>
                    </div>

                    {/* Visi Pendidikan */}
                    <div style={{ marginBottom: '20px', borderLeft: '4px solid var(--accent-cyan)', background: 'rgba(0, 217, 255, 0.06)', borderRadius: '0 12px 12px 0', padding: '16px 20px' }}>
                      <h4 style={{ color: 'var(--accent-cyan)', margin: '0 0 6px', fontSize: '1rem', fontWeight: '700' }}>{selectedLk.lk1Sections.visiPendidikan.title}</h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.65', margin: 0, fontSize: '0.92rem' }}>{selectedLk.lk1Sections.visiPendidikan.content}</p>
                    </div>

                    {/* Visi Calon Guru */}
                    <div style={{ marginBottom: '26px', borderLeft: '4px solid #a855f7', background: 'rgba(168, 85, 247, 0.06)', borderRadius: '0 12px 12px 0', padding: '16px 20px' }}>
                      <h4 style={{ color: '#c084fc', margin: '0 0 6px', fontSize: '1rem', fontWeight: '700' }}>{selectedLk.lk1Sections.visiCalonGuru.title}</h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.65', margin: 0, fontSize: '0.92rem' }}>{selectedLk.lk1Sections.visiCalonGuru.content}</p>
                    </div>

                    {/* 5 Langkah Strategis */}
                    <h4 style={{ color: '#ffffff', margin: '0 0 16px', fontSize: '1.05rem', fontWeight: '700' }}>5 Langkah Strategis Konkret Menjadi Guru Profesional</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedLk.lk1Sections.langkahStrategis.map((ls) => (
                        <div key={ls.no} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px 20px' }}>
                          <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '6px', fontSize: '0.95rem' }}>
                            {ls.no}. {ls.judul}
                          </strong>
                          <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: '1.6' }}>{ls.uraian}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CASE 2: LK 2 Topics (Semester 1 & 2) */}
                {selectedLk.topics && (
                  <div>
                    {/* Topic selector tabs */}
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '22px' }}>
                      {selectedLk.topics.map((t, idx) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTopicIndex(idx)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '10px',
                            border: '1px solid',
                            borderColor: activeTopicIndex === idx ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.15)',
                            background: activeTopicIndex === idx ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.06)',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease',
                            fontFamily: 'inherit'
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
                          <div style={{ background: 'linear-gradient(135deg, rgba(29, 111, 165, 0.25), rgba(0, 217, 255, 0.15))', border: '1px solid rgba(0, 217, 255, 0.3)', padding: '18px 22px', borderRadius: '16px', marginBottom: '22px' }}>
                            <span style={{ background: 'rgba(0, 217, 255, 0.2)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 217, 255, 0.4)', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
                              {topic.topicNumber}
                            </span>
                            <h3 style={{ margin: '10px 0 6px', color: '#ffffff', fontSize: '1.25rem' }}>{topic.title}</h3>
                            {topic.descriptionMeta && (
                              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem' }}>{topic.descriptionMeta}</p>
                            )}
                          </div>

                          {/* 4C Cards */}
                          {topic.reflection4C && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '26px' }}>
                              {/* Connection */}
                              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '16px', padding: '18px' }}>
                                <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800', letterSpacing: '0.5px' }}>
                                  CONNECTION (Keterkaitan)
                                </span>
                                <p style={{ fontSize: '0.82rem', color: '#bae6fd', margin: '10px 0 6px', fontStyle: 'italic' }}>
                                  {topic.reflection4C.connection?.question}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.65', margin: 0 }}>
                                  {topic.reflection4C.connection?.answer}
                                </p>
                              </div>

                              {/* Challenge */}
                              <div style={{ background: 'rgba(251, 146, 60, 0.08)', border: '1px solid rgba(251, 146, 60, 0.35)', borderRadius: '16px', padding: '18px' }}>
                                <span style={{ background: 'rgba(251, 146, 60, 0.2)', color: '#fbbf24', padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800', letterSpacing: '0.5px' }}>
                                  CHALLENGE (Tantangan)
                                </span>
                                <p style={{ fontSize: '0.82rem', color: '#fed7aa', margin: '10px 0 6px', fontStyle: 'italic' }}>
                                  {topic.reflection4C.challenge?.question}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.65', margin: 0 }}>
                                  {topic.reflection4C.challenge?.answer}
                                </p>
                              </div>

                              {/* Concept */}
                              <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.35)', borderRadius: '16px', padding: '18px' }}>
                                <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800', letterSpacing: '0.5px' }}>
                                  CONCEPT (Konsep Utama)
                                </span>
                                <p style={{ fontSize: '0.82rem', color: '#e9d5ff', margin: '10px 0 6px', fontStyle: 'italic' }}>
                                  {topic.reflection4C.concept?.question}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.65', margin: 0, whiteSpace: 'pre-line' }}>
                                  {topic.reflection4C.concept?.answer}
                                </p>
                              </div>

                              {/* Change */}
                              <div style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.35)', borderRadius: '16px', padding: '18px' }}>
                                <span style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800', letterSpacing: '0.5px' }}>
                                  CHANGE (Perubahan & Tindakan)
                                </span>
                                <p style={{ fontSize: '0.82rem', color: '#a7f3d0', margin: '10px 0 6px', fontStyle: 'italic' }}>
                                  {topic.reflection4C.change?.question}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.65', margin: 0, whiteSpace: 'pre-line' }}>
                                  {topic.reflection4C.change?.answer}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Artifact Analysis */}
                          {topic.artifactAnalysis && (
                            <div style={{ marginTop: '24px' }}>
                              <h4 style={{ color: '#ffffff', marginBottom: '14px', fontSize: '1.05rem', fontWeight: '700' }}>Analisis Artefak Pembelajaran (Bukti Dukung Refleksi)</h4>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                                {topic.artifactAnalysis.map((art, aIdx) => (
                                  <div key={aIdx} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px' }}>
                                    <span style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', color: '#ffffff', padding: '3px 9px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700' }}>
                                      {art.label}
                                    </span>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', margin: '8px 0 4px', fontStyle: 'italic' }}>{art.question}</p>
                                    <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.55', margin: 0, whiteSpace: 'pre-line' }}>{art.answer}</p>
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
                    <div style={{ marginBottom: '26px' }}>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '700' }}>
                        {selectedLk.lk3Sections.section1.title}
                      </h4>
                      {selectedLk.lk3Sections.section1.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.7', marginBottom: '14px' }}>{p}</p>
                      ))}
                    </div>

                    {/* Section 2 */}
                    <div style={{ marginBottom: '26px' }}>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '6px', fontWeight: '700' }}>
                        {selectedLk.lk3Sections.section2.title}
                      </h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '16px' }}>{selectedLk.lk3Sections.section2.lead}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {selectedLk.lk3Sections.section2.steps.map((st, stIdx) => (
                          <div key={stIdx} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px 20px' }}>
                            <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '4px', fontSize: '0.95rem' }}>
                              {stIdx + 1}. {st.title}
                            </strong>
                            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.9rem', lineHeight: '1.6' }}>{st.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Action Table */}
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '6px', fontWeight: '700' }}>
                        {selectedLk.lk3Sections.section3.title}
                      </h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '16px' }}>{selectedLk.lk3Sections.section3.lead}</p>
                      <div style={{ overflowX: 'auto', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '14px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                          <thead>
                            <tr style={{ background: 'rgba(29, 111, 165, 0.4)', color: '#ffffff' }}>
                              <th style={{ padding: '12px 14px', textAlign: 'center', width: '40px', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>No</th>
                              <th style={{ padding: '12px 14px', textAlign: 'left', width: '35%', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>Program Aksi Karier</th>
                              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>Deskripsi & Indikator</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedLk.lk3Sections.section3.actionTable.map((row) => (
                              <tr key={row.no} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <td style={{ padding: '14px', textAlign: 'center', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{row.no}</td>
                                <td style={{ padding: '14px', fontWeight: '700', color: '#ffffff' }}>{row.program}</td>
                                <td style={{ padding: '14px' }}>
                                  <p style={{ margin: '0 0 6px 0', color: 'rgba(255, 255, 255, 0.82)' }}>{row.description}</p>
                                  <span style={{ color: '#34d399', fontWeight: '700', display: 'block' }}>Indikator: {row.indicator}</span>
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
                    padding: '9px 18px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <IconCopy size={15} />
                  <span>{copiedState ? 'Tersalin ke Clipboard!' : 'Salin Teks Lembar Kerja'}</span>
                </button>

                <button
                  onClick={() => setSelectedLk(null)}
                  style={{
                    padding: '9px 22px',
                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit'
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '22px' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Pengembang / Tim</span>
                    <strong style={{ color: '#ffffff' }}>{selectedInovasi.collaborators}</strong>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>LPTK / Instansi</span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{selectedInovasi.institution}</strong>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>Status Implementasi</span>
                    <strong style={{ color: '#34d399' }}>{selectedInovasi.status}</strong>
                  </div>
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {selectedInovasi.impactMetrics?.map((m, idx) => (
                    <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(13, 148, 136, 0.15))', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '16px', borderRadius: '14px' }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#34d399', display: 'block' }}>{m.value}</span>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Slide Presentasi PDF Karya Inovasi (If PDF exists) */}
                {selectedInovasi.pdfUrl && (
                  <div
                    className="modal-pdf-bar"
                    style={{
                      marginBottom: '22px',
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(220, 38, 38, 0.05))',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      borderRadius: '16px',
                      padding: '16px 20px'
                    }}
                  >
                    <div className="modal-pdf-bar-left">
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: 'rgba(239, 68, 68, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#f87171',
                          flexShrink: 0
                        }}
                      >
                        <IconPdf size={24} />
                      </div>
                      <div>
                        <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.98rem' }}>
                          {selectedInovasi.pdfTitle || 'Slide Presentasi Karya Inovasi Pembelajaran'}
                        </strong>
                        <span style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.8rem', display: 'block', marginTop: '2px' }}>
                          Berkas: <strong style={{ color: '#fca5a5' }}>{selectedInovasi.pdfFileName}</strong> • Ukuran: <strong>{selectedInovasi.pdfSize}</strong> • Dokumen Presentasi Seminar PPG
                        </span>
                      </div>
                    </div>
                    <div className="modal-pdf-btns">
                      <button
                        type="button"
                        className="modal-pdf-btn-embed"
                        onClick={() => setShowInovasiPdfEmbed(!showInovasiPdfEmbed)}
                        title="Tampilkan / Sembunyikan Review Slide di Layar"
                        style={{
                          borderColor: showInovasiPdfEmbed ? '#f87171' : undefined,
                          color: showInovasiPdfEmbed ? '#fca5a5' : undefined
                        }}
                      >
                        <IconEye size={15} />
                        <span>{showInovasiPdfEmbed ? 'Tutup Review Slide' : 'Review Slide PDF'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openPdfReview(selectedInovasi.pdfUrl, selectedInovasi.pdfTitle || selectedInovasi.title, selectedInovasi.pdfFileName, selectedInovasi.pdfSize, selectedInovasi.previewPages)}
                        className="modal-pdf-btn-open"
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: '#ffffff',
                          boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                        title="Review Slide Presentasi di Jendela Layar Penuh (Tanpa Mengunduh)"
                      >
                        <IconExternal size={14} />
                        <span>Review Layar Penuh</span>
                      </button>
                      <a
                        href={selectedInovasi.pdfUrl}
                        download={selectedInovasi.pdfFileName}
                        className="modal-pdf-btn-open"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}
                        title="Unduh Berkas karya inovasi.pdf ke Komputer"
                      >
                        <IconDownload size={14} />
                        <span>Unduh Slide PDF</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* In-App Interactive Canvas Slide Viewer (Zero download, pure in-app render) */}
                {selectedInovasi.pdfUrl && showInovasiPdfEmbed && (
                  <div style={{ marginBottom: '24px' }}>
                    <PdfCanvasViewer
                      pdfUrl={selectedInovasi.pdfUrl}
                      pages={selectedInovasi.previewPages}
                      title={selectedInovasi.pdfTitle || selectedInovasi.title}
                      fileName={selectedInovasi.pdfFileName}
                      fileSize={selectedInovasi.pdfSize}
                      height="600px"
                      onExpandFullscreen={() => openPdfReview(selectedInovasi.pdfUrl, selectedInovasi.pdfTitle || selectedInovasi.title, selectedInovasi.pdfFileName, selectedInovasi.pdfSize, selectedInovasi.previewPages)}
                    />
                  </div>
                )}

                {/* NetLab Simulator Interactive Guide (If JSON Product) */}
                {selectedInovasi.jsonUrl && (
                  <div className="netlab-guide-banner">
                    <div className="netlab-banner-head">
                      <div className="netlab-banner-title">
                        <div className="netlab-icon-circle">
                          <IconRouter size={24} />
                        </div>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', fontWeight: '800' }}>
                            Panduan Simulasi Topologi Jaringan di NetLab
                          </h3>
                          <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#7dd3fc', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                            Platform Simulator: <strong style={{ wordBreak: 'break-all' }}>https://netlab.thecybersecguru.com</strong> • Berkas: <strong>{selectedInovasi.jsonFileName}</strong> ({selectedInovasi.jsonSize})
                          </p>
                        </div>
                      </div>

                      <div className="netlab-banner-actions">
                        <a
                          href={selectedInovasi.jsonUrl}
                          download={selectedInovasi.jsonFileName}
                          className="netlab-btn-download"
                          title="Unduh Berkas produk-karya-inovasi.json"
                        >
                          <IconDownload size={15} />
                          <span>Unduh File JSON</span>
                        </a>

                        <a
                          href={selectedInovasi.netlabUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="netlab-btn-open"
                          title="Kunjungi Website Simulator NetLab"
                        >
                          <IconExternal size={15} />
                          <span>Buka Simulator NetLab</span>
                        </a>
                      </div>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '700' }}>
                        Langkah demi Langkah Menjalankan Simulasi:
                      </span>
                    </div>

                    <div className="netlab-steps-grid">
                      {selectedInovasi.howToTest?.map((st) => (
                        <div key={st.step} className="netlab-step-card">
                          <div className="netlab-step-num">{st.step}</div>
                          <div className="netlab-step-title">{st.title}</div>
                          <p className="netlab-step-desc" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                            {st.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topology Schematic Diagram (If JSON Product) */}
                {selectedInovasi.devices && (
                  <div className="topology-schematic-wrap">
                    <div className="topology-schematic-head">
                      <div>
                        <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem', fontWeight: '800' }}>
                          Arsitektur & Skema Topologi Jaringan Minimarket Berkah
                        </h4>
                        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                          Simulasi Ritel: Server Database Kasir terpusat, Terminal POS Kasir, dan Terminal Logistik Gudang
                        </p>
                      </div>
                      <span className="topology-port-chip" style={{ background: 'rgba(14, 165, 233, 0.2)', borderColor: 'rgba(14, 165, 233, 0.4)', color: '#38bdf8' }}>
                        Topologi Star Terkelola
                      </span>
                    </div>

                    <div className="topology-grid-layout">
                      {/* Central Switch */}
                      <div className="topology-switch-box">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }}></span>
                          <strong style={{ color: '#ffffff', fontSize: '1rem' }}>Cisco Catalyst 2960-24TT Switch</strong>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontFamily: 'Geist Mono, monospace' }}>
                          Hostname: 2960-24TT3 • STP PVST (Priority 32768)
                        </span>
                        <div className="topology-switch-ports">
                          <span className="topology-port-chip">fa0/1 ⇄ Server Kasir</span>
                          <span className="topology-port-chip">fa0/2 ⇄ PC Kasir</span>
                          <span className="topology-port-chip">fa0/3 ⇄ PC Gudang</span>
                          <span className="topology-port-chip" style={{ opacity: 0.6 }}>fa0/4-24 & gi0/1-2 (Idle)</span>
                        </div>
                      </div>

                      {/* Endpoints Row */}
                      <div className="topology-endpoints-row">
                        {selectedInovasi.devices?.slice(1).map((dev, idx) => (
                          <div key={idx} className="topology-endpoint-card">
                            <span className="topology-endpoint-badge" title="Status Online"></span>
                            <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '2px' }}>
                              {dev.model}
                            </div>
                            <h5 style={{ margin: '0 0 6px 0', color: '#ffffff', fontSize: '0.98rem', fontWeight: '700' }}>
                              {dev.name}
                            </h5>
                            <p style={{ margin: '0 0 10px 0', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.72)' }}>
                              {dev.role}
                            </p>
                            <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div><span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>IP Address: </span><strong style={{ color: '#38bdf8' }}>{dev.ip}</strong></div>
                              <div><span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Subnet: </span><span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{dev.subnet}</span></div>
                              <div><span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Gateway: </span><span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{dev.gateway}</span></div>
                              <div><span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Port: </span><span style={{ color: '#34d399' }}>{dev.ports}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Device Table (If JSON Product) */}
                {selectedInovasi.devices && (
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ color: '#ffffff', marginBottom: '12px', fontSize: '1.05rem', fontWeight: '700' }}>
                      Rincian Pengalamatan & Parameter Perangkat Topologi
                    </h4>
                    <div className="topology-table-wrap">
                      <table className="topology-table">
                        <thead>
                          <tr>
                            <th>Perangkat</th>
                            <th>Hostname</th>
                            <th>Model</th>
                            <th>Alamat IP</th>
                            <th>Subnet Mask</th>
                            <th>Gateway</th>
                            <th>Port Koneksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedInovasi.devices.map((d, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: '700', color: '#ffffff' }}>{d.name}</td>
                              <td style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--accent-cyan)' }}>{d.hostname}</td>
                              <td style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{d.model}</td>
                              <td style={{ fontWeight: '700', color: '#38bdf8', fontFamily: 'Geist Mono, monospace' }}>{d.ip}</td>
                              <td style={{ fontFamily: 'Geist Mono, monospace' }}>{d.subnet}</td>
                              <td style={{ fontFamily: 'Geist Mono, monospace', color: 'rgba(255, 255, 255, 0.75)' }}>{d.gateway || '-'}</td>
                              <td style={{ color: '#34d399', fontSize: '0.78rem' }}>{d.ports}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* JSON Code Inspector (If JSON Product) */}
                {selectedInovasi.jsonUrl && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>
                        Berkas Konfigurasi JSON NetLab
                      </h4>
                      <button
                        onClick={() => setShowJsonPreview(!showJsonPreview)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          color: 'var(--accent-cyan)',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'inherit'
                        }}
                      >
                        <IconEye size={14} />
                        <span>{showJsonPreview ? 'Tutup Pratinjau Kode' : 'Pratinjau Kode JSON'}</span>
                      </button>
                    </div>

                    {showJsonPreview && (
                      <div className="json-preview-wrap">
                        <div className="json-preview-bar">
                          <span>berkas: produk-karya-inovasi.json (Skema NetLab v1.0)</span>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(netlabJsonPreview).then(() => {
                                setJsonCopied(true)
                                setTimeout(() => setJsonCopied(false), 2500)
                              })
                            }}
                            style={{
                              background: 'rgba(56, 189, 248, 0.2)',
                              border: '1px solid rgba(56, 189, 248, 0.35)',
                              color: '#ffffff',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontFamily: 'inherit'
                            }}
                          >
                            <IconCopy size={13} />
                            <span>{jsonCopied ? 'Tersalin!' : 'Salin JSON'}</span>
                          </button>
                        </div>
                        <pre className="json-preview-code">{netlabJsonPreview}</pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Problem & Solution */}
                <div style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '18px', borderRadius: '14px' }}>
                    <strong style={{ color: '#fda4af', display: 'block', marginBottom: '6px', fontSize: '0.95rem' }}>Latar Belakang Permasalahan</strong>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.88rem', lineHeight: '1.6' }}>{selectedInovasi.problem}</p>
                  </div>
                  <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '18px', borderRadius: '14px' }}>
                    <strong style={{ color: '#7dd3fc', display: 'block', marginBottom: '6px', fontSize: '0.95rem' }}>Solusi Inovasi yang Dihasilkan</strong>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.88rem', lineHeight: '1.6' }}>{selectedInovasi.solution}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ color: '#ffffff', marginBottom: '12px', fontSize: '1.05rem', fontWeight: '700' }}>Fitur & Keunggulan Utama Inovasi</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedInovasi.keyFeatures?.map((f, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                        <span style={{ color: '#34d399', marginTop: '2px' }}><IconCheck size={14} /></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Evidence links */}
                {selectedInovasi.evidenceLinks && (
                  <div>
                    <h4 style={{ color: '#ffffff', marginBottom: '12px', fontSize: '1.05rem', fontWeight: '700' }}>Tautan Bukti & Dokumen Pendukung</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedInovasi.evidenceLinks.map((ev, idx) => {
                        if (ev.url) {
                          const isPdf = ev.url.endsWith('.pdf') || ev.label.includes('PDF')
                          if (isPdf) {
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => openPdfReview(ev.url, selectedInovasi.pdfTitle || ev.label, selectedInovasi.pdfFileName, selectedInovasi.pdfSize, selectedInovasi.previewPages)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  background: 'rgba(239, 68, 68, 0.12)',
                                  border: '1px solid rgba(239, 68, 68, 0.35)',
                                  padding: '8px 14px',
                                  borderRadius: '10px',
                                  fontSize: '0.82rem',
                                  color: '#ffffff',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  fontFamily: 'inherit'
                                }}
                                className="evidence-link-pill"
                                title="Klik untuk Review Dokumen PDF di Layar"
                              >
                                <IconPdf size={15} style={{ color: '#f87171' }} />
                                <strong style={{ color: '#fca5a5' }}>{ev.label}</strong>
                                <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>({ev.note})</span>
                              </button>
                            )
                          }
                          return (
                            <a
                              key={idx}
                              href={ev.url}
                              target={ev.download ? undefined : '_blank'}
                              rel="noopener noreferrer"
                              download={ev.download}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                padding: '8px 14px',
                                borderRadius: '10px',
                                fontSize: '0.82rem',
                                color: '#ffffff',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                              }}
                              className="evidence-link-pill"
                            >
                              {ev.download ? (
                                <IconDownload size={14} style={{ color: 'var(--accent-cyan)' }} />
                              ) : (
                                <IconExternal size={14} style={{ color: 'var(--accent-cyan)' }} />
                              )}
                              <strong style={{ color: 'var(--accent-cyan)' }}>{ev.label}</strong>
                              <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>({ev.note})</span>
                            </a>
                          )
                        }
                        return (
                          <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', padding: '8px 14px', borderRadius: '10px', fontSize: '0.82rem' }}>
                            <strong style={{ color: 'var(--accent-cyan)' }}>{ev.label}</strong>
                            <span style={{ color: 'rgba(255, 255, 255, 0.65)', marginLeft: '6px' }}>({ev.note})</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="seminar-modal-foot">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {selectedInovasi.pdfUrl && (
                    <button
                      type="button"
                      onClick={() => openPdfReview(selectedInovasi.pdfUrl, selectedInovasi.pdfTitle || selectedInovasi.title, selectedInovasi.pdfFileName, selectedInovasi.pdfSize, selectedInovasi.previewPages)}
                      className="netlab-btn-open"
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.82rem',
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)',
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                      title="Review Berkas Slide Presentasi PDF (Tanpa Mengunduh)"
                    >
                      <IconPdf size={14} />
                      <span>Review Slide PDF ({selectedInovasi.pdfSize})</span>
                    </button>
                  )}
                  {selectedInovasi.jsonUrl && (
                    <>
                      <a
                        href={selectedInovasi.jsonUrl}
                        download={selectedInovasi.jsonFileName}
                        className="netlab-btn-download"
                        style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                      >
                        <IconDownload size={14} />
                        <span>Unduh JSON ({selectedInovasi.jsonSize || '41 KB'})</span>
                      </a>
                      <a
                        href={selectedInovasi.netlabUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="netlab-btn-open"
                        style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                      >
                        <IconExternal size={14} />
                        <span>Buka NetLab Simulator</span>
                      </a>
                    </>
                  )}
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Karya Inovasi Seminar PPG Informatika • Universitas Negeri Yogyakarta
                  </span>
                </div>

                <button
                  onClick={() => setSelectedInovasi(null)}
                  style={{
                    padding: '9px 22px',
                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit'
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Standalone Fullscreen PDF Review Modal */}
      <PdfReviewModal
        isOpen={!!activeReviewPdf}
        onClose={() => setActiveReviewPdf(null)}
        pdfUrl={activeReviewPdf?.pdfUrl}
        title={activeReviewPdf?.title}
        fileName={activeReviewPdf?.fileName}
        fileSize={activeReviewPdf?.fileSize}
      />
    </section>
  )
}

export default Seminar
