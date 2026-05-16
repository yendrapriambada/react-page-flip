import { forwardRef } from 'react'
import { useAnswers } from '../../context/AnswersContext'
import { useTTSAnimation } from '../../hooks/useTTSAnimation'

const DigitalResourceQuestionPage = forwardRef(function DigitalResourceQuestionPage(props, ref) {
  const fullText =
    '"Mahasiswa diminta mengidentifikasi media digital yang tepat berdasarkan wacana yang telah disajikan sebelumnya."'
  const { displayedText, isPlaying, isCompleted, handlePlay } = useTTSAnimation(fullText)
  const { answers, setQ7Answer } = useAnswers()

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

        <div className="evaluation-question-card">
          <h3 className="evaluation-question">
            Berdasarkan wacana tersebut, sumber daya digital manakah yang tepat untuk membantu petani memahami, menerapkan, dan memanfaatkan teknologi irigasi modern dengan lebih efektif? Berikan alasannya!
          </h3>
          <div className="evaluation-input-wrapper">
            <textarea
              rows={3}
              placeholder="Tulis jawaban dan alasannya di sini..."
              value={answers.q7.answer}
              onChange={(e) => setQ7Answer(e.target.value)}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              required
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default DigitalResourceQuestionPage
