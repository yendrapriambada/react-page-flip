import { forwardRef, useState } from 'react'

const DigitalResourceRightPage = forwardRef(function DigitalResourceRightPage(props, ref) {
  const [link, setLink] = useState('')
  const [summary, setSummary] = useState('')

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content digital-right">
        <div className="instruction-card instruction-compact">
          <h3 className="instruction-title instruction-compact-title">
            Berdasarkan pilihan sumber daya digital yang disediakan, temukan 1 artikel/video/e-book
            yang berisi informasi atau konten online tentang teknologi irigasi modern.
          </h3>
          <input
            type="url"
            className="link-input input-compact"
            placeholder="Tempelkan link di sini"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onPointerDownCapture={stopFlipPropagation}
            onMouseDownCapture={stopFlipPropagation}
            onTouchStartCapture={stopFlipPropagation}
            autoComplete="off"
          />
        </div>

        <div className="instruction-card instruction-compact">
          <h3 className="instruction-title instruction-compact-title">
            Jelaskan apa yang dibahas dalam artikel/video/e-book yang anda temukan!
          </h3>
          <textarea
            className="analysis-textarea textarea-compact"
            placeholder="Jawaban singkat Anda"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            onPointerDownCapture={stopFlipPropagation}
            onMouseDownCapture={stopFlipPropagation}
            onTouchStartCapture={stopFlipPropagation}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
})

DigitalResourceRightPage.displayName = 'DigitalResourceRightPage'

export default DigitalResourceRightPage
