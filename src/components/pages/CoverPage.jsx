import { forwardRef, useState } from 'react'
import coverImage from '../../assets/coverimage.png'

const CoverPage = forwardRef(function CoverPage(props, ref) {
  const [quizCode, setQuizCode] = useState('')

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-cover-content">
        <div className="cover-board">
          <div className="cover-bunting">
            <span className="cover-flag cover-flag-1" />
            <span className="cover-flag cover-flag-2" />
            <span className="cover-flag cover-flag-3" />
            <span className="cover-flag cover-flag-4" />
            <span className="cover-flag cover-flag-5" />
          </div>
          <div className="cover-board-inner">
            <h2 className="cover-title">
              Environmentally Friendly Technology for Irrigation
            </h2>
            <div className="cover-image-wrapper">
              <div className="cover-image-frame">
                <img
                  src={coverImage}
                  alt="Petani memeriksa lahan irigasi yang ramah lingkungan"
                  className="cover-image"
                />
              </div>
            </div>
            <div className="cover-input-wrapper">
              <input
                type="text"
                className="cover-input"
                placeholder="input kode kuis"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value)}
                onPointerDownCapture={stopFlipPropagation}
                onMouseDownCapture={stopFlipPropagation}
                onTouchStartCapture={stopFlipPropagation}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CoverPage

