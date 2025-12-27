import { forwardRef, useState } from 'react'

const GraphAnalysisPage = forwardRef(function GraphAnalysisPage(props, ref) {
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content graph-analysis-page">
        <div className="analysis-container">
          <div className="question-block">
              <label className="analysis-question">
                Jelaskan informasi apa yang didapatkan dari grafik batang tersebut!
              </label>
              <textarea
                className="analysis-textarea"
                placeholder="Jawaban Anda...."
                value={answer1}
                onChange={(e) => setAnswer1(e.target.value)}
                onPointerDownCapture={stopFlipPropagation}
                onMouseDownCapture={stopFlipPropagation}
                onTouchStartCapture={stopFlipPropagation}
                autoComplete="off"
              />
            </div>

            <div className="question-block">
              <label className="analysis-question">
                Sebagai anggota kelompok, apakah anda meminta saran atau revisi kepada
                teman dalam kelompok setelah grafik batang (bar chart) dibuat?
                Mengapa?
              </label>
              <textarea
                className="analysis-textarea"
                placeholder="Jawaban Anda...."
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

GraphAnalysisPage.displayName = 'GraphAnalysisPage'

export default GraphAnalysisPage
