import React from 'react'
import './CourseDetail.css'

function ReflectionDetail({ reflection, course, onBack }) {
    if (!reflection || !course) return null

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
                    <span className="detail-eyebrow">REFLEKSI PEMBELAJARAN</span>
                    <h1>{course.title}</h1>
                </div>

                <div className="course-detail-content">
                    <div className="detail-section">
                        <h2>{reflection.topic}</h2>
                        <div className="topics-grid">
                            {sections.map(([title, content]) => (
                                <div key={title} className="topic-card reflection-card">
                                    <h3>{title}</h3>
                                    <p>{content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="reflection-artifacts">
                        <h3>Analisis Artefak Pembelajaran</h3>
                        <ol>
                            {reflection.artifacts.map((artifact, index) => (
                                <li key={artifact}>
                                    <strong>Artefak {index + 1}</strong>
                                    <span>{artifact}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReflectionDetail