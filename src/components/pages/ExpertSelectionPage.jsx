import { forwardRef } from 'react'
import { useAnswers } from '../../context/AnswersContext'

const ExpertSelectionPage = forwardRef(function ExpertSelectionPage(props, ref) {
  const { answers, setQ5Choice, setQ5Reason } = useAnswers()

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content technology-impact-page">
        <div className="tech-impact-container">
          <div className="tech-impact-section">
            <label className="tech-impact-label">
              Berdasarkan pengumuman Kepala Desa Mari-mari dan keempat pendapat pakar tersebut, solusi manakah yang paling tepat diterapkan di Desa Mari-mari? Jelaskan alasan Anda dengan mempertimbangkan aspek ketersediaan sumber daya, kebutuhan energi, dampak lingkungan, dan keberlanjutan sistem.
            </label>
            <textarea
              className="tech-impact-input"
              placeholder="Jawaban Anda..."
              value={answers.q5.choice}
              onChange={(e) => setQ5Choice(e.target.value)}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              autoComplete="off"
            />
          </div>

          <div className="tech-impact-section">
            <label className="tech-impact-label">Tuliskan alasanmu di bawah ini</label>
            <textarea
              className="tech-impact-input"
              placeholder="Jawaban Anda..."
              value={answers.q5.reason}
              onChange={(e) => setQ5Reason(e.target.value)}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  )
})

ExpertSelectionPage.displayName = 'ExpertSelectionPage'

export default ExpertSelectionPage
