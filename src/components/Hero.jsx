import React, { useState } from 'react'
import './Hero.css'

function Hero({ onNavigate }) {
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  const exploreItems = [
    { id: 'tentang', label: 'Tentang' },
    { id: 'perjalanan', label: 'Perjalanan' },
    { id: 'matkul', label: 'Matkul' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'artifak', label: 'Artifak' }
  ]

  const handleExplore = (id) => {
    setIsExploreOpen(false)
    onNavigate(id)
  }
  return (
    <section id="beranda" className="hero">
      <div className="hero-container">
        <div className="hero-copy">
           <h1 className="hero-title">
            Belajar.<br />
            <span className="gradient-text">Berkembang.</span><br />
            Menjadi Guru.
          </h1>
          <p className="hero-description">
            Dokumentasi perjalanan profesional Asyhar Qowiim dalam mengikuti Pendidikan Profesi Guru bidang Informatika, melalui proses belajar, praktik, refleksi, dan pengembangan kompetensi.
          </p>
          <div className="hero-actions">
            <div className="explore-menu">
              <button className="btn btn-primary" onClick={() => setIsExploreOpen(!isExploreOpen)} aria-expanded={isExploreOpen}>
                Jelajahi Portofolio
                <span className={isExploreOpen ? 'arrow-up' : ''}>→</span>
              </button>
              {isExploreOpen && (
                <div className="explore-dropdown">
                  {exploreItems.map(item => (
                    <button key={item.id} onClick={() => handleExplore(item.id)}>{item.label}<span>→</span></button>
                  ))}
                </div>
              )}
            </div>
            <button className="btn btn-secondary" onClick={() => onNavigate('tentang')}>
              Lihat Profil
            </button>
          </div>
          <div className="keywords">
            <span><span className="dot"></span> Belajar</span>
            <span><span className="dot"></span> Berkembang</span>
            <span><span className="dot"></span> Berkontribusi</span>
          </div>
        </div>

        <div className="hero-visual">
          <article className="profile-card">
            <div className="card-glow"></div>
            <div className="card-topline">
              <span className="badge">PPG • INFORMATIKA</span>
              <span className="tech-icon">⌘</span>
            </div>
            <p className="card-label">PROFIL PROFESIONAL</p>
            <h2>
              Guru.<br />
              Pembelajar.<br />
              Praktisi Informatika.
            </h2>
            <p className="card-desc">
              Perjalanan membangun kompetensi sebagai calon guru Informatika yang reflektif, kompeten, dan siap menghadirkan pembelajaran yang bermakna.
            </p>
            <div className="feature-grid">
              <div className="feature-item">
                <strong>01</strong>
                <b>BELAJAR</b>
                <span>Memperluas kompetensi</span>
              </div>
              <div className="feature-item">
                <strong>02</strong>
                <b>PRAKTIK</b>
                <span>Menerapkan pembelajaran</span>
              </div>
              <div className="feature-item">
                <strong>03</strong>
                <b>REFLEKSI</b>
                <span>Mengembangkan diri</span>
              </div>
            </div>
          </article>
          <div className="floating-card">
            <span className="float-label">FOKUS</span>
            <strong>Kompetensi • Praktik • Refleksi</strong>
          </div>
        </div>
      </div>

      <div className="hero-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </section>
  )
}

export default Hero
