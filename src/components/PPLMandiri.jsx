import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import './PPLMandiri.css'
import {
  pplSchoolProfile,
  pplPhases,
  pplTeachingArtifacts,
  pplReflectionLK3,
  pplGalleryActivities
} from '../data/pplMandiriData'

// Modern Minimalist SVG Icons
const IconSchool = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m4 6 8-4 8 4" />
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
    <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
    <path d="M18 5v17" />
    <path d="M6 5v17" />
    <circle cx="12" cy="9" r="2" />
  </svg>
)

const IconLayers = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const IconDoc = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const IconCompass = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
)

const IconQr = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const IconCamera = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const IconCheck = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconExternal = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const IconClose = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

function PPLMandiri() {
  const [activeTab, setActiveTab] = useState('alur') // 'alur' | 'perangkat' | 'refleksi' | 'inovasi' | 'galeri'
  const [selectedArtifact, setSelectedArtifact] = useState(null)

  return (
    <section id="ppl-mandiri" className="ppl-section">
      <span className="ppl-section-eyebrow">06 · PPL MANDIRI SMAN 11 YOGYAKARTA</span>

      {/* Hero Banner */}
      <div className="ppl-hero-banner">
        <div className="ppl-badge-top">
          <span className="pulse-dot"></span>
          Praktik Pengalaman Lapangan (PPL) Mandiri
        </div>
        <h1>PPL Mandiri SMAN 11 Yogyakarta</h1>
        <p>
          Dokumentasi komprehensif seluruh tahapan praktik asistensi mengajar terbimbing, praktik pengajaran mandiri di kelas Informatika (Fase E & F), perancangan modul ajar kontekstual, penerapan inovasi presensi QR Code, dan refleksi evaluatif bersama Guru Pamong serta DPL di SMA Negeri 11 Yogyakarta (SMA Kebangsaan).
        </p>

        <div className="ppl-stakeholders-grid">
          <div className="ppl-stakeholder-card">
            <span className="ppl-stakeholder-label">Sekolah Mitra PPL</span>
            <strong>{pplSchoolProfile.name}</strong>
            <span>{pplSchoolProfile.address}</span>
          </div>

          <div className="ppl-stakeholder-card">
            <span className="ppl-stakeholder-label">Guru Pamong Informatika</span>
            <strong>{pplSchoolProfile.guruPamong}</strong>
            <span>{pplSchoolProfile.pamongRole}</span>
          </div>

          <div className="ppl-stakeholder-card">
            <span className="ppl-stakeholder-label">Dosen Pembimbing Lapangan</span>
            <strong>{pplSchoolProfile.dpl}</strong>
            <span>{pplSchoolProfile.dplRole}</span>
          </div>

          <div className="ppl-stakeholder-card">
            <span className="ppl-stakeholder-label">Mahasiswa Praktikan</span>
            <strong>{pplSchoolProfile.studentPraktikan}</strong>
            <span>NIM: {pplSchoolProfile.nim} • PPG UNY</span>
          </div>
        </div>
      </div>

      {/* Profile & Key Stats Strip */}
      <div className="ppl-school-card">
        <div className="ppl-school-header">
          <div>
            <h2>Kemitraan Praktik Persekolahan Berkualitas</h2>
            <p>{pplSchoolProfile.motto}</p>
          </div>
          <span style={{ background: 'rgba(16, 185, 129, 0.18)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '6px 16px', borderRadius: '10px', fontWeight: '700', fontSize: '0.84rem' }}>
            {pplSchoolProfile.period}
          </span>
        </div>

        <div className="ppl-stats-badges">
          {pplSchoolProfile.keyStats.map((st, idx) => (
            <div key={idx} className="ppl-stat-item">
              <span className="ppl-stat-val">{st.value}</span>
              <span className="ppl-stat-lbl">{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="ppl-tabs-nav" role="tablist">
        <button
          className={`ppl-tab-btn ${activeTab === 'alur' ? 'active' : ''}`}
          onClick={() => setActiveTab('alur')}
        >
          <IconLayers size={18} />
          <span>Alur & Tahapan Pelaksanaan</span>
        </button>

        <button
          className={`ppl-tab-btn ${activeTab === 'perangkat' ? 'active' : ''}`}
          onClick={() => setActiveTab('perangkat')}
        >
          <IconDoc size={18} />
          <span>Perangkat Ajar & Modul</span>
        </button>

        <button
          className={`ppl-tab-btn ${activeTab === 'refleksi' ? 'active' : ''}`}
          onClick={() => setActiveTab('refleksi')}
        >
          <IconCompass size={18} />
          <span>Refleksi Praktik (LK 3 PPLM)</span>
        </button>

        <button
          className={`ppl-tab-btn ${activeTab === 'inovasi' ? 'active' : ''}`}
          onClick={() => setActiveTab('inovasi')}
        >
          <IconQr size={18} />
          <span>Inovasi Presensi QR Code</span>
        </button>

        <button
          className={`ppl-tab-btn ${activeTab === 'galeri' ? 'active' : ''}`}
          onClick={() => setActiveTab('galeri')}
        >
          <IconCamera size={18} />
          <span>Catatan Lapangan & Dokumentasi</span>
        </button>
      </div>

      {/* TAB 1: ALUR & TAHAPAN PPL */}
      {activeTab === 'alur' && (
        <div className="ppl-timeline-container">
          {pplPhases.map((phase) => (
            <div key={phase.phase} className="ppl-phase-card">
              <div className="ppl-phase-top">
                <span className="ppl-phase-num">{phase.phase}</span>
                <span className="ppl-phase-period">{phase.period}</span>
              </div>
              <h3 className="ppl-phase-title">{phase.title}</h3>
              <p className="ppl-phase-desc">{phase.description}</p>

              <strong style={{ fontSize: '0.88rem', color: '#34d399', display: 'block', marginBottom: '10px' }}>
                Hasil Capaian & Artefak Terwujud:
              </strong>
              <ul className="ppl-outcomes-list">
                {phase.outcomes.map((out, idx) => (
                  <li key={idx}>
                    <span className="ppl-check-bullet"><IconCheck size={14} /></span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: PERANGKAT AJAR & MODUL */}
      {activeTab === 'perangkat' && (
        <div className="ppl-artifacts-grid">
          {pplTeachingArtifacts.map((art) => (
            <article key={art.id} className="ppl-artifact-card">
              <div className="ppl-art-badge-wrap">
                <span className="ppl-art-code">{art.code}</span>
                <span className="ppl-art-class">{art.targetClass}</span>
              </div>

              <h3 className="ppl-art-title">{art.title}</h3>
              <p className="ppl-art-summary">{art.summary}</p>

              <ul className="ppl-art-highlights">
                {art.highlights.map((h, idx) => (
                  <li key={idx}>
                    <span style={{ color: '#34d399', marginTop: '2px' }}><IconCheck size={13} /></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <button
                className="ppl-open-scenario-btn"
                style={{ marginTop: 'auto' }}
                onClick={() => setSelectedArtifact(art)}
              >
                <span>Lihat Uraian Skenario Perangkat</span>
                <IconExternal size={14} />
              </button>
            </article>
          ))}
        </div>
      )}

      {/* TAB 3: REFLEKSI PRAKTIK MENGAJAR (LK 3 PPLM) */}
      {activeTab === 'refleksi' && (
        <div className="ppl-reflection-block">
          <div className="ppl-ref-header">
            <h3>{pplReflectionLK3.documentTitle}</h3>
            <div className="ppl-ref-meta">
              <span>Sekolah: <strong>{pplReflectionLK3.school}</strong></span>
              <span>Guru Pamong: <strong>{pplReflectionLK3.pamong}</strong></span>
              <span>DPL: <strong>{pplReflectionLK3.dpl}</strong></span>
              <span>Tanggal Pengesahan: <strong>{pplReflectionLK3.signDate}</strong></span>
            </div>
          </div>

          <div className="ppl-ref-cards-grid">
            <div className="ppl-ref-card" style={{ borderColor: 'rgba(16, 185, 129, 0.35)', background: 'rgba(16, 185, 129, 0.08)' }}>
              <span className="ppl-ref-badge success">KEBERHASILAN UTAMA (A.1)</span>
              <h4>{pplReflectionLK3.sections[0].title}</h4>
              <p>{pplReflectionLK3.sections[0].content}</p>
            </div>

            <div className="ppl-ref-card" style={{ borderColor: 'rgba(244, 63, 94, 0.35)', background: 'rgba(244, 63, 94, 0.08)' }}>
              <span className="ppl-ref-badge challenge">KENDALA KELAS & TANTANGAN (A.2)</span>
              <h4>{pplReflectionLK3.sections[1].title}</h4>
              <p>{pplReflectionLK3.sections[1].content}</p>
            </div>

            <div className="ppl-ref-card" style={{ borderColor: 'rgba(56, 189, 248, 0.35)', background: 'rgba(56, 189, 248, 0.08)' }}>
              <span className="ppl-ref-badge feedback">ARAHAN PAMONG & DPL (B.1)</span>
              <h4>{pplReflectionLK3.sections[2].title}</h4>
              <p>{pplReflectionLK3.sections[2].content}</p>
            </div>

            <div className="ppl-ref-card" style={{ borderColor: 'rgba(251, 146, 60, 0.35)', background: 'rgba(251, 146, 60, 0.08)' }}>
              <span className="ppl-ref-badge action">RENCANA AKSI PERBAIKAN (B.2)</span>
              <h4>{pplReflectionLK3.sections[3].title}</h4>
              <p>{pplReflectionLK3.sections[3].content}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INOVASI PRESENSI QR CODE DI SMAN 11 */}
      {activeTab === 'inovasi' && (
        <div className="ppl-school-card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            <div>
              <span style={{ background: 'rgba(0, 217, 255, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 217, 255, 0.35)', padding: '4px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Projek Kepemimpinan Mahasiswa PPG Tim A2
              </span>
              <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '14px 0 10px', fontWeight: '800', lineHeight: '1.3' }}>
                Transformasi Presensi Digital Berbasis QR Code di SMAN 11 Yogyakarta
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                Inisiatif nyata calon guru Informatika dalam mengatasi bottleneck kehadiran konvensional di SMA Kebangsaan 11 Yogyakarta. Melalui pemindaian kartu tanda pelajar ber-QR Code secara instan, data langsung tercatat di server sekolah tanpa kertas.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '22px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--accent-cyan, #00D9FF)' }}><IconCheck size={16} /></span>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>Pemindaian instan &lt;2 detik per siswa menggunakan web camera</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--accent-cyan, #00D9FF)' }}><IconCheck size={16} /></span>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>Rekapitulasi otomatis tersimpan ke spreadsheet sekolah</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--accent-cyan, #00D9FF)' }}><IconCheck size={16} /></span>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>Diujicobakan sukses pada 6 kelas di SMAN 11 Yogyakarta</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h4 style={{ color: '#ffffff', margin: '0 0 16px', fontSize: '1.05rem', fontWeight: '700' }}>Matriks Keberhasilan Projek di SMAN 11</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-cyan, #00D9FF)', display: 'block' }}>60%</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Waktu Presensi Lebih Hemat</span>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-cyan, #00D9FF)', display: 'block' }}>100%</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Data Real-Time Akurat</span>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fbbf24', display: 'block' }}>0 Lembar</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Kertas Absensi Terbuang</span>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', display: 'block' }}>6 Kelas</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Target Uji Coba Lapangan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DOKUMENTASI & CATATAN LAPANGAN */}
      {activeTab === 'galeri' && (
        <div className="ppl-gallery-grid">
          {pplGalleryActivities.map((act, idx) => (
            <div key={idx} className="ppl-gallery-card">
              <span className="ppl-gal-tag">{act.category}</span>
              <h4>{act.title}</h4>
              <p>{act.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail Perangkat Pembelajaran */}
      {selectedArtifact &&
        createPortal(
          <div className="seminar-modal-backdrop" onClick={() => setSelectedArtifact(null)} role="dialog">
            <div className="seminar-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="seminar-modal-head">
                <div className="seminar-modal-title-wrap">
                  <h2>{selectedArtifact.title}</h2>
                  <p>{selectedArtifact.targetClass} • Alokasi: {selectedArtifact.allocation}</p>
                </div>
                <button className="seminar-modal-close-btn" onClick={() => setSelectedArtifact(null)}>
                  <IconClose size={16} />
                  <span>Tutup</span>
                </button>
              </div>

              <div className="seminar-modal-body">
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '18px 22px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-cyan, #00D9FF)', letterSpacing: '0.6px' }}>KODE PERANGKAT: {selectedArtifact.code}</span>
                  <p style={{ margin: '8px 0 0', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.92rem', lineHeight: '1.65' }}>{selectedArtifact.summary}</p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ color: '#ffffff', margin: '0 0 12px', fontSize: '1.05rem', fontWeight: '700' }}>Sorotan Fitur & Metodologi Perangkat</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedArtifact.highlights.map((h, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                        <span style={{ color: 'var(--accent-cyan, #00D9FF)', marginTop: '2px' }}><IconCheck size={14} /></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedArtifact.sections && (
                  <div>
                    <h4 style={{ color: '#ffffff', margin: '0 0 14px', fontSize: '1.05rem', fontWeight: '700' }}>Uraian Komponen Modul Ajar</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedArtifact.sections.map((sec, idx) => (
                        <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          <strong style={{ color: 'var(--accent-cyan, #00D9FF)', display: 'block', marginBottom: '6px', fontSize: '0.95rem' }}>{sec.heading}</strong>
                          <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.9rem', lineHeight: '1.6' }}>{sec.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="seminar-modal-foot">
                <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                  Perangkat Ajar Resmi PPL SMAN 11 Yogyakarta • Asyhar Qowiim
                </span>
                <button
                  onClick={() => setSelectedArtifact(null)}
                  style={{
                    padding: '9px 22px',
                    background: 'linear-gradient(135deg, var(--accent-blue, #1D6FA5), #0284c7)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                    boxShadow: '0 4px 14px rgba(29, 111, 165, 0.4)'
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}

export default PPLMandiri
