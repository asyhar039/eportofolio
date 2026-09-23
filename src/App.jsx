import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import ReflectionDetail from './components/ReflectionDetail'
import Gallery from './components/Gallery'
import Artifacts from './components/Artifacts'
import Footer from './components/Footer'

function App() {
  const [currentPage, setCurrentPage] = useState('beranda')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedReflection, setSelectedReflection] = useState(null)

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSelectedCourse(null)
    setSelectedReflection(null)
    window.scrollTo(0, 0)
  }

  const handleViewCourse = (course) => {
    setSelectedCourse(course)
    setSelectedReflection(null)
    setCurrentPage('course-detail')
    window.scrollTo(0, 0)
  }

  const handleViewReflection = (reflectionData) => {
    setSelectedReflection(reflectionData)
    setSelectedCourse(null)
    setCurrentPage('reflection-detail')
    window.scrollTo(0, 0)
  }

  const renderPage = () => {
    if (currentPage === 'course-detail' && selectedCourse) {
      return <CourseDetail course={selectedCourse} onBack={() => handleNavigate('matkul')} />
    }

    if (currentPage === 'reflection-detail' && selectedReflection) {
      return <ReflectionDetail {...selectedReflection} onBack={() => handleNavigate('matkul')} />
    }

    const pages = {
      beranda: <Hero onNavigate={handleNavigate} />,
      tentang: <About />,
      perjalanan: <Journey />,
      matkul: <Courses onViewCourse={handleViewCourse} onViewReflection={handleViewReflection} />,
      galeri: <Gallery />,
      artifak: <Artifacts />
    }

    return pages[currentPage] || pages.beranda
  }

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  )
}

export default App
