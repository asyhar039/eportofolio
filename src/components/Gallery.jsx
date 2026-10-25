import React, { useState, useEffect } from 'react'
import './Gallery.css'

const galleryData = [
  {
    id: 'vid-1',
    type: 'video',
    title: 'Video Mengajar 1',
    category: 'Video Mengajar',
    src: '/assets/video-mengajar-1.mp4',
    thumbnail: '/assets/thumbnail-video-1.jpg'
  },
  {
    id: 'vid-2',
    type: 'video',
    title: 'Video Mengajar 2',
    category: 'Video Mengajar',
    src: '/assets/video-mengajar-2.mp4',
    thumbnail: '/assets/thumbnail-video-2.jpg'
  },
  {
    id: 'vid-3',
    type: 'video',
    title: 'Video Mengajar 3',
    category: 'Video Mengajar',
    src: '/assets/video-mengajar-3.mp4'
  },
  {
    id: 'img-1',
    type: 'photo',
    title: 'Foto Mengajar 1',
    category: 'Foto Mengajar',
    src: '/assets/mengajar-1.jpg'
  },
  {
    id: 'img-2',
    type: 'photo',
    title: 'Foto Mengajar 2',
    category: 'Foto Mengajar',
    src: '/assets/mengajar-2.jpg'
  }
]

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
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

  const categories = ['Semua', 'Video Mengajar', 'Foto Mengajar']

  const filteredItems = selectedCategory === 'Semua'
    ? galleryData
    : galleryData.filter(item => item.category === selectedCategory)

  return (
    <section id="galeri" className="section gallery-section">
      <div className="section-heading">
        <span className="section-eyebrow">04 · DOKUMENTASI VISUAL</span>
        <h2>Galeri Video & Foto Mengajar</h2>
        <p>Dokumentasi video dan foto kegiatan pembelajaran di kelas.</p>
      </div>

      <div className="gallery-filter-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`gallery-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredItems.map((item) => (
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
                  <source src={item.src} type={item.mimeType || 'video/mp4'} />
                  Peramban Anda tidak mendukung pemutar video HTML5.
                </video>
              </div>
            ) : (
              <div
                className="gallery-photo-wrapper"
                onClick={() => setPreviewPhoto(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPreviewPhoto(item) }}
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

      {/* Lightbox Modal for Photos */}
      {previewPhoto && (
        <div className="gallery-modal-backdrop" onClick={() => setPreviewPhoto(null)}>
          <div className="gallery-photo-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
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
    </section>
  )
}

export default Gallery
