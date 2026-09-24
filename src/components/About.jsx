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
            <div className="commitment-glow"></div>
            <div className="commitment-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
            </div>
            <div className="commitment-body">
              <span className="commitment-label">KOMITMEN</span>
              <h4 className="commitment-title">Pembelajar Seumur Hidup</h4>
              <p className="commitment-desc">Terus bertumbuh, menginspirasi, dan menghadirkan pembelajaran yang bermakna bagi generasi.</p>
            </div>
            <div className="commitment-pattern"></div>
          </div>
        </div>
      </div>

      <div className="about-story">
        <div className="story-head">
          <span className="story-label">SEPINTAS TENTANG SAYA</span>
          <h3>Berakar dari Bumi Pertiwi, Bertumbuh di Era Digital.</h3>
        </div>

        <div className="story-grid">
          <div className="story-text">
            <p>
              Halo, nama saya <strong>Asyhar Qowiim</strong>. Saya berasal dari Kecamatan Kombeng, Kutai Timur, sebuah wilayah unik yang terus bertransformasi dan menunjukkan perkembangan pesat setiap tahunnya. Daerah kami dianugerahi kesuburan tanah yang luar biasa, menjadikannya lumbung kekayaan hasil bumi seperti minyak kelapa sawit yang luas serta potensi pertambangan batu bara yang melimpah.
            </p>
            <p>
              Tumbuh di lingkungan keluarga pendidik—dengan orang tua sebagai guru SD dan kakak yang mengabdi di pondok pesantren—telah membentuk karakter saya untuk menghargai pengabdian. Sebagai lulusan S1 Informatika dari Universitas Teknologi Yogyakarta angkatan 2025, saya merasa memiliki tanggung jawab besar untuk memastikan bahwa kekayaan alam yang dimiliki Kombeng diimbangi dengan kualitas sumber daya manusia yang mumpuni di era digital.
            </p>
            <p>
              Inspirasi saya untuk menjadi guru profesional berakar dari keinginan melanjutkan estafet perjuangan ayah saya yang telah memasuki masa pensiun, di tengah kondisi daerah yang masih sangat kekurangan tenaga pendidik informatika. Tujuan saya adalah pulang dan mengabdi untuk menjembatani kesenjangan literasi digital, sehingga generasi muda di Kalimantan Timur tidak hanya menjadi penonton dalam kemajuan daerahnya, tetapi mampu menjadi inovator yang mengelola potensi lokal dengan teknologi modern.
            </p>
            <p className="story-commit">
              Saya berkomitmen penuh untuk mendedikasikan ilmu saya demi mencetak generasi yang kompetitif dan siap menghadapi tantangan masa depan.
            </p>
          </div>

          <div className="story-facts">
            <div className="fact-card">
              <span className="fact-icon">📍</span>
              <div>
                <strong>Kombeng, Kutai Timur</strong>
                <span>Kalimantan Timur</span>
              </div>
            </div>
            <div className="fact-card">
              <span className="fact-icon">🌱</span>
              <div>
                <strong>Keluarga Pendidik</strong>
                <span>Guru SD & Abdi Pondok Pesantren</span>
              </div>
            </div>
            <div className="fact-card">
              <span className="fact-icon">🎓</span>
              <div>
                <strong>S1 Informatika</strong>
                <span>Universitas Teknologi Yogyakarta · 2025</span>
              </div>
            </div>
            <div className="fact-card">
              <span className="fact-icon">🎯</span>
              <div>
                <strong>Mengabdi untuk Daerah</strong>
                <span>Jembatani literasi digital generasi muda</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
