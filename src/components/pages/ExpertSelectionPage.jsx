import { forwardRef, useState } from 'react'

const ExpertSelectionPage = forwardRef(function ExpertSelectionPage(props, ref) {
  const [choice, setChoice] = useState('')
  const [reason, setReason] = useState('')

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content technology-impact-page">
        <div className="tech-impact-container">
          <div className="tech-impact-section">
            <label className="tech-impact-label">
              Menurut pendapatmu, manakah pendapat ahli yang paling tepat untuk
              memecahkan masalah kekurangan air dalam irigasi pertanian.
            </label>
            <textarea
              className="tech-impact-input"
              placeholder="Jawaban Anda..."
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
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
              value={reason}
              onChange={(e) => setReason(e.target.value)}
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
