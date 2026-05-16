import { forwardRef } from 'react'
import { useAnswers } from '../../context/AnswersContext'
import { useTTSAnimation } from '../../hooks/useTTSAnimation'

const AnswerFormPage = forwardRef(function AnswerFormPage(props, ref) {
  const { answers: ctxAnswers, setQ1At } = useAnswers()
  const fullText =
    'Mahasiswa diminta menuliskan hasil identifikasi permasalahan berdasarkan wacana sebelumnya.'
  const { displayedText, isPlaying, isCompleted, handlePlay } = useTTSAnimation(fullText)

  const handleChange = (index, value) => {
    setQ1At(index, value)
  }

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content answer-form-page">
        <div className="hamka-chat-row">
          <div className="character-section">
            <div className="avatar-ring">
              <div className="avatar-ring-inner">
                <img
                  src="https://images.pexels.com/photos/8617727/pexels-photo-8617727.jpeg"
                  alt="Bapak Hamka"
                  className="character-avatar"
                />
              </div>
            </div>
            <div className="character-info">
              <h3 className="character-name">Bapak Hamka</h3>
              <p className="character-role">Dosen</p>
            </div>
          </div>
          <div className="speech-bubble answer-speech">
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

        <div className="answer-form-card">
          <h3 className="answer-form-title">
            Menurut pendapatmu, apa saja permasalahan yang dihadapi di dalam wacana <i>breaking news</i> sebelumnya?
          </h3>
          <div className="answers-grid">
            {ctxAnswers.q1.map((val, idx) => (
              <textarea
                key={idx}
                rows={3}
                className="answer-input"
                placeholder="Jawaban Anda..."
                value={val}
                onChange={(e) => handleChange(idx, e.target.value)}
                onPointerDownCapture={stopFlipPropagation}
                onMouseDownCapture={stopFlipPropagation}
                onTouchStartCapture={stopFlipPropagation}
                required
                autoComplete="off"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default AnswerFormPage
