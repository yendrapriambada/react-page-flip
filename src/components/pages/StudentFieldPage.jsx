import { forwardRef } from 'react'
import { useTTSAnimation } from '../../hooks/useTTSAnimation'
import studentImage from '../../assets/mahasiswapenelitian.png'

const StudentFieldPage = forwardRef(function StudentFieldPage(props, ref) {
  const fullText =
    'Pada mata kuliah Pendidikan IPA Terpadu, mahasiswa diminta untuk mengerjakan tugas dengan tema Teknologi Ramah Lingkungan untuk Irigasi.\n\n' +
    'Setelah disepakati bersama, konteks yang akan dibahas terkait tema tersebut adalah Sistem Irigasi Pertanian.\n\n' +
    'Secara spesifik akan membahas tentang bagaimana kondisi sistem irigasi di lingkungan Kota X dalam mengatasi ketersediaan air yang semakin terbatas.'

  const { displayedText, isPlaying, isCompleted, handlePlay } = useTTSAnimation(fullText)

  const HIGHLIGHTS = [
    'Pendidikan IPA Terpadu',
    'Teknologi Ramah Lingkungan untuk Irigasi',
    'Sistem Irigasi Pertanian',
  ]

  const renderWithHighlights = (text) => {
    const parts = []
    let rest = text
    let k = 0
    while (rest.length) {
      let foundIndex = -1
      let foundPhrase = null
      for (const phrase of HIGHLIGHTS) {
        const i = rest.indexOf(phrase)
        if (i !== -1 && (foundIndex === -1 || i < foundIndex)) {
          foundIndex = i
          foundPhrase = phrase
        }
      }
      if (foundIndex === -1) {
        parts.push(rest)
        break
      }
      if (foundIndex > 0) {
        parts.push(rest.slice(0, foundIndex))
      }
      parts.push(
        <strong key={`hl-${k++}`} style={{ fontWeight: 700 }}>
          {foundPhrase}
        </strong>
      )
      rest = rest.slice(foundIndex + foundPhrase.length)
    }
    return parts
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content student-field-page">
        <div className="student-board">
          <div className="student-board-inner">
            <div className="cover-bunting student-board-bunting">
              <span className="cover-flag cover-flag-1" />
              <span className="cover-flag cover-flag-2" />
              <span className="cover-flag cover-flag-3" />
              <span className="cover-flag cover-flag-4" />
              <span className="cover-flag cover-flag-5" />
            </div>

            <div className="student-board-body">
              <div className="student-image-wrapper">
                <img
                  src={studentImage}
                  alt="Mahasiswa belajar bersama di area persawahan"
                  className="student-image"
                />
              </div>

              <div
                className={`student-text-wrapper ${isPlaying ? 'student-text-animate' : ''}`}
                style={isCompleted ? { maxHeight: 'none', flex: 1 } : {}}
              >
                <div className="student-text-inner">
                  {displayedText ? (
                    displayedText.split('\n\n').map((block, idx) => (
                      <p key={idx}>{renderWithHighlights(block)}</p>
                    ))
                  ) : (
                    <p>Klik play untuk memutar teks...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isCompleted && (
          <button
            type="button"
            className={`student-play-button ${isPlaying ? 'student-play-button-active' : ''}`}
            onClick={handlePlay}
            disabled={isPlaying}
          >
            {isPlaying ? <i>Listening...</i> : <>▶ <i>Play</i></>}
          </button>
        )}
      </div>
    </div>
  )
})

export default StudentFieldPage
