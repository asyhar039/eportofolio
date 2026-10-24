import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Seminar.css'
import { seminarWorksheets, karyaInovasiList, modulAjarData, slidePresentasiData } from '../data/seminarData'
import PdfReviewModal, { PdfCanvasViewer, IconGoogleDrive } from './PdfReviewModal'
import { OFFICIAL_GDRIVE_DOCS } from '../utils/gdriveHelper'

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

const IconBook = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
  </svg>
)

const IconSlides = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <polygon points="10 7 15 10 10 13 10 7" fill="currentColor" stroke="none" />
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
  const [activeTab, setActiveTab] = useState('lembar-kerja') // 'lembar-kerja' | 'karya-inovasi' | 'modul-ajar' | 'slide-presentasi'
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

  // Modul Ajar & Slide Presentasi dedicated state
  const [inovasiSection, setInovasiSection] = useState('semua') // 'semua' | 'simulator' | 'modul-ajar' | 'slide-presentasi'
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [activeModulSection, setActiveModulSection] = useState('overview')
  const [revealedQuizAnswers, setRevealedQuizAnswers] = useState({})
  const [showModulPdfEmbed, setShowModulPdfEmbed] = useState(false)
  const [showSlidePdfEmbed, setShowSlidePdfEmbed] = useState(false)

  const toggleAnswer = (idx) => {
    setRevealedQuizAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  const openGdriveReview = (key, url, title, fileName, pdfUrl) => {
    const effectiveUrl = url || (key && OFFICIAL_GDRIVE_DOCS[key]?.previewUrl) || ''
    setActiveReviewPdf({
      key,
      gdriveUrl: effectiveUrl,
      title: title || 'Dokumen Resmi',
      fileName: fileName || 'dokumen.pdf',
      pdfUrl: pdfUrl || ''
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
    } else if (selectedLk.lk4Sections) {
      const lk4 = selectedLk.lk4Sections
      textToCopy += `=== IDENTITAS KARYA INOVATIF ===\nJudul: ${lk4.identitas.judulKarya}\nSasaran: ${lk4.identitas.targetFase} (${lk4.identitas.elemen})\nAlokasi Waktu: ${lk4.identitas.alokasiWaktu}\n\n`
      textToCopy += `=== GAGASAN & RISET INOVASI ===\n${lk4.gagasanInovasi.latarBelakang}\n\nSolusi: ${lk4.gagasanInovasi.gagasanSolutif}\n\n`
      textToCopy += `=== SKENARIO KASUS MINIMARKET BERKAH ===\n${lk4.skenarioKasus.narasi}\n\n`
      textToCopy += `=== 5 SINTAKS PROBLEM-BASED LEARNING (PBL) ===\n`
      lk4.sintaksPBL.forEach((s) => {
        textToCopy += `${s.sintaks} (${s.alokasi}):\n- Guru: ${s.aktivitasGuru}\n- Siswa: ${s.aktivitasSiswa}\n- Peran Teknologi: ${s.peranTeknologi}\n\n`
      })
      textToCopy += `=== EVALUASI 3K ===\nKebaruan: ${lk4.evaluasiInovasi.kebaruan.poin.join('; ')}\nKreativitas: ${lk4.evaluasiInovasi.kreativitas.poin.join('; ')}\nKebermanfaatan: ${lk4.evaluasiInovasi.kebermanfaatan.poin.join('; ')}\n\n`
      textToCopy += `=== DAFTAR PUSTAKA ===\n`
      lk4.daftarPustaka.forEach((dp) => {
        textToCopy += `- ${dp.sitasi}\n`
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
          Ruang diseminasi refleksi diri berbasis bukti data (evidence-based reflection), kurasi artefak pembelajaran unggulan, seluruh dokumen lembar kerja seminar resmi (LK 1, LK 2 Semester I & II, LK 3, LK 4 Desain Inovasi), Modul Ajar Praktik JKI Fase E, serta Slide Presentasi Karya Inovasi yang siap diadvokasikan ke dalam ekosistem persekolahan.
        </p>

        <div className="seminar-stats-row">
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">5 Dokumen</span>
            <span className="seminar-stat-lbl">Lembar Kerja Resmi (LK 1, LK 2, LK 3, LK 4)</span>
          </div>
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">Dokumen PDF</span>
            <span className="seminar-stat-lbl">Pratinjau Langsung Seluruh LK & Slide</span>
          </div>
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">Karya Inovasi</span>
            <span className="seminar-stat-lbl">Simulasi Topologi Jaringan NetLab & JSON</span>
          </div>
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">Modul Ajar</span>
            <span className="seminar-stat-lbl">2 JP (90 Mnt) 5 Sintaks PBL & 5 Soal PG</span>
          </div>
          <div className="seminar-stat-card">
            <span className="seminar-stat-val">13 Slide</span>
            <span className="seminar-stat-lbl">Dek Presentasi Seminar Lengkap</span>
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
          <IconDoc size={19} />
          <span>Lembar Kerja (LK)</span>
          <span className="tab-count-badge">5 Dokumen</span>
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
          <IconRouter size={19} />
          <span>Karya Inovasi (NetLab)</span>
          <span className="tab-count-badge">Simulator Topologi</span>
        </button>

        <button
          className={`seminar-tab-btn ${activeTab === 'modul-ajar' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('modul-ajar')
            setSearchQuery('')
          }}
          role="tab"
          aria-selected={activeTab === 'modul-ajar'}
        >
          <IconBook size={19} />
          <span>Modul Ajar Praktik</span>
          <span className="tab-count-badge">Fase E JKI (2 JP)</span>
        </button>

        <button
          className={`seminar-tab-btn ${activeTab === 'slide-presentasi' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('slide-presentasi')
            setSearchQuery('')
          }}
          role="tab"
          aria-selected={activeTab === 'slide-presentasi'}
        >
          <IconSlides size={19} />
          <span>Slide Presentasi</span>
          <span className="tab-count-badge">13 Slide Dek</span>
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
            {filteredWorksheets.map((lk) => {
              return (
                <article key={lk.id} className="lk-card">
                  <div className="lk-card-top">
                    <span className="lk-badge-num">{lk.number}</span>
                    <button
                      type="button"
                      onClick={() => openGdriveReview(lk.id, lk.gdriveUrl, lk.title, lk.pdfFileName, lk.pdfUrl)}
                      className="lk-pdf-tag"
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        fontFamily: 'inherit',
                        background: 'rgba(56, 189, 248, 0.16)',
                        color: '#38bdf8'
                      }}
                      title="Pratinjau Dokumen Google Drive"
                    >
                      <IconGoogleDrive size={14} />
                      <span>Pratinjau Drive</span>
                    </button>
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

                    <button
                      type="button"
                      onClick={() => openGdriveReview(lk.id, lk.gdriveUrl, lk.title, lk.pdfFileName, lk.pdfUrl)}
                      className="lk-btn-pdf"
                      title="Pratinjau Dokumen Google Drive"
                      style={{
                        cursor: 'pointer',
                        border: 'none',
                        background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                        color: '#ffffff'
                      }}
                    >
                      <IconGoogleDrive size={16} />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 2: KARYA INOVASI (Full-Width Showcase) */}
      {activeTab === 'karya-inovasi' && (() => {
        const item = karyaInovasiList[0]
        if (!item) return null

        return (
          <div className="inovasi-showcase-container" style={{ width: '100%' }}>
            <article className="inovasi-showcase-card">
              {/* Header Showcase */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="inovasi-tag" style={{ fontSize: '0.82rem', padding: '5px 14px' }}>
                      {item.tag}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#7dd3fc', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '4px 12px', borderRadius: '8px', fontWeight: '700' }}>
                      {item.category} • {item.year}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#34d399', background: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '4px 12px', borderRadius: '8px', fontWeight: '700' }}>
                    ● {item.status}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff', margin: '0 0 10px', lineHeight: '1.3' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: '1.05rem', color: '#38bdf8', fontWeight: '600', margin: '0 0 16px', lineHeight: '1.5' }}>
                  {item.subtitle}
                </p>
                <p style={{ fontSize: '0.94rem', color: 'rgba(255, 255, 255, 0.84)', lineHeight: '1.7', margin: '0 0 22px' }}>
                  {item.summary}
                </p>

                {/* Author & Tech Info Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', marginBottom: '3px' }}>Pengembang</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{item.collaborators}</strong>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', marginBottom: '3px' }}>Instansi / LPTK</span>
                    <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>{item.institution}</strong>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', marginBottom: '3px' }}>Platform Simulator</span>
                    <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>NetLab Interactive Simulator</strong>
                  </div>
                </div>

                {/* Tech chips */}
                <div className="inovasi-tech-chips" style={{ margin: 0 }}>
                  {item.techStack?.map((tech, idx) => (
                    <span key={idx} className="inovasi-chip">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Hub (Prominent) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '18px 22px', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '18px' }}>
                {item.jsonUrl && (
                  <a
                    href={item.jsonUrl}
                    download={item.jsonFileName}
                    className="netlab-btn-download"
                    title="Unduh Berkas produk-karya-inovasi.json"
                  >
                    <IconDownload size={16} />
                    <span>Unduh File JSON ({item.jsonSize || '41 KB'})</span>
                  </a>
                )}
                {item.netlabUrl && (
                  <a
                    href={item.netlabUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="netlab-btn-open"
                    title="Buka Website Simulator NetLab"
                  >
                    <IconExternal size={16} />
                    <span>Buka Simulator NetLab</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => openGdriveReview('karya-slide', item.gdriveUrl, item.pdfTitle || item.title, item.pdfFileName, item.pdfUrl)}
                  className="netlab-btn-open"
                  style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                  title="Pratinjau Slide Presentasi di Google Drive"
                >
                  <IconGoogleDrive size={16} />
                  <span>Pratinjau Slide Drive</span>
                </button>
                <button
                  type="button"
                  onClick={() => openGdriveReview('karya-modul', item.modulAjarGdriveUrl, item.modulAjarTitle, item.modulAjarFileName, item.modulAjarPdfUrl)}
                  className="netlab-btn-open"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                  title="Pratinjau Modul Ajar di Google Drive"
                >
                  <IconGoogleDrive size={16} />
                  <span>Pratinjau Modul Drive</span>
                </button>
              </div>

              {/* Metrics Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                {item.impactMetrics?.map((m, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(13, 148, 136, 0.14))', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '18px', borderRadius: '16px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399', display: 'block' }}>{m.value}</span>
                    <span style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '4px', display: 'block' }}>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* In-Page Presentation Slide Deck Viewer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconGoogleDrive size={20} />
                      Slide Presentasi Karya Inovasi Pembelajaran
                    </h3>
                    <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      Pratinjau langsung slide presentasi resmi seminar (13 Slide) via Google Drive
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => openGdriveReview('karya-slide', item.gdriveUrl, item.pdfTitle || item.title, item.pdfFileName, item.pdfUrl)}
                      style={{
                        background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '7px 14px',
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
                      <IconExternal size={14} />
                      <span>Buka Layar Penuh</span>
                    </button>
                  </div>
                </div>

                <PdfCanvasViewer
                  gdriveUrl={item.gdriveUrl}
                  pdfUrl={item.pdfUrl}
                  title={item.pdfTitle || item.title}
                  fileName={item.pdfFileName}
                  height="580px"
                  onExpandFullscreen={() => openGdriveReview('karya-slide', item.gdriveUrl, item.pdfTitle || item.title, item.pdfFileName, item.pdfUrl)}
                />
              </div>

              {/* NetLab Simulator Interactive Guide */}
              {item.jsonUrl && (
                <div className="netlab-guide-banner" style={{ margin: 0 }}>
                  <div className="netlab-banner-head">
                    <div className="netlab-banner-title">
                      <div className="netlab-icon-circle">
                        <IconRouter size={24} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff', fontWeight: '800' }}>
                          Panduan Simulasi Topologi Jaringan di NetLab
                        </h3>
                        <p style={{ margin: '4px 0 0', fontSize: '0.84rem', color: '#7dd3fc', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                          Platform Simulator: <strong style={{ wordBreak: 'break-all' }}>https://netlab.thecybersecguru.com</strong> • Berkas: <strong>{item.jsonFileName}</strong> ({item.jsonSize})
                        </p>
                      </div>
                    </div>

                    <div className="netlab-banner-actions">
                      <a
                        href={item.jsonUrl}
                        download={item.jsonFileName}
                        className="netlab-btn-download"
                        title="Unduh Berkas produk-karya-inovasi.json"
                      >
                        <IconDownload size={15} />
                        <span>Unduh File JSON</span>
                      </a>

                      <a
                        href={item.netlabUrl}
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
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '700' }}>
                      Langkah demi Langkah Menjalankan Simulasi:
                    </span>
                  </div>

                  <div className="netlab-steps-grid">
                    {item.howToTest?.map((st) => (
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

              {/* Topology Schematic Diagram */}
              {item.devices && (
                <div className="topology-schematic-wrap">
                  <div className="topology-schematic-head">
                    <div>
                      <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.1rem', fontWeight: '800' }}>
                        Arsitektur & Skema Topologi Jaringan Minimarket Berkah
                      </h4>
                      <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.72)' }}>
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
                      {item.devices?.slice(1).map((dev, idx) => (
                        <div key={idx} className="topology-endpoint-card">
                          <span className="topology-endpoint-badge" title="Status Online"></span>
                          <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '2px' }}>
                            {dev.model}
                          </div>
                          <h5 style={{ margin: '0 0 6px 0', color: '#ffffff', fontSize: '1rem', fontWeight: '700' }}>
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

              {/* Device Table */}
              {item.devices && (
                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '700' }}>
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
                        {item.devices.map((d, idx) => (
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

              {/* JSON Code Inspector */}
              {item.jsonUrl && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>
                      Berkas Konfigurasi JSON NetLab
                    </h4>
                    <button
                      type="button"
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
                          type="button"
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '20px', borderRadius: '16px' }}>
                  <strong style={{ color: '#fda4af', display: 'block', marginBottom: '8px', fontSize: '1rem' }}>Latar Belakang Permasalahan</strong>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: '1.65' }}>{item.problem}</p>
                </div>
                <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '20px', borderRadius: '16px' }}>
                  <strong style={{ color: '#7dd3fc', display: 'block', marginBottom: '8px', fontSize: '1rem' }}>Solusi Inovasi yang Dihasilkan</strong>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: '1.65' }}>{item.solution}</p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 style={{ color: '#ffffff', marginBottom: '14px', fontSize: '1.1rem', fontWeight: '700' }}>Fitur & Keunggulan Utama Inovasi</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {item.keyFeatures?.map((f, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                      <span style={{ color: '#34d399', marginTop: '2px' }}><IconCheck size={16} /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evidence Links */}
              {item.evidenceLinks && (
                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '14px', fontSize: '1.1rem', fontWeight: '700' }}>Tautan Bukti & Dokumen Pendukung</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {item.evidenceLinks.map((ev, idx) => {
                      if (ev.gdriveKey === 'slide') {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => openGdriveReview('karya-slide', item.gdriveUrl, item.pdfTitle || item.title, item.pdfFileName)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: 'rgba(56, 189, 248, 0.12)',
                              border: '1px solid rgba(56, 189, 248, 0.35)',
                              padding: '10px 18px',
                              borderRadius: '12px',
                              fontSize: '0.85rem',
                              color: '#ffffff',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              fontFamily: 'inherit'
                            }}
                            className="evidence-link-pill"
                            title="Pratinjau Slide Presentasi di Google Drive"
                          >
                            <IconGoogleDrive size={16} />
                            <strong style={{ color: '#7dd3fc' }}>{ev.label}</strong>
                          </button>
                        )
                      }
                      if (ev.gdriveKey === 'modul') {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => openGdriveReview('karya-modul', item.modulAjarGdriveUrl, item.modulAjarTitle, item.modulAjarFileName)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: 'rgba(99, 102, 241, 0.12)',
                              border: '1px solid rgba(99, 102, 241, 0.35)',
                              padding: '10px 18px',
                              borderRadius: '12px',
                              fontSize: '0.85rem',
                              color: '#ffffff',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              fontFamily: 'inherit'
                            }}
                            className="evidence-link-pill"
                            title="Pratinjau Modul Ajar di Google Drive"
                          >
                            <IconGoogleDrive size={16} />
                            <strong style={{ color: '#a5b4fc' }}>{ev.label}</strong>
                          </button>
                        )
                      }
                      if (ev.url) {
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
                              padding: '10px 18px',
                              borderRadius: '12px',
                              fontSize: '0.85rem',
                              color: '#ffffff',
                              textDecoration: 'none',
                              transition: 'all 0.2s ease'
                            }}
                            className="evidence-link-pill"
                          >
                            {ev.download ? (
                              <IconDownload size={15} style={{ color: 'var(--accent-cyan)' }} />
                            ) : (
                              <IconExternal size={15} style={{ color: 'var(--accent-cyan)' }} />
                            )}
                            <strong style={{ color: 'var(--accent-cyan)' }}>{ev.label}</strong>
                          </a>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              )}
            </article>
          </div>
        )
      })()}

      {/* TAB 3: MODUL AJAR PRAKTIK INFORMATIKA (FASE E JKI) */}
      {activeTab === 'modul-ajar' && (() => {
        const toggleAnswer = (idx) => {
          setRevealedQuizAnswers((prev) => ({
            ...prev,
            [idx]: !prev[idx]
          }))
        }

        return (
          <div className="inovasi-showcase-container" style={{ width: '100%' }}>
            <article className="inovasi-showcase-card">
              {/* Header Modul Ajar */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="inovasi-tag" style={{ fontSize: '0.82rem', padding: '5px 14px' }}>
                      PERANGKAT AJAR INFORMATIKA
                    </span>
                    <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                      Fase E · Kelas X SMA/SMK
                    </span>
                    <span style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                      2 JP (90 Menit) PBL
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openGdriveReview(modulAjarData.id, modulAjarData.gdriveUrl, modulAjarData.title, modulAjarData.pdfFileName, modulAjarData.pdfUrl)}
                    className="lk-pdf-tag"
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      fontFamily: 'inherit',
                      background: 'rgba(56, 189, 248, 0.18)',
                      color: '#38bdf8'
                    }}
                    title="Buka Dokumen Modul Ajar di Google Drive"
                  >
                    <IconGoogleDrive size={15} />
                    <span>Pratinjau Drive</span>
                  </button>
                </div>

                <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#ffffff', margin: '0 0 10px', lineHeight: '1.3' }}>
                  {modulAjarData.title}
                </h2>
                <p style={{ fontSize: '1.02rem', color: 'var(--accent-cyan)', margin: '0 0 16px', fontWeight: '600', lineHeight: '1.5' }}>
                  {modulAjarData.subtitle}
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.94rem', lineHeight: '1.7', margin: '0 0 22px' }}>
                  {modulAjarData.summary}
                </p>

                {/* Meta details bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '22px' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)', display: 'block', textTransform: 'uppercase', marginBottom: '3px' }}>Penyusun</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.92rem' }}>{modulAjarData.informasiUmum.penyusun}</strong>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)', display: 'block', textTransform: 'uppercase', marginBottom: '3px' }}>NIM Calon Guru</span>
                    <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.92rem', fontFamily: 'Geist Mono, monospace' }}>{modulAjarData.informasiUmum.nim}</strong>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)', display: 'block', textTransform: 'uppercase', marginBottom: '3px' }}>Elemen & Model</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.92rem' }}>JKI · Problem Based Learning (PBL)</strong>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)', display: 'block', textTransform: 'uppercase', marginBottom: '3px' }}>Media Pembelajaran</span>
                    <strong style={{ color: '#38bdf8', fontSize: '0.92rem' }}>Web Simulator NetLab (JSON)</strong>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => openGdriveReview(modulAjarData.id, modulAjarData.gdriveUrl, modulAjarData.title, modulAjarData.pdfFileName, modulAjarData.pdfUrl)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 22px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    <IconGoogleDrive size={18} />
                    <span>Pratinjau Modul Google Drive</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModulPdfEmbed(!showModulPdfEmbed)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      color: '#ffffff',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    <IconEye size={16} />
                    <span>{showModulPdfEmbed ? 'Tutup Pratinjau Dokumen' : 'Pratinjau Dokumen di Layar'}</span>
                  </button>

                  <a
                    href="https://netlab.thecybersecguru.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: 'var(--accent-cyan)',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}
                  >
                    <IconExternal size={15} />
                    <span>Buka Web NetLab</span>
                  </a>

                  <a
                    href="/assets/seminar/produk-karya-inovasi.json"
                    download="produk-karya-inovasi.json"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#34d399',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}
                  >
                    <IconDownload size={15} />
                    <span>Unduh Berkas JSON</span>
                  </a>
                </div>
              </div>

              {/* Embedded PDF Canvas Viewer */}
              {showModulPdfEmbed && (
                <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                  <PdfCanvasViewer
                    gdriveUrl={modulAjarData.gdriveUrl}
                    pdfUrl={modulAjarData.pdfUrl}
                    title={modulAjarData.title}
                    fileName={modulAjarData.pdfFileName}
                    height="600px"
                    onExpandFullscreen={() => openGdriveReview(modulAjarData.id, modulAjarData.gdriveUrl, modulAjarData.title, modulAjarData.pdfFileName, modulAjarData.pdfUrl)}
                  />
                </div>
              )}

              {/* Sub-Tabs Selector for Modul Ajar */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '24px 0 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {[
                  { id: 'overview', label: '1. Informasi Umum & TP' },
                  { id: 'scenario', label: '2. Skenario 5 Sintaks PBL' },
                  { id: 'rubrics', label: '3. Rubrik Sikap & Keterampilan' },
                  { id: 'quiz', label: '4. Soal Pilihan Ganda (HOTS)' },
                  { id: 'lkpd', label: '5. Lampiran LKPD Digital' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveModulSection(st.id)}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '10px',
                      border: '1px solid',
                      borderColor: activeModulSection === st.id ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.15)',
                      background: activeModulSection === st.id ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.06)',
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* SUB-SECTION 1: Informasi Umum & TP */}
              {activeModulSection === 'overview' && (
                <div style={{ paddingTop: '24px' }}>
                  {/* Capaian Pembelajaran */}
                  <div style={{ marginBottom: '22px', borderLeft: '4px solid var(--accent-cyan)', background: 'rgba(0, 217, 255, 0.06)', borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                    <h4 style={{ color: 'var(--accent-cyan)', margin: '0 0 6px', fontSize: '1.02rem', fontWeight: '800' }}>Capaian Pembelajaran (CP) Elemen JKI</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.7', margin: 0, fontSize: '0.92rem' }}>
                      {modulAjarData.komponenInti.capaianPembelajaran}
                    </p>
                  </div>

                  {/* Tujuan Pembelajaran */}
                  <h4 style={{ color: '#ffffff', fontSize: '1.08rem', margin: '0 0 14px', fontWeight: '700' }}>Tujuan Pembelajaran (TP) & Taksonomi Bloom</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
                    {modulAjarData.komponenInti.tujuanPembelajaran.map((tp, idx) => (
                      <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: 'var(--accent-cyan)', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800', whiteSpace: 'nowrap' }}>
                          {tp.kode} · {tp.taksonomi}
                        </span>
                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.92rem', lineHeight: '1.6' }}>{tp.deskripsi}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pemahaman Bermakna & Pertanyaan Pemantik */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '26px' }}>
                    <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.35)', borderRadius: '16px', padding: '20px' }}>
                      <span style={{ color: '#c084fc', fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Pemahaman Bermakna</span>
                      <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.92rem', lineHeight: '1.65', margin: '10px 0 0' }}>
                        {modulAjarData.komponenInti.pemahamanBermakna}
                      </p>
                    </div>

                    <div style={{ background: 'rgba(251, 146, 60, 0.08)', border: '1px solid rgba(251, 146, 60, 0.35)', borderRadius: '16px', padding: '20px' }}>
                      <span style={{ color: '#fbbf24', fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.6px', textTransform: 'uppercase' }}>Pertanyaan Pemantik Kontekstual</span>
                      <p style={{ color: '#fed7aa', fontSize: '0.92rem', lineHeight: '1.65', margin: '10px 0 0', fontStyle: 'italic' }}>
                        "{modulAjarData.komponenInti.pertanyaanPemantik}"
                      </p>
                    </div>
                  </div>

                  {/* Profil Pelajar Pancasila & Sarana */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '20px' }}>
                      <h4 style={{ color: '#ffffff', margin: '0 0 12px', fontSize: '0.98rem', fontWeight: '700' }}>Dimensi Profil Pelajar Pancasila:</h4>
                      <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem', lineHeight: '1.7' }}>
                        {modulAjarData.informasiUmum.profilPelajarPancasila.map((pp, idx) => (
                          <li key={idx} style={{ marginBottom: '8px' }}>
                            <strong style={{ color: 'var(--accent-cyan)' }}>{pp.dimensi}:</strong> {pp.indikator}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '20px' }}>
                      <h4 style={{ color: '#ffffff', margin: '0 0 12px', fontSize: '0.98rem', fontWeight: '700' }}>Sarana & Prasarana Praktikum:</h4>
                      <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem', lineHeight: '1.7' }}>
                        {modulAjarData.informasiUmum.saranaPrasarana.map((sp, idx) => (
                          <li key={idx} style={{ marginBottom: '6px' }}>{sp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-SECTION 2: Skenario 5 Sintaks PBL */}
              {activeModulSection === 'scenario' && (
                <div style={{ paddingTop: '24px' }}>
                  {/* Pendahuluan */}
                  <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ color: '#38bdf8', margin: 0, fontSize: '1.05rem', fontWeight: '800' }}>I. Kegiatan Pendahuluan</h4>
                      <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '3px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                        {modulAjarData.kegiatanPembelajaran.pendahuluan.durasi}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {modulAjarData.kegiatanPembelajaran.pendahuluan.langkah.map((l, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                          <span style={{ color: 'var(--accent-cyan)', fontWeight: '700', minWidth: '60px' }}>{l.waktu}</span>
                          <span>{l.kegiatan}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inti (5 Sintaks PBL) */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1.08rem', fontWeight: '800' }}>II. Kegiatan Inti — 5 Sintaks Problem-Based Learning</h4>
                      <span style={{ background: 'rgba(0, 217, 255, 0.2)', color: 'var(--accent-cyan)', padding: '3px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                        {modulAjarData.kegiatanPembelajaran.inti.durasi}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {modulAjarData.kegiatanPembelajaran.inti.sintaksPBL.map((syn, idx) => (
                        <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px', padding: '18px 22px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                            <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.98rem' }}>{syn.sintaks}</strong>
                            <span style={{ background: 'rgba(0, 217, 255, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 217, 255, 0.3)', padding: '3px 10px', borderRadius: '6px', fontSize: '0.76rem', fontWeight: '700' }}>
                              {syn.alokasi}
                            </span>
                          </div>
                          <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                            {syn.aktivitas}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Penutup */}
                  <div style={{ background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ color: '#34d399', margin: 0, fontSize: '1.05rem', fontWeight: '800' }}>III. Kegiatan Penutup</h4>
                      <span style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '3px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                        {modulAjarData.kegiatanPembelajaran.penutup.durasi}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {modulAjarData.kegiatanPembelajaran.penutup.langkah.map((l, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                          <span style={{ color: '#34d399', fontWeight: '700', minWidth: '60px' }}>{l.waktu}</span>
                          <span>{l.kegiatan}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-SECTION 3: Rubrik Asesmen */}
              {activeModulSection === 'rubrics' && (
                <div style={{ paddingTop: '24px' }}>
                  {/* Rubrik Sikap Profil Pelajar Pancasila */}
                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{ color: '#ffffff', fontSize: '1.1rem', margin: '0 0 14px', fontWeight: '800' }}>
                      A. {modulAjarData.asesmenPembelajaran.formatifSikap.judul}
                    </h4>
                    <div style={{ overflowX: 'auto', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                        <thead>
                          <tr style={{ background: 'rgba(29, 111, 165, 0.4)', color: '#ffffff' }}>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '22%' }}>Dimensi Sikap</th>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '20%' }}>Skor 4 (Sangat Baik)</th>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '20%' }}>Skor 3 (Baik)</th>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '20%' }}>Skor 2 (Cukup)</th>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '18%' }}>Skor 1 (Perlu Bimbingan)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modulAjarData.asesmenPembelajaran.formatifSikap.kriteria.map((k, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                              <td style={{ padding: '14px', fontWeight: '700', color: 'var(--accent-cyan)' }}>{k.dimensi}</td>
                              <td style={{ padding: '14px', color: '#a7f3d0' }}>{k.skor4}</td>
                              <td style={{ padding: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>{k.skor3}</td>
                              <td style={{ padding: '14px', color: '#fed7aa' }}>{k.skor2}</td>
                              <td style={{ padding: '14px', color: '#fca5a5' }}>{k.skor1}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Rubrik Keterampilan Praktik NetLab */}
                  <div>
                    <h4 style={{ color: '#ffffff', fontSize: '1.1rem', margin: '0 0 14px', fontWeight: '800' }}>
                      B. {modulAjarData.asesmenPembelajaran.formatifKeterampilan.judul}
                    </h4>
                    <div style={{ overflowX: 'auto', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                        <thead>
                          <tr style={{ background: 'rgba(29, 111, 165, 0.4)', color: '#ffffff' }}>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '22%' }}>Aspek Kinerja</th>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '20%' }}>Skor 4 (Mahir)</th>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '20%' }}>Skor 3 (Cakap)</th>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '20%' }}>Skor 2 (Layak)</th>
                            <th style={{ padding: '12px 14px', textAlign: 'left', width: '18%' }}>Skor 1 (Baru Mulai)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modulAjarData.asesmenPembelajaran.formatifKeterampilan.kriteria.map((k, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                              <td style={{ padding: '14px', fontWeight: '700', color: 'var(--accent-cyan)' }}>{k.aspek}</td>
                              <td style={{ padding: '14px', color: '#a7f3d0' }}>{k.skor4}</td>
                              <td style={{ padding: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>{k.skor3}</td>
                              <td style={{ padding: '14px', color: '#fed7aa' }}>{k.skor2}</td>
                              <td style={{ padding: '14px', color: '#fca5a5' }}>{k.skor1}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-SECTION 4: Soal Pilihan Ganda Interaktif */}
              {activeModulSection === 'quiz' && (
                <div style={{ paddingTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '1.15rem', margin: 0, fontWeight: '800' }}>
                        {modulAjarData.asesmenPembelajaran.sumatifPengetahuan.judul}
                      </h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                        5 Butir Soal Pengujian Pengetahuan JKI Berbobot HOTS (Kunci: C, C, B, B, B)
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const allOpen = {}
                        modulAjarData.asesmenPembelajaran.sumatifPengetahuan.soalList.forEach((_, idx) => {
                          allOpen[idx] = true
                        })
                        setRevealedQuizAnswers(allOpen)
                      }}
                      style={{
                        padding: '6px 14px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      Buka Semua Kunci & Pembahasan
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {modulAjarData.asesmenPembelajaran.sumatifPengetahuan.soalList.map((q, idx) => {
                      const isRevealed = !!revealedQuizAnswers[idx]
                      return (
                        <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px', padding: '20px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                            <span style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', color: '#ffffff', minWidth: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.88rem' }}>
                              {q.nomor}
                            </span>
                            <p style={{ margin: 0, color: '#ffffff', fontSize: '0.94rem', lineHeight: '1.65', fontWeight: '600' }}>
                              {q.soal}
                            </p>
                          </div>

                          {/* Pilihan Jawaban */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '44px', marginBottom: '14px' }}>
                            {q.pilihan.map((opt, oIdx) => {
                              const isKey = opt.startsWith(q.kunci)
                              return (
                                <div
                                  key={oIdx}
                                  style={{
                                    background: isRevealed && isKey ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                                    border: isRevealed && isKey ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '10px',
                                    padding: '10px 14px',
                                    fontSize: '0.88rem',
                                    color: isRevealed && isKey ? '#a7f3d0' : 'rgba(255, 255, 255, 0.85)',
                                    fontWeight: isRevealed && isKey ? '700' : '400'
                                  }}
                                >
                                  {opt}
                                </div>
                              )
                            })}
                          </div>

                          {/* Tombol Kunci & Pembahasan */}
                          <div style={{ paddingLeft: '44px' }}>
                            <button
                              type="button"
                              onClick={() => toggleAnswer(idx)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: isRevealed ? '#fbbf24' : 'var(--accent-cyan)',
                                cursor: 'pointer',
                                fontSize: '0.84rem',
                                fontWeight: '700',
                                padding: 0,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontFamily: 'inherit'
                              }}
                            >
                              <span>{isRevealed ? '▲ Sembunyikan Kunci & Pembahasan' : '▼ Lihat Kunci Jawaban & Pembahasan Ilmiah'}</span>
                            </button>

                            {isRevealed && (
                              <div style={{ marginTop: '12px', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '12px', padding: '14px 18px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                  <span style={{ background: '#34d399', color: '#0f172a', fontWeight: '900', padding: '2px 8px', borderRadius: '6px', fontSize: '0.78rem' }}>
                                    Kunci: {q.kunci}
                                  </span>
                                  <strong style={{ color: '#34d399', fontSize: '0.86rem' }}>Pembahasan Ilmiah:</strong>
                                </div>
                                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                                  {q.pembahasan}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* SUB-SECTION 5: Lampiran LKPD Digital */}
              {activeModulSection === 'lkpd' && (
                <div style={{ paddingTop: '24px' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(0, 217, 255, 0.3)', borderRadius: '16px', padding: '22px', marginBottom: '22px' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.5px' }}>LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL</span>
                    <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '8px 0 12px' }}>{modulAjarData.lampiranLKPD.judul}</h3>

                    <h4 style={{ color: '#ffffff', fontSize: '0.94rem', margin: '14px 0 8px', fontWeight: '700' }}>Petunjuk Pengerjaan Praktik:</h4>
                    <ol style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem', lineHeight: '1.7' }}>
                      {modulAjarData.lampiranLKPD.petunjukPengerjaan.map((pt, idx) => (
                        <li key={idx} style={{ marginBottom: '6px' }}>{pt}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Tabel Investigasi */}
                  <h4 style={{ color: '#ffffff', fontSize: '1.05rem', margin: '0 0 12px', fontWeight: '700' }}>Tabel Investigasi Pengalamatan & Troubleshooting Node:</h4>
                  <div style={{ overflowX: 'auto', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px', marginBottom: '24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                      <thead>
                        <tr style={{ background: 'rgba(29, 111, 165, 0.4)', color: '#ffffff' }}>
                          <th style={{ padding: '12px 14px', textAlign: 'left' }}>Perangkat Node</th>
                          <th style={{ padding: '12px 14px', textAlign: 'left' }}>Target IP & Subnet</th>
                          <th style={{ padding: '12px 14px', textAlign: 'left' }}>Status Pengujian</th>
                          <th style={{ padding: '12px 14px', textAlign: 'left' }}>Catatan Analisis Siswa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modulAjarData.lampiranLKPD.tabelInvestigasi.map((t, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <td style={{ padding: '12px 14px', fontWeight: '700', color: 'var(--accent-cyan)' }}>{t.perangkat}</td>
                            <td style={{ padding: '12px 14px', fontFamily: 'Geist Mono, monospace', color: '#fef08a' }}>
                              {t.ipTarget}<br />
                              <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)' }}>{t.netmask}</span>
                            </td>
                            <td style={{ padding: '12px 14px', color: '#ffffff' }}>{t.statusUji}</td>
                            <td style={{ padding: '12px 14px', color: 'rgba(255, 255, 255, 0.85)' }}>{t.catatan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pertanyaan Refleksi */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px', padding: '20px' }}>
                    <h4 style={{ color: '#ffffff', margin: '0 0 12px', fontSize: '0.98rem', fontWeight: '700' }}>Pertanyaan Refleksi & Pemecahan Masalah Siswa:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      {modulAjarData.lampiranLKPD.pertanyaanRefleksiSiswa.map((rf, idx) => (
                        <div key={idx} style={{ padding: '8px 12px', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
                          {rf}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          </div>
        )
      })()}

      {/* TAB 4: SLIDE PRESENTASI (13 SLIDE LENGKAP) */}
      {activeTab === 'slide-presentasi' && (() => {
        const currentSlide = slidePresentasiData.slides[currentSlideIndex] || slidePresentasiData.slides[0]

        return (
          <div className="inovasi-showcase-container" style={{ width: '100%' }}>
            <article className="inovasi-showcase-card">
              {/* Header Slide Presentasi */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="inovasi-tag" style={{ fontSize: '0.82rem', padding: '5px 14px' }}>
                      DEK PRESENTASI SEMINAR
                    </span>
                    <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                      13 Slide Komprehensif
                    </span>
                    <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                      PPG Informatika UNY
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openGdriveReview(slidePresentasiData.id, slidePresentasiData.gdriveUrl, slidePresentasiData.title, slidePresentasiData.pdfFileName, slidePresentasiData.pdfUrl)}
                    className="lk-pdf-tag"
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      fontFamily: 'inherit',
                      background: 'rgba(56, 189, 248, 0.18)',
                      color: '#38bdf8'
                    }}
                    title="Buka Slide Presentasi di Google Drive"
                  >
                    <IconGoogleDrive size={15} />
                    <span>Pratinjau Drive</span>
                  </button>
                </div>

                <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#ffffff', margin: '0 0 10px', lineHeight: '1.3' }}>
                  {slidePresentasiData.title}
                </h2>
                <p style={{ fontSize: '1.02rem', color: 'var(--accent-cyan)', margin: '0 0 14px', fontWeight: '600', lineHeight: '1.5' }}>
                  {slidePresentasiData.subtitle}
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.94rem', lineHeight: '1.7', margin: '0 0 20px' }}>
                  {slidePresentasiData.summary}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => openGdriveReview(slidePresentasiData.id, slidePresentasiData.gdriveUrl, slidePresentasiData.title, slidePresentasiData.pdfFileName, slidePresentasiData.pdfUrl)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 22px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    <IconGoogleDrive size={18} />
                    <span>Pratinjau Slide Google Drive</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSlidePdfEmbed(!showSlidePdfEmbed)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      color: '#ffffff',
                      borderRadius: '12px',
                      padding: '12px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    <IconEye size={16} />
                    <span>{showSlidePdfEmbed ? 'Tutup Pratinjau Slide' : 'Pratinjau Slide di Layar'}</span>
                  </button>
                </div>
              </div>

              {/* Embedded PDF Canvas Viewer for Slides */}
              {showSlidePdfEmbed && (
                <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                  <PdfCanvasViewer
                    gdriveUrl={slidePresentasiData.gdriveUrl}
                    pdfUrl={slidePresentasiData.pdfUrl}
                    title={slidePresentasiData.title}
                    fileName={slidePresentasiData.pdfFileName}
                    height="600px"
                    onExpandFullscreen={() => openGdriveReview(slidePresentasiData.id, slidePresentasiData.gdriveUrl, slidePresentasiData.title, slidePresentasiData.pdfFileName, slidePresentasiData.pdfUrl)}
                  />
                </div>
              )}

              {/* Interactive Slide Viewer Showcase */}
              <div style={{ marginTop: '28px' }}>
                {/* Slide Number Carousel / Selector */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', fontWeight: '700' }}>
                    Pilih Slide untuk Dilihat:
                  </span>
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px' }}>
                    {slidePresentasiData.slides.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: currentSlideIndex === idx ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.15)',
                          background: currentSlideIndex === idx ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))' : 'rgba(255, 255, 255, 0.06)',
                          color: '#ffffff',
                          fontWeight: '800',
                          fontSize: '0.84rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s ease'
                        }}
                        title={`Slide ${idx + 1}: ${s.title}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Slide Display Stage */}
                <div style={{ background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.85))', border: '1px solid rgba(0, 217, 255, 0.35)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)' }}>
                  {/* Slide header tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ background: 'rgba(0, 217, 255, 0.2)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 217, 255, 0.4)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800' }}>
                      SLIDE {currentSlide.slideNumber} DARI 13 · {currentSlide.category}
                    </span>

                    <span style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.82rem', fontFamily: 'Geist Mono, monospace' }}>
                      Asyhar Qowiim · NIM 25105260081
                    </span>
                  </div>

                  <h3 style={{ color: '#ffffff', fontSize: '1.45rem', margin: '0 0 6px', fontWeight: '800', lineHeight: '1.3' }}>
                    {currentSlide.title}
                  </h3>
                  {currentSlide.subtitle && (
                    <p style={{ color: 'var(--accent-cyan)', fontSize: '1rem', margin: '0 0 20px', fontWeight: '600' }}>
                      {currentSlide.subtitle}
                    </p>
                  )}

                  {/* Key Points */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '20px', marginBottom: '22px' }}>
                    <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                      Poin-Poin Utama Slide:
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '18px', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                      {currentSlide.keyPoints.map((kp, kpIdx) => (
                        <li key={kpIdx} style={{ marginBottom: '6px' }}>{kp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Narrative Pemaparan */}
                  <div style={{ marginBottom: '22px' }}>
                    <span style={{ color: '#a5b4fc', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Narasi / Penjelasan Presentasi:
                    </span>
                    <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.93rem', lineHeight: '1.7', margin: 0 }}>
                      {currentSlide.content}
                    </p>
                  </div>

                  {/* Visual Notes */}
                  {currentSlide.visualNotes && (
                    <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px dashed rgba(255, 255, 255, 0.18)', borderRadius: '12px', padding: '12px 18px', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <strong style={{ color: '#34d399' }}>Catatan Visual & Tata Letak:</strong> {currentSlide.visualNotes}
                    </div>
                  )}

                  {/* Next / Prev Controls */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '26px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', flexWrap: 'wrap', gap: '10px' }}>
                    <button
                      type="button"
                      disabled={currentSlideIndex === 0}
                      onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                      style={{
                        padding: '10px 18px',
                        background: currentSlideIndex === 0 ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        color: currentSlideIndex === 0 ? 'rgba(255, 255, 255, 0.3)' : '#ffffff',
                        cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit'
                      }}
                    >
                      ← Slide Sebelumnya
                    </button>

                    <span style={{ color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '0.88rem' }}>
                      Slide {currentSlideIndex + 1} dari {slidePresentasiData.slides.length}
                    </span>

                    <button
                      type="button"
                      disabled={currentSlideIndex === slidePresentasiData.slides.length - 1}
                      onClick={() => setCurrentSlideIndex((prev) => Math.min(slidePresentasiData.slides.length - 1, prev + 1))}
                      style={{
                        padding: '10px 20px',
                        background: currentSlideIndex === slidePresentasiData.slides.length - 1 ? 'rgba(255, 255, 255, 0.04)' : 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                        border: 'none',
                        borderRadius: '10px',
                        color: currentSlideIndex === slidePresentasiData.slides.length - 1 ? 'rgba(255, 255, 255, 0.3)' : '#ffffff',
                        cursor: currentSlideIndex === slidePresentasiData.slides.length - 1 ? 'not-allowed' : 'pointer',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit'
                      }}
                    >
                      Slide Selanjutnya →
                    </button>
                  </div>
                </div>

                {/* Grid of All 13 Slide Cards */}
                <div style={{ marginTop: '36px' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '1.08rem', margin: '0 0 16px', fontWeight: '800' }}>
                    Daftar Seluruh Slide Presentasi (13 Slide):
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                    {slidePresentasiData.slides.map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setCurrentSlideIndex(idx)
                          window.scrollTo({ top: 400, behavior: 'smooth' })
                        }}
                        style={{
                          background: currentSlideIndex === idx ? 'rgba(0, 217, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid',
                          borderColor: currentSlideIndex === idx ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '14px',
                          padding: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ background: currentSlideIndex === idx ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.15)', color: currentSlideIndex === idx ? '#0f172a' : '#ffffff', fontWeight: '900', padding: '2px 8px', borderRadius: '6px', fontSize: '0.74rem' }}>
                            Slide {s.slideNumber}
                          </span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.74rem' }}>{s.category}</span>
                        </div>
                        <strong style={{ color: '#ffffff', fontSize: '0.92rem', display: 'block', lineHeight: '1.4', marginBottom: '4px' }}>
                          {s.title}
                        </strong>
                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.82rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {s.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        )
      })()}

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
                {/* PDF Document Bar */}
                <div className="modal-pdf-bar">
                  <div className="modal-pdf-bar-left">
                    <IconPdf size={24} />
                    <div>
                      <strong>{selectedLk.pdfFileName || `${selectedLk.title}.pdf`}</strong>
                      <span style={{ color: '#38bdf8' }}>
                        Dokumen Resmi Terverifikasi · PDF
                      </span>
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
                      <span>{showPdfEmbed ? 'Tutup Pratinjau' : 'Pratinjau Dokumen'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openGdriveReview(selectedLk.id, selectedLk.gdriveUrl, selectedLk.title, selectedLk.pdfFileName, selectedLk.pdfUrl)}
                      className="modal-pdf-btn-open"
                      style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                      title="Buka Dokumen PDF Layar Penuh"
                    >
                      <IconExternal size={14} />
                      <span>Review Layar Penuh</span>
                    </button>
                  </div>
                </div>

                {/* Embedded PDF Canvas Viewer */}
                {showPdfEmbed && (
                  <div style={{ marginBottom: '24px' }}>
                    <PdfCanvasViewer
                      gdriveUrl={selectedLk.gdriveUrl}
                      pdfUrl={selectedLk.pdfUrl}
                      title={selectedLk.title}
                      fileName={selectedLk.pdfFileName}
                      height="580px"
                      onExpandFullscreen={() => openGdriveReview(selectedLk.id, selectedLk.gdriveUrl, selectedLk.title, selectedLk.pdfFileName, selectedLk.pdfUrl)}
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

                {/* CASE 4: LK 4 Desain Karya Inovatif */}
                {selectedLk.lk4Sections && (
                  <div>
                    {/* Identitas Karya */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', marginBottom: '22px' }}>
                      <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>Penyusun / Mahasiswa</span>
                        <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{selectedLk.lk4Sections.identitas.namaMahasiswa}</strong>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>Nomor Induk Mahasiswa</span>
                        <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', fontFamily: 'Geist Mono, monospace' }}>{selectedLk.lk4Sections.identitas.nim}</strong>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>Sasaran & Elemen</span>
                        <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{selectedLk.lk4Sections.identitas.targetFase} · {selectedLk.lk4Sections.identitas.elemen}</strong>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>Alokasi Waktu Pembelajaran</span>
                        <strong style={{ color: '#34d399', fontSize: '0.95rem' }}>{selectedLk.lk4Sections.identitas.alokasiWaktu}</strong>
                      </div>
                    </div>

                    {/* Judul Karya Card */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(29, 111, 165, 0.3), rgba(0, 217, 255, 0.15))', border: '1px solid rgba(0, 217, 255, 0.35)', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px' }}>
                      <span style={{ background: 'rgba(0, 217, 255, 0.2)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 217, 255, 0.4)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
                        KARYA INOVATIF PEMBELAJARAN
                      </span>
                      <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: '10px 0 6px', fontWeight: '800' }}>
                        {selectedLk.lk4Sections.identitas.judulKarya}
                      </h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.82)', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {selectedLk.lk4Sections.identitas.bidangStudi} — {selectedLk.lk4Sections.identitas.perguruanTinggi}
                      </p>
                    </div>

                    {/* Gagasan & Latar Belakang */}
                    <div style={{ marginBottom: '26px' }}>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '700' }}>
                        A. Gagasan dan Landasan Riset Inovasi
                      </h4>
                      <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '18px 20px', marginBottom: '14px' }}>
                        <span style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Identifikasi Masalah di Lapangan</span>
                        <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: '1.65', margin: '8px 0 0' }}>
                          {selectedLk.lk4Sections.gagasanInovasi.latarBelakang}
                        </p>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '18px 20px', marginBottom: '14px' }}>
                        <span style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Gagasan Solutif: Transisi ke Web NetLab</span>
                        <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: '1.65', margin: '8px 0 0' }}>
                          {selectedLk.lk4Sections.gagasanInovasi.gagasanSolutif}
                        </p>
                      </div>

                      <div style={{ marginTop: '16px' }}>
                        <span style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '10px' }}>4 Keunggulan Operasional NetLab:</span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
                          {selectedLk.lk4Sections.gagasanInovasi.keunggulanNetLab.map((adv, aIdx) => (
                            <div key={aIdx} style={{ background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '10px', padding: '12px 14px', fontSize: '0.85rem', color: '#e0f2fe' }}>
                              <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '4px' }}>Keunggulan #{aIdx + 1}</strong>
                              {adv}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Skenario Kasus Minimarket Berkah */}
                    <div style={{ marginBottom: '26px' }}>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '700' }}>
                        B. Skenario Studi Kasus Kontekstual & Topologi Jaringan
                      </h4>
                      <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '14px', padding: '18px 20px', marginBottom: '16px' }}>
                        <span style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.5px' }}>{selectedLk.lk4Sections.skenarioKasus.judulKasus}</span>
                        <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.9rem', lineHeight: '1.65', margin: '8px 0 0' }}>
                          {selectedLk.lk4Sections.skenarioKasus.narasi}
                        </p>
                      </div>

                      <div style={{ overflowX: 'auto', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '14px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                          <thead>
                            <tr style={{ background: 'rgba(29, 111, 165, 0.4)', color: '#ffffff' }}>
                              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>Perangkat Node</th>
                              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>Model Perangkat</th>
                              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>Alamat IPv4 & Subnet</th>
                              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>Port Switch & Peran</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedLk.lk4Sections.skenarioKasus.tabelIP.map((row, rIdx) => (
                              <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <td style={{ padding: '12px 14px', fontWeight: '700', color: 'var(--accent-cyan)' }}>{row.node}</td>
                                <td style={{ padding: '12px 14px', color: '#ffffff' }}>{row.model}</td>
                                <td style={{ padding: '12px 14px', fontFamily: 'Geist Mono, monospace', color: '#fef08a' }}>
                                  {row.ip}<br />
                                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)' }}>{row.netmask}</span>
                                </td>
                                <td style={{ padding: '12px 14px' }}>
                                  <span style={{ color: '#a5b4fc', display: 'block', fontSize: '0.8rem' }}>{row.port}</span>
                                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{row.fungsi}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 5 Sintaks PBL */}
                    <div style={{ marginBottom: '26px' }}>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '14px', fontWeight: '700' }}>
                        C. Rancangan Alur 5 Sintaks Problem-Based Learning (90 Menit)
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {selectedLk.lk4Sections.sintaksPBL.map((syn, sIdx) => (
                          <div key={sIdx} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '16px 20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                              <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>{syn.sintaks}</strong>
                              <span style={{ background: 'rgba(0, 217, 255, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 217, 255, 0.3)', padding: '2px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
                                {syn.alokasi}
                              </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                              <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.86rem' }}>
                                <span style={{ color: '#38bdf8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Aktivitas Guru:</span>
                                <span style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.55' }}>{syn.aktivitasGuru}</span>
                              </div>
                              <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.86rem' }}>
                                <span style={{ color: '#34d399', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Aktivitas Peserta Didik:</span>
                                <span style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.55' }}>{syn.aktivitasSiswa}</span>
                              </div>
                            </div>
                            <div style={{ marginTop: '8px', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                              <strong style={{ color: '#c084fc' }}>Peran Teknologi:</strong> {syn.peranTeknologi}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Evaluasi Inovasi 3K */}
                    <div style={{ marginBottom: '26px' }}>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '14px', fontWeight: '700' }}>
                        D. Evaluasi Karya Inovasi: Nilai 3K (Kebaruan, Kreativitas, Kebermanfaatan)
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                        {/* Kebaruan */}
                        <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '16px', padding: '18px' }}>
                          <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '3px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800' }}>
                            1. KEBARUAN (NOVELTY)
                          </span>
                          <ul style={{ margin: '12px 0 0', paddingLeft: '18px', color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                            {selectedLk.lk4Sections.evaluasiInovasi.kebaruan.poin.map((p, idx) => (
                              <li key={idx} style={{ marginBottom: '6px' }}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Kreativitas */}
                        <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.35)', borderRadius: '16px', padding: '18px' }}>
                          <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '3px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800' }}>
                            2. KREATIVITAS (CREATIVITY)
                          </span>
                          <ul style={{ margin: '12px 0 0', paddingLeft: '18px', color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                            {selectedLk.lk4Sections.evaluasiInovasi.kreativitas.poin.map((p, idx) => (
                              <li key={idx} style={{ marginBottom: '6px' }}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Kebermanfaatan */}
                        <div style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.35)', borderRadius: '16px', padding: '18px' }}>
                          <span style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', padding: '3px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: '800' }}>
                            3. KEBERMANFAATAN (USEFULNESS)
                          </span>
                          <ul style={{ margin: '12px 0 0', paddingLeft: '18px', color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                            {selectedLk.lk4Sections.evaluasiInovasi.kebermanfaatan.poin.map((p, idx) => (
                              <li key={idx} style={{ marginBottom: '6px' }}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Daftar Pustaka */}
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '10px', fontWeight: '700' }}>
                        E. Daftar Pustaka Rujukan Ilmiah
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.86rem', lineHeight: '1.7' }}>
                        {selectedLk.lk4Sections.daftarPustaka.map((dp, dIdx) => (
                          <li key={dIdx} style={{ marginBottom: '6px' }}>{dp.sitasi}</li>
                        ))}
                      </ul>
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

      {/* Standalone Fullscreen Document Review Modal */}
      <PdfReviewModal
        isOpen={!!activeReviewPdf}
        onClose={() => setActiveReviewPdf(null)}
        gdriveUrl={activeReviewPdf?.gdriveUrl}
        pdfUrl={activeReviewPdf?.pdfUrl}
        title={activeReviewPdf?.title}
        fileName={activeReviewPdf?.fileName}
      />
    </section>
  )
}

export default Seminar
