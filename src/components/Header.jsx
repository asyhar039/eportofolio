import React, { useState, useEffect } from 'react'
import './Header.css'

function Header({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigate = (id) => {
    onNavigate(id)
    setIsMenuOpen(false)
  }

  const menuItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'perjalanan', label: 'Perjalanan' },
    { id: 'matkul', label: 'Matkul' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'artifak', label: 'Artifak' }
  ]

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar" aria-label="Navigasi utama">
        <button 
          className="brand" 
          onClick={() => navigate('beranda')}
          aria-label="Beranda"
        >
          <span className="brand-mark">AQ.</span>
          <span className="brand-text">Portfolio.</span>
        </button>

        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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
