import { forwardRef, useState } from 'react'

const TechnologyImpactPage = forwardRef(function TechnologyImpactPage(props, ref) {
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content technology-impact-page">
        <div className="tech-impact-container">
          <div className="tech-impact-section">
            <label className="tech-impact-label">
              Menurut pendapatmu, teknologi manakah yang memberikan dampak positif terhadap
              penghematan air dan pengurangan pemborosan?
            </label>
            <textarea
              className="tech-impact-input"
              placeholder="Jawaban Anda..."
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              autoComplete="off"
            />
          </div>

          <div className="tech-impact-section">
            <label className="tech-impact-label">
              Tuliskan alasanmu di bawah ini
            </label>
            <textarea
              className="tech-impact-input"
              placeholder="Jawaban Anda..."
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
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

TechnologyImpactPage.displayName = 'TechnologyImpactPage'

export default TechnologyImpactPage
