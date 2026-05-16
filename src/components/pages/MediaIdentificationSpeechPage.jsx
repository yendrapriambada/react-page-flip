import { forwardRef } from 'react'
import { useTTSAnimation } from '../../hooks/useTTSAnimation'

const MediaIdentificationSpeechPage = forwardRef(function MediaIdentificationSpeechPage(props, ref) {
  const targetWord = 'Mengidentifikasi'
  const fullText =
    '"Mahasiswa diminta Mengidentifikasi media digital yang tepat (artikel, video, tutorial, e-book, aplikasi, dll.) terkait teknologi sistem irigasi pertanian."'
  const { displayedText, isPlaying, isCompleted, handlePlay } = useTTSAnimation(fullText)

  function renderText(text) {
    const pos = text.indexOf(targetWord)
    if (pos === -1) return text
    const before = text.slice(0, pos)
    const after = text.slice(pos + targetWord.length)
    return (
      <>
        {before}
        <strong>{targetWord}</strong>
        {after}
      </>
    )
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content page-hero-right page-hero-right-centered">
        <div className="speech-center-group">
          <div className="speech-bubble">
            <p>
              {displayedText ? (
                renderText(displayedText)
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
        </div>

        <div className="page-indicator page-indicator-right">
          <span className="indicator-dot indicator-dot-active" />
          <span className="indicator-dot" />
          <span className="indicator-dot" />
        </div>
      </div>
    </div>
  )
})

export default MediaIdentificationSpeechPage
