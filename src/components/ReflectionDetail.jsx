import React from 'react'
import './CourseDetail.css'

function ReflectionDetail({ reflection, course, onBack }) {
    if (!reflection || !course) return null

    const isSemester2 = course.semester === 2
    const pdfUrl = isSemester2
        ? '/assets/seminar/lk-2-semester-2.pdf'
        : '/assets/seminar/lk-2-semester-1.pdf'
    const pdfName = isSemester2
        ? 'LK 2 Refleksi Pembelajaran Semester 2.pdf'
        : 'LK 2 Refleksi Pembelajaran Semester 1.pdf'
    const pdfSize = isSemester2 ? '178 KB' : '78 KB'

    const courseCode = course.semester === 2
        ? `MATKUL-S2-${(parseInt(course.number, 10) - 6).toString().padStart(2, '0')}`
        : `MATKUL-S1-${course.number.toString().padStart(2, '0')}`

    const sections = [
        ['Connection (Keterkaitan)', reflection.connection],
        ['Challenge (Tantangan)', reflection.challenge],
        ['Concept (Konsep Utama)', reflection.concept],
        ['Change (Perubahan)', reflection.change]
    ]

    return (
        <section className="course-detail-page">
            <div className="course-detail-container">
                <button className="back-button" onClick={onBack}>
                    <span>←</span> Kembali ke Matkul
                </button>

                <div className="course-detail-header">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                        <span className="detail-eyebrow" style={{ margin: 0 }}>REFLEKSI PEMBELAJARAN (MODEL 4C)</span>
                        <span style={{
                            fontSize: '0.75rem',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            background: 'rgba(0, 217, 255, 0.15)',
                            color: '#00d9ff',
                            fontWeight: 700,
                            letterSpacing: '0.5px'
                        }}>
                            {courseCode}
                        </span>
                    </div>
                    <h1>{course.title}</h1>
                </div>

                <div className="course-detail-content">
                    <div className="detail-section">
                        <h2>{reflection.topic}</h2>

                        {/* PDF Quick Banner */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            background: 'rgba(0, 217, 255, 0.08)',
                            border: '1px solid rgba(0, 217, 255, 0.25)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            marginBottom: '28px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '1.4rem' }}>📄</span>
                                <div>
                                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>{pdfName}</strong>
                                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Dokumen Resmi LK 2 ({pdfSize}) • Sesuai Berkas Asli</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: '#fff',
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.82rem',
                                        fontWeight: 600,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Preview
                                </a>
                                <a
                                    href={pdfUrl}
                                    download={pdfName}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: '#00d9ff',
                                        color: '#0a0e17',
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Unduh File
                                </a>
                            </div>
                        </div>

                        <div className="topics-grid">
                            {sections.map(([title, content]) => (
                                <div key={title} className="topic-card reflection-card">
                                    <h3>{title}</h3>
                                    <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="reflection-artifacts">
                        <h3>Analisis Artefak Pembelajaran</h3>
                        <ol>
                            {reflection.artifacts && reflection.artifacts.map((artifact, index) => {
                                if (typeof artifact === 'object' && artifact !== null) {
                                    return (
                                        <li key={index}>
                                            <strong>{artifact.label || `Artefak ${index + 1}`}</strong>
                                            {artifact.question && (
                                                <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>
                                                    {artifact.question}
                                                </div>
                                            )}
                                            <span style={{ whiteSpace: 'pre-line' }}>{artifact.answer || artifact.text}</span>
                                        </li>
                                    )
                                }
                                return (
                                    <li key={index}>
                                        <strong>Artefak {index + 1}</strong>
                                        <span style={{ whiteSpace: 'pre-line' }}>{artifact}</span>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReflectionDetail