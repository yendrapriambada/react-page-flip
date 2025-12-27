import { forwardRef, useEffect, useState } from 'react'

const StudentFieldPage = forwardRef(function StudentFieldPage(props, ref) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayedText, setDisplayedText] = useState('')

  const fullText =
    'Pada mata kuliah Pendidikan IPA Terpadu, mahasiswa diminta untuk mengerjakan tugas dengan tema Teknologi Ramah Lingkungan untuk Irigasi.\n\n' +
    'Setelah disepakati bersama, konteks yang akan dibahas terkait tema tersebut adalah Sistem Irigasi Pertanian.\n\n' +
    'Secara spesifik akan membahas tentang bagaimana kondisi sistem irigasi di lingkungan Kota X dalam mengatasi ketersediaan air yang semakin terbatas.'

  const handlePlayClick = () => {
    if (!isPlaying) {
      setDisplayedText('')
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    let index = 0

    const intervalId = setInterval(() => {
      index += 1
      setDisplayedText(fullText.slice(0, index))

      if (index >= fullText.length) {
        clearInterval(intervalId)
      }
    }, 35)

    return () => {
      clearInterval(intervalId)
    }
  }, [isPlaying, fullText])

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
                  src="https://images.pexels.com/photos/3189418/pexels-photo-3189418.jpeg"
                  alt="Mahasiswa belajar bersama di area persawahan"
                  className="student-image"
                />
              </div>

              <div
                className={`student-text-wrapper ${
                  isPlaying ? 'student-text-animate' : ''
                }`}
              >
                <div className="student-text-inner">
                  {displayedText.split('\n\n').map((block) => (
                    <p key={block}>{block}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={`student-play-button ${
            isPlaying ? 'student-play-button-active' : ''
          }`}
          onClick={handlePlayClick}
          disabled={isPlaying}
        >
          {isPlaying ? 'Listening...' : '▶ Play'}
        </button>
      </div>
    </div>
  )
})

export default StudentFieldPage
