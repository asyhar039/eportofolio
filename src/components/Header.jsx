import React, { useState, useEffect, useRef } from 'react'
import './Header.css'

function Header({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  const navigate = (id) => {
    onNavigate(id)
    setIsMenuOpen(false)
  }

  const menuItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'perjalanan', label: 'Perjalanan' },
    { id: 'matkul', label: 'Matkul' },
    { id: 'seminar', label: 'Seminar' },
    { id: 'ppl-mandiri', label: 'PPL Mandiri SMAN 11 Yogyakarta' },
    { id: 'artifak', label: 'Artefak' },
    { id: 'galeri', label: 'Galeri' }
  ]

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav ref={navRef} className="navbar" aria-label="Navigasi utama">
        <button 
          className="brand" 
          onClick={() => navigate('beranda')}
          aria-label="Beranda Portofolio PPG Asyhar Qowiim"
        >
          <div className="header-logos" title="Universitas Negeri Yogyakarta • PPG">
            <img src="/assets/logo-uny.png" alt="Logo UNY" className="header-logo uny-logo" />
            <img src="/assets/logo-ppg.png" alt="Logo PPG" className="header-logo ppg-logo" />
          </div>
          <div className="brand-title-group">
            <span className="brand-mark">AQ.</span>
            <span className="brand-text">Portofolio.</span>
          </div>
        </button>

        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu navigasi"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'show' : ''}`}>
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                type="button"
                className={currentPage === item.id ? 'active' : ''}
                onClick={() => navigate(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
