import { forwardRef } from 'react'
import { useTTSAnimation } from '../../hooks/useTTSAnimation'
import googlebooksIcon from '../../assets/googlebooks.png'
import springerIcon from '../../assets/springer.png'
import sciencedirectIcon from '../../assets/sciencedirect.png'
import doaj from '../../assets/doaj.jpg'
import wiley from '../../assets/wiley-online.png'

const SITES = [
  {
    name: 'ScienceDirect',
    href: 'https://www.sciencedirect.com/',
    img: sciencedirectIcon,
  },
  {
    name: 'Springer',
    href: 'https://link.springer.com/',
    img: springerIcon,
  },
  {
    name: 'IEEE Xplore',
    href: 'https://ieeexplore.ieee.org/',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ieee.svg',
  },
  {
    name: 'Wiley Online Library',
    href: 'https://onlinelibrary.wiley.com/',
    img: wiley,
  },
  {
    name: 'Google Scholar',
    href: 'https://scholar.google.com/',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlescholar.svg',
  },
  {
    name: 'DOAJ',
    href: 'https://doaj.org/',
    img: doaj,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg',
  },
  {
    name: 'Coursera',
    href: 'https://www.coursera.org/',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/coursera.svg',
  },
  {
    name: 'TED Talks',
    href: 'https://www.ted.com/talks',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ted.svg',
  },
  {
    name: 'Open Library',
    href: 'https://openlibrary.org/',
    img: 'https://openlibrary.org/static/images/openlibrary-logo-tighter.svg',
  },
  {
    name: 'Amazon Kindle',
    href: 'https://www.amazon.com/Kindle-eBooks/b?ie=UTF8&node=154606011',
    img: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg',
  },
  {
    name: 'Google Books',
    href: 'https://books.google.com/',
    img: googlebooksIcon,
  },
]

const DigitalResourceLeftPage = forwardRef(function DigitalResourceLeftPage(props, ref) {
  const fullText =
    'Carilah informasi dari penyedia sumber daya digital (artikel, video, e-book) di internet tentang teknologi irigasi modern.'
  const { displayedText, isPlaying, isCompleted, handlePlay } = useTTSAnimation(fullText)

  const stopFlipPropagation = (e) => {
    e.stopPropagation()
  }
  const preventDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="page" ref={ref}>
      <div className="page-content digital-left">
        <div className="hamka-chat-row">
          <div className="character-section">
            <div className="avatar-ring">
              <div className="avatar-ring-inner">
                <img
                  src="https://images.pexels.com/photos/8617727/pexels-photo-8617727.jpeg"
                  alt="Karakter Dosen"
                  className="character-avatar"
                />
              </div>
            </div>
            <div className="character-info">
              <h3 className="character-name">Bapak Hamka</h3>
              <p className="character-role">Dosen</p>
            </div>
          </div>
          <div className="speech-bubble">
            <p>
              {displayedText ? (
                displayedText
              ) : (
                <span>
                  Klik ▶ <i>Play</i> untuk memutar teks
                </span>
              )}
            </p>
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

        <div className="digital-left-intro">
          <p>Berikut ini beberapa situs penyedia sumber daya digital yang bisa anda pilih dan gunakan.</p>
        </div>

        <div
          className="site-grid"
          onPointerDownCapture={stopFlipPropagation}
          onPointerUpCapture={stopFlipPropagation}
          onClickCapture={stopFlipPropagation}
          onTouchStartCapture={stopFlipPropagation}
          onTouchEndCapture={stopFlipPropagation}
          onMouseDownCapture={stopFlipPropagation}
          onMouseUpCapture={stopFlipPropagation}
        >
          {SITES.map((s) => (
            <a
              key={s.name}
              className="site-card"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              onPointerDownCapture={stopFlipPropagation}
              onMouseDownCapture={stopFlipPropagation}
              onTouchStartCapture={stopFlipPropagation}
              onPointerUpCapture={stopFlipPropagation}
              onMouseUpCapture={stopFlipPropagation}
              onTouchEndCapture={stopFlipPropagation}
              onClickCapture={stopFlipPropagation}
              onDragStart={preventDrag}
            >
              <img src={s.img} alt={s.name} className="site-logo" draggable={false} onDragStart={preventDrag} />
              <span className="site-label">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
})

DigitalResourceLeftPage.displayName = 'DigitalResourceLeftPage'

export default DigitalResourceLeftPage
