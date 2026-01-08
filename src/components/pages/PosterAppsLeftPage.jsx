import { forwardRef, useEffect, useState } from 'react'
import { speakIndonesianMale, cancelSpeech } from '../../utils/tts'
import canvaLogo from '../../assets/canva.png'
import publisherLogo from '../../assets/microsoft_publisher.png'
import piktochartLogo from '../../assets/piktochart.png'

const PosterAppsLeftPage = forwardRef(function PosterAppsLeftPage(props, ref) {
  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const fullText =
    'Gunakan informasi digital yang telah ditemukan dan dipilih sebelumnya untuk menjelaskan kepada audiens. Anda dapat memanfaatkan salah satu aplikasi desain poster yang disarankan.'
  const [displayedText, setDisplayedText] = useState('')

  const handlePlayClick = () => {
    if (!isPlaying) {
      setDisplayedText('')
      setIsCompleted(false)
      setIsPlaying(true)
      speakIndonesianMale(fullText)
    }
  }

  useEffect(() => {
    if (!isPlaying) return
    let index = 0
    const intervalId = setInterval(() => {
      index += 1
      setDisplayedText(fullText.slice(0, index))
      if (index >= fullText.length) {
        clearInterval(intervalId)
        setIsPlaying(false)
        setIsCompleted(true)
      }
    }, 35)
    return () => clearInterval(intervalId)
  }, [isPlaying, fullText])

  useEffect(() => {
    return () => cancelSpeech()
  }, [])

  return (
    <div className="page" ref={ref}>
      <div className="page-content presentation-instruction-page poster-left-page">
        <div className="callout-row">
          <div className="callout-image">
            <img
              src="https://images.pexels.com/photos/8617727/pexels-photo-8617727.jpeg"
              alt="Karakter Dosen"
            />
          </div>
          <div className="speech-bubble">
            <p>{displayedText || 'Klik ▶ Play untuk memutar teks'}</p>
          </div>
        </div>
        {!isCompleted && (
          <button
            type="button"
            className={`student-play-button ${isPlaying ? 'student-play-button-active' : ''}`}
            onClick={handlePlayClick}
            disabled={isPlaying}
          >
            {isPlaying ? 'Listening...' : '▶ Play'}
          </button>
        )}



        <div className="page-heading-wrapper page-heading-center">
          <h3 className="instruction-subtitle">
            Berikut ini beberapa aplikasi yang bisa anda gunakan!
          </h3>
        </div>
        <div className="app-links-grid">
          <a
            href="https://www.canva.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link-card"
            onPointerDownCapture={stopFlipPropagation}
            onMouseDownCapture={stopFlipPropagation}
            onTouchStartCapture={stopFlipPropagation}
          >
            <img className="app-logo" src={canvaLogo} alt="Canva" />
            <span className="app-label">Canva</span>
          </a>
          <a
            href="https://www.microsoft.com/microsoft-365/publisher"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link-card"
            onPointerDownCapture={stopFlipPropagation}
            onMouseDownCapture={stopFlipPropagation}
            onTouchStartCapture={stopFlipPropagation}
          >
            <img className="app-logo" src={publisherLogo} alt="Microsoft Publisher" />
            <span className="app-label">Publisher</span>
          </a>
          <a
            href="https://piktochart.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="app-link-card"
            onPointerDownCapture={stopFlipPropagation}
            onMouseDownCapture={stopFlipPropagation}
            onTouchStartCapture={stopFlipPropagation}
          >
            <img className="app-logo" src={piktochartLogo} alt="Piktochart" />
            <span className="app-label">Piktochart</span>
          </a>
        </div>
        <p className="app-note">*klik gambar untuk membuka website</p>
        <div className="page-number">— Aplikasi —</div>
      </div>
    </div>
  )
})

export default PosterAppsLeftPage
