import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import * as pdfjsLib from 'pdfjs-dist'
import {
  formatGoogleDrivePreviewUrl,
  formatGoogleDriveDirectUrl,
  isGoogleDriveUrl,
  extractGoogleDriveId,
  OFFICIAL_GDRIVE_DOCS
} from '../utils/gdriveHelper'

// Configure PDF.js worker using the static public worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

// Official Google Drive Icon
export const IconGoogleDrive = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 87.3 78" className={className}>
    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
    <path d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 49.9 0 51.45 0 53h27.5z" fill="#00ac47"/>
    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 13.8z" fill="#ea4335"/>
    <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
    <path d="M59.8 53H87.3c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25z" fill="#ffba00"/>
    <path d="m27.5 53 16.15 23.8c1.35.8 2.9 1.2 4.5 1.2h18.5c1.6 0 3.15-.4 4.5-1.2L54.5 53z" fill="#2684fc"/>
  </svg>
)

const IconExternal = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const IconDownload = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const IconClose = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconPdf = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15h1.5a1.5 1.5 0 0 0 0-3H9v6" />
  </svg>
)

/**
 * Resolves the Google Drive preview URL for seminar documents
 */
export function resolveDocumentUrl(gdriveUrl, pdfUrl, fileName) {
  const cleanGdrive = (gdriveUrl || '').trim()
  if (cleanGdrive && (isGoogleDriveUrl(cleanGdrive) || extractGoogleDriveId(cleanGdrive))) {
    return formatGoogleDrivePreviewUrl(cleanGdrive)
  }

  // Fallback to official mapping by fileName or keywords
  if (fileName) {
    const fn = fileName.toLowerCase()
    if (fn.includes('semester 1') || fn.includes('sem1') || fn.includes('semester-1')) {
      return OFFICIAL_GDRIVE_DOCS['lk-2-semester-1'].previewUrl
    }
    if (fn.includes('semester 2') || fn.includes('sem2') || fn.includes('semester-2')) {
      return OFFICIAL_GDRIVE_DOCS['lk-2-semester-2'].previewUrl
    }
    if (fn.includes('desain karya') || fn.includes('lk 4') || fn.includes('lk4') || fn.includes('inovatif')) {
      return OFFICIAL_GDRIVE_DOCS['lk-4-desain-karya-inovatif'].previewUrl
    }
    if (fn.includes('modul') || fn.includes('netlab')) {
      return OFFICIAL_GDRIVE_DOCS['modul-ajar-netlab'].previewUrl
    }
    if (fn.includes('karya inovasi') || fn.includes('slide')) {
      return OFFICIAL_GDRIVE_DOCS['slide-presentasi'].previewUrl
    }
  }

  const cleanPdf = (pdfUrl || '').trim()
  if (cleanPdf) return cleanPdf

  return OFFICIAL_GDRIVE_DOCS['slide-presentasi'].previewUrl
}

/**
 * Resolves the direct external Google Drive URL (for opening in new tab)
 */
export function resolveDirectUrl(previewUrl, pdfUrl) {
  if (isGoogleDriveUrl(previewUrl)) {
    return formatGoogleDriveDirectUrl(previewUrl)
  }
  return pdfUrl || previewUrl
}

/**
 * In-Browser Canvas PDF Renderer (Used only as fallback if not Google Drive)
 */
function InBrowserPdfRenderer({ pdfUrl }) {
  const [pdfDoc, setPdfDoc] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [numPages, setNumPages] = useState(0)
  const [scale, setScale] = useState(1.15)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const canvasRef = useRef(null)
  const renderTaskRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    let isCancelled = false
    setLoading(true)
    setErrorMsg(null)

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true
    })

    loadingTask.promise
      .then((doc) => {
        if (!isCancelled) {
          setPdfDoc(doc)
          setNumPages(doc.numPages)
          setCurrentPage(1)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error('Error loading PDF via pdfjs:', err)
          setErrorMsg('Gagal memuat pratinjau dokumen.')
          setLoading(false)
        }
      })

    return () => {
      isCancelled = true
      try {
        loadingTask.destroy()
      } catch {}
    }
  }, [pdfUrl])

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return

    let isCancelled = false

    pdfDoc.getPage(currentPage).then((page) => {
      if (isCancelled) return

      const canvas = canvasRef.current
      if (!canvas) return
      const context = canvas.getContext('2d')

      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch {}
      }

      const viewport = page.getViewport({ scale })
      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }

      const renderTask = page.render(renderContext)
      renderTaskRef.current = renderTask

      renderTask.promise.catch((err) => {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn('Render exception:', err)
        }
      })
    })

    return () => {
      isCancelled = true
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch {}
      }
    }
  }, [pdfDoc, currentPage, scale])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#0b1120', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            disabled={currentPage <= 1 || loading}
            onClick={() => {
              setCurrentPage((prev) => Math.max(1, prev - 1))
              if (containerRef.current) containerRef.current.scrollTop = 0
            }}
            style={{
              background: currentPage <= 1 ? 'rgba(255, 255, 255, 0.04)' : 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: currentPage <= 1 ? 'rgba(255, 255, 255, 0.3)' : '#38bdf8',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Prev
          </button>
          <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: '700' }}>
            Halaman {currentPage} / {numPages || 1}
          </span>
          <button
            type="button"
            disabled={currentPage >= numPages || loading}
            onClick={() => {
              setCurrentPage((prev) => Math.min(numPages, prev + 1))
              if (containerRef.current) containerRef.current.scrollTop = 0
            }}
            style={{
              background: currentPage >= numPages ? 'rgba(255, 255, 255, 0.04)' : 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: currentPage >= numPages ? 'rgba(255, 255, 255, 0.3)' : '#38bdf8',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: currentPage >= numPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next →
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setScale((prev) => Math.max(0.65, +(prev - 0.15).toFixed(2)))}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            - Zoom
          </button>
          <span style={{ fontSize: '0.76rem', color: '#7dd3fc', fontWeight: '700', minWidth: '42px', textAlign: 'center' }}>
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setScale((prev) => Math.min(2.5, +(prev + 0.15).toFixed(2)))}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            + Zoom
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: loading ? 'center' : 'flex-start',
          padding: '24px 16px',
          background: '#090d16',
          position: 'relative'
        }}
      >
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                border: '3px solid rgba(56, 189, 248, 0.2)',
                borderTopColor: '#38bdf8',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }}
            />
            <span style={{ fontSize: '0.86rem', color: '#7dd3fc', fontWeight: '600' }}>
              Memuat pratinjau dokumen...
            </span>
          </div>
        )}

        {errorMsg && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#f87171' }}>
            <p>{errorMsg}</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          style={{
            display: loading ? 'none' : 'block',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
            borderRadius: '6px',
            background: '#ffffff',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
    </div>
  )
}

/**
 * Clean In-Page Document Viewer with direct Google Drive Preview
 */
export function PdfCanvasViewer({
  gdriveUrl = '',
  pdfUrl = '',
  title = 'Dokumen',
  fileName = 'dokumen.pdf',
  height = '620px',
  onExpandFullscreen = null
}) {
  const previewUrl = resolveDocumentUrl(gdriveUrl, pdfUrl, fileName)
  const isGdrive = isGoogleDriveUrl(previewUrl)
  const directUrl = resolveDirectUrl(previewUrl, pdfUrl)
  const downloadUrl = pdfUrl || previewUrl

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#090d16',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
        width: '100%'
      }}
    >
      {/* Top Reviewer Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: '800',
              background: isGdrive ? 'rgba(56, 189, 248, 0.18)' : 'rgba(16, 185, 129, 0.16)',
              color: isGdrive ? '#38bdf8' : '#34d399',
              border: `1px solid ${isGdrive ? 'rgba(56, 189, 248, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
              letterSpacing: '0.5px'
            }}
          >
            {isGdrive ? <IconGoogleDrive size={14} /> : <IconPdf size={14} />}
            {isGdrive ? 'GOOGLE DRIVE PREVIEW' : 'PRATINJAU DOKUMEN'}
          </span>
          <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>
            {title}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.76rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Buka Dokumen Resmi di Google Drive"
          >
            <IconExternal size={14} />
            <span>Buka di Tab Baru</span>
          </a>

          <a
            href={downloadUrl}
            download={fileName}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#34d399',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.76rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Unduh Berkas Dokumen"
          >
            <IconDownload size={14} />
            <span>Unduh File</span>
          </a>

          {onExpandFullscreen && (
            <button
              type="button"
              onClick={onExpandFullscreen}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                border: 'none',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'inherit'
              }}
              title="Perbesar ke Layar Penuh"
            >
              <span>⤢</span> Layar Penuh
            </button>
          )}
        </div>
      </div>

      {/* Main Viewer Body */}
      <div style={{ position: 'relative', width: '100%', height: height, background: '#0b1120', overflow: 'hidden' }}>
        {isGdrive ? (
          <iframe
            src={previewUrl}
            width="100%"
            height="100%"
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
              display: 'block',
              background: '#0b1120'
            }}
            title={title}
            allow="autoplay"
          />
        ) : (
          <InBrowserPdfRenderer pdfUrl={previewUrl} />
        )}
      </div>
    </div>
  )
}

/**
 * Fullscreen Interactive Document Review Modal
 */
export default function PdfReviewModal({
  isOpen = false,
  onClose = () => {},
  gdriveUrl = '',
  pdfUrl = '',
  title = 'Dokumen Resmi',
  fileName = 'dokumen.pdf'
}) {
  // Keyboard escape
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const previewUrl = resolveDocumentUrl(gdriveUrl, pdfUrl, fileName)
  const isGdrive = isGoogleDriveUrl(previewUrl)
  const directUrl = resolveDirectUrl(previewUrl, pdfUrl)
  const downloadUrl = pdfUrl || previewUrl

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(3, 7, 18, 0.94)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1360px',
          height: '95vh',
          background: '#090d16',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 22px',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Left Title and Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: '800',
                background: isGdrive ? 'rgba(56, 189, 248, 0.18)' : 'rgba(16, 185, 129, 0.16)',
                color: isGdrive ? '#38bdf8' : '#34d399',
                border: `1px solid ${isGdrive ? 'rgba(56, 189, 248, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                letterSpacing: '0.5px'
              }}
            >
              {isGdrive ? <IconGoogleDrive size={15} /> : <IconPdf size={15} />}
              {isGdrive ? 'GOOGLE DRIVE PREVIEW' : 'DOKUMEN RESMI'}
            </span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>
                {title}
              </h2>
              {fileName && (
                <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                  {fileName}
                </span>
              )}
            </div>
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                color: '#38bdf8',
                padding: '7px 15px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Buka Dokumen di Google Drive (Tab Baru)"
            >
              <IconExternal size={14} />
              <span>Buka di Tab Baru</span>
            </a>

            <a
              href={downloadUrl}
              download={fileName}
              style={{
                background: 'rgba(52, 211, 153, 0.15)',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                color: '#34d399',
                padding: '7px 14px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Unduh Berkas Resmi"
            >
              <IconDownload size={14} />
              <span>Unduh File</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                color: '#f87171',
                padding: '7px 14px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'inherit'
              }}
              title="Tutup Penampil Dokumen"
            >
              <IconClose size={15} />
              <span>Tutup</span>
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div style={{ position: 'relative', flex: 1, width: '100%', background: '#0b1120', overflow: 'hidden' }}>
          {isGdrive ? (
            <iframe
              src={previewUrl}
              width="100%"
              height="100%"
              style={{
                border: 'none',
                width: '100%',
                height: '100%',
                display: 'block',
                background: '#0b1120'
              }}
              title={title}
              allow="autoplay"
            />
          ) : (
            <InBrowserPdfRenderer pdfUrl={previewUrl} />
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
