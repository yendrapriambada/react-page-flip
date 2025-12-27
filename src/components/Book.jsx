import React, { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import CoverPage from './pages/CoverPage'
import AnnouncementPage from './pages/AnnouncementPage'
import StudentFieldPage from './pages/StudentFieldPage'
import TeacherTaskPage from './pages/TeacherTaskPage'
import ContextPage from './pages/ContextPage'
import SpeechTextPage from './pages/SpeechTextPage'
import SolutionEvaluationPage from './pages/SolutionEvaluationPage'
import TechnologyImpactPage from './pages/TechnologyImpactPage'
import ObservationSpeechPage from './pages/ObservationSpeechPage'
import GroupDataPage from './pages/GroupDataPage'
import GraphAnalysisPage from './pages/GraphAnalysisPage'
import VideoGalleryPage from './pages/VideoGalleryPage'
import ExpertOpinionPage from './pages/ExpertOpinionPage'
import IntroImagePage from './pages/IntroImagePage'
import ExperiencePage from './pages/ExperiencePage'
import QuestionPage from './pages/QuestionPage'
import AnswerFormPage from './pages/AnswerFormPage'

function Book() {
  const bookRef = useRef(null)
  const [story, setStory] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const [pageSize, setPageSize] = useState({
    width: 450,
    height: 570,
  })

  useEffect(() => {
    const updateSize = () => {
      const viewportWidth = window.innerWidth
      const aspectRatio = 570 / 450

      let width

      if (viewportWidth <= 640) {
        width = Math.max(260, viewportWidth * 0.9)
      } else if (viewportWidth <= 1024) {
        width = Math.min(Math.max(320, viewportWidth * 0.5), 480)
      } else {
        width = Math.min(Math.max(360, viewportWidth * 0.35), 520)
      }

      const height = width * aspectRatio

      setPageSize({
        width,
        height,
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  const handlePrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev()
    }
  }

  const handleNext = () => {
    if (bookRef.current) {
      const pageFlip = bookRef.current.pageFlip()
      if (pageFlip) {
        const current = pageFlip.getCurrentPageIndex()
        const total = pageFlip.getPageCount()
        // Prevent looping: only flip if not at the last page
        // Note: page index is 0-based.
        // For double page view, we might need to be careful, but flipNext handles it usually.
        // However, if the user experiences looping, explicitly checking is safer.
        if (current < total - 1) {
          pageFlip.flipNext()
        }
      }
    }
  }

  const handleStoryChange = (event) => {
    setStory(event.target.value)
  }

  return (
    <div className="flipbook-layout">
      <header className="flipbook-header">
        <h1 className="flipbook-title">
          <span>Interactive</span>{' '}
          <span className="flipbook-title-accent">Flipbook</span>
        </h1>
        <p className="flipbook-subtitle">
          Pengalaman membaca digital yang interaktif dengan berbagai jenis konten
        </p>
      </header>

      <HTMLFlipBook
        ref={bookRef}
        width={pageSize.width}
        height={pageSize.height}
        minWidth={280}
        maxWidth={450}
        minHeight={380}
        maxHeight={600}
        size="stretch"
        maxShadowOpacity={0.7}
        flippingTime={400}
        drawShadow
        showCover
        showPageCorners
        mobileScrollSupport
        disableFlipByClick={false}
        swipeDistance={80}
        useMouseEvents={true}
        className="flipbook-book"
      >
        <CoverPage />
        
        <StudentFieldPage />
        <TeacherTaskPage />
        <ContextPage />
        
        {/* <IntroImagePage /> */}
        {/* <ExperiencePage story={story} onStoryChange={handleStoryChange} /> */}
        <AnswerFormPage />
        <SpeechTextPage />
        <ExpertOpinionPage />
        <SolutionEvaluationPage />
        <TechnologyImpactPage />
        <ObservationSpeechPage />
        <GroupDataPage />
        <GraphAnalysisPage />
        <VideoGalleryPage />
        <AnnouncementPage />
        {/* <QuestionPage /> */}
      </HTMLFlipBook>

      <footer className="flipbook-footer">
        <div className="flipbook-nav">
          <button
            type="button"
            className="nav-button nav-button-secondary"
            onClick={handlePrev}
          >
            <span className="nav-icon">‹</span>
            <span>Sebelumnya</span>
          </button>
          <button
            type="button"
            className="nav-button nav-button-primary"
            onClick={handleNext}
          >
            <span>Selanjutnya</span>
            <span className="nav-icon nav-icon-right">›</span>
          </button>
        </div>
        <p className="flipbook-tip">
          Tip: Klik atau geser halaman untuk membalik
        </p>
      </footer>
    </div>
  )
}

export default Book
