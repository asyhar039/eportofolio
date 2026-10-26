import React, { useState, useMemo } from 'react'
import './Artifacts.css'
import { generalArtifacts } from '../data/artifactsData'
import PdfReviewModal, { IconGoogleDrive } from './PdfReviewModal'

// Modern Minimalist SVG Icons
const IconDoc = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
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

const IconRouter = ({ size = 20, className = "" }) => (
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

const IconColab = ({ size = 20, className = "" }) => (
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

const IconCodeNotebook = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <polyline points="9 9 6 12 9 15" />
    <polyline points="15 9 18 12 15 15" />
    <line x1="13" y1="8" x2="11" y2="16" />
  </svg>
)

const IconCheck = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
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

function renderArtifactIcon(iconType) {
  switch (iconType) {
    case 'colab':
      return <IconColab size={20} />
    case 'notebook':
    case 'json':
      return <IconCodeNotebook size={20} />
    case 'netlab':
      return <IconRouter size={20} />
    case 'slides':
      return <IconSlides size={20} />
    case 'book':
      return <IconBook size={20} />
    default:
      return <IconDoc size={20} />
  }
}

function Artifacts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [previewDoc, setPreviewDoc] = useState(null)

  const filteredArtifacts = useMemo(() => {
    if (!searchQuery.trim()) return generalArtifacts

    const query = searchQuery.toLowerCase()
    return generalArtifacts.filter((item) => {
      const inTitle = item.title.toLowerCase().includes(query)
      const inSummary = item.summary.toLowerCase().includes(query)
      const inNumber = item.number.toLowerCase().includes(query)
      const inCategory = item.category?.toLowerCase().includes(query)
      const inHighlights = item.highlights?.some((h) =>
        h.toLowerCase().includes(query)
      )
      return inTitle || inSummary || inNumber || inCategory || inHighlights
    })
  }, [searchQuery])

  return (
    <section id="artifak" className="section artifacts-section">
      {/* Section Heading */}
      <div className="section-heading">
        <span className="section-eyebrow">07 · ARTIFAK DAN BUKTI BELAJAR</span>
        <h2>Arsip Dokumen, Karya, & Bukti Pembelajaran PPG</h2>
        <p>
          Kumpulan modul ajar, materi pembelajaran, media praktik Google Colab, serta karya inovasi simulasi jaringan NetLab dari pelaksanaan PPL Mandiri di SMAN 11 Yogyakarta dan Seminar PPG.
        </p>
      </div>

      {/* Search Bar Only (Tabs Removed) */}
      <div className="artifacts-controls-bar" style={{ justifyContent: 'flex-end' }}>
        <div className="artifacts-search-box" style={{ width: '100%', maxWidth: '380px' }}>
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
            placeholder="Cari modul ajar, materi, media Colab, NetLab..."
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
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: '600' }}>
                  {artifact.semester}
                </span>
              </div>

              <div className="card-icon-wrap">
                {renderArtifactIcon(artifact.iconType)}
              </div>

              <h3 className="card-title">{artifact.title}</h3>
              <p className="card-desc">{artifact.summary}</p>

              {artifact.highlights && artifact.highlights.length > 0 && (
                <ul className="card-highlights-preview">
                  {artifact.highlights.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-check">
                        <IconCheck size={11} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="card-footer-action" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {artifact.type === 'document' && (
                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <button
                      type="button"
                      className="card-open-btn"
                      style={{ flex: 1 }}
                      onClick={() => setPreviewDoc(artifact)}
                    >
                      <IconGoogleDrive size={15} />
                      <span>Preview Dokumen</span>
                    </button>
                    {artifact.downloadUrl && (
                      <a
                        href={artifact.downloadUrl}
                        download={artifact.fileName}
                        className="card-open-btn"
                        style={{
                          width: 'auto',
                          padding: '10px 14px',
                          background: 'rgba(52, 211, 153, 0.16)',
                          borderColor: 'rgba(52, 211, 153, 0.4)',
                          color: '#34d399',
                          textDecoration: 'none'
                        }}
                        title="Unduh File"
                      >
                        <IconDownload size={16} />
                      </a>
                    )}
                  </div>
                )}

                {artifact.type === 'external' && (
                  <a
                    href={artifact.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-open-btn"
                    style={{ textDecoration: 'none' }}
                  >
                    {artifact.iconType === 'colab' || artifact.iconType === 'notebook' ? (
                      <IconColab size={15} />
                    ) : (
                      <IconExternal size={14} />
                    )}
                    <span>{artifact.buttonLabel || 'Buka Tautan'}</span>
                    <IconExternal size={13} />
                  </a>
                )}

                {artifact.type === 'json' && (
                  <div style={{ display: 'flex', gap: '8px', width: '100%', flexWrap: 'wrap' }}>
                    <a
                      href={artifact.jsonUrl}
                      download={artifact.jsonFileName || 'produk-karya-inovasi.json'}
                      className="card-open-btn"
                      style={{
                        flex: 1,
                        textDecoration: 'none',
                        background: 'rgba(52, 211, 153, 0.2)',
                        borderColor: 'rgba(52, 211, 153, 0.45)',
                        color: '#6ee7b7'
                      }}
                    >
                      <IconDownload size={15} />
                      <span>Unduh File JSON</span>
                    </a>
                    {artifact.netlabUrl && (
                      <a
                        href={artifact.netlabUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-open-btn"
                        style={{ flex: 1, textDecoration: 'none' }}
                      >
                        <IconExternal size={14} />
                        <span>Buka NetLab</span>
                      </a>
                    )}
                  </div>
                )}
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
          <p>Coba kata kunci pencarian lain.</p>
          <button
            className="btn btn-secondary"
            onClick={() => setSearchQuery('')}
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Fullscreen Document Preview Modal */}
      <PdfReviewModal
        isOpen={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        gdriveUrl={previewDoc?.gdriveUrl || ''}
        pdfUrl={previewDoc?.downloadUrl || ''}
        title={previewDoc?.title || 'Dokumen Artefak'}
        fileName={previewDoc?.fileName || 'dokumen.pdf'}
      />
    </section>
  )
}

export default Artifacts
