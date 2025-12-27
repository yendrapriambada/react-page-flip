import { forwardRef, useState } from 'react'

const PresentationInstructionRightPage = forwardRef(function PresentationInstructionRightPage(props, ref) {
  const [willDelegate, setWillDelegate] = useState(null)
  const [reason, setReason] = useState('')
  const [workLink, setWorkLink] = useState('')

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content presentation-instruction-page">
        <div className="evaluation-question-card">
          <h3 className="evaluation-question">
            Berdasarkan teks tugas di atas, jika Anda berperan sebagai ketua
            kelompok, apakah Anda akan membagi tugas kepada setiap anggota
            kelompok dalam menyiapkan presentasi tersebut? Mengapa?
          </h3>
          <div className="evaluation-choices">
            <button
              type="button"
              className={`evaluation-btn evaluation-btn-yes ${willDelegate === true ? 'evaluation-selected' : ''}`}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              onClick={() => setWillDelegate(true)}
            >
              {willDelegate === true ? 'Ya (✓)' : 'Ya'}
            </button>
            <button
              type="button"
              className={`evaluation-btn evaluation-btn-no ${willDelegate === false ? 'evaluation-selected' : ''}`}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              onClick={() => setWillDelegate(false)}
            >
              {willDelegate === false ? 'Tidak (✓)' : 'Tidak'}
            </button>
          </div>
          <div className="evaluation-input-wrapper">
            <label>
              {willDelegate === null
                ? 'Tuliskan alasanmu di sini'
                : willDelegate
                ? 'Mengapa memilih membagi tugas?'
                : 'Mengapa tidak membagi tugas?'}
            </label>
            <textarea
              placeholder="Tuliskan alasanmu di sini"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
            />
          </div>
        </div>

        <div className="evaluation-question-card">
          <h3 className="evaluation-question">
            Berdasarkan teks tugas di atas, setelah Anda bekerja dengan kelompok,
            buat sebuah presentasi multimedia dengan topik "Desain Irigasi Hemat
            Energi: Solusi untuk Daerah dengan Keterbatasan Sumber Daya" sesuai
            instruksi presentasi.
          </h3>
          <p className="page-body-text page-body-muted">
            (Silahkan gunakan aplikasi membuat presentasi yang ketahui)
          </p>
          <div className="evaluation-input-wrapper">
            <label>Tuliskan link hasil kerja di sini</label>
            <textarea
              placeholder="Tuliskan link hasil kerja di sini"
              value={workLink}
              onChange={(e) => setWorkLink(e.target.value)}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
            />
          </div>
        </div>

        <div className="page-number page-number-right">— Pertanyaan —</div>
      </div>
    </div>
  )
})

export default PresentationInstructionRightPage
