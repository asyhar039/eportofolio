import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Asyhar Qowiim</h2>
          <p>Portofolio Pendidikan Profesi Guru • Informatika</p>
        </div>

        <p className="footer-reflection">
          Setiap proses adalah bagian dari perjalanan menjadi guru. PPG bukan hanya tentang menyelesaikan program, tetapi tentang belajar memahami pembelajaran, mengenali diri, menerima refleksi, dan terus bertumbuh sebagai seorang pendidik.
        </p>

        <div className="footer-logos">
          <img src="/assets/logo-uny.png" alt="Logo UNY" className="footer-logo" />
          <img src="/assets/logo-ppg.png" alt="Logo PPG" className="footer-logo" />
          <img src="/assets/logo-ppg-calon-guru.jpeg" alt="Logo PPG Calon Guru" className="footer-logo footer-logo-badge" />
        </div>

        <p className="copyright">© 2026 Asyhar Qowiim | 25105260081 | INFORMATIKA.</p>
      </div>
    </footer>
  )
}

export default Footer
