import React from 'react'
import './About.css'
import fotoProfil from '../assets/foto-profil.jpg'
import logoCalonGuru from '../assets/logo-ppg-calon-guru-66ee697b34777c640062b4e3.jpeg'

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
          <div className="about-badges-group">
            <span className="badge-pill badge-primary">PROFIL DIRI</span>
            <div className="badge-pill badge-institution">
              <img src={logoCalonGuru} alt="PPG Calon Guru" className="badge-icon-logo" />
              <span>PPG Calon Guru • Universitas Negeri Yogyakarta</span>
            </div>
            <span className="badge-pill badge-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Kota Yogyakarta, Daerah Istimewa Yogyakarta
            </span>
          </div>
        </div>

        <div className="about-card-body">
          <div className="about-profile-left">
            <div className="avatar-container">
              <img 
                src={fotoProfil} 
                alt="Foto Profil Asyhar Qowiim - Calon Guru Informatika" 
                className="profile-avatar-img" 
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                  if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex'; 
                }} 
              />
              <div className="profile-avatar-fallback">
                <span>AQ</span>
              </div>
            </div>

            <div className="profile-details">
              <h3 className="profile-name">Asyhar Qowiim</h3>
              <p className="profile-role">Calon Guru Profesional • PPG Calon Guru Informatika</p>
              
              <div className="profile-meta-pills">
                <span className="meta-pill"><strong className="meta-label">NIM:</strong> 25105260081</span>
                <span className="meta-pill"><strong className="meta-label">LPTK:</strong> Universitas Negeri Yogyakarta</span>
                <span className="meta-pill"><strong className="meta-label">Bidang:</strong> Informatika</span>
              </div>
              
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
              Halo, nama saya <strong>Asyhar Qowiim</strong>. Saya berasal dari Kecamatan Kombeng, Kutai Timur—wilayah yang terus berkembang dengan potensi perkebunan kelapa sawit dan pertambangan batu bara yang melimpah.
            </p>
            <p>
              Tumbuh di keluarga pendidik—dengan orang tua sebagai guru SD dan kakak yang mengabdi di pondok pesantren—menumbuhkan kecintaan saya pada dunia pendidikan. Sebagai lulusan S1 Informatika Universitas Teknologi Yogyakarta (2025), saya terdorong untuk memastikan kemajuan daerah diimbangi oleh kesiapan sumber daya manusia di era digital.
            </p>
            <p>
              Keinginan menjadi guru profesional berangkat dari tekad melanjutkan pengabdian ayah saya yang telah pensiun, sekaligus menjawab kebutuhan tenaga pendidik Informatika di daerah. Tujuan saya adalah menjembatani kesenjangan literasi digital agar generasi muda Kalimantan Timur mampu mengelola potensi lokal melalui inovasi teknologi.
            </p>
            <p className="story-commit">
              Saya berkomitmen mendedikasikan ilmu dan kompetensi saya untuk mendampingi lahirnya generasi yang adaptif, berkarakter, dan siap menghadapi tantangan masa depan.
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

      <div className="about-vision-mission">
        <div className="vm-head">
          <span className="story-label">VISI & MISI PENDIDIK (SELARAS LK 1 SEMINAR PPG)</span>
          <h3>Visi Pendidikan & Arah Pengabdian Calon Guru Informatika</h3>
          <p>
            Rumusan visi dan langkah konkret sebagai calon guru profesional yang memadukan filosofi Ki Hadjar Dewantara, pembelajaran berpusat pada peserta didik, serta kecakapan literasi digital abad ke-21.
          </p>
        </div>

        <div className="vm-grid">
          <div className="visi-card">
            <div className="vm-card-badge">
              <span className="vm-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </span>
              <span>VISI PRIBADI SEBAGAI CALON GURU</span>
            </div>

            <h4 className="visi-title">
              Pendidik Profesional yang Transformatif, Reflektif, Adaptif, dan Berintegritas
            </h4>

            <p className="visi-statement">
              &ldquo;Menjadi guru Informatika profesional yang transformatif, reflektif, adaptif, dan berintegritas dalam menuntun potensi peserta didik sesuai kodrat alam dan kodrat zaman. Berkomitmen menghadirkan pembelajaran berpusat pada siswa dalam iklim kelas yang aman dan inklusif, guna membentuk pembelajar sepanjang hayat yang bernalar kritis, kreatif, cakap digital, dan berakhlak mulia.&rdquo;
            </p>

            <div className="visi-pillars">
              <div className="visi-pillar-item">
                <span className="pillar-dot"></span>
                <div>
                  <strong>Visi Pendidikan Indonesia yang Inklusif & Berkeadilan</strong>
                  <span>Menuntun setiap peserta didik sesuai kodrat alam dan kodrat zaman agar memperoleh akses setara terhadap pembelajaran bermakna, kesejahteraan psikologis (<em>student well-being</em>), dan karakter Profil Pelajar Pancasila.</span>
                </div>
              </div>
              <div className="visi-pillar-item">
                <span className="pillar-dot"></span>
                <div>
                  <strong>Pamong, Fasilitator, & Agen Perubahan</strong>
                  <span>Menghadirkan pembelajaran berpusat pada siswa (<em>student-centered learning</em>) dalam iklim kelas yang aman, nyaman, dan ramah anak.</span>
                </div>
              </div>
              <div className="visi-pillar-item">
                <span className="pillar-dot"></span>
                <div>
                  <strong>Praktisi Reflektif & Adaptif Teknologi Abad 21</strong>
                  <span>Mengembangkan diri secara berkelanjutan serta mengintegrasikan inovasi teknologi digital untuk menumbuhkan nalar kritis, kreativitas, dan akhlak mulia.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="misi-card">
            <div className="vm-card-badge">
              <span className="vm-badge-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </span>
              <span>MISI & LANGKAH KONKRET MENCAPAI VISI</span>
            </div>

            <ul className="misi-list">
              <li className="misi-item">
                <span className="misi-number">01</span>
                <div className="misi-content">
                  <strong>Menerapkan Pembelajaran Berdiferensiasi</strong>
                  <p>Melakukan pemetaan awal melalui asesmen diagnostik kognitif dan non-kognitif untuk merancang pembelajaran yang mengakomodasi kesiapan, minat, dan gaya belajar peserta didik.</p>
                </div>
              </li>
              <li className="misi-item">
                <span className="misi-number">02</span>
                <div className="misi-content">
                  <strong>Mengintegrasikan Pembelajaran Sosial Emosional (PSE)</strong>
                  <p>Membangun kesadaran diri (<em>mindfulness</em>), empati, dan ketahanan emosional peserta didik melalui budaya positif sekolah serta integrasi PSE dalam Modul Ajar.</p>
                </div>
              </li>
              <li className="misi-item">
                <span className="misi-number">03</span>
                <div className="misi-content">
                  <strong>Melakukan Refleksi & Riset Aksi Secara Berkelanjutan</strong>
                  <p>Menggunakan artefak pembelajaran sebagai bahan evaluasi reflektif serta melaksanakan Penelitian Tindakan Kelas (PTK) guna menyelesaikan persoalan nyata di kelas.</p>
                </div>
              </li>
              <li className="misi-item">
                <span className="misi-number">04</span>
                <div className="misi-content">
                  <strong>Pemanfaatan Teknologi Digital & Inovasi Pembelajaran</strong>
                  <p>Memanfaatkan platform digital dan media interaktif berbasis web/<em>cloud</em> (seperti <em>Google Colab</em> dan simulator <em>NetLab</em>) untuk menciptakan pengalaman belajar abad ke-21 yang menarik dan inklusif.</p>
                </div>
              </li>
              <li className="misi-item">
                <span className="misi-number">05</span>
                <div className="misi-content">
                  <strong>Membangun Komunitas Belajar (Kolaborasi Ekosistem)</strong>
                  <p>Berpartisipasi aktif dalam Komunitas Belajar (Kombel) dan MGMP, serta menjalin kemitraan erat dengan guru pamong, rekan sejawat, dan orang tua demi mendukung tumbuh kembang siswa secara inklusif.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

