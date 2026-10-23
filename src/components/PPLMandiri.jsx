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
          <span style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem' }}>
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

              <strong style={{ fontSize: '0.85rem', color: '#0b1e36', display: 'block', marginBottom: '8px' }}>
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
                    <span style={{ color: '#059669', marginTop: '2px' }}><IconCheck size={13} /></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <button
                className="btn btn-secondary"
                style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
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
            <div className="ppl-ref-card" style={{ borderColor: '#bbf7d0', background: '#f0fdf4' }}>
              <span className="ppl-ref-badge success">KEBERHASILAN UTAMA (A.1)</span>
              <h4>{pplReflectionLK3.sections[0].title}</h4>
              <p>{pplReflectionLK3.sections[0].content}</p>
            </div>

            <div className="ppl-ref-card" style={{ borderColor: '#fecdd3', background: '#fff1f2' }}>
              <span className="ppl-ref-badge challenge">KENDALA KELAS & TANTANGAN (A.2)</span>
              <h4>{pplReflectionLK3.sections[1].title}</h4>
              <p>{pplReflectionLK3.sections[1].content}</p>
            </div>

            <div className="ppl-ref-card" style={{ borderColor: '#bfdbfe', background: '#eff6ff' }}>
              <span className="ppl-ref-badge feedback">ARAHAN PAMONG & DPL (B.1)</span>
              <h4>{pplReflectionLK3.sections[2].title}</h4>
              <p>{pplReflectionLK3.sections[2].content}</p>
            </div>

            <div className="ppl-ref-card" style={{ borderColor: '#fed7aa', background: '#fff7ed' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800' }}>
                Projek Kepemimpinan Mahasiswa PPG Tim A2
              </span>
              <h2 style={{ fontSize: '1.6rem', color: '#0b1e36', margin: '12px 0 8px' }}>
                Transformasi Presensi Digital Berbasis QR Code di SMAN 11 Yogyakarta
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.65' }}>
                Inisiatif nyata calon guru Informatika dalam mengatasi bottleneck kehadiran konvensional di SMA Kebangsaan 11 Yogyakarta. Melalui pemindaian kartu tanda pelajar ber-QR Code secara instan, data langsung tercatat di server sekolah tanpa kertas.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#059669' }}><IconCheck size={16} /></span>
                  <span style={{ fontSize: '0.9rem', color: '#334155' }}>Pemindaian instan &lt;2 detik per siswa menggunakan web camera</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#059669' }}><IconCheck size={16} /></span>
                  <span style={{ fontSize: '0.9rem', color: '#334155' }}>Rekapitulasi otomatis tersimpan ke spreadsheet sekolah</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#059669' }}><IconCheck size={16} /></span>
                  <span style={{ fontSize: '0.9rem', color: '#334155' }}>Diujicobakan sukses pada 6 kelas di SMAN 11 Yogyakarta</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: '#0b1e36', margin: '0 0 14px' }}>Matriks Keberhasilan Projek di SMAN 11</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1d6fa5', display: 'block' }}>60%</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Waktu Presensi Lebih Hemat</span>
                </div>
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#059669', display: 'block' }}>100%</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Data Real-Time Akurat</span>
                </div>
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#d97706', display: 'block' }}>0 Lembar</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Kertas Absensi Terbuang</span>
                </div>
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0b1e36', display: 'block' }}>6 Kelas</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Target Uji Coba Lapangan</span>
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
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1d6fa5' }}>KODE PERANGKAT: {selectedArtifact.code}</span>
                  <p style={{ margin: '6px 0 0', color: '#334155', fontSize: '0.92rem', lineHeight: '1.6' }}>{selectedArtifact.summary}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: '#0b1e36', margin: '0 0 10px' }}>Sorotan Fitur & Metodologi Perangkat</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedArtifact.highlights.map((h, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: '#334155' }}>
                        <span style={{ color: '#059669', marginTop: '2px' }}><IconCheck size={14} /></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedArtifact.sections && (
                  <div>
                    <h4 style={{ color: '#0b1e36', margin: '0 0 12px' }}>Uraian Komponen Modul Ajar</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedArtifact.sections.map((sec, idx) => (
                        <div key={idx} style={{ background: '#f1f5f9', padding: '14px 18px', borderRadius: '10px' }}>
                          <strong style={{ color: '#0b1e36', display: 'block', marginBottom: '4px' }}>{sec.heading}</strong>
                          <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: '1.55' }}>{sec.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="seminar-modal-foot">
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Perangkat Ajar Resmi PPL SMAN 11 Yogyakarta • Asyhar Qowiim
                </span>
                <button
                  onClick={() => setSelectedArtifact(null)}
                  style={{
                    padding: '8px 20px',
                    background: '#0b1e36',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.85rem'
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
