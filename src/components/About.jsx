import React from 'react'
import './About.css'

function About() {
  return (
    <section id="tentang" className="section about-section">
      <div className="section-heading about-header">
        <span className="section-eyebrow">01 · TENTANG SAYA</span>
        <h2>Identitas & Filosofi Pendidik</h2>
        <p>Profil diri, inspirasi perjalanan, motivasi, serta filosofi pendidikan yang menjadi pijakan dalam mengabdi sebagai calon guru profesional.</p>
      </div>

      <div className="about-hero-card">
        <div className="about-card-top">
          <span className="badge-pill badge-primary">PROFIL DIRI</span>
          <span className="badge-pill badge-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Kota Yogyakarta, Daerah Istimewa Yogyakarta
          </span>
        </div>

        <div className="about-card-body">
          <div className="about-profile-left">
            <div className="avatar-container">
              <img src="/foto-profil.jpg" alt="Foto Asyhar Qowiim" className="profile-avatar-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }} />
              <div className="profile-avatar-fallback">
                <span>AQ</span>
              </div>
            </div>

            <div className="profile-details">
              <h3 className="profile-name">Asyhar Qowiim</h3>
              <p className="profile-role">Calon Guru Profesional</p>
              
              <div className="quote-box">
                <span className="quote-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </span>
                <blockquote className="quote-text">
                  "Terus belajar untuk bertumbuh, dan terus bertumbuh untuk menjadi pendidik Informatika yang reflektif, kompeten, serta bermanfaat bagi sesama."
                </blockquote>
              </div>
            </div>
          </div>

          <div className="about-commitment-card">
            <div className="commitment-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
            </div>
            <span className="commitment-label">KOMITMEN</span>
            <h4 className="commitment-title">Pembelajar Seumur Hidup</h4>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
