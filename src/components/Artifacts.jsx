import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Artifacts.css'
import { generalArtifacts } from '../data/artifactsData'

const categories = [
  'Semua Artefak',
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

const IconArrowRight = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconPrinter = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
)

const IconDownload = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const IconExternal = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

function Artifacts({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('Semua Artefak')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArtifact, setSelectedArtifact] = useState(null)
  const [copiedState, setCopiedState] = useState(false)

  // Manage body scroll lock when modal is open
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

  const filteredArtifacts = useMemo(() => {
    return generalArtifacts.filter((item) => {
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
Kode: ${selectedArtifact.code || selectedArtifact.number}
Mata Kuliah: ${selectedArtifact.course} (${selectedArtifact.semester})
Penyusun: ${selectedArtifact.author || 'Asyhar Qowiim'}

Ringkasan:
${selectedArtifact.summary}\n\n`

    if (selectedArtifact.components) {
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
        <span className="section-eyebrow">07 · ARTIFAK DAN BUKTI BELAJAR</span>
        <h2>Arsip Dokumen, Karya, & Bukti Pembelajaran PPG</h2>
        <p>
          Dokumentasi artefak operasional perkuliahan dan praktik lapangan: Modul Ajar Berdiferensiasi, Perangkat Pembelajaran Sosial Emosional (PSE), Media Simulasi Cisco Packet Tracer, Instrumen Asesmen Autentik, serta Laporan Praktik Terbaik (Best Practice).
        </p>
      </div>

      {/* Controls Bar: Filters & Search */}
      <div className="artifacts-controls-bar">
        <div className="artifacts-filter-group" role="tablist" aria-label="Filter kategori artefak">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
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
            placeholder="Cari modul, media, asesmen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Cari artefak"
          />
        </div>
      </div>

      {/* Artifacts Grid */}
      {filteredArtifacts.length > 0 ? (
        <div className="artifacts-grid">
          {filteredArtifacts.map((artifact) => (
            <article key={artifact.id} className="artifact-card">
              <div className="card-topline">
                <span className="card-category-badge">{artifact.number}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {artifact.jsonUrl && (
                    <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                      JSON NetLab
                    </span>
                  )}
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>{artifact.semester}</span>
                </div>
              </div>

              <div className="card-icon-wrap">
                <IconDoc size={22} />
              </div>

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
                  onClick={() => setSelectedArtifact(artifact)}
                  aria-label={`Buka ${artifact.title}`}
                >
                  <span>Buka Detail Dokumen</span>
                  <span className="arrow-move">
                    <IconArrowRight size={14} />
                  </span>
                </button>
              </div>
            </article>
          ))}
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
                  {selectedArtifact.code && (
                    <p className="modal-subtitle">Kode Dokumen: {selectedArtifact.code}</p>
                  )}
                </div>

                <div className="modal-header-actions">
                  <button
                    className="modal-header-copy-btn"
                    onClick={handleCopyText}
                    title="Salin isi artefak"
                  >
                    <IconCopy size={15} />
                    <span>Salin</span>
                  </button>
                  <button
                    className="modal-close-btn"
                    onClick={() => setSelectedArtifact(null)}
                    aria-label="Tutup jendela dokumen"
                  >
                    <IconClose size={18} />
                    <span className="close-label">Tutup</span>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="modal-scrollable-body">
                {/* Meta Grid */}
                <div className="modal-info-grid">
                  <div className="info-box">
                    <span className="info-label">Mata Kuliah</span>
                    <strong>{selectedArtifact.course}</strong>
                  </div>
                  <div className="info-box">
                    <span className="info-label">Semester / Periode</span>
                    <strong>{selectedArtifact.semester} • {selectedArtifact.date}</strong>
                  </div>
                  <div className="info-box">
                    <span className="info-label">Penyusun</span>
                    <strong>{selectedArtifact.author || 'Asyhar Qowiim'}</strong>
                  </div>
                  {selectedArtifact.status && (
                    <div className="info-box">
                      <span className="info-label">Status Validasi</span>
                      <strong style={{ color: '#059669' }}>{selectedArtifact.status}</strong>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="modal-summary-box">
                  <h4>Deskripsi & Ruang Lingkup Dokumen</h4>
                  <p>{selectedArtifact.summary}</p>
                </div>

                {/* Highlights */}
                {selectedArtifact.highlights && (
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ color: '#0f2240', marginBottom: '12px', fontSize: '0.95rem' }}>Sorotan Fitur & Keunggulan</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedArtifact.highlights.map((h, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: '#334155' }}>
                          <span style={{ color: '#059669', marginTop: '2px' }}><IconCheck size={14} /></span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Components */}
                {selectedArtifact.components && selectedArtifact.components.length > 0 && (
                  <div>
                    <h4 style={{ color: '#0f2240', marginBottom: '12px', fontSize: '0.95rem' }}>Uraian Komponen Dokumen</h4>
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
                  {selectedArtifact.jsonUrl && (
                    <>
                      <a
                        href={selectedArtifact.jsonUrl}
                        download={selectedArtifact.jsonFileName || 'produk-karya-inovasi.json'}
                        className="modal-copy-btn"
                        style={{ textDecoration: 'none', background: '#059669', color: '#ffffff', borderColor: '#059669', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <IconDownload size={14} />
                        <span>Unduh File JSON</span>
                      </a>
                      <a
                        href={selectedArtifact.netlabUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-copy-btn"
                        style={{ textDecoration: 'none', background: '#0284c7', color: '#ffffff', borderColor: '#0284c7', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <IconExternal size={14} />
                        <span>Buka NetLab Simulator</span>
                      </a>
                    </>
                  )}
                  <button className="modal-copy-btn" onClick={handleCopyText}>
                    <IconCopy size={15} />
                    <span>Salin Ringkasan</span>
                  </button>
                  <button
                    className="modal-print-btn"
                    onClick={() => window.print()}
                  >
                    <IconPrinter size={15} />
                    <span>Cetak</span>
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
