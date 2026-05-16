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
  const suppressClickRef = useRef(false)
  const [story, setStory] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [pageSize, setPageSize] = useState({
    width: 600,
    height: 760,
  })

  useEffect(() => {
    const updateSize = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const aspectRatio = 570 / 450

      let width

      if (viewportWidth <= 640) {
        width = Math.max(280, viewportWidth * 0.95)
      } else if (viewportWidth <= 1024) {
        width = Math.min(Math.max(380, viewportWidth * 0.6), 640)
      } else {
        width = Math.min(Math.max(420, viewportWidth * 0.48), 720)
      }

      const localIsMobile = viewportWidth <= 640
      const reservedHeight = localIsMobile ? 170 : 150
      const widthFromHeight = (viewportHeight - reservedHeight) / aspectRatio
      width = Math.max(280, Math.min(width, widthFromHeight, 720))

      const height = width * aspectRatio

      setIsMobile(localIsMobile)
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
          // flipPrev() internally uses hardcoded {x:10, y:1} which is rejected by
          // disableFlipByClick=true in portrait mode (x=10 falls outside centered page).
          // Workaround: briefly disable the check, call flipPrev(), then restore.
          // flipPrev() starts the animation synchronously, so restoring immediately is safe.
          const settings = pageFlip.getSettings()
          settings.disableFlipByClick = false
          pageFlip.flipPrev()
          settings.disableFlipByClick = true
        }
      }
    }
  }

  const blockFlipGestureCapture = (e) => {
    e.stopPropagation()
  }

  const suppressNextClick = () => {
    suppressClickRef.current = true
    setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
  }

  const handlePrevPointerUp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    suppressNextClick()
    handlePrev()
  }

  const handleNext = () => {
    if (bookRef.current) {
      const pageFlip = bookRef.current.pageFlip()
      if (pageFlip) {
        const current = pageFlip.getCurrentPageIndex()
        const total = pageFlip.getPageCount()
        const isPortrait = pageFlip.getOrientation() === 'portrait'
        const pages = Array.from(document.querySelectorAll('.page'))
        const leftPageEl = pages[current]
        const hasEmptyOn = (el) => {
          if (!el) return false
          const inputs = el.querySelectorAll('input, textarea, select')
          if (inputs.length === 0) return false
          const hasEmptyInput = Array.from(inputs).some((input) => {
            const type = (input.getAttribute('type') || '').toLowerCase()
            if (type === 'checkbox' || type === 'radio') return false
            const val = (input.value || '').trim()
            return val.length === 0
          })
          if (hasEmptyInput) return true

          const buttons = el.querySelectorAll('.evaluation-choices')
          if (buttons.length > 0) {
            return Array.from(buttons).some((choiceGroup) => {
              const selected = choiceGroup.querySelector('.evaluation-selected')
              return !selected
            })
          }
          return false
        }
        const hasEmpty = isPortrait
          ? hasEmptyOn(leftPageEl)
          : hasEmptyOn(leftPageEl) || hasEmptyOn(pages[current + 1])
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

  const handleNextPointerUp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    suppressNextClick()
    handleNext()
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
          mobileScrollSupport={isMobile}
          disableFlipByClick={true}
          swipeDistance={isMobile ? 9999 : 80}
          useMouseEvents={!isMobile}
          className="flipbook-book"
          onFlip={() => {
          const pageFlip = bookRef.current?.pageFlip()
          if (pageFlip) {
            const nextIndex = pageFlip.getCurrentPageIndex()
            const prevIndex = prevIndexRef.current
            if (nextIndex > prevIndex) {
              const isPortrait = pageFlip.getOrientation() === 'portrait'
              const pages = Array.from(document.querySelectorAll('.page'))
              const leftLeaving = pages[prevIndex]
              const hasEmptyOn = (el) => {
                if (!el) return false
                const inputs = el.querySelectorAll('input, textarea, select')
                if (inputs.length === 0) return false
                return Array.from(inputs).some((input) => {
                  const type = (input.getAttribute('type') || '').toLowerCase()
                  if (type === 'checkbox' || type === 'radio') return false
                  const val = (input.value || '').trim()
                  return val.length === 0
                })
              }
              const hasEmpty = isPortrait
                ? hasEmptyOn(leftLeaving)
                : hasEmptyOn(leftLeaving) || hasEmptyOn(pages[prevIndex + 1])
              if (hasEmpty) {
                alert('Lengkapi semua kolom input sebelum lanjut ke halaman berikutnya.')
                setTimeout(() => {
                  const pf = bookRef.current?.pageFlip()
                  if (pf) {
                    const s = pf.getSettings()
                    s.disableFlipByClick = false
                    pf.flipPrev()
                    s.disableFlipByClick = true
                  }
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
            onPointerDownCapture={blockFlipGestureCapture}
            onPointerUp={handlePrevPointerUp}
            onTouchStart={(e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation?.() }}
            onTouchEnd={(e) => { e.stopPropagation(); e.preventDefault(); suppressNextClick(); handlePrev() }}
            onClick={() => {
              if (suppressClickRef.current) return
              handlePrev()
            }}
            disabled={currentIndex <= 0}
          >
            <span className="nav-icon">‹</span>
            <span>Sebelumnya</span>
          </button>
          <button
            type="button"
            className="nav-button nav-button-primary"
            onPointerDownCapture={blockFlipGestureCapture}
            onPointerUp={handleNextPointerUp}
            onTouchStart={(e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation?.() }}
            onTouchEnd={(e) => { e.stopPropagation(); e.preventDefault(); suppressNextClick(); handleNext() }}
            onClick={() => {
              if (suppressClickRef.current) return
              handleNext()
            }}
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
