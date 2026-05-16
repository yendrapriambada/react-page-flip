import { forwardRef } from 'react'
import { useTTSAnimation } from '../../hooks/useTTSAnimation'
import canvaLogo from '../../assets/canva.png'
import publisherLogo from '../../assets/microsoft_publisher.png'
import piktochartLogo from '../../assets/piktochart.png'

const PosterAppsLeftPage = forwardRef(function PosterAppsLeftPage(props, ref) {
  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  const fullText =
    'Gunakan informasi digital yang telah ditemukan dan dipilih sebelumnya untuk menjelaskan kepada audien. Anda dapat memanfaatkan salah satu aplikasi desain poster yang disarankan.'
  const { displayedText, isPlaying, isCompleted, handlePlay } = useTTSAnimation(fullText)

  return (
    <div className="page" ref={ref}>
      <div className="page-content presentation-instruction-page poster-left-page">
        <div className="hamka-chat-row">
          <div className="character-section">
            <div className="avatar-ring">
              <div className="avatar-ring-inner">
                <img
                  src="https://images.pexels.com/photos/8617727/pexels-photo-8617727.jpeg"
                  alt="Karakter Dosen"
                  className="character-avatar"
                />
              </div>
            </div>
            <div className="character-info">
              <h3 className="character-name">Bapak Hamka</h3>
              <p className="character-role">Dosen</p>
            </div>
          </div>
          <div className="speech-bubble">
            <p>
              {displayedText ? (
                displayedText
              ) : (
                <span>
                  Klik ▶ <i>Play</i> untuk memutar teks
                </span>
              )}
            </p>
          </div>
          {!isCompleted && (
            <button
              type="button"
              className={`student-play-button ${isPlaying ? 'student-play-button-active' : ''}`}
              onClick={handlePlay}
              disabled={isPlaying}
            >
              {isPlaying ? <i>Listening...</i> : <>▶ <i>Play</i></>}
            </button>
          )}
        </div>



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
            <span className="app-label"><i>Canva</i></span>
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
            <span className="app-label"><i>Publisher</i></span>
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
            <span className="app-label"><i>Piktochart</i></span>
          </a>
        </div>
        <p className="app-note">*klik gambar untuk membuka website</p>
        <div className="page-number">— Aplikasi —</div>
      </div>
    </div>
  )
})

export default PosterAppsLeftPage
