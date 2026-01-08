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
import ExpertSelectionPage from './pages/ExpertSelectionPage'
import IntroImagePage from './pages/IntroImagePage'
import ExperiencePage from './pages/ExperiencePage'
import QuestionPage from './pages/QuestionPage'
import PresentationTopicPage from './pages/PresentationTopicPage'
import AnswerFormPage from './pages/AnswerFormPage'
import PresentationInstructionLeftPage from './pages/PresentationInstructionLeftPage'
import PresentationInstructionRightPage from './pages/PresentationInstructionRightPage'
import JournalPortraitPage from './pages/JournalPortraitPage'
  import MediaIdentificationSpeechPage from './pages/MediaIdentificationSpeechPage'
import BreakingNewsPage from './pages/BreakingNewsPage'
import DigitalResourcePage from './pages/DigitalResourcePage'
import DigitalResourceLeftPage from './pages/DigitalResourceLeftPage'
import DigitalResourceRightPage from './pages/DigitalResourceRightPage'
import DigitalResourceQuestionPage from './pages/DigitalResourceQuestionPage'
import PosterAppsLeftPage from './pages/PosterAppsLeftPage'
import PosterTaskRightPage from './pages/PosterTaskRightPage'
import AnswerReportPage from './pages/AnswerReportPage'
import BackCoverPage from './pages/BackCoverPage'
import { AnswersProvider } from '../context/AnswersContext'

function Book() {
  const bookRef = useRef(null)
  const prevIndexRef = useRef(0)
  const [story, setStory] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize, setPageSize] = useState({
    width: 600,
    height: 760,
  })

  useEffect(() => {
    const updateSize = () => {
      const viewportWidth = window.innerWidth
      const aspectRatio = 570 / 450

      let width

      if (viewportWidth <= 640) {
        width = Math.max(280, viewportWidth * 0.95)
      } else if (viewportWidth <= 1024) {
        width = Math.min(Math.max(380, viewportWidth * 0.6), 640)
      } else {
        width = Math.min(Math.max(420, viewportWidth * 0.48), 720)
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
      const pageFlip = bookRef.current.pageFlip()
      if (pageFlip) {
        const current = pageFlip.getCurrentPageIndex()
        if (current > 0) {
          pageFlip.flipPrev()
        }
      }
    }
  }

  const handleNext = () => {
    if (bookRef.current) {
      const pageFlip = bookRef.current.pageFlip()
      if (pageFlip) {
        const current = pageFlip.getCurrentPageIndex()
        const total = pageFlip.getPageCount()
        const pages = Array.from(document.querySelectorAll('.page'))
        const currentPageEl = pages[current]
        let hasEmpty = false
        if (currentPageEl) {
          const inputs = currentPageEl.querySelectorAll('input, textarea, select')
          if (inputs.length > 0) {
            hasEmpty = Array.from(inputs).some((el) => {
              const type = (el.getAttribute('type') || '').toLowerCase()
              if (type === 'checkbox' || type === 'radio') {
                return false
              }
              const val = (el.value || '').trim()
              return val.length === 0
            })
          }
        }
        if (hasEmpty) {
          alert('Lengkapi semua kolom input sebelum lanjut ke halaman berikutnya.')
          return
        }
        if (current < total - 1) {
          pageFlip.flipNext()
        }
      }
    }
  }

  const handleStoryChange = (event) => {
    setStory(event.target.value)
  }

  useEffect(() => {
    const updatePageMetrics = () => {
      const pageFlip = bookRef.current?.pageFlip()
      if (pageFlip) {
        setCurrentIndex(pageFlip.getCurrentPageIndex())
        setTotalPages(pageFlip.getPageCount())
      }
    }
    updatePageMetrics()
    const id = setInterval(updatePageMetrics, 250)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flipbook-layout">

      <AnswersProvider>
        <HTMLFlipBook
          ref={bookRef}
          width={pageSize.width}
          height={pageSize.height}
          minWidth={280}
          maxWidth={720}
          minHeight={380}
          maxHeight={910}
          size="stretch"
          maxShadowOpacity={0.7}
          flippingTime={400}
          drawShadow
          showCover
          showPageCorners
          mobileScrollSupport
          disableFlipByClick={true}
          swipeDistance={80}
        useMouseEvents={true}
        className="flipbook-book"
        onFlip={() => {
          const pageFlip = bookRef.current?.pageFlip()
          if (pageFlip) {
            const nextIndex = pageFlip.getCurrentPageIndex()
            const prevIndex = prevIndexRef.current
            if (nextIndex > prevIndex) {
              const pages = Array.from(document.querySelectorAll('.page'))
              const prevPageEl = pages[prevIndex]
              let hasEmpty = false
              if (prevPageEl) {
                const inputs = prevPageEl.querySelectorAll('input, textarea, select')
                if (inputs.length > 0) {
                  hasEmpty = Array.from(inputs).some((el) => {
                    const type = (el.getAttribute('type') || '').toLowerCase()
                    if (type === 'checkbox' || type === 'radio') {
                      return false
                    }
                    const val = (el.value || '').trim()
                    return val.length === 0
                  })
                }
              }
              if (hasEmpty) {
                alert('Lengkapi semua kolom input sebelum lanjut ke halaman berikutnya.')
                setTimeout(() => {
                  const pf = bookRef.current?.pageFlip()
                  if (pf) pf.flipPrev()
                }, 0)
              } else {
                prevIndexRef.current = nextIndex
              }
            } else {
              prevIndexRef.current = nextIndex
            }
            setCurrentIndex(nextIndex)
            setTotalPages(pageFlip.getPageCount())
          }
        }}
      >
          <CoverPage />
          <StudentFieldPage />
          <TeacherTaskPage />
          <ContextPage />
          <BreakingNewsPage />
          
          {/* <IntroImagePage /> */}
          {/* <ExperiencePage story={story} onStoryChange={handleStoryChange} /> */}
          <AnswerFormPage />
          <SpeechTextPage />
          <SolutionEvaluationPage />
          <ObservationSpeechPage />
          <GroupDataPage />
          <GraphAnalysisPage />
          <VideoGalleryPage />
          <TechnologyImpactPage />
          <AnnouncementPage />
          <ExpertOpinionPage />
          <ExpertSelectionPage />
          
          <PresentationTopicPage />
          <PresentationInstructionLeftPage />
          <PresentationInstructionRightPage />
          <MediaIdentificationSpeechPage />
          <JournalPortraitPage />
          <DigitalResourceQuestionPage />
          <DigitalResourceLeftPage />
          <DigitalResourceRightPage />
          <PosterAppsLeftPage />
          <PosterTaskRightPage />
          <AnswerReportPage />
          <BackCoverPage />
        </HTMLFlipBook>
      </AnswersProvider>

      <footer className="flipbook-footer">
        <div className="flipbook-nav">
          <button
            type="button"
            className="nav-button nav-button-secondary"
            onClick={handlePrev}
            disabled={currentIndex <= 0}
          >
            <span className="nav-icon">‹</span>
            <span>Sebelumnya</span>
          </button>
          <button
            type="button"
            className="nav-button nav-button-primary"
            onClick={handleNext}
            disabled={currentIndex >= totalPages - 1}
          >
            <span>Selanjutnya</span>
            <span className="nav-icon nav-icon-right">›</span>
          </button>
        </div>
        <p className="flipbook-tip">
          Halaman {currentIndex + 1} dari {totalPages} · Tip: Klik atau geser halaman untuk membalik
        </p>
      </footer>
    </div>
  )
}

export default Book
