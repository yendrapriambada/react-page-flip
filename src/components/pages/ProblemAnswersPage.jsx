import { forwardRef, useEffect, useState } from 'react'
import { speakIndonesianMale, cancelSpeech } from '../../utils/tts'

const ProblemAnswersPage = forwardRef(function ProblemAnswersPage(props, ref) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const fullText =
    'Mahasiswa diminta menuliskan hasil identifikasi permasalahan berdasarkan berita sebelumnya.'
  const [displayedText, setDisplayedText] = useState('')

  const [answers, setAnswers] = useState(Array(6).fill(''))
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

  const handleAnswerChange = (i) => (e) => {
    const next = [...answers]
    next[i] = e.target.value
    setAnswers(next)
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content answers-page">
        <div className="speech-bubble">
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

        <div className="answers-panel">
          <h2 className="answers-question">
            Menurutmu, apa saja permasalahan yang dihadapi di dalam wacana di atas?
          </h2>
          <div className="answers-list">
            {answers.map((value, i) => (
              <input
                key={i}
                type="text"
                className="answer-input"
                placeholder="Jawaban Anda..."
                value={value}
                onChange={handleAnswerChange(i)}
                onPointerDownCapture={stopFlipPropagation}
                onMouseDownCapture={stopFlipPropagation}
                onTouchStartCapture={stopFlipPropagation}
                required
                autoComplete="off"
              />
            ))}
          </div>
        </div>

        <div className="page-indicator">
          <span className="indicator-dot indicator-dot-active" />
          <span className="indicator-dot" />
          <span className="indicator-dot" />
        </div>
        <div className="page-number">— 5 —</div>
      </div>
    </div>
  )
})

export default ProblemAnswersPage
