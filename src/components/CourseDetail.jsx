import React from 'react'
import './CourseDetail.css'

function CourseDetail({ course, onBack }) {
  if (!course?.detail) return null

  return (
    <section className="course-detail-page">
      <div className="course-detail-container">
        <button className="back-button" onClick={onBack}>
          <span>←</span> Kembali ke Matkul
        </button>

        <div className="course-detail-header">
          <span className="detail-eyebrow">MATA KULIAH DETAIL</span>
          <h1>{course.detail.fullTitle}</h1>
        </div>

        <div className="course-detail-content">
          <div className="detail-section">
            <h2>Deskripsi Mata Kuliah</h2>
            <p>{course.detail.fullDescription}</p>
          </div>

          <div className="detail-section">
            <h2>Topik dan Tujuan Pembelajaran</h2>
            <div className="topics-grid">
              {course.detail.topics.map((topic, idx) => (
                <div key={idx} className="topic-card">
                  <div className="topic-number">{idx + 1}</div>
                  <h3>{topic.name}</h3>

                  {topic.learningObjectives && (
                    <div className="objectives-section">
                      <h4>Tujuan Pembelajaran</h4>
                      <ul className="objectives-list">
                        {topic.learningObjectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {topic.cpmk && (
                    <div className="objectives-section">
                      <h4>Capaian Pembelajaran Mata Kuliah (CPMK)</h4>
                      <ul className="objectives-list">
                        {topic.cpmk.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {topic.subCpmk && (
                    <div className="objectives-section">
                      <h4>Sub Capaian Pembelajaran Mata Kuliah (Sub CPMK)</h4>
                      <ul className="objectives-list">
                        {topic.subCpmk.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseDetail
