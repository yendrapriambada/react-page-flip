import { forwardRef, useEffect, useState } from 'react'
import { speakIndonesianMale, cancelSpeech } from '../../utils/tts'
import { useAnswers } from '../../context/AnswersContext'

const AnswerFormPage = forwardRef(function AnswerFormPage(props, ref) {
  const { onInputFocusChange } = props
  const { answers: ctxAnswers, setQ1At } = useAnswers()

  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const fullText =
    'Mahasiswa diminta menuliskan identifikasi permasalahan berdasarkan wacana sebelumnya.'
  const [displayedText, setDisplayedText] = useState('')

  const handleChange = (index, value) => {
    setQ1At(index, value)
  }

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

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
      <div className="page-content answer-form-page">
        <div className="speech-bubble answer-speech">
          <p>{displayedText || 'Klik ▶ Play untuk memutar teks'}</p>
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

        <div className="answer-form-card">
          <h3 className="answer-form-title">
            Menurut pendapatmu, apa saja permasalahan yang dihadapi di dalam wacana breaking news sebelumnya?
          </h3>
          <div className="answers-grid">
            {ctxAnswers.q1.map((val, idx) => (
              <input
                key={idx}
                type="text"
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
