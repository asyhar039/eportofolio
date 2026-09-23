import React from 'react'
import './Gallery.css'

const galleryItems = [
  { title: 'Kegiatan PPG', category: 'Kegiatan PPG', size: 'tall' },
  { title: 'Pembelajaran', category: 'Pembelajaran', size: 'normal' },
  { title: 'Praktik Mengajar', category: 'Praktik Mengajar', size: 'wide' },
  { title: 'Diskusi', category: 'Diskusi', size: 'normal' },
  { title: 'Presentasi', category: 'Presentasi', size: 'tall' },
  { title: 'Dokumentasi Kelas', category: 'Dokumentasi Kelas', size: 'normal' }
]

function Gallery() {
  return (
    <section id="galeri" className="section gallery-section">
      <div className="section-heading">
        <span className="section-eyebrow">04 · GALERI</span>
        <h2>Dokumentasi aktivitas, pembelajaran, praktik, dan pengalaman selama mengikuti PPG Informatika.</h2>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <article key={index} className={`gallery-item ${item.size}`}>
            <div className="gallery-overlay">
              <div className="gallery-content">
                <span className="gallery-category">{item.category}</span>
                <h3 className="gallery-title">{item.title}</h3>
                <button className="gallery-view-btn">
                  View
                  <span>→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Gallery
