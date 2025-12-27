import { forwardRef, useState } from 'react'

const PosterTaskRightPage = forwardRef(function PosterTaskRightPage(props, ref) {
  const [posterLink, setPosterLink] = useState('')
  const [needDiscussion, setNeedDiscussion] = useState(null)
  const [reason, setReason] = useState('')

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content presentation-instruction-page">
        <div className="evaluation-question-card">
          <h3 className="evaluation-question">
            Buatlah 1 desain Poster untuk menjelaskan informasi teknologi irigasi
            modern yang diperoleh kepada audiens! Tulis link hasil kerja desain
            yang telah anda buat di bawah ini!
          </h3>
          <div className="evaluation-input-wrapper">
            <label>Jawaban Anda</label>
            <textarea
              placeholder="Jawaban Anda..."
              value={posterLink}
              onChange={(e) => setPosterLink(e.target.value)}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
            />
          </div>
        </div>

        <div className="evaluation-question-card">
          <h3 className="evaluation-question">
            Sebagai anggota kelompok, apakah anda memerlukan diskusi bersama
            kelompok dalam memilih informasi yang sesuai untuk menyelesaikan tugas
            Poster tersebut? mengapa?
          </h3>
          <div className="evaluation-choices">
            <button
              type="button"
              className={`evaluation-btn evaluation-btn-yes ${needDiscussion === true ? 'evaluation-selected' : ''}`}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              onClick={() => setNeedDiscussion(true)}
            >
              {needDiscussion === true ? 'Ya (✓)' : 'Ya'}
            </button>
            <button
              type="button"
              className={`evaluation-btn evaluation-btn-no ${needDiscussion === false ? 'evaluation-selected' : ''}`}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              onClick={() => setNeedDiscussion(false)}
            >
              {needDiscussion === false ? 'Tidak (✓)' : 'Tidak'}
            </button>
          </div>
          <div className="evaluation-input-wrapper">
            <label>Tulis alasanmu di bawah ini!</label>
            <textarea
              placeholder="Jawaban Anda..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
            />
          </div>
        </div>

        <div className="page-number page-number-right">— Poster —</div>
      </div>
    </div>
  )
})

export default PosterTaskRightPage
